"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildDailyPveIslandErrorPacket = exports.CommandGuildDailyCooldownErrorPacket = exports.CommandGuildDailyRewardPacket = exports.CommandGuildDailyPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildDailyPacketReq = class CommandGuildDailyPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDailyPacketReq = CommandGuildDailyPacketReq;
exports.CommandGuildDailyPacketReq = CommandGuildDailyPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildDailyPacketReq);
let CommandGuildDailyRewardPacket = class CommandGuildDailyRewardPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDailyRewardPacket = CommandGuildDailyRewardPacket;
exports.CommandGuildDailyRewardPacket = CommandGuildDailyRewardPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDailyRewardPacket);
let CommandGuildDailyCooldownErrorPacket = class CommandGuildDailyCooldownErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDailyCooldownErrorPacket = CommandGuildDailyCooldownErrorPacket;
exports.CommandGuildDailyCooldownErrorPacket = CommandGuildDailyCooldownErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDailyCooldownErrorPacket);
let CommandGuildDailyPveIslandErrorPacket = class CommandGuildDailyPveIslandErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDailyPveIslandErrorPacket = CommandGuildDailyPveIslandErrorPacket;
exports.CommandGuildDailyPveIslandErrorPacket = CommandGuildDailyPveIslandErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDailyPveIslandErrorPacket);
//# sourceMappingURL=CommandGuildDailyPacket.js.map