"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetPetNotFound = exports.CommandPetPacketRes = exports.CommandPetPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandPetPacketReq = class CommandPetPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetPacketReq = CommandPetPacketReq;
exports.CommandPetPacketReq = CommandPetPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetPacketReq);
let CommandPetPacketRes = class CommandPetPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetPacketRes = CommandPetPacketRes;
exports.CommandPetPacketRes = CommandPetPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetPacketRes);
let CommandPetPetNotFound = class CommandPetPetNotFound extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetPetNotFound = CommandPetPetNotFound;
exports.CommandPetPetNotFound = CommandPetPetNotFound = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetPetNotFound);
//# sourceMappingURL=CommandPetPacket.js.map