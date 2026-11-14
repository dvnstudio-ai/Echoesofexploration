# Echoes of Exploration — NASA Space Apps Challenge 2026

**Worlds explored. Stories left behind.**

An evidence-led, student-friendly archive about human-made hardware left on the Moon, Mars, asteroids and deep space. The current curated collection contains 31 investigations based on the supplied *NASA Abandoned But Not Forgotten Research Report* (research snapshot: 13 November 2026).

## Implemented experience

- Immersive documentary-style landing page with Moon, Mars and deep-space entry points, collection counts and a chronological timeline.
- Searchable archive with destination (Moon, Mars and Other) and mission-ending filters.
- 31 curated artifact investigations covering the research guide's core cases.
- Mission chronology, purpose, components, scientific legacy, ending explanation and current-location evidence.
- Clear distinctions between intentional impact, power loss, communication loss, immobilization, remote shutdown, discarded-by-design and continuing scientific use.
- Interactive student challenge on each investigation, with hint and revealable verified explanation.
- Browser-based narration and captions; creative first-person passages remain explicitly labelled as imagined writing.
- NASA primary-source links and NASA Image and Video Library search links. Context images are explicitly labelled when they do not depict the artifact itself.

## Run locally on Windows PowerShell

```powershell
cd "C:\Users\devan\Downloads\echoes-of-exploration\echoes"
npm install
npm run dev
```

Open the local URL printed by Vite. Keep the PowerShell window open while using the site. Stop the server with `Ctrl + C`.

If `npm install` fails with `ECONNRESET`, check network connectivity and retry; Vite will not be available until dependencies finish installing.

## Useful commands

```powershell
npm run dev
npm run build
npm run test
npm run lint
```

## Accuracy and media notes

- This is a curated set, not a complete inventory of every human-made object on either world.
- “Abandoned,” “failed,” “destroyed,” “lost contact” and “deliberately discarded” are not interchangeable.
- Where the guide does not establish a precise location or physical condition, the interface says so rather than guessing.
- Confirm exact image asset, caption, credit and usage notes against the linked NASA source before public release. Some cards intentionally use clearly labelled contextual images while exact artifact photographs are still to be selected.
- The collection preserves the uploaded research dossier's 13 November 2026 snapshot. Re-check mission pages and media before the final demo.

## Stack

TanStack Start · React · TypeScript · Tailwind CSS · Vite
