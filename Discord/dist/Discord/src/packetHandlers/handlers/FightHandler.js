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
const PacketHandler_1 = require("../PacketHandler");
const CommandFightPacket_1 = require("../../../../Lib/src/packets/commands/CommandFightPacket");
const FightCommand_1 = require("../../commands/player/FightCommand");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const FightIntroductionPacket_1 = require("../../../../Lib/src/packets/fights/FightIntroductionPacket");
const FightStatusPacket_1 = require("../../../../Lib/src/packets/fights/FightStatusPacket");
const FightHistoryItemPacket_1 = require("../../../../Lib/src/packets/fights/FightHistoryItemPacket");
const AIFightActionChoosePacket_1 = require("../../../../Lib/src/packets/fights/AIFightActionChoosePacket");
const EndOfFightPacket_1 = require("../../../../Lib/src/packets/fights/EndOfFightPacket");
const BuggedFightPacket_1 = require("../../../../Lib/src/packets/fights/BuggedFightPacket");
const FightRewardPacket_1 = require("../../../../Lib/src/packets/fights/FightRewardPacket");
class FightHandler {
    refuseFight(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleCommandFightRefusePacketRes)(context);
        });
    }
    opponentsNotFoundFight(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:fight.opponentsNotFound");
        });
    }
    notEnoughEnergy(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:fight.notEnoughEnergy");
        });
    }
    introduceFighters(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleCommandFightIntroduceFightersRes)(context, packet);
        });
    }
    updateFightStatus(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleCommandFightUpdateStatusRes)(context, packet);
        });
    }
    addHistoryItem(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleCommandFightHistoryItemRes)(context, packet);
        });
    }
    aiFightActionChoose(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleCommandFightAIFightActionChoose)(context, packet);
        });
    }
    endOfFight(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleEndOfFight)(context, packet);
        });
    }
    buggedFight(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:fightBugged");
        });
    }
    fightReward(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, FightCommand_1.handleFightReward)(context, packet);
        });
    }
}
exports.default = FightHandler;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandFightPacket_1.CommandFightRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandFightPacket_1.CommandFightRefusePacketRes]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "refuseFight", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandFightPacket_1.CommandFightOpponentsNotFoundPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandFightPacket_1.CommandFightOpponentsNotFoundPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "opponentsNotFoundFight", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandFightPacket_1.CommandFightNotEnoughEnergyPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandFightPacket_1.CommandFightNotEnoughEnergyPacketRes]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "notEnoughEnergy", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(FightIntroductionPacket_1.CommandFightIntroduceFightersPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FightIntroductionPacket_1.CommandFightIntroduceFightersPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "introduceFighters", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(FightStatusPacket_1.CommandFightStatusPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FightStatusPacket_1.CommandFightStatusPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "updateFightStatus", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(FightHistoryItemPacket_1.CommandFightHistoryItemPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FightHistoryItemPacket_1.CommandFightHistoryItemPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "addHistoryItem", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(AIFightActionChoosePacket_1.AIFightActionChoosePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AIFightActionChoosePacket_1.AIFightActionChoosePacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "aiFightActionChoose", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(EndOfFightPacket_1.CommandFightEndOfFightPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, EndOfFightPacket_1.CommandFightEndOfFightPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "endOfFight", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(BuggedFightPacket_1.BuggedFightPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BuggedFightPacket_1.BuggedFightPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "buggedFight", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(FightRewardPacket_1.FightRewardPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, FightRewardPacket_1.FightRewardPacket]),
    __metadata("design:returntype", Promise)
], FightHandler.prototype, "fightReward", null);
//# sourceMappingURL=FightHandler.js.map