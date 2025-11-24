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
const CommandDailyBonusPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandDailyBonusPacket");
const DailyBonusCommand_1 = require("../../../../commands/player/DailyBonusCommand");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
class DailyBonusCommandPacketHandlers {
    dailyBonusRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DailyBonusCommand_1.handleDailyBonusRes)(context, packet);
        });
    }
    dailyBonusObjectDoNothing(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:daily.errors.objectDoNothingError");
        });
    }
    dailyBonusObjectIsActiveDuringFights(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:daily.errors.objectIsActiveDuringFights");
        });
    }
    dailyBonusNoActiveObject(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:daily.errors.noActiveObject");
        });
    }
    dailyBonusInCooldown(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, DailyBonusCommand_1.handleDailyBonusCooldownError)(context, packet.lastDailyTimestamp, packet.timeBetweenDailies);
        });
    }
}
exports.default = DailyBonusCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandDailyBonusPacket_1.CommandDailyBonusPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandDailyBonusPacket_1.CommandDailyBonusPacketRes]),
    __metadata("design:returntype", Promise)
], DailyBonusCommandPacketHandlers.prototype, "dailyBonusRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandDailyBonusPacket_1.CommandDailyBonusObjectDoNothing),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandDailyBonusPacket_1.CommandDailyBonusObjectDoNothing]),
    __metadata("design:returntype", Promise)
], DailyBonusCommandPacketHandlers.prototype, "dailyBonusObjectDoNothing", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandDailyBonusPacket_1.CommandDailyBonusObjectIsActiveDuringFights),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandDailyBonusPacket_1.CommandDailyBonusObjectIsActiveDuringFights]),
    __metadata("design:returntype", Promise)
], DailyBonusCommandPacketHandlers.prototype, "dailyBonusObjectIsActiveDuringFights", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandDailyBonusPacket_1.CommandDailyBonusNoActiveObject),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandDailyBonusPacket_1.CommandDailyBonusNoActiveObject]),
    __metadata("design:returntype", Promise)
], DailyBonusCommandPacketHandlers.prototype, "dailyBonusNoActiveObject", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandDailyBonusPacket_1.CommandDailyBonusInCooldown),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandDailyBonusPacket_1.CommandDailyBonusInCooldown]),
    __metadata("design:returntype", Promise)
], DailyBonusCommandPacketHandlers.prototype, "dailyBonusInCooldown", null);
//# sourceMappingURL=DailyBonusCommandPacketHandlers.js.map