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
exports.gobletsGameCollector = gobletsGameCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const SmallEventsHandler_1 = require("../packetHandlers/handlers/SmallEventsHandler");
const i18n_1 = require("../translations/i18n");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DraftbotButtonReactionMessage_1 = require("../messages/DraftbotButtonReactionMessage");
function getGobletsGameReactions(lng) {
    const reactions = [];
    for (const [customId, emote] of Object.entries(DraftBotIcons_1.DraftBotIcons.goblets)) {
        reactions.push({
            customId,
            emote,
            description: i18n_1.default.t(`smallEvents:gobletsGame.goblets.${customId}.description`, { lng })
        });
    }
    return reactions;
}
function gobletsGameCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        return yield new DraftbotButtonReactionMessage_1.DraftbotButtonReactionMessage(interaction, {
            reactions: getGobletsGameReactions(lng),
            embed: new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("gobletsGame", `${(0, SmallEventsHandler_1.getRandomSmallEventIntro)(lng)}${i18n_1.default.t("smallEvents:gobletsGame.intro", { lng })}`, interaction.user, lng),
            packet,
            context,
            canEndReact: true
        }).send();
    });
}
//# sourceMappingURL=gobletsGame.js.map