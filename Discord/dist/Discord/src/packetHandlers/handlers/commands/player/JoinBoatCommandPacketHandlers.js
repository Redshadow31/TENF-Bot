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
const CommandJoinBoatPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandJoinBoatPacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const DiscordCache_1 = require("../../../../bot/DiscordCache");
const i18n_1 = require("../../../../translations/i18n");
const JoinBoatCommand_1 = require("../../../../commands/player/JoinBoatCommand");
class JoinBoatCommandPacketHandlers {
    joinBoatNoGuild(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:joinBoat.errorMessage.noGuild");
        });
    }
    joinBoatTooManyRuns(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("commands:joinBoat.errorMessage.tooManyBoatThisWeek", { lng: interaction.userLanguage }));
        });
    }
    joinBoatNoMemberOnBoat(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("commands:joinBoat.errorMessage.noMemberOnBoat", { lng: interaction.userLanguage }));
        });
    }
    joinBoatNotEnoughEnergy(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("commands:joinBoat.errorMessage.notEnoughEnergy", { lng: interaction.userLanguage }));
        });
    }
    joinBoatNotEnoughGems(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:joinBoat.errorMessage.notEnoughGems");
        });
    }
    joinBoatAcceptRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, JoinBoatCommand_1.handleCommandJoinBoatAcceptPacketRes)(packet, context);
        });
    }
    joinBoatRefuseRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, JoinBoatCommand_1.handleCommandJoinBoatRefusePacketRes)(packet, context);
        });
    }
}
exports.default = JoinBoatCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatNoGuildPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatNoGuildPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatNoGuild", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatTooManyRunsPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatTooManyRunsPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatTooManyRuns", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatNoMemberOnBoatPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatNoMemberOnBoatPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatNoMemberOnBoat", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatNotEnoughEnergyPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatNotEnoughEnergyPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatNotEnoughEnergy", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatNotEnoughGemsPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatNotEnoughGemsPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatNotEnoughGems", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatAcceptPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatAcceptPacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatAcceptRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandJoinBoatPacket_1.CommandJoinBoatRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandJoinBoatPacket_1.CommandJoinBoatRefusePacketRes]),
    __metadata("design:returntype", Promise)
], JoinBoatCommandPacketHandlers.prototype, "joinBoatRefuseRes", null);
//# sourceMappingURL=JoinBoatCommandPacketHandlers.js.map