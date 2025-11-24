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
exports.itemChoiceCollector = itemChoiceCollector;
exports.itemAcceptCollector = itemAcceptCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const i18n_1 = require("../translations/i18n");
const DisplayUtils_1 = require("../utils/DisplayUtils");
const ReactionCollectorItemChoice_1 = require("../../../Lib/src/packets/interaction/ReactionCollectorItemChoice");
const ItemConstants_1 = require("../../../Lib/src/constants/ItemConstants");
function itemChoiceCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed();
        embed.formatAuthor(i18n_1.default.t("commands:inventory.chooseItemToReplaceTitle", { lng }), interaction.user);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createChoiceListCollector(interaction, {
            packet,
            context
        }, {
            embed,
            items: packet.reactions.filter(reaction => reaction.type === ReactionCollectorItemChoice_1.ReactionCollectorItemChoiceItemReaction.name)
                .map(reaction => {
                const itemReaction = reaction.data;
                return DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(itemReaction.itemWithDetails, lng);
            })
        }, {
            refuse: {
                can: true,
                reactionIndex: packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorItemChoice_1.ReactionCollectorItemChoiceRefuseReaction.name)
            },
            sendManners: DiscordCollectorUtils_1.SEND_POLITICS.ALWAYS_SEND
        });
    });
}
function itemAcceptCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(data.itemWithDetails.category === ItemConstants_1.ItemCategory.POTION
            ? i18n_1.default.t("commands:inventory.randomItemFooterPotion", { lng })
            : i18n_1.default.t("commands:inventory.randomItemFooter", { lng }), interaction.user)
            .setDescription(DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(data.itemWithDetails, lng));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
//# sourceMappingURL=ItemCollectors.js.map