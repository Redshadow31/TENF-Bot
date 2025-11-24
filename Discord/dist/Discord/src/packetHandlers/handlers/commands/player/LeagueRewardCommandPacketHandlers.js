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
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const CommandLeagueRewardPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandLeagueRewardPacket");
const TimeUtils_1 = require("../../../../../../Lib/src/utils/TimeUtils");
const LeagueRewardCommand_1 = require("../../../../commands/player/LeagueRewardCommand");
class RespawnCommandPacketHandlers {
    leagueRewardNotSundayError(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:leagueReward.errors.notSunday", {
                nextSunday: (0, TimeUtils_1.printTimeBeforeDate)(packet.nextSunday)
            });
        });
    }
    leagueRewardNoPointsError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:leagueReward.errors.noPoints");
        });
    }
    leagueRewardAlreadyClaimedError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:leagueReward.errors.alreadyClaimed");
        });
    }
    leagueRewardSuccess(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, LeagueRewardCommand_1.handleCommandLeagueRewardSuccessPacket)(packet, context);
        });
    }
}
exports.default = RespawnCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandLeagueRewardPacket_1.CommandLeagueRewardNotSundayPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandLeagueRewardPacket_1.CommandLeagueRewardNotSundayPacketRes]),
    __metadata("design:returntype", Promise)
], RespawnCommandPacketHandlers.prototype, "leagueRewardNotSundayError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandLeagueRewardPacket_1.CommandLeagueRewardNoPointsPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandLeagueRewardPacket_1.CommandLeagueRewardNoPointsPacketRes]),
    __metadata("design:returntype", Promise)
], RespawnCommandPacketHandlers.prototype, "leagueRewardNoPointsError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandLeagueRewardPacket_1.CommandLeagueRewardAlreadyClaimedPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandLeagueRewardPacket_1.CommandLeagueRewardAlreadyClaimedPacketRes]),
    __metadata("design:returntype", Promise)
], RespawnCommandPacketHandlers.prototype, "leagueRewardAlreadyClaimedError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandLeagueRewardPacket_1.CommandLeagueRewardSuccessPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandLeagueRewardPacket_1.CommandLeagueRewardSuccessPacketRes]),
    __metadata("design:returntype", Promise)
], RespawnCommandPacketHandlers.prototype, "leagueRewardSuccess", null);
//# sourceMappingURL=LeagueRewardCommandPacketHandlers.js.map