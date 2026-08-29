# Security

This repository holds a personal portfolio site: static HTML, CSS and a little
JavaScript, built by a Node script and served by Cloudflare. There is no server
code, no database, no login and no user data.

## Reporting something

If you spot a security problem, please open a
[private security advisory](https://github.com/Marym233/Portfolio/security/advisories/new)
rather than a public issue, so it can be fixed before it's widely known.

Please don't run automated scanners or load tests against the live site.

## What's in scope

- Anything that would let someone change what the site serves
- Secrets or personal data accidentally committed to this repository
- Problems in the build script (`build.mjs` and `build/`)

## What's not

- Missing headers that don't apply to a static site with no cookies or logins
- Reports produced purely by an automated scanner with no working example
- Issues in Cloudflare or GitHub themselves — report those to those vendors

## How this repo protects itself

- No secrets are stored here. Deployment is done by Cloudflare's Git
  integration, so no deploy token needs to live in GitHub.
- `.gitignore` blocks the usual secret files, including wrangler's `.dev.vars`.
- GitHub secret scanning and push protection are enabled (free for public repos).
- Every push and pull request is built by CI; a build warning fails the check.
- Dependabot proposes dependency and action updates monthly.
- `main` is protected: changes land through pull requests that must build.
