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
exports.witchCollector = witchCollector;
exports.witchResult = witchResult;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const i18n_1 = require("../translations/i18n");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const discord_js_1 = require("discord.js");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const ErrorUtils_1 = require("../utils/ErrorUtils");
const SmallEventsHandler_1 = require("../packetHandlers/handlers/SmallEventsHandler");
const StringUtils_1 = require("../utils/StringUtils");
const Effect_1 = require("../../../Lib/src/types/Effect");
const WitchActionOutcomeType_1 = require("../../../Lib/src/types/WitchActionOutcomeType");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const MessagesUtils_1 = require("../utils/MessagesUtils");
function witchCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        let witchIngredients = "\n\n";
        const reactions = [];
        for (const reaction of packet.reactions) {
            const ingredientId = reaction.data.id;
            const emoji = EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.witchSmallEvent[ingredientId]);
            witchIngredients += `${emoji} ${i18n_1.default.t(`smallEvents:witch.witchEventNames.${ingredientId}`, { lng })}\n`;
            reactions.push([ingredientId, emoji]);
        }
        const intro = (0, SmallEventsHandler_1.getRandomSmallEventIntro)(lng);
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("witch", intro
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:witch.intro", lng)
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:witch.description", lng)
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:witch.situation", lng)
            + witchIngredients, interaction.user, lng);
        const row = new discord_js_1.ActionRowBuilder();
        for (const reaction of reactions) {
            const button = new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(reaction[1]))
                .setCustomId(reaction[0])
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            row.addComponents(button);
        }
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
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, packet.reactions.findIndex(reaction => reaction.data.id === buttonInteraction.customId));
        }));
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [buttonCollector];
    });
}
function witchResult(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = MessagesUtils_1.MessagesUtils.getCurrentInteraction(context);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        const introToLoad = packet.isIngredient ? "smallEvents:witch.witchEventResults.ingredientIntros" : "smallEvents:witch.witchEventResults.adviceIntros";
        const timeOutro = packet.effectId === Effect_1.Effect.OCCUPIED.id && packet.timeLost > 0
            ? ` ${StringUtils_1.StringUtils.getRandomTranslation("smallEvents:witch.witchEventResults.outcomes.2.time", lng, { lostTime: packet.timeLost })}`
            : "";
        const outcomeTranslationToLoad = packet.outcome === WitchActionOutcomeType_1.WitchActionOutcomeType.EFFECT
            ? `smallEvents:witch.witchEventResults.outcomes.2.${packet.effectId}`
            : `smallEvents:witch.witchEventResults.outcomes.${packet.outcome + 1}`;
        yield (interaction.isRepliable() ? interaction.followUp : interaction.editReply).bind(interaction)({
            embeds: [
                new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("witch", `${StringUtils_1.StringUtils.getRandomTranslation(introToLoad, lng, {
                    witchEvent: `${i18n_1.default.t(`smallEvents:witch.witchEventNames.${packet.ingredientId}`, { lng })} ${DraftBotIcons_1.DraftBotIcons.witchSmallEvent[packet.ingredientId]}`
                        .toLowerCase()
                })} ${StringUtils_1.StringUtils.getRandomTranslation(outcomeTranslationToLoad, lng, { lifeLoss: packet.lifeLoss })}${timeOutro}`, interaction.user, lng)
            ]
        });
    });
}
//# sourceMappingURL=witch.js.map