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
exports.NotificationsHandler = void 0;
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const i18n_1 = require("../translations/i18n");
const NotificationSendType_1 = require("./NotificationSendType");
const DraftBotShard_1 = require("../bot/DraftBotShard");
const StringUtils_1 = require("../../../Lib/src/utils/StringUtils");
const NotificationType_1 = require("./NotificationType");
const NotificationsConfiguration_1 = require("../database/discord/models/NotificationsConfiguration");
const ReachDestinationNotificationPacket_1 = require("../../../Lib/src/packets/notifications/ReachDestinationNotificationPacket");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DisplayUtils_1 = require("../utils/DisplayUtils");
const GuildDailyNotificationPacket_1 = require("../../../Lib/src/packets/notifications/GuildDailyNotificationPacket");
const GuildDailyCommand_1 = require("../commands/guild/GuildDailyCommand");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const PlayerFreedFromJailNotificationPacket_1 = require("../../../Lib/src/packets/notifications/PlayerFreedFromJailNotificationPacket");
const PlayerWasAttackedNotificationPacket_1 = require("../../../Lib/src/packets/notifications/PlayerWasAttackedNotificationPacket");
class NotificationsHandler {
    static sendNotifications(notificationSerializedPacket) {
        for (const notification of notificationSerializedPacket.notifications) {
            this._processSingleNotification(notification)
                .catch(error => {
                DraftBotLogger_1.DraftBotLogger.error(`Failed to process notification: ${error}`);
            });
        }
    }
    static _processSingleNotification(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            const keycloakId = notification.packet.keycloakId;
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, keycloakId);
            if (getUser.isError || !getUser.payload.user.attributes.discordId) {
                throw `Keycloak user with id ${keycloakId} not found or missing discordId`;
            }
            const discordId = getUser.payload.user.attributes.discordId[0];
            const lng = getUser.payload.user.attributes.language[0];
            let notificationContent;
            let notificationType;
            switch (notification.type) {
                case ReachDestinationNotificationPacket_1.ReachDestinationNotificationPacket.name: {
                    const packet = notification.packet;
                    notificationContent = i18n_1.default.t("bot:notificationReachDestination", {
                        lng,
                        destination: DisplayUtils_1.DisplayUtils.getMapLocationDisplay(packet.mapType, packet.mapId, lng)
                    });
                    notificationType = NotificationType_1.NotificationsTypes.REPORT;
                    break;
                }
                case GuildDailyNotificationPacket_1.GuildDailyNotificationPacket.name: {
                    const packet = notification.packet;
                    notificationContent = i18n_1.default.t("bot:notificationGuildDaily", {
                        lng,
                        pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.keycloakIdOfExecutor, lng),
                        rewards: (0, GuildDailyCommand_1.getCommandGuildDailyRewardPacketString)(notification.packet.reward, lng)
                    });
                    notificationType = NotificationType_1.NotificationsTypes.GUILD_DAILY;
                    break;
                }
                case PlayerFreedFromJailNotificationPacket_1.PlayerFreedFromJailNotificationPacket.name: {
                    const packet = notification.packet;
                    notificationContent = i18n_1.default.t("notifications:playerFreedFromJail.description", {
                        lng,
                        freedByPlayer: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.freedByPlayerKeycloakId, lng)
                    });
                    notificationType = NotificationType_1.NotificationsTypes.PLAYER_FREED_FROM_JAIL;
                    break;
                }
                case PlayerWasAttackedNotificationPacket_1.PlayerWasAttackedNotificationPacket.name: {
                    const packet = notification.packet;
                    notificationContent = i18n_1.default.t("notifications:fightChallenge.description", {
                        lng,
                        attackerPseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.attackedByPlayerKeycloakId, lng)
                    });
                    notificationType = NotificationType_1.NotificationsTypes.FIGHT_CHALLENGE;
                    break;
                }
                default:
                    throw `Unknown notification type: ${notification.type}`;
            }
            const discordUser = yield DraftBotShard_1.draftBotClient.users.fetch(discordId);
            yield NotificationsHandler.sendNotification(discordUser, yield NotificationsConfiguration_1.NotificationsConfigurations.getOrRegister(discordId), notificationType, i18n_1.default.t(notificationContent, { lng }), lng);
        });
    }
    static sendNotification(user, notificationConfiguration, notificationType, content, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            const notificationTypeValue = notificationType.value(notificationConfiguration);
            if (!notificationTypeValue.enabled) {
                return;
            }
            switch (notificationTypeValue.sendType) {
                case NotificationSendType_1.NotificationSendTypeEnum.DM:
                    yield NotificationsHandler.sendDmNotification(user, content, lng);
                    break;
                case NotificationSendType_1.NotificationSendTypeEnum.CHANNEL:
                    yield this.sendChannelNotification(user, notificationConfiguration, notificationType, content, lng);
                    break;
                default:
                    throw `Unknown sendLocation: ${notificationTypeValue.sendType}`;
            }
        });
    }
    static getNotificationEmbed(user, content, lng) {
        return new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("bot:notificationTitle", { lng }), user)
            .setDescription(content)
            .setFooter({ text: i18n_1.default.t("bot:notificationFooter", { lng }) });
    }
    static sendDmNotification(user, content, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = NotificationsHandler.getNotificationEmbed(user, content, lng);
            yield user.send({ embeds: [embed] })
                .catch(e => {
                if (e.toString()
                    .includes("DiscordAPIError[50007]")) {
                    DraftBotLogger_1.DraftBotLogger.debug(`Failed to send DM notification to user ${user.id}`, e);
                }
                else {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj(`Failed to send DM notification to user ${user.id}`, e);
                }
            });
        });
    }
    static sendChannelNotification(user, notificationConfiguration, notificationType, content, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = NotificationsHandler.getNotificationEmbed(user, content, lng);
            const notificationTypeValue = notificationType.value(notificationConfiguration);
            const channelAccess = yield DraftBotShard_1.draftBotClient.shard.broadcastEval((client, context) => client.channels.fetch(context.channel)
                .then(channel => {
                if (channel.guild.shardId === client.shard.ids[0]) {
                    channel.send(context.embedNotification);
                    return true;
                }
                return false;
            })
                .catch(() => false), {
                context: {
                    channel: notificationTypeValue.channelId,
                    embedNotification: {
                        content: (0, StringUtils_1.getMention)(user.id),
                        embeds: [embed]
                    }
                }
            });
            if (!channelAccess.includes(true)) {
                notificationType.changeSendTypeCallback(notificationConfiguration, NotificationSendType_1.NotificationSendTypeEnum.DM, "");
                yield notificationConfiguration.save();
                yield NotificationsHandler.sendDmNotification(user, `${content}\n\n${i18n_1.default.t("bot:notificationsNoChannelAccess", { lng })}`, lng);
            }
        });
    }
}
exports.NotificationsHandler = NotificationsHandler;
//# sourceMappingURL=NotificationsHandler.js.map