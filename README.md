# Maryam Shah — portfolio

Same site as before, split into separate files so it's easier to change and
deploy. All the words and links live in **one file**: `content.json`.

## Folders

```
content.json      ← everything you'd normally want to change lives here
build.mjs         ← the build, start to finish. Reads like a checklist.
build/
  paths.js        ← where the folders are
  html.js         ← escaping + small template helpers
  icons.js        ← inline SVGs
  partials.js     ← markup shared by more than one section
  sections/       ← one file per {{slot}}, plus index.js listing them
  render.js       ← content.json + src/index.html → finished html
  assets.js       ← writing and copying into dist/
  checks.js       ← the "you forgot something" warnings
wrangler.toml     ← Cloudflare settings
src/
  index.html      ← page shell (head tags, where sections go)
  css/
    tokens.css    ← colours and fonts. Change the theme here.
    base.css      ← resets and shared layout
    components.css← buttons, cards, tags, social rows
    sections.css  ← nav, hero, about, timeline, projects, contact
  js/
    main.js       ← runs the three bits below
    nav.js        ← phone menu
    reveal.js     ← fade-in on scroll
    year.js       ← footer year
  public/         ← your photo, project images, CV — copied as-is
dist/             ← generated. Never edit; it gets wiped on every build.
```

## First run

```bash
pnpm install
pnpm run build     # writes dist/
pnpm start         # build + local preview at http://localhost:8787
```

You need Node 18 or newer.

## Making changes

**New job, new project, new skill, changed email?** Open `content.json`, copy an
existing block, edit it, run `pnpm run build`. Nothing else to touch.

**Different colours?** `src/css/tokens.css` — change `--accent` and the rest
follows.

**New section entirely?** Three steps:

1. Add `build/sections/yourSection.js`, copying an existing one. It exports
   `default (content) => '<html string>'`.
2. Add it to the list in `build/sections/index.js`.
3. Put `{{yourSection}}` in `src/index.html` where it should appear.

The name has to match in all three places. If a slot is left unfilled the build
prints a warning telling you which one.

**Editing an existing section?** It's the file with its name in
`build/sections/`. Nothing outside that file needs to change.

## Files you still need to add

Drop these into `src/public/` — the build copies them to the site root and
warns you if any are missing:

- `Maryam_Shah.jpg` — the About photo
- `Project_1.jpg` — the Student Location screenshot
- `Maryam-Shah-CV-2026.pdf` — the CV both Download buttons point at

The CV filename is set once in `content.json` under `site.cvFile`, so both
buttons can never drift apart again.

## Deploying to Cloudflare

Deployment is automatic. The repository is connected to Cloudflare Workers
Builds, so:

- a push to `main` builds and deploys to production
- a push to any other branch creates a preview deployment

The Cloudflare build settings are:

| Setting | Value |
| --- | --- |
| Build command | `pnpm run build` |
| Deploy command | `npx wrangler deploy` |
| Node version | read from `.node-version` |

Nothing needs an API token, because Cloudflare pulls from GitHub itself.

**A broken build cannot deploy.** Cloudflare sets `CI=true`, and in CI the
build turns its warnings into an error — so a missing photo, an unfilled
template slot or a placeholder email fails the build instead of quietly going
live. On your own machine the same warnings are only printed, so a
half-finished page still previews.

To deploy by hand instead:

```bash
npx wrangler login
pnpm run deploy
```

There's no server code — Workers just serves the files in `dist/` from the
edge. `src/public/_headers` sets caching and a few safety headers.

To use a custom domain, add it under the Worker's **Settings → Domains &
Routes** in the Cloudflare dashboard, then update `site.url` in `content.json`
so the link previews point at the right place.

## Things fixed along the way

- The two Download CV buttons pointed at two different filenames
  (`Maryam_2026.pdf` and `Maryam_Shah_CV_2026.pdf`). Now one setting.
- The contact email was still `your@email.com` in both places. It's now set in
  `content.json`, and the build fails in CI if it ever goes back to a
  placeholder.
- The CV link pointed at filenames that were not in the repository, so the
  Download CV button downloaded nothing.
- The Student Location description ended mid-sentence on "Technologies used:".
- Photo and card backgrounds were still indigo from an earlier colour scheme,
  which clashed with the blush accent. They now use theme colours.
- On phones the nav links just disappeared with no way to reach them. There's a
  Menu button now.
- Added link-preview tags so the site looks right when shared on LinkedIn.

## Worth a second look

Your education dates read **Sep 2022 — May 2028**, which is six years, and the
About text says Class of 2028. I've set it to Sep 2024 in `content.json` as the
likely intent — change it back if 2022 was right.
