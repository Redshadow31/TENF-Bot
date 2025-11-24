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
exports.handleCommandTopPacketResScore = handleCommandTopPacketResScore;
exports.handleCommandTopPacketResGlory = handleCommandTopPacketResGlory;
exports.handleCommandTopPacketResGuild = handleCommandTopPacketResGuild;
exports.handleCommandTopInvalidPagePacket = handleCommandTopInvalidPagePacket;
exports.handleCommandTopPlayersEmptyPacket = handleCommandTopPlayersEmptyPacket;
exports.handleCommandTopGuildsEmptyPacket = handleCommandTopGuildsEmptyPacket;
const CommandTopPacket_1 = require("../../../../Lib/src/packets/commands/CommandTopPacket");
const i18n_1 = require("../../translations/i18n");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const Language_1 = require("../../../../Lib/src/Language");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const TopTimings_1 = require("../../../../Lib/src/types/TopTimings");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const TopDataType_1 = require("../../../../Lib/src/types/TopDataType");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        yield interaction.deferReply();
        const subCommand = interaction.options.getSubcommand();
        const timing = (_a = interaction.options.getString("timing")) !== null && _a !== void 0 ? _a : TopTimings_1.TopTiming.ALL_TIME;
        const page = (_b = interaction.options.getInteger("page")) !== null && _b !== void 0 ? _b : undefined;
        return (0, DraftBotPacket_1.makePacket)(CommandTopPacket_1.CommandTopPacketReq, {
            timing,
            dataType: subCommand === i18n_1.default.t("discordBuilder:top.subcommands.score.name", { lng: Language_1.LANGUAGE.ENGLISH })
                ? TopDataType_1.TopDataType.SCORE
                : subCommand === i18n_1.default.t("discordBuilder:top.subcommands.glory.name", { lng: Language_1.LANGUAGE.ENGLISH })
                    ? TopDataType_1.TopDataType.GLORY
                    : TopDataType_1.TopDataType.GUILD,
            page
        });
    });
}
function addTimingOption(builder) {
    builder.addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("top", "timing", option)
        .addChoices({
        name: i18n_1.default.t("discordBuilder:top.timings.allTime", { lng: Language_1.LANGUAGE.ENGLISH }),
        name_localizations: {
            fr: i18n_1.default.t("discordBuilder:top.timings.allTime", { lng: Language_1.LANGUAGE.FRENCH })
        },
        value: TopTimings_1.TopTiming.ALL_TIME
    }, {
        name: i18n_1.default.t("discordBuilder:top.timings.weekly", { lng: Language_1.LANGUAGE.ENGLISH }),
        name_localizations: {
            fr: i18n_1.default.t("discordBuilder:top.timings.weekly", { lng: Language_1.LANGUAGE.FRENCH })
        },
        value: TopTimings_1.TopTiming.WEEK
    }));
}
function addPageOption(builder) {
    builder.addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("top", "page", option)
        .setMinValue(1)
        .setRequired(false));
}
function getScoreSubCommand() {
    const builder = SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateSubCommand("top", "score");
    addTimingOption(builder);
    addPageOption(builder);
    return builder;
}
function getGlorySubCommand() {
    const builder = SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateSubCommand("top", "glory");
    addPageOption(builder);
    return builder;
}
function getGuildSubCommand() {
    const builder = SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateSubCommand("top", "guild");
    addPageOption(builder);
    return builder;
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("top")
        .addSubcommand(getScoreSubCommand())
        .addSubcommand(getGlorySubCommand())
        .addSubcommand(getGuildSubCommand()),
    getPacket,
    mainGuildCommand: false
};
function getBadgeForPosition(rank, sameContext, contextElementPosition) {
    switch (rank) {
        case 1:
            return DraftBotIcons_1.DraftBotIcons.top.badges.first;
        case 2:
            return DraftBotIcons_1.DraftBotIcons.top.badges.second;
        case 3:
            return DraftBotIcons_1.DraftBotIcons.top.badges.third;
        case 4:
            return DraftBotIcons_1.DraftBotIcons.top.badges.fourth;
        case 5:
            return DraftBotIcons_1.DraftBotIcons.top.badges.fifth;
        default:
            return sameContext
                ? contextElementPosition === rank
                    ? DraftBotIcons_1.DraftBotIcons.top.badges.self
                    : DraftBotIcons_1.DraftBotIcons.top.badges.sameContext
                : DraftBotIcons_1.DraftBotIcons.top.badges.default;
    }
}
function formatScoreAttributes(element, lng) {
    let attributes = "";
    if (element.attributes["1"].afk) {
        attributes += `${DraftBotIcons_1.DraftBotIcons.top.afk} | `;
    }
    else if (element.attributes["1"].effectId) {
        attributes += `${DraftBotIcons_1.DraftBotIcons.effects[element.attributes["1"].effectId]} | `;
    }
    else if (element.attributes["1"].mapType) {
        attributes += `${DraftBotIcons_1.DraftBotIcons.mapTypes[element.attributes["1"].mapType]} | `;
    }
    attributes += `\`${element.attributes["2"]}\` | \`${i18n_1.default.t("commands:top.level", {
        lng,
        level: element.attributes["3"]
    })}\``;
    return attributes;
}
function formatGloryAttributes(element, lng) {
    return `${DraftBotIcons_1.DraftBotIcons.leagues[element.attributes["1"].toString(10)]} | \`${element.attributes["2"]}\` | \`${i18n_1.default.t("commands:top.level", {
        lng,
        level: element.attributes["3"]
    })}\``;
}
function formatGuildAttributes(element, lng) {
    return `\`${element.attributes["1"]}\` | \`${i18n_1.default.t("commands:top.level", {
        lng,
        level: element.attributes["2"]
    })}\``;
}
function getTopDescription(packet, textKeys, formatAttributes, lng, playerUsername) {
    if (packet.elements.length <= 0) {
        return i18n_1.default.t(textKeys.nobodyInTop.key, Object.assign({ lng }, textKeys.nobodyInTop.replacements));
    }
    let desc = "";
    for (let i = 0; i < packet.elements.length; i++) {
        const element = packet.elements[i];
        desc += `${getBadgeForPosition(element.rank, element.sameContext, packet.contextRank)} ${textKeys.overriddenElementTexts ? textKeys.overriddenElementTexts[i] : element.text} | ${formatAttributes(element, lng)}\n`;
    }
    desc += `\n${i18n_1.default.t(textKeys.yourRankTitle, { lng })}\n`;
    if (packet.contextRank) {
        desc += i18n_1.default.t(textKeys.yourRank, {
            lng,
            badge: getBadgeForPosition(packet.contextRank, true, packet.contextRank),
            pseudo: playerUsername,
            rank: packet.contextRank,
            total: packet.totalElements,
            count: packet.totalElements
        });
        if (packet.contextRank < packet.minRank || packet.contextRank > packet.maxRank) {
            desc += ` ${i18n_1.default.t(textKeys.youRankAtPage, {
                lng,
                page: Math.ceil(packet.contextRank / packet.elementsPerPage),
                maxPage: Math.ceil(packet.totalElements / packet.elementsPerPage)
            })}`;
        }
    }
    else if (packet.canBeRanked) {
        desc += i18n_1.default.t(textKeys.yourRankNone.key, Object.assign({ lng, pseudo: playerUsername }, textKeys.yourRankNone.replacements));
    }
    else if (textKeys.cantBeRanked) {
        desc += i18n_1.default.t(textKeys.cantBeRanked, { lng });
    }
    return desc;
}
function handleGenericTopPacketRes(context, packet, textKeys, formatAttributes) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const title = i18n_1.default.t(textKeys.title, {
            lng,
            minRank: packet.minRank,
            maxRank: packet.maxRank
        });
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setTitle(title)
                    .setDescription(getTopDescription(packet, textKeys, formatAttributes, lng, yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng)))
            ]
        });
    });
}
function getOverriddenPlayersUsernames(elements, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield KeycloakUtils_1.KeycloakUtils.getUsersFromIds(DraftBotShard_1.keycloakConfig, elements.map(e => e.text));
        const unknownUsername = i18n_1.default.t("error:unknownPlayer", { lng });
        if (req.isError) {
            return elements.map(_ => unknownUsername);
        }
        return req.payload.users
            .map(u => (u ? (0, StringUtils_1.escapeUsername)(u.attributes.gameUsername[0]) : unknownUsername));
    });
}
function handleCommandTopPacketResScore(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleGenericTopPacketRes(context, packet, {
            title: packet.timing === TopTimings_1.TopTiming.ALL_TIME
                ? "commands:top.titleScoreAllTime"
                : "commands:top.titleScoreWeekly",
            yourRankTitle: "commands:top.yourRankTitle",
            yourRank: packet.contextRank === 1 ? "commands:top.yourRankFirst" : "commands:top.yourRank",
            yourRankNone: {
                key: "commands:top.yourRankNoneScore",
                replacements: {}
            },
            youRankAtPage: "commands:top.yourRankAtPage",
            nobodyInTop: {
                key: "commands:top.nobodyInTopPlayers", replacements: {}
            },
            overriddenElementTexts: yield getOverriddenPlayersUsernames(packet.elements, context.discord.language)
        }, formatScoreAttributes);
    });
}
function handleCommandTopPacketResGlory(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleGenericTopPacketRes(context, packet, {
            title: "commands:top.titleGlory",
            yourRankTitle: "commands:top.yourRankTitle",
            yourRank: packet.contextRank === 1 ? "commands:top.yourRankFirst" : "commands:top.yourRank",
            yourRankNone: {
                key: "commands:top.yourRankNoneGlory",
                replacements: {
                    needFight: packet.needFight,
                    count: packet.needFight
                }
            },
            youRankAtPage: "commands:top.yourRankAtPage",
            nobodyInTop: {
                key: "commands:top.nobodyInTopGlory",
                replacements: {
                    needFight: packet.needFight
                }
            },
            overriddenElementTexts: yield getOverriddenPlayersUsernames(packet.elements, context.discord.language)
        }, formatGloryAttributes);
    });
}
function handleCommandTopPacketResGuild(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        yield handleGenericTopPacketRes(context, packet, {
            title: "commands:top.titleGuild",
            yourRankTitle: "commands:top.yourRankGuildTitle",
            yourRank: packet.contextRank === 1 ? "commands:top.yourRankGuildFirst" : "commands:top.yourRankGuild",
            yourRankNone: {
                key: "commands:top.yourRankNoneGuild",
                replacements: {}
            },
            youRankAtPage: "commands:top.yourRankAtPageGuild",
            nobodyInTop: {
                key: "commands:top.nobodyInTopGuilds",
                replacements: {}
            },
            cantBeRanked: "commands:top.noGuild"
        }, formatGuildAttributes);
    });
}
function handleCommandTopInvalidPagePacket(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.editReply({
            embeds: [
                new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("commands:top.invalidPage", {
                    lng: interaction.userLanguage,
                    minPage: packet.minPage,
                    maxPage: packet.maxPage
                }))
            ]
        });
    });
}
function handleCommandTopPlayersEmptyPacket(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.editReply({
            embeds: [
                new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t(packet.needFight ? "commands:top.nobodyInTopGlory" : "commands:top.nobodyInTopPlayers", {
                    lng: interaction.userLanguage, needFight: packet.needFight ? packet.needFight : 0
                }))
            ]
        });
    });
}
function handleCommandTopGuildsEmptyPacket(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.editReply({
            embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("commands:top.nobodyInTopGuilds", { lng: interaction.userLanguage }))]
        });
    });
}
//# sourceMappingURL=TopCommand.js.map