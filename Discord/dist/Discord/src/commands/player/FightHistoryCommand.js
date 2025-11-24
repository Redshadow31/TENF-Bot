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
exports.handlePacketHistoryRes = handlePacketHistoryRes;
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandFightHistoryPacket_1 = require("../../../../Lib/src/packets/commands/CommandFightHistoryPacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const StringUtils_1 = require("../../utils/StringUtils");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const EloGameResult_1 = require("../../../../Lib/src/types/EloGameResult");
const FightConstants_1 = require("../../../../Lib/src/constants/FightConstants");
const DraftBotPaginatedEmbed_1 = require("../../messages/DraftBotPaginatedEmbed");
function getLeagueChange(lng, leagueChange) {
    if (!leagueChange) {
        return "";
    }
    return i18n_1.default.t(leagueChange.oldLeague < leagueChange.newLeague
        ? "commands:fightHistory.leagueChanges.up"
        : "commands:fightHistory.leagueChanges.down", {
        lng,
        oldLeagueId: leagueChange.oldLeague,
        newLeagueId: leagueChange.newLeague
    });
}
function buildPacketHistoryDescription(history, start, end, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        let desc = "";
        for (let i = end - 1; i >= start; i--) {
            const fight = history[i];
            const isViewerInitiator = fight.initiator;
            const attackSentence = i18n_1.default.t(isViewerInitiator ? "commands:fightHistory.attackSentence.attacker" : "commands:fightHistory.attackSentence.defender", {
                opponentClassId: fight.classes.opponent,
                opponent: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(fight.opponentKeycloakId, lng),
                lng
            });
            const resultSentence = i18n_1.default.t(fight.result === EloGameResult_1.EloGameResult.LOSS
                ? "commands:fightHistory.resultSentence.lost"
                : fight.result === EloGameResult_1.EloGameResult.WIN
                    ? "commands:fightHistory.resultSentence.won"
                    : "commands:fightHistory.resultSentence.draw", {
                lng
            });
            const leagueChange = isViewerInitiator ? fight.glory.leaguesChanges.me : fight.glory.leaguesChanges.opponent;
            const meLeagueChange = getLeagueChange(lng, leagueChange);
            desc += `${i18n_1.default.t("commands:fightHistory.historyLine", {
                lng,
                date: (0, TimeUtils_1.dateDisplay)(new Date(fight.date)),
                attackSentence,
                resultSentence,
                meInitialGlory: fight.glory.initial.me,
                meFinalGlory: fight.glory.initial.me + fight.glory.change.me,
                opponentInitialGlory: fight.glory.initial.opponent,
                opponentFinalGlory: fight.glory.initial.opponent + fight.glory.change.opponent,
                meLeagueChange
            })}\n\n`;
        }
        return desc;
    });
}
function getFightHistoryPages(packet, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        const pagesCount = Math.ceil(packet.history.length / FightConstants_1.FightConstants.HISTORY_DISPLAY_LIMIT);
        const descriptions = [];
        for (let i = 0; i < pagesCount; i++) {
            const start = i * FightConstants_1.FightConstants.HISTORY_DISPLAY_LIMIT;
            const end = Math.min(start + FightConstants_1.FightConstants.HISTORY_DISPLAY_LIMIT, packet.history.length);
            const pageDescription = yield buildPacketHistoryDescription(packet.history, start, end, lng);
            descriptions.push(pageDescription);
        }
        return descriptions.reverse();
    });
}
function handlePacketHistoryRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (packet.history.length === 0) {
            yield (0, ErrorUtils_1.handleClassicError)(context, i18n_1.default.t("commands:fightHistory.noHistory", { lng: context.discord.language }));
            return;
        }
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const viewerKeycloakId = context.keycloakId;
        if (!viewerKeycloakId) {
            return;
        }
        const pages = yield getFightHistoryPages(packet, lng);
        yield new DraftBotPaginatedEmbed_1.DraftBotPaginatedEmbed({
            lng,
            pages,
            selectedPageIndex: pages.length - 1
        }).formatAuthor(i18n_1.default.t("commands:fightHistory.title", {
            lng, pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .send(interaction);
    });
}
function getPacket(interaction, _user) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandFightHistoryPacket_1.CommandFightHistoryPacketReq, {});
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("fightHistory"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=FightHistoryCommand.js.map