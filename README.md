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
