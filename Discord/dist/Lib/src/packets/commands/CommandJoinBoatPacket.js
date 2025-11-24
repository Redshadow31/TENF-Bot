"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandJoinBoatNotEnoughGemsPacketRes = exports.CommandJoinBoatNotEnoughEnergyPacketRes = exports.CommandJoinBoatNoMemberOnBoatPacketRes = exports.CommandJoinBoatTooManyRunsPacketRes = exports.CommandJoinBoatNoGuildPacketRes = exports.CommandJoinBoatRefusePacketRes = exports.CommandJoinBoatAcceptPacketRes = exports.CommandJoinBoatPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandJoinBoatPacketReq = class CommandJoinBoatPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatPacketReq = CommandJoinBoatPacketReq;
exports.CommandJoinBoatPacketReq = CommandJoinBoatPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandJoinBoatPacketReq);
let CommandJoinBoatAcceptPacketRes = class CommandJoinBoatAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatAcceptPacketRes = CommandJoinBoatAcceptPacketRes;
exports.CommandJoinBoatAcceptPacketRes = CommandJoinBoatAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatAcceptPacketRes);
let CommandJoinBoatRefusePacketRes = class CommandJoinBoatRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatRefusePacketRes = CommandJoinBoatRefusePacketRes;
exports.CommandJoinBoatRefusePacketRes = CommandJoinBoatRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatRefusePacketRes);
let CommandJoinBoatNoGuildPacketRes = class CommandJoinBoatNoGuildPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatNoGuildPacketRes = CommandJoinBoatNoGuildPacketRes;
exports.CommandJoinBoatNoGuildPacketRes = CommandJoinBoatNoGuildPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatNoGuildPacketRes);
let CommandJoinBoatTooManyRunsPacketRes = class CommandJoinBoatTooManyRunsPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatTooManyRunsPacketRes = CommandJoinBoatTooManyRunsPacketRes;
exports.CommandJoinBoatTooManyRunsPacketRes = CommandJoinBoatTooManyRunsPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatTooManyRunsPacketRes);
let CommandJoinBoatNoMemberOnBoatPacketRes = class CommandJoinBoatNoMemberOnBoatPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatNoMemberOnBoatPacketRes = CommandJoinBoatNoMemberOnBoatPacketRes;
exports.CommandJoinBoatNoMemberOnBoatPacketRes = CommandJoinBoatNoMemberOnBoatPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatNoMemberOnBoatPacketRes);
let CommandJoinBoatNotEnoughEnergyPacketRes = class CommandJoinBoatNotEnoughEnergyPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatNotEnoughEnergyPacketRes = CommandJoinBoatNotEnoughEnergyPacketRes;
exports.CommandJoinBoatNotEnoughEnergyPacketRes = CommandJoinBoatNotEnoughEnergyPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatNotEnoughEnergyPacketRes);
let CommandJoinBoatNotEnoughGemsPacketRes = class CommandJoinBoatNotEnoughGemsPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandJoinBoatNotEnoughGemsPacketRes = CommandJoinBoatNotEnoughGemsPacketRes;
exports.CommandJoinBoatNotEnoughGemsPacketRes = CommandJoinBoatNotEnoughGemsPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandJoinBoatNotEnoughGemsPacketRes);
//# sourceMappingURL=CommandJoinBoatPacket.js.map