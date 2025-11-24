"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PacketHandler_1 = require("../../../PacketHandler");
const CommandGuildDailyPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandGuildDailyPacket");
const GuildDailyCommand_1 = require("../../../../commands/guild/GuildDailyCommand");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const TimeUtils_1 = require("../../../../../../Lib/src/utils/TimeUtils");
class GuildDailyCommandPacketHandlers {
    guildDailyReward(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildDailyCommand_1.handleCommandGuildDailyRewardPacket)(packet, context, true);
        });
    }
    guildDailyCooldownError(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:guildDaily.coolDown", {
                coolDownTime: packet.totalTime,
                time: (0, TimeUtils_1.finishInTimeDisplay)(new Date(Date.now() + packet.remainingTime))
            });
        });
    }
    guildDailyPveIslandError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:guildDaily.pveIslandError");
        });
    }
}
exports.default = GuildDailyCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDailyPacket_1.CommandGuildDailyRewardPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDailyPacket_1.CommandGuildDailyRewardPacket]),
    __metadata("design:returntype", Promise)
], GuildDailyCommandPacketHandlers.prototype, "guildDailyReward", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDailyPacket_1.CommandGuildDailyCooldownErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDailyPacket_1.CommandGuildDailyCooldownErrorPacket]),
    __metadata("design:returntype", Promise)
], GuildDailyCommandPacketHandlers.prototype, "guildDailyCooldownError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDailyPacket_1.CommandGuildDailyPveIslandErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDailyPacket_1.CommandGuildDailyPveIslandErrorPacket]),
    __metadata("design:returntype", Promise)
], GuildDailyCommandPacketHandlers.prototype, "guildDailyPveIslandError", null);
//# sourceMappingURL=GuildDailyCommandPacketHandlers.js.map