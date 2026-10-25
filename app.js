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

const CHILD_KEYS = ["kid1", "kid2"];

const defaultState = {
  view: "kid1",
  names: { kid1: "Luca", kid2: "Noah" },
  picks: { kid1: [], kid2: [] },
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
  template: document.querySelector("#mealCardTemplate"),
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
  if (match.type === "exact") {
    return `${match.day} ${match.date}: both chose ${match.item.title} (${match.item.set})`;
  }
  return `${match.day} ${match.date}: ${state.names.kid1} - ${match.kid1.title} (${match.kid1.set}); ${state.names.kid2} - ${match.kid2.title} (${match.kid2.set})`;
}

function getParentPickMatch(matches = getMatches()) {
  const key = normalizeParentPick(state.parentPick);
  if (!key) return null;
  return matches.find((match) => getMatchKey(match) === key) || null;
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

function currentKidKey() {
  return state.view === "kid2" ? "kid2" : "kid1";
}

function setView(view) {
  state.view = view;
  saveState();
  render();
}

function togglePick(itemId) {
  const kid = currentKidKey();
  const picks = new Set(state.picks[kid]);
  if (picks.has(itemId)) {
    picks.delete(itemId);
  } else {
    picks.add(itemId);
  }
  state.picks[kid] = MENU_ITEMS.filter((item) => picks.has(item.id)).map((item) => item.id);
  const matchKeys = new Set(getMatches().map(getMatchKey));
  const parentPickKey = normalizeParentPick(state.parentPick);
  if (parentPickKey && !matchKeys.has(parentPickKey)) {
    state.parentPick = null;
  } else {
    state.parentPick = parentPickKey;
  }
  saveState();
  render();
}

function setParentPick(matchKey) {
  const normalizedKey = normalizeParentPick(matchKey);
  state.parentPick = normalizeParentPick(state.parentPick) === normalizedKey ? null : normalizedKey;
  saveState();
  render();
}

function render() {
  elements.weekSelect.value = activeWeekId;
  elements.weekLabel.textContent = `Er Sha · ${activeWeek.label}`;
  elements.sourceImage.src = activeWeek.source;
  elements.sourceImage.alt = `Original AISG Er Sha lunch menu for ${activeWeek.label}`;
  elements.sourceLink.href = activeWeek.source;
  renderTabs();
  renderScores();

  const isResults = state.view === "results";
  elements.menuLayout.classList.toggle("hidden", isResults);
  elements.resultsLayout.classList.toggle("hidden", !isResults);
  elements.resultsLayout.classList.toggle("active", isResults);

  if (isResults) {
    elements.modeLabel.textContent = "Final decision";
    elements.modeTitle.textContent = "Choose from exact same-set matches or same-day matches.";
    renderResults();
  } else {
    const kid = currentKidKey();
    elements.modeLabel.textContent = `${state.names[kid]} choices`;
    elements.modeTitle.textContent = `Select every lunch ${state.names[kid]} would enjoy.`;
    renderMenu();
  }
}

function renderTabs() {
  document.querySelectorAll(".segment").forEach((button) => {
    const isActive = button.dataset.view === state.view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
    if (button.dataset.view === "kid1") button.textContent = state.names.kid1 || "Child 1";
    if (button.dataset.view === "kid2") button.textContent = state.names.kid2 || "Child 2";
  });
}

function renderScores() {
  const matches = getMatches();
  elements.scoreStrip.replaceChildren(
    makeScore(state.picks.kid1.length, state.names.kid1),
    makeScore(state.picks.kid2.length, state.names.kid2),
    makeScore(matches.length, "Orderable")
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
  activeWeek.days.forEach(({day, date, status}) => {
    const dayItems = MENU_ITEMS.filter((item) => item.date === date);
    const column = document.createElement("section");
    column.className = "day-column";
    column.append(makeDayHeader(day, date));
    if (status) {
      const notice = document.createElement("div");
      notice.className = "empty-state closed-day";
      notice.textContent = status;
      column.append(notice);
    }
    dayItems.forEach((item) => column.append(makeMealCard(item, "picker")));
    elements.menuLayout.append(column);
  });
}

function makeDayHeader(day, date) {
  const header = document.createElement("div");
  header.className = "day-header";
  const strong = document.createElement("strong");
  strong.textContent = day;
  const span = document.createElement("span");
  span.textContent = date;
  header.append(strong, span);
  return header;
}

function makeMealCard(item, mode) {
  const node = elements.template.content.firstElementChild.cloneNode(true);
  const isPicker = mode === "picker";
  const selectionKey = `exact:${item.id}`;
  const selected = isPicker
    ? state.picks[currentKidKey()].includes(item.id)
    : normalizeParentPick(state.parentPick) === selectionKey;

  node.dataset.id = item.id;
  node.classList.toggle("is-selected", isPicker && selected);
  node.classList.toggle("is-parent-pick", !isPicker && selected);

  const imageButton = node.querySelector(".image-button");
  const image = node.querySelector("img");
  const selectedMark = node.querySelector(".selected-mark");
  const dayPill = node.querySelector(".day-pill");
  const setPill = node.querySelector(".set-pill");
  const voiceButton = node.querySelector(".voice-button");
  const title = node.querySelector("h3");
  const titleZh = node.querySelector(".chinese-title");
  const itemList = node.querySelector(".item-list");
  const nutrition = node.querySelector(".nutrition");
  const allergy = node.querySelector(".allergy");

  image.loading = "lazy";
  image.src = item.image;
  image.alt = `${item.title} — AI-generated realistic food illustration`;
  imageButton.setAttribute("aria-pressed", String(selected));
  imageButton.setAttribute(
    "aria-label",
    isPicker ? `Toggle ${item.title}` : `Choose ${item.title} as final lunch`
  );
  selectedMark.textContent = isPicker ? "Picked" : "Final pick";
  dayPill.textContent = `${item.day} · ${item.date.slice(5)}`;
  setPill.textContent = item.set;
  setPill.classList.add(item.set.toLowerCase());
  voiceButton.setAttribute("aria-label", `Read ${item.title} in English and Putonghua`);
  voiceButton.setAttribute("aria-pressed", String(speakingMealId === item.id));
  voiceButton.classList.toggle("is-speaking", speakingMealId === item.id);
  title.textContent = item.title;
  titleZh.textContent = item.titleZh;

  item.items.forEach((line, index) => {
    const li = document.createElement("li");
    li.textContent = item.itemsZh?.[index] ? `${line} · ${item.itemsZh[index]}` : line;
    itemList.append(li);
  });

  [
    ["Cal", item.nutrition.cal],
    ["Protein", item.nutrition.protein],
    ["Fat", item.nutrition.fat],
    ["Carb", item.nutrition.carb]
  ].forEach(([label, value]) => {
    const span = document.createElement("span");
    span.textContent = `${label}: ${value}`;
    nutrition.append(span);
  });

  allergy.textContent = `Allergy (as printed): ${item.allergens.join(", ")}`;
  if (item.note) {
    const note = document.createElement("p");
    note.className = "source-note";
    note.textContent = item.note;
    node.querySelector(".meal-body").append(note);
  }
  const reference = document.createElement("a");
  reference.className = "source-link";
  reference.href = item.source;
  reference.target = "_blank";
  reference.rel = "noopener";
  reference.textContent = "View original menu · 查看原图";
  node.querySelector(".meal-body").append(reference);
  imageButton.addEventListener("click", () => {
    if (isPicker) {
      togglePick(item.id);
    } else {
      setParentPick(selectionKey);
    }
  });
  voiceButton.addEventListener("click", (event) => {
    event.stopPropagation();
    speakMeal(item);
  });
  node.addEventListener("dblclick", () => {
    if (isPicker) togglePick(item.id);
  });

  return node;
}

function makeMatchCard(match) {
  if (match.type === "exact") return makeMealCard(match.item, "results");

  const key = getMatchKey(match);
  const selected = normalizeParentPick(state.parentPick) === key;
  const node = document.createElement("article");
  node.className = "meal-card match-card same-day-match";
  node.classList.toggle("is-parent-pick", selected);

  const button = document.createElement("button");
  button.className = "match-pick-button";
  button.type = "button";
  button.setAttribute("aria-pressed", String(selected));
  button.setAttribute("aria-label", `Choose ${match.day} same-day match as final lunch`);

  const selectedMark = document.createElement("span");
  selectedMark.className = "selected-mark";
  selectedMark.setAttribute("aria-hidden", "true");
  selectedMark.textContent = "Final pick";

  const summary = document.createElement("div");
  summary.className = "match-summary";

  const meta = document.createElement("div");
  meta.className = "meal-meta";
  const dayPill = document.createElement("span");
  dayPill.className = "day-pill";
  dayPill.textContent = match.day;
  const setPill = document.createElement("span");
  setPill.className = "set-pill festival";
  setPill.textContent = "Same day";
  meta.append(dayPill, setPill);

  const title = document.createElement("h3");
  title.textContent = `${match.day} lunch match`;
  const detail = document.createElement("p");
  detail.className = "match-detail";
  detail.textContent = `${match.date} - order one set for each child.`;

  const pairGrid = document.createElement("div");
  pairGrid.className = "match-pair-grid";
  pairGrid.append(
    makePairChoice(state.names.kid1, match.kid1),
    makePairChoice(state.names.kid2, match.kid2)
  );

  summary.append(meta, title, detail);
  button.append(selectedMark, summary, pairGrid);
  button.addEventListener("click", () => setParentPick(key));
  node.append(button);
  return node;
}

function makePairChoice(childName, item) {
  const node = document.createElement("div");
  node.className = "match-choice";

  const image = document.createElement("img");
  image.loading = "lazy";
  image.src = item.image;
  image.alt = `${item.title} — AI-generated realistic food illustration`;

  const child = document.createElement("span");
  child.className = "match-child";
  child.textContent = childName;

  const title = document.createElement("strong");
  title.textContent = item.title;

  const meta = document.createElement("span");
  meta.className = "match-choice-meta";
  meta.textContent = item.set;

  node.append(image, child, title, meta);
  return node;
}

function renderResults() {
  const matches = getMatches();
  const matchKeys = new Set(matches.map(getMatchKey));
  const parentPickKey = normalizeParentPick(state.parentPick);
  if (parentPickKey && !matchKeys.has(parentPickKey)) {
    state.parentPick = null;
    saveState();
  } else {
    state.parentPick = parentPickKey;
  }

  elements.matchGrid.replaceChildren();
  elements.soloList.replaceChildren();
  elements.matchCount.textContent = matches.length === 1
    ? "1 orderable match"
    : `${matches.length} orderable matches`;

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "No exact same-set or same-day match yet. Switch back to each child and add more lunches they would accept.";
    elements.matchGrid.append(empty);
  } else {
    matches.forEach((match) => elements.matchGrid.append(makeMatchCard(match)));
  }

  const parentPick = getParentPickMatch(matches);
  if (parentPick) {
    elements.parentPickTitle.textContent = parentPick.type === "exact"
      ? parentPick.item.title
      : `${parentPick.day} lunch match`;
    elements.parentPickMeta.textContent = describeMatch(parentPick);
  } else {
    elements.parentPickTitle.textContent = "No final choice selected";
    elements.parentPickMeta.textContent = "Choose one exact or same-day match when both children have finished.";
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
      solo.push({ item, owner: state.names.kid1 });
    }
    if (inKid2 && !matched.kid2.has(item.id)) {
      solo.push({ item, owner: state.names.kid2 });
    }
  });

  if (solo.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "None";
    elements.soloList.append(empty);
    return;
  }

  solo.forEach(({ item, owner }) => {
    const node = document.createElement("div");
    node.className = "solo-item";
    const title = document.createElement("strong");
    title.textContent = item.title;
    const meta = document.createElement("span");
    meta.textContent = `${item.day} ${item.date} · ${item.set} · ${owner}`;
    node.append(title, meta);
    elements.soloList.append(node);
  });
}

function buildSummary() {
  const matches = getMatches();
  const lines = [
    `AISG Lunch Picker - Er Sha · ${activeWeek.label}`,
    `${state.names.kid1}: ${state.picks.kid1.length} choices`,
    `${state.names.kid2}: ${state.picks.kid2.length} choices`,
    "",
    "Orderable matches:"
  ];

  if (matches.length === 0) {
    lines.push("None yet");
  } else {
    matches.forEach((match) => {
      lines.push(`- ${describeMatch(match)}`);
    });
  }

  const parentPick = getParentPickMatch(matches);
  lines.push("", "Parent pick:");
  lines.push(parentPick ? describeMatch(parentPick) : "Not selected");

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
elements.printPage.addEventListener("click", () => window.print());
elements.resetWeek.addEventListener("click", () => {
  if (!window.confirm("Clear this week's names, picks, and parent choice?")) return;
  if (speechSupported()) window.speechSynthesis.cancel();
  speakingMealId = null;
  state = structuredClone(defaultState);
  try { localStorage.removeItem(STORAGE_KEY); } catch {}
  render();
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
