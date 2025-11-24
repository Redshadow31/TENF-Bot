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
exports.commandInfo = void 0;
exports.handleMissionShopBadge = handleMissionShopBadge;
exports.handleMissionShopMoney = handleMissionShopMoney;
exports.handleMissionShopKingsFavor = handleMissionShopKingsFavor;
exports.handleLovePointsValueShopItem = handleLovePointsValueShopItem;
exports.skipMissionShopItemCollector = skipMissionShopItemCollector;
exports.skipMissionShopResult = skipMissionShopResult;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandMissionShopPacket_1 = require("../../../../Lib/src/packets/commands/CommandMissionShopPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const PetUtils_1 = require("../../utils/PetUtils");
const StringUtils_1 = require("../../utils/StringUtils");
const MissionUtils_1 = require("../../utils/MissionUtils");
const ReactionCollectorSkipMissionShopItem_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSkipMissionShopItem");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const Badge_1 = require("../../../../Lib/src/types/Badge");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandMissionShopPacket_1.CommandMissionShopPacketReq, {});
}
function handleBasicMissionShopItem(context, descriptionString, descriptionFormat) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:missionsshop.success", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t(descriptionString, Object.assign({ lng }, descriptionFormat)))
            ]
        });
    });
}
function handleMissionShopBadge(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleBasicMissionShopItem(context, "commands:shop.badgeBought", { badgeName: Badge_1.Badge.MISSION_COMPLETER });
    });
}
function handleMissionShopMoney(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleBasicMissionShopItem(context, "commands:shop.shopItems.money.giveDescription", { amount: packet.amount });
    });
}
function handleMissionShopKingsFavor(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleBasicMissionShopItem(context, "commands:shop.shopItems.kingsFavor.giveDescription", { thousandPoints: Constants_1.Constants.MISSION_SHOP.THOUSAND_POINTS });
    });
}
function handleLovePointsValueShopItem(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.shopItems.lovePointsValue.giveTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.shopItems.lovePointsValue.giveDesc", {
                    lng,
                    petName: PetUtils_1.PetUtils.petToShortString(lng, packet.nickname, packet.typeId, packet.sex),
                    commentOnPetAge: i18n_1.default.t("commands:shop.shopItems.lovePointsValue.ageComment", {
                        lng,
                        context: packet.ageCategory,
                        age: packet.petId - 1
                    }),
                    actualLP: packet.lovePoints,
                    diet: PetUtils_1.PetUtils.getDietDisplay(packet.diet, lng),
                    nextFeed: PetUtils_1.PetUtils.getFeedCooldownDisplay(packet.nextFeed, lng),
                    commentOnFightEffect: StringUtils_1.StringUtils.getRandomTranslation(`commands:shop.shopItems.lovePointsValue.commentOnFightEffect.${packet.fightAssistId}`, lng),
                    commentOnResult: StringUtils_1.StringUtils.getRandomTranslation(`commands:shop.shopItems.lovePointsValue.advice.${packet.loveLevel}`, lng)
                }))
            ]
        });
    });
}
function skipMissionShopItemCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:shop.shopItems.skipMission.giveTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(`${i18n_1.default.t("commands:shop.shopItems.skipMission.giveDesc", {
            lng
        })}\n\n`);
        const reactions = packet.reactions
            .map(reaction => reaction.data)
            .filter(reaction => reaction.mission);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createChoiceListCollector(interaction, {
            packet,
            context
        }, {
            embed,
            items: reactions.map(reaction => MissionUtils_1.MissionUtils.formatBaseMission(reaction.mission, lng))
        }, {
            refuse: {
                can: true,
                reactionIndex: packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorSkipMissionShopItem_1.ReactionCollectorSkipMissionShopItemCloseReaction.name)
            },
            sendManners: DiscordCollectorUtils_1.SEND_POLITICS.ALWAYS_FOLLOWUP
        });
    });
}
function skipMissionShopResult(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.shopItems.skipMission.successTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(`${i18n_1.default.t("commands:shop.shopItems.skipMission.successDescription", {
                    lng,
                    mission: MissionUtils_1.MissionUtils.formatBaseMission(packet.oldMission, lng)
                })}\n${i18n_1.default.t("commands:shop.shopItems.skipMission.getNewMission", {
                    lng,
                    mission: MissionUtils_1.MissionUtils.formatBaseMission(packet.newMission, lng)
                })}`)
            ]
        }));
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("missionsshop"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=MissionShop.js.map