/* Transcribed from the five supplied November 2026 menu images. Nutrition and allergens are as printed. */
const MENU_WEEKS = [
  {
    "id": "2026-11-02",
    "label": "Nov 2–6, 2026",
    "start": "2026-11-02",
    "days": [
      {
        "day": "Monday",
        "date": "2026/11/2",
        "status": "Schoolwide PD (No Class) · 教师研讨会（不上课）"
      },
      {
        "day": "Tuesday",
        "date": "2026/11/3",
        "status": ""
      },
      {
        "day": "Wednesday",
        "date": "2026/11/4",
        "status": ""
      },
      {
        "day": "Thursday",
        "date": "2026/11/5",
        "status": ""
      },
      {
        "day": "Friday",
        "date": "2026/11/6",
        "status": ""
      }
    ],
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "2026-11-09",
    "label": "Nov 9–13, 2026",
    "start": "2026-11-09",
    "days": [
      {
        "day": "Monday",
        "date": "2026/11/9",
        "status": ""
      },
      {
        "day": "Tuesday",
        "date": "2026/11/10",
        "status": ""
      },
      {
        "day": "Wednesday",
        "date": "2026/11/11",
        "status": ""
      },
      {
        "day": "Thursday",
        "date": "2026/11/12",
        "status": ""
      },
      {
        "day": "Friday",
        "date": "2026/11/13",
        "status": ""
      }
    ],
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "2026-11-16",
    "label": "Nov 16–20, 2026",
    "start": "2026-11-16",
    "days": [
      {
        "day": "Monday",
        "date": "2026/11/16",
        "status": ""
      },
      {
        "day": "Tuesday",
        "date": "2026/11/17",
        "status": ""
      },
      {
        "day": "Wednesday",
        "date": "2026/11/18",
        "status": ""
      },
      {
        "day": "Thursday",
        "date": "2026/11/19",
        "status": ""
      },
      {
        "day": "Friday",
        "date": "2026/11/20",
        "status": ""
      }
    ],
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "2026-11-23",
    "label": "Nov 23–27, 2026",
    "start": "2026-11-23",
    "days": [
      {
        "day": "Monday",
        "date": "2026/11/23",
        "status": ""
      },
      {
        "day": "Tuesday",
        "date": "2026/11/24",
        "status": ""
      },
      {
        "day": "Wednesday",
        "date": "2026/11/25",
        "status": ""
      },
      {
        "day": "Thursday",
        "date": "2026/11/26",
        "status": ""
      },
      {
        "day": "Friday",
        "date": "2026/11/27",
        "status": "Happy Thanksgiving! · 感恩节假期"
      }
    ],
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "2026-11-30",
    "label": "Nov 30, 2026",
    "start": "2026-11-30",
    "days": [
      {
        "day": "Monday",
        "date": "2026/11/30",
        "status": ""
      }
    ],
    "source": "assets/source/menu-20261130.jpg"
  }
];
const ALL_MENU_ITEMS = [
  {
    "id": "asian-20261103",
    "day": "Tuesday",
    "date": "2026/11/3",
    "set": "Asian",
    "title": "Rice Noodles in Chicken Tomato Soup",
    "titleZh": "鸡丝番茄汤米线",
    "image": "assets/food/asian-20261103.svg",
    "items": [
      "Lettuce",
      "Vegetable & Pork Soup"
    ],
    "itemsZh": [
      "生菜",
      "霸王花猪肉汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "277 kcal",
      "protein": "23.6g",
      "fat": "7.1g",
      "carb": "30.8g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "western-20261103",
    "day": "Tuesday",
    "date": "2026/11/3",
    "set": "Western",
    "title": "Baked Fish Fillet with Honey Mustard Cheese",
    "titleZh": "蜂蜜芥末芝士焗鱼柳",
    "image": "assets/food/western-20261103.svg",
    "items": [
      "Stir-fried Carrot and Peas",
      "Mashed Potato",
      "Mushroom Cream Soup"
    ],
    "itemsZh": [
      "胡萝卜炒豌豆",
      "土豆泥",
      "奶油蘑菇汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Seafood",
      "Egg"
    ],
    "nutrition": {
      "cal": "504 kcal",
      "protein": "38.3g",
      "fat": "7.6g",
      "carb": "78.2g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "vegetarian-20261103",
    "day": "Tuesday",
    "date": "2026/11/3",
    "set": "Vegetarian",
    "title": "Braised Mushroom Tofu, Roasted Eggplant, Egg Fried Rice",
    "titleZh": "金针菇烧日本豆腐，味噌烤茄子，杂菜蛋炒饭",
    "image": "assets/food/vegetarian-20261103.svg",
    "items": [
      "Braised Mushroom Tofu",
      "Roasted Eggplant",
      "Egg Fried Rice"
    ],
    "itemsZh": [
      "金针菇烧日本豆腐",
      "味噌烤茄子",
      "杂菜蛋炒饭"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "366 kcal",
      "protein": "25.8g",
      "fat": "14.8g",
      "carb": "35.4g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "asian-20261104",
    "day": "Wednesday",
    "date": "2026/11/4",
    "set": "Asian",
    "title": "Stewed Beef with Radish",
    "titleZh": "柱候萝卜炆牛腩",
    "image": "assets/food/asian-20261104.svg",
    "items": [
      "Leaf Lettuce",
      "Steamed Rice",
      "Coconut Chicken Soup"
    ],
    "itemsZh": [
      "油麦菜",
      "米饭",
      "椰子鸡汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "479 kcal",
      "protein": "21.7g",
      "fat": "20.7g",
      "carb": "35.3g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "western-20261104",
    "day": "Wednesday",
    "date": "2026/11/4",
    "set": "Western",
    "title": "Super Supreme Pizza",
    "titleZh": "超级至尊披萨",
    "image": "assets/food/western-20261104.svg",
    "items": [
      "Sautéed Broccoli with Pepper",
      "Roasted Pumpkin",
      "Pumpkin Soup"
    ],
    "itemsZh": [
      "甜椒炒西兰花",
      "烤南瓜",
      "南瓜浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "430 kcal",
      "protein": "16.6g",
      "fat": "14g",
      "carb": "55.3g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "vegetarian-20261104",
    "day": "Wednesday",
    "date": "2026/11/4",
    "set": "Vegetarian",
    "title": "Fried Rice Noodles, Curry Vegetables, Fried Egg with Corn",
    "titleZh": "素炒米粉，咖喱蔬菜，玉米炒蛋",
    "image": "assets/food/vegetarian-20261104.svg",
    "items": [
      "Fried Rice Noodles",
      "Curry Vegetables",
      "Fried Egg with Corn"
    ],
    "itemsZh": [
      "素炒米粉",
      "咖喱蔬菜",
      "玉米炒蛋"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "290 kcal",
      "protein": "18.2g",
      "fat": "9.3g",
      "carb": "35g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "asian-20261105",
    "day": "Thursday",
    "date": "2026/11/5",
    "set": "Asian",
    "title": "Braised Chicken Drumstick with Potatoes",
    "titleZh": "土豆焖鸡腿",
    "image": "assets/food/asian-20261105.svg",
    "items": [
      "Choy Sum",
      "Steamed Rice",
      "Apple Soup with Pork"
    ],
    "itemsZh": [
      "菜心",
      "米饭",
      "苹果瘦肉汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "357 kcal",
      "protein": "26.8g",
      "fat": "7.6g",
      "carb": "47.3g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "western-20261105",
    "day": "Thursday",
    "date": "2026/11/5",
    "set": "Western",
    "title": "Mexican BBQ Pork",
    "titleZh": "墨西哥风味烤肉",
    "image": "assets/food/western-20261105.svg",
    "items": [
      "Mushroom Zucchini",
      "Potato Wedges",
      "Corn & Tomato Soup"
    ],
    "itemsZh": [
      "香草蘑菇西葫芦",
      "香烤薯角",
      "番茄玉米浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Pork"
    ],
    "nutrition": {
      "cal": "439 kcal",
      "protein": "21.1g",
      "fat": "30.9g",
      "carb": "21.5g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "vegetarian-20261105",
    "day": "Thursday",
    "date": "2026/11/5",
    "set": "Vegetarian",
    "title": "Tomato Cheese Egg Panini, Hash Browns, Vegetables",
    "titleZh": "番茄芝士滑蛋帕尼尼，黄金薯饼，时蔬",
    "image": "assets/food/vegetarian-20261105.svg",
    "items": [
      "Tomato Cheese Egg Panini",
      "Hash Browns",
      "Vegetables"
    ],
    "itemsZh": [
      "番茄芝士滑蛋帕尼尼",
      "黄金薯饼",
      "时蔬"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Dairy"
    ],
    "nutrition": {
      "cal": "429 kcal",
      "protein": "24.2g",
      "fat": "12.6g",
      "carb": "72.9g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "asian-20261106",
    "day": "Friday",
    "date": "2026/11/6",
    "set": "Asian",
    "title": "Stir-fried Pork with Basil & Fried Eggs",
    "titleZh": "罗勒炒猪肉配煎鸡蛋",
    "image": "assets/food/asian-20261106.svg",
    "items": [
      "Green Pak Choi",
      "Steamed Rice",
      "Corn & Carrot Pork Soup"
    ],
    "itemsZh": [
      "小唐菜",
      "米饭",
      "玉米胡萝卜猪骨汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "447 kcal",
      "protein": "18.5g",
      "fat": "30.6g",
      "carb": "29.2g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "western-20261106",
    "day": "Friday",
    "date": "2026/11/6",
    "set": "Western",
    "title": "Beef Sausage",
    "titleZh": "牛肉香肠",
    "image": "assets/food/western-20261106.svg",
    "items": [
      "Baby Corn & Vegetables",
      "Garlic Pasta",
      "Minestrone Soup"
    ],
    "itemsZh": [
      "玉米笋及时蔬",
      "蒜香意面",
      "意大利蔬菜汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "504 kcal",
      "protein": "38.3g",
      "fat": "7.6g",
      "carb": "78.2g"
    },
    "source": "assets/source/menu-20261102.jpg",
    "note": "Nutrition is transcribed as printed; the source repeats the Nov 3 Western values. 营养数值按原图录入，原图与11月3日西餐重复。"
  },
  {
    "id": "vegetarian-20261106",
    "day": "Friday",
    "date": "2026/11/6",
    "set": "Vegetarian",
    "title": "Braised Eggplant, Fungus and Bean Curd, Scallion Soba Noodles",
    "titleZh": "红烧茄子、木耳豆腐，葱油拌荞麦面",
    "image": "assets/food/vegetarian-20261106.svg",
    "items": [
      "Braised Eggplant, Fungus and Bean Curd",
      "Scallion Soba Noodles"
    ],
    "itemsZh": [
      "红烧茄子、木耳豆腐",
      "葱油拌荞麦面"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "398 kcal",
      "protein": "17.4g",
      "fat": "6.1g",
      "carb": "71.4g"
    },
    "source": "assets/source/menu-20261102.jpg"
  },
  {
    "id": "asian-20261109",
    "day": "Monday",
    "date": "2026/11/9",
    "set": "Asian",
    "title": "Marinated Mince Pork with Egg",
    "titleZh": "台式卤肉饭配卤鸡蛋",
    "image": "assets/food/asian-20261109.svg",
    "items": [
      "Stir-fried Cabbage",
      "Steamed Rice",
      "Corn & Carrot Pork Soup"
    ],
    "itemsZh": [
      "清炒大白菜",
      "米饭",
      "玉米胡萝卜猪骨汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "459 kcal",
      "protein": "19.2g",
      "fat": "30.4g",
      "carb": "27g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "western-20261109",
    "day": "Monday",
    "date": "2026/11/9",
    "set": "Western",
    "title": "Chicken Parmigiana",
    "titleZh": "意式芝士焗鸡排",
    "image": "assets/food/western-20261109.svg",
    "items": [
      "Zucchini Cauliflower",
      "Mashed Potato",
      "Minestrone Soup"
    ],
    "itemsZh": [
      "西葫芦花菜",
      "土豆泥",
      "意大利蔬菜汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "272 kcal",
      "protein": "27.2g",
      "fat": "7.7g",
      "carb": "6.2g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "vegetarian-20261109",
    "day": "Monday",
    "date": "2026/11/9",
    "set": "Vegetarian",
    "title": "Stir-fried Diced Vegetables, Scallion Oil Noodles, Baked Bean Curd",
    "titleZh": "五彩素丁，葱油捞面，香烤豆腐",
    "image": "assets/food/vegetarian-20261109.svg",
    "items": [
      "Stir-fried Diced Vegetables",
      "Scallion Oil Noodles",
      "Baked Bean Curd"
    ],
    "itemsZh": [
      "五彩素丁",
      "葱油捞面",
      "香烤豆腐"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "367 kcal",
      "protein": "25.5g",
      "fat": "9.8g",
      "carb": "71.7g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "asian-20261110",
    "day": "Tuesday",
    "date": "2026/11/10",
    "set": "Asian",
    "title": "Sweet and Sour Fish",
    "titleZh": "酸甜五柳汁鱼柳",
    "image": "assets/food/asian-20261110.svg",
    "items": [
      "Choy Sum",
      "Steamed Rice",
      "Apple Soup with Pork"
    ],
    "itemsZh": [
      "菜心",
      "米饭",
      "苹果瘦肉汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Seafood"
    ],
    "nutrition": {
      "cal": "233 kcal",
      "protein": "20.3g",
      "fat": "2.6g",
      "carb": "33.9g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "western-20261110",
    "day": "Tuesday",
    "date": "2026/11/10",
    "set": "Western",
    "title": "Lasagna Bolognese",
    "titleZh": "肉酱千层面",
    "image": "assets/food/western-20261110.svg",
    "items": [
      "Stir-fried Carrots and Green Beans",
      "Corn",
      "Mushroom Cream Soup"
    ],
    "itemsZh": [
      "炒胡萝卜豆角",
      "玉米",
      "奶油蘑菇汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "511 kcal",
      "protein": "31.9g",
      "fat": "8.8g",
      "carb": "76.3g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "vegetarian-20261110",
    "day": "Tuesday",
    "date": "2026/11/10",
    "set": "Vegetarian",
    "title": "Stewed Tofu with Asparagus, Scallion Pancake, Fried Shredded Potatoes",
    "titleZh": "芦笋炖豆腐，葱油饼，炒土豆丝",
    "image": "assets/food/vegetarian-20261110.svg",
    "items": [
      "Stewed Tofu with Asparagus",
      "Scallion Pancake",
      "Fried Shredded Potatoes"
    ],
    "itemsZh": [
      "芦笋烩豆腐",
      "葱油饼",
      "炒土豆丝"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "371 kcal",
      "protein": "16.8g",
      "fat": "7.2g",
      "carb": "53.7g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "asian-20261111",
    "day": "Wednesday",
    "date": "2026/11/11",
    "set": "Asian",
    "title": "Stir-fried Beef with Bell Pepper and Asparagus",
    "titleZh": "甜椒莴笋炒牛肉",
    "image": "assets/food/asian-20261111.svg",
    "items": [
      "Green Pak Choi",
      "Steamed Rice",
      "Vegetable & Pork Soup"
    ],
    "itemsZh": [
      "小唐菜",
      "米饭",
      "霸王花猪肉汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "299 kcal",
      "protein": "23.7g",
      "fat": "9.2g",
      "carb": "31.3g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "western-20261111",
    "day": "Wednesday",
    "date": "2026/11/11",
    "set": "Western",
    "title": "Ham & Cheese Sandwich",
    "titleZh": "火腿芝士三文治",
    "image": "assets/food/western-20261111.svg",
    "items": [
      "Baby Corn & Vegetables",
      "Roasted Potatoes",
      "Onion Soup"
    ],
    "itemsZh": [
      "玉米笋及时蔬",
      "迷迭香烤土豆",
      "洋葱汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Dairy",
      "Pork"
    ],
    "nutrition": {
      "cal": "445 kcal",
      "protein": "14.9g",
      "fat": "12.1g",
      "carb": "58.6g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "vegetarian-20261111",
    "day": "Wednesday",
    "date": "2026/11/11",
    "set": "Vegetarian",
    "title": "Rice Noodles in Mushroom Tofu Soup, Lettuce, Fried Egg",
    "titleZh": "三鲜豆腐菌菇米线，清炒生菜，煎蛋",
    "image": "assets/food/vegetarian-20261111.svg",
    "items": [
      "Rice Noodles in Mushroom Tofu Soup",
      "Lettuce",
      "Fried Egg"
    ],
    "itemsZh": [
      "三鲜豆腐菌菇米线",
      "清炒生菜",
      "煎蛋"
    ],
    "allergens": [
      "Egg"
    ],
    "nutrition": {
      "cal": "371 kcal",
      "protein": "16.7g",
      "fat": "11g",
      "carb": "52.5g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "asian-20261112",
    "day": "Thursday",
    "date": "2026/11/12",
    "set": "Asian",
    "title": "Pork Dumplings",
    "titleZh": "猪肉饺子",
    "image": "assets/food/asian-20261112.svg",
    "items": [
      "Leaf Lettuce",
      "Stir-fried Noodles",
      "Tomato Corn Chicken Soup"
    ],
    "itemsZh": [
      "油麦菜",
      "豉油皇炒面",
      "番茄玉米鸡肉汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "356 kcal",
      "protein": "15.2g",
      "fat": "7.7g",
      "carb": "68.3g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "western-20261112",
    "day": "Thursday",
    "date": "2026/11/12",
    "set": "Western",
    "title": "Roasted Chicken Steak with Orange & Fennel",
    "titleZh": "茴香橙柳烤鸡扒",
    "image": "assets/food/western-20261112.svg",
    "items": [
      "Mixed Vegetables",
      "Onion Butter Rice",
      "Broccoli Soup"
    ],
    "itemsZh": [
      "混合蔬菜",
      "牛油洋葱饭",
      "西兰花浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "260 kcal",
      "protein": "25.4g",
      "fat": "7.1g",
      "carb": "25.4g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "vegetarian-20261112",
    "day": "Thursday",
    "date": "2026/11/12",
    "set": "Vegetarian",
    "title": "Baked Cheese Macaroni, Broccoli & Mini Frittata",
    "titleZh": "芝士焗通心粉，白汁焗西兰花，意式烘蛋",
    "image": "assets/food/vegetarian-20261112.svg",
    "items": [
      "Baked Cheese Macaroni",
      "Broccoli",
      "Mini Frittata"
    ],
    "itemsZh": [
      "芝士焗通心粉",
      "白汁焗西兰花",
      "意式烘蛋"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "452 kcal",
      "protein": "28.5g",
      "fat": "9.3g",
      "carb": "74.1g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "asian-20261113",
    "day": "Friday",
    "date": "2026/11/13",
    "set": "Asian",
    "title": "Steamed Chicken with Mushroom",
    "titleZh": "家常香菇蒸鸡",
    "image": "assets/food/asian-20261113.svg",
    "items": [
      "Lettuce",
      "Steamed Rice",
      "Lotus Root & Pork Soup"
    ],
    "itemsZh": [
      "白灼生菜",
      "米饭",
      "莲藕龙骨汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "300 kcal",
      "protein": "26.9g",
      "fat": "7.5g",
      "carb": "33.6g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "western-20261113",
    "day": "Friday",
    "date": "2026/11/13",
    "set": "Western",
    "title": "Ham Tomato Soup with Macaroni",
    "titleZh": "火腿番茄汤通心粉",
    "image": "assets/food/western-20261113.svg",
    "items": [
      "Stir-fried Carrot and Peas",
      "Corn",
      "Pumpkin Soup"
    ],
    "itemsZh": [
      "胡萝卜炒豌豆",
      "玉米",
      "南瓜浓汤"
    ],
    "allergens": [
      "Gluten",
      "Pork"
    ],
    "nutrition": {
      "cal": "538 kcal",
      "protein": "35.8g",
      "fat": "11.8g",
      "carb": "98.2g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "vegetarian-20261113",
    "day": "Friday",
    "date": "2026/11/13",
    "set": "Vegetarian",
    "title": "Korean Zucchini Pancakes, Braised Tofu & Vegetables",
    "titleZh": "韩式西葫芦蛋饼配韩式豆腐和时蔬",
    "image": "assets/food/vegetarian-20261113.svg",
    "items": [
      "Korean Zucchini Pancakes",
      "Braised Tofu & Vegetables"
    ],
    "itemsZh": [
      "韩式西葫芦蛋饼",
      "韩式豆腐和时蔬"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "262 kcal",
      "protein": "22.1g",
      "fat": "14.3g",
      "carb": "13g"
    },
    "source": "assets/source/menu-20261109.jpg"
  },
  {
    "id": "asian-20261116",
    "day": "Monday",
    "date": "2026/11/16",
    "set": "Asian",
    "title": "Steamed Pork Minced Cake with Yam & Corn",
    "titleZh": "山药玉米蒸肉饼",
    "image": "assets/food/asian-20261116.svg",
    "items": [
      "Water Spinach",
      "Steamed Rice",
      "Arrowroot & Pork Soup"
    ],
    "itemsZh": [
      "清炒通菜",
      "米饭",
      "粉葛煲猪骨汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "599 kcal",
      "protein": "32.6g",
      "fat": "39.2g",
      "carb": "30.7g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "western-20261116",
    "day": "Monday",
    "date": "2026/11/16",
    "set": "Western",
    "title": "Roasted Chicken with Lemon Cheese Sauce",
    "titleZh": "柠檬芝士焗鸡",
    "image": "assets/food/western-20261116.svg",
    "items": [
      "Mixed Vegetables",
      "Pesto Pasta",
      "Corn Cream Soup"
    ],
    "itemsZh": [
      "混合蔬菜",
      "罗勒酱尖通粉",
      "玉米忌廉汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "246 kcal",
      "protein": "24.5g",
      "fat": "7.1g",
      "carb": "22.1g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "vegetarian-20261116",
    "day": "Monday",
    "date": "2026/11/16",
    "set": "Vegetarian",
    "title": "Sautéed Yam, Bell Pepper & Fungus, Scrambled Eggs with Tomatoes, Vegetable Fried Rice",
    "titleZh": "山药木耳炒甜椒，番茄炒滑蛋，蔬菜粒炒饭",
    "image": "assets/food/vegetarian-20261116.svg",
    "items": [
      "Sautéed Yam, Bell Pepper & Fungus",
      "Scrambled Eggs with Tomatoes",
      "Vegetable Fried Rice"
    ],
    "itemsZh": [
      "山药木耳炒甜椒",
      "番茄炒滑蛋",
      "蔬菜粒炒饭"
    ],
    "allergens": [
      "Egg"
    ],
    "nutrition": {
      "cal": "290 kcal",
      "protein": "18.2g",
      "fat": "9.3g",
      "carb": "35g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "asian-20261117",
    "day": "Tuesday",
    "date": "2026/11/17",
    "set": "Asian",
    "title": "Taiwanese Stir-fried Chicken",
    "titleZh": "台式三杯鸡",
    "image": "assets/food/asian-20261117.svg",
    "items": [
      "Stir-fried Choy Sum with Garlic",
      "Steamed Rice",
      "Vegetable & Pork Soup"
    ],
    "itemsZh": [
      "蒜蓉菜心",
      "米饭",
      "霸王花猪肉汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "256 kcal",
      "protein": "25.9g",
      "fat": "8.6g",
      "carb": "26.5g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "western-20261117",
    "day": "Tuesday",
    "date": "2026/11/17",
    "set": "Western",
    "title": "Pan-fried Pork with Garlic Butter",
    "titleZh": "蒜香牛油猪柳粒",
    "image": "assets/food/western-20261117.svg",
    "items": [
      "Carrot & Long Beans",
      "Fried Potatoes with Onion",
      "Minestrone Soup"
    ],
    "itemsZh": [
      "胡萝卜豆角",
      "欧式洋葱土豆",
      "意大利蔬菜汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Pork"
    ],
    "nutrition": {
      "cal": "439 kcal",
      "protein": "21.1g",
      "fat": "30.9g",
      "carb": "21.5g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "vegetarian-20261117",
    "day": "Tuesday",
    "date": "2026/11/17",
    "set": "Vegetarian",
    "title": "Teriyaki Tofu, Udon Noodles, Vegetables",
    "titleZh": "日式金针菇豆腐，清炒包菜，素炒乌冬面",
    "image": "assets/food/vegetarian-20261117.svg",
    "items": [
      "Teriyaki Tofu",
      "Udon Noodles",
      "Vegetables"
    ],
    "itemsZh": [
      "日式金针菇豆腐",
      "素炒乌冬面",
      "清炒包菜"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "398 kcal",
      "protein": "17.4g",
      "fat": "6.1g",
      "carb": "71.4g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "asian-20261118",
    "day": "Wednesday",
    "date": "2026/11/18",
    "set": "Asian",
    "title": "Homemade BBQ Pork in Hong Kong Style",
    "titleZh": "港式叉烧",
    "image": "assets/food/asian-20261118.svg",
    "items": [
      "Leaf Lettuce",
      "Steamed Rice",
      "Apple Soup with Pork"
    ],
    "itemsZh": [
      "油麦菜",
      "米饭",
      "苹果瘦肉汤"
    ],
    "allergens": [
      "Gluten",
      "Pork"
    ],
    "nutrition": {
      "cal": "601 kcal",
      "protein": "31.6g",
      "fat": "39.2g",
      "carb": "31.6g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "western-20261118",
    "day": "Wednesday",
    "date": "2026/11/18",
    "set": "Western",
    "title": "Fried Spaghetti with Black Pepper Beef",
    "titleZh": "黑椒牛肉炒意粉",
    "image": "assets/food/western-20261118.svg",
    "items": [
      "Broccoli",
      "Corn",
      "Mushroom Cream Soup"
    ],
    "itemsZh": [
      "西兰花",
      "玉米粒",
      "奶油蘑菇汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "343 kcal",
      "protein": "15.5g",
      "fat": "6.2g",
      "carb": "62.4g"
    },
    "source": "assets/source/menu-20261116.jpg",
    "note": "Source lists 343 kcal in English and 341 kcal in Chinese; English value shown. 原图中英文热量不一致。"
  },
  {
    "id": "vegetarian-20261118",
    "day": "Wednesday",
    "date": "2026/11/18",
    "set": "Vegetarian",
    "title": "Tomato Cheese Wraps, Broccoli, Fried Egg with Corn",
    "titleZh": "番茄芝士卷饼，清炒西兰花，玉米炒蛋",
    "image": "assets/food/vegetarian-20261118.svg",
    "items": [
      "Tomato Cheese Wraps",
      "Broccoli",
      "Fried Egg with Corn"
    ],
    "itemsZh": [
      "番茄芝士卷饼",
      "清炒西兰花",
      "玉米炒蛋"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "398 kcal",
      "protein": "25.5g",
      "fat": "10.3g",
      "carb": "56.5g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "asian-20261119",
    "day": "Thursday",
    "date": "2026/11/19",
    "set": "Asian",
    "title": "Hainan Chicken Steak",
    "titleZh": "海南鸡扒",
    "image": "assets/food/asian-20261119.svg",
    "items": [
      "Green Pak Choi",
      "Steamed Rice",
      "Coconut Chicken Soup"
    ],
    "itemsZh": [
      "小唐菜",
      "米饭",
      "椰子鸡汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "277 kcal",
      "protein": "23.6g",
      "fat": "7.1g",
      "carb": "30.8g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "western-20261119",
    "day": "Thursday",
    "date": "2026/11/19",
    "set": "Western",
    "title": "Cheese Herb Baked Fish Fillet",
    "titleZh": "巴马臣芝士香草焗鱼柳",
    "image": "assets/food/western-20261119.svg",
    "items": [
      "Sautéed Vegetables",
      "Mixed Beans",
      "Corn & Tomato Soup"
    ],
    "itemsZh": [
      "炒杂菜",
      "杂豆粒",
      "番茄玉米浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Seafood"
    ],
    "nutrition": {
      "cal": "389 kcal",
      "protein": "34.5g",
      "fat": "23.1g",
      "carb": "11.7g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "vegetarian-20261119",
    "day": "Thursday",
    "date": "2026/11/19",
    "set": "Vegetarian",
    "title": "Noodles with Garlic Vinegar Sauce, Marinated Egg, Vegetables",
    "titleZh": "金菇蒜醋拌刀削面，卤蛋，清炒小唐菜",
    "image": "assets/food/vegetarian-20261119.svg",
    "items": [
      "Noodles with Garlic Vinegar Sauce",
      "Marinated Egg",
      "Vegetables"
    ],
    "itemsZh": [
      "金菇蒜醋拌刀削面",
      "卤蛋",
      "清炒小唐菜"
    ],
    "allergens": [
      "Egg",
      "Gluten"
    ],
    "nutrition": {
      "cal": "275 kcal",
      "protein": "17.3g",
      "fat": "9.1g",
      "carb": "31.7g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "asian-20261120",
    "day": "Friday",
    "date": "2026/11/20",
    "set": "Asian",
    "title": "Stewed Beef with Tomato and Egg",
    "titleZh": "番茄滑蛋牛肉",
    "image": "assets/food/asian-20261120.svg",
    "items": [
      "Stir-fried Cabbage",
      "Steamed Rice",
      "Lotus Root & Pork Soup"
    ],
    "itemsZh": [
      "清炒大白菜",
      "米饭",
      "莲藕龙骨汤"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "301 kcal",
      "protein": "26.4g",
      "fat": "15.9g",
      "carb": "27.9g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "western-20261120",
    "day": "Friday",
    "date": "2026/11/20",
    "set": "Western",
    "title": "Corn Sausage Cheese Pizza",
    "titleZh": "玉米番茄芝士披萨",
    "image": "assets/food/western-20261120.svg",
    "items": [
      "Baby Corn & Vegetables",
      "Potato Wedges",
      "Pumpkin Soup"
    ],
    "itemsZh": [
      "玉米笋及时蔬",
      "烤薯角",
      "南瓜浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "495 kcal",
      "protein": "43g",
      "fat": "15g",
      "carb": "49.8g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "vegetarian-20261120",
    "day": "Friday",
    "date": "2026/11/20",
    "set": "Vegetarian",
    "title": "Stir-fried Peas, Fungus, Yam, Taro Fried Rice, Braised Tofu",
    "titleZh": "甜豆木耳山药，芋头菜心粒饭，红烧豆腐",
    "image": "assets/food/vegetarian-20261120.svg",
    "items": [
      "Stir-fried Peas, Fungus, Yam",
      "Taro Fried Rice",
      "Braised Tofu"
    ],
    "itemsZh": [
      "甜豆木耳山药",
      "芋头菜心粒饭",
      "红烧豆腐"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "321 kcal",
      "protein": "15.5g",
      "fat": "7g",
      "carb": "69g"
    },
    "source": "assets/source/menu-20261116.jpg"
  },
  {
    "id": "asian-20261123",
    "day": "Monday",
    "date": "2026/11/23",
    "set": "Asian",
    "title": "Garlic Flavor Pork",
    "titleZh": "蒜香猪柳",
    "image": "assets/food/asian-20261123.svg",
    "items": [
      "Choy Sum",
      "Steamed Rice",
      "Apple Soup with Pork"
    ],
    "itemsZh": [
      "菜心",
      "米饭",
      "苹果瘦肉汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "447 kcal",
      "protein": "18.5g",
      "fat": "30.6g",
      "carb": "29.2g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "western-20261123",
    "day": "Monday",
    "date": "2026/11/23",
    "set": "Western",
    "title": "Chicken in Tomato Cream Sauce",
    "titleZh": "番茄奶油炖鸡",
    "image": "assets/food/western-20261123.svg",
    "items": [
      "Vegetables & Baby Corn",
      "Potato Wedges",
      "Sweet Potato and Tomato Soup"
    ],
    "itemsZh": [
      "时蔬及玉米笋",
      "香烤薯角",
      "甜薯番茄汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "281 kcal",
      "protein": "24.5g",
      "fat": "7.2g",
      "carb": "30.2g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "vegetarian-20261123",
    "day": "Monday",
    "date": "2026/11/23",
    "set": "Vegetarian",
    "title": "Fried Bean Curd in Sweet Sour Sauce, Fried Egg Rice, Carrot and Long Beans",
    "titleZh": "素咕噜肉，蛋炒饭，胡萝卜豆角",
    "image": "assets/food/vegetarian-20261123.svg",
    "items": [
      "Fried Bean Curd in Sweet Sour Sauce",
      "Fried Egg Rice",
      "Carrot and Long Beans"
    ],
    "itemsZh": [
      "素咕噜肉",
      "蛋炒饭",
      "胡萝卜豆角"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "362 kcal",
      "protein": "23g",
      "fat": "14.9g",
      "carb": "35.6g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "asian-20261124",
    "day": "Tuesday",
    "date": "2026/11/24",
    "set": "Asian",
    "title": "Sautéed Beef with Cauliflower",
    "titleZh": "台山菜花炒牛肉",
    "image": "assets/food/asian-20261124.svg",
    "items": [
      "Green Pak Choi",
      "Steamed Rice",
      "Coconut Chicken Soup"
    ],
    "itemsZh": [
      "小唐菜",
      "米饭",
      "椰子鸡汤"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "326 kcal",
      "protein": "26.6g",
      "fat": "9.3g",
      "carb": "36.9g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "western-20261124",
    "day": "Tuesday",
    "date": "2026/11/24",
    "set": "Western",
    "title": "Lasagna Bolognese",
    "titleZh": "肉酱千层面",
    "image": "assets/food/western-20261124.svg",
    "items": [
      "Stir-fried Carrots and Green Beans",
      "Corn",
      "Minestrone Soup"
    ],
    "itemsZh": [
      "炒胡萝卜豆角",
      "玉米",
      "意大利蔬菜汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "511 kcal",
      "protein": "31.9g",
      "fat": "8.8g",
      "carb": "76.3g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "vegetarian-20261124",
    "day": "Tuesday",
    "date": "2026/11/24",
    "set": "Vegetarian",
    "title": "Udon in Tomato Curry Soup, Boiled Egg & Tempura",
    "titleZh": "番茄咖喱汤乌冬，水煮蛋和天妇罗",
    "image": "assets/food/vegetarian-20261124.svg",
    "items": [
      "Udon in Tomato Curry Soup",
      "Boiled Egg",
      "Tempura"
    ],
    "itemsZh": [
      "番茄咖喱汤乌冬",
      "水煮蛋",
      "天妇罗"
    ],
    "allergens": [
      "Gluten",
      "Egg"
    ],
    "nutrition": {
      "cal": "283 kcal",
      "protein": "16.9g",
      "fat": "8.7g",
      "carb": "33.4g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "asian-20261125",
    "day": "Wednesday",
    "date": "2026/11/25",
    "set": "Asian",
    "title": "Marinated Mince Pork with Egg",
    "titleZh": "台式卤肉饭配卤鸡蛋",
    "image": "assets/food/asian-20261125.svg",
    "items": [
      "Chinese Cabbage",
      "Steamed Rice"
    ],
    "itemsZh": [
      "大白菜",
      "米饭"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "459 kcal",
      "protein": "19.2g",
      "fat": "30.4g",
      "carb": "27g"
    },
    "source": "assets/source/menu-20261123.jpg",
    "note": "No soup is listed in the source. 原图未列汤品。"
  },
  {
    "id": "western-20261125",
    "day": "Wednesday",
    "date": "2026/11/25",
    "set": "Western",
    "title": "Hot Dog",
    "titleZh": "热狗包",
    "image": "assets/food/western-20261125.svg",
    "items": [
      "Mixed Vegetables",
      "French Fries"
    ],
    "itemsZh": [
      "混合蔬菜",
      "薯条"
    ],
    "allergens": [
      "Gluten",
      "Dairy",
      "Egg"
    ],
    "nutrition": {
      "cal": "632 kcal",
      "protein": "24.3g",
      "fat": "37.7g",
      "carb": "75g"
    },
    "source": "assets/source/menu-20261123.jpg",
    "note": "No soup is listed in the source. 原图未列汤品。"
  },
  {
    "id": "vegetarian-20261125",
    "day": "Wednesday",
    "date": "2026/11/25",
    "set": "Vegetarian",
    "title": "Thai Style Fried Eggplant, Water Spinach, Samosa & Roasted Corn",
    "titleZh": "泰式素肉碎茄子，豆酱通菜，咖喱角配泰式烤玉米饼",
    "image": "assets/food/vegetarian-20261125.svg",
    "items": [
      "Thai Style Fried Eggplant",
      "Water Spinach",
      "Samosa & Roasted Corn"
    ],
    "itemsZh": [
      "泰式素肉碎茄子",
      "豆酱通菜",
      "咖喱角配泰式烤玉米饼"
    ],
    "allergens": [
      "Gluten"
    ],
    "nutrition": {
      "cal": "318 kcal",
      "protein": "27.1g",
      "fat": "10.5g",
      "carb": "79.9g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "festival-20261126",
    "day": "Thursday",
    "date": "2026/11/26",
    "set": "Festival",
    "title": "Thanksgiving Menu — Roasted Turkey",
    "titleZh": "感恩节菜单 — 传统烤火鸡",
    "image": "assets/food/festival-20261126.svg",
    "items": [
      "Sausage Platter",
      "Mixed Vegetables",
      "Roasted Potato",
      "Butter Corn",
      "Pumpkin Soup"
    ],
    "itemsZh": [
      "香肠拼盘",
      "杂菜拼盘",
      "香草烤土豆",
      "黄油烤玉米",
      "南瓜浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "493 kcal",
      "protein": "43.2g",
      "fat": "17.6g",
      "carb": "55.8g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "vegetarian-20261126",
    "day": "Thursday",
    "date": "2026/11/26",
    "set": "Vegetarian",
    "title": "Garlic Pasta, Plain Nuggets & Vegetables",
    "titleZh": "蒜香意面，素鸡块，时蔬",
    "image": "assets/food/vegetarian-20261126.svg",
    "items": [
      "Garlic Pasta",
      "Plain Nuggets",
      "Vegetables"
    ],
    "itemsZh": [
      "蒜香意面",
      "素鸡块",
      "时蔬"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "453 kcal",
      "protein": "28.4g",
      "fat": "12.6g",
      "carb": "80g"
    },
    "source": "assets/source/menu-20261123.jpg"
  },
  {
    "id": "asian-20261130",
    "day": "Monday",
    "date": "2026/11/30",
    "set": "Asian",
    "title": "Sweet and Sour Pork with Pineapple",
    "titleZh": "菠萝咕噜肉",
    "image": "assets/food/asian-20261130.svg",
    "items": [
      "Choy Sum",
      "Steamed Rice",
      "Apple Soup with Pork"
    ],
    "itemsZh": [
      "菜心",
      "米饭",
      "苹果瘦肉汤"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Pork"
    ],
    "nutrition": {
      "cal": "599 kcal",
      "protein": "37.6g",
      "fat": "39.2g",
      "carb": "30.7g"
    },
    "source": "assets/source/menu-20261130.jpg"
  },
  {
    "id": "western-20261130",
    "day": "Monday",
    "date": "2026/11/30",
    "set": "Western",
    "title": "BBQ Chicken",
    "titleZh": "BBQ烤鸡腿",
    "image": "assets/food/western-20261130.svg",
    "items": [
      "Zucchini & Carrot",
      "Roasted Potato",
      "Pumpkin Soup"
    ],
    "itemsZh": [
      "胡萝卜西葫芦",
      "迷迭香烤土豆",
      "南瓜浓汤"
    ],
    "allergens": [
      "Gluten",
      "Dairy"
    ],
    "nutrition": {
      "cal": "334 kcal",
      "protein": "23.4g",
      "fat": "12.1g",
      "carb": "35.2g"
    },
    "source": "assets/source/menu-20261130.jpg"
  },
  {
    "id": "vegetarian-20261130",
    "day": "Monday",
    "date": "2026/11/30",
    "set": "Vegetarian",
    "title": "Mini Frittata & Cheese Toast, Vegetables",
    "titleZh": "迷你意式烘鸡蛋，芝士烤吐司，时蔬",
    "image": "assets/food/vegetarian-20261130.svg",
    "items": [
      "Mini Frittata",
      "Cheese Toast",
      "Vegetables"
    ],
    "itemsZh": [
      "迷你意式烘鸡蛋",
      "芝士烤吐司",
      "时蔬"
    ],
    "allergens": [
      "Gluten",
      "Egg",
      "Dairy"
    ],
    "nutrition": {
      "cal": "401 kcal",
      "protein": "24.9g",
      "fat": "11.9g",
      "carb": "65.2g"
    },
    "source": "assets/source/menu-20261130.jpg"
  }
];
