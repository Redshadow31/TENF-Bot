"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopItemTypeToString = exports.ShopItemType = exports.NumberChangeReason = void 0;
var NumberChangeReason;
(function (NumberChangeReason) {
    NumberChangeReason[NumberChangeReason["NULL"] = 0] = "NULL";
    NumberChangeReason[NumberChangeReason["IGNORE"] = 1] = "IGNORE";
    NumberChangeReason[NumberChangeReason["TEST"] = 2] = "TEST";
    NumberChangeReason[NumberChangeReason["ADMIN"] = 3] = "ADMIN";
    NumberChangeReason[NumberChangeReason["DEBUG"] = 4] = "DEBUG";
    NumberChangeReason[NumberChangeReason["BIG_EVENT"] = 5] = "BIG_EVENT";
    NumberChangeReason[NumberChangeReason["SMALL_EVENT"] = 6] = "SMALL_EVENT";
    NumberChangeReason[NumberChangeReason["RECEIVE_COIN"] = 7] = "RECEIVE_COIN";
    NumberChangeReason[NumberChangeReason["PET_SELL"] = 8] = "PET_SELL";
    NumberChangeReason[NumberChangeReason["PET_FEED"] = 9] = "PET_FEED";
    NumberChangeReason[NumberChangeReason["PET_FREE"] = 10] = "PET_FREE";
    NumberChangeReason[NumberChangeReason["MISSION_FINISHED"] = 11] = "MISSION_FINISHED";
    NumberChangeReason[NumberChangeReason["MISSION_SHOP"] = 12] = "MISSION_SHOP";
    NumberChangeReason[NumberChangeReason["GUILD_DAILY"] = 13] = "GUILD_DAILY";
    NumberChangeReason[NumberChangeReason["GUILD_CREATE"] = 14] = "GUILD_CREATE";
    NumberChangeReason[NumberChangeReason["ITEM_SELL"] = 15] = "ITEM_SELL";
    NumberChangeReason[NumberChangeReason["DAILY"] = 16] = "DAILY";
    NumberChangeReason[NumberChangeReason["DRINK"] = 17] = "DRINK";
    NumberChangeReason[NumberChangeReason["SHOP"] = 18] = "SHOP";
    NumberChangeReason[NumberChangeReason["CLASS"] = 19] = "CLASS";
    NumberChangeReason[NumberChangeReason["UNLOCK"] = 20] = "UNLOCK";
    NumberChangeReason[NumberChangeReason["LEVEL_UP"] = 21] = "LEVEL_UP";
    NumberChangeReason[NumberChangeReason["RESPAWN"] = 22] = "RESPAWN";
    NumberChangeReason[NumberChangeReason["NEW_PLAYER"] = 23] = "NEW_PLAYER";
    NumberChangeReason[NumberChangeReason["FIGHT"] = 24] = "FIGHT";
    NumberChangeReason[NumberChangeReason["LEAGUE_REWARD"] = 25] = "LEAGUE_REWARD";
    NumberChangeReason[NumberChangeReason["PVE_ISLAND"] = 26] = "PVE_ISLAND";
    NumberChangeReason[NumberChangeReason["PVE_FIGHT"] = 27] = "PVE_FIGHT";
    NumberChangeReason[NumberChangeReason["FIGHT_PET_SMALL_EVENT"] = 28] = "FIGHT_PET_SMALL_EVENT";
    NumberChangeReason[NumberChangeReason["RAGE_EXPLOSION_ACTION"] = 29] = "RAGE_EXPLOSION_ACTION";
    NumberChangeReason[NumberChangeReason["JOIN_BOAT"] = 30] = "JOIN_BOAT";
})(NumberChangeReason || (exports.NumberChangeReason = NumberChangeReason = {}));
var ShopItemType;
(function (ShopItemType) {
    ShopItemType[ShopItemType["DAILY_POTION"] = 0] = "DAILY_POTION";
    ShopItemType[ShopItemType["RANDOM_ITEM"] = 1] = "RANDOM_ITEM";
    ShopItemType[ShopItemType["ALTERATION_HEAL"] = 2] = "ALTERATION_HEAL";
    ShopItemType[ShopItemType["FULL_REGEN"] = 3] = "FULL_REGEN";
    ShopItemType[ShopItemType["SLOT_EXTENSION"] = 4] = "SLOT_EXTENSION";
    ShopItemType[ShopItemType["MONEY_MOUTH_BADGE"] = 5] = "MONEY_MOUTH_BADGE";
    ShopItemType[ShopItemType["COMMON_FOOD"] = 6] = "COMMON_FOOD";
    ShopItemType[ShopItemType["HERBIVOROUS_FOOD"] = 7] = "HERBIVOROUS_FOOD";
    ShopItemType[ShopItemType["CARNIVOROUS_FOOD"] = 8] = "CARNIVOROUS_FOOD";
    ShopItemType[ShopItemType["ULTIMATE_FOOD"] = 9] = "ULTIMATE_FOOD";
    ShopItemType[ShopItemType["MONEY"] = 10] = "MONEY";
    ShopItemType[ShopItemType["TREASURE"] = 11] = "TREASURE";
    ShopItemType[ShopItemType["KINGS_FAVOR"] = 12] = "KINGS_FAVOR";
    ShopItemType[ShopItemType["SKIP_MISSION"] = 13] = "SKIP_MISSION";
    ShopItemType[ShopItemType["LOVE_POINTS_VALUE"] = 14] = "LOVE_POINTS_VALUE";
    ShopItemType[ShopItemType["SMALL_GUILD_XP"] = 15] = "SMALL_GUILD_XP";
    ShopItemType[ShopItemType["ENERGY_HEAL"] = 16] = "ENERGY_HEAL";
    ShopItemType[ShopItemType["BIG_GUILD_XP"] = 17] = "BIG_GUILD_XP";
    ShopItemType[ShopItemType["QUEST_MASTER_BADGE"] = 18] = "QUEST_MASTER_BADGE";
})(ShopItemType || (exports.ShopItemType = ShopItemType = {}));
exports.ShopItemTypeToString = {
    [ShopItemType.DAILY_POTION]: "dailyPotion",
    [ShopItemType.RANDOM_ITEM]: "randomItem",
    [ShopItemType.ALTERATION_HEAL]: "alterationHeal",
    [ShopItemType.FULL_REGEN]: "fullRegen",
    [ShopItemType.SLOT_EXTENSION]: "slotExtension",
    [ShopItemType.MONEY_MOUTH_BADGE]: "moneyMouthBadge",
    [ShopItemType.COMMON_FOOD]: "commonFood",
    [ShopItemType.HERBIVOROUS_FOOD]: "herbivorousFood",
    [ShopItemType.CARNIVOROUS_FOOD]: "carnivorousFood",
    [ShopItemType.ULTIMATE_FOOD]: "ultimateFood",
    [ShopItemType.MONEY]: "money",
    [ShopItemType.TREASURE]: "treasure",
    [ShopItemType.KINGS_FAVOR]: "kingsFavor",
    [ShopItemType.SKIP_MISSION]: "skipMission",
    [ShopItemType.LOVE_POINTS_VALUE]: "lovePointsValue",
    [ShopItemType.SMALL_GUILD_XP]: "smallGuildXp",
    [ShopItemType.ENERGY_HEAL]: "energyHeal",
    [ShopItemType.BIG_GUILD_XP]: "bigGuildXp",
    [ShopItemType.QUEST_MASTER_BADGE]: "questMasterBadge"
};
//# sourceMappingURL=LogsConstants.js.map