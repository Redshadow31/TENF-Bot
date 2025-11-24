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
const CommandPetTransferPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandPetTransferPacket");
const KeycloakUtils_1 = require("../../../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../../../bot/DraftBotShard");
const PetTransferCommand_1 = require("../../../../commands/pet/PetTransferCommand");
const StringUtils_1 = require("../../../../utils/StringUtils");
class PetTransferCommandPacketHandlers {
    anotherPlayerTransferring(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.keycloakId);
            if (getUser.isError) {
                return;
            }
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petTransfer.anotherPlayerTransferring", {
                playerName: (0, StringUtils_1.escapeUsername)(getUser.payload.user.attributes.gameUsername[0]),
                lng: context.discord.language
            });
        });
    }
    cancelError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petTransfer.transferCancelled");
        });
    }
    situationChanged(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petTransfer.situationChanged");
        });
    }
    noPetError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petTransfer.noPet");
        });
    }
    transferSuccess(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, PetTransferCommand_1.handlePetTransferSuccess)(context, packet);
        });
    }
    feistyError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petTransfer.feistyError");
        });
    }
}
exports.default = PetTransferCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferAnotherMemberTransferringErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferAnotherMemberTransferringErrorPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "anotherPlayerTransferring", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferCancelErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferCancelErrorPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "cancelError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferSituationChangedErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferSituationChangedErrorPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "situationChanged", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferNoPetErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferNoPetErrorPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "noPetError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferSuccessPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferSuccessPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "transferSuccess", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetTransferPacket_1.CommandPetTransferFeistyErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetTransferPacket_1.CommandPetTransferFeistyErrorPacket]),
    __metadata("design:returntype", Promise)
], PetTransferCommandPacketHandlers.prototype, "feistyError", null);
//# sourceMappingURL=PetTransferCommandPacketHandlers.js.map