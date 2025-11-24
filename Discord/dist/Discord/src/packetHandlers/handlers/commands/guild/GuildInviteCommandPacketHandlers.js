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
const CommandGuildInvitePacket_1 = require("../../../../../../Lib/src/packets/commands/CommandGuildInvitePacket");
const GuildInviteCommand_1 = require("../../../../commands/guild/GuildInviteCommand");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
class GuildInviteCommandPacketHandlers {
    guildInviteInvitedPlayerIsDead(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "error:effects.dead.other");
        });
    }
    guildInviteInvitingPlayerNotInGuild(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "error:notInAGuild");
        });
    }
    guildInviteLevelTooLow(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "error:targetLevelTooLow");
        });
    }
    guildInviteGuildIsFull(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "commands:guildInvite.errors.guildIsFull");
        });
    }
    guildInviteInvitedPlayerIsOnPveIsland(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "commands:guildInvite.errors.playerIsOnPveIsland");
        });
    }
    guildInviteAlreadyInAGuild(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteError)(packet, context, "commands:guildInvite.errors.playerIsAlreadyInAGuild");
        });
    }
    guildInviteRefuseRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteRefusePacketRes)(packet, context);
        });
    }
    guildInviteAcceptRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildInviteCommand_1.handleCommandGuildInviteAcceptPacketRes)(packet, context);
        });
    }
    guildInvitePlayerNotFound(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:playerDoesntExist", {}, { ephemeral: true });
        });
    }
}
exports.default = GuildInviteCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteInvitedPlayerIsDead),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteInvitedPlayerIsDead]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteInvitedPlayerIsDead", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteInvitingPlayerNotInGuild),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteInvitingPlayerNotInGuild]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteInvitingPlayerNotInGuild", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteLevelTooLow),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteLevelTooLow]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteLevelTooLow", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteGuildIsFull),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteGuildIsFull]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteGuildIsFull", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteInvitedPlayerIsOnPveIsland),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteInvitedPlayerIsOnPveIsland]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteInvitedPlayerIsOnPveIsland", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteAlreadyInAGuild),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteAlreadyInAGuild]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteAlreadyInAGuild", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteRefusePacketRes]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteRefuseRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInviteAcceptPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInviteAcceptPacketRes]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInviteAcceptRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildInvitePacket_1.CommandGuildInvitePlayerNotFound),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildInvitePacket_1.CommandGuildInvitePlayerNotFound]),
    __metadata("design:returntype", Promise)
], GuildInviteCommandPacketHandlers.prototype, "guildInvitePlayerNotFound", null);
//# sourceMappingURL=GuildInviteCommandPacketHandlers.js.map