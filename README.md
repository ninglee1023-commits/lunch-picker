# AISG Lunch Picker

Static lunch picker for Luca and Noah.

## Weekly Results

Children can mark multiple meals they like. Results include every combination in which Luca and Noah each have one liked meal on the same calendar date, whether the meals are identical or different. Options are grouped by date and always display both children and one portion each. The parent confirms at most one pair per week; choosing another pair replaces that week's final decision without changing either child's liked meals. No pair is selected automatically. Copy result includes only the confirmed weekly pair.

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
- Luca chooses on the Luca tab.
- Noah chooses on the Noah tab.
- The Results tab shows orderable matches for the parent decision. A match can be the exact same set, or different sets that are available on the same day.

Important: choices are stored in that browser only. If you want Luca and Noah to choose on different devices and have results sync automatically, the app needs a small backend database.
