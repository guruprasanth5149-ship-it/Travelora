# Travelora
Open this folder in VS Code and click "Go Live" (Live Server), or open index.html directly.

## Replace images (IMAGE SOURCE)
Every image comes from the `img(seed)` function in `js/script.js`. Placeholders use picsum.photos, so they are generic photos, not real destinations.
To use your own: save photos in `images/` as `goa.jpg`, `dubai.jpg`... and change `img()` to `return "images/" + seed + ".jpg";`.
Hero backgrounds use the `data-seed` attribute in each HTML file.

## Files
css/style.css, js/script.js (data, animations, modals), six HTML pages. Header, footer, loader and modals are injected by script.js.
