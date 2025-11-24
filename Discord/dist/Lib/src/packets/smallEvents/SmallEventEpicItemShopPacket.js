"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventEpicItemShopCannotBuyPacket = exports.SmallEventEpicItemShopRefusePacket = exports.SmallEventEpicItemShopAcceptPacket = void 0;
const SmallEventAnyShopPacket_1 = require("./SmallEventAnyShopPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
let SmallEventEpicItemShopAcceptPacket = class SmallEventEpicItemShopAcceptPacket extends SmallEventAnyShopPacket_1.SmallEventAnyShopAcceptedPacket {
};
exports.SmallEventEpicItemShopAcceptPacket = SmallEventEpicItemShopAcceptPacket;
exports.SmallEventEpicItemShopAcceptPacket = SmallEventEpicItemShopAcceptPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventEpicItemShopAcceptPacket);
let SmallEventEpicItemShopRefusePacket = class SmallEventEpicItemShopRefusePacket extends SmallEventAnyShopPacket_1.SmallEventAnyShopRefusedPacket {
};
exports.SmallEventEpicItemShopRefusePacket = SmallEventEpicItemShopRefusePacket;
exports.SmallEventEpicItemShopRefusePacket = SmallEventEpicItemShopRefusePacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventEpicItemShopRefusePacket);
let SmallEventEpicItemShopCannotBuyPacket = class SmallEventEpicItemShopCannotBuyPacket extends SmallEventAnyShopPacket_1.SmallEventAnyShopCannotBuyPacket {
};
exports.SmallEventEpicItemShopCannotBuyPacket = SmallEventEpicItemShopCannotBuyPacket;
exports.SmallEventEpicItemShopCannotBuyPacket = SmallEventEpicItemShopCannotBuyPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventEpicItemShopCannotBuyPacket);
//# sourceMappingURL=SmallEventEpicItemShopPacket.js.map