"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandTopGuildsEmptyPacket = exports.CommandTopPlayersEmptyPacket = exports.CommandTopInvalidPagePacket = exports.CommandTopPacketResGuild = exports.CommandTopPacketResGlory = exports.CommandTopPacketResScore = exports.CommandTopPacketRes = exports.CommandTopPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandTopPacketReq = class CommandTopPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandTopPacketReq = CommandTopPacketReq;
exports.CommandTopPacketReq = CommandTopPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandTopPacketReq);
let CommandTopPacketRes = class CommandTopPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandTopPacketRes = CommandTopPacketRes;
exports.CommandTopPacketRes = CommandTopPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], CommandTopPacketRes);
let CommandTopPacketResScore = class CommandTopPacketResScore extends CommandTopPacketRes {
};
exports.CommandTopPacketResScore = CommandTopPacketResScore;
exports.CommandTopPacketResScore = CommandTopPacketResScore = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopPacketResScore);
let CommandTopPacketResGlory = class CommandTopPacketResGlory extends CommandTopPacketRes {
};
exports.CommandTopPacketResGlory = CommandTopPacketResGlory;
exports.CommandTopPacketResGlory = CommandTopPacketResGlory = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopPacketResGlory);
let CommandTopPacketResGuild = class CommandTopPacketResGuild extends CommandTopPacketRes {
};
exports.CommandTopPacketResGuild = CommandTopPacketResGuild;
exports.CommandTopPacketResGuild = CommandTopPacketResGuild = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopPacketResGuild);
let CommandTopInvalidPagePacket = class CommandTopInvalidPagePacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandTopInvalidPagePacket = CommandTopInvalidPagePacket;
exports.CommandTopInvalidPagePacket = CommandTopInvalidPagePacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopInvalidPagePacket);
let CommandTopPlayersEmptyPacket = class CommandTopPlayersEmptyPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandTopPlayersEmptyPacket = CommandTopPlayersEmptyPacket;
exports.CommandTopPlayersEmptyPacket = CommandTopPlayersEmptyPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopPlayersEmptyPacket);
let CommandTopGuildsEmptyPacket = class CommandTopGuildsEmptyPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandTopGuildsEmptyPacket = CommandTopGuildsEmptyPacket;
exports.CommandTopGuildsEmptyPacket = CommandTopGuildsEmptyPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandTopGuildsEmptyPacket);
//# sourceMappingURL=CommandTopPacket.js.map