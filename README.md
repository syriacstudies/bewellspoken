# Well Spoken — bewellspoken.com

Parent-friendly speech and language guidance reviewed by licensed SLPs.

## Deploy to Cloudflare Pages

### 1. Create the GitHub repo

```bash
cd bewellspoken
git init
git add .
git commit -m "Initial commit — Well Spoken prototype"
```

Go to github.com → New repository → name it `bewellspoken` (or whatever you like) → create it empty (no README).

```bash
git remote add origin git@github.com:YOUR_USERNAME/bewellspoken.git
git branch -M main
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to dash.cloudflare.com → your account → **Workers & Pages** → **Create**
2. Select the **Pages** tab → **Connect to Git**
3. Pick the `bewellspoken` repo you just pushed
4. Build settings:
   - **Framework preset**: None
   - **Build command**: (leave blank — no build step needed)
   - **Build output directory**: `/` (the root — your index.html lives at the top level)
5. Click **Save and Deploy**

Cloudflare will assign you a `*.pages.dev` URL in about 30 seconds.

### 3. Add your custom domain

1. In the Cloudflare Pages project → **Custom domains** → **Set up a custom domain**
2. Enter `bewellspoken.com`
3. If bewellspoken.com is already on your Cloudflare DNS: it will auto-add the CNAME record
4. If the domain is on another registrar: Cloudflare will tell you which CNAME to add
5. Add `www.bewellspoken.com` as well and it will auto-redirect to the apex

### 4. Done

Every time you `git push` to `main`, Cloudflare Pages will automatically redeploy.

## PWA

The site includes a `manifest.json` and `sw.js` service worker. On mobile:
- **iOS Safari**: Share → Add to Home Screen
- **Android Chrome**: Installs automatically after two visits or via the browser prompt

The app works offline after the first visit.

## Project structure

```
bewellspoken/
├── index.html       ← the entire app (single-file SPA)
├── manifest.json    ← PWA manifest (name, icons, theme)
├── sw.js            ← service worker (offline caching)
├── _headers         ← Cloudflare Pages security headers
├── _redirects       ← SPA catch-all (insurance for future routing)
├── icons/
│   ├── icon-192.png ← PWA icon (home screen)
│   └── icon-512.png ← PWA splash screen
└── .gitignore
```
