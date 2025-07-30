import { defineCollection } from "astro:content";
import { file } from "astro/loaders";

const pastEvents = defineCollection({
  loader: file("./src/data/pastEvents.json"),
});

const upcomingEvents = defineCollection({
  loader: file("./src/data/upcomingEvents.json"),
});

const jobs = defineCollection({
  loader: file("./src/data/jobs.json"),
});

const projects = defineCollection({
  loader: file("./src/data/projects.json"),
});

const meetupStats = defineCollection({
  loader: file("./src/data/meetupStats.json"),
});

export const collections = {
  pastEvents,
  upcomingEvents,
  jobs,
  projects,
  meetupStats,
};
