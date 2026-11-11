# Pari weds Jai: Wedding Invitation

A one-page wedding invitation built with plain HTML, CSS and JavaScript. There is no build step, and it runs on GitHub Pages.

```
index.html               the page
assets/style.css         all styling
assets/script.js         CONFIG (all editable text and links) + behaviour
assets/logo.png          "Magical Moments by Jai Ahuja" credit logo (gold, transparent)
assets/og-image.jpg      1200×630 WhatsApp / social preview image
assets/favicon-32.png, favicon-192.png, apple-touch-icon.png
music/music.mp3          background music (96 kbps re-encode)
```

## Editing the content

Every name, date, time, venue detail, map link, family and credit is in the **`CONFIG` object at the top of `assets/script.js`**. Change the text there and save the file.

The link-preview text (`<title>`, `og:title`, `og:description`) is the one exception. It lives in the `<head>` of `index.html`, because WhatsApp reads the HTML directly and does not run JavaScript.

## Deploy on GitHub Pages

1. Create a new **public** repository on GitHub, for example `pari-weds-jai`.
2. Upload everything in this folder (`index.html`, `README.md` and the `assets/` folder) to the repository root. You can use **Add file → Upload files**, or use git:
   ```bash
   git init
   git add .
   git commit -m "Wedding invitation"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/pari-weds-jai.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*, set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.
5. After a minute or two, the site is live at `https://YOUR-USERNAME.github.io/pari-weds-jai/`.

### Required for the WhatsApp preview

WhatsApp only shows the preview image when it is given a **full URL**. After the first deploy, open `index.html` and make these changes:

```html
<meta property="og:image"  content="https://YOUR-USERNAME.github.io/pari-weds-jai/assets/og-image.jpg">
<meta name="twitter:image" content="https://YOUR-USERNAME.github.io/pari-weds-jai/assets/og-image.jpg">
<meta property="og:url"    content="https://YOUR-USERNAME.github.io/pari-weds-jai/">   <!-- uncomment this one -->
```

Commit and push the change. WhatsApp caches previews, so if you already shared the link once, test with a new variant such as `...github.io/pari-weds-jai/?v=2`.

## Replacing files

| What | How |
|---|---|
| **Background music** | Put an MP3 at `music/music.mp3` (path set in `CONFIG.music`). Keep it small (128 kbps, about 2–4 MB) so it loads quickly on 4G. Music starts when the guest taps the envelope, and the floating button mutes or unmutes it. If the file is missing, the button stays hidden and nothing breaks. |
| **Credit logo** | Replace `assets/logo.png`. The current file is a gold-on-transparent version of the original logo, so it shows up on the dark footer. If the file is missing, the image hides itself and the text from `CONFIG.credit.text` is shown instead. |
| **Preview image** | Replace `assets/og-image.jpg`. Use 1200×630 pixels and keep it under 300 KB (WhatsApp skips larger images). Then update the full URL as described above. |
| **Map pin** | In `CONFIG.venue`, set `directionsUrl` to your exact pin. A `https://maps.app.goo.gl/...` share link works. For the embedded map, go to Google Maps → **Share → Embed a map**, copy the `src="..."` URL from the iframe code, and paste it into `mapEmbedUrl`. |
| **Favicon** | Replace the three PNGs in `assets/`. They are 32 px, 192 px and 180 px squares. |

## Test locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

Opening `index.html` by double-clicking also mostly works. The map embed and music behave more reliably when served through the local server.

## Notes

- The countdown targets `CONFIG.weddingStart` (26 Nov 2026, 7:00 PM IST). After that time it changes to "The celebrations have begun!".
- The scratch card works with touch and with a mouse. Once about 50% of the gold is scratched off, the rest clears automatically and confetti fires. Keyboard users get a hidden "Reveal" button.
- For guests whose phones are set to reduce motion, the falling particles, confetti and long animations are turned off.
