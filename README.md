# awholefamilymatter.org

Public marketing site for A Whole Family Matter. Next.js 14 (App Router)
with static export — every page ships as prerendered HTML. The product
lives at awholefamilymatter.app; all sign-in / join links point there.

## Develop

    npm install
    npm run dev        # http://localhost:3000

## Build & serve

    npm run build      # writes the static site to out/
    npm start          # serves out/ on $PORT (Railway)

## Pages

- `/` — the app: care team planning, care fund pooling, patient advocacy, sponsors
- `/community/` — free community landing (ported from the app repo)
- `/about/`, `/team/`, `/security/`

Before launch: confirm Team names/titles/photos and have Security copy
signed off against the GDPR audit.

## Writing a blog post

Add a Markdown file to `content/blog/<slug>.md` — the filename becomes the
URL (`/blog/<slug>/`). Start it with front matter:

    ---
    title: "Your title"
    description: "One or two sentences for the card and link previews."
    date: "2026-10-13"
    category: "Product"
    author: "A Whole Family Matter"
    cover: "https://res.cloudinary.com/.../image.jpg"
    draft: true        # optional — hides the post until removed
    ---

Then write the article in Markdown (## headings, **bold**, lists, links).
Run `npm run build` and the post appears on /blog, newest first.
