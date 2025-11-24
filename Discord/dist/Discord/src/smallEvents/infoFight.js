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
exports.infoFightResult = infoFightResult;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../utils/StringUtils");
function infoFightResult(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const intro = StringUtils_1.StringUtils.getRandomTranslation("smallEvents:infoFight.intro", lng);
        const description = StringUtils_1.StringUtils.getRandomTranslation("smallEvents:infoFight.fightActions", lng);
        yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [
                new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("infoFight", intro + description, interaction.user, lng)
            ]
        }));
    });
}
//# sourceMappingURL=infoFight.js.map