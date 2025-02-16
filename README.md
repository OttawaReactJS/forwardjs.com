# ForwardJS

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run data`            | Uses the `scripts/fetchMeetupData.js` script     |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run lint`            | Checks for format and lint errors                |
| `npm run lint:fix`        | Fixes format and lint errors                     |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Project Structure

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   └── ...
│   ├── data/
│   │   ├── pastEvents.json
│   │   └── upcomingEvents.json
│   ├── styles/
│   │   └── global.css
│   └── pages/
│       └── index.astro
├── scripts/
│   └── fetchMeetupData.js
└── package.json
```
