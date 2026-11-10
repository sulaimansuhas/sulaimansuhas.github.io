# Obsidian shelf sync

The deployment workflow fetches `sulaimansuhas/Moria` at `main` and imports
`ReadingList/Books/*.md` and `WatchingList/Movies/*.md` before building.
It runs on website pushes, manual dispatch, and hourly at minute 17 (UTC).
GitHub schedules can be delayed. Only changes pushed to Moria are picked up.

## One-time GitHub setup

Create a fine-grained personal access token restricted to the Moria repository
with **Contents: Read-only**. Add it as the website repository Actions secret
`MORIA_TOKEN`. Do not put the token in this repository or in chat.
The website's default GITHUB_TOKEN cannot read a separate private repository.
The workflow fails explicitly if the token is missing or checkout/import fails,
so a failed sync does not deploy a stale or partial collection.

Push the website changes to master to activate the workflow, then run Deploy
site manually to verify access. Existing RESUME_TOKEN configuration is unchanged.

## What is published

Templates and notes with `publish: false` are excluded. Other Markdown files in
the two named folders are automatically included, including future additions.
Recipes and other vault folders are not imported. Exported fields: title,
author/director, cover/poster URL, status, rating, year, and the note body
(displayed as plain text). Images must use HTTP(S) URLs.

The private checkout is removed before the build. Only the generated shelf data
enters the public site; CI does not commit that snapshot back to this repository.
The /shelf/ page has no main-navigation entry and requests noindex, but is public.

## Data source

GitHub is the source of truth. The importer reads only the temporary
`.shelf-vault` checkout created by the workflow. There is no local Obsidian path,
home-directory fallback, or OBSIDIAN_VAULT setting.

The existing generated snapshot supports local UI previews. Deployments always
replace it with fresh data from GitHub before building.
