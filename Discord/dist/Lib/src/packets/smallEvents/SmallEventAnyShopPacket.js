"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventAnyShopCannotBuyPacket = exports.SmallEventAnyShopRefusedPacket = exports.SmallEventAnyShopAcceptedPacket = void 0;
const SmallEventPacket_1 = require("./SmallEventPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
let SmallEventAnyShopAcceptedPacket = class SmallEventAnyShopAcceptedPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventAnyShopAcceptedPacket = SmallEventAnyShopAcceptedPacket;
exports.SmallEventAnyShopAcceptedPacket = SmallEventAnyShopAcceptedPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], SmallEventAnyShopAcceptedPacket);
let SmallEventAnyShopRefusedPacket = class SmallEventAnyShopRefusedPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventAnyShopRefusedPacket = SmallEventAnyShopRefusedPacket;
exports.SmallEventAnyShopRefusedPacket = SmallEventAnyShopRefusedPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], SmallEventAnyShopRefusedPacket);
let SmallEventAnyShopCannotBuyPacket = class SmallEventAnyShopCannotBuyPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventAnyShopCannotBuyPacket = SmallEventAnyShopCannotBuyPacket;
exports.SmallEventAnyShopCannotBuyPacket = SmallEventAnyShopCannotBuyPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], SmallEventAnyShopCannotBuyPacket);
//# sourceMappingURL=SmallEventAnyShopPacket.js.map