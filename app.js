function initialWeek() {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${String(now.getDate()).padStart(2,"0")}`;
  try {
    const saved = localStorage.getItem("aisg-lunch-active-week-2026-11");
    if (MENU_WEEKS.some((week) => week.id === saved)) return saved;
  } catch {}
  return [...MENU_WEEKS].reverse().find((week) => week.start <= today)?.id || MENU_WEEKS[0].id;
}
let activeWeekId = initialWeek();
let activeWeek = MENU_WEEKS.find((week) => week.id === activeWeekId);
let MENU_ITEMS = ALL_MENU_ITEMS.filter((item) => activeWeek.days.some((day) => day.date === item.date));
let STORAGE_KEY = `aisg-lunch-picker-er-sha-${activeWeekId}-luca-noah`;

// Preserve a verbatim snapshot before this results update can save any state.
// The original weekly keys and meal IDs remain unchanged.
function backupSavedChoices() {
  try {
    const backupKey = "aisg-lunch-backup-weekly-results-v3";
    if (localStorage.getItem(backupKey)) return;
    const values = {};
    MENU_WEEKS.forEach((week) => {
      const key = `aisg-lunch-picker-er-sha-${week.id}-luca-noah`;
      const raw = localStorage.getItem(key);
      if (raw !== null) values[key] = raw;
    });
    if (Object.keys(values).length) {
      localStorage.setItem(backupKey, JSON.stringify({ savedAt: new Date().toISOString(), values }));
    }
  } catch {}
}
backupSavedChoices();

// Keep a verbatim copy before introducing explicit yes/no and star reviews.
try {
  const key = "aisg-lunch-before-reviews-v5";
  if (!localStorage.getItem(key)) {
    const values = {};
    MENU_WEEKS.forEach((week) => {
      const storageKey = `aisg-lunch-picker-er-sha-${week.id}-luca-noah`;
      const raw = localStorage.getItem(storageKey);
      if (raw !== null) values[storageKey] = raw;
    });
    if (Object.keys(values).length) localStorage.setItem(key, JSON.stringify({ savedAt: new Date().toISOString(), values }));
  }
} catch {}

const CHILD_KEYS = ["kid1", "kid2"];

const defaultState = {
  view: "review",
  names: { kid1: "Luca", kid2: "Noah" },
  picks: { kid1: [], kid2: [] },
  reviews: { kid1: {}, kid2: {} },
  reviewIndex: 0,
  parentPick: null
};

let state = loadState();
let speakingMealId = null;

function cleanupLunchServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.getRegistrations?.().then((registrations) => {
    registrations.forEach((registration) => {
      if (registration.scope.includes("/lunch-menu/")) {
        registration.unregister();
      }
    });
  }).catch(() => {});
}

const elements = {
  menuLayout: document.querySelector("#menuLayout"),
  resultsLayout: document.querySelector("#resultsLayout"),
  matchGrid: document.querySelector("#matchGrid"),
  soloList: document.querySelector("#soloList"),
  modeLabel: document.querySelector("#modeLabel"),
  modeTitle: document.querySelector("#modeTitle"),
  matchCount: document.querySelector("#matchCount"),
  parentPickTitle: document.querySelector("#parentPickTitle"),
  parentPickMeta: document.querySelector("#parentPickMeta"),
  scoreStrip: document.querySelector("#scoreStrip"),
  copySummary: document.querySelector("#copySummary"),
  printPage: document.querySelector("#printPage"),
  resetWeek: document.querySelector("#resetWeek"),
  weekSelect: document.querySelector("#weekSelect"),
  weekLabel: document.querySelector("#weekLabel"),
  sourceImage: document.querySelector("#sourceImage"),
  sourceLink: document.querySelector("#sourceLink")
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!stored) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...stored,
      names: { ...defaultState.names, ...stored.names },
      view: stored.view === "results" ? "results" : "review",
      reviews: {
        kid1: validReviews(stored.reviews?.kid1),
        kid2: validReviews(stored.reviews?.kid2)
      },
      reviewIndex: Number.isInteger(stored.reviewIndex) ? stored.reviewIndex : 0,
      parentPick: normalizeParentPick(stored.parentPick),
      picks: {
        kid1: Array.isArray(stored.picks?.kid1) ? stored.picks.kid1 : [],
        kid2: Array.isArray(stored.picks?.kid2) ? stored.picks.kid2 : []
      }
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function validReviews(values) {
  return Object.fromEntries(Object.entries(values || {}).filter(([, value]) =>
    value && typeof value.want === "boolean" &&
    (value.stars === null || Number.isInteger(value.stars) && value.stars >= 1 && value.stars <= 5)
  ).map(([id, value]) => [id, { want: value.want, stars: value.want ? value.stars : null }]));
}

function reviewFor(child, item) {
  return state.reviews[child][item.id] || {
    want: state.picks[child].includes(item.id) ? true : null,
    stars: null
  };
}

function reviewLabel(child, item) {
  const value = reviewFor(child, item);
  return value.want === false ? "不要" : value.want === null ? "尚未評價" :
    value.stars ? `${"★".repeat(value.stars)}${"☆".repeat(5 - value.stars)} · ${value.stars}/5` : "要 · 未評星";
}

function mealGroups(items = MENU_ITEMS) {
  const groups = new Map();
  items.forEach((item) => {
    const key = `${item.set}|${item.title.normalize("NFKC").toLowerCase().replace(/[^\p{L}\p{N}]/gu, "")}`;
    if (!groups.has(key)) groups.set(key, { id: item.id, item, occurrences: [] });
    groups.get(key).occurrences.push(item);
  });
  return [...groups.values()];
}

function groupReview(child, group) {
  const values = group.occurrences.map((item) => reviewFor(child, item));
  const first = values[0];
  const mixed = values.some((value) => value.want !== first.want || value.stars !== first.stars);
  return { ...first, mixed, complete: !mixed && (first.want === false || first.want === true && !!first.stars) };
}

function setReview(group, child, want, stars = null) {
  for (const item of group.occurrences) {
    const picks = new Set(state.picks[child]);
    if (want === true) picks.add(item.id); else picks.delete(item.id);
    state.picks[child] = [...picks];
    if (want === null) delete state.reviews[child][item.id];
    else state.reviews[child][item.id] = { want, stars: want ? stars : null };
  }
  // A changed review must not silently erase a previously confirmed arrangement.
  saveState();
  render();
  for (const item of group.occurrences) recordSharedChange({
    week: activeWeekId, kind: "pick", child, mealId: item.id,
    value: want === true, reviewed: want !== null, stars: want ? stars : null
  });
}

function matchScore(match) {
  const meals = getMatchMeals(match);
  return CHILD_KEYS.reduce((sum, child) => sum + (reviewFor(child, meals[child]).stars || 0), 0);
}

function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

function switchWeek(id) {
  const week = MENU_WEEKS.find((value) => value.id === id);
  if (!week) return;
  saveState();
  if (speechSupported()) window.speechSynthesis.cancel();
  speakingMealId = null;
  activeWeekId = id;
  activeWeek = week;
  MENU_ITEMS = ALL_MENU_ITEMS.filter((item) => week.days.some((day) => day.date === item.date));
  STORAGE_KEY = `aisg-lunch-picker-er-sha-${id}-luca-noah`;
  state = loadState();
  try { localStorage.setItem("aisg-lunch-active-week-2026-11", id); } catch {}
  render();
}

function mealById(id) {
  return MENU_ITEMS.find((item) => item.id === id);
}

function normalizeParentPick(value) {
  if (!value) return null;
  const key = String(value);
  if (key.includes(":")) return key;
  return mealById(key) ? `exact:${key}` : null;
}

function getMatchKey(match) {
  return match.type === "exact" ? `exact:${match.item.id}` : `same-day:${match.kid1.id}:${match.kid2.id}`;
}

function describeMatch(match) {
  if (!match) return "Not selected";
  const { kid1, kid2 } = getMatchMeals(match);
  return `${match.day} ${match.date}\n${state.names.kid1}: ${kid1.title} (${kid1.set}) × 1 · ${reviewLabel("kid1", kid1)}\n${state.names.kid2}: ${kid2.title} (${kid2.set}) × 1 · ${reviewLabel("kid2", kid2)}`;
}

function getMatchMeals(match) {
  return match.type === "exact"
    ? { kid1: match.item, kid2: match.item }
    : { kid1: match.kid1, kid2: match.kid2 };
}

function getCandidateDays(matches = getMatches()) {
  return activeWeek.days
    .map((day) => ({ ...day, matches: matches.filter((match) => match.date === day.date).sort((a, b) => matchScore(b) - matchScore(a)) }))
    .filter((day) => day.matches.length > 0);
}

function getParentPickMatch() {
  const key = normalizeParentPick(state.parentPick);
  if (!key) return null;
  if (key.startsWith("exact:")) {
    const item = mealById(key.slice(6));
    return item ? { type: "exact", item, day: item.day, date: item.date } : null;
  }
  const [, first, second] = key.split(":");
  const kid1 = mealById(first), kid2 = mealById(second);
  return kid1 && kid2 && kid1.date === kid2.date ? { type: "same-day", kid1, kid2, day: kid1.day, date: kid1.date } : null;
}

function getMatchedPickIds(matches) {
  const matched = { kid1: new Set(), kid2: new Set() };
  matches.forEach((match) => {
    if (match.type === "exact") {
      matched.kid1.add(match.item.id);
      matched.kid2.add(match.item.id);
    } else {
      matched.kid1.add(match.kid1.id);
      matched.kid2.add(match.kid2.id);
    }
  });
  return matched;
}

function speechSupported() {
  return "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

function buildMealSpeech(item) {
  const english = [
    item.day,
    `${item.set} set`,
    item.title,
    ...item.items
  ].join(". ");
  const chineseParts = [item.titleZh, ...(item.itemsZh || [])].filter(Boolean);
  return {
    english,
    chinese: chineseParts.join("，")
  };
}

function pickPutonghuaVoice() {
  if (!speechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  return voices.find((voice) => voice.lang === "zh-CN")
    || voices.find((voice) => voice.lang?.toLowerCase().startsWith("zh-cn"))
    || voices.find((voice) => /putonghua|mandarin|普通话|普通話|国语|國語/i.test(voice.name))
    || voices.find((voice) => voice.lang?.toLowerCase().startsWith("zh"));
}

function speakMeal(item) {
  if (!speechSupported()) {
    window.alert("Voice reading is not supported in this browser.");
    return;
  }

  const isSameMeal = speakingMealId === item.id && window.speechSynthesis.speaking;
  window.speechSynthesis.cancel();
  if (isSameMeal) {
    speakingMealId = null;
    render();
    return;
  }

  const speech = buildMealSpeech(item);
  const english = new SpeechSynthesisUtterance(speech.english);
  english.lang = "en-US";
  english.rate = 0.92;

  const chinese = new SpeechSynthesisUtterance(speech.chinese);
  const putonghuaVoice = pickPutonghuaVoice();
  if (putonghuaVoice) chinese.voice = putonghuaVoice;
  chinese.lang = putonghuaVoice?.lang || "zh-CN";
  chinese.rate = 0.86;

  const clearSpeakingState = () => {
    if (speakingMealId === item.id) {
      speakingMealId = null;
      render();
    }
  };
  english.onerror = clearSpeakingState;
  chinese.onend = clearSpeakingState;
  chinese.onerror = clearSpeakingState;

  speakingMealId = item.id;
  window.speechSynthesis.speak(english);
  window.speechSynthesis.speak(chinese);
  render();
}

function getMatches() {
  const kidOneItems = state.picks.kid1.map(mealById).filter(Boolean);
  const kidTwoItems = state.picks.kid2.map(mealById).filter(Boolean);
  const matches = [];
  const seen = new Set();

  kidOneItems.forEach((kidOneItem) => {
    kidTwoItems.forEach((kidTwoItem) => {
      if (kidOneItem.date !== kidTwoItem.date) return;

      const match = kidOneItem.id === kidTwoItem.id
        ? {
            type: "exact",
            day: kidOneItem.day,
            date: kidOneItem.date,
            item: kidOneItem
          }
        : {
            type: "same-day",
            day: kidOneItem.day,
            date: kidOneItem.date,
            kid1: kidOneItem,
            kid2: kidTwoItem
          };
      const key = getMatchKey(match);
      if (seen.has(key)) return;
      seen.add(key);
      matches.push(match);
    });
  });

  return matches;
}

function setView(view) {
  state.view = view;
  saveState();
  render();
}

function recordSharedChange(change) {
  if (window.recordLunchChange) window.recordLunchChange(change);
  else (window.pendingLunchChanges ||= []).push(change);
}

function setParentPick(matchKey) {
  const normalizedKey = normalizeParentPick(matchKey);
  if (!getMatches().some((match) => getMatchKey(match) === normalizedKey)) return;
  state.parentPick = normalizeParentPick(state.parentPick) === normalizedKey ? null : normalizedKey;
  saveState();
  render();
  recordSharedChange({ week: activeWeekId, kind: "parent", value: state.parentPick });
}

function clearParentPick() {
  state.parentPick = null;
  saveState(); render();
  recordSharedChange({ week: activeWeekId, kind: "parent", value: null });
}

function render() {
  const focusedId = document.activeElement?.id;
  elements.weekSelect.value = activeWeekId;
  elements.weekLabel.textContent = `Er Sha · ${activeWeek.label}`;
  elements.sourceImage.src = activeWeek.source;
  elements.sourceImage.alt = `Original AISG Er Sha lunch menu for ${activeWeek.label}`;
  elements.sourceLink.href = activeWeek.source;
  renderTabs();
  renderScores();

  const isResults = state.view === "results";
  document.body.classList.toggle("review-mode", !isResults);
  elements.menuLayout.classList.toggle("hidden", isResults);
  elements.resultsLayout.classList.toggle("hidden", !isResults);
  elements.resultsLayout.classList.toggle("active", isResults);

  if (isResults) {
    elements.modeLabel.textContent = "每週安排";
    elements.modeTitle.textContent = "每週每人一餐：從同一天的組合中，由你選定一組。";
    renderResults();
  } else {
    elements.modeLabel.textContent = "一起評價 · 每次一道餐";
    elements.modeTitle.textContent = "兩人分別選「不要」或「要」，要的餐再評 1–5 星。";
    renderMenu();
  }
  if (focusedId) document.getElementById(focusedId)?.focus({ preventScroll: true });
}

function renderTabs() {
  document.querySelectorAll(".segment").forEach((button) => {
    const isActive = button.dataset.view === state.view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function renderScores() {
  const matches = getMatches();
  elements.scoreStrip.replaceChildren(
    makeScore(mealGroups().filter((g) => g.occurrences.some((i) => reviewFor("kid1", i).want === true)).length, `${state.names.kid1} 要的餐`),
    makeScore(mealGroups().filter((g) => g.occurrences.some((i) => reviewFor("kid2", i).want === true)).length, `${state.names.kid2} 要的餐`),
    makeScore(getCandidateDays(matches).length, "可選日期")
  );
}

function makeScore(value, label) {
  const node = document.createElement("div");
  node.className = "score";
  const strong = document.createElement("strong");
  strong.textContent = String(value);
  const span = document.createElement("span");
  span.textContent = label;
  node.append(strong, span);
  return node;
}

function renderMenu() {
  elements.menuLayout.replaceChildren();
  const groups = mealGroups();
  if (!groups.length) {
    elements.menuLayout.append(uiNode("p", "empty-state", "本週沒有供餐。"));
    return;
  }
  state.reviewIndex = Math.max(0, Math.min(state.reviewIndex, groups.length - 1));
  const group = groups[state.reviewIndex], item = group.item;
  const completed = groups.filter((value) => CHILD_KEYS.every((child) => groupReview(child, value).complete)).length;
  const stage = uiNode("article", "review-stage");
  stage.dataset.groupId = group.id;
  const progress = uiNode("div", "review-progress");
  progress.append(uiNode("strong", "", `第 ${state.reviewIndex + 1} / ${groups.length} 道餐`),
    uiNode("span", "", `兩人已評好 ${completed} / ${groups.length}`));
  const meter = document.createElement("progress");
  meter.max = groups.length; meter.value = completed;
  meter.setAttribute("aria-label", "兩人均已完成評價的餐點");
  progress.append(meter);

  const content = uiNode("div", "review-content");
  const food = uiNode("section", "review-food");
  const image = document.createElement("img");
  image.className = "review-image"; image.src = item.image;
  image.alt = `${item.title} · AI 食物示意圖`;
  const caption = uiNode("span", "review-image-caption", "AI 食物示意圖");
  const figure = uiNode("div", "review-figure"); figure.append(image, caption);
  const heading = uiNode("div", "review-heading");
  const meta = uiNode("div", "meal-meta");
  meta.append(uiNode("span", `set-pill ${item.set.toLowerCase()}`, item.set));
  const voice = uiButton("聽餐點介紹", "voice-button review-voice", () => speakMeal(item));
  voice.id = "reviewVoice";
  voice.textContent = speakingMealId === item.id ? "停止朗讀" : "朗讀";
  voice.setAttribute("aria-pressed", String(speakingMealId === item.id));
  meta.append(voice);
  heading.append(meta, uiNode("h2", "", item.titleZh), uiNode("p", "review-title-en", item.title));
  const dates = uiNode("p", "review-dates", group.occurrences.map((value) => `${value.day} ${value.date}`).join(" · "));
  heading.append(dates);
  if (group.occurrences.length > 1) heading.append(uiNode("p", "review-duplicate-note", "本週相同主餐合併評價，評價套用至以下所有供餐日；配菜請展開查看。"));
  const details = uiNode("details", "review-details");
  details.append(uiNode("summary", "", "配菜、營養與過敏原"));
  group.occurrences.forEach((value) => {
    const variant = uiNode("section", "review-variant");
    variant.append(uiNode("strong", "", `${value.day} ${value.date}`));
    const list = uiNode("ul", "item-list");
    value.items.forEach((line, i) => list.append(uiNode("li", "", `${value.itemsZh?.[i] || ""} · ${line}`)));
    variant.append(list, uiNode("p", "source-note", `Cal ${value.nutrition.cal} · Protein ${value.nutrition.protein} · Fat ${value.nutrition.fat} · Carb ${value.nutrition.carb}`),
      uiNode("p", "allergy", `Allergy（按原菜單）：${value.allergens.join(", ")}`));
    if (value.note) variant.append(uiNode("p", "source-note", value.note));
    const source = uiNode("a", "source-link", "查看原菜單");
    source.href = value.source; source.target = "_blank"; source.rel = "noopener";
    variant.append(source); details.append(variant);
  });
  food.append(figure, heading, details);

  const reviews = uiNode("section", "review-people");
  reviews.setAttribute("aria-label", "兩人的餐點評價");
  CHILD_KEYS.forEach((child) => {
    const value = groupReview(child, group);
    const field = uiNode("fieldset", "child-review"); field.dataset.child = child;
    field.append(uiNode("legend", "", state.names[child]));
    const choices = uiNode("div", "want-options");
    for (const [want, label] of [[false, "不要"], [true, "要"]]) {
      const selected = !value.mixed && value.want === want;
      const button = uiButton(label, `want-button ${want ? "want-yes" : "want-no"}${selected ? " selected" : ""}`, () =>
        setReview(group, child, want, want && !value.mixed ? value.stars : null));
      button.id = `${child}-${want ? "yes" : "no"}`;
      button.setAttribute("aria-pressed", String(selected));
      button.setAttribute("aria-label", `${state.names[child]}：${label}`);
      choices.append(button);
    }
    field.append(choices);
    const feedback = uiNode("p", "review-feedback"); feedback.setAttribute("role", "status");
    feedback.textContent = value.mixed ? "原有日期評價不同；重新評價可統一。" :
      value.want === null ? "還沒決定" : value.want === false ? "已記錄：不要" : value.stars ? `${value.stars} / 5 星喜歡` :
      state.reviews[child][item.id] ? "選好了「要」，再給 1–5 星" : "原有喜好已保留，請補評星數";
    if (value.want === true && !value.mixed) {
      const stars = uiNode("div", "rating-stars"); stars.setAttribute("role", "group");
      stars.setAttribute("aria-label", `${state.names[child]}的喜歡程度`);
      for (let star = 1; star <= 5; star++) {
        const button = uiButton(star <= (value.stars || 0) ? "★" : "☆", "star-button", () => setReview(group, child, true, star));
        button.id = `${child}-star-${star}`;
        button.dataset.star = star;
        button.setAttribute("aria-label", `${state.names[child]}：${star} 星`);
        button.setAttribute("aria-pressed", String(value.stars === star));
        stars.append(button);
      }
      field.append(stars);
    }
    field.append(feedback);
    if (value.want !== null || value.mixed) {
      const clear = uiButton("清除評價", "clear-review", () => setReview(group, child, null));
      clear.id = `${child}-clear`; field.append(clear);
    }
    reviews.append(field);
  });
  content.append(food, reviews);
  const navigation = uiNode("nav", "review-navigation"); navigation.setAttribute("aria-label", "切換餐點");
  const previous = uiButton("← 上一餐", "ghost-button", () => moveReview(-1)); previous.id = "previousMeal"; previous.disabled = state.reviewIndex === 0;
  const next = uiButton(state.reviewIndex === groups.length - 1 ? "查看結果 →" : "下一餐 →", "primary-button", () => {
    if (state.reviewIndex === groups.length - 1) setView("results"); else moveReview(1);
  }); next.id = "nextMeal";
  const unfinished = groups.length - completed;
  navigation.append(previous, uiNode("span", "review-navigation-note", unfinished ? `還有 ${unfinished} 道待評，可稍後繼續` : "本週餐點已評好"), next);
  stage.append(progress, content, navigation);
  elements.menuLayout.append(stage);
}

function uiNode(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function uiButton(text, className, action) {
  const button = uiNode("button", className, text);
  button.type = "button"; button.addEventListener("click", action);
  return button;
}

function moveReview(direction) {
  if (speechSupported()) window.speechSynthesis.cancel();
  speakingMealId = null;
  state.reviewIndex += direction;
  saveState(); render();
}

function makeMatchCard(match) {
  const key = getMatchKey(match);
  const { kid1, kid2 } = getMatchMeals(match);
  const selected = normalizeParentPick(state.parentPick) === key;
  const node = document.createElement("article");
  node.className = "meal-card match-card same-day-match";
  node.dataset.matchKey = key;
  node.classList.toggle("is-parent-pick", selected);

  const button = document.createElement("button");
  button.className = "match-pick-button";
  button.type = "button";
  button.setAttribute("aria-pressed", String(selected));
  button.setAttribute("aria-label", `Choose ${match.date} for this week: ${state.names.kid1} ${kid1.title}; ${state.names.kid2} ${kid2.title}`);

  const summary = document.createElement("div");
  summary.className = "match-summary";

  const meta = document.createElement("div");
  meta.className = "meal-meta";
  const dayPill = document.createElement("span");
  dayPill.className = "day-pill";
  dayPill.textContent = match.date;
  const setPill = document.createElement("span");
  setPill.className = "set-pill festival";
  setPill.textContent = match.type === "exact" ? "相同套餐" : "不同套餐";
  meta.append(dayPill, setPill);

  const title = document.createElement("h3");
  title.textContent = `${state.names.kid1} ＋ ${state.names.kid2}`;
  const detail = document.createElement("p");
  detail.className = "match-detail";
  const rated = CHILD_KEYS.filter((child) => reviewFor(child, getMatchMeals(match)[child]).stars).length;
  detail.textContent = `合計 ${matchScore(match)} 星 / 10${rated < 2 ? "（有未評星）" : ""} · 同一天，每人 1 份`;

  const pairGrid = document.createElement("div");
  pairGrid.className = "match-pair-grid";
  pairGrid.append(
    makePairChoice("kid1", kid1),
    makePairChoice("kid2", kid2)
  );

  const choiceStatus = document.createElement("p");
  choiceStatus.className = "weekly-choice-status";
  choiceStatus.textContent = selected ? "✓ 已確認為本週安排 · 每人 1 份" : "選擇這一組作為本週安排";
  summary.append(meta, title, detail);
  button.append(summary, pairGrid, choiceStatus);
  button.addEventListener("click", () => setParentPick(key));
  node.append(button);
  return node;
}

function makePairChoice(childKey, item) {
  const node = document.createElement("div");
  node.className = "match-choice";

  const image = document.createElement("img");
  image.loading = "lazy";
  image.src = item.image;
  image.alt = `${item.title} — AI-generated realistic food illustration`;

  const child = document.createElement("span");
  child.className = "match-child";
  child.textContent = state.names[childKey];

  const title = document.createElement("strong");
  title.textContent = item.title;

  const meta = document.createElement("span");
  meta.className = "match-choice-meta";
  meta.textContent = `${item.set} · 1 份`;

  const chinese = document.createElement("span");
  chinese.className = "match-choice-meta";
  chinese.textContent = item.titleZh;
  const rating = uiNode("span", "result-rating", reviewLabel(childKey, item));
  node.append(image, child, title, chinese, meta, rating);
  return node;
}

function renderResults() {
  const matches = getMatches();
  const candidateDays = getCandidateDays(matches);

  elements.matchGrid.replaceChildren();
  elements.soloList.replaceChildren();
  elements.matchCount.textContent = `${candidateDays.length} 個可選日期 · ${matches.length} 個備選組合`;

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "本週暫時沒有共同可選日期。兩人在同一天各有一道「要」的餐就會列入備選，可以選相同或不同套餐。返回評價可繼續。";
    elements.matchGrid.append(empty);
  } else {
    candidateDays.forEach((day) => {
      const group = document.createElement("section");
      group.className = "candidate-day";
      group.dataset.date = day.date;
      const heading = document.createElement("h3");
      heading.className = "candidate-day-heading";
      heading.textContent = `${day.day} · ${day.date} · ${day.matches.length} 個組合`;
      const options = document.createElement("div");
      options.className = "candidate-options";
      day.matches.forEach((match) => options.append(makeMatchCard(match)));
      group.append(heading, options);
      elements.matchGrid.append(group);
    });
  }

  const parentPick = getParentPickMatch(matches);
  document.getElementById("clearParentPick").hidden = !parentPick;
  if (parentPick) {
    elements.parentPickTitle.textContent = `${parentPick.day} · ${parentPick.date}`;
    const stillWanted = matches.some((match) => getMatchKey(match) === getMatchKey(parentPick));
    elements.parentPickMeta.textContent = describeMatch(parentPick) + (stillWanted ? "" : "\n⚠ 評價已改動，原安排仍保留，請重新核對或改選。");
  } else {
    elements.parentPickTitle.textContent = "本週尚未確認";
    elements.parentPickMeta.textContent = "從備選中選擇一組，確定本週兩人各一份餐。系統不會自動替你決定。";
  }

  renderSoloList(matches);
}

function renderSoloList(matches) {
  const matched = getMatchedPickIds(matches);
  const solo = [];

  MENU_ITEMS.forEach((item) => {
    const inKid1 = state.picks.kid1.includes(item.id);
    const inKid2 = state.picks.kid2.includes(item.id);
    if (inKid1 && !matched.kid1.has(item.id)) {
      solo.push({ item, owner: state.names.kid1, child: "kid1" });
    }
    if (inKid2 && !matched.kid2.has(item.id)) {
      solo.push({ item, owner: state.names.kid2, child: "kid2" });
    }
  });

  if (solo.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "沒有未配對的喜歡套餐。";
    elements.soloList.append(empty);
    return;
  }

  solo.forEach(({ item, owner, child }) => {
    const node = document.createElement("div");
    node.className = "solo-item";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const meta = document.createElement("span");
    meta.textContent = `${item.day} ${item.date} · ${item.set} · ${owner} · ${reviewLabel(child, item)}`;
    node.append(title, meta);
    elements.soloList.append(node);
  });
}

function buildSummary() {
  const matches = getMatches();
  const lines = [
    `AISG Lunch Picker - Er Sha · ${activeWeek.label}`,
    "本週安排：每人 1 份餐，同一天。",
    "",
    "家長確認的最終安排："
  ];

  const parentPick = getParentPickMatch(matches);
  lines.push(parentPick ? describeMatch(parentPick) : "本週尚未確認；備選組合不代表已下單。" );
  if (parentPick && !matches.some((match) => getMatchKey(match) === getMatchKey(parentPick))) lines.push("評價已改動，原安排仍保留，請重新核對。");
  lines.push("此為選餐安排，尚未向供餐商下單。");
  lines.push("", `可選日期：${getCandidateDays(matches).length}；備選組合：${matches.length}`);

  return lines.join("\n");
}

async function copySummary() {
  const originalText = elements.copySummary.textContent;
  try {
    await navigator.clipboard.writeText(buildSummary());
    elements.copySummary.textContent = "Copied";
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = buildSummary();
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-1000px";
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    elements.copySummary.textContent = "Copied";
  }
  window.setTimeout(() => {
    elements.copySummary.textContent = originalText;
  }, 1300);
}

document.querySelectorAll(".segment").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

elements.copySummary.addEventListener("click", copySummary);
document.getElementById("clearParentPick").addEventListener("click", clearParentPick);
elements.printPage.addEventListener("click", () => window.print());
elements.resetWeek.addEventListener("click", () => {
  if (!window.confirm("清除本週兩人的評價、星數及確認安排？其他週的記錄會保留。")) return;
  const previousPicks = structuredClone(state.picks);
  const previousReviews = structuredClone(state.reviews);
  if (speechSupported()) window.speechSynthesis.cancel();
  speakingMealId = null;
  state = structuredClone(defaultState);
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  render();
  for (const child of CHILD_KEYS) for (const mealId of new Set([...previousPicks[child], ...Object.keys(previousReviews[child])])) recordSharedChange({ week: activeWeekId, kind: "pick", child, mealId, value: false, reviewed: false, stars: null });
  recordSharedChange({ week: activeWeekId, kind: "parent", value: null });
});

window.addEventListener("pagehide", () => {
  if (speechSupported()) window.speechSynthesis.cancel();
});

MENU_WEEKS.forEach((week) => {
  const option = document.createElement("option");
  option.value = week.id;
  option.textContent = week.label;
  elements.weekSelect.append(option);
});
elements.weekSelect.addEventListener("change", () => switchWeek(elements.weekSelect.value));
render();
