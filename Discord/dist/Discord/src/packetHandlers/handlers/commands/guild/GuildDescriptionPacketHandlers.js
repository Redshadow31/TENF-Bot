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
const CommandGuildDescriptionPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandGuildDescriptionPacket");
const CommandGuildElderRemovePacket_1 = require("../../../../../../Lib/src/packets/commands/CommandGuildElderRemovePacket");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const GuildDescriptionCommand_1 = require("../../../../commands/guild/GuildDescriptionCommand");
class GuildDescriptionCommandPacketHandlers {
    guildDescriptionNoGuildRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:guildDescription.noGuild");
        });
    }
    guildDescriptionNotAnElderRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:guildDescription.notAnElder");
        });
    }
    guildDescriptionRefuseRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildDescriptionCommand_1.handleCommandGuildDescriptionRefusePacketRes)(packet, context);
        });
    }
    guildDescriptionAcceptRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, GuildDescriptionCommand_1.handleCommandGuildDescriptionAcceptPacketRes)(packet, context);
        });
    }
    guildDescriptionInvalidRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:guildDescriptionNotValid", Object.assign({}, packet));
        });
    }
}
exports.default = GuildDescriptionCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionNoGuildPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildElderRemovePacket_1.CommandGuildElderRemoveNoElderPacket]),
    __metadata("design:returntype", Promise)
], GuildDescriptionCommandPacketHandlers.prototype, "guildDescriptionNoGuildRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionNotAnElderPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDescriptionPacket_1.CommandGuildDescriptionNotAnElderPacket]),
    __metadata("design:returntype", Promise)
], GuildDescriptionCommandPacketHandlers.prototype, "guildDescriptionNotAnElderRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionRefusePacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDescriptionPacket_1.CommandGuildDescriptionRefusePacketRes]),
    __metadata("design:returntype", Promise)
], GuildDescriptionCommandPacketHandlers.prototype, "guildDescriptionRefuseRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionAcceptPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDescriptionPacket_1.CommandGuildDescriptionAcceptPacketRes]),
    __metadata("design:returntype", Promise)
], GuildDescriptionCommandPacketHandlers.prototype, "guildDescriptionAcceptRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionInvalidPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandGuildDescriptionPacket_1.CommandGuildDescriptionInvalidPacket]),
    __metadata("design:returntype", Promise)
], GuildDescriptionCommandPacketHandlers.prototype, "guildDescriptionInvalidRes", null);
//# sourceMappingURL=GuildDescriptionPacketHandlers.js.map