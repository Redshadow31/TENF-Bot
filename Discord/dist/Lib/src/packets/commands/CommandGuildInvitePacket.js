"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildInviteRefusePacketRes = exports.CommandGuildInviteAcceptPacketRes = exports.CommandGuildInviteAlreadyInAGuild = exports.CommandGuildInviteInvitedPlayerIsOnPveIsland = exports.CommandGuildInviteInvitedPlayerIsDead = exports.CommandGuildInviteGuildIsFull = exports.CommandGuildInviteLevelTooLow = exports.CommandGuildInviteInvitingPlayerNotInGuild = exports.CommandGuildInvitePlayerNotFound = exports.CommandGuildInviteErrorPacket = exports.CommandGuildInvitePacketReq = void 0;
const DraftBotPacket_js_1 = require("../DraftBotPacket.js");
let CommandGuildInvitePacketReq = class CommandGuildInvitePacketReq extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandGuildInvitePacketReq = CommandGuildInvitePacketReq;
exports.CommandGuildInvitePacketReq = CommandGuildInvitePacketReq = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildInvitePacketReq);
let CommandGuildInviteErrorPacket = class CommandGuildInviteErrorPacket extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandGuildInviteErrorPacket = CommandGuildInviteErrorPacket;
exports.CommandGuildInviteErrorPacket = CommandGuildInviteErrorPacket = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.NONE)
], CommandGuildInviteErrorPacket);
let CommandGuildInvitePlayerNotFound = class CommandGuildInvitePlayerNotFound extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandGuildInvitePlayerNotFound = CommandGuildInvitePlayerNotFound;
exports.CommandGuildInvitePlayerNotFound = CommandGuildInvitePlayerNotFound = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInvitePlayerNotFound);
let CommandGuildInviteInvitingPlayerNotInGuild = class CommandGuildInviteInvitingPlayerNotInGuild extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteInvitingPlayerNotInGuild = CommandGuildInviteInvitingPlayerNotInGuild;
exports.CommandGuildInviteInvitingPlayerNotInGuild = CommandGuildInviteInvitingPlayerNotInGuild = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteInvitingPlayerNotInGuild);
let CommandGuildInviteLevelTooLow = class CommandGuildInviteLevelTooLow extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteLevelTooLow = CommandGuildInviteLevelTooLow;
exports.CommandGuildInviteLevelTooLow = CommandGuildInviteLevelTooLow = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteLevelTooLow);
let CommandGuildInviteGuildIsFull = class CommandGuildInviteGuildIsFull extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteGuildIsFull = CommandGuildInviteGuildIsFull;
exports.CommandGuildInviteGuildIsFull = CommandGuildInviteGuildIsFull = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteGuildIsFull);
let CommandGuildInviteInvitedPlayerIsDead = class CommandGuildInviteInvitedPlayerIsDead extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteInvitedPlayerIsDead = CommandGuildInviteInvitedPlayerIsDead;
exports.CommandGuildInviteInvitedPlayerIsDead = CommandGuildInviteInvitedPlayerIsDead = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteInvitedPlayerIsDead);
let CommandGuildInviteInvitedPlayerIsOnPveIsland = class CommandGuildInviteInvitedPlayerIsOnPveIsland extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteInvitedPlayerIsOnPveIsland = CommandGuildInviteInvitedPlayerIsOnPveIsland;
exports.CommandGuildInviteInvitedPlayerIsOnPveIsland = CommandGuildInviteInvitedPlayerIsOnPveIsland = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteInvitedPlayerIsOnPveIsland);
let CommandGuildInviteAlreadyInAGuild = class CommandGuildInviteAlreadyInAGuild extends CommandGuildInviteErrorPacket {
};
exports.CommandGuildInviteAlreadyInAGuild = CommandGuildInviteAlreadyInAGuild;
exports.CommandGuildInviteAlreadyInAGuild = CommandGuildInviteAlreadyInAGuild = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteAlreadyInAGuild);
let CommandGuildInviteAcceptPacketRes = class CommandGuildInviteAcceptPacketRes extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandGuildInviteAcceptPacketRes = CommandGuildInviteAcceptPacketRes;
exports.CommandGuildInviteAcceptPacketRes = CommandGuildInviteAcceptPacketRes = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteAcceptPacketRes);
let CommandGuildInviteRefusePacketRes = class CommandGuildInviteRefusePacketRes extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandGuildInviteRefusePacketRes = CommandGuildInviteRefusePacketRes;
exports.CommandGuildInviteRefusePacketRes = CommandGuildInviteRefusePacketRes = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildInviteRefusePacketRes);
//# sourceMappingURL=CommandGuildInvitePacket.js.map