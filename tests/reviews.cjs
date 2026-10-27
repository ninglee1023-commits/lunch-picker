// Synthetic families only. No real family code or record is used by this test.
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { execFileSync } = require('node:child_process');
let playwright;
try { playwright = require('playwright'); } catch { playwright = require('C:/Users/User/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright'); }
const { chromium } = playwright;
const root = path.resolve(__dirname, '..');
const cloud = 'https://aisg-lunch-family-sync-2026.lining-cohl.chatgpt.site';
const live = process.argv.includes('--live');
const base = live ? 'https://ninglee1023-commits.github.io/lunch-picker/' : 'http://127.0.0.1:8092/';
const week = '2026-11-09', key = w => `aisg-lunch-picker-er-sha-${w}-luca-noah`;
let oldVersion = false;
const server = createServer(async (req, res) => {
  try {
    const relative = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
    if (relative.startsWith('api/')) {
      const body = []; for await (const part of req) body.push(part);
      const result = await fetch(cloud + '/' + relative, { method: req.method, headers: { Authorization: req.headers.authorization || '', 'Content-Type': 'application/json' }, body: req.method === 'GET' ? undefined : Buffer.concat(body) });
      res.writeHead(result.status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      return res.end(Buffer.from(await result.arrayBuffer()));
    }
    if (relative === 'sync-config.js') { res.writeHead(200, { 'Content-Type': 'text/javascript' }); return res.end('window.LUNCH_SYNC_ENDPOINT=location.origin;'); }
    const file = path.resolve(root, relative); if (!file.startsWith(root + path.sep)) throw Error('Invalid path');
    const body = oldVersion && ['index.html', 'app.js', 'styles.css', 'sync-ui.js', 'sync-client.js', 'sw.js'].includes(relative) ? execFileSync('git', ['show', '6533148:' + relative], { cwd: root }) : await fs.promises.readFile(file);
    res.writeHead(200, { 'Content-Type': ({ '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png', '.webmanifest': 'application/manifest+json' })[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); res.end(body);
  } catch (error) { res.writeHead(404); res.end(String(error)); }
});
const oldState = (picks, parentPick = null) => ({ view: 'kid1', names: { kid1: 'Luca', kid2: 'Noah' }, picks, parentPick });
const values = Object.fromEntries(['2026-11-02', week, '2026-11-16', '2026-11-23', '2026-11-30'].map(w => [key(w), JSON.stringify(oldState({ kid1: [], kid2: [] }))]));
values[key(week)] = JSON.stringify(oldState({ kid1: ['asian-20261109', 'western-20261110'], kid2: ['asian-20261109', 'western-20261110'] }, 'exact:western-20261110'));
for (const [w,id] of [['2026-11-02','vegetarian-20261105'],['2026-11-16','vegetarian-20261118'],['2026-11-23','western-20261125']]) values[key(w)]=JSON.stringify(oldState({kid1:[id],kid2:[id]},'exact:'+id));
values[key('2026-11-30')]=JSON.stringify(oldState({kid1:['western-20261130'],kid2:['vegetarian-20261130']}));
async function seed(page, stored) {
  await page.goto(base); await page.evaluate(({ stored, week }) => { for (const [k, v] of Object.entries(stored)) localStorage.setItem(k, v); localStorage.setItem('aisg-lunch-active-week-2026-11', week); }, { stored, week }); await page.reload();
}
async function settle(page) {
  await page.waitForFunction(() => !!window.familySync);
  await page.waitForFunction(() => !document.getElementById('syncStatus').textContent.startsWith('正在'), {}, { timeout: 30000 });
  await page.evaluate(() => familySync.sync());
  await page.waitForFunction(() => document.getElementById('syncStatus').textContent.startsWith('已同步'), {}, { timeout: 30000 });
}
async function show(page, id) {
  await page.getByRole('tab', { name: '逐餐評價', exact: true }).click();
  // Navigation is checked separately; select a known meal to test reviews without 15 repeated taps.
  await page.evaluate(id => { state.reviewIndex = mealGroups().findIndex(g => g.occurrences.some(m => m.id === id)); saveState(); render(); }, id);
}
async function saved(page) { return page.evaluate(k => JSON.parse(localStorage.getItem(k)), key(week)); }
(async () => {
  let browser;
  const errors = [];
  try {
    if (!live) await new Promise(resolve => server.listen(8092, '127.0.0.1', resolve));
    browser = await chromium.launch({ channel: 'msedge', headless: true });
    const aContext = await browser.newContext({ viewport: { width: 1024, height: 1366 }, hasTouch: true });
    const bContext = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const a = await aContext.newPage(), b = await bContext.newPage();
    for (const p of [a, b]) p.on('pageerror', error => errors.push(error.message));

    if (!live) oldVersion = true;
    await seed(a, values);
    await a.evaluate(() => navigator.serviceWorker.ready);
    await a.waitForFunction(() => !!navigator.serviceWorker.controller);
    oldVersion = false; await a.reload();
    await a.waitForFunction(() => !!document.querySelector('.review-stage'));
    assert.deepEqual(await a.evaluate(keys => Object.fromEntries(keys.map(k => [k, localStorage.getItem(k)])), Object.keys(values)), values, 'Upgrade wrote over old weekly records');
    assert.deepEqual(await a.evaluate(() => JSON.parse(localStorage.getItem('aisg-lunch-before-reviews-v5')).values), values);
    assert.equal(await a.locator('.review-stage').count(), 1);
    assert.equal(await a.locator('.review-image').count(), 1);
    assert.equal(await a.locator('.child-review').count(), 2);
    assert.ok(await a.locator('[data-child=kid1]').innerText().then(t => t.includes('原有喜好已保留')));
    assert.equal((await saved(a)).parentPick, 'exact:western-20261110');
    await a.locator('#nextMeal').click(); assert.equal(await a.locator('.review-stage').getAttribute('data-group-id'), 'western-20261109');
    await a.locator('#previousMeal').click(); assert.equal(await a.locator('.review-stage').getAttribute('data-group-id'), 'asian-20261109');
    await a.locator('#kid1-star-5').click(); await a.locator('#kid2-no').click();
    assert.deepEqual((await saved(a)).reviews.kid1['asian-20261109'], { want: true, stars: 5 });
    assert.deepEqual((await saved(a)).reviews.kid2['asian-20261109'], { want: false, stars: null });
    await a.locator('#kid2-yes').click(); assert.equal((await saved(a)).reviews.kid2['asian-20261109'].stars, null, 'Yes fabricated a rating');
    await a.locator('#kid2-star-3').click();
    await a.locator('#kid2-no').click();
    await a.locator('#appTools > summary').click(); await a.locator('#familySyncPanel > summary').click(); await a.locator('#syncCreate').click(); await settle(a);
    const code = await a.evaluate(() => familySync.getCode());
    await seed(b, { [key(week)]: JSON.stringify({...oldState({kid1:['asian-20261109'],kid2:['asian-20261109','western-20261110']}),reviews:{kid1:{},kid2:{'western-20261110':{want:true,stars:3}}}}) });
    await b.locator('#appTools > summary').click(); await b.locator('#familySyncPanel > summary').click(); await b.locator('#syncCodeInput').fill(code); await b.locator('#syncJoin').click(); await settle(b); await settle(a);
    assert.deepEqual((await saved(b)).reviews, (await saved(a)).reviews, 'Stars or explicit no did not sync on first join');
    assert.equal((await saved(b)).reviews.kid1['asian-20261109'].stars,5,'A joining device with an old favorite overwrote cloud stars');
    assert.equal((await saved(b)).reviews.kid2['asian-20261109'].want,false,'Old favorite overwrote an explicit cloud rejection');
    assert.equal((await saved(a)).reviews.kid2['western-20261110'].stars,3,'New local rating could not fill a legacy cloud favorite');
    assert.equal((await saved(b)).parentPick, 'exact:western-20261110');
    await a.locator('#appTools > summary').click(); await b.locator('#appTools > summary').click();

    // Two children editing different fields at the same time, including an explicit no.
    await Promise.all([a.locator('#kid1-star-4').click(), b.locator('#kid2-no').click()]);
    await settle(a); await settle(b); await settle(a);
    assert.equal((await saved(a)).reviews.kid1['asian-20261109'].stars, 4);
    assert.equal((await saved(a)).reviews.kid2['asian-20261109'].want, false);
    await b.locator('#kid2-yes').click(); await b.locator('#kid2-star-5').click(); await settle(b); await settle(a);

    // Existing final choice survives changed reviews, with a clear warning.
    await show(a, 'western-20261110'); await a.locator('#kid1-no').click();
    await a.getByRole('tab', { name: '結果與安排' }).click();
    assert.ok((await a.locator('#parentPickMeta').innerText()).includes('原安排仍保留'));
    assert.equal((await saved(a)).parentPick, 'exact:western-20261110');
    assert.ok(!(await a.locator('#matchGrid').innerText()).includes('不要'));
    await a.locator('[data-match-key="exact:asian-20261109"] button').click();
    assert.equal((await saved(a)).parentPick, 'exact:asian-20261109');
    await settle(a); await settle(b);

    // Rank all combinations within the real calendar date; no automatic confirmation.
    await show(a, 'western-20261109');
    await a.locator('#kid1-yes').click(); await a.locator('#kid1-star-1').click();
    await a.locator('#kid2-yes').click(); await a.locator('#kid2-star-1').click();
    await a.getByRole('tab', { name: '結果與安排' }).click();
    assert.equal(await a.locator('.candidate-day[data-date="2026/11/9"] .match-card').first().getAttribute('data-match-key'), 'exact:asian-20261109');
    assert.equal(await a.locator('.candidate-day[data-date="2026/11/9"] .match-card').count(), 4);
    assert.equal((await saved(a)).parentPick, 'exact:asian-20261109');
    assert.ok((await a.evaluate(() => buildSummary())).includes('4/5'));
    await settle(a); await settle(b);

    // Offline star changes survive reload and merge with a different child's live change.
    await show(a, 'asian-20261109'); await a.waitForFunction(async () => (await caches.keys()).includes('aisg-lunch-picker-menu-202611-reviews-v5'));
    await aContext.setOffline(true); await a.locator('#kid1-star-2').click(); await a.reload();
    assert.equal((await saved(a)).reviews.kid1['asian-20261109'].stars, 2);
    await show(b, 'asian-20261109'); await b.locator('#kid2-star-4').click(); await settle(b);
    await aContext.setOffline(false); await settle(a); await settle(b); await settle(a);
    for (const p of [a, b]) { const s = await saved(p); assert.equal(s.reviews.kid1['asian-20261109'].stars, 2); assert.equal(s.reviews.kid2['asian-20261109'].stars, 4); }
    await b.reload(); await settle(b);
    assert.equal((await saved(b)).reviews.kid1['asian-20261109'].stars, 2);

    // Clearing has a distinct unreviewed state, and propagates without deleting the final arrangement.
    await b.locator('#kid2-clear').click(); await settle(b); await settle(a);
    assert.ok(!('asian-20261109' in (await saved(a)).reviews.kid2));
    assert.ok(!(await saved(a)).picks.kid2.includes('asian-20261109'));
    assert.equal((await saved(a)).parentPick, 'exact:asian-20261109');
    await b.locator('#kid2-yes').click(); await b.locator('#kid2-star-4').click(); await settle(b); await settle(a);
    await b.locator('#appTools > summary').click();
    const pendingDownload = b.waitForEvent('download'); await b.locator('#exportChoices').click();
    const download = await pendingDownload; const exportFile = path.join(root, 'tests', 'verification-export.json'); await download.saveAs(exportFile);
    const exported = fs.readFileSync(exportFile, 'utf8'); fs.unlinkSync(exportFile);
    assert.ok(!exported.includes(code.replaceAll('-', '')) && !exported.includes(code));
    assert.equal(JSON.parse(JSON.parse(exported).weeks[key(week)]).reviews.kid2['asian-20261109'].stars, 4);
    await b.locator('#appTools > summary').click();
    assert.ok(await b.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Phone overflows');
    assert.ok(await b.locator('#nextMeal').evaluate(el => el.getBoundingClientRect().bottom <= innerHeight), 'Phone navigation does not fit on screen');
    await b.screenshot({ path: path.join(root, 'verification-reviews-phone.png') });
    await a.screenshot({ path: path.join(root, 'verification-reviews-ipad.png') });
    await a.getByRole('tab', { name: '結果與安排' }).click(); await a.screenshot({ path: path.join(root, 'verification-reviews-results.png'), fullPage: true });
    for(const p of [a,b]) for(const w of ['2026-11-02','2026-11-16','2026-11-23','2026-11-30']) {
      const actual=await p.evaluate(k=>JSON.parse(localStorage.getItem(k)),key(w)), expected=JSON.parse(values[key(w)]);
      assert.deepEqual(actual.picks,expected.picks);assert.equal(actual.parentPick,expected.parentPick);
    }
    await a.locator('#clearParentPick').click(); await settle(a); await settle(b);
    assert.equal((await saved(b)).parentPick,null);
    await b.locator('#appTools > summary').click();
    b.once('dialog',dialog=>dialog.accept()); await b.locator('#resetWeek').click(); await settle(b); await settle(a);
    assert.deepEqual((await saved(a)).reviews,{kid1:{},kid2:{}});assert.deepEqual((await saved(a)).picks,{kid1:[],kid2:[]});

    // Same-week repeated main course is reviewed once but retains every actual serving date.
    const dupContext = await browser.newContext({ viewport: { width: 390, height: 844 } }); const dup = await dupContext.newPage();
    await seed(dup, {});
    const counts = await dup.evaluate(() => {
      const item = MENU_ITEMS[0], duplicate = { ...item, id: 'test-repeat', date: activeWeek.days[2].date, day: activeWeek.days[2].day, items: ['Different side dish'] };
      ALL_MENU_ITEMS.push(duplicate); MENU_ITEMS.push(duplicate); render();
      const group = mealGroups()[0]; setReview(group, 'kid1', true, 5); setReview(group, 'kid2', true, 3);
      return { groups: mealGroups().length, items: MENU_ITEMS.length, occurrences: group.occurrences.length, dates: getMatches().map(m => m.date), scores: group.occurrences.map(m => state.reviews.kid1[m.id].stars) };
    });
    assert.equal(counts.groups, counts.items - 1); assert.equal(counts.occurrences, 2); assert.equal(new Set(counts.dates).size, 2); assert.deepEqual(counts.scores, [5, 5]);
    assert.equal(await dup.locator('.review-image').count(), 1);
    await dupContext.close();
    assert.deepEqual(errors, []);
    console.log(`${live ? 'LIVE' : 'LOCAL'} PASS: old five-week records and final choice preserved; one meal/two people; yes/no/1-5 stars; repeats retain dates; score-ranked same-day pairs; real encrypted cloud sync; concurrent children; offline reload/replay; clearing; export without credentials; phone/iPad layouts.`);
  } finally { if (browser) await browser.close(); if (!live) server.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
