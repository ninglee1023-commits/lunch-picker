# AISG Lunch Picker

Static lunch picker for Luca and Noah.

## One-meal reviews

The selection screen shows one meal at a time with independent controls for both children. Each chooses no, or yes followed by 1–5 stars. Yes without a star remains visibly unfinished; the app does not invent a rating. Previous/next controls and per-week progress let the family return later. Details, nutrition, allergens, source menus and voice reading remain available.

Within a week, the same normalized main-course title and set is shown once. All actual serving dates remain attached to it, and a deliberate review applies to each occurrence. Side-dish differences remain visible in the expanded details. Existing date-specific favorites stay unchanged until the user rates the grouped meal; differing old choices are flagged instead of being silently merged.

Existing favorites and parent-confirmed arrangements are preserved under the original weekly keys and meal IDs. A verbatim snapshot is saved under `aisg-lunch-before-reviews-v5` before the first state write. Old favorites are shown as yes with stars pending. Explicit reviews live in `reviews.kid1` / `reviews.kid2` as `{ want: boolean, stars: null | 1..5 }`, while the original `picks` lists remain available for compatibility. The position in the review flow is local to each device and week.

Reviews use the same encrypted per-child/per-meal sync field as previous favorites, with optional `reviewed` and `stars` values. No backend or family-code change is needed. A first-time device import fills missing fields and lets deliberate local reviews upgrade legacy cloud likes without a rating, while protecting existing cloud reviews and rejections from stale imports. Old app versions can still read yes/no; all family devices should reload to use and edit star reviews.

Results keep all same-date combinations and show each child's rating. Combinations within a date sort by combined stars descending; unstarred old favorites remain labelled as pending. No weekly arrangement is chosen automatically. A changed review does not erase an existing final arrangement; the result asks the parent to recheck it, choose another pair, or explicitly clear it. These are household arrangements, not submitted Aden Food orders.

`node tests/reviews.cjs` checks the old service-worker upgrade, preservation of all five weeks, repeated-course serving dates, yes/no/star controls, ranking, real encrypted sync using a synthetic family, concurrent edits, offline replay, clearing, export and phone/iPad layout. `node tests/reviews.cjs --live` checks the published app. The browser test currently uses the workstation's bundled Playwright and installed Edge. It never uses a real family code.

## Family-code synchronization

Open Family sync settings on the iPad that already has saved choices and create a family. Existing weekly keys and meal IDs stay unchanged; the app first saves a verbatim pre-sync snapshot, then uploads encrypted per-item changes. Enter the same family code on another device, or open the copied connection link and confirm joining. Local liked meals merge; an imported final choice only fills an empty cloud choice. Later user changes synchronize every few seconds while the app is visible, with a durable local outbox for offline edits and idempotent retries. One parent-confirmed pair per week remains the final ordering rule.

The 24-character family code is generated locally with Web Crypto. HKDF-derived AES-GCM encrypts the week, child, meal and choice before upload; HMAC indexes and a distinct bearer capability authorize the encrypted API. The service cannot read the choices or the family code. Keep the code within the family; it is required for another device to decrypt records. `sync-config.js` contains only the public service URL. Never put family codes, administrative credentials, or encryption keys in source.

The service source and schema are maintained separately in the task's `output/lunch-sync-service` checkout. The frontend's pre-sync backup is `aisg-lunch-before-family-sync-v4`. Export choices downloads weekly records only, excluding sync codes and credentials. Disconnect keeps local choices. Storage remains local-only until a family is created or joined.

## Weekly Results

Children can rate multiple meals they like. Results include every combination in which Luca and Noah each want one meal on the same calendar date, whether the meals are identical or different. Options are grouped by date and always display both children, their ratings, and one portion each. The parent confirms at most one pair per week; choosing another pair replaces that week's final decision without changing either child's reviews. No pair is selected automatically. Copy result includes only the confirmed weekly pair and its ratings.

This results update keeps all existing meal IDs, weekly storage keys, picks and compatible parent choices. On first load, a verbatim snapshot of existing weekly state is saved under `aisg-lunch-backup-weekly-results-v3` before any state writes. Rendering results does not remove saved choices.

## Local Use

Run:

```powershell
node serve.mjs 8081
```

Open:

```text
http://127.0.0.1:8081/
```

## Menu Updates

November 2026 includes five menu weeks, 56 selectable lunch sets, and the original source image for each week. Use the week selector to switch weeks. Luca, Noah, and parent choices are stored separately for each week. Earlier August choices remain in browser storage under their previous key.

- November 2: Schoolwide PD (no class).
- November 26: Thanksgiving festival menu plus a vegetarian set.
- November 27: Thanksgiving holiday.
- November 30: Monday only; December dates were not supplied.

`menu-data.js` holds `MENU_WEEKS` and `ALL_MENU_ITEMS`. Keep each meal ID unique by date and set. Source images live in `assets/source/`; AI-generated realistic food images live in `assets/food/` and are labelled as AI food visualizations.

Nutrition and allergens follow the source as printed. Nov 6 Western nutrition repeats Nov 3 Western values in the source; Nov 18 Western has 343 kcal in English and 341 kcal in Chinese (English value displayed). No soup is listed for Nov 25 Asian or Western. Card notes and source links preserve these details for review. Food imagery was replaced with individual photorealistic food images, compressed to WebP; images show menu concepts rather than actual school servings. The storage keys and meal IDs are unchanged, preserving saved picks. Chinese text is normalized for readability, using the English dish description where the photograph is unclear.

When updating menus, change the versioned script/style URLs in `index.html` and `sw.js`, update the service-worker cache name, and run `npm run check`. The service worker precaches all current menu weeks for offline use.

## Voice Reading

Each lunch card has a speaker button. It uses the browser's built-in Web Speech API, so there is no API key and no server cost. The button reads the English lunch details first, then the Putonghua details.

Speech quality depends on the device browser and installed voices. iPhone, iPad, Chrome, Edge, and Safari usually work after the first tap. For Chinese, the app asks for a `zh-CN` or Mandarin/Putonghua voice.

## Add To Home Screen

The site includes a web app manifest, app icons, and a service worker, so phones can install it as `Lunch Picker` instead of saving it as a plain browser bookmark. On iPhone or iPad, open the live GitHub Pages URL in Safari and choose Share -> Add to Home Screen.

If the phone has an older shortcut from before the PWA files were added, delete that shortcut first and add it again from the standalone lunch-picker URL.

## Online Hosting

This app is static, so it can be hosted on GitHub Pages, Netlify, Cloudflare Pages, Vercel, or any basic web host.

For your current workflow, static hosting is enough:

- Your wife opens one URL on her phone or tablet.
- The family reviews each meal on the selection tab, with separate yes/no and star controls for Luca and Noah.
- The Results tab shows same-day combinations and each child's ratings for the parent decision. A match can be the exact same set, or different sets available on the same day.

Choices are stored in the local browser and, after explicitly creating or joining a family, synchronized through the encrypted family service. Different devices must join the same family code. A new device without that code cannot read the family records.
