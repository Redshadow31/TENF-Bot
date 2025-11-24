"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetNickPacketRes = exports.CommandPetNickPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandPetNickPacketReq = class CommandPetNickPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetNickPacketReq = CommandPetNickPacketReq;
exports.CommandPetNickPacketReq = CommandPetNickPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetNickPacketReq);
let CommandPetNickPacketRes = class CommandPetNickPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetNickPacketRes = CommandPetNickPacketRes;
exports.CommandPetNickPacketRes = CommandPetNickPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetNickPacketRes);
//# sourceMappingURL=CommandPetNickPacket.js.map