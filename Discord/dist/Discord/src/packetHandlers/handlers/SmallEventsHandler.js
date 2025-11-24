"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.getRandomSmallEventIntro = getRandomSmallEventIntro;
const PacketHandler_1 = require("../PacketHandler");
const SmallEventAdvanceTimePacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventAdvanceTimePacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftbotSmallEventEmbed_1 = require("../../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../../utils/StringUtils");
const SmallEventBigBadPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventBigBadPacket");
const SmallEventSmallBadPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventSmallBadPacket");
const SmallEventBigBadKind_1 = require("../../../../Lib/src/types/SmallEventBigBadKind");
const i18n_1 = require("../../translations/i18n");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const SmallEventBoatAdvicePacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventBoatAdvicePacket");
const SmallEventGoToPVEIslandPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventGoToPVEIslandPacket");
const SmallEventLotteryPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventLotteryPacket");
const SmallEventInteractOtherPlayers_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventInteractOtherPlayers");
const interactOtherPlayers_1 = require("../../smallEvents/interactOtherPlayers");
const SmallEventLeagueReward_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventLeagueReward");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const SmallEventWinGuildXPPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWinGuildXPPacket");
const SmallEventBonusGuildPVEIslandPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventBonusGuildPVEIslandPacket");
const SmallEventBotFactsPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventBotFactsPacket");
const SmallEventDoNothingPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventDoNothingPacket");
const SmallEventFightPetPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventFightPetPacket");
const SmallEventGobletsGamePacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventGobletsGamePacket");
const SmallEventShopPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventShopPacket");
const SmallEventStaffMemberPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventStaffMemberPacket");
const SmallEventWinEnergyPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWinEnergyPacket");
const SmallEventWinEnergyOnIslandPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWinEnergyOnIslandPacket");
const SmallEventWinHealthPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWinHealthPacket");
const SmallEventWinPersonalXPPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWinPersonalXPPacket");
const SmallEventWitchPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventWitchPacket");
const RandomUtils_1 = require("../../../../Lib/src/utils/RandomUtils");
const witch_1 = require("../../smallEvents/witch");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const SmallEventSpacePacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventSpacePacket");
const SmallEventFindPetPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventFindPetPacket");
const PetUtils_1 = require("../../utils/PetUtils");
const SmallEventFindPotionPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventFindPotionPacket");
const SmallEventFindItemPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventFindItemPacket");
const SmallEventPetPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventPetPacket");
const SmallEventClassPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventClassPacket");
const SmallEventUltimateFoodMerchantPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventUltimateFoodMerchantPacket");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const SmallEventCartPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventCartPacket");
const cart_1 = require("../../smallEvents/cart");
const SmallEventFindMissionPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventFindMissionPacket");
const MissionUtils_1 = require("../../utils/MissionUtils");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const shop_1 = require("../../smallEvents/shop");
const epicItemShop_1 = require("../../smallEvents/epicItemShop");
const SmallEventEpicItemShopPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventEpicItemShopPacket");
const Badge_1 = require("../../../../Lib/src/types/Badge");
const SmallEventDwarfPetFanPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventDwarfPetFanPacket");
const SmallEventInfoFightPacket_1 = require("../../../../Lib/src/packets/smallEvents/SmallEventInfoFightPacket");
const infoFight_1 = require("../../smallEvents/infoFight");
function getRandomSmallEventIntro(language) {
    return StringUtils_1.StringUtils.getRandomTranslation("smallEvents:intro", language);
}
class SmallEventsHandler {
    smallEventAdvanceTime(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const description = getRandomSmallEventIntro(lng)
                + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:advanceTime.stories", lng, { time: packet.amount });
            yield interaction.editReply({ embeds: [new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("advanceTime", description, interaction.user, lng)] });
        });
    }
    smallEventBigBad(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            let story;
            switch (packet.kind) {
                case SmallEventBigBadKind_1.SmallEventBigBadKind.LIFE_LOSS:
                    story = StringUtils_1.StringUtils.getRandomTranslation("smallEvents:bigBad.lifeLoss", lng, { lifeLoss: packet.lifeLost });
                    break;
                case SmallEventBigBadKind_1.SmallEventBigBadKind.ALTERATION:
                    story = `${i18n_1.default.t(`smallEvents:bigBad.alterationStories.${packet.receivedStory}`, { lng })} ${DraftBotIcons_1.DraftBotIcons.effects[packet.effectId]}`;
                    break;
                case SmallEventBigBadKind_1.SmallEventBigBadKind.MONEY_LOSS:
                    story = StringUtils_1.StringUtils.getRandomTranslation("smallEvents:bigBad.moneyLoss", lng, { moneyLost: packet.moneyLost });
                    break;
                default:
                    story = "";
            }
            const description = getRandomSmallEventIntro(lng) + story;
            yield interaction.editReply({ embeds: [new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("bigBad", description, interaction.user, lng)] });
        });
    }
    smallEventBoatAdvice(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const description = StringUtils_1.StringUtils.getRandomTranslation("smallEvents:boatAdvice.intro", lng, { advice: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:boatAdvice.advices", lng) });
            yield interaction.editReply({ embeds: [new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("boatAdvice", description, interaction.user, lng)] });
        });
    }
    smallEventGoToPVEIslandAccept(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            if (!interaction) {
                return;
            }
            const lng = context.discord.language;
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("goToPVEIsland", i18n_1.default.t(`smallEvents:goToPVEIsland.endStoryAccept${packet.alone ? "" : "WithMember"}`, {
                        lng,
                        gainScore: packet.pointsWon > 0
                            ? i18n_1.default.t("smallEvents:goToPVEIsland.confirmedScore", {
                                lng,
                                score: packet.pointsWon
                            })
                            : ""
                    }), interaction.user, lng)
                ]
            });
        });
    }
    smallEventGoToPVEIslandRefuse(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("goToPVEIsland", i18n_1.default.t("smallEvents:goToPVEIsland.endStoryRefuse", { lng }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventGoToPVEIslandNotEnoughGems(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("goToPVEIsland", i18n_1.default.t("smallEvents:goToPVEIsland.notEnoughGems", { lng }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventLotteryNoAnswer(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.editReply({
                embeds: [new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("lottery", i18n_1.default.t("smallEvents:lottery.end", { lng }), interaction.user, lng)]
            });
        });
    }
    smallEventLotteryPoor(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("lottery", i18n_1.default.t("smallEvents:lottery.poor", { lng }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventLotteryLose(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("lottery", i18n_1.default.t(`smallEvents:lottery.${packet.level}.${packet.moneyLost > 0 ? "failWithMalus" : "fail"}`, {
                        lng,
                        lostTime: packet.lostTime,
                        money: packet.moneyLost
                    }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventLotteryWin(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("lottery", i18n_1.default.t(`smallEvents:lottery.${packet.level}.success`, {
                        lng,
                        lostTime: packet.lostTime
                    }) + i18n_1.default.t(`smallEvents:lottery.rewardTypeText.${packet.winReward}`, {
                        lng,
                        reward: packet.winAmount
                    }), interaction.user, lng)
                ]
            }));
        });
    }
    static handleNoPlayerInteraction(interaction, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:interactOtherPlayers.no_one", lng), interaction.user, lng)
                ]
            });
        });
    }
    static handleEffectInteraction(interaction, packet, lng, playerDisplay) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:interactOtherPlayers.effect.${packet.data.effectId}`, lng, { playerDisplay }), interaction.user, lng)
                ]
            });
        });
    }
    static handleOtherInteractions(interaction, packet, lng, playerDisplay) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const hasPetInfo = packet.data.petId && packet.data.petSex;
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:interactOtherPlayers.${SmallEventInteractOtherPlayers_1.InteractOtherPlayerInteraction[packet.playerInteraction].toLowerCase()}`, lng, {
                        playerDisplay,
                        level: packet.data.level,
                        class: `${DraftBotIcons_1.DraftBotIcons.classes[packet.data.classId]} ${i18n_1.default.t(`models:classes.${packet.data.classId}`, { lng })}`,
                        advice: StringUtils_1.StringUtils.getRandomTranslation("advices:advices", lng),
                        petEmote: hasPetInfo ? DisplayUtils_1.DisplayUtils.getPetIcon(packet.data.petId, packet.data.petSex) : "",
                        petName: hasPetInfo ? DisplayUtils_1.DisplayUtils.getPetNicknameOrTypeName((_a = packet.data.petName) !== null && _a !== void 0 ? _a : null, packet.data.petId, packet.data.petSex, lng) : "",
                        guildName: packet.data.guildName,
                        weapon: DisplayUtils_1.DisplayUtils.getWeaponDisplay(packet.data.weaponId, lng),
                        armor: DisplayUtils_1.DisplayUtils.getArmorDisplay(packet.data.armorId, lng),
                        object: DisplayUtils_1.DisplayUtils.getObjectDisplay(packet.data.objectId, lng),
                        potion: DisplayUtils_1.DisplayUtils.getPotionDisplay(packet.data.potionId, lng)
                    }), interaction.user, lng)
                ]
            });
        });
    }
    smallEventInteractOtherPlayers(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            if (!packet.keycloakId) {
                yield SmallEventsHandler.handleNoPlayerInteraction(interaction, lng);
                return;
            }
            if (!packet.data) {
                throw new Error("No packet data defined in InteractOtherPlayers small event");
            }
            const playerDisplay = yield (0, interactOtherPlayers_1.interactOtherPlayerGetPlayerDisplay)(packet.keycloakId, packet.data.rank, lng);
            if (packet.playerInteraction === SmallEventInteractOtherPlayers_1.InteractOtherPlayerInteraction.EFFECT) {
                yield SmallEventsHandler.handleEffectInteraction(interaction, packet, lng, playerDisplay);
                return;
            }
            yield SmallEventsHandler.handleOtherInteractions(interaction, packet, lng, playerDisplay);
        });
    }
    smallEventInteractOtherPlayersAcceptToGivePoor(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:interactOtherPlayers.poor_give_money", lng), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventInteractOtherPlayersRefuseToGivePoor(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = context.discord.buttonInteraction ? DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction) : DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = context.discord.language;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:interactOtherPlayers.poor_dont_give_money", lng), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventLeagueReward(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const endMessage = i18n_1.default.t(`smallEvents:leagueReward.${packet.rewardToday ? "rewardToday" : packet.enoughFights ? "endMessage" : "notEnoughFight"}`, {
                lng,
                leagueId: packet.leagueId,
                rewards: i18n_1.default.t("smallEvents:leagueReward.reward", {
                    lng,
                    money: packet.money,
                    xp: packet.xp
                }),
                time: (0, TimeUtils_1.printTimeBeforeDate)(packet.nextRewardDate)
            });
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("leagueReward", getRandomSmallEventIntro(lng) + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:leagueReward.intrigue", lng) + endMessage, interaction.user, lng)
                ]
            });
        });
    }
    smallEventWinGuildXp(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("winGuildXP", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:winGuildXP.stories", lng, { guild: packet.guildName })
                        + i18n_1.default.t("smallEvents:winGuildXP.end", {
                            lng,
                            xp: packet.amount
                        }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventDoNothing(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("doNothing", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:doNothing.stories", interaction.userLanguage), interaction.user, interaction.userLanguage)
                ]
            }));
        });
    }
    smallEventStaffMember(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const staffMember = RandomUtils_1.RandomUtils.draftbotRandom.pick(Object.keys(i18n_1.default.t("smallEvents:staffMember.members", {
                returnObjects: true,
                lng
            })));
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("staffMember", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:staffMember.context", lng, {
                        pseudo: staffMember,
                        sentence: i18n_1.default.t(`smallEvents:staffMember.members.${staffMember}`, {
                            lng
                        })
                    }), interaction.user, lng)
                ]
            });
        });
    }
    smallEventWinEnergy(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("winEnergy", getRandomSmallEventIntro(lng) + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:winEnergy.stories", lng), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventWinFightPoints(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("winEnergyOnIsland", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:winEnergyOnIsland.stories", lng, { energy: packet.amount }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventWinHealth(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("winHealth", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:winHealth.stories", lng, { health: packet.amount }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventWinPersonalXP(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("winPersonalXP", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:winPersonalXP.stories", lng)
                        + i18n_1.default.t("smallEvents:winPersonalXP.end", {
                            lng,
                            xp: packet.amount
                        }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventWitchResult(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, witch_1.witchResult)(packet, context);
        });
    }
    smallEventFindPet(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const translationKey = packet.isPetReceived
                ? packet.petIsReceivedByGuild
                    ? "givePetGuild"
                    : "givePetPlayer"
                : packet.isPetFood
                    ? "food"
                    : "noFood";
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("findPet", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:findPet.${translationKey}`, lng, {
                            context: packet.petSex,
                            pet: PetUtils_1.PetUtils.petToShortString(lng, undefined, packet.petTypeID, packet.petSex)
                        }), interaction.user, lng)
                ]
            });
        });
    }
    smallEventSpaceInitial(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("space", i18n_1.default.t("smallEvents:space.before_search_format", {
                        lng,
                        seIntro: getRandomSmallEventIntro(lng),
                        intro: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.intro", lng, {
                            name: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.names", lng)
                        }),
                        searchAction: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.searchAction", lng),
                        search: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.search", lng)
                    }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventSpaceResult(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const oldMessage = (_a = (yield interaction.fetchReply()).embeds[0]) === null || _a === void 0 ? void 0 : _a.data.description;
            if (!oldMessage) {
                return;
            }
            const lng = interaction.userLanguage;
            const oneOrMoreDays = packet.values.mainValue > 1
                ? i18n_1.default.t("smallEvents:space.days_other", { lng })
                : i18n_1.default.t("smallEvents:space.days_one", { lng });
            yield interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("space", i18n_1.default.t("smallEvents:space.after_search_format", {
                        lng,
                        oldMessage: oldMessage.split(" ")
                            .slice(1)
                            .join(" "),
                        actionIntro: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.actionIntro", lng),
                        action: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.action", lng),
                        specific: StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:space.specific.${packet.chosenEvent}`, lng, {
                            mainValue: packet.chosenEvent === "moonPhase"
                                ? i18n_1.default.t("smallEvents:space.moonPhases", {
                                    returnObjects: true,
                                    lng
                                })[packet.values.mainValue]
                                : packet.values.mainValue,
                            objectWhichWillCrossTheSky: i18n_1.default.t("smallEvents:space.nObjectsCrossTheSky", {
                                lng,
                                count: packet.values.mainValue
                            }),
                            days: oneOrMoreDays,
                            randomObjectName: packet.values.randomObjectName,
                            randomObjectDistance: packet.values.randomObjectDistance,
                            randomObjectDiameter: packet.values.randomObjectDiameter
                        }),
                        outro: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:space.outro", lng)
                    }), interaction.user, lng)
                ]
            });
        });
    }
    smallEventBotFacts(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("botFacts", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:botFacts.stories", lng, {
                            botFact: i18n_1.default.t(`smallEvents:botFacts.possibleInfo.${packet.information}`, {
                                lng,
                                count: packet.infoNumber,
                                infoNumber: packet.infoNumber,
                                infoComplement: DisplayUtils_1.DisplayUtils.getClassDisplay(packet.infoComplement ? packet.infoComplement : 0, lng)
                            })
                        }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventSmallBad(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            const amountDisplay = packet.issue === SmallEventSmallBadPacket_1.SmallEventBadIssue.TIME
                ? (0, TimeUtils_1.minutesDisplay)(packet.amount, lng)
                : packet.amount;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("smallBad", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:smallBad.${packet.issue}.stories`, lng, { amount: amountDisplay }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventFindPotion(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("findPotion", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:findPotion.stories", lng), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventFindItem(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("findItem", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:findItem.stories", lng), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventPet(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("pet", StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:pet.stories.${packet.interactionName}`, lng, {
                        context: packet.petSex,
                        pet: PetUtils_1.PetUtils.petToShortString(lng, packet.petNickname, packet.petTypeId, packet.petSex),
                        amount: packet.amount,
                        food: packet.food ? DisplayUtils_1.DisplayUtils.getFoodDisplay(packet.food, 1, lng, false) : null,
                        badge: DraftBotIcons_1.DraftBotIcons.badges[Badge_1.Badge.LEGENDARY_PET],
                        randomAnimal: i18n_1.default.t("smallEvents:pet.randomAnimal", {
                            lng,
                            context: packet.randomPetSex,
                            randomAnimal: PetUtils_1.PetUtils.petToShortString(lng, undefined, packet.randomPetTypeId, packet.randomPetSex)
                        })
                    }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventClass(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("class", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:class.${packet.classKind}.${packet.interactionName}`, lng, {
                            amount: packet.amount
                        }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventUltimateFoodMerchant(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("ultimateFoodMerchant", getRandomSmallEventIntro(lng)
                        + StringUtils_1.StringUtils.getRandomTranslation("smallEvents:ultimateFoodMerchant.stories", lng)
                        + StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:ultimateFoodMerchant.rewards.${packet.interactionName}`, lng, {
                            count: packet.amount,
                            moneyEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.unitValues.money)
                        }), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventCart(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, cart_1.cartResult)(packet, context);
        });
    }
    smallEventBonusGuildPVEIsland(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("bonusGuildPVEIsland", `${i18n_1.default.t(`smallEvents:bonusGuildPVEIsland.events.${packet.event}.intro`, { lng })}\n\n${i18n_1.default.t(`smallEvents:bonusGuildPVEIsland.events.${packet.event}.${packet.result}.${packet.surrounding}`, {
                        lng,
                        amount: packet.amount,
                        emoteKey: packet.isExperienceGain ? "xp" : "guildPoint"
                    })}`, interaction.user, lng)
                ]
            }));
        });
    }
    smallEventFightPet(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.channel.send({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("fightPet", i18n_1.default.t(`smallEvents:fightPet.fightPetActions.${packet.fightPetActionId}.${packet.isSuccess ? "success" : "failure"}`, { lng })
                        + (packet.isSuccess
                            ? i18n_1.default.t("smallEvents:fightPet.rageUpFormat", {
                                lng,
                                rageUpDescription: StringUtils_1.StringUtils.getRandomTranslation("smallEvents:fightPet.rageUpDescriptions", lng)
                            })
                            : ""), interaction.user, lng)
                ]
            }));
        });
    }
    smallEventGobletsGame(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("commands:report.journal", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(i18n_1.default.t(`{emote:goblets.{{goblet}}} $t(smallEvents:gobletsGame.results.${packet.malus})`, {
                        lng,
                        quantity: packet.malus === SmallEventGobletsGamePacket_1.SmallEventGobletsGameMalus.TIME ? (0, TimeUtils_1.minutesDisplay)(packet.value) : packet.value,
                        goblet: (_a = packet.goblet) !== null && _a !== void 0 ? _a : RandomUtils_1.RandomUtils.draftbotRandom.pick(Object.keys(DraftBotIcons_1.DraftBotIcons.goblets))
                    }))
                ]
            });
        });
    }
    smallEventShopRefuse(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, shop_1.baseFunctionHandler)(context, "smallEvents:shop.refused");
        });
    }
    smallEventShopAccept(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, shop_1.baseFunctionHandler)(context, "smallEvents:shop.purchased");
        });
    }
    smallEventShopCannotBuy(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, shop_1.baseFunctionHandler)(context, "smallEvents:shop.notEnoughMoney");
        });
    }
    smallEventFindMission(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("findMission", `${getRandomSmallEventIntro(lng)}${StringUtils_1.StringUtils.getRandomTranslation("smallEvents:findMission.intrigue", lng)}\n\n**${MissionUtils_1.MissionUtils.formatBaseMission(packet.mission, lng)}**`, interaction.user, lng)
                ]
            }));
        });
    }
    smallEventEpicItemShopRefuse(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, epicItemShop_1.epicItemShopHandler)(context, "smallEvents:epicItemShop.refused");
        });
    }
    smallEventEpicItemShopAccept(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, epicItemShop_1.epicItemShopHandler)(context, "smallEvents:epicItemShop.purchased");
        });
    }
    smallEventEpicItemShopCannotBuy(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, epicItemShop_1.epicItemShopHandler)(context, "smallEvents:epicItemShop.notEnoughMoney");
        });
    }
    smallEventDwarfPetFan(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            const keyReward = packet.isGemReward ? "gem" : "money";
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                embeds: [
                    new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("dwarfPetFan", `${StringUtils_1.StringUtils.getRandomTranslation("smallEvents:dwarfPetFan.intro", lng)} ${StringUtils_1.StringUtils.getRandomTranslation(`smallEvents:dwarfPetFan.${packet.interactionName}`, lng, {
                        context: packet.petTypeId ? packet.petSex : "m",
                        pet: packet.petTypeId ? PetUtils_1.PetUtils.petToShortString(lng, packet.petNickname, packet.petTypeId, packet.petSex) : "",
                        reward: i18n_1.default.t(`smallEvents:dwarfPetFan.reward.${keyReward}`, {
                            lng,
                            amount: packet.amount
                        })
                    })}`, interaction.user, lng)
                ]
            }));
        });
    }
    smallEventInfoFight(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, infoFight_1.infoFightResult)(context);
        });
    }
}
exports.default = SmallEventsHandler;
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventAdvanceTimePacket_1.SmallEventAdvanceTimePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventAdvanceTimePacket_1.SmallEventAdvanceTimePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventAdvanceTime", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventBigBadPacket_1.SmallEventBigBadPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventBigBadPacket_1.SmallEventBigBadPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventBigBad", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventBoatAdvicePacket_1.SmallEventBoatAdvicePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventBoatAdvicePacket_1.SmallEventBoatAdvicePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventBoatAdvice", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandAcceptPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandAcceptPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventGoToPVEIslandAccept", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandRefusePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandRefusePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventGoToPVEIslandRefuse", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandNotEnoughGemsPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventGoToPVEIslandPacket_1.SmallEventGoToPVEIslandNotEnoughGemsPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventGoToPVEIslandNotEnoughGems", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventLotteryPacket_1.SmallEventLotteryNoAnswerPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventLotteryPacket_1.SmallEventLotteryNoAnswerPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventLotteryNoAnswer", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventLotteryPacket_1.SmallEventLotteryPoorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventLotteryPacket_1.SmallEventLotteryPoorPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventLotteryPoor", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventLotteryPacket_1.SmallEventLotteryLosePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventLotteryPacket_1.SmallEventLotteryLosePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventLotteryLose", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventLotteryPacket_1.SmallEventLotteryWinPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventLotteryPacket_1.SmallEventLotteryWinPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventLotteryWin", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventInteractOtherPlayers", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersAcceptToGivePoorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersAcceptToGivePoorPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventInteractOtherPlayersAcceptToGivePoor", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersRefuseToGivePoorPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventInteractOtherPlayers_1.SmallEventInteractOtherPlayersRefuseToGivePoorPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventInteractOtherPlayersRefuseToGivePoor", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventLeagueReward_1.SmallEventLeagueRewardPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventLeagueReward_1.SmallEventLeagueRewardPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventLeagueReward", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWinGuildXPPacket_1.SmallEventWinGuildXPPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWinGuildXPPacket_1.SmallEventWinGuildXPPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWinGuildXp", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventDoNothingPacket_1.SmallEventDoNothingPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventDoNothingPacket_1.SmallEventDoNothingPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventDoNothing", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventStaffMemberPacket_1.SmallEventStaffMemberPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventStaffMemberPacket_1.SmallEventStaffMemberPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventStaffMember", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWinEnergyPacket_1.SmallEventWinEnergyPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWinEnergyPacket_1.SmallEventWinEnergyPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWinEnergy", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWinEnergyOnIslandPacket_1.SmallEventWinEnergyOnIslandPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWinEnergyOnIslandPacket_1.SmallEventWinEnergyOnIslandPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWinFightPoints", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWinHealthPacket_1.SmallEventWinHealthPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWinHealthPacket_1.SmallEventWinHealthPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWinHealth", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWinPersonalXPPacket_1.SmallEventWinPersonalXPPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWinPersonalXPPacket_1.SmallEventWinPersonalXPPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWinPersonalXP", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventWitchPacket_1.SmallEventWitchResultPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventWitchPacket_1.SmallEventWitchResultPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventWitchResult", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventFindPetPacket_1.SmallEventFindPetPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventFindPetPacket_1.SmallEventFindPetPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventFindPet", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventSpacePacket_1.SmallEventSpaceInitialPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventSpacePacket_1.SmallEventSpaceInitialPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventSpaceInitial", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventSpacePacket_1.SmallEventSpaceResultPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventSpacePacket_1.SmallEventSpaceResultPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventSpaceResult", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventBotFactsPacket_1.SmallEventBotFactsPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventBotFactsPacket_1.SmallEventBotFactsPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventBotFacts", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventSmallBadPacket_1.SmallEventSmallBadPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventSmallBadPacket_1.SmallEventSmallBadPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventSmallBad", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventFindPotionPacket_1.SmallEventFindPotionPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventFindPotionPacket_1.SmallEventFindPotionPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventFindPotion", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventFindItemPacket_1.SmallEventFindItemPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventFindItemPacket_1.SmallEventFindItemPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventFindItem", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventPetPacket_1.SmallEventPetPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventPetPacket_1.SmallEventPetPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventPet", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventClassPacket_1.SmallEventClassPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventClassPacket_1.SmallEventClassPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventClass", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventUltimateFoodMerchantPacket_1.SmallEventUltimateFoodMerchantPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventUltimateFoodMerchantPacket_1.SmallEventUltimateFoodMerchantPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventUltimateFoodMerchant", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventCartPacket_1.SmallEventCartPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventCartPacket_1.SmallEventCartPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventCart", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventBonusGuildPVEIslandPacket_1.SmallEventBonusGuildPVEIslandPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventBonusGuildPVEIslandPacket_1.SmallEventBonusGuildPVEIslandPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventBonusGuildPVEIsland", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventFightPetPacket_1.SmallEventFightPetPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventFightPetPacket_1.SmallEventFightPetPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventFightPet", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventGobletsGamePacket_1.SmallEventGobletsGamePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventGobletsGamePacket_1.SmallEventGobletsGamePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventGobletsGame", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventShopPacket_1.SmallEventShopRefusePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventShopPacket_1.SmallEventShopRefusePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventShopRefuse", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventShopPacket_1.SmallEventShopAcceptPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventShopPacket_1.SmallEventShopAcceptPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventShopAccept", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventShopPacket_1.SmallEventShopCannotBuyPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventShopPacket_1.SmallEventShopCannotBuyPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventShopCannotBuy", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventFindMissionPacket_1.SmallEventFindMissionPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventFindMissionPacket_1.SmallEventFindMissionPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventFindMission", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopRefusePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopRefusePacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventEpicItemShopRefuse", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopAcceptPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopAcceptPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventEpicItemShopAccept", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopCannotBuyPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventEpicItemShopPacket_1.SmallEventEpicItemShopCannotBuyPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventEpicItemShopCannotBuy", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventDwarfPetFanPacket_1.SmallEventDwarfPetFanPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventDwarfPetFanPacket_1.SmallEventDwarfPetFanPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventDwarfPetFan", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(SmallEventInfoFightPacket_1.SmallEventInfoFightPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SmallEventInfoFightPacket_1.SmallEventInfoFightPacket]),
    __metadata("design:returntype", Promise)
], SmallEventsHandler.prototype, "smallEventInfoFight", null);
//# sourceMappingURL=SmallEventsHandler.js.map