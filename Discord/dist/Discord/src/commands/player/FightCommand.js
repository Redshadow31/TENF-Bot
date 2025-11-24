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
exports.createFightCollector = createFightCollector;
exports.handleCommandFightRefusePacketRes = handleCommandFightRefusePacketRes;
exports.handleCommandFightIntroduceFightersRes = handleCommandFightIntroduceFightersRes;
exports.handleCommandFightUpdateStatusRes = handleCommandFightUpdateStatusRes;
exports.handleCommandFightHistoryItemRes = handleCommandFightHistoryItemRes;
exports.handleCommandFightAIFightActionChoose = handleCommandFightAIFightActionChoose;
exports.handleCommandFightActionChoose = handleCommandFightActionChoose;
exports.handleEndOfFight = handleEndOfFight;
exports.handleFightReward = handleFightReward;
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const PacketUtils_1 = require("../../utils/PacketUtils");
const CommandFightPacket_1 = require("../../../../Lib/src/packets/commands/CommandFightPacket");
const RandomUtils_1 = require("../../../../Lib/src/utils/RandomUtils");
const FightConstants_1 = require("../../../../Lib/src/constants/FightConstants");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const DraftbotFightStatusCachedMessage_1 = require("../../messages/DraftbotFightStatusCachedMessage");
const DraftbotCachedMessage_1 = require("../../messages/DraftbotCachedMessage");
const DraftbotHistoryCachedMessage_1 = require("../../messages/DraftbotHistoryCachedMessage");
const DraftbotActionChooseCachedMessage_1 = require("../../messages/DraftbotActionChooseCachedMessage");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const StringUtils_2 = require("../../../../Lib/src/utils/StringUtils");
const CommandFightCancelPacket_1 = require("../../../../Lib/src/packets/commands/CommandFightCancelPacket");
const DraftBotLogger_1 = require("../../../../Lib/src/logs/DraftBotLogger");
const DiscordConstants_1 = require("../../DiscordConstants");
const buggedFights = new Set();
function fightBugged(context, fightId) {
    buggedFights.add(fightId);
    PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(CommandFightCancelPacket_1.CommandFightCancelPacketReq, {
        fightId
    }));
    DraftBotLogger_1.DraftBotLogger.error("Fight bugged, cancelling fight");
}
function createFightCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const subTextKey = RandomUtils_1.RandomUtils.draftbotRandom.bool(FightConstants_1.FightConstants.RARE_SUB_TEXT_INTRO) ? "rare" : "common";
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:fight.title", {
            lng,
            pseudo: (0, StringUtils_2.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:fight.confirmDesc", {
            lng,
            pseudo: (0, StringUtils_2.escapeUsername)(interaction.user.displayName),
            confirmSubText: i18n_1.default.t(`commands:fight.confirmSubTexts.${subTextKey}`, { lng }),
            glory: i18n_1.default.t("commands:fight:information.glory", {
                lng,
                gloryPoints: data.playerStats.fightRanking.glory
            }),
            className: i18n_1.default.t("commands:fight:information.class", {
                lng,
                id: data.playerStats.classId
            }),
            stats: i18n_1.default.t("commands:fight:information.stats", {
                lng,
                baseBreath: data.playerStats.breath.base,
                breathRegen: data.playerStats.breath.regen,
                cumulativeAttack: data.playerStats.attack,
                cumulativeDefense: data.playerStats.defense,
                cumulativeHealth: data.playerStats.energy.value,
                cumulativeSpeed: data.playerStats.speed,
                cumulativeMaxHealth: data.playerStats.energy.max,
                maxBreath: data.playerStats.breath.max
            })
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context, {
            emojis: {
                accept: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.fightCommand.accept),
                refuse: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.fightCommand.refuse)
            }
        });
    });
}
function handleCommandFightRefusePacketRes(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:fight.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_2.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:fight.canceledDesc", {
                    lng
                }))
                    .setErrorColor()
            ]
        }));
    });
}
function addFightProfileFor(introEmbed, lng, fighterName, fightActions, opponentFightActionsCount, pet) {
    let fightActionsDisplay = fightActions.map(([actionId, breathCost]) => i18n_1.default.t("commands:fight.fightActionNameDisplay", {
        lng,
        fightActionEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.fightActions[actionId]),
        fightActionName: i18n_1.default.t(`models:fight_actions.${actionId}.name`, {
            lng,
            count: 1
        }),
        breathCost
    }))
        .join("\n");
    if (opponentFightActionsCount - fightActions.length > 0) {
        fightActionsDisplay += "\n".repeat(opponentFightActionsCount - fightActions.length);
    }
    const petDisplay = pet
        ? `\n\n${i18n_1.default.t("commands:fight.petOf", {
            lng,
            pseudo: fighterName
        })}\n${DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(pet, lng)}`
        : "";
    introEmbed.addFields({
        name: DiscordConstants_1.DiscordConstants.EMPTY_MESSAGE,
        value: `${i18n_1.default.t("commands:fight.actionsOf", {
            lng,
            pseudo: fighterName
        })}\n${fightActionsDisplay}${petDisplay}`,
        inline: true
    });
}
function handleCommandFightIntroduceFightersRes(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        if (buggedFights.has(packet.fightId)) {
            return;
        }
        try {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
            const lng = interaction.userLanguage;
            const getUser = packet.fightOpponentKeycloakId ? yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.fightOpponentKeycloakId) : undefined;
            if (getUser === null || getUser === void 0 ? void 0 : getUser.isError) {
                return;
            }
            const opponentDisplayName = getUser
                ? (0, StringUtils_2.escapeUsername)(getUser.payload.user.attributes.gameUsername[0])
                : i18n_1.default.t(`models:monsters.${packet.fightOpponentMonsterId}.name`, { lng });
            const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:fight.fightIntroTitle", {
                lng,
                fightInitiator: (0, StringUtils_2.escapeUsername)(interaction.user.displayName),
                opponent: (0, StringUtils_2.escapeUsername)(opponentDisplayName)
            }), interaction.user);
            addFightProfileFor(embed, lng, (0, StringUtils_2.escapeUsername)(interaction.user.displayName), packet.fightInitiatorActions, packet.fightOpponentActions.length, packet.fightInitiatorPet);
            addFightProfileFor(embed, lng, (0, StringUtils_2.escapeUsername)(opponentDisplayName), packet.fightOpponentActions, packet.fightInitiatorActions.length, packet.fightOpponentPet);
            yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({ embeds: [embed] }));
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(interaction.id, DraftbotHistoryCachedMessage_1.DraftbotHistoryCachedMessage)
                .post({ content: DiscordConstants_1.DiscordConstants.EMPTY_MESSAGE });
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(interaction.id, DraftbotFightStatusCachedMessage_1.DraftbotFightStatusCachedMessage)
                .post({ content: DiscordConstants_1.DiscordConstants.EMPTY_MESSAGE });
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(interaction.id, DraftbotActionChooseCachedMessage_1.DraftbotActionChooseCachedMessage)
                .post({ content: DiscordConstants_1.DiscordConstants.EMPTY_MESSAGE });
        }
        catch (e) {
            DraftBotLogger_1.DraftBotLogger.errorWithObj("Fight introduction failed", e);
            fightBugged(context, packet.fightId);
        }
    });
}
function handleCommandFightUpdateStatusRes(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (buggedFights.has(packet.fightId) || !((_a = context.discord) === null || _a === void 0 ? void 0 : _a.interaction)) {
            return;
        }
        try {
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(context.discord.interaction, DraftbotFightStatusCachedMessage_1.DraftbotFightStatusCachedMessage)
                .update(packet, context);
        }
        catch (e) {
            DraftBotLogger_1.DraftBotLogger.errorWithObj("Fight status update failed", e);
            fightBugged(context, packet.fightId);
        }
    });
}
function handleCommandFightHistoryItemRes(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (buggedFights.has(packet.fightId) || !((_a = context.discord) === null || _a === void 0 ? void 0 : _a.interaction)) {
            return;
        }
        try {
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(context.discord.interaction, DraftbotHistoryCachedMessage_1.DraftbotHistoryCachedMessage)
                .update(packet, context);
        }
        catch (e) {
            DraftBotLogger_1.DraftBotLogger.errorWithObj("Fight history update failed", e);
            fightBugged(context, packet.fightId);
        }
    });
}
function handleCommandFightAIFightActionChoose(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (buggedFights.has(packet.fightId) || !((_a = context.discord) === null || _a === void 0 ? void 0 : _a.interaction)) {
            return;
        }
        try {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(context.discord.interaction, DraftbotActionChooseCachedMessage_1.DraftbotActionChooseCachedMessage)
                .post({ embeds: [new DraftBotEmbed_1.DraftBotEmbed().setDescription(i18n_1.default.t("commands:fight.actions.aiChoose", { lng: interaction.userLanguage }))] });
            yield new Promise(f => setTimeout(f, packet.ms));
        }
        catch (e) {
            DraftBotLogger_1.DraftBotLogger.errorWithObj("Fight AI action choose failed", e);
            fightBugged(context, packet.fightId);
        }
    });
}
function handleCommandFightActionChoose(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const data = packet.data.data;
        if (buggedFights.has(data.fightId) || !((_a = context.discord) === null || _a === void 0 ? void 0 : _a.interaction)) {
            return null;
        }
        try {
            return yield DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(context.discord.interaction, DraftbotActionChooseCachedMessage_1.DraftbotActionChooseCachedMessage)
                .update(packet, context);
        }
        catch (e) {
            DraftBotLogger_1.DraftBotLogger.errorWithObj("Fight action choose failed", e);
            fightBugged(context, data.fightId);
            return null;
        }
    });
}
function handleEndOfFight(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!((_a = context.discord) === null || _a === void 0 ? void 0 : _a.interaction)) {
            return;
        }
        DraftbotCachedMessage_1.DraftbotCachedMessages.removeAllFromMessageId(context.discord.interaction, cachedMessage => {
            if (!(cachedMessage instanceof DraftbotHistoryCachedMessage_1.DraftbotHistoryCachedMessage)) {
                cachedMessage.delete()
                    .then();
            }
        });
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const getDisplayName = (keycloakId, monsterId) => __awaiter(this, void 0, void 0, function* () {
            if (keycloakId) {
                const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, keycloakId);
                if (getUser.isError) {
                    return i18n_1.default.t("error:unknownPlayer", { lng });
                }
                return (0, StringUtils_2.escapeUsername)(getUser.payload.user.attributes.gameUsername[0]);
            }
            return i18n_1.default.t(`models:monsters.${monsterId}.name`, { lng });
        });
        const winnerName = yield getDisplayName(packet.winner.keycloakId, packet.winner.monsterId);
        const looserName = yield getDisplayName(packet.looser.keycloakId, packet.looser.monsterId);
        let description = i18n_1.default.t("commands:fight.end.gameStats", {
            lng,
            turn: packet.turns,
            maxTurn: packet.maxTurns,
            time: (0, TimeUtils_1.minutesDisplay)((0, TimeUtils_1.millisecondsToMinutes)(new Date().valueOf() - interaction.createdTimestamp), lng)
        });
        [
            {
                name: winnerName,
                stats: packet.winner
            },
            {
                name: looserName,
                stats: packet.looser
            }
        ].forEach(fighter => {
            description += i18n_1.default.t("commands:fight.end.fighterStats", {
                lng,
                pseudo: fighter.name,
                energy: fighter.stats.finalEnergy,
                maxEnergy: fighter.stats.maxEnergy
            });
        });
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(packet.draw
            ? i18n_1.default.t("commands:fight.end.draw", {
                lng,
                player1: winnerName,
                player2: looserName
            })
            : i18n_1.default.t("commands:fight.end.win", {
                lng,
                winner: winnerName,
                loser: looserName
            }))
            .setDescription(description);
        const message = yield ((_b = interaction.channel) === null || _b === void 0 ? void 0 : _b.send({ embeds: [embed] }));
        yield (message === null || message === void 0 ? void 0 : message.react(EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.fightCommand.handshake)));
    });
}
function generateFightRewardField(embed, packet, lng, player1Username) {
    embed.addFields({
        name: i18n_1.default.t("commands:fight.fightReward.scoreAndMoneyField", { lng }),
        value: (() => {
            if (packet.money <= 0 && packet.points <= 0) {
                return i18n_1.default.t("commands:fight.fightReward.noReward", {
                    lng,
                    player: player1Username
                });
            }
            return [
                packet.money > 0
                    ? i18n_1.default.t("commands:fight.fightReward.money", {
                        lng,
                        player: player1Username,
                        count: packet.money
                    })
                    : "",
                packet.points > 0
                    ? i18n_1.default.t("commands:fight.fightReward.points", {
                        lng,
                        player: player1Username,
                        count: packet.points
                    })
                    : ""
            ].filter(Boolean)
                .join("\n");
        })(),
        inline: false
    });
}
function generateGloryChangesField(embed, packet, lng, player1Username, player2Username) {
    embed.addFields({
        name: i18n_1.default.t("commands:fight.fightReward.gloryField", { lng }),
        value: [
            ...[
                {
                    player: player1Username,
                    change: packet.player1.newGlory - packet.player1.oldGlory
                },
                {
                    player: player2Username,
                    change: packet.player2.newGlory - packet.player2.oldGlory
                }
            ].map(({ player, change }) => i18n_1.default.t(`commands:fight.fightReward.glory${change >= 0 ? "Positive" : "Negative"}`, {
                lng,
                count: Math.abs(change),
                player
            }))
        ].join(""),
        inline: false
    });
}
function displayLeagueChangesIfNeeded(embed, packet, lng, player1Username, player2Username) {
    const leagueChangeValue = [
        ...packet.player1.newLeagueId !== packet.player1.oldLeagueId
            ? [
                i18n_1.default.t(`commands:fight.fightReward.leagueChange${packet.player1.newLeagueId > packet.player1.oldLeagueId ? "Up" : "Down"}`, {
                    lng,
                    player: player1Username,
                    oldLeagueEmoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.leagues[packet.player1.oldLeagueId]),
                    newLeagueEmoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.leagues[packet.player1.newLeagueId]),
                    oldLeague: i18n_1.default.t(`models:leagues.${packet.player1.oldLeagueId}`, { lng }),
                    newLeague: i18n_1.default.t(`models:leagues.${packet.player1.newLeagueId}`, { lng })
                })
            ]
            : [],
        ...packet.player2.newLeagueId !== packet.player2.oldLeagueId
            ? [
                i18n_1.default.t(`commands:fight.fightReward.leagueChange${packet.player2.newLeagueId > packet.player2.oldLeagueId ? "Up" : "Down"}`, {
                    lng,
                    player: player2Username,
                    oldLeagueEmoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.leagues[packet.player2.oldLeagueId]),
                    newLeagueEmoji: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.leagues[packet.player2.newLeagueId]),
                    oldLeague: i18n_1.default.t(`models:leagues.${packet.player2.oldLeagueId}`, { lng }),
                    newLeague: i18n_1.default.t(`models:leagues.${packet.player2.newLeagueId}`, { lng })
                })
            ]
            : []
    ];
    if (leagueChangeValue.length > 0) {
        embed.addFields({
            name: i18n_1.default.t("commands:fight.fightReward.leagueField", { lng }),
            value: leagueChangeValue.join("\n"),
            inline: false
        });
    }
}
function generateFightRecapDescription(embed, packet, lng, player1Username, player2Username) {
    const player1Won = packet.player1.newGlory > packet.player1.oldGlory;
    const player2Won = packet.player2.newGlory > packet.player2.oldGlory;
    const gloryDifference = Math.abs(packet.player1.oldGlory - packet.player2.oldGlory);
    if (packet.draw) {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.draw", lng, {
            player1: player1Username,
            player2: player2Username
        }));
    }
    else if (gloryDifference < FightConstants_1.FightConstants.ELO.ELO_DIFFERENCE_FOR_SAME_ELO) {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.sameElo", lng, {
            player1: player1Username,
            player2: player2Username
        }));
    }
    else if (player1Won && packet.player1.oldGlory > packet.player2.oldGlory) {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.higherEloWins", lng, {
            winner: player1Username,
            loser: player2Username
        }));
    }
    else if (player2Won && packet.player2.oldGlory > packet.player1.oldGlory) {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.higherEloWins", lng, {
            winner: player2Username,
            loser: player1Username
        }));
    }
    else if (player1Won && packet.player1.oldGlory < packet.player2.oldGlory) {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.lowestEloWins", lng, {
            winner: player1Username,
            loser: player2Username
        }));
    }
    else {
        embed.setDescription(StringUtils_1.StringUtils.getRandomTranslation("commands:fight.fightReward.lowestEloWins", lng, {
            winner: player2Username,
            loser: player1Username
        }));
    }
}
function handleFightReward(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const getPlayer1 = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.player1.keycloakId);
        const getPlayer2 = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.player2.keycloakId);
        const player1Username = (0, StringUtils_2.escapeUsername)(getPlayer1.isError ? "Unknown" : getPlayer1.payload.user.attributes.gameUsername[0]);
        const player2Username = (0, StringUtils_2.escapeUsername)(getPlayer2.isError ? "Unknown" : getPlayer2.payload.user.attributes.gameUsername[0]);
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:fight.fightReward.title", {
            lng
        }));
        generateFightRewardField(embed, packet, lng, player1Username);
        generateGloryChangesField(embed, packet, lng, player1Username, player2Username);
        displayLeagueChangesIfNeeded(embed, packet, lng, player1Username, player2Username);
        generateFightRecapDescription(embed, packet, lng, player1Username, player2Username);
        yield ((_a = interaction.channel) === null || _a === void 0 ? void 0 : _a.send({ embeds: [embed] }));
    });
}
function getPacket(interaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const player = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, user);
        if (!player || !player.keycloakId) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandFightPacket_1.CommandFightPacketReq, { playerKeycloakId: player.keycloakId });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("fight"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=FightCommand.js.map