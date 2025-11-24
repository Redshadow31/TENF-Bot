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
const CommandUnlockPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandUnlockPacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const UnlockCommand_1 = require("../../../../commands/player/UnlockCommand");
class UnlockCommandPacketHandlers {
    unlockHimself(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:unlock.himself");
        });
    }
    unlockNotInJail(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:unlock.notInJail");
        });
    }
    unlockNoPlayerFound(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:playerDoesntExist", {}, { ephemeral: true });
        });
    }
    unlockNotEnoughMoney(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, UnlockCommand_1.handleCommandUnlockNotEnoughMoneyError)(packet, context);
        });
    }
    unlockRefuseRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, UnlockCommand_1.handleCommandUnlockRefusePacketRes)(context);
        });
    }
    unlockAcceptRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, UnlockCommand_1.handleCommandUnlockAcceptPacketRes)(packet, context);
        });
    }
}
exports.default = UnlockCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockHimself),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockHimself]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockHimself", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockNotInJail),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockNotInJail]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockNotInJail", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockNoPlayerFound),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockNoPlayerFound]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockNoPlayerFound", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockNotEnoughMoney),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockNotEnoughMoney]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockNotEnoughMoney", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockRefusePacketRes]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockRefuseRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandUnlockPacket_1.CommandUnlockAcceptPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandUnlockPacket_1.CommandUnlockAcceptPacketRes]),
    __metadata("design:returntype", Promise)
], UnlockCommandPacketHandlers.prototype, "unlockAcceptRes", null);
//# sourceMappingURL=UnlockCommandPacketHandlers.js.map