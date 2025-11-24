"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandFightOpponentsNotFoundPacket = exports.CommandFightNotEnoughEnergyPacketRes = exports.CommandFightPacketReq = exports.CommandFightRefusePacketRes = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandFightRefusePacketRes = class CommandFightRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandFightRefusePacketRes = CommandFightRefusePacketRes;
exports.CommandFightRefusePacketRes = CommandFightRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandFightRefusePacketRes);
let CommandFightPacketReq = class CommandFightPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandFightPacketReq = CommandFightPacketReq;
exports.CommandFightPacketReq = CommandFightPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandFightPacketReq);
let CommandFightNotEnoughEnergyPacketRes = class CommandFightNotEnoughEnergyPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandFightNotEnoughEnergyPacketRes = CommandFightNotEnoughEnergyPacketRes;
exports.CommandFightNotEnoughEnergyPacketRes = CommandFightNotEnoughEnergyPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandFightNotEnoughEnergyPacketRes);
let CommandFightOpponentsNotFoundPacket = class CommandFightOpponentsNotFoundPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandFightOpponentsNotFoundPacket = CommandFightOpponentsNotFoundPacket;
exports.CommandFightOpponentsNotFoundPacket = CommandFightOpponentsNotFoundPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandFightOpponentsNotFoundPacket);
//# sourceMappingURL=CommandFightPacket.js.map