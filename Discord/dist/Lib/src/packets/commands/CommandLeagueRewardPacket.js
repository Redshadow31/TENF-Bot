"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLeagueRewardSuccessPacketRes = exports.CommandLeagueRewardAlreadyClaimedPacketRes = exports.CommandLeagueRewardNoPointsPacketRes = exports.CommandLeagueRewardNotSundayPacketRes = exports.CommandLeagueRewardPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandLeagueRewardPacketReq = class CommandLeagueRewardPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandLeagueRewardPacketReq = CommandLeagueRewardPacketReq;
exports.CommandLeagueRewardPacketReq = CommandLeagueRewardPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandLeagueRewardPacketReq);
let CommandLeagueRewardNotSundayPacketRes = class CommandLeagueRewardNotSundayPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandLeagueRewardNotSundayPacketRes = CommandLeagueRewardNotSundayPacketRes;
exports.CommandLeagueRewardNotSundayPacketRes = CommandLeagueRewardNotSundayPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandLeagueRewardNotSundayPacketRes);
let CommandLeagueRewardNoPointsPacketRes = class CommandLeagueRewardNoPointsPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandLeagueRewardNoPointsPacketRes = CommandLeagueRewardNoPointsPacketRes;
exports.CommandLeagueRewardNoPointsPacketRes = CommandLeagueRewardNoPointsPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandLeagueRewardNoPointsPacketRes);
let CommandLeagueRewardAlreadyClaimedPacketRes = class CommandLeagueRewardAlreadyClaimedPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandLeagueRewardAlreadyClaimedPacketRes = CommandLeagueRewardAlreadyClaimedPacketRes;
exports.CommandLeagueRewardAlreadyClaimedPacketRes = CommandLeagueRewardAlreadyClaimedPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandLeagueRewardAlreadyClaimedPacketRes);
let CommandLeagueRewardSuccessPacketRes = class CommandLeagueRewardSuccessPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandLeagueRewardSuccessPacketRes = CommandLeagueRewardSuccessPacketRes;
exports.CommandLeagueRewardSuccessPacketRes = CommandLeagueRewardSuccessPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandLeagueRewardSuccessPacketRes);
//# sourceMappingURL=CommandLeagueRewardPacket.js.map