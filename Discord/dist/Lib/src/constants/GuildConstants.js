"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildConstants = void 0;
class GuildConstants {
}
exports.GuildConstants = GuildConstants;
GuildConstants.DEFAULT_VALUES = {
    SCORE: 0,
    LEVEL: 0,
    EXPERIENCE: 0,
    COMMON_FOOD: 0,
    HERBIVOROUS_FOOD: 0,
    CARNIVOROUS_FOOD: 0,
    ULTIMATE_FOOD: 0
};
GuildConstants.XP_CALCULATION_STEP = 5000;
GuildConstants.XP_DIVIDER = {
    MIN: 20,
    MAX: 20 / 9
};
GuildConstants.REQUIRED_LEVEL = 10;
GuildConstants.MAX_GUILD_MEMBERS = 6;
GuildConstants.GUILD_NAME_LENGTH_RANGE = {
    MIN: 2,
    MAX: 15
};
GuildConstants.DESCRIPTION_LENGTH_RANGE = {
    MIN: 2,
    MAX: 140
};
GuildConstants.MAX_LEVEL = 150;
GuildConstants.MAX_COMMON_PET_FOOD = 25;
GuildConstants.MAX_HERBIVOROUS_PET_FOOD = 15;
GuildConstants.MAX_CARNIVOROUS_PET_FOOD = 15;
GuildConstants.MAX_ULTIMATE_PET_FOOD = 5;
GuildConstants.MAX_PET_FOOD = [
    25,
    15,
    15,
    5
];
GuildConstants.PERMISSION_LEVEL = {
    MEMBER: 1,
    ELDER: 2,
    CHIEF: 3
};
GuildConstants.GOLDEN_GUILD_LEVEL = 100;
GuildConstants.SUPER_BADGE_MAX_RANK = 25;
//# sourceMappingURL=GuildConstants.js.map