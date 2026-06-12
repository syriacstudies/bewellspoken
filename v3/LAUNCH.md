# Well Spoken v3 — launch preview

Built June 2026. A full launch candidate for bewellspoken.com, resource-first, with Jill as an optional valve. Nothing here commits her to anything: no response-time promises, no booking, no name on the public pages.

## What is here

- `index.html` — homepage. Animated hero, three doors, "every family arrives with one of these," the calm path, reviewed-by block, professionals strip, soft contact.
- `check-in.html` — the signature interactive. Four age bands, eight questions each, scoring straight from `content_screeners.md`, with a printable and copyable summary parents can bring to their pediatrician. No email, no account, nothing leaves the browser.
- `milestones.html` — explorer with four age bands, from `content_milestones.md`.
- `library/` — hub plus the six cornerstone articles from `article_roadmap.md`.
- `for-professionals.html` — the quiet page for pediatricians, teachers, and directors.
- `talk.html` — soft contact, mailto only, no promises.
- `assets/` — shared styles, shared JS, Jill's photo (used without her name; see below).

## To preview

Push to main. Cloudflare will serve it at bewellspoken.com/v3/ (the `_redirects` and `_headers` files at repo root were updated; /v3/ is noindexed and uncached). The splash page stays live at the root.

Or locally: `python3 -m http.server` from the repo root, then open localhost:8000/v3/.

## Before flipping it live

1. Jill reads everything. Every clinical claim traces back to the content files she was already going to review, but this is the real copy now. The "Private preview" bar at the top of every page is one HTML element; delete it at launch.
2. Decide with her about the photo and whether her name appears. Right now the site says "a licensed, ASHA-certified speech-language pathologist in Bergen County" and never names her. Her photo appears once on the homepage. Both are easy to remove or expand.
3. Set up hello@bewellspoken.com forwarding.
4. To go live: move v3 contents to the repo root (replacing the splash), update the absolute `/v3/` paths to `/`, remove the noindex meta tags and the preview bar, and retire the old SPA catch-all in `_redirects`. Happy to do this in a session when you say go.
5. Optional next: per-article SEO metadata and social cards, a sitemap, and analytics. None block the preview.

## Photography

The article headers, library hero, and professionals page use photos served from Unsplash's CDN (images.unsplash.com). The Unsplash license is free for commercial use with no attribution required, and hotlinking their CDN is how their service is designed to be used. If you ever want full control, download the same images and drop them in `v3/assets/`, then swap the URLs. Swapping any photo is a one line change; just tell Claude which page and what mood.

## What was deliberately left out

- Any promise that a specific person reads or replies on a clock.
- Evaluation booking, directories, testimonials, email capture, accounts.
- The four "options" directions stay untouched under /options/.
