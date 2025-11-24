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
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const RightGroup_1 = require("../../../../Lib/src/types/RightGroup");
const DiscordMQTT_1 = require("../../bot/DiscordMQTT");
const PacketUtils_1 = require("../../utils/PacketUtils");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandGetResourcesPacket_1 = require("../../../../Lib/src/packets/commands/CommandGetResourcesPacket");
const CommandRequirementHandlers_1 = require("../../packetHandlers/handlers/CommandRequirementHandlers");
const RequirementRightPacket_1 = require("../../../../Lib/src/packets/commands/requirements/RequirementRightPacket");
const CommandGetPlayerInfo_1 = require("../../../../Lib/src/packets/commands/CommandGetPlayerInfo");
const i18n_1 = require("../../translations/i18n");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const discord_js_1 = require("discord.js");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const DiscordConstants_1 = require("../../DiscordConstants");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const CommandSetPlayerInfo_1 = require("../../../../Lib/src/packets/commands/CommandSetPlayerInfo");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const StringUtils_1 = require("../../utils/StringUtils");
function handleGetPlayerInfoResponse(interaction, context, packetName, packet, resources, targetKeycloakId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (packetName === CommandGetPlayerInfo_1.CommandGetPlayerInfoRes.name) {
            const getPlayerInfoPacket = packet;
            if (!getPlayerInfoPacket.exists) {
                yield interaction.editReply({
                    embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:playerDoesntExist", { lng: interaction.userLanguage }))]
                });
                return;
            }
            const badges = resources.badges.filter(badge => !getPlayerInfoPacket.data.badges.includes(badge));
            if (badges.length === 0) {
                yield interaction.editReply({
                    embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("commands:giveBadge.alreadyHaveBadge", { lng: interaction.userLanguage }))]
                });
                return;
            }
            const rows = [];
            for (const badge of badges) {
                const badgeEmote = DraftBotIcons_1.DraftBotIcons.badges[badge];
                if (badgeEmote) {
                    if (rows.length === 0 || rows[rows.length - 1].components[0].options.length >= DiscordConstants_1.DiscordConstants.MAX_SELECT_MENU_OPTIONS) {
                        rows.push(new discord_js_1.ActionRowBuilder());
                        rows[rows.length - 1].addComponents(new discord_js_1.StringSelectMenuBuilder()
                            .setPlaceholder(i18n_1.default.t("commands:giveBadge.selectBadge", { lng: interaction.userLanguage }))
                            .setCustomId(`giveBadge-${interaction.user.id}-${badge}`));
                    }
                    rows[rows.length - 1].components[0].addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                        .setLabel(i18n_1.default.t(`commands:profile.badges.${badge}`, { lng: interaction.userLanguage }))
                        .setEmoji((0, discord_js_1.parseEmoji)(badgeEmote))
                        .setValue(badge));
                }
            }
            const msg = yield interaction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("commands:giveBadge.selectBadgeTitle", {
                        lng: interaction.userLanguage,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(i18n_1.default.t("commands:giveBadge.selectBadgeDesc", { lng: interaction.userLanguage }))
                ],
                components: rows
            });
            if (!msg) {
                return;
            }
            const selectCollector = msg.createMessageComponentCollector({
                time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
            });
            selectCollector.on("collect", (selectMenuInteraction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (selectMenuInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(selectMenuInteraction.user, selectMenuInteraction, interaction.userLanguage);
                    return;
                }
                selectCollector.stop();
                yield selectMenuInteraction.update({
                    components: []
                });
                const selectedOption = selectMenuInteraction.values[0];
                const newBadges = getPlayerInfoPacket.data.badges.concat(selectedOption);
                PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(CommandSetPlayerInfo_1.CommandSetPlayerInfoReq, {
                    keycloakId: targetKeycloakId,
                    dataToSet: {
                        badges: newBadges
                    }
                }));
            }));
            selectCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield msg.edit({
                    components: []
                });
            }));
        }
    });
}
function handleGetResourcesResponse(interaction, resourcesContext, resourcesPacketName, resourcesPacket, targetKeycloakId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (resourcesPacketName === CommandGetResourcesPacket_1.CommandGetResourcesRes.name) {
            yield DiscordMQTT_1.DiscordMQTT.asyncPacketSender.sendPacketAndHandleResponse(resourcesContext, (0, DraftBotPacket_1.makePacket)(CommandGetPlayerInfo_1.CommandGetPlayerInfoReq, {
                keycloakId: targetKeycloakId,
                dataToGet: {
                    badges: true
                }
            }), (playerInfoContext, playerInfoPacketName, playerInfoPacket) => {
                handleGetPlayerInfoResponse(interaction, playerInfoContext, playerInfoPacketName, playerInfoPacket, resourcesPacket, targetKeycloakId);
            });
        }
    });
}
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const context = yield PacketUtils_1.PacketUtils.createPacketContext(interaction, keycloakUser);
        if (!((_a = context.rightGroups) === null || _a === void 0 ? void 0 : _a.includes(RightGroup_1.RightGroup.BADGES)) && !((_b = context.rightGroups) === null || _b === void 0 ? void 0 : _b.includes(RightGroup_1.RightGroup.ADMIN))) {
            yield CommandRequirementHandlers_1.default.requirementRight(context, (0, DraftBotPacket_1.makePacket)(RequirementRightPacket_1.RequirementRightPacket, {}));
            return null;
        }
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        yield interaction.deferReply();
        yield DiscordMQTT_1.DiscordMQTT.asyncPacketSender.sendPacketAndHandleResponse(context, (0, DraftBotPacket_1.makePacket)(CommandGetResourcesPacket_1.CommandGetResourcesReq, { badges: true }), (resourcesContext, resourcesPacketName, resourcesPacket) => handleGetResourcesResponse(interaction, resourcesContext, resourcesPacketName, resourcesPacket, askedPlayer.keycloakId));
        return null;
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("giveBadge")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("giveBadge", "user", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: true
};
//# sourceMappingURL=GiveBadgeCommand.js.map