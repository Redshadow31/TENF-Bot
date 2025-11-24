"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemNature = exports.ItemRarity = exports.ItemCategory = exports.ItemConstants = void 0;
exports.itemCategoryToString = itemCategoryToString;
class ItemConstants {
}
exports.ItemConstants = ItemConstants;
ItemConstants.SLOTS = {
    LIMITS: [
        2,
        2,
        4,
        4
    ],
    PRICES: [
        500,
        1000,
        2500,
        7000,
        12000,
        17000,
        25000,
        30000
    ]
};
ItemConstants.RARITY = {
    BASIC: 0,
    COMMON: 1,
    UNCOMMON: 2,
    EXOTIC: 3,
    RARE: 4,
    SPECIAL: 5,
    EPIC: 6,
    LEGENDARY: 7,
    MYTHICAL: 8,
    VALUES: [
        0,
        20,
        40,
        100,
        250,
        580,
        1690,
        5000,
        10000
    ],
    GENERATOR: {
        VALUES: [
            4375,
            6875,
            8375,
            9375,
            9875,
            9975,
            9998,
            10000
        ],
        MAX_VALUE: 10000
    }
};
ItemConstants.TAGS = {
    HOLY: "holy"
};
ItemConstants.NATURE_ID_TO_NAME = [
    "none",
    "health",
    "speed",
    "attack",
    "defense",
    "time",
    "money",
    "energy"
];
var ItemCategory;
(function (ItemCategory) {
    ItemCategory[ItemCategory["WEAPON"] = 0] = "WEAPON";
    ItemCategory[ItemCategory["ARMOR"] = 1] = "ARMOR";
    ItemCategory[ItemCategory["POTION"] = 2] = "POTION";
    ItemCategory[ItemCategory["OBJECT"] = 3] = "OBJECT";
})(ItemCategory || (exports.ItemCategory = ItemCategory = {}));
function itemCategoryToString(category) {
    switch (category) {
        case ItemCategory.WEAPON:
            return "weapons";
        case ItemCategory.ARMOR:
            return "armors";
        case ItemCategory.POTION:
            return "potions";
        default:
            return "objects";
    }
}
var ItemRarity;
(function (ItemRarity) {
    ItemRarity[ItemRarity["BASIC"] = 0] = "BASIC";
    ItemRarity[ItemRarity["COMMON"] = 1] = "COMMON";
    ItemRarity[ItemRarity["UNCOMMON"] = 2] = "UNCOMMON";
    ItemRarity[ItemRarity["EXOTIC"] = 3] = "EXOTIC";
    ItemRarity[ItemRarity["RARE"] = 4] = "RARE";
    ItemRarity[ItemRarity["SPECIAL"] = 5] = "SPECIAL";
    ItemRarity[ItemRarity["EPIC"] = 6] = "EPIC";
    ItemRarity[ItemRarity["LEGENDARY"] = 7] = "LEGENDARY";
    ItemRarity[ItemRarity["MYTHICAL"] = 8] = "MYTHICAL";
})(ItemRarity || (exports.ItemRarity = ItemRarity = {}));
var ItemNature;
(function (ItemNature) {
    ItemNature[ItemNature["NONE"] = 0] = "NONE";
    ItemNature[ItemNature["HEALTH"] = 1] = "HEALTH";
    ItemNature[ItemNature["SPEED"] = 2] = "SPEED";
    ItemNature[ItemNature["ATTACK"] = 3] = "ATTACK";
    ItemNature[ItemNature["DEFENSE"] = 4] = "DEFENSE";
    ItemNature[ItemNature["TIME_SPEEDUP"] = 5] = "TIME_SPEEDUP";
    ItemNature[ItemNature["MONEY"] = 6] = "MONEY";
    ItemNature[ItemNature["ENERGY"] = 7] = "ENERGY";
})(ItemNature || (exports.ItemNature = ItemNature = {}));
//# sourceMappingURL=ItemConstants.js.map