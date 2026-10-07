# Mangragaad Dhara

A minimal V1 map explorer for Mangragaad Dhara, near Pauri, Uttarakhand. Built with Vite, TypeScript, Leaflet, and Google's model-viewer.

## Run locally

Requires Node.js 20.19+ or 22.12+.

On a Mac, double-click **Start Preview.command** to open the preview. It reuses the running preview or starts one in Terminal. Keep that Terminal window open while using it. A localhost link needs a running local server; it is not a public deployment URL.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. For a production build:

```sh
npm run build
npm run preview
```

## GitHub and Vercel

Push this project to a GitHub repository, then import it into Vercel.

- Framework preset: **Vite**
- Build command: **npm run build**
- Output directory: **dist**
- Root directory: this project folder
- No API keys, environment variables, or backend setup needed.

`vercel.json` supplies the framework and build configuration. Include `package-lock.json` and `public/assets/` in the repository. Original media files at the project root are preserved locally and ignored to avoid duplicating them; the deployable copies are under `public/assets/`.

## Explore

- Pan and zoom the OpenStreetMap map; the recenter control returns to the spring marker.
- Select the live 3D spring on the map, or use **Explore the dhara**.
- Rotate and zoom the supplied bull-head-spout model in the detail view.
- Select **Video tour** for the 24-second portrait video, with native playback and audio controls.
- The detail view supports keyboard tabs, Escape to close, and focus restoration.

## Location and content

The spring's exact coordinates are **unverified**. Per the V1 brief, the marker uses Pauri town as an approximate area reference, visibly labeled in the map and details. It is not a directions pin. The place names are supplied by the project owner.

Update `src/place.ts` with the exact latitude/longitude when available, and set `locationIsApproximate` to `false`. The current reference is [OpenStreetMap Pauri node 342110039](https://www.openstreetmap.org/node/342110039).

The bull-head model is displayed as a **3D interpretation**, rather than a surveyed reconstruction. No unverified history, drinking-water safety, travel times, or measurements are presented.

## Assets

- `public/assets/dhara.glb` — supplied bull-head-spout model.
- `public/assets/spring.jpeg` — supplied spring photograph.
- `public/assets/tour.mp4` — supplied tour video (H.264, portrait, 24 seconds).

The map needs an internet connection. OpenStreetMap attribution stays visible; tiles load only for the current view. This prototype uses the public tile service; for substantial traffic, configure a suitable tile provider following the [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/). Google Fonts supplies DM Sans and Instrument Serif, with local font fallbacks.
