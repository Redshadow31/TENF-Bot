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
const CommandSetPlayerInfo_1 = require("../../../../../../Lib/src/packets/commands/CommandSetPlayerInfo");
const DiscordCache_1 = require("../../../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../../../messages/DraftBotEmbed");
const i18n_1 = require("../../../../translations/i18n");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
const StringUtils_1 = require("../../../../utils/StringUtils");
const DisplayUtils_1 = require("../../../../utils/DisplayUtils");
class SetPlayerInfoCommandPacketHandlers {
    setPlayerInfoRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .setTitle(i18n_1.default.t("commands:setPlayerInfo.playerModifiedTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }))
                        .setDescription(i18n_1.default.t("commands:setPlayerInfo.playerModifiedDesc", {
                        lng,
                        keycloakId: packet.keycloakId,
                        pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.keycloakId, lng)
                    }))
                ],
                components: []
            });
        });
    }
    setPlayerInfoDoesntExistError(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:playerDoesntExist");
        });
    }
}
exports.default = SetPlayerInfoCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandSetPlayerInfo_1.CommandSetPlayerInfoRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandSetPlayerInfo_1.CommandSetPlayerInfoRes]),
    __metadata("design:returntype", Promise)
], SetPlayerInfoCommandPacketHandlers.prototype, "setPlayerInfoRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandSetPlayerInfo_1.CommandSetPlayerInfoDoesntExistError),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandSetPlayerInfo_1.CommandSetPlayerInfoDoesntExistError]),
    __metadata("design:returntype", Promise)
], SetPlayerInfoCommandPacketHandlers.prototype, "setPlayerInfoDoesntExistError", null);
//# sourceMappingURL=SetPlayerInfoCommandPacketHandlers.js.map