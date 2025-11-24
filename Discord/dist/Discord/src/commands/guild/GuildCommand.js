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
exports.handleCommandGuildPacketRes = handleCommandGuildPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandGuildPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const GuildConstants_1 = require("../../../../Lib/src/constants/GuildConstants");
const ColorConstants_1 = require("../../../../Lib/src/constants/ColorConstants");
const StringUtils_1 = require("../../../../Lib/src/utils/StringUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const guildNameOption = interaction.options.get("guild");
        const askedGuildName = guildNameOption ? guildNameOption.value : undefined;
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandGuildPacket_1.CommandGuildPacketReq, {
            askedPlayer,
            askedGuildName
        });
    });
}
function getMemberTypeIcon(member, packet) {
    return member.id === packet.data.chiefId
        ? DraftBotIcons_1.DraftBotIcons.guild.chief
        : member.id === packet.data.elderId
            ? DraftBotIcons_1.DraftBotIcons.guild.elder
            : DraftBotIcons_1.DraftBotIcons.guild.member;
}
function getIslandStatusIcon(member, lng) {
    return member.islandStatus.isOnPveIsland || member.islandStatus.isOnBoat || member.islandStatus.isPveIslandAlly || member.islandStatus.cannotBeJoinedOnBoat
        ? i18n_1.default.t("commands:guild.separator", { lng })
            + (member.islandStatus.isOnPveIsland
                ? DraftBotIcons_1.DraftBotIcons.guild.isOnPveIsland
                : "")
            + (member.islandStatus.isOnBoat
                ? DraftBotIcons_1.DraftBotIcons.guild.isOnBoat
                : "")
            + (member.islandStatus.isPveIslandAlly
                ? DraftBotIcons_1.DraftBotIcons.guild.countAsAnAlly
                : "")
            + (member.islandStatus.cannotBeJoinedOnBoat
                ? DraftBotIcons_1.DraftBotIcons.guild.cannotBeJoinedOnBoat
                : "")
        : "";
}
function handleCommandGuildPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        if (!packet.foundGuild) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:guildDoesntExist", { lng }))
                ]
            });
            return;
        }
        let membersInfo = "";
        for (const member of packet.data.members) {
            membersInfo += i18n_1.default.t("commands:guild.memberInfo", {
                lng,
                icon: getMemberTypeIcon(member, packet),
                pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(member.keycloakId, lng),
                ranking: member.rank,
                score: member.score,
                islandStatusIcon: getIslandStatusIcon(member, lng)
            });
        }
        const guildCommandEmbed = new DraftBotEmbed_1.DraftBotEmbed()
            .setThumbnail(GuildConstants_1.GuildConstants.ICON)
            .setTitle(i18n_1.default.t("commands:guild.embedTitle", {
            lng,
            guildName: (_a = packet.data) === null || _a === void 0 ? void 0 : _a.name,
            level: (_b = packet.data) === null || _b === void 0 ? void 0 : _b.level
        }))
            .addFields({
            name: i18n_1.default.t("commands:guild.members", {
                lng,
                memberCount: packet.data.members.length,
                maxGuildMembers: GuildConstants_1.GuildConstants.MAX_GUILD_MEMBERS
            }),
            value: membersInfo
        });
        if (packet.data.level >= GuildConstants_1.GuildConstants.GOLDEN_GUILD_LEVEL) {
            guildCommandEmbed.setColor(ColorConstants_1.ColorConstants.GOLD);
        }
        if (packet.data.description) {
            guildCommandEmbed.setDescription(i18n_1.default.t("commands:guild.description", {
                lng,
                description: (_c = packet.data) === null || _c === void 0 ? void 0 : _c.description
            }));
        }
        const pveIslandInfo = packet.data.members.some(member => member.keycloakId === context.keycloakId)
            ? i18n_1.default.t("commands:guild.islandInfo", {
                lng,
                membersOnPveIsland: packet.data.members.filter(member => member.islandStatus.isPveIslandAlly).length
            })
            : "";
        const experienceInfo = packet.data.isMaxLevel
            ? i18n_1.default.t("commands:guild.xpMax", {
                lng
            })
            : i18n_1.default.t("commands:guild.xpNeeded", {
                lng,
                xp: packet.data.experience.value,
                xpToLevelUp: packet.data.experience.max
            });
        const rankingInfo = packet.data.rank.rank > -1
            ? i18n_1.default.t("commands:guild.ranking", {
                lng,
                rank: packet.data.rank.rank,
                rankTotal: packet.data.rank.numberOfGuilds
            })
            : i18n_1.default.t("commands:guild.notRanked", {
                lng
            });
        guildCommandEmbed.addFields({
            name: i18n_1.default.t("commands:guild.infoTitle", {
                lng,
                memberCount: packet.data.members.length,
                maxGuildMembers: GuildConstants_1.GuildConstants.MAX_GUILD_MEMBERS
            }),
            value: `${pveIslandInfo}${i18n_1.default.t("commands:guild.info", {
                lng,
                experience: experienceInfo,
                guildPoints: packet.data.rank.score,
                ranking: rankingInfo,
                interpolation: {
                    escapeValue: false
                }
            })}\n${packet.data.isMaxLevel ? (0, StringUtils_1.progressBar)(1, 1) : (0, StringUtils_1.progressBar)(packet.data.experience.value, packet.data.experience.max)}`
        });
        yield interaction.reply({
            embeds: [guildCommandEmbed]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guild")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guild", "user", option)
        .setRequired(false))
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guild", "guildName", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guild", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildCommand.js.map