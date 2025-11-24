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
exports.createGuildElderRemoveCollector = createGuildElderRemoveCollector;
exports.handleCommandGuildElderRemoveRefusePacketRes = handleCommandGuildElderRemoveRefusePacketRes;
exports.handleCommandGuildElderRemoveAcceptPacketRes = handleCommandGuildElderRemoveAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandGuildElderRemovePacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildElderRemovePacket");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function createGuildElderRemoveCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElderRemove.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:guildElderRemove.confirmDesc", {
            lng,
            elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.demotedKeycloakId, lng),
            guildName: data.guildName
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildElderRemoveRefusePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElderRemove.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:guildElderRemove.canceledDesc", {
                    lng,
                    elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.demotedKeycloakId, lng)
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function handleCommandGuildElderRemoveAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildElderRemove.successElderRemoveTitle", {
                        lng,
                        elderPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.demotedKeycloakId, originalInteraction.userLanguage),
                        guildName: packet.guildName
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildElderRemove.acceptedDesc", { lng }))
                ]
            });
        }
    });
}
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildElderRemovePacket_1.CommandGuildElderRemovePacketReq, {});
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildElderRemove"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildElderRemoveCommand.js.map