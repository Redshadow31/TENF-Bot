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
exports.getCommandGuildDailyRewardPacketString = getCommandGuildDailyRewardPacketString;
exports.handleCommandGuildDailyRewardPacket = handleCommandGuildDailyRewardPacket;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandGuildDailyPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildDailyPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const i18n_1 = require("../../translations/i18n");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const StringConstants_1 = require("../../../../Lib/src/constants/StringConstants");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildDailyPacket_1.CommandGuildDailyPacketReq, {});
}
function manageGivenReward(rewardKey, quantity, lng) {
    return quantity
        ? `${i18n_1.default.t(`commands:guildDaily.rewards.${rewardKey}`, {
            lng,
            quantity
        })}\n`
        : "";
}
function getCommandGuildDailyRewardPacketString(packet, lng) {
    var _a, _b;
    let desc = "";
    const rewards = {
        fullHeal: packet.fullHeal,
        advanceTime: packet.advanceTime,
        personalXP: packet.personalXp,
        guildXP: packet.guildXp,
        superBadge: packet.superBadge,
        badge: packet.badge,
        money: packet.money,
        partialHeal: packet.heal,
        [((_a = packet.alteration) === null || _a === void 0 ? void 0 : _a.healAmount) ? "alterationHeal" : "alterationNoHeal"]: packet.alteration ? (_b = packet.alteration.healAmount) !== null && _b !== void 0 ? _b : 1 : undefined,
        petFood: packet.commonFood
    };
    for (const [key, value] of Object.entries(rewards)) {
        desc += manageGivenReward(key, value, lng);
    }
    if (packet.pet) {
        desc += `${i18n_1.default.t("commands:guildDaily.rewards.pet", {
            lng,
            context: packet.pet.isFemale ? StringConstants_1.StringConstants.SEX.FEMALE.long : StringConstants_1.StringConstants.SEX.MALE.long,
            pet: DisplayUtils_1.DisplayUtils.getPetDisplay(packet.pet.typeId, packet.pet.isFemale ? StringConstants_1.StringConstants.SEX.FEMALE.short : StringConstants_1.StringConstants.SEX.MALE.short, lng),
            petId: packet.pet.typeId
        })}\n`;
    }
    return desc;
}
function handleCommandGuildDailyRewardPacket(packet, context, reply) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:guildDaily.rewardTitle", {
            lng,
            guildName: packet.guildName
        }), interaction.user)
            .setDescription(getCommandGuildDailyRewardPacketString(packet, lng));
        if (reply) {
            if (interaction.deferred) {
                yield interaction.editReply({
                    embeds: [embed]
                });
            }
            else {
                yield interaction.reply({
                    embeds: [embed]
                });
            }
        }
        else {
            yield interaction.channel.send({
                embeds: [embed]
            });
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildDaily"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildDailyCommand.js.map