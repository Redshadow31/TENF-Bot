"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomUtils = void 0;
const random_js_1 = require("random-js");
class RandomUtils {
}
exports.RandomUtils = RandomUtils;
RandomUtils.draftbotRandom = new random_js_1.Random();
RandomUtils.randInt = (min, max) => RandomUtils.draftbotRandom.integer(min, max - 1);
RandomUtils.rangedInt = (range, minAdd = 0, maxAdd = 0) => RandomUtils.draftbotRandom.integer(range.MIN + minAdd, range.MAX + maxAdd);
RandomUtils.variationInt = (variation) => RandomUtils.draftbotRandom.integer(-variation, variation);
RandomUtils.enumPick = (anEnum) => {
    const enumValues = Object.keys(anEnum)
        .map(n => Number.parseInt(n, 10))
        .filter(n => !Number.isNaN(n));
    const randomIndex = RandomUtils.randInt(0, enumValues.length);
    return enumValues[randomIndex];
};
//# sourceMappingURL=RandomUtils.js.map