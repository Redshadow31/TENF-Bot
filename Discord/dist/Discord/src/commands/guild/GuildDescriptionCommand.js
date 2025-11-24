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
exports.createGuildDescriptionCollector = createGuildDescriptionCollector;
exports.handleCommandGuildDescriptionRefusePacketRes = handleCommandGuildDescriptionRefusePacketRes;
exports.handleCommandGuildDescriptionAcceptPacketRes = handleCommandGuildDescriptionAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandGuildDescriptionPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildDescriptionPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function createGuildDescriptionCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildDescription.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:guildDescription.confirmDesc", {
            lng,
            description: data.description
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildDescriptionRefusePacketRes(_packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildDescription.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:guildDescription.canceledDesc", {
                    lng
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function handleCommandGuildDescriptionAcceptPacketRes(_packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildDescription.successDescriptionTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildDescription.acceptedDesc", { lng }))
                ]
            });
        }
    });
}
function getPacket(interaction) {
    const description = interaction.options.get("description", true).value;
    return (0, DraftBotPacket_1.makePacket)(CommandGuildDescriptionPacket_1.CommandGuildDescriptionPacketReq, { description });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildDescription")
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guildDescription", "description", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildDescriptionCommand.js.map