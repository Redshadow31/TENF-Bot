"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandRespawnErrorAlreadyAlive = exports.CommandRespawnPacketRes = exports.CommandRespawnPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandRespawnPacketReq = class CommandRespawnPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandRespawnPacketReq = CommandRespawnPacketReq;
exports.CommandRespawnPacketReq = CommandRespawnPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandRespawnPacketReq);
let CommandRespawnPacketRes = class CommandRespawnPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandRespawnPacketRes = CommandRespawnPacketRes;
exports.CommandRespawnPacketRes = CommandRespawnPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandRespawnPacketRes);
let CommandRespawnErrorAlreadyAlive = class CommandRespawnErrorAlreadyAlive extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandRespawnErrorAlreadyAlive = CommandRespawnErrorAlreadyAlive;
exports.CommandRespawnErrorAlreadyAlive = CommandRespawnErrorAlreadyAlive = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandRespawnErrorAlreadyAlive);
//# sourceMappingURL=CommandRespawnPacket.js.map