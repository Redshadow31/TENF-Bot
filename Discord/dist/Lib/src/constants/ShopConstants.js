"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopCurrency = exports.ShopConstants = void 0;
class ShopConstants {
}
exports.ShopConstants = ShopConstants;
ShopConstants.RANDOM_ITEM_PRICE = 350;
ShopConstants.ALTERATION_HEAL_BASE_PRICE = 425;
ShopConstants.MAX_REDUCTION_TIME = 90;
ShopConstants.MIN_REDUCTION_TIME = 15;
ShopConstants.MAX_PRICE_REDUCTION_DIVISOR = 5;
ShopConstants.MAX_DAILY_POTION_BUYOUTS = 5;
ShopConstants.FULL_REGEN_PRICE = 3000;
ShopConstants.MONEY_MOUTH_BADGE_PRICE = 25000;
ShopConstants.DAILY_POTION_DISCOUNT_MULTIPLIER = 0.7;
var ShopCurrency;
(function (ShopCurrency) {
    ShopCurrency["MONEY"] = "money";
    ShopCurrency["GEM"] = "gem";
})(ShopCurrency || (exports.ShopCurrency = ShopCurrency = {}));
//# sourceMappingURL=ShopConstants.js.map