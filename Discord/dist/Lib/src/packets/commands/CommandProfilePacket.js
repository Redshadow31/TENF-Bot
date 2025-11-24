"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandProfilePacketRes = exports.CommandProfilePlayerNotFound = exports.CommandProfilePacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandProfilePacketReq = class CommandProfilePacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandProfilePacketReq = CommandProfilePacketReq;
exports.CommandProfilePacketReq = CommandProfilePacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandProfilePacketReq);
let CommandProfilePlayerNotFound = class CommandProfilePlayerNotFound extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandProfilePlayerNotFound = CommandProfilePlayerNotFound;
exports.CommandProfilePlayerNotFound = CommandProfilePlayerNotFound = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandProfilePlayerNotFound);
let CommandProfilePacketRes = class CommandProfilePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandProfilePacketRes = CommandProfilePacketRes;
exports.CommandProfilePacketRes = CommandProfilePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandProfilePacketRes);
//# sourceMappingURL=CommandProfilePacket.js.map