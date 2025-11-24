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
exports.cartCollector = cartCollector;
exports.cartResult = cartResult;
const DiscordCache_1 = require("../bot/DiscordCache");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../utils/StringUtils");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const i18n_1 = require("../translations/i18n");
const SmallEventsHandler_1 = require("../packetHandlers/handlers/SmallEventsHandler");
function cartCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const story = data.displayedDestination.isDisplayed ? "knownDestination" : "unknownDestination";
        const lng = interaction.userLanguage;
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("cart", (0, SmallEventsHandler_1.getRandomSmallEventIntro)(lng)
            + StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:cart.${story}`, lng, {
                price: data.price,
                moneyEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.unitValues.money),
                destination: `${DraftBotIcons_1.DraftBotIcons.mapTypes[data.displayedDestination.type]} ${i18n_1.default.t(`models:map_locations.${data.displayedDestination.id}.name`, { lng })}`
            })
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:cart.menu", lng), interaction.user, lng);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context, {
            emojis: {
                accept: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.cartSmallEvent.accept),
                refuse: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.cartSmallEvent.refuse)
            }
        });
    });
}
function cartResult(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        let story;
        if (!packet.travelDone.hasEnoughMoney && packet.travelDone.isAccepted) {
            story = "notEnoughMoney";
        }
        else if (!packet.travelDone.isAccepted) {
            story = "travelRefused";
        }
        else {
            story = packet.isScam ? "scamTravelDone" : packet.isDisplayed ? "normalTravelDone" : "unknownDestinationTravelDone";
        }
        yield interaction.editReply({
            embeds: [
                new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("cart", StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:cart.${story}`, lng), interaction.user, lng)
            ]
        });
    });
}
//# sourceMappingURL=cart.js.map