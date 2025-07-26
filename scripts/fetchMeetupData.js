import { writeFile } from "node:fs/promises";

async function writeJsonToFile(filename, jsonData) {
  const jsonString = JSON.stringify(jsonData, null, 2);

  await writeFile(filename, jsonString + "\n", "utf8");
}

async function fetchEvents(url) {
  // fetch the page and get the HTML content
  const response = await fetch(url);
  const htmlContent = await response.text();

  // get the NEXT_DATA script tag
  const regex =
    /<script\s+id="__NEXT_DATA__"\s*type="application\/json">\s*(.*?)(?=<\/script>|\s*<\/body>)/s;
  const match = htmlContent.match(regex);

  const data = match[0]
    .replace('<script id="__NEXT_DATA__" type="application/json">', "")
    .replace("</script>", "");

  // parse the data to JSON in the hackiest way possible
  const parsedData = JSON.parse(JSON.parse(JSON.stringify(data)));

  // get the APOLLO_STATE from the parsed json
  const state = parsedData.props.pageProps.__APOLLO_STATE__;

  // extract event data from the apollo state
  const events = [];
  for (const key of Object.keys(state)) {
    if (key.includes("Event")) {
      const { id, title, eventUrl, dateTime, going, venue, rsvpSettings } =
        state[key];

      // get meetup photo if it exists
      let photo = null;
      if (state[key].featuredEventPhoto) {
        const photoRef = state[key].featuredEventPhoto.__ref;
        photo = state[photoRef].highResUrl;
      }

      // get member photos for the first 5 RSVPs
      const memberPhotos = [];
      const firstFiveRSVPs = state[key]['rsvps({"first":5})'].edges;
      for (const rsvp of firstFiveRSVPs) {
        const memberRef = state[rsvp.node.__ref].member.__ref;

        if (memberRef) {
          const photoRef = state[memberRef]?.memberPhoto?.__ref;
          if (photoRef) memberPhotos.push(state[photoRef].highResUrl);
        }
      }

      // get venue details
      const {
        name,
        address,
        city,
        state: province,
        country,
      } = state[venue.__ref];

      events.push({
        id,
        title,
        eventUrl,
        dateTime,
        rsvpsOpen: !rsvpSettings.rsvpsClosed,
        rsvpCount: going.totalCount,
        photo,
        memberPhotos,
        location: {
          name,
          address: `${address} ${city} ${province} ${country}`,
        },
      });
    }
  }

  return events;
}

async function main() {
  try {
    const upcoming = await fetchEvents(
      "https://www.meetup.com/ottawa-forwardjs-meetup/events/?type=upcoming",
    );
    await writeJsonToFile("./src/data/upcomingEvents.json", upcoming);

    const past = await fetchEvents(
      "https://www.meetup.com/ottawa-forwardjs-meetup/events/?type=past",
    );
    // write the last 5 past events to the JSON files
    await writeJsonToFile("./src/data/pastEvents.json", past.slice(0, 5));
  } catch (error) {
    console.error("Error fetching events", error);
  }
}

main();
