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
exports.handleCommandMissionPlayerNotFoundPacket = handleCommandMissionPlayerNotFoundPacket;
exports.handleCommandMissionsPacketRes = handleCommandMissionsPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const CommandMissionsPacket_1 = require("../../../../Lib/src/packets/commands/CommandMissionsPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const CompletedMission_1 = require("../../../../Lib/src/types/CompletedMission");
const MissionUtils_1 = require("../../utils/MissionUtils");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const v10_1 = require("discord-api-types/v10");
const StringUtils_1 = require("../../../../Lib/src/utils/StringUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandMissionsPacket_1.CommandMissionsPacketReq, { askedPlayer });
    });
}
function handleCommandMissionPlayerNotFoundPacket(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield (interaction === null || interaction === void 0 ? void 0 : interaction.reply({
            embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:playerDoesntExist", { lng: interaction.userLanguage }))],
            flags: v10_1.MessageFlags.Ephemeral
        }));
    });
}
function getCampaignMissionPart(packet, lng) {
    if (!packet.campaignProgression) {
        return i18n_1.default.t("commands:missions.subcategories.campaignCompleted", { lng });
    }
    const campaignMission = packet.missions.find(mission => mission.missionType === CompletedMission_1.MissionType.CAMPAIGN);
    return `${i18n_1.default.t("commands:missions.subcategories.campaignCurrent", {
        lng,
        current: packet.campaignProgression,
        max: packet.maxCampaignNumber
    })}\n${i18n_1.default.t("commands:missions.missionDisplay", {
        lng,
        mission: MissionUtils_1.MissionUtils.formatBaseMission(campaignMission, lng),
        progressionBar: MissionUtils_1.MissionUtils.generateDisplayProgression(campaignMission.numberDone, campaignMission.missionObjective),
        current: campaignMission.numberDone,
        objective: campaignMission.missionObjective,
        context: "campaign"
    })}`;
}
function getDailyMissionPart(packet, lng) {
    var _a;
    const dailyMission = packet.missions.find(mission => mission.missionType === CompletedMission_1.MissionType.DAILY);
    const missionDisplayKey = (0, TimeUtils_1.datesAreOnSameDay)(new Date(), new Date((_a = dailyMission.expiresAt) !== null && _a !== void 0 ? _a : 0))
        ? "dailyFinished"
        : "missionDisplay";
    return `${i18n_1.default.t("commands:missions.subcategories.daily", {
        lng
    })}\n${i18n_1.default.t(`commands:missions.${missionDisplayKey}`, {
        lng,
        time: (0, TimeUtils_1.finishInTimeDisplay)((0, TimeUtils_1.getTomorrowMidnight)()),
        mission: MissionUtils_1.MissionUtils.formatBaseMission(dailyMission, lng),
        progressionBar: MissionUtils_1.MissionUtils.generateDisplayProgression(dailyMission.numberDone, dailyMission.missionObjective),
        current: dailyMission.numberDone,
        objective: dailyMission.missionObjective,
        context: "other"
    })}`;
}
function getSideMissionsPart(packet, lng) {
    const sideMissions = packet.missions.filter(mission => mission.missionType === CompletedMission_1.MissionType.NORMAL);
    return `${i18n_1.default.t("commands:missions.subcategories.sideMissions", {
        lng,
        current: sideMissions.length,
        max: packet.maxSideMissionSlots
    })}\n${sideMissions.length > 0
        ? sideMissions.map(mission => i18n_1.default.t("commands:missions.missionDisplay", {
            lng,
            mission: MissionUtils_1.MissionUtils.formatBaseMission(mission, lng),
            progressionBar: MissionUtils_1.MissionUtils.generateDisplayProgression(mission.numberDone, mission.missionObjective),
            current: mission.numberDone,
            objective: mission.missionObjective,
            time: (0, TimeUtils_1.finishInTimeDisplay)(new Date(mission.expiresAt)),
            context: "other"
        }))
            .join("\n\n")
        : i18n_1.default.t("commands:missions.noCurrentMissions", {
            lng
        })}`;
}
function handleCommandMissionsPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.keycloakId);
        if (getUser.isError) {
            return;
        }
        const discordUser = getUser.payload.user.attributes.discordId
            ? (_a = DraftBotShard_1.draftBotClient.users.cache.get(getUser.payload.user.attributes.discordId[0])) !== null && _a !== void 0 ? _a : yield DraftBotShard_1.draftBotClient.users.fetch(getUser.payload.user.attributes.discordId[0])
            : null;
        const missionCommandEmbed = new DraftBotEmbed_1.DraftBotEmbed();
        if (discordUser) {
            missionCommandEmbed.formatAuthor(i18n_1.default.t("commands:missions.title", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(discordUser.displayName)
            }), discordUser);
        }
        else {
            missionCommandEmbed.setTitle(i18n_1.default.t("commands:missions.title", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(getUser.payload.user.username)
            }));
        }
        missionCommandEmbed.setDescription([
            getCampaignMissionPart(packet, lng),
            getDailyMissionPart(packet, lng),
            getSideMissionsPart(packet, lng)
        ].join("\n"));
        yield interaction.reply({
            embeds: [missionCommandEmbed]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("missions")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("missions", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("missions", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=MissionsCommand.js.map