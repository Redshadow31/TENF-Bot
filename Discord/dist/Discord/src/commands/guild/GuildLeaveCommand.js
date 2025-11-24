"use strict";
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
exports.commandInfo = void 0;
exports.createGuildLeaveCollector = createGuildLeaveCollector;
exports.handleCommandGuildLeaveAcceptPacketRes = handleCommandGuildLeaveAcceptPacketRes;
exports.handleCommandGuildLeaveRefusePacketRes = handleCommandGuildLeaveRefusePacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandGuildLeavePacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildLeavePacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function createGuildLeaveCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const keyDesc = data.isGuildDestroyed ? "confirmChiefDesc" : data.newChiefKeycloakId ? "confirmChiefDescWithElder" : "confirmDesc";
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildLeave.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t(`commands:guildLeave.${keyDesc}`, {
            lng,
            newChiefPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.newChiefKeycloakId, lng),
            guildName: data.guildName
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildLeaveAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const keyDesc = packet.isGuildDestroyed ? "destroySuccess" : packet.newChiefKeycloakId ? "leavingSuccessWithNewChief" : "leavingSuccess";
        const getChief = packet.newChiefKeycloakId ? yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.newChiefKeycloakId) : undefined;
        if (getChief === null || getChief === void 0 ? void 0 : getChief.isError) {
            return;
        }
        const newChiefPseudo = getChief ? (0, StringUtils_1.escapeUsername)(getChief.payload.user.attributes.gameUsername[0]) : "";
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildLeave.successTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName),
                        guildName: packet.guildName
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t(`commands:guildLeave.${keyDesc}`, {
                        lng,
                        newChiefPseudo,
                        guildName: packet.guildName
                    }))
                ]
            });
        }
    });
}
function handleCommandGuildLeaveRefusePacketRes(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildLeave.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:guildLeave.canceledDesc", {
                    lng
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildLeavePacket_1.CommandGuildLeavePacketReq, {});
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildLeave"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildLeaveCommand.js.map