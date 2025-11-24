"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsTypes = void 0;
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
class NotificationsTypes {
}
exports.NotificationsTypes = NotificationsTypes;
NotificationsTypes.REPORT = {
    emote: DraftBotIcons_1.DraftBotIcons.notifications.types.report,
    customId: "report",
    i18nKey: "commands:notifications.types.report",
    value: notificationsConfiguration => ({
        enabled: notificationsConfiguration.reportEnabled,
        sendType: notificationsConfiguration.reportSendType,
        channelId: notificationsConfiguration.reportChannelId
    }),
    toggleCallback: (notificationsConfiguration) => {
        notificationsConfiguration.reportEnabled = !notificationsConfiguration.reportEnabled;
    },
    changeSendTypeCallback: (notificationsConfiguration, sendType, channelId) => {
        notificationsConfiguration.reportSendType = sendType;
        notificationsConfiguration.reportChannelId = channelId;
    }
};
NotificationsTypes.GUILD_DAILY = {
    emote: DraftBotIcons_1.DraftBotIcons.notifications.types.guildDaily,
    customId: "guildDaily",
    i18nKey: "commands:notifications.types.guildDaily",
    value: notificationsConfiguration => ({
        enabled: notificationsConfiguration.guildDailyEnabled,
        sendType: notificationsConfiguration.guildDailySendType,
        channelId: notificationsConfiguration.guildDailyChannelId
    }),
    toggleCallback: (notificationsConfiguration) => {
        notificationsConfiguration.guildDailyEnabled = !notificationsConfiguration.guildDailyEnabled;
    },
    changeSendTypeCallback: (notificationsConfiguration, sendType, channelId) => {
        notificationsConfiguration.guildDailySendType = sendType;
        notificationsConfiguration.guildDailyChannelId = channelId;
    }
};
NotificationsTypes.PLAYER_FREED_FROM_JAIL = {
    emote: DraftBotIcons_1.DraftBotIcons.notifications.types.playerFreedFromJail,
    customId: "playerFreedFromJail",
    i18nKey: "commands:notifications.types.playerFreedFromJail",
    value: notificationsConfiguration => ({
        enabled: notificationsConfiguration.playerFreedFromJailEnabled,
        sendType: notificationsConfiguration.playerFreedFromJailSendType,
        channelId: notificationsConfiguration.playerFreedFromJailChannelId
    }),
    toggleCallback: (notificationsConfiguration) => {
        notificationsConfiguration.playerFreedFromJailEnabled = !notificationsConfiguration.playerFreedFromJailEnabled;
    },
    changeSendTypeCallback: (notificationsConfiguration, sendType, channelId) => {
        notificationsConfiguration.playerFreedFromJailSendType = sendType;
        notificationsConfiguration.playerFreedFromJailChannelId = channelId;
    }
};
NotificationsTypes.FIGHT_CHALLENGE = {
    emote: DraftBotIcons_1.DraftBotIcons.notifications.types.fightChallenge,
    customId: "fightChallenge",
    i18nKey: "commands:notifications.types.fightChallenge",
    value: notificationsConfiguration => ({
        enabled: notificationsConfiguration.fightChallengeEnabled,
        sendType: notificationsConfiguration.fightChallengeSendType,
        channelId: notificationsConfiguration.fightChallengeChannelId
    }),
    toggleCallback: (notificationsConfiguration) => {
        notificationsConfiguration.fightChallengeEnabled = !notificationsConfiguration.fightChallengeEnabled;
    },
    changeSendTypeCallback: (notificationsConfiguration, sendType, channelId) => {
        notificationsConfiguration.fightChallengeSendType = sendType;
        notificationsConfiguration.fightChallengeChannelId = channelId;
    }
};
NotificationsTypes.ALL = [
    NotificationsTypes.REPORT,
    NotificationsTypes.GUILD_DAILY,
    NotificationsTypes.PLAYER_FREED_FROM_JAIL,
    NotificationsTypes.FIGHT_CHALLENGE
];
//# sourceMappingURL=NotificationType.js.map