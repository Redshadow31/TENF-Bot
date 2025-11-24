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
const CommandPetFeedPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandPetFeedPacket");
const DisplayUtils_1 = require("../../../../utils/DisplayUtils");
const PetFeedCommand_1 = require("../../../../commands/pet/PetFeedCommand");
class PetFeedCommandPacketHandlers {
    noPet(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petFeed.noPet");
        });
    }
    noMoney(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petFeed.noMoney");
        });
    }
    notHungry(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petFeed.notHungry", {
                pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(packet.pet, context.discord.language)
            });
        });
    }
    guildStorageEmpty(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petFeed.guildStorageEmpty");
        });
    }
    cancel(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petFeed.cancelled");
        });
    }
    success(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, PetFeedCommand_1.handleCommandPetFeedSuccessPacket)(packet, context);
        });
    }
}
exports.default = PetFeedCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedNoPetErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedNoPetErrorPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "noPet", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedNoMoneyFeedErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedNoMoneyFeedErrorPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "noMoney", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedNotHungryErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedNotHungryErrorPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "notHungry", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedGuildStorageEmptyErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedGuildStorageEmptyErrorPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "guildStorageEmpty", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedCancelErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedCancelErrorPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "cancel", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetFeedPacket_1.CommandPetFeedSuccessPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetFeedPacket_1.CommandPetFeedSuccessPacket]),
    __metadata("design:returntype", Promise)
], PetFeedCommandPacketHandlers.prototype, "success", null);
//# sourceMappingURL=PetFeedPacketHandlers.js.map