# Spotify for Artists — Clone (React Frontend)

A dark-themed artist dashboard inspired by Spotify for Artists: home overview,
music catalog, audience insights, stats, and a login screen.

## Where to put your images

Drop your image files into `src/assets/images/` using these EXACT names —
the app already references them, so they'll appear automatically once added:

| File name              | Used for                          |
|-------------------------|------------------------------------|
| `artist-avatar.jpg`     | Your profile photo (topbar)        |
| `song-1.jpg`            | Top song #1 cover art              |
| `song-2.jpg`            | Top song #2 cover art              |
| `song-3.jpg`            | Top song #3 cover art              |
| `song-4.jpg`            | Top song #4 cover art              |
| `song-5.jpg`            | Top song #5 cover art              |

If a file is missing, the app gracefully hides the broken image — it won't crash.

## Project structure

```
src/
  assets/images/   <- put your pics here
  components/      <- Sidebar, Topbar, Layout, StatCard
  pages/           <- Login, Home, Music, Audience, Stats, Settings
  data/mockData.js <- all sample stats/song data — edit this to change numbers
  App.jsx          <- routes
  main.jsx         <- entry point
```

## Run locally

```
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Login

This demo has no real backend yet — any email/password logs you in.
We'll connect a real backend + database in the next step.
