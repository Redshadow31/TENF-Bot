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
const CommandGuildElderRemovePacket_1 = require("../../../../../../Lib/src/packets/commands/CommandGuildElderRemovePacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const GuildElderRemoveCommand_1 = require("../../../../commands/guild/GuildElderRemoveCommand");
class GuildElderRemoveCommandPacketHandlers {
    guildElderRemoveFoundPlayerRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:guildElderRemove.noElder");
        });
    }
    guildElderRemoveRefuseRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildElderRemoveCommand_1.handleCommandGuildElderRemoveRefusePacketRes)(packet, context);
        });
    }
    guildElderRemoveAcceptRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildElderRemoveCommand_1.handleCommandGuildElderRemoveAcceptPacketRes)(packet, context);
        });
    }
}
exports.default = GuildElderRemoveCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildElderRemovePacket_1.CommandGuildElderRemoveNoElderPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildElderRemovePacket_1.CommandGuildElderRemoveNoElderPacket]),
    __metadata("design:returntype", Promise)
], GuildElderRemoveCommandPacketHandlers.prototype, "guildElderRemoveFoundPlayerRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildElderRemovePacket_1.CommandGuildElderRemoveRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildElderRemovePacket_1.CommandGuildElderRemoveRefusePacketRes]),
    __metadata("design:returntype", Promise)
], GuildElderRemoveCommandPacketHandlers.prototype, "guildElderRemoveRefuseRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildElderRemovePacket_1.CommandGuildElderRemoveAcceptPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildElderRemovePacket_1.CommandGuildElderRemoveAcceptPacketRes]),
    __metadata("design:returntype", Promise)
], GuildElderRemoveCommandPacketHandlers.prototype, "guildElderRemoveAcceptRes", null);
//# sourceMappingURL=GuildElderRemoveCommandPacketHandlers.js.map