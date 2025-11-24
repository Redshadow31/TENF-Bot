"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopItemTypeToId = shopItemTypeToId;
exports.shopItemTypeFromId = shopItemTypeFromId;
const LogsConstants_1 = require("../constants/LogsConstants");
function shopItemTypeToId(shopItemType) {
    return LogsConstants_1.ShopItemTypeToString[shopItemType];
}
function shopItemTypeFromId(id) {
    return parseInt(Object.keys(LogsConstants_1.ShopItemTypeToString).find(key => LogsConstants_1.ShopItemTypeToString[key] === id), 10);
}
//# sourceMappingURL=ShopUtils.js.map