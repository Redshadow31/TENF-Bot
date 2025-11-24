"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesUtils = void 0;
const DraftbotInteraction_1 = require("../messages/DraftbotInteraction");
const DiscordCache_1 = require("../bot/DiscordCache");
class MessagesUtils {
    static getCurrentInteraction(context) {
        if (context.discord.stringSelectMenuInteraction) {
            const stringSelectMenuInteraction = DiscordCache_1.DiscordCache.getStringSelectMenuInteraction(context.discord.stringSelectMenuInteraction);
            if (stringSelectMenuInteraction) {
                return DraftbotInteraction_1.DraftbotInteraction.cast(stringSelectMenuInteraction);
            }
        }
        if (context.discord.buttonInteraction) {
            const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            if (buttonInteraction) {
                return DraftbotInteraction_1.DraftbotInteraction.cast(buttonInteraction);
            }
        }
        return DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
    }
}
exports.MessagesUtils = MessagesUtils;
//# sourceMappingURL=MessagesUtils.js.map