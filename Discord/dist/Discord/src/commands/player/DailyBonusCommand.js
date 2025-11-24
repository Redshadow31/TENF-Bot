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
exports.handleDailyBonusCooldownError = handleDailyBonusCooldownError;
exports.handleDailyBonusRes = handleDailyBonusRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandDailyBonusPacket_1 = require("../../../../Lib/src/packets/commands/CommandDailyBonusPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const i18n_1 = require("../../translations/i18n");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const ItemConstants_1 = require("../../../../Lib/src/constants/ItemConstants");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandDailyBonusPacket_1.CommandDailyBonusPacketReq, {});
    });
}
function handleDailyBonusCooldownError(context, lastDailyTimestamp, cooldownTime) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [
                new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("commands:daily.errors.cooldown", {
                    cooldownTime,
                    time: (0, TimeUtils_1.printTimeBeforeDate)(lastDailyTimestamp + (0, TimeUtils_1.hoursToMilliseconds)(cooldownTime)),
                    lng: interaction.userLanguage
                }))
            ]
        }));
    });
}
function handleDailyBonusRes(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:daily.title", {
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
                    lng
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:daily.description", {
                    value: packet.itemNature === ItemConstants_1.ItemNature.TIME_SPEEDUP ? (0, TimeUtils_1.minutesDisplay)(packet.value, lng) : packet.value,
                    nature: ItemConstants_1.ItemConstants.NATURE_ID_TO_NAME[packet.itemNature],
                    lng
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("daily"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=DailyBonusCommand.js.map