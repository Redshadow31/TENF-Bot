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
exports.createBigEventCollector = createBigEventCollector;
exports.reportResult = reportResult;
exports.chooseDestinationCollector = chooseDestinationCollector;
exports.handleStartPveFight = handleStartPveFight;
exports.refusePveFight = refusePveFight;
exports.displayMonsterReward = displayMonsterReward;
exports.reportTravelSummary = reportTravelSummary;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandReportPacket_1 = require("../../../../Lib/src/packets/commands/CommandReportPacket");
const i18n_1 = require("../../translations/i18n");
const discord_js_1 = require("discord.js");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const Effect_1 = require("../../../../Lib/src/types/Effect");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const ReportConstants_1 = require("../../../../Lib/src/constants/ReportConstants");
const DiscordConstants_1 = require("../../DiscordConstants");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandReportPacket_1.CommandReportPacketReq, {});
    });
}
function createBigEventCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const reactions = packet.reactions.map(reaction => reaction.data);
        const rows = [new discord_js_1.ActionRowBuilder()];
        let eventText = `${i18n_1.default.t(`events:${data.eventId}.text`, {
            lng
        })}\n\n`;
        for (const possibility of reactions) {
            if (possibility.name !== ReportConstants_1.ReportConstants.END_POSSIBILITY_ID) {
                const emoji = EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.events[data.eventId.toString()][possibility.name]);
                const button = new discord_js_1.ButtonBuilder()
                    .setEmoji((0, discord_js_1.parseEmoji)(emoji))
                    .setCustomId(possibility.name)
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                if (rows[rows.length - 1].components.length >= DiscordConstants_1.DiscordConstants.MAX_BUTTONS_PER_ROW) {
                    rows.push(new discord_js_1.ActionRowBuilder());
                }
                rows[rows.length - 1].addComponents(button);
                const reactionText = `${emoji} ${i18n_1.default.t(`events:${data.eventId}.possibilities.${possibility.name}.text`, {
                    lng
                })}`;
                eventText += `${reactionText}\n`;
            }
        }
        const msg = (yield interaction.editReply({
            content: i18n_1.default.t("commands:report.doEvent", {
                lng,
                event: eventText,
                pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng)
            }),
            components: rows
        }));
        let responded = false;
        const respondToEvent = (possibilityName, buttonInteraction) => {
            if (!responded) {
                responded = true;
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, reactions.findIndex(reaction => reaction.name === possibilityName));
            }
        };
        const buttonCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        const endCollector = msg.createReactionCollector({
            time: packet.endTime - Date.now(),
            filter: (reaction, user) => reaction.emoji.name === DraftBotIcons_1.DraftBotIcons.messages.notReplied && user.id === interaction.user.id
        });
        buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            yield buttonInteraction.deferReply();
            respondToEvent(buttonInteraction.customId, buttonInteraction);
        }));
        endCollector.on("collect", () => {
            respondToEvent(ReportConstants_1.ReportConstants.END_POSSIBILITY_ID, null);
        });
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [buttonCollector, endCollector];
    });
}
function getReportResultConditionTriplets(packet, lng) {
    var _a;
    return [
        [
            packet.score,
            "points",
            { score: packet.score }
        ],
        [
            packet.money < 0,
            "moneyLoose",
            { money: -packet.money }
        ],
        [
            packet.money > 0,
            "money",
            { money: packet.money }
        ],
        [
            packet.health < 0,
            "healthLoose",
            { health: -packet.health }
        ],
        [
            packet.health > 0,
            "health",
            { health: packet.health }
        ],
        [
            packet.energy,
            "energy",
            { energy: packet.energy }
        ],
        [
            packet.gems,
            "gems",
            { gems: packet.gems }
        ],
        [
            packet.experience,
            "experience",
            { experience: packet.experience }
        ],
        [
            ((_a = packet.effect) === null || _a === void 0 ? void 0 : _a.name) === Effect_1.Effect.OCCUPIED.id,
            "timeLost",
            { timeLost: packet.effect ? (0, TimeUtils_1.minutesDisplay)(packet.effect.time, lng) : 0 }
        ]
    ];
}
function reportResult(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const result = getReportResultConditionTriplets(packet, lng)
            .map(triplet => (triplet[0]
            ? i18n_1.default.t(`commands:report.${triplet[1]}`, Object.assign({ lng }, triplet[2]))
            : ""))
            .join("");
        const content = i18n_1.default.t("commands:report.doPossibility", {
            lng,
            pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng),
            result,
            event: i18n_1.default.t(`events:${packet.eventId}.possibilities.${packet.possibilityId}.outcomes.${packet.outcomeId}`, { lng }),
            emoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(packet.possibilityId === ReportConstants_1.ReportConstants.END_POSSIBILITY_ID
                ? DraftBotIcons_1.DraftBotIcons.events[packet.eventId].end[packet.outcomeId]
                : DraftBotIcons_1.DraftBotIcons.events[packet.eventId][packet.possibilityId]),
            alte: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(packet.effect && packet.effect.name !== Effect_1.Effect.OCCUPIED.id ? DraftBotIcons_1.DraftBotIcons.effects[packet.effect.name] : "")
        });
        const buttonInteraction = ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.buttonInteraction) ? DiscordCache_1.DiscordCache.getButtonInteraction((_b = context.discord) === null || _b === void 0 ? void 0 : _b.buttonInteraction) : null;
        if (buttonInteraction) {
            yield buttonInteraction.editReply({ content });
        }
        else {
            yield interaction.channel.send({ content });
        }
    });
}
function chooseDestinationCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed();
        embed.formatAuthor(i18n_1.default.t("commands:report.destinationTitle", {
            lng,
            pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng)
        }), interaction.user);
        embed.setDescription(`${i18n_1.default.t("commands:report.chooseDestinationIndications", { lng })}\n\n`);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createChoiceListCollector(interaction, {
            packet,
            context
        }, {
            embed,
            items: packet.reactions.map(reaction => {
                const destinationReaction = reaction.data;
                const duration = destinationReaction.tripDuration
                    ? (0, TimeUtils_1.minutesDisplay)(destinationReaction.tripDuration, lng)
                    : (0, TimeUtils_1.minutesDisplay)(120, lng)
                        .replace("2", "?");
                return `${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[destinationReaction.mapTypeId])} ${i18n_1.default.t(`models:map_locations.${destinationReaction.mapId}.name`, { lng })} (${duration})`;
            })
        }, {
            refuse: {
                can: false
            }
        });
    });
}
function isCurrentlyInEffect(packet, now) {
    var _a;
    const effectStartTime = packet.effectEndTime && packet.effectDuration ? packet.effectEndTime - packet.effectDuration : 0;
    return !(now < effectStartTime || now > ((_a = packet.effectEndTime) !== null && _a !== void 0 ? _a : 0));
}
function generateTravelPathString(packet, now) {
    var _a, _b, _c;
    const tripDuration = packet.arriveTime - packet.startTime - ((_a = packet.effectDuration) !== null && _a !== void 0 ? _a : 0);
    let playerTravelledTime = now - packet.startTime;
    const isInEffectTime = isCurrentlyInEffect(packet, now);
    const effectStartTime = packet.effectEndTime && packet.effectDuration ? packet.effectEndTime - packet.effectDuration : 0;
    if (now > ((_b = packet.effectEndTime) !== null && _b !== void 0 ? _b : 0)) {
        playerTravelledTime -= (_c = packet.effectDuration) !== null && _c !== void 0 ? _c : 0;
    }
    else if (isInEffectTime) {
        playerTravelledTime -= now - effectStartTime;
    }
    const playerRemainingTravelTime = tripDuration - playerTravelledTime;
    let percentage = playerTravelledTime / tripDuration;
    const remainingHours = Math.max(Math.floor((0, TimeUtils_1.millisecondsToHours)(playerRemainingTravelTime)), 0);
    let remainingMinutes = Math.floor((0, TimeUtils_1.millisecondsToMinutes)(playerRemainingTravelTime - remainingHours * 3600000));
    if (remainingMinutes === 60) {
        remainingMinutes = 59;
    }
    if (remainingMinutes <= 0 && remainingHours === 0) {
        remainingMinutes = 1;
    }
    const timeRemainingString = `**[${remainingHours}h${remainingMinutes < 10 ? "0" : ""}${remainingMinutes}]**`;
    if (percentage > 1) {
        percentage = 1;
    }
    let index = Constants_1.Constants.REPORT.PATH_SQUARE_COUNT * percentage;
    index = Math.floor(index);
    let str = `${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.startMap.type])} `;
    for (let j = 0; j < Constants_1.Constants.REPORT.PATH_SQUARE_COUNT; ++j) {
        if (j === index) {
            if (!isInEffectTime) {
                str += packet.isOnBoat ? "🚢" : "🧍";
            }
            else {
                str += EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.effects[packet.effect]);
            }
        }
        else {
            str += "■";
        }
        if (j === Math.floor(Constants_1.Constants.REPORT.PATH_SQUARE_COUNT / 2) - 1) {
            str += timeRemainingString;
        }
    }
    return `${str} ${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.endMap.type])}`;
}
function handleStartPveFight(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const msg = i18n_1.default.t("commands:report.pveEvent", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
            event: i18n_1.default.t(`models:pveMapsStory.${data.mapId}.${data.monster.id}`, { lng }),
            monsterDisplay: i18n_1.default.t("commands:report.encounterMonsterStats", {
                lng,
                monsterName: i18n_1.default.t(`models:monsters.${data.monster.id}.name`, { lng }),
                emoji: DraftBotIcons_1.DraftBotIcons.monsters[data.monster.id],
                description: i18n_1.default.t(`models:monsters.${data.monster.id}.description`, { lng }),
                level: data.monster.level,
                energy: data.monster.energy,
                attack: data.monster.attack,
                defense: data.monster.defense,
                speed: data.monster.speed
            })
        });
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, msg, packet, context, {
            emojis: {
                accept: DraftBotIcons_1.DraftBotIcons.pveFights.startFight,
                refuse: DraftBotIcons_1.DraftBotIcons.pveFights.waitABit
            }
        });
    });
}
function refusePveFight(_packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            content: i18n_1.default.t("commands:report.pveFightRefused", {
                lng: originalInteraction.userLanguage,
                pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
            })
        }));
    });
}
function displayMonsterReward(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const lng = originalInteraction.userLanguage;
        const { user, channel } = originalInteraction;
        const descriptionParts = [];
        descriptionParts.push(i18n_1.default.t("commands:report.monsterRewardsDescription", {
            lng,
            money: packet.money,
            experience: packet.experience
        }));
        if (packet.guildXp > 0) {
            descriptionParts.push(i18n_1.default.t("commands:report.monsterRewardGuildXp", {
                lng,
                guildXp: packet.guildXp
            }));
        }
        if (packet.guildPoints > 0) {
            descriptionParts.push(i18n_1.default.t("commands:report.monsterRewardsGuildPoints", {
                lng,
                guildPoints: packet.guildPoints
            }));
        }
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:report.rewardEmbedTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(user.displayName)
        }), user)
            .setDescription(descriptionParts.join("\n"));
        yield channel.send({ embeds: [embed] });
    });
}
function manageMainSummaryText({ packet, lng, travelEmbed }, escapedPseudo, now) {
    if (isCurrentlyInEffect(packet, now)) {
        const errorMessageObject = (0, ErrorUtils_1.effectsErrorTextValue)(escapedPseudo, lng, true, packet.effect, packet.effectEndTime - now);
        travelEmbed.addFields({
            name: errorMessageObject.title,
            value: errorMessageObject.description,
            inline: false
        });
        return;
    }
    if (packet.nextStopTime > packet.arriveTime) {
        travelEmbed.addFields({
            name: i18n_1.default.t("commands:report.travellingTitle", { lng }),
            value: i18n_1.default.t("commands:report.travellingDescriptionEndTravel", { lng })
        });
        return;
    }
    const timeBeforeSmallEvent = (0, TimeUtils_1.printTimeBeforeDate)(packet.nextStopTime);
    travelEmbed.addFields({
        name: i18n_1.default.t("commands:report.travellingTitle", { lng }),
        value: packet.lastSmallEventId
            ? i18n_1.default.t("commands:report.travellingDescription", {
                lng,
                smallEventEmoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.smallEvents[packet.lastSmallEventId]),
                time: timeBeforeSmallEvent
            })
            : i18n_1.default.t("commands:report.travellingDescriptionWithoutSmallEvent", {
                lng,
                time: timeBeforeSmallEvent
            })
    });
}
function manageEndPathDescriptions({ packet, lng, travelEmbed }) {
    travelEmbed.addFields({
        name: i18n_1.default.t("commands:report.startPoint", { lng }),
        value: `${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.startMap.type])} ${i18n_1.default.t(`models:map_locations.${packet.startMap.id}.name`, { lng })}`,
        inline: true
    });
    travelEmbed.addFields({
        name: i18n_1.default.t("commands:report.endPoint", { lng }),
        value: `${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.endMap.type])} ${i18n_1.default.t(`models:map_locations.${packet.endMap.id}.name`, { lng })}`,
        inline: true
    });
}
function reportTravelSummary(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const now = Date.now();
        const travelEmbed = new DraftBotEmbed_1.DraftBotEmbed();
        travelEmbed.formatAuthor(i18n_1.default.t("commands:report.travelPathTitle", { lng }), interaction.user);
        travelEmbed.setDescription(generateTravelPathString(packet, now));
        const fieldsArguments = {
            packet,
            lng,
            travelEmbed
        };
        manageEndPathDescriptions(fieldsArguments);
        manageMainSummaryText(fieldsArguments, yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng), now);
        if (packet.energy.show) {
            travelEmbed.addFields({
                name: i18n_1.default.t("commands:report.remainingEnergyTitle", { lng }),
                value: `${DraftBotIcons_1.DraftBotIcons.unitValues.energy} ${packet.energy.current} / ${packet.energy.max}`,
                inline: true
            });
        }
        if (packet.points.show) {
            travelEmbed.addFields({
                name: i18n_1.default.t("commands:report.collectedPointsTitle", { lng }),
                value: `${DraftBotIcons_1.DraftBotIcons.unitValues.score} ${packet.points.cumulated}`,
                inline: true
            });
        }
        const advices = i18n_1.default.t("advices:advices", {
            returnObjects: true,
            lng
        });
        travelEmbed.addFields({
            name: i18n_1.default.t("commands:report.adviceTitle", { lng }),
            value: advices[Math.floor(Math.random() * advices.length)],
            inline: true
        });
        yield interaction.editReply({ embeds: [travelEmbed] });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("report"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=ReportCommand.js.map