# Nametag Bounce Demo

A bouncing nametag inside a dark "void box".

## Current behavior
- Nametag text is now `korea`.
- On exact corner hits, there is a **1 in 50 chance** to trigger celebration mode.
- Celebration mode fills the box with a fullscreen GIF and tries to play a song.

## Add your media files
Put your media files in the project root (same folder as `index.html`) and keep these default names:
- `celebration.gif`
- `celebration.mp3`

Or change these constants in `script.js`:
- `CELEBRATION_GIF_URL`
- `SONG_URL`

### How to upload audio here
This chat accepts images/GIF previews, but audio should be provided as a file in the repo/workspace. Once the audio file exists in the project, point `SONG_URL` to it (for example, `./my-song.mp3`).
