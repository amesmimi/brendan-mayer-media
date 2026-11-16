# Adding photos to the website

This takes about five minutes. You don't need to know how to code.

## Before you start: export your photos

From Lightroom, Capture One or similar:

- **Format:** JPEG, quality 90–100
- **Size:** full resolution (the website makes smaller copies itself)
- **Colour space:** sRGB
- **No watermark** (the site adds copyright details to every photo automatically)
- **Helpful file names**, like `2025-08-rifflandia-july-talk-01.jpg`

Don't send photos through iMessage, WhatsApp, Instagram or email. They shrink them. Use a shared Google Drive folder, AirDrop or WeTransfer.

## Step 1: Put the photos in the right folder

Inside the project, open the `incoming` folder. There's one folder per gallery:

```
incoming/
  live-music/  ← concerts and festivals
  sports/
  events/
  about/      ← the About photo
  site/       ← other site images (the contact section background)
```

Drop your full-size photos into the matching folder.

- Want to keep a photo nearby **without** publishing it? Put it in a subfolder, e.g. `incoming/sports/not-used/`. Subfolders are always skipped.
- The `incoming` folder stays on your computer and is never uploaded, so **keep your own backup of your originals**.

## Step 2: Prepare them for the web

In the project folder, run:

```sh
npm run photos
```

For every new photo this:

- makes a web-sized copy (3200px on the long edge) in `src/assets/galleries/<gallery>/`
- removes the GPS location and camera serial number
- adds "© Brendan Mayer. All rights reserved." to the file's details

It skips photos it has already done. You'll see a ✓ for each new photo, and a ! if something needs fixing (usually an unsupported file type: export it as a JPEG).

## Step 3 (optional): Order and describe photos

New photos appear on the site automatically, after the listed ones. Photos have no titles on the site, so there's nothing you have to fill in.
To set a photo's order, describe it for screen readers or add it to the homepage slideshow, open the gallery's file in `src/content/galleries/` (e.g. `sports.yaml`) and add an entry:

```yaml
photos:
  - file: 2025-11-royals-breakaway-03.jpg # the web file name from Step 2
    alt: A forward skates in alone on a breakaway. # optional: description for screen readers
    featured: true # optional: show it in the homepage slideshow
```

- Photos appear in the order they're listed. Move an entry up or down to reorder.
- `alt` (optional) describes the photo for people using screen readers. Without it they hear "Sports photo by Brendan Mayer."
- `title` (optional) isn't shown on the site. It's a handy label (e.g. the artist) and is added to the screen-reader text.
- Keep the spacing exactly as shown. YAML cares about indentation.

## Step 4: Preview, then publish

```sh
npm run dev
```

Open the address it prints (http://localhost:4321/brendan-mayer-media/) to check everything looks right. Press `Ctrl+C` to stop.

Then commit and push (GitHub Desktop is the easiest way). The site rebuilds and goes live in about two minutes. You can watch progress under the repo's **Actions** tab.

## Removing a photo

Delete it from `src/assets/galleries/<gallery>/`, remove its entry from the gallery's YAML file if it has one, then commit and push.
Also move or delete the original in `incoming/`, otherwise the next `npm run photos` will add it back.
