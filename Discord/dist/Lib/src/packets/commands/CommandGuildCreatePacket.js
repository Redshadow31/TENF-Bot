"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildCreateAcceptPacketRes = exports.CommandGuildCreateRefusePacketRes = exports.CommandGuildCreatePacketRes = exports.CommandGuildCreatePacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildCreatePacketReq = class CommandGuildCreatePacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildCreatePacketReq = CommandGuildCreatePacketReq;
exports.CommandGuildCreatePacketReq = CommandGuildCreatePacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildCreatePacketReq);
let CommandGuildCreatePacketRes = class CommandGuildCreatePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildCreatePacketRes = CommandGuildCreatePacketRes;
exports.CommandGuildCreatePacketRes = CommandGuildCreatePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildCreatePacketRes);
let CommandGuildCreateRefusePacketRes = class CommandGuildCreateRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildCreateRefusePacketRes = CommandGuildCreateRefusePacketRes;
exports.CommandGuildCreateRefusePacketRes = CommandGuildCreateRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildCreateRefusePacketRes);
let CommandGuildCreateAcceptPacketRes = class CommandGuildCreateAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildCreateAcceptPacketRes = CommandGuildCreateAcceptPacketRes;
exports.CommandGuildCreateAcceptPacketRes = CommandGuildCreateAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildCreateAcceptPacketRes);
//# sourceMappingURL=CommandGuildCreatePacket.js.map