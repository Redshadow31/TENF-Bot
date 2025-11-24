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
exports.handleCommandRarityPacketRes = handleCommandRarityPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandRarityPacket_1 = require("../../../../Lib/src/packets/commands/CommandRarityPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandRarityPacket_1.CommandRarityPacketReq, {});
}
function handleCommandRarityPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setTitle(i18n_1.default.t("commands:rarity.title", { lng }))
                    .setDescription(packet.rarities.map((r, i) => i18n_1.default.t("commands:rarity.rarityTemplate", {
                    lng,
                    rarity: i,
                    percentageOrDescription: i === 0 ? i18n_1.default.t("commands:rarity.earlyAvailable", { lng }) : `${r}%`
                }))
                    .join("\n"))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("rarity"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=RarityCommand.js.map