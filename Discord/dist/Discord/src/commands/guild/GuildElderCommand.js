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
exports.createGuildElderCollector = createGuildElderCollector;
exports.handleCommandGuildElderRefusePacketRes = handleCommandGuildElderRefusePacketRes;
exports.handleCommandGuildElderAcceptPacketRes = handleCommandGuildElderAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const CommandGuildElderPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildElderPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const PacketUtils_1 = require("../../utils/PacketUtils");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function createGuildElderCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElder.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:guildElder.confirmDesc", {
            lng,
            elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.promotedKeycloakId, lng),
            guildName: data.guildName
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildElderRefusePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElder.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:guildElder.canceledDesc", {
                    lng,
                    elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.promotedKeycloakId, lng)
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function handleCommandGuildElderAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElder.successElderAddTitle", {
                        lng,
                        elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.promotedKeycloakId, lng),
                        guildName: packet.guildName
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildElder.acceptedDesc", { lng }))
                ]
            });
        }
    });
}
function getPacket(interaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, user);
        if (!askedPlayer || !askedPlayer.keycloakId) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandGuildElderPacket_1.CommandGuildElderPacketReq, { askedPlayerKeycloakId: askedPlayer.keycloakId });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildElder")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guildElder", "user", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildElderCommand.js.map