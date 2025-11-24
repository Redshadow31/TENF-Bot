"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildShelterNoPetErrorPacket = exports.CommandGuildShelterPacketRes = exports.CommandGuildShelterPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildShelterPacketReq = class CommandGuildShelterPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShelterPacketReq = CommandGuildShelterPacketReq;
exports.CommandGuildShelterPacketReq = CommandGuildShelterPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildShelterPacketReq);
let CommandGuildShelterPacketRes = class CommandGuildShelterPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShelterPacketRes = CommandGuildShelterPacketRes;
exports.CommandGuildShelterPacketRes = CommandGuildShelterPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildShelterPacketRes);
let CommandGuildShelterNoPetErrorPacket = class CommandGuildShelterNoPetErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildShelterNoPetErrorPacket = CommandGuildShelterNoPetErrorPacket;
exports.CommandGuildShelterNoPetErrorPacket = CommandGuildShelterNoPetErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildShelterNoPetErrorPacket);
//# sourceMappingURL=CommandGuildShelterPacket.js.map