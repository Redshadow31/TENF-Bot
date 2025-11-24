"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMissionPlayerNotFoundPacket = exports.CommandMissionsPacketRes = exports.CommandMissionsPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandMissionsPacketReq = class CommandMissionsPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionsPacketReq = CommandMissionsPacketReq;
exports.CommandMissionsPacketReq = CommandMissionsPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandMissionsPacketReq);
let CommandMissionsPacketRes = class CommandMissionsPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionsPacketRes = CommandMissionsPacketRes;
exports.CommandMissionsPacketRes = CommandMissionsPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionsPacketRes);
let CommandMissionPlayerNotFoundPacket = class CommandMissionPlayerNotFoundPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionPlayerNotFoundPacket = CommandMissionPlayerNotFoundPacket;
exports.CommandMissionPlayerNotFoundPacket = CommandMissionPlayerNotFoundPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionPlayerNotFoundPacket);
//# sourceMappingURL=CommandMissionsPacket.js.map