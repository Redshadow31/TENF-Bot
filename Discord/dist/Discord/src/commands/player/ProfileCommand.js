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
exports.handleCommandProfilePacketRes = handleCommandProfilePacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandProfilePacket_1 = require("../../../../Lib/src/packets/commands/CommandProfilePacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const DiscordCache_1 = require("../../bot/DiscordCache");
const ProfileConstants_1 = require("../../../../Lib/src/constants/ProfileConstants");
const PacketUtils_1 = require("../../utils/PacketUtils");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandProfilePacket_1.CommandProfilePacketReq, { askedPlayer });
    });
}
function sendMessageAllBadgesTooMuchBadges(gameUsername, badges, interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const lng = interaction.userLanguage;
        let content = "";
        for (const badgeId of badges) {
            const badgeEmote = DraftBotIcons_1.DraftBotIcons.badges[badgeId];
            if (badgeEmote) {
                content += `${badgeEmote} \`${i18n_1.default.t(`commands:profile.badges.${badgeId}`, { lng: interaction.userLanguage })}\`\n`;
            }
        }
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setTitle(i18n_1.default.t("commands:profile.badgeDisplay.title", {
                    lng,
                    pseudo: gameUsername
                }))
                    .setDescription(content + i18n_1.default.t("commands:profile.badgeDisplay.numberBadge", {
                    lng,
                    count: badges.length
                }))
            ]
        });
    });
}
function displayBadges(badges, msg) {
    return __awaiter(this, void 0, void 0, function* () {
        if (badges.length >= Constants_1.Constants.PROFILE.MAX_EMOTE_DISPLAY_NUMBER) {
            yield msg.react(DraftBotIcons_1.DraftBotIcons.profile.displayAllBadgeEmote);
            return;
        }
        for (const badgeId of badges) {
            const badgeEmote = DraftBotIcons_1.DraftBotIcons.badges[badgeId];
            if (badgeEmote) {
                yield msg.react(badgeEmote);
            }
        }
    });
}
function addField(fields, fieldKey, shouldBeFielded, replacements) {
    if (shouldBeFielded) {
        fields.push({
            name: i18n_1.default.t(`commands:profile.${fieldKey}.fieldName`, replacements),
            value: i18n_1.default.t(`commands:profile.${fieldKey}.fieldValue`, replacements),
            inline: false
        });
    }
}
function generateFields(packet, lng) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const fields = [];
    addField(fields, "information", true, {
        lng,
        health: packet.playerData.health.value,
        maxHealth: packet.playerData.health.max,
        money: packet.playerData.money,
        experience: packet.playerData.experience.value,
        experienceNeededToLevelUp: packet.playerData.experience.max
    });
    addField(fields, "statistics", Boolean(packet.playerData.stats), {
        lng,
        baseBreath: (_a = packet.playerData.stats) === null || _a === void 0 ? void 0 : _a.breath.base,
        breathRegen: (_b = packet.playerData.stats) === null || _b === void 0 ? void 0 : _b.breath.regen,
        cumulativeAttack: (_c = packet.playerData.stats) === null || _c === void 0 ? void 0 : _c.attack,
        cumulativeDefense: (_d = packet.playerData.stats) === null || _d === void 0 ? void 0 : _d.defense,
        cumulativeHealth: (_e = packet.playerData.stats) === null || _e === void 0 ? void 0 : _e.energy.value,
        cumulativeSpeed: (_f = packet.playerData.stats) === null || _f === void 0 ? void 0 : _f.speed,
        cumulativeMaxHealth: (_g = packet.playerData.stats) === null || _g === void 0 ? void 0 : _g.energy.max,
        maxBreath: (_h = packet.playerData.stats) === null || _h === void 0 ? void 0 : _h.breath.max
    });
    addField(fields, "mission", true, {
        lng,
        gems: packet.playerData.missions.gems,
        campaign: packet.playerData.missions.campaignProgression
    });
    addField(fields, packet.playerData.rank.unranked ? "unranked" : "ranking", true, {
        lng,
        score: packet.playerData.rank.score,
        rank: packet.playerData.rank.rank,
        numberOfPlayer: packet.playerData.rank.numberOfPlayers
    });
    addField(fields, packet.playerData.effect.healed ? "noTimeLeft" : "timeLeft", Boolean(packet.playerData.effect.hasTimeDisplay), {
        lng,
        effectId: packet.playerData.effect.effect,
        timeLeft: (0, TimeUtils_1.minutesDisplay)((0, TimeUtils_1.millisecondsToMinutes)(packet.playerData.effect.timeLeft), lng)
    });
    addField(fields, "playerClass", Boolean(packet.playerData.classId) || packet.playerData.classId === 0, {
        lng,
        id: packet.playerData.classId
    });
    addField(fields, "fightRanking", Boolean(packet.playerData.fightRanking), {
        lng,
        leagueEmoji: packet.playerData.fightRanking ? DraftBotIcons_1.DraftBotIcons.leagues[packet.playerData.fightRanking.league] : "",
        leagueId: packet.playerData.fightRanking ? packet.playerData.fightRanking.league : 0,
        gloryPoints: packet.playerData.fightRanking ? packet.playerData.fightRanking.glory : 0
    });
    addField(fields, "guild", Boolean(packet.playerData.guild), {
        lng,
        guild: packet.playerData.guild
    });
    addField(fields, "map", Boolean(packet.playerData.destinationId && packet.playerData.mapTypeId), {
        lng,
        mapTypeId: packet.playerData.mapTypeId,
        mapName: packet.playerData.destinationId
    });
    addField(fields, "pet", Boolean(packet.playerData.pet), {
        lng,
        rarity: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.unitValues.petRarity)
            .repeat((_k = (_j = packet.playerData.pet) === null || _j === void 0 ? void 0 : _j.rarity) !== null && _k !== void 0 ? _k : 0),
        emote: packet.playerData.pet ? DisplayUtils_1.DisplayUtils.getPetIcon((_l = packet.playerData.pet) === null || _l === void 0 ? void 0 : _l.typeId, (_m = packet.playerData.pet) === null || _m === void 0 ? void 0 : _m.sex) : "",
        name: packet.playerData.pet ? (_p = (_o = packet.playerData.pet) === null || _o === void 0 ? void 0 : _o.nickname) !== null && _p !== void 0 ? _p : DisplayUtils_1.DisplayUtils.getPetTypeName(lng, (_q = packet.playerData.pet) === null || _q === void 0 ? void 0 : _q.typeId, (_r = packet.playerData.pet) === null || _r === void 0 ? void 0 : _r.sex) : ""
    });
    return fields;
}
function handleCommandProfilePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const titleEffect = packet.playerData.effect.healed ? "healed" : packet.playerData.effect.effect;
        const pseudo = yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.keycloakId, lng);
        const reply = yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setColor(packet.playerData.color)
                    .setTitle(i18n_1.default.t("commands:profile.title", {
                    lng,
                    effectId: titleEffect,
                    pseudo,
                    level: (_a = packet.playerData) === null || _a === void 0 ? void 0 : _a.level
                }))
                    .addFields(generateFields(packet, lng))
            ],
            withResponse: true
        });
        if (!((_b = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _b === void 0 ? void 0 : _b.message)) {
            return;
        }
        const message = reply.resource.message;
        const collector = message.createReactionCollector({
            filter: (reaction) => reaction.me && !reaction.users.cache.last().bot,
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME,
            max: ProfileConstants_1.ProfileConstants.BADGE_MAXIMUM_REACTION
        });
        collector.on("collect", (reaction) => __awaiter(this, void 0, void 0, function* () {
            if (reaction.emoji.name === DraftBotIcons_1.DraftBotIcons.profile.displayAllBadgeEmote) {
                collector.stop();
                yield sendMessageAllBadgesTooMuchBadges(pseudo, packet.playerData.badges, interaction);
            }
            else {
                const badge = Object.entries(DraftBotIcons_1.DraftBotIcons.badges).find(badgeEntry => badgeEntry[1] === reaction.emoji.name);
                if (badge) {
                    interaction.channel.send({ content: `\`${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(reaction.emoji.name)} ${i18n_1.default.t(`commands:profile.badges.${badge[0]}`, { lng })}\`` })
                        .then((msg) => {
                        setTimeout(() => msg === null || msg === void 0 ? void 0 : msg.delete(), ProfileConstants_1.ProfileConstants.BADGE_DESCRIPTION_TIMEOUT);
                    });
                }
            }
        }));
        if (((_c = packet.playerData) === null || _c === void 0 ? void 0 : _c.badges.length) !== 0) {
            yield displayBadges(packet.playerData.badges, message);
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("profile")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("profile", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("profile", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=ProfileCommand.js.map