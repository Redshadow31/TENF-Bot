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
exports.fightPetCollector = fightPetCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../utils/StringUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const i18n_1 = require("../translations/i18n");
const SmallEventsHandler_1 = require("../packetHandlers/handlers/SmallEventsHandler");
const DraftbotButtonReactionMessage_1 = require("../messages/DraftbotButtonReactionMessage");
const StringConstants_1 = require("../../../Lib/src/constants/StringConstants");
function getFightPetReactions(baseReactions, lng) {
    const reactions = [];
    for (const reaction of baseReactions) {
        reactions.push({
            customId: reaction.actionId,
            emote: DraftBotIcons_1.DraftBotIcons.fightPetActions[reaction.actionId],
            description: i18n_1.default.t(`smallEvents:fightPet.fightPetActions.${reaction.actionId}.name`, { lng })
        });
    }
    return reactions;
}
function fightPetCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const formatBaseOptions = {
            lng,
            context: data.isFemale ? StringConstants_1.StringConstants.SEX.MALE.long : StringConstants_1.StringConstants.SEX.FEMALE.long
        };
        const reactions = getFightPetReactions(packet.reactions.map(reaction => reaction.data), lng);
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("fightPet", `${(0, SmallEventsHandler_1.getRandomSmallEventIntro)(lng)}${StringUtils_1.StringUtils.getRandomTranslation("smallEvents:fightPet.intro", lng, Object.assign(Object.assign({}, formatBaseOptions), { feralPet: i18n_1.default.t("smallEvents:fightPet.customPetDisplay", Object.assign(Object.assign({}, formatBaseOptions), { petId: data.petId, petName: i18n_1.default.t(`models:pets.${data.petId}`, formatBaseOptions), adjective: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:fightPet.adjectives", lng, formatBaseOptions) })) }))} ${StringUtils_1.StringUtils.getRandomTranslation("smallEvents:fightPet.situation", lng)}`, interaction.user, lng);
        return yield new DraftbotButtonReactionMessage_1.DraftbotButtonReactionMessage(interaction, {
            reactions,
            embed,
            packet,
            context,
            canEndReact: true
        }).send();
    });
}
//# sourceMappingURL=fightPet.js.map