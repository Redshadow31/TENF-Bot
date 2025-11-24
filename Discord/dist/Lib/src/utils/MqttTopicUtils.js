"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttTopicUtils = void 0;
class MqttTopicUtils {
    static getCoreTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.CORE_TOPIC}`;
    }
    static getDiscordTopic(prefix, shardId) {
        return `${prefix}/${MqttTopicUtils.DISCORD_TOPIC}/${shardId}`;
    }
    static getDiscordTopWeekAnnouncementTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.DISCORD_TOP_WEEK_ANNOUNCEMENT_TOPIC}`;
    }
    static getDiscordTopWeekFightAnnouncementTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.DISCORD_TOP_WEEK_FIGHT_ANNOUNCEMENT_TOPIC}`;
    }
    static getNotificationsTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.NOTIFICATIONS}`;
    }
    static getNotificationsConsumerId(prefix) {
        return `${prefix}/${MqttTopicUtils.NOTIFICATIONS_CONSUMER}`;
    }
    static getDiscordShardManagerTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.DISCORD_SHARD_MANAGER_TOPIC}`;
    }
    static getWebSocketTopic(prefix) {
        return `${prefix}/${MqttTopicUtils.WEB_SOCKET_TOPIC}`;
    }
}
exports.MqttTopicUtils = MqttTopicUtils;
MqttTopicUtils.CORE_TOPIC = "draftbot_core";
MqttTopicUtils.DISCORD_TOPIC = "draftbot_discord/shard";
MqttTopicUtils.DISCORD_TOP_WEEK_ANNOUNCEMENT_TOPIC = "draftbot_discord_top_week_announcement";
MqttTopicUtils.DISCORD_TOP_WEEK_FIGHT_ANNOUNCEMENT_TOPIC = "draftbot_discord_top_week_fight_announcement";
MqttTopicUtils.NOTIFICATIONS = "draftbot_notifications";
MqttTopicUtils.NOTIFICATIONS_CONSUMER = "notifications-consumer";
MqttTopicUtils.DISCORD_SHARD_MANAGER_TOPIC = "discord_shard_manager";
MqttTopicUtils.WEB_SOCKET_TOPIC = "draftbot_websocket";
//# sourceMappingURL=MqttTopicUtils.js.map