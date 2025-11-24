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
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const ErrorPacket_1 = require("../../../../Lib/src/packets/commands/ErrorPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const BlockedPacket_1 = require("../../../../Lib/src/packets/commands/BlockedPacket");
const Language_1 = require("../../../../Lib/src/Language");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
class ErrorHandler {
    errorHandler(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const embed = new DraftBotEmbed_1.DraftBotEmbed()
                .setErrorColor()
                .setTitle(i18n_1.default.t("error:unexpectedError", { lng: interaction.userLanguage }))
                .setDescription(packet.message);
            yield interaction.channel.send({ embeds: [embed] });
        });
    }
    blockedHandler(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const lng = (_b = (_a = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction)) === null || _a === void 0 ? void 0 : _a.userLanguage) !== null && _b !== void 0 ? _b : Language_1.LANGUAGE.ENGLISH;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const buttonInteraction = ((_c = context.discord) === null || _c === void 0 ? void 0 : _c.buttonInteraction) ? DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction) : undefined;
            const otherPlayer = context.keycloakId !== packet.keycloakId;
            let errorReasons = "";
            packet.reasons.forEach(reason => {
                errorReasons = errorReasons.concat(`${i18n_1.default.t(`error:blockedContext.${reason}`, {
                    lng
                })}, `);
            });
            errorReasons = errorReasons.slice(0, -2);
            const embed = new DraftBotEmbed_1.DraftBotEmbed()
                .setErrorColor()
                .setTitle(i18n_1.default.t("error:titleDidntWork", {
                lng,
                pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng)
            }))
                .setDescription(otherPlayer
                ? i18n_1.default.t("error:anotherPlayerBlocked", {
                    lng,
                    username: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.keycloakId, lng),
                    reasons: errorReasons
                })
                : i18n_1.default.t("error:playerBlocked", {
                    lng,
                    reasons: errorReasons
                }));
            if (buttonInteraction) {
                if (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.deferred) {
                    yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({ embeds: [embed] }));
                }
                else if (!(buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.deferred) && !(buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.replied)) {
                    yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.reply({ embeds: [embed] }));
                }
                else {
                    yield (interaction === null || interaction === void 0 ? void 0 : interaction.channel.send({ embeds: [embed] }));
                }
            }
            else if ((interaction === null || interaction === void 0 ? void 0 : interaction.deferred) && !interaction.replyEdited) {
                yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({ embeds: [embed] }));
            }
            else if (!(interaction === null || interaction === void 0 ? void 0 : interaction.deferred) && !(interaction === null || interaction === void 0 ? void 0 : interaction.replied)) {
                yield (interaction === null || interaction === void 0 ? void 0 : interaction.reply({ embeds: [embed] }));
            }
            else {
                yield (interaction === null || interaction === void 0 ? void 0 : interaction.channel.send({ embeds: [embed] }));
            }
        });
    }
    maintenanceHandler(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:maintenance", {}, {
                forcedTitle: "error:maintenanceTitle"
            });
        });
    }
    bannedHandler(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:banned");
        });
    }
    resetIsNowHandler(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:resetIsNow");
        });
    }
    seasonEndIsNowHandler(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "error:seasonEndIsNow");
        });
    }
}
exports.default = ErrorHandler;
__decorate([
    (0, PacketHandler_1.packetHandler)(ErrorPacket_1.ErrorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ErrorPacket_1.ErrorPacket]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "errorHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(BlockedPacket_1.BlockedPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, BlockedPacket_1.BlockedPacket]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "blockedHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ErrorPacket_1.ErrorMaintenancePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ErrorPacket_1.ErrorMaintenancePacket]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "maintenanceHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ErrorPacket_1.ErrorBannedPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ErrorPacket_1.ErrorBannedPacket]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "bannedHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ErrorPacket_1.ErrorResetIsNow),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ErrorPacket_1.ErrorResetIsNow]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "resetIsNowHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ErrorPacket_1.ErrorSeasonEndIsNow),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ErrorPacket_1.ErrorResetIsNow]),
    __metadata("design:returntype", Promise)
], ErrorHandler.prototype, "seasonEndIsNowHandler", null);
//# sourceMappingURL=ErrorHandler.js.map