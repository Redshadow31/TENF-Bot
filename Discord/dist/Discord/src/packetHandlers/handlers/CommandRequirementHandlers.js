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
const RequirementEffectPacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementEffectPacket");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const RequirementGuildNeededPacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementGuildNeededPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const RequirementGuildRolePacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementGuildRolePacket");
const RequirementLevelPacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementLevelPacket");
const RequirementRightPacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementRightPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const RequirementWherePacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementWherePacket");
const MessagesUtils_1 = require("../../utils/MessagesUtils");
const v10_1 = require("discord-api-types/v10");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
class CommandRequirementHandlers {
    requirementEffect(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = context.discord.buttonInteraction ? DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction) : DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = context.discord.language;
            const effectsText = (0, ErrorUtils_1.effectsErrorTextValue)(yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng), lng, true, packet.currentEffectId, packet.remainingTime);
            if (!interaction) {
                return;
            }
            if (interaction.deferred) {
                yield interaction.deleteReply();
            }
            yield (interaction.replied || interaction.deferred ? interaction.followUp.bind(interaction) : interaction.reply.bind(interaction))({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .setErrorColor()
                        .formatAuthor(effectsText.title, interaction.user)
                        .setDescription(effectsText.description)
                ],
                flags: v10_1.MessageFlags.Ephemeral
            });
        });
    }
    requirementGuildNeeded(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("error:notInAGuild", { lng: interaction.userLanguage }));
        });
    }
    requirementGuildRole(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("error:notAuthorizedError", { lng: interaction.userLanguage }));
        });
    }
    requirementLevel(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("error:levelTooLow", {
                lng: interaction.userLanguage,
                level: packet.requiredLevel
            }));
        });
    }
    static requirementRight(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("error:notAuthorizedRight", { lng: interaction.userLanguage }));
        });
    }
    requirementWhere(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = MessagesUtils_1.MessagesUtils.getCurrentInteraction(context);
            yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(context, interaction, i18n_1.default.t("error:commandNotAvailableHere", { lng: interaction.userLanguage }));
        });
    }
}
exports.default = CommandRequirementHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementEffectPacket_1.RequirementEffectPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementEffectPacket_1.RequirementEffectPacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers.prototype, "requirementEffect", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementGuildNeededPacket_1.RequirementGuildNeededPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementGuildNeededPacket_1.RequirementGuildNeededPacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers.prototype, "requirementGuildNeeded", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementGuildRolePacket_1.RequirementGuildRolePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementGuildRolePacket_1.RequirementGuildRolePacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers.prototype, "requirementGuildRole", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementLevelPacket_1.RequirementLevelPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementLevelPacket_1.RequirementLevelPacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers.prototype, "requirementLevel", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementWherePacket_1.RequirementWherePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementWherePacket_1.RequirementWherePacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers.prototype, "requirementWhere", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(RequirementRightPacket_1.RequirementRightPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RequirementRightPacket_1.RequirementRightPacket]),
    __metadata("design:returntype", Promise)
], CommandRequirementHandlers, "requirementRight", null);
//# sourceMappingURL=CommandRequirementHandlers.js.map