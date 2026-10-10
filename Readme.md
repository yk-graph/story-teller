# Vancouver — Four Seasons

- **Live:** https://story-teller-gilt.vercel.app/
- **Repo:** https://github.com/yk-graph/story-teller
- **Author:** yk-graph
- **Story:** A cinematic scroll-story of Vancouver through its four seasons — spring, summer, autumn, and winter.

## About

A one-page scroll story. As the reader scrolls from top to bottom, the year turns:
each season (SPRING → SUMMER → AUTUMN → WINTER) plays out over a full-screen video
with its own chapter title and subtitles, like a short film trailer for the city.

Every scene is anchored to a real Vancouver place — Stanley Park, English Bay,
Granville Island, Grouse Mountain — and animation is used with restraint so that
each moment arrives quietly and leaves gracefully.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript
- [Motion](https://motion.dev/) for scroll-linked animation and scene transitions
- Fonts: Bebas Neue / Cormorant Garamond (`@fontsource`)
- Deployed on [Vercel](https://vercel.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the built app |
| `npm run lint` | Run ESLint |
