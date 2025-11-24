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
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const NotificationsConfiguration_1 = require("../../database/discord/models/NotificationsConfiguration");
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const NotificationSendType_1 = require("../../notifications/NotificationSendType");
const NotificationType_1 = require("../../notifications/NotificationType");
const currentCollectors = new Map();
const backButtonCustomId = "back";
const forceStopReason = "force";
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const notificationsConfiguration = yield NotificationsConfiguration_1.NotificationsConfigurations.getOrRegister(interaction.user.id);
        yield mainPage(interaction, notificationsConfiguration, interaction.userLanguage);
        return null;
    });
}
function clearCurrentCollector(userId) {
    const currentCollector = currentCollectors.get(userId);
    if (currentCollector) {
        currentCollector();
    }
}
function mainPage(interaction, notificationsConfiguration, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        clearCurrentCollector(interaction.user.id);
        const chooseEnabledCustomId = "chooseEnabled";
        const chooseSendTypeCustomId = "chooseSendType";
        const chooseEnabledEmoji = DraftBotIcons_1.DraftBotIcons.notifications.bell;
        const chooseSendTypeEmoji = DraftBotIcons_1.DraftBotIcons.notifications.sendLocation;
        const row = new discord_js_1.ActionRowBuilder();
        row.addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(chooseEnabledEmoji))
            .setCustomId(chooseEnabledCustomId)
            .setLabel(i18n_1.default.t("commands:notifications.enableDisable", { lng }))
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        const allTypesDisabled = NotificationType_1.NotificationsTypes.ALL.every(notificationType => !notificationType.value(notificationsConfiguration).enabled);
        if (!allTypesDisabled) {
            row.addComponents(new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(chooseSendTypeEmoji))
                .setCustomId(chooseSendTypeCustomId)
                .setLabel(i18n_1.default.t("commands:notifications.sendLocation", { lng }))
                .setStyle(discord_js_1.ButtonStyle.Secondary));
        }
        let reply;
        const embed = getNotificationsEmbed(notificationsConfiguration, interaction.user, lng);
        if (!interaction.isButton()) {
            reply = yield interaction.reply({
                embeds: [embed],
                components: [row],
                withResponse: true
            });
        }
        else {
            reply = yield interaction.update({
                embeds: [embed],
                components: [row],
                withResponse: true
            });
        }
        if (!((_a = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _a === void 0 ? void 0 : _a.message)) {
            return;
        }
        const msg = reply.resource.message;
        const buttonCollector = msg.createMessageComponentCollector({
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        currentCollectors.set(interaction.user.id, () => buttonCollector.stop());
        buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (buttonInteraction.user.id !== interaction.user.id) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            if (buttonInteraction.customId === chooseEnabledCustomId) {
                buttonCollector.stop(forceStopReason);
                yield chooseEnabled(buttonInteraction, notificationsConfiguration, lng);
                return;
            }
            if (buttonInteraction.customId === chooseSendTypeCustomId) {
                buttonCollector.stop(forceStopReason);
                yield chooseSendType(buttonInteraction, notificationsConfiguration, lng);
            }
        }));
        buttonCollector.on("end", (_, reason) => __awaiter(this, void 0, void 0, function* () {
            currentCollectors.delete(interaction.user.id);
            if (reason !== forceStopReason) {
                yield msg.edit({ components: [] });
            }
        }));
    });
}
function getSettingsRows(notificationsConfiguration, keepOnlyEnabled, lng) {
    const rowNotifications = new discord_js_1.ActionRowBuilder();
    NotificationType_1.NotificationsTypes.ALL.forEach(notificationType => {
        if (keepOnlyEnabled && !notificationType.value(notificationsConfiguration).enabled) {
            return;
        }
        rowNotifications.addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(notificationType.emote))
            .setCustomId(notificationType.customId)
            .setLabel(i18n_1.default.t(notificationType.i18nKey, { lng }))
            .setStyle(discord_js_1.ButtonStyle.Secondary));
    });
    const rowBack = new discord_js_1.ActionRowBuilder();
    rowBack.addComponents(new discord_js_1.ButtonBuilder()
        .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.notifications.back))
        .setLabel(i18n_1.default.t("commands:notifications.back", { lng }))
        .setCustomId(backButtonCustomId)
        .setStyle(discord_js_1.ButtonStyle.Secondary));
    return [rowNotifications, rowBack];
}
function chooseEnabled(buttonInteraction, notificationsConfiguration, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        clearCurrentCollector(buttonInteraction.user.id);
        const rows = getSettingsRows(notificationsConfiguration, false, lng);
        const embed = getNotificationsEmbed(notificationsConfiguration, buttonInteraction.user, lng, i18n_1.default.t("commands:notifications.footerEnableDisable", { lng }));
        const msg = yield buttonInteraction.update({
            embeds: [embed], components: rows
        });
        const buttonCollector = msg.createMessageComponentCollector({
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        currentCollectors.set(buttonInteraction.user.id, () => buttonCollector.stop());
        buttonCollector.on("collect", (collectorButtonInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (collectorButtonInteraction.user.id !== buttonInteraction.user.id) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(collectorButtonInteraction.user, collectorButtonInteraction, lng);
                return;
            }
            if (collectorButtonInteraction.customId === backButtonCustomId) {
                buttonCollector.stop(forceStopReason);
                yield mainPage(collectorButtonInteraction, notificationsConfiguration, lng);
                return;
            }
            const notificationType = NotificationType_1.NotificationsTypes.ALL.find(notificationType => notificationType.customId === collectorButtonInteraction.customId);
            if (notificationType) {
                notificationType.toggleCallback(notificationsConfiguration);
                yield notificationsConfiguration.save();
                const embed = getNotificationsEmbed(notificationsConfiguration, collectorButtonInteraction.user, lng, i18n_1.default.t("commands:notifications.footerEnableDisable", { lng }));
                yield collectorButtonInteraction.update({
                    embeds: [embed],
                    components: rows
                });
            }
        }));
        buttonCollector.on("end", (_, reason) => __awaiter(this, void 0, void 0, function* () {
            currentCollectors.delete(buttonInteraction.user.id);
            yield notificationsConfiguration.save();
            if (reason !== forceStopReason) {
                yield msg.edit({ components: [] });
            }
        }));
    });
}
function chooseSendType(buttonInteraction, notificationsConfiguration, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        clearCurrentCollector(buttonInteraction.user.id);
        const rows = getSettingsRows(notificationsConfiguration, true, lng);
        const embed = getNotificationsEmbed(notificationsConfiguration, buttonInteraction.user, lng, i18n_1.default.t("commands:notifications.footerSendLocation", { lng }));
        const msg = yield buttonInteraction.update({
            embeds: [embed], components: rows
        });
        const buttonCollector = msg.createMessageComponentCollector({
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        currentCollectors.set(buttonInteraction.user.id, () => buttonCollector.stop());
        buttonCollector.on("collect", (collectorButtonInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (buttonInteraction.user.id !== collectorButtonInteraction.user.id) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(collectorButtonInteraction.user, collectorButtonInteraction, lng);
                return;
            }
            if (collectorButtonInteraction.customId === backButtonCustomId) {
                buttonCollector.stop(forceStopReason);
                yield mainPage(collectorButtonInteraction, notificationsConfiguration, lng);
                return;
            }
            const notificationType = NotificationType_1.NotificationsTypes.ALL.find(notificationType => notificationType.customId === collectorButtonInteraction.customId);
            if (notificationType) {
                notificationType.changeSendTypeCallback(notificationsConfiguration, (notificationType.value(notificationsConfiguration).sendType + 1) % (Object.keys(NotificationSendType_1.NotificationSendTypeEnum).length / 2), buttonInteraction.channel.id);
                yield notificationsConfiguration.save();
                const embed = getNotificationsEmbed(notificationsConfiguration, collectorButtonInteraction.user, lng, i18n_1.default.t("commands:notifications.footerSendLocation", { lng }));
                yield collectorButtonInteraction.update({
                    embeds: [embed],
                    components: rows
                });
            }
        }));
        buttonCollector.on("end", (_, reason) => __awaiter(this, void 0, void 0, function* () {
            currentCollectors.delete(buttonInteraction.user.id);
            yield notificationsConfiguration.save();
            if (reason !== forceStopReason) {
                yield msg.edit({ components: [] });
            }
        }));
    });
}
function getNotificationsEmbed(notificationsConfiguration, user, lng, footer) {
    let description = "";
    NotificationType_1.NotificationsTypes.ALL.forEach(notificationType => {
        const notificationTypeValue = notificationType.value(notificationsConfiguration);
        const sendLocation = NotificationSendType_1.NotificationSendType.toString(notificationTypeValue.sendType, lng, notificationTypeValue.channelId);
        description
            += `${notificationType.emote} **__${i18n_1.default.t(notificationType.i18nKey, { lng })}__**
- **${i18n_1.default.t("commands:notifications.enabledField", { lng })}** ${notificationTypeValue.enabled ? DraftBotIcons_1.DraftBotIcons.collectors.accept : DraftBotIcons_1.DraftBotIcons.collectors.refuse}`;
        if (notificationTypeValue.enabled) {
            description += `\n- **${i18n_1.default.t("commands:notifications.sendLocationField", { lng })}** ${sendLocation}`;
        }
        description += "\n\n";
    });
    const embed = new DraftBotEmbed_1.DraftBotEmbed()
        .formatAuthor(i18n_1.default.t("commands:notifications.embedTitle", { lng }), user)
        .setDescription(description);
    if (footer) {
        embed.setFooter({ text: footer });
    }
    return embed;
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("notifications"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=NotificationsCommand.js.map