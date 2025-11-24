"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildShopGiveXp = exports.CommandGuildShopEmpty = exports.CommandGuildShopNoFoodStorageSpace = exports.CommandGuildShopPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildShopPacketReq = class CommandGuildShopPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShopPacketReq = CommandGuildShopPacketReq;
exports.CommandGuildShopPacketReq = CommandGuildShopPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildShopPacketReq);
let CommandGuildShopNoFoodStorageSpace = class CommandGuildShopNoFoodStorageSpace extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShopNoFoodStorageSpace = CommandGuildShopNoFoodStorageSpace;
exports.CommandGuildShopNoFoodStorageSpace = CommandGuildShopNoFoodStorageSpace = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildShopNoFoodStorageSpace);
let CommandGuildShopEmpty = class CommandGuildShopEmpty extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShopEmpty = CommandGuildShopEmpty;
exports.CommandGuildShopEmpty = CommandGuildShopEmpty = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildShopEmpty);
let CommandGuildShopGiveXp = class CommandGuildShopGiveXp extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShopGiveXp = CommandGuildShopGiveXp;
exports.CommandGuildShopGiveXp = CommandGuildShopGiveXp = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildShopGiveXp);
//# sourceMappingURL=CommandGuildShopPacket.js.map