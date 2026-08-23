const STORAGE_KEY = "aisg-lunch-picker-er-sha-2026-08-24-luca-noah";

const MENU_ITEMS = [
  {
    id: "asian-mon-pork-mince-egg",
    day: "Monday",
    date: "2026/8/24",
    set: "Asian",
    title: "Marinated Pork Mince with Egg",
    titleZh: "台湾卤肉配卤鸡蛋",
    image: "assets/food/asian-mon-pork-mince-egg-20260824.webp",
    items: ["Green leafy vegetables", "Steamed rice", "Wax gourd pork soup"],
    itemsZh: ["上海春菜", "米饭", "冬瓜猪骨汤"],
    allergens: ["Gluten", "Egg"],
    nutrition: { cal: "459 kcal", protein: "19.2g", fat: "30.4g", carb: "27g" }
  },
  {
    id: "western-mon-roasted-chicken-orange-fennel",
    day: "Monday",
    date: "2026/8/24",
    set: "Western",
    title: "Roasted Chicken Steak with Orange & Fennel",
    titleZh: "茴香橙柳烤鸡扒",
    image: "assets/food/western-mon-roasted-chicken-orange-fennel-20260824.webp",
    items: ["Stir-fried carrots and green beans", "Onion butter rice", "Broccoli soup"],
    itemsZh: ["炒胡萝卜豆角", "牛油洋葱饭", "西兰花浓汤"],
    allergens: ["Gluten", "Dairy"],
    nutrition: { cal: "260 kcal", protein: "25.4g", fat: "7.1g", carb: "25.4g" }
  },
  {
    id: "veg-mon-curry-udon-tofu",
    day: "Monday",
    date: "2026/8/24",
    set: "Vegetarian",
    title: "Udon in Curry Soup, Baked Tofu, Mixed Vegetables",
    titleZh: "咖喱汤乌冬，酱烤豆腐，混和蔬菜",
    image: "assets/food/veg-mon-curry-udon-tofu-20260824.webp",
    items: ["Udon in curry soup", "Baked tofu", "Mixed vegetables"],
    itemsZh: ["咖喱汤乌冬", "酱烤豆腐", "混和蔬菜"],
    allergens: ["Gluten"],
    nutrition: { cal: "398 kcal", protein: "17.4g", fat: "6.1g", carb: "71.4g" }
  },
  {
    id: "asian-tue-beef-pepper-lettuce",
    day: "Tuesday",
    date: "2026/8/25",
    set: "Asian",
    title: "Stir-fried Beef with Pepper Lettuce",
    titleZh: "甜椒莴笋炒牛肉",
    image: "assets/food/asian-tue-beef-pepper-lettuce-20260825.webp",
    items: ["Leaf lettuce", "Steamed rice", "Vegetable & pork soup"],
    itemsZh: ["油麦菜", "米饭", "霸王花猪肉汤"],
    allergens: ["Gluten"],
    nutrition: { cal: "299 kcal", protein: "23.7g", fat: "9.2g", carb: "31.3g" }
  },
  {
    id: "western-tue-pulled-pork-sandwich",
    day: "Tuesday",
    date: "2026/8/25",
    set: "Western",
    title: "Pulled Pork Sandwich",
    titleZh: "美式手撕烤猪肉包",
    image: "assets/food/western-tue-pulled-pork-sandwich-20260825.webp",
    items: ["Sauteed broccoli and cauliflower", "Roasted potato", "Mushroom cream soup"],
    itemsZh: ["清炒西兰花菜花", "烤土豆", "蘑菇忌廉汤"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "674 kcal", protein: "44.8g", fat: "43g", carb: "92.4g" }
  },
  {
    id: "veg-tue-sweet-sour-beancurd",
    day: "Tuesday",
    date: "2026/8/25",
    set: "Vegetarian",
    title: "Sweet and Sour Beancurd Ball, Diced Vegetables, Egg Fried Rice",
    titleZh: "素咕咾肉，五彩蔬菜丁，蛋炒饭",
    image: "assets/food/veg-tue-sweet-sour-beancurd-20260825.webp",
    items: ["Sweet and sour beancurd balls", "Stir-fried diced mixed vegetables", "Egg fried rice"],
    itemsZh: ["素咕咾肉", "五彩蔬菜丁", "蛋炒饭"],
    allergens: ["Gluten", "Egg"],
    nutrition: { cal: "362 kcal", protein: "23g", fat: "14.9g", carb: "35.6g" }
  },
  {
    id: "asian-wed-pork-taro-soya",
    day: "Wednesday",
    date: "2026/8/26",
    set: "Asian",
    title: "Steamed Pork Taro with Soya Beans",
    titleZh: "豉汁香芋蒸肉粒",
    image: "assets/food/asian-wed-pork-taro-soya-20260826.webp",
    items: ["Choy sum", "Brown rice", "Pork apple soup"],
    itemsZh: ["菜心", "糙米饭", "苹果瘦肉汤"],
    allergens: ["Gluten"],
    nutrition: { cal: "523 kcal", protein: "20.5g", fat: "30.1g", carb: "42g" }
  },
  {
    id: "western-wed-beef-lasagna",
    day: "Wednesday",
    date: "2026/8/26",
    set: "Western",
    title: "Beef Lasagna",
    titleZh: "牛肉酱千层面",
    image: "assets/food/western-wed-beef-lasagna-20260826.webp",
    items: ["Zucchini & carrot", "Corn", "Pumpkin soup"],
    itemsZh: ["胡萝卜西葫芦", "玉米粒", "南瓜浓汤"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "511 kcal", protein: "31.9g", fat: "8.8g", carb: "76.3g" }
  },
  {
    id: "veg-wed-stewed-tofu-onigiri",
    day: "Wednesday",
    date: "2026/8/26",
    set: "Vegetarian",
    title: "Stewed Tofu, Seaweed Mushroom Onigiri, Cabbage",
    titleZh: "鸿禧菇炖豆腐，紫菜香菇饭团，卷心菜",
    image: "assets/food/veg-wed-stewed-tofu-onigiri-20260826.webp",
    items: ["Stewed tofu", "Seaweed mushroom onigiri", "Cabbage"],
    itemsZh: ["鸿禧菇炖豆腐", "紫菜香菇饭团", "卷心菜"],
    allergens: ["Gluten"],
    nutrition: { cal: "318 kcal", protein: "17g", fat: "6.1g", carb: "49.2g" }
  },
  {
    id: "asian-thu-yangzhou-fried-rice",
    day: "Thursday",
    date: "2026/8/27",
    set: "Asian",
    title: "Yangzhou Fried Rice",
    titleZh: "扬州炒饭",
    image: "assets/food/asian-thu-yangzhou-fried-rice-20260827.webp",
    items: ["Green pak choi", "Marinated eggs", "Corn & carrot pork soup"],
    itemsZh: ["小唐菜", "卤蛋", "玉米胡萝卜猪骨汤"],
    allergens: ["Gluten", "Seafood", "Egg"],
    nutrition: { cal: "281 kcal", protein: "24.5g", fat: "7.2g", carb: "30.2g" }
  },
  {
    id: "western-thu-pork-chop-pesto",
    day: "Thursday",
    date: "2026/8/27",
    set: "Western",
    title: "Baked Pork Chop with Pesto & Vegetables",
    titleZh: "意式罗勒酱蔬菜丁焗猪扒",
    image: "assets/food/western-thu-pork-chop-pesto-20260827.webp",
    items: ["Grilled mixed vegetables", "Mashed potato", "Cauliflower and potato soup"],
    itemsZh: ["扒杂菜", "土豆泥", "花菜薯蓉汤"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "432 kcal", protein: "19.2g", fat: "30.5g", carb: "21.2g" }
  },
  {
    id: "veg-thu-tomato-noodles-tofu",
    day: "Thursday",
    date: "2026/8/27",
    set: "Vegetarian",
    title: "Tomato Noodles, Vinegar Cucumber, Braised Tofu Curd",
    titleZh: "番茄素菜拌拉面，香醋青瓜，红烧豆干",
    image: "assets/food/veg-thu-tomato-noodles-tofu-20260827.webp",
    items: ["Noodles with tomato", "Cucumber in vinegar", "Braised tofu curd"],
    itemsZh: ["番茄素菜拌拉面", "香醋青瓜", "红烧豆干"],
    allergens: ["Gluten"],
    nutrition: { cal: "416 kcal", protein: "17.2g", fat: "6.3g", carb: "75.2g" }
  },
  {
    id: "fri-southeast-asia-festival",
    day: "Friday",
    date: "2026/8/28",
    set: "Festival",
    title: "Southeast Asia Food Festival",
    titleZh: "东南亚美食节",
    image: "assets/food/fri-southeast-asia-festival-20260828.webp",
    items: ["Malay spiced fried chicken", "Thai basil stir-fried beef", "Sambal kangkung", "Chicken oil nasi lemak", "Coconut chicken soup"],
    itemsZh: ["马来香料炸鸡", "泰式罗勒炒牛肉", "马来参巴空心菜", "鸡油椰浆饭", "椰子鸡汤"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "440 kcal", protein: "45.1g", fat: "15.9g", carb: "31.3g" }
  },
  {
    id: "veg-fri-kwai-teow-green-curry",
    day: "Friday",
    date: "2026/8/28",
    set: "Vegetarian",
    title: "Kwai Teow with Kai Lan, Fried Egg, Green Curry Vegetables",
    titleZh: "芥兰炒贵刁，煎蛋，青咖喱杂菜",
    image: "assets/food/veg-fri-kwai-teow-green-curry-20260828.webp",
    items: ["Kwai teow with kai lan", "Fried egg", "Green curry mixed vegetables"],
    itemsZh: ["芥兰炒贵刁", "煎蛋", "青咖喱杂菜"],
    allergens: ["Gluten", "Dairy", "Egg"],
    nutrition: { cal: "183 kcal", protein: "17.8g", fat: "9.1g", carb: "9.9g" }
  }
];

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
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
  resetWeek: document.querySelector("#resetWeek")
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
  DAY_ORDER.forEach((day) => {
    const dayItems = MENU_ITEMS.filter((item) => item.day === day);
    const column = document.createElement("section");
    column.className = "day-column";
    column.append(makeDayHeader(day, dayItems[0]?.date));
    dayItems.forEach((item) => {
      column.append(makeMealCard(item, "picker"));
    });
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

  image.src = item.image;
  image.alt = `${item.title} lunch set`;
  imageButton.setAttribute("aria-pressed", String(selected));
  imageButton.setAttribute(
    "aria-label",
    isPicker ? `Toggle ${item.title}` : `Choose ${item.title} as final lunch`
  );
  selectedMark.textContent = isPicker ? "Picked" : "Final pick";
  dayPill.textContent = item.day;
  setPill.textContent = item.set;
  setPill.classList.add(item.set.toLowerCase());
  voiceButton.setAttribute("aria-label", `Read ${item.title} in English and Putonghua`);
  voiceButton.setAttribute("aria-pressed", String(speakingMealId === item.id));
  voiceButton.classList.toggle("is-speaking", speakingMealId === item.id);
  title.textContent = item.title;
  titleZh.textContent = item.titleZh;

  item.items.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
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

  allergy.textContent = `Allergy: ${item.allergens.join(", ")}`;
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
  image.src = item.image;
  image.alt = `${item.title} lunch set`;

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
    meta.textContent = `${item.day} · ${item.set} · ${owner}`;
    node.append(title, meta);
    elements.soloList.append(node);
  });
}

function buildSummary() {
  const matches = getMatches();
  const lines = [
    "AISG Lunch Picker - Er Sha · Aug 24-28, 2026",
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
  localStorage.removeItem(STORAGE_KEY);
  render();
});

window.addEventListener("pagehide", () => {
  if (speechSupported()) window.speechSynthesis.cancel();
});

cleanupLunchServiceWorker();
render();
