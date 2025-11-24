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
exports.epicItemShopCollector = epicItemShopCollector;
exports.epicItemShopHandler = epicItemShopHandler;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../utils/StringUtils");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const DisplayUtils_1 = require("../utils/DisplayUtils");
const i18n_1 = require("../translations/i18n");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
function epicItemShopCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const tip = data.tip ? i18n_1.default.t("smallEvents:epicItemShop.reductionTip", { lng }) : "";
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("epicItemShop", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:epicItemShop.intro", lng)
            + tip
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:shop.end", lng, {
                item: DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(data.item, lng),
                price: data.price,
                type: `${DraftBotIcons_1.DraftBotIcons.itemCategories[data.item.category]}${i18n_1.default.t("smallEvents:shop.types", {
                    returnObjects: true,
                    lng
                })[data.item.category]}`
            }), interaction.user, lng);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function epicItemShopHandler(context, translationKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("epicItemShop", StringUtils_1.StringUtils.getRandomTranslation(translationKey, originalInteraction.userLanguage), buttonInteraction.user, originalInteraction.userLanguage)
            ]
        }));
    });
}
//# sourceMappingURL=epicItemShop.js.map