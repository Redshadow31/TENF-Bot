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
exports.handleCommandLeagueRewardSuccessPacket = handleCommandLeagueRewardSuccessPacket;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const CommandLeagueRewardPacket_1 = require("../../../../Lib/src/packets/commands/CommandLeagueRewardPacket");
const i18n_1 = require("../../translations/i18n");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandLeagueRewardPacket_1.CommandLeagueRewardPacketReq, {});
    });
}
function handleCommandLeagueRewardSuccessPacket(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:leagueReward.title", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t(`commands:leagueReward.description.${packet.rank === 1 ? "first" : "other"}`, {
                    lng,
                    score: packet.score,
                    glory: packet.gloryPoints,
                    rank: packet.rank,
                    leagueId: packet.oldLeagueId,
                    money: packet.money,
                    xp: packet.xp
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("leagueReward"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=LeagueRewardCommand.js.map