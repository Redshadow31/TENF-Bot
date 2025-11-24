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
const CommandMissionShopPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandMissionShopPacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const MissionShop_1 = require("../../../../commands/mission/MissionShop");
class MissionShopCommandPacketHandlers {
    missionShopAlreadyBoughtPointsThisWeek(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:missionsshop.error.alreadyBoughtPointsThisWeek");
        });
    }
    missionShopPetInformation(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, MissionShop_1.handleLovePointsValueShopItem)(packet, context);
        });
    }
    missionShopSkipMissionResult(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, MissionShop_1.skipMissionShopResult)(packet, context);
        });
    }
    missionShopMoney(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, MissionShop_1.handleMissionShopMoney)(packet, context);
        });
    }
    missionShopKingsFavor(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, MissionShop_1.handleMissionShopKingsFavor)(context);
        });
    }
    missionShopBadge(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, MissionShop_1.handleMissionShopBadge)(context);
        });
    }
    missionShopNoMissionToSkip(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:missionsshop.error.noMissionToSkip");
        });
    }
    missionShopAlreadyHadBadge(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:missionsshop.error.alreadyHadBadge");
        });
    }
    missionShopNoPet(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:missionsshop.error.noPet");
        });
    }
}
exports.default = MissionShopCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopAlreadyBoughtPointsThisWeek),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopAlreadyBoughtPointsThisWeek]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopAlreadyBoughtPointsThisWeek", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopPetInformation),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopPetInformation]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopPetInformation", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopSkipMissionResult),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopSkipMissionResult]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopSkipMissionResult", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopMoney),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopMoney]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopMoney", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopKingsFavor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopKingsFavor]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopKingsFavor", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopBadge),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopBadge]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopBadge", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopNoMissionToSkip),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopNoMissionToSkip]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopNoMissionToSkip", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopAlreadyHadBadge),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopAlreadyHadBadge]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopAlreadyHadBadge", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandMissionShopPacket_1.CommandMissionShopNoPet),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandMissionShopPacket_1.CommandMissionShopNoPet]),
    __metadata("design:returntype", Promise)
], MissionShopCommandPacketHandlers.prototype, "missionShopNoPet", null);
//# sourceMappingURL=MissionShopCommandPacketHandlers.js.map