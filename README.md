# Nametag Bounce Demo

A bouncing nametag inside a dark "void box".

## Current behavior
- Nametag text is `korea`.
- On **every exact corner hit**, celebration mode triggers.
- Celebration mode shows a fullscreen GIF overlay.
- Audio is set up as a skeleton and is currently disabled until you add your own file.

## Media setup
Put your media files in the project root (same folder as `index.html`):
- `celebration.gif` (or change `CELEBRATION_GIF_URL`)
- your audio file (for example `C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3`)


## URL vs local file path (important)
Use a **local file path** if the MP3 is in your project folder.
- If your MP3 sits next to `index.html`, use:
  - `const SONG_URL = './C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3';`
- If your MP3 is in a subfolder like `audio/`, use:
  - `const SONG_URL = './audio/C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3';`

Use a full URL only if the file is hosted online (for example on a CDN).

## Audio skeleton (you finish this part)
In `script.js`, these settings are ready for you:
- `const ENABLE_CORNER_AUDIO = false;`
- `const SONG_URL = '';`

To enable your song:
1. Add your audio file to the repo/workspace (example: `C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3`).
2. Change `SONG_URL` to that path (example: `const SONG_URL = './C2C283A5-B1D0-4079-B662-5FEA422BEBEE.mp3';`).
3. Set `ENABLE_CORNER_AUDIO` to `true`.
4. Reload the page and click once in the box if your browser blocks autoplay.

## Optional: tune celebration frequency
Right now it shows on every corner by default:
- `SHOW_ON_EVERY_CORNER_HIT = true`

If you want random chance instead, set it to `false` and tune:
- `CORNER_HIT_CHANCE_DENOMINATOR` (smaller number = more frequent)
  - `2` => 1 in 2
  - `3` => 1 in 3
  - `5` => 1 in 5
