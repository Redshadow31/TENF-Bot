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
exports.handleCommandGuildKickPacketRes = handleCommandGuildKickPacketRes;
exports.createGuildKickCollector = createGuildKickCollector;
exports.handleCommandGuildKickRefusePacketRes = handleCommandGuildKickRefusePacketRes;
exports.handleCommandGuildKickAcceptPacketRes = handleCommandGuildKickAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const CommandGuildKickPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildKickPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, user);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandGuildKickPacket_1.CommandGuildKickPacketReq, { askedPlayer });
    });
}
function handleCommandGuildKickPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        if (!packet.foundPlayer) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:guildKick.noPlayer", { lng }), { sendManner: ErrorUtils_1.SendManner.REPLY });
            return;
        }
        if (!packet.sameGuild) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:guildKick.notSameGuild", { lng }), { sendManner: ErrorUtils_1.SendManner.REPLY });
            return;
        }
        if (packet.himself) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:guildKick.himself", { lng }), { sendManner: ErrorUtils_1.SendManner.REPLY });
        }
    });
}
function createGuildKickCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildKick.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:guildKick.confirmDesc", {
            lng,
            kickedPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.kickedKeycloakId, lng),
            guildName: data.guildName
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildKickRefusePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildKick.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:guildKick.canceledDesc", {
                    lng,
                    kickedPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.kickedKeycloakId, lng)
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function handleCommandGuildKickAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const getKickedPlayer = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.kickedKeycloakId);
        if (getKickedPlayer.isError) {
            return;
        }
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildKick.title", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildKick.acceptedDesc", {
                        lng,
                        kickedPseudo: (0, StringUtils_1.escapeUsername)(getKickedPlayer.payload.user.attributes.gameUsername[0]),
                        guildName: packet.guildName
                    }))
                ]
            });
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildKick")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guildKick", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guildKick", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildKickCommand.js.map