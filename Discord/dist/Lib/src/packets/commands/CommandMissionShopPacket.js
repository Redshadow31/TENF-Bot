"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandMissionShopNoPet = exports.CommandMissionShopAlreadyHadBadge = exports.CommandMissionShopNoMissionToSkip = exports.CommandMissionShopBadge = exports.CommandMissionShopSkipMissionResult = exports.CommandMissionShopPetInformation = exports.CommandMissionShopKingsFavor = exports.CommandMissionShopMoney = exports.CommandMissionShopAlreadyBoughtPointsThisWeek = exports.CommandMissionShopPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandMissionShopPacketReq = class CommandMissionShopPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopPacketReq = CommandMissionShopPacketReq;
exports.CommandMissionShopPacketReq = CommandMissionShopPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandMissionShopPacketReq);
let CommandMissionShopAlreadyBoughtPointsThisWeek = class CommandMissionShopAlreadyBoughtPointsThisWeek extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopAlreadyBoughtPointsThisWeek = CommandMissionShopAlreadyBoughtPointsThisWeek;
exports.CommandMissionShopAlreadyBoughtPointsThisWeek = CommandMissionShopAlreadyBoughtPointsThisWeek = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopAlreadyBoughtPointsThisWeek);
let CommandMissionShopMoney = class CommandMissionShopMoney extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopMoney = CommandMissionShopMoney;
exports.CommandMissionShopMoney = CommandMissionShopMoney = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopMoney);
let CommandMissionShopKingsFavor = class CommandMissionShopKingsFavor extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopKingsFavor = CommandMissionShopKingsFavor;
exports.CommandMissionShopKingsFavor = CommandMissionShopKingsFavor = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopKingsFavor);
let CommandMissionShopPetInformation = class CommandMissionShopPetInformation extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopPetInformation = CommandMissionShopPetInformation;
exports.CommandMissionShopPetInformation = CommandMissionShopPetInformation = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopPetInformation);
let CommandMissionShopSkipMissionResult = class CommandMissionShopSkipMissionResult extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopSkipMissionResult = CommandMissionShopSkipMissionResult;
exports.CommandMissionShopSkipMissionResult = CommandMissionShopSkipMissionResult = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopSkipMissionResult);
let CommandMissionShopBadge = class CommandMissionShopBadge extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopBadge = CommandMissionShopBadge;
exports.CommandMissionShopBadge = CommandMissionShopBadge = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopBadge);
let CommandMissionShopNoMissionToSkip = class CommandMissionShopNoMissionToSkip extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopNoMissionToSkip = CommandMissionShopNoMissionToSkip;
exports.CommandMissionShopNoMissionToSkip = CommandMissionShopNoMissionToSkip = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopNoMissionToSkip);
let CommandMissionShopAlreadyHadBadge = class CommandMissionShopAlreadyHadBadge extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopAlreadyHadBadge = CommandMissionShopAlreadyHadBadge;
exports.CommandMissionShopAlreadyHadBadge = CommandMissionShopAlreadyHadBadge = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopAlreadyHadBadge);
let CommandMissionShopNoPet = class CommandMissionShopNoPet extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandMissionShopNoPet = CommandMissionShopNoPet;
exports.CommandMissionShopNoPet = CommandMissionShopNoPet = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandMissionShopNoPet);
//# sourceMappingURL=CommandMissionShopPacket.js.map