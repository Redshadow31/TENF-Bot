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
const CommandTopPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandTopPacket");
const TopCommand_1 = require("../../../../commands/player/TopCommand");
class TopCommandPacketHandlers {
    topScoreRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopPacketResScore)(context, packet);
        });
    }
    topGloryRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopPacketResGlory)(context, packet);
        });
    }
    topGuildRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopPacketResGuild)(context, packet);
        });
    }
    topInvalidPageRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopInvalidPagePacket)(context, packet);
        });
    }
    topPlayersEmptyRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopPlayersEmptyPacket)(context, packet);
        });
    }
    topGuildsEmptyRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, TopCommand_1.handleCommandTopGuildsEmptyPacket)(context);
        });
    }
}
exports.default = TopCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopPacketResScore),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopPacketResScore]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topScoreRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopPacketResGlory),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopPacketResGlory]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topGloryRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopPacketResGuild),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopPacketResGuild]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topGuildRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopInvalidPagePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopInvalidPagePacket]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topInvalidPageRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopPlayersEmptyPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopPlayersEmptyPacket]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topPlayersEmptyRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandTopPacket_1.CommandTopGuildsEmptyPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandTopPacket_1.CommandTopGuildsEmptyPacket]),
    __metadata("design:returntype", Promise)
], TopCommandPacketHandlers.prototype, "topGuildsEmptyRes", null);
//# sourceMappingURL=TopCommandPacketHandlers.js.map