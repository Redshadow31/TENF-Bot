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
exports.lotteryCollector = lotteryCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const i18n_1 = require("../translations/i18n");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const ReactionCollectorLottery_1 = require("../../../Lib/src/packets/interaction/ReactionCollectorLottery");
const discord_js_1 = require("discord.js");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const ErrorUtils_1 = require("../utils/ErrorUtils");
function lotteryCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("lottery", i18n_1.default.t("smallEvents:lottery.intro", { lng }), interaction.user, lng);
        const row = new discord_js_1.ActionRowBuilder();
        const easyButtonId = "easy";
        const easyButton = new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.lottery.easy))
            .setCustomId(easyButtonId)
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        const mediumButtonId = "medium";
        const mediumButton = new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.lottery.medium))
            .setCustomId(mediumButtonId)
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        const hardButtonId = "hard";
        const hardButton = new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.lottery.hard))
            .setCustomId(hardButtonId)
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        row.addComponents(easyButton, mediumButton, hardButton);
        const msg = yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [embed],
            components: [row]
        }));
        const buttonCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            yield buttonInteraction.deferReply();
            if (buttonInteraction.customId === easyButtonId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorLottery_1.ReactionCollectorLotteryEasyReaction.name));
            }
            else if (buttonInteraction.customId === mediumButtonId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorLottery_1.ReactionCollectorLotteryMediumReaction.name));
            }
            else if (buttonInteraction.customId === hardButtonId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorLottery_1.ReactionCollectorLotteryHardReaction.name));
            }
        }));
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [buttonCollector];
    });
}
//# sourceMappingURL=lottery.js.map