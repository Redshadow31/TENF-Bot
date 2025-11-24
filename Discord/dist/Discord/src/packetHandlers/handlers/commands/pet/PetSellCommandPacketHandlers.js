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
const CommandPetSellPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandPetSellPacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const PetSellCommand_1 = require("../../../../commands/pet/PetSellCommand");
class PetSellCommandPacketHandlers {
    handleNoPetError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.noPet");
        });
    }
    handleNotInGuildError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.noGuild");
        });
    }
    handleFeistyError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.isFeisty");
        });
    }
    handleBadPrice(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.badPrice", {
                minPrice: packet.minPrice,
                maxPrice: packet.maxPrice
            });
        });
    }
    handleOnlyOwnerCanCancelError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.onlyInitiatorCanCancel");
        });
    }
    handleCancel(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.canceled");
        });
    }
    handleCantBuyOwnPetError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.cantSellToYourself");
        });
    }
    handleSameGuildError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.sameGuild");
        });
    }
    handleAlreadyHavePetError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.alreadyHavePet");
        });
    }
    handleNotEnoughMoneyError(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.notEnoughMoney", {
                missingMoney: packet.missingMoney
            });
        });
    }
    handleInitiatorSituationChangedError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.initiatorSituationChanged");
        });
    }
    handleSuccess(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, PetSellCommand_1.handlePetSellSuccess)(context, packet);
        });
    }
    handleNoOneAvailableError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:petSell.noOneAvailable");
        });
    }
}
exports.default = PetSellCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellNoPetErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellNoPetErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleNoPetError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellNotInGuildErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellNotInGuildErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleNotInGuildError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellFeistyErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellFeistyErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleFeistyError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellBadPriceErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellBadPriceErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleBadPrice", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellOnlyOwnerCanCancelErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellOnlyOwnerCanCancelErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleOnlyOwnerCanCancelError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellCancelPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellCancelPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleCancel", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellCantSellToYourselfErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellCantSellToYourselfErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleCantBuyOwnPetError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellSameGuildError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellSameGuildError]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleSameGuildError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellAlreadyHavePetError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellAlreadyHavePetError]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleAlreadyHavePetError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellNotEnoughMoneyError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellNotEnoughMoneyError]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleNotEnoughMoneyError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellInitiatorSituationChangedErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellInitiatorSituationChangedErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleInitiatorSituationChangedError", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellSuccessPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellSuccessPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleSuccess", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPetSellPacket_1.CommandPetSellNoOneAvailableErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPetSellPacket_1.CommandPetSellNoOneAvailableErrorPacket]),
    __metadata("design:returntype", Promise)
], PetSellCommandPacketHandlers.prototype, "handleNoOneAvailableError", null);
//# sourceMappingURL=PetSellCommandPacketHandlers.js.map