# Echoes of Exploration — implementation update

Research snapshot: 13 November 2026

## What changed

- Expanded the curated archive from 25 to 31 source-linked investigation records.
- Added seven major records: Curiosity, Perseverance, Ingenuity, Mars Odyssey, Mars Reconnaissance Orbiter, MAVEN, and the Apollo Lunar Roving Vehicles.
- Added four important mission-ending records: Lunar Prospector, Mars Observer, Mars Climate Orbiter, and Mars Polar Lander / Deep Space 2.
- Added engineering dossiers to the story pages: mass, dimensions, power, propulsion/mobility, planned lifetime, instruments, structure, and engineering notes where the sources support those values.
- Added documentary chapters, milestone dates, components, mission endings, current/last-known status, and primary-source links for the new records.
- Added a distinct `Accidental atmospheric loss` ending filter so Mars Climate Orbiter is not incorrectly grouped with intentional impacts.
- Replaced several abstract homepage illustrations with real NASA imagery and added image credits.
- Updated the homepage and archive counts dynamically. The current curated dataset contains 11 Moon records, 16 Mars records and 4 other-destination records.
- Updated the methodology page to state clearly that 25 records are not a complete census of every mission or physical artifact. No global total is claimed until the counting rules and inventory are complete.

## Research and classification safeguards

- A record can represent one spacecraft, a related set of spacecraft, or a component family. Record counts must not be described as total mission counts or total physical artifacts.
- Orbiter records are identified as orbital hardware, not surface debris.
- Intentional impacts, accidental atmospheric destruction, communication loss, remote shutdown, immobilization, and discarded-by-design are separate outcomes.
- Loss of signal is not treated as proof of physical destruction.
- Partner/international equipment is identified separately from NASA hardware.
- Imagined first-person passages remain labelled as creative writing, not historical transmissions.
- Image assets are linked to their NASA source page and carry captions/credits. Some records use contextual NASA imagery where a direct artifact photograph was not selected; the UI labels those as context/artist concept where specified.

## Important remaining work

- This is a meaningful expansion, not yet a complete census of every lunar and Martian mission since 1964. Continue the inventory with the full Surveyor series, all Ranger attempts, Lunar Orbiter series, Viking orbiters, Clementine, Apollo surface equipment by landing site, and additional Mars missions/components.
- Verify every image URL in a browser and replace any broken NASA asset identifier with a confirmed NASA Image and Video Library asset.
- Verify technical values against each mission's official fact sheet before treating them as final; mass can mean launch mass, landed mass, or rover-only mass.
- Run `npm install` and `npm run build` in an environment with dependencies available. The artifact data file passed standalone TypeScript type-checking; the full Vite build could not be run in this container because project dependencies were not installed.


## Uploaded research dossier integration — 13 November 2026

Integrated the supplied NASA Abandoned But Not Forgotten Research Report into the archive. The collection now contains **31 curated records**: 11 Moon, 16 Mars and 4 other-destination records. This is a curated collection aligned to the supplied dossier, not a complete census of every NASA mission or every physical artifact.

Added records:
- Surveyor 1, 2, 4, 5, 6 and 7 (Surveyor 3 remains a separate case file)
- Apollo Lunar Module descent stages for Apollo 12, 14, 15, 16 and 17 (Apollo 11 Eagle remains separate)
- Dawn at Ceres
- NEAR Shoemaker on asteroid Eros
- Pioneer 10 and Pioneer 11
- Kepler Space Telescope

Accuracy safeguards from the dossier are reflected in the stories: Apollo 11 deployed EASEP rather than full ALSEP; Apollo 13 did not land; descent and ascent stages had different fates; Surveyor 2 and Surveyor 4 endings are distinguished; Dawn exhausted hydrazine for attitude control; NEAR Shoemaker made a controlled touchdown; Pioneer probes are outbound spacecraft, not planetary artifacts; Kepler remains in a heliocentric orbit trailing Earth.

Some records use NASA contextual imagery rather than a direct photograph of the artifact. Such images are labelled as context in the interface and are not represented as photographs of the object itself.
