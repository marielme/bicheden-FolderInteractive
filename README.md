# bicheden-web

Interactive browser experiment that uses webcam hand tracking to control a 3D folder model.

The app combines `p5.js`, `ml5.js` hand pose detection, and Google's `<model-viewer>` web component. A small webcam preview appears in the corner, tracks the user's hand, and maps wrist movement to the 3D model camera orbit.

## Features

- Real-time hand tracking through the webcam
- 3D `.glb` model displayed with `<model-viewer>`
- Wrist position controls the model camera angle
- Open hand plays the model animation forward
- Closed hand plays the model animation backward
- Webcam preview with tracked hand keypoints

## Run Locally

From the project folder, run:

```bash
npx serve
```

Then open the local URL printed in the terminal. It is usually:

```text
http://localhost:3000
```

When the browser asks for permission, allow camera access. The hand tracking will not work without webcam permission.

## Requirements

- Node.js
- A modern browser
- Camera access enabled in the browser
- Internet connection for loading CDN dependencies

## Project Structure

```text
.
├── assets/
│   ├── folder_WithTexture.glb
│   └── folder_notTexture.glb
├── index.html
├── main.js
├── style.css
├── README.md
└── LICENSE
```

## Main Files

- `index.html` loads the libraries, the 3D model, and the app script.
- `main.js` handles webcam capture, hand pose detection, gesture checks, and model control.
- `style.css` defines the full-screen model layout and webcam preview.
- `assets/folder_WithTexture.glb` is the 3D model currently used by the page.

## Controls

Move your hand in front of the camera to rotate the view around the 3D model.

- Move hand left or right: rotate the model camera horizontally
- Move hand up or down: rotate the model camera vertically
- Open hand: play animation forward
- Closed hand: play animation backward

## Troubleshooting

If the model or hand tracking does not load, check that:

- You started the project with `npx serve`
- You opened the local URL from the terminal
- Camera permission is allowed
- Your browser supports webcam access
- You have an internet connection for `p5.js`, `ml5.js`, and `<model-viewer>`
