# 5 Barbers — Melville, NY

Website for **5 Barbers**, the old-school barber shop at 691 Walt Whitman Rd,
Melville, NY 11747 — cutting hair on Route 110 since 1955.

## What's here

A hand-built static site — no frameworks, no build step. Open `index.html`
in a browser or serve the folder with anything (`python3 -m http.server`)
and it works.

```
index.html      — the whole site (single page)
css/style.css   — theme: cream paper, signal red, worn blue, neon night
js/main.js      — live open/closed status, review rotation, scroll reveals, mobile nav
```

## Design notes

- The hero recreates the shop's actual neon signage — blue "5", red "BARBERS",
  with a subtle flicker on one letter, the way real neon behaves.
- The price list is a replica of the wooden board that hangs over the mirrors,
  down to the taped-on price tags.
- Palette and typography commit to the shop's red / white / blue identity:
  Passion One for the sign, Oswald for headings, Libre Franklin for body copy,
  Caveat for hand-written asides.
- The "open now / closed" chip in the hero and the highlighted row in the hours
  table are computed live from the shop's real hours (visitor's local time).

## Imagery

The hero photograph and the vintage engraving illustrations were generated
for this project and are served from CDN URLs referenced in the HTML/CSS.
To self-host them later, download each URL into `assets/img/` and update the
references in `index.html` and `css/style.css`.

## The facts on the site

- Phone: (631) 423-5749
- Hours: Mon 10–4 · Tue–Fri 8–6 · Sat closed · Sun 8–5
- Walk-ins only, hot towel shaves, kids & seniors discount, parking on site
