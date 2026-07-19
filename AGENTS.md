# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## What this repo is

Zichuan Xu's personal academic homepage, built on the **Academic Pages** Jekyll template (a fork of `academicpages/academicpages.github.io`, itself derived from the Minimal Mistakes theme). Deployed via GitHub Pages at https://zichuanxu.github.io.

The site is content-heavy: most edits are to markdown files in collection folders (`_publications/`, `_talks/`, `_teaching/`, `_portfolio/`, `_posts/`, `_pages/`) plus `_config.yml`. Layout/CSS changes are the exception, not the rule.

## Common commands

### Local Jekyll dev server
```bash
bundle install                          # install Ruby gems (run once / when Gemfile changes)
bundle exec jekyll serve -l -H localhost  # build + serve on http://localhost:4000 with livereload
```
- Markdown/HTML changes hot-reload. **Changes to `_config.yml` require a server restart.**
- If `bundle install` hits permission errors, scope it locally: `bundle config set --local path 'vendor/bundle'` then retry.

### Docker (avoids Ruby toolchain on host)
```bash
chmod -R 777 .
docker compose up                       # serves on http://localhost:4000
```
Uses `_config.yml` + `_config_docker.yml` (the latter is currently empty — overrides go there).

### JS bundle
The site ships a single minified bundle at `assets/js/main.min.js`. Source files are under `assets/js/`. After editing JS source:
```bash
npm install                             # once
npm run build:js                        # uglify + concat → assets/js/main.min.js
npm run watch:js                        # rebuild on change
```
The bundle order is fixed in `package.json` scripts.uglify — jQuery → fitvids → smooth-scroll → plotly → greedy-nav plugin → `_main.js`. Preserve that order when editing.

### CV JSON regeneration
`_data/cv.json` drives the CV page and is generated from `_pages/cv.md`:
```bash
./scripts/update_cv_json.sh             # runs scripts/cv_markdown_to_json.py
```
Edit `cv.md`, then regenerate; don't hand-edit `cv.json`.

### Publications / talks from structured data (optional)
`markdown_generator/` converts TSV / CSV / BibTeX into per-item markdown files under `_publications/` and `_talks/`:
```bash
cd markdown_generator
python3 publications.py publications.csv
python3 talks.py                        # reads talks.tsv
# notebooks (publications.ipynb, talks.ipynb, PubsFromBib.ipynb, OrcidToBib.ipynb) document the formats
```

### Talk map
`talkmap.ipynb` reads `_talks/` and emits `talkmap/org-locations.js` for the map page. GitHub Actions (`.github/workflows/scrape_talks.yml`) re-runs it automatically on any push that touches `talks/**`, `_talks/**`, or `talkmap.ipynb`, then commits the result back. **Don't hand-edit `talkmap_out.ipynb` or `talkmap/org-locations.js`** — they're regenerated.

### Tests / lint
There is no test suite and no linter configured. "It works" means `jekyll serve` builds clean and the affected pages render.

## Architecture notes

### Jekyll collections drive the content model
`_config.yml` declares four collections — `publications`, `talks`, `teaching`, `portfolio` — each output with permalink `/:collection/:path/`. Plus `_posts/` (blog), `_pages/` (top-level pages like About, CV), and `_drafts/`. To add a publication, drop a markdown file into `_publications/`; the layout, sidebar, and listing page (`_pages/publications.html`) pick it up automatically via Liquid.

`defaults:` in `_config.yml` sets per-collection layout + sidebar behavior — touch this before changing layout on individual files.

### Theming
- `site_theme: sunrise` in `_config.yml` (options: `default`, `air`, `sunrise`, `mint`, `dirt`, `contrast`). The theme name maps to a partial under `_sass/theme/`.
- `_sass/` is structured Minimal-Mistakes-style: `_themes.scss` + `theme/`, `layout/`, `include/`, `vendor/`. Built via Jekyll's Sass converter (compressed).
- Page templates: `_layouts/` (`single.html`, `archive.html`, `talk.html`, `cv-layout.html`, etc.); reusable partials in `_includes/` (`author-profile.html`, `head/`, `footer/`, `comments-providers/`, `analytics-providers/`, etc.).

### Navigation / data files
- `_data/navigation.yml` — top nav links.
- `_data/authors.yml` — multi-author bios (the default author comes from `_config.yml`'s `author:` block).
- `_data/ui-text.yml` — translatable UI strings.
- `_data/cv.json` — generated; see CV section above.
- `_data/comments/` — Staticman comment storage (Staticman config is in `_config.yml` but `comments.provider` is unset, so comments are off by default).

### Static files
- `images/` — site imagery, profile photo (`profile.png`), theme previews.
- `files/` — downloadable assets (PDFs, slides). URLs: `https://<site>/files/<name>`.

### GitHub Pages / safe-mode constraints
The site is deployed by GitHub Pages with `--safe`, so plugins are restricted to the `whitelist:` in `_config.yml` (`jekyll-feed`, `jekyll-gist`, `jekyll-paginate`, `jekyll-sitemap`, `jekyll-redirect-from`, `jemoji`). Don't add other plugins unless you also move to a self-built deploy.

## Editing gotchas

- Front-matter `permalink:` values are the source of truth for URLs — changing them breaks inbound links.
- `_config.yml` is **not** reloaded by `jekyll serve -w`; restart the process after editing.
- The `_site/` and `.sass-cache/` directories are build output; never commit changes to them by hand.
- `Gemfile.lock` is committed — if `bundle install` fails with resolution errors, the README's guidance is to delete it and retry.
- Node engine in `package.json` is `>= 0.10.0` (very loose); any modern Node works for the uglify scripts.
