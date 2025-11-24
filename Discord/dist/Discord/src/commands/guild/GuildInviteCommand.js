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
exports.handleCommandGuildInviteError = handleCommandGuildInviteError;
exports.createGuildInviteCollector = createGuildInviteCollector;
exports.handleCommandGuildInviteRefusePacketRes = handleCommandGuildInviteRefusePacketRes;
exports.handleCommandGuildInviteAcceptPacketRes = handleCommandGuildInviteAcceptPacketRes;
const CommandGuildInvitePacket_js_1 = require("../../../../Lib/src/packets/commands/CommandGuildInvitePacket.js");
const KeycloakUtils_js_1 = require("../../../../Lib/src/keycloak/KeycloakUtils.js");
const DraftBotShard_js_1 = require("../../bot/DraftBotShard.js");
const DraftBotErrorEmbed_js_1 = require("../../messages/DraftBotErrorEmbed.js");
const i18n_js_1 = require("../../translations/i18n.js");
const DraftBotPacket_js_1 = require("../../../../Lib/src/packets/DraftBotPacket.js");
const DiscordCache_js_1 = require("../../bot/DiscordCache.js");
const DraftBotEmbed_js_1 = require("../../messages/DraftBotEmbed.js");
const DiscordCollectorUtils_js_1 = require("../../utils/DiscordCollectorUtils.js");
const SlashCommandBuilderGenerator_js_1 = require("../SlashCommandBuilderGenerator.js");
const GuildConstants_js_1 = require("../../../../Lib/src/constants/GuildConstants.js");
const PacketUtils_1 = require("../../utils/PacketUtils");
const StringUtils_1 = require("../../../../Lib/src/utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const invitedUser = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!invitedUser || !invitedUser.keycloakId) {
            return null;
        }
        return (0, DraftBotPacket_js_1.makePacket)(CommandGuildInvitePacket_js_1.CommandGuildInvitePacketReq, { invitedPlayerKeycloakId: invitedUser.keycloakId });
    });
}
function handleCommandGuildInviteError(packet, context, errorKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_js_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const buttonInteraction = DiscordCache_js_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const params = {
            embeds: [
                new DraftBotErrorEmbed_js_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_js_1.default.t(errorKey, {
                    level: GuildConstants_js_1.GuildConstants.REQUIRED_LEVEL,
                    guildName: packet.guildName,
                    pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.invitedPlayerKeycloakId, lng),
                    lng
                }))
            ]
        };
        if (buttonInteraction) {
            yield buttonInteraction.editReply(params);
            return;
        }
        yield interaction.reply(params);
    });
}
function createGuildInviteCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_js_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const invitedUser = interaction.options.getUser("user");
        const invitedKeycloakId = yield KeycloakUtils_js_1.KeycloakUtils.getKeycloakIdFromDiscordId(DraftBotShard_js_1.keycloakConfig, invitedUser.id, null);
        if (invitedKeycloakId.isError || !invitedKeycloakId.payload.keycloakId) {
            return null;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_js_1.DraftBotEmbed().formatAuthor(i18n_js_1.default.t("commands:guildInvite.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(invitedUser.displayName)
        }), invitedUser)
            .setDescription(i18n_js_1.default.t("commands:guildInvite.confirmDesc", {
            lng,
            guildName: data.guildName
        }));
        return yield DiscordCollectorUtils_js_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context, {
            acceptedUsersId: [invitedKeycloakId.payload.keycloakId],
            canInitiatorRefuse: true
        });
    });
}
function handleCommandGuildInviteRefusePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_js_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_js_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const getInvitedPlayer = yield KeycloakUtils_js_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_js_1.keycloakConfig, packet.invitedPlayerKeycloakId);
        if (getInvitedPlayer.isError) {
            return;
        }
        const invitedUser = yield DraftBotShard_js_1.draftBotClient.users.fetch(getInvitedPlayer.payload.user.attributes.discordId[0]);
        if (buttonInteraction && originalInteraction) {
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_js_1.DraftBotEmbed().formatAuthor(i18n_js_1.default.t("commands:guildInvite.refusedTitle", {
                        lng: originalInteraction.userLanguage,
                        guildName: packet.guildName
                    }), invitedUser)
                        .setErrorColor()
                ]
            });
        }
    });
}
function handleCommandGuildInviteAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_js_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_js_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const getInvitedPlayer = yield KeycloakUtils_js_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_js_1.keycloakConfig, packet.invitedPlayerKeycloakId);
        if (getInvitedPlayer.isError) {
            return;
        }
        const invitedUser = yield DraftBotShard_js_1.draftBotClient.users.fetch(getInvitedPlayer.payload.user.attributes.discordId[0]);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_js_1.DraftBotEmbed().formatAuthor(i18n_js_1.default.t("commands:guildInvite.successTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(invitedUser.displayName),
                        guildName: packet.guildName
                    }), invitedUser)
                        .setDescription(i18n_js_1.default.t("commands:guildInvite.successDesc", {
                        lng,
                        guildName: packet.guildName
                    }))
                ]
            });
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_js_1.SlashCommandBuilderGenerator.generateBaseCommand("guildInvite")
        .addUserOption(option => SlashCommandBuilderGenerator_js_1.SlashCommandBuilderGenerator.generateOption("guildInvite", "user", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildInviteCommand.js.map