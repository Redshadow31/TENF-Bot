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
exports.goToPVEIslandCollector = goToPVEIslandCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const i18n_1 = require("../translations/i18n");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const SmallEventsHandler_1 = require("../packetHandlers/handlers/SmallEventsHandler");
const StringUtils_1 = require("../utils/StringUtils");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
function goToPVEIslandCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("goToPVEIsland", `${(0, SmallEventsHandler_1.getRandomSmallEventIntro)(lng)
            + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:goToPVEIsland.stories", lng, {
                priceText: i18n_1.default.t(`smallEvents:goToPVEIsland.price${data.price === 0 ? "Free" : "Money"}`, {
                    lng,
                    price: data.price
                })
            })}\n\n${i18n_1.default.t("smallEvents:goToPVEIsland.confirm", {
            lng,
            energy: data.energy.current,
            energyMax: data.energy.max
        })}`, interaction.user, lng);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
//# sourceMappingURL=goToPVEIsland.js.map