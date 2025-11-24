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
const PacketHandler_1 = require("../PacketHandler");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const CommandReportPacket_1 = require("../../../../Lib/src/packets/commands/CommandReportPacket");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const GuildLevelUpPacket_1 = require("../../../../Lib/src/packets/events/GuildLevelUpPacket");
const MissionsCompletedPacket_1 = require("../../../../Lib/src/packets/events/MissionsCompletedPacket");
const MissionsExpiredPacket_1 = require("../../../../Lib/src/packets/events/MissionsExpiredPacket");
const PlayerDeathPacket_1 = require("../../../../Lib/src/packets/events/PlayerDeathPacket");
const PlayerLeavePveIslandPacket_1 = require("../../../../Lib/src/packets/events/PlayerLeavePveIslandPacket");
const PlayerLevelUpPacket_1 = require("../../../../Lib/src/packets/events/PlayerLevelUpPacket");
const PlayerReceivePetPacket_1 = require("../../../../Lib/src/packets/events/PlayerReceivePetPacket");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const GiveFoodToGuildPacket_1 = require("../../../../Lib/src/packets/utils/GiveFoodToGuildPacket");
const NoFoodSpaceInGuildPacket_1 = require("../../../../Lib/src/packets/utils/NoFoodSpaceInGuildPacket");
const MissionUtils_1 = require("../../utils/MissionUtils");
const CompletedMission_1 = require("../../../../Lib/src/types/CompletedMission");
const PetConstants_1 = require("../../../../Lib/src/constants/PetConstants");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const StringUtils_1 = require("../../../../Lib/src/utils/StringUtils");
class EventsHandlers {
    chooseDestinationRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const embed = new DraftBotEmbed_1.DraftBotEmbed();
            embed.formatAuthor(i18n_1.default.t("commands:report.destinationTitle", {
                lng,
                pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(context.keycloakId, lng)
            }), interaction.user);
            let time = packet.tripDuration;
            let i18nTr;
            if (time < 60) {
                i18nTr = "commands:report.choseMapMinutes";
            }
            else {
                time = Math.round((0, TimeUtils_1.minutesToHours)(packet.tripDuration));
                i18nTr = "commands:report.choseMap";
            }
            embed.setDescription(i18n_1.default.t(i18nTr, {
                count: time,
                lng,
                mapPrefix: i18n_1.default.t(`models:map_types.${packet.mapTypeId}.prefix`, { lng }),
                mapType: i18n_1.default.t(`models:map_types.${packet.mapTypeId}.name`, { lng }).toLowerCase(),
                mapEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.mapTypeId]),
                mapName: i18n_1.default.t(`models:map_locations.${packet.mapId}.name`, { lng }),
                time
            }));
            try {
                if (context.discord.buttonInteraction) {
                    yield ((_a = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction)) === null || _a === void 0 ? void 0 : _a.editReply({ embeds: [embed] }));
                    return;
                }
            }
            catch (_b) {
            }
            yield interaction.channel.send({ embeds: [embed] });
        });
    }
    guildLevelUp(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .setTitle(i18n_1.default.t("models:guilds.levelUpTitle", {
                        lng,
                        guild: packet.guildName
                    }))
                        .setDescription(i18n_1.default.t("models:guilds.levelUpDesc", {
                        lng,
                        level: packet.level
                    }))
                ]
            });
        });
    }
    missionsCompleted(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.keycloakId);
            if (getUser.isError) {
                throw new Error(`Keycloak user with id ${packet.keycloakId} not found`);
            }
            const user = getUser.payload.user;
            const discordId = ((_a = user.attributes.discordId) === null || _a === void 0 ? void 0 : _a[0]) ? user.attributes.discordId[0] : null;
            const discordUser = discordId ? DraftBotShard_1.draftBotClient.users.cache.get(discordId) : null;
            const lng = interaction.userLanguage;
            const titleText = i18n_1.default.t("notifications:missions.completed.title", {
                lng,
                count: packet.missions.length,
                pseudo: (0, StringUtils_1.escapeUsername)(user.attributes.gameUsername[0])
            });
            const completedMissionsEmbed = discordUser
                ? new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(titleText, discordUser)
                : new DraftBotEmbed_1.DraftBotEmbed().setTitle(titleText);
            const missionLists = {
                [CompletedMission_1.MissionType.CAMPAIGN]: [],
                [CompletedMission_1.MissionType.DAILY]: [],
                [CompletedMission_1.MissionType.NORMAL]: []
            };
            let totalGems = 0;
            let totalXP = 0;
            for (const mission of packet.missions) {
                totalGems += mission.gemsToWin;
                totalXP += mission.xpToWin;
                missionLists[mission.missionType].push(MissionUtils_1.MissionUtils.formatCompletedMission(mission, lng));
            }
            for (const [missionType, missions] of Object.entries(missionLists)
                .filter(entry => entry[1].length !== 0)) {
                completedMissionsEmbed.addFields({
                    name: i18n_1.default.t(`notifications:missions.completed.subcategories.${missionType}`, {
                        lng,
                        count: missions.length
                    }),
                    value: missions.join("\n")
                });
            }
            if (packet.missions.length > 1) {
                completedMissionsEmbed.addFields({
                    name: i18n_1.default.t("notifications:missions.completed.totalRewards", { lng }),
                    value: i18n_1.default.t("notifications:missions.completed.totalDisplay", {
                        lng,
                        gems: totalGems,
                        xp: totalXP
                    })
                });
            }
            yield interaction.channel.send({ embeds: [completedMissionsEmbed] });
        });
    }
    missionsExpired(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.keycloakId);
            if (getUser.isError) {
                throw new Error(`Keycloak user with id ${packet.keycloakId} not found`);
            }
            const user = getUser.payload.user;
            const discordId = ((_a = user.attributes.discordId) === null || _a === void 0 ? void 0 : _a[0]) ? user.attributes.discordId[0] : null;
            const discordUser = discordId ? DraftBotShard_1.draftBotClient.users.cache.get(discordId) : null;
            const lng = interaction.userLanguage;
            let missionsExpiredDescription = "";
            for (const mission of packet.missions) {
                missionsExpiredDescription += `- ${MissionUtils_1.MissionUtils.formatBaseMission(mission, lng)} (${mission.numberDone}/${mission.missionObjective})\n`;
            }
            const titleText = i18n_1.default.t("notifications:missions.expired.title", {
                count: packet.missions.length,
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(user.attributes.gameUsername[0])
            });
            const embed = discordUser
                ? new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(titleText, discordUser)
                : new DraftBotEmbed_1.DraftBotEmbed().setTitle(titleText);
            embed.setDescription(i18n_1.default.t("notifications:missions.expired.description", {
                lng,
                count: packet.missions.length,
                missionsExpired: missionsExpiredDescription
            }));
            yield interaction.channel.send({
                embeds: [embed]
            });
        });
    }
    playerDeath(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("models:players.koTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(i18n_1.default.t("models:players.koDesc", { lng }))
                        .setErrorColor()
                ]
            });
            yield interaction.user.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("models:players.koDmTitle", { lng }), interaction.user)
                        .setDescription(i18n_1.default.t("models:players.koDmDesc", { lng }))
                ]
            });
        });
    }
    playerLeavePveIsland(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            let desc = i18n_1.default.t("models:players.leavePVEIslandDescStart", {
                lng,
                moneyLost: packet.moneyLost
            });
            if (packet.guildPointsLost > 0) {
                desc += i18n_1.default.t("models:players.leavePVEIslandMalusGuildPoints", {
                    lng,
                    guildPointsLost: packet.guildPointsLost
                });
            }
            desc += i18n_1.default.t("models:players.leavePVEIslandDescEnd", { lng });
            yield interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("models:players.leavePVEIslandTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(desc)
                ]
            });
        });
    }
    playerLevelUp(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, packet.keycloakId);
            if (getUser.isError) {
                throw new Error(`Keycloak user with id ${packet.keycloakId} not found`);
            }
            const user = getUser.payload.user;
            const discordId = ((_a = user.attributes.discordId) === null || _a === void 0 ? void 0 : _a[0]) ? user.attributes.discordId[0] : null;
            const discordUser = discordId ? DraftBotShard_1.draftBotClient.users.cache.get(discordId) : null;
            const lng = interaction.userLanguage;
            const rewards = {
                fightUnlocked: { tr: "fightUnlocked" },
                guildUnlocked: { tr: "guildUnlocked" },
                healthRestored: { tr: "healthRestored" },
                classesTier1Unlocked: {
                    tr: "classTier",
                    replacements: { tier: 1 }
                },
                classesTier2Unlocked: {
                    tr: "classTier",
                    replacements: { tier: 2 }
                },
                classesTier3Unlocked: {
                    tr: "classTier",
                    replacements: { tier: 3 }
                },
                classesTier4Unlocked: {
                    tr: "classTier",
                    replacements: { tier: 4 }
                },
                classesTier5Unlocked: {
                    tr: "classTier",
                    replacements: { tier: 5 }
                },
                missionSlotUnlocked: { tr: "newMissionSlot" },
                pveUnlocked: { tr: "pveUnlocked" },
                statsIncreased: { tr: "statsIncreased" }
            };
            let desc = i18n_1.default.t("models:players.levelUp.description", {
                lng,
                level: packet.level
            });
            for (const [key, value] of Object.entries(rewards)) {
                if (packet[key]) {
                    desc += `${i18n_1.default.t(`models:players.levelUp.rewards.${value.tr}`, Object.assign({ lng }, value.replacements))}\n`;
                }
            }
            const titleText = i18n_1.default.t("models:players.levelUp.title", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(user.attributes.gameUsername[0])
            });
            const embed = discordUser
                ? new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(titleText, discordUser)
                : new DraftBotEmbed_1.DraftBotEmbed().setTitle(titleText);
            embed.setDescription(desc);
            yield interaction.channel.send({
                embeds: [embed]
            });
        });
    }
    playerReceivePet(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const descTr = packet.giveInGuild
                ? "models:petReceived.genericGiveGuild"
                : packet.giveInPlayerInv
                    ? "models:petReceived.genericGivePlayer"
                    : "models:petReceived.genericGiveNoSlot";
            const embed = new DraftBotEmbed_1.DraftBotEmbed()
                .formatAuthor(i18n_1.default.t("models:petReceived.genericGiveTitle", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
            }), interaction.user)
                .setDescription(i18n_1.default.t(descTr, {
                lng,
                pet: DisplayUtils_1.DisplayUtils.getPetDisplay(packet.petTypeId, packet.petSex, lng)
            }));
            if (packet.noRoomInGuild) {
                embed.setErrorColor();
            }
            yield interaction.channel.send({
                embeds: [embed]
            });
        });
    }
    giveFoodToGuild(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const foodId = PetConstants_1.PetConstants.PET_FOOD_BY_ID[packet.selectedFoodIndex];
            const lng = interaction.userLanguage;
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("notifications:guildFood.receivedFoodTitle", { lng }), interaction.user)
                        .setDescription(i18n_1.default.t("notifications:guildFood.receivedFoodDescription", {
                        lng,
                        foodId,
                        amount: packet.quantity,
                        foodName: i18n_1.default.t(`models:foods.${foodId}`, {
                            lng,
                            count: packet.quantity
                        })
                    }))
                ]
            }));
        });
    }
    noFoodSpaceInGuild(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.channel.send({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:guildFoodStorageFull", {
                        lng,
                        quantity: packet.quantity,
                        food: DisplayUtils_1.DisplayUtils.getFoodDisplay(packet.food, packet.quantity, lng, false)
                    }))
                ]
            });
        });
    }
}
exports.default = EventsHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportChooseDestinationRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportChooseDestinationRes]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "chooseDestinationRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(GuildLevelUpPacket_1.GuildLevelUpPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GuildLevelUpPacket_1.GuildLevelUpPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "guildLevelUp", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(MissionsCompletedPacket_1.MissionsCompletedPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MissionsCompletedPacket_1.MissionsCompletedPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "missionsCompleted", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(MissionsExpiredPacket_1.MissionsExpiredPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MissionsExpiredPacket_1.MissionsExpiredPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "missionsExpired", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(PlayerDeathPacket_1.PlayerDeathPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlayerDeathPacket_1.PlayerDeathPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "playerDeath", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(PlayerLeavePveIslandPacket_1.PlayerLeavePveIslandPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlayerLeavePveIslandPacket_1.PlayerLeavePveIslandPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "playerLeavePveIsland", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(PlayerLevelUpPacket_1.PlayerLevelUpPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlayerLevelUpPacket_1.PlayerLevelUpPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "playerLevelUp", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(PlayerReceivePetPacket_1.PlayerReceivePetPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PlayerReceivePetPacket_1.PlayerReceivePetPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "playerReceivePet", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(GiveFoodToGuildPacket_1.GiveFoodToGuildPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GiveFoodToGuildPacket_1.GiveFoodToGuildPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "giveFoodToGuild", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(NoFoodSpaceInGuildPacket_1.NoFoodSpaceInGuildPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, NoFoodSpaceInGuildPacket_1.NoFoodSpaceInGuildPacket]),
    __metadata("design:returntype", Promise)
], EventsHandlers.prototype, "noFoodSpaceInGuild", null);
//# sourceMappingURL=EventsHandlers.js.map