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
exports.DiscordMQTT = void 0;
const DraftBotShard_1 = require("./DraftBotShard");
const PacketListener_1 = require("../../../Lib/src/packets/PacketListener");
const PacketHandler_1 = require("../packetHandlers/PacketHandler");
const DraftBotPacket_1 = require("../../../Lib/src/packets/DraftBotPacket");
const ErrorPacket_1 = require("../../../Lib/src/packets/commands/ErrorPacket");
const mqtt_1 = require("mqtt");
const MqttConstants_1 = require("../../../Lib/src/constants/MqttConstants");
const DiscordAnnouncement_1 = require("../announcements/DiscordAnnouncement");
const NotificationsHandler_1 = require("../notifications/NotificationsHandler");
const Language_1 = require("../../../Lib/src/Language");
const discord_js_1 = require("discord.js");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const i18n_1 = require("../translations/i18n");
const MqttTopicUtils_1 = require("../../../Lib/src/utils/MqttTopicUtils");
const DraftBotDiscordMetrics_1 = require("./DraftBotDiscordMetrics");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const AsyncCorePacketSender_1 = require("./AsyncCorePacketSender");
const DiscordConstants_1 = require("../DiscordConstants");
const DEFAULT_MQTT_CLIENT_OPTIONS = {
    connectTimeout: MqttConstants_1.MqttConstants.CONNECTION_TIMEOUT
};
class DiscordMQTT {
    static init(isMainShard) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, PacketHandler_1.registerAllPacketHandlers)();
            this.connectSubscribeAndHandleGlobal();
            this.connectSubscribeAndHandleTopWeekAnnouncement();
            this.connectSubscribeAndHandleTopWeekFightAnnouncement();
            if (isMainShard) {
                this.connectSubscribeAndHandleNotifications();
            }
        });
    }
    static handleDuplicatedShardMessage(messageString) {
        return __awaiter(this, void 0, void 0, function* () {
            let messageParts = messageString.split(":");
            if (messageParts.length !== 2) {
                DraftBotLogger_1.DraftBotLogger.error("Wrong shard connection message format. Disconnecting anyway.", { receivedMessage: messageString });
                messageParts = [DiscordConstants_1.DiscordConstants.MQTT.SHARD_CONNECTION_MSG, process.pid.toString()];
            }
            if (messageParts[1] !== process.pid.toString()) {
                DraftBotLogger_1.DraftBotLogger.warn("Received shard connection message from another process, this process will now disconnect from all MQTT topics and Discord to avoid duplication", {
                    receivedFromPid: messageParts[1],
                    pid: process.pid
                });
                try {
                    DiscordMQTT.globalMqttClient.publish(MqttTopicUtils_1.MqttTopicUtils.getDiscordShardManagerTopic(DraftBotShard_1.discordConfig.PREFIX), `${DiscordConstants_1.DiscordConstants.MQTT.SHARD_DUPLICATED_MSG}${DraftBotShard_1.shardId}`);
                    DraftBotLogger_1.DraftBotLogger.warn("Published shard duplication message to shard manager");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while publishing shard duplication message to shard manager", error);
                }
                try {
                    yield DraftBotShard_1.draftBotClient.destroy();
                    DraftBotLogger_1.DraftBotLogger.warn("Disconnected from Discord");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while disconnecting from Discord", error);
                }
                try {
                    DiscordMQTT.globalMqttClient.unsubscribe(MqttTopicUtils_1.MqttTopicUtils.getDiscordTopic(DraftBotShard_1.discordConfig.PREFIX, DraftBotShard_1.shardId));
                    DiscordMQTT.globalMqttClient.end();
                    DraftBotLogger_1.DraftBotLogger.warn("Disconnected from global MQTT client");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while disconnecting global MQTT client", error);
                }
                try {
                    DiscordMQTT.notificationMqttClient.unsubscribe(MqttTopicUtils_1.MqttTopicUtils.getNotificationsTopic(DraftBotShard_1.discordConfig.PREFIX));
                    DiscordMQTT.notificationMqttClient.end();
                    DraftBotLogger_1.DraftBotLogger.warn("Disconnected from notification MQTT client");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while disconnecting notification MQTT client", error);
                }
                try {
                    DiscordMQTT.topWeekAnnouncementMqttClient.unsubscribe(MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX));
                    DiscordMQTT.topWeekAnnouncementMqttClient.end();
                    DraftBotLogger_1.DraftBotLogger.warn("Disconnected from top week announcement MQTT client");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while disconnecting top week announcement MQTT client", error);
                }
                try {
                    DiscordMQTT.topWeekFightAnnouncementMqttClient.unsubscribe(MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekFightAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX));
                    DiscordMQTT.topWeekFightAnnouncementMqttClient.end();
                    DraftBotLogger_1.DraftBotLogger.warn("Disconnected from top week fight announcement MQTT client");
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while disconnecting top week fight announcement MQTT client", error);
                }
            }
        });
    }
    static handleGlobalMqttPacketsMessage(messageString) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const dataJson = JSON.parse(messageString);
            DraftBotLogger_1.DraftBotLogger.debug("Received global message", { packet: dataJson });
            if (!Object.hasOwn(dataJson, "packets") || !Object.hasOwn(dataJson, "context")) {
                DraftBotLogger_1.DraftBotLogger.error("Wrong packet format", { packet: messageString });
                return;
            }
            const context = dataJson.context;
            for (const packet of dataJson.packets) {
                try {
                    DraftBotDiscordMetrics_1.DraftBotDiscordMetrics.incrementPacketCount(packet.name);
                    if (yield DiscordMQTT.asyncPacketSender.handleResponse(context, packet.name, packet.packet)) {
                        continue;
                    }
                    let listener = DiscordMQTT.packetListener.getListener(packet.name);
                    if (!listener) {
                        packet.packet = (0, DraftBotPacket_1.makePacket)(ErrorPacket_1.ErrorPacket, { message: `No packet listener found for received packet '${packet.name}'.\n\nData:\n${JSON.stringify(packet.packet)}` });
                        listener = DiscordMQTT.packetListener.getListener("ErrorPacket");
                    }
                    const startTime = Date.now();
                    yield listener(context, packet.packet);
                    DraftBotDiscordMetrics_1.DraftBotDiscordMetrics.observePacketTime(packet.name, (0, TimeUtils_1.millisecondsToSeconds)(Date.now() - startTime));
                }
                catch (error) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while handling packet", error);
                    DraftBotDiscordMetrics_1.DraftBotDiscordMetrics.incrementPacketErrorCount(packet.name);
                    const context = dataJson.context;
                    const lng = (_b = (_a = context.discord) === null || _a === void 0 ? void 0 : _a.language) !== null && _b !== void 0 ? _b : Language_1.LANGUAGE.ENGLISH;
                    if ((_c = context.discord) === null || _c === void 0 ? void 0 : _c.channel) {
                        const channel = yield DraftBotShard_1.draftBotClient.channels.fetch(context.discord.channel);
                        if (channel instanceof discord_js_1.TextChannel) {
                            yield channel.send({ embeds: [
                                    new DraftBotEmbed_1.DraftBotEmbed()
                                        .setErrorColor()
                                        .setTitle(i18n_1.default.t("error:errorOccurredTitle", { lng }))
                                        .setDescription(i18n_1.default.t("error:errorOccurred", { lng }))
                                ] });
                        }
                    }
                }
            }
        });
    }
    static handleGlobalMqttMessage() {
        DiscordMQTT.globalMqttClient.on("message", (_topic, message) => __awaiter(this, void 0, void 0, function* () {
            const messageString = message.toString();
            if (messageString === "") {
                return;
            }
            if (messageString.startsWith(DiscordConstants_1.DiscordConstants.MQTT.SHARD_CONNECTION_MSG)) {
                yield DiscordMQTT.handleDuplicatedShardMessage(messageString);
                return;
            }
            yield DiscordMQTT.handleGlobalMqttPacketsMessage(messageString);
        }));
    }
    static handleTopWeekAnnouncementMqttMessage() {
        DiscordMQTT.topWeekAnnouncementMqttClient.on("message", (_topic, message) => __awaiter(this, void 0, void 0, function* () {
            if (message.toString() === "") {
                DraftBotLogger_1.DraftBotLogger.debug("No top week announcement in the MQTT topic");
                return;
            }
            if (yield DiscordAnnouncement_1.DiscordAnnouncement.canAnnounce()) {
                yield DiscordAnnouncement_1.DiscordAnnouncement.announceTopWeek(JSON.parse(message.toString()));
                DiscordMQTT.topWeekAnnouncementMqttClient.publish(MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX), "", { retain: true });
            }
        }));
    }
    static handleTopWeekFightAnnouncementMqttMessage() {
        DiscordMQTT.topWeekFightAnnouncementMqttClient.on("message", (_topic, message) => __awaiter(this, void 0, void 0, function* () {
            if (message.toString() === "") {
                DraftBotLogger_1.DraftBotLogger.debug("No top week fight announcement in the MQTT topic");
                return;
            }
            if (yield DiscordAnnouncement_1.DiscordAnnouncement.canAnnounce()) {
                yield DiscordAnnouncement_1.DiscordAnnouncement.announceTopWeekFight(JSON.parse(message.toString()));
                DiscordMQTT.topWeekFightAnnouncementMqttClient.publish(MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekFightAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX), "", { retain: true });
            }
        }));
    }
    static handleNotificationMqttMessage() {
        DiscordMQTT.notificationMqttClient.on("message", (_topic, message) => {
            if (message.toString() === "") {
                return;
            }
            const messageString = message.toString();
            const serializedPacket = JSON.parse(messageString);
            DraftBotLogger_1.DraftBotLogger.debug("Received notification message", { packet: serializedPacket });
            NotificationsHandler_1.NotificationsHandler.sendNotifications(serializedPacket);
        });
    }
    static subscribeTo(mqttClient, topic, cleanBefore) {
        if (cleanBefore) {
            mqttClient.publish(topic, "", { retain: true });
        }
        mqttClient.subscribe(topic, err => {
            if (err) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj(`Error while subscribing to topic ${topic}`, err);
                process.exit(1);
            }
            else {
                DraftBotLogger_1.DraftBotLogger.info(`Subscribed to topic ${topic}`);
            }
        });
    }
    static connectSubscribeAndHandleGlobal() {
        DiscordMQTT.globalMqttClient = (0, mqtt_1.connect)(DraftBotShard_1.discordConfig.MQTT_HOST, DEFAULT_MQTT_CLIENT_OPTIONS);
        DiscordMQTT.globalMqttClient.on("connect", () => {
            const discordTopic = MqttTopicUtils_1.MqttTopicUtils.getDiscordTopic(DraftBotShard_1.discordConfig.PREFIX, DraftBotShard_1.shardId);
            DiscordMQTT.globalMqttClient.publish(discordTopic, `${DiscordConstants_1.DiscordConstants.MQTT.SHARD_CONNECTION_MSG}${process.pid}`);
            DiscordMQTT.subscribeTo(DiscordMQTT.globalMqttClient, discordTopic, true);
        });
        this.handleGlobalMqttMessage();
    }
    static connectSubscribeAndHandleTopWeekAnnouncement() {
        DiscordMQTT.topWeekAnnouncementMqttClient = (0, mqtt_1.connect)(DraftBotShard_1.discordConfig.MQTT_HOST, DEFAULT_MQTT_CLIENT_OPTIONS);
        DiscordMQTT.topWeekAnnouncementMqttClient.on("connect", () => {
            DiscordMQTT.subscribeTo(DiscordMQTT.topWeekAnnouncementMqttClient, MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX), false);
        });
        this.handleTopWeekAnnouncementMqttMessage();
    }
    static connectSubscribeAndHandleTopWeekFightAnnouncement() {
        DiscordMQTT.topWeekFightAnnouncementMqttClient = (0, mqtt_1.connect)(DraftBotShard_1.discordConfig.MQTT_HOST, DEFAULT_MQTT_CLIENT_OPTIONS);
        DiscordMQTT.topWeekFightAnnouncementMqttClient.on("connect", () => {
            DiscordMQTT.subscribeTo(DiscordMQTT.topWeekFightAnnouncementMqttClient, MqttTopicUtils_1.MqttTopicUtils.getDiscordTopWeekFightAnnouncementTopic(DraftBotShard_1.discordConfig.PREFIX), false);
        });
        this.handleTopWeekFightAnnouncementMqttMessage();
    }
    static connectSubscribeAndHandleNotifications() {
        DiscordMQTT.notificationMqttClient = (0, mqtt_1.connect)(DraftBotShard_1.discordConfig.MQTT_HOST, Object.assign(Object.assign({}, DEFAULT_MQTT_CLIENT_OPTIONS), { clientId: MqttTopicUtils_1.MqttTopicUtils.getNotificationsConsumerId(DraftBotShard_1.discordConfig.PREFIX), clean: false }));
        DiscordMQTT.notificationMqttClient.on("connect", () => {
            DiscordMQTT.subscribeTo(DiscordMQTT.notificationMqttClient, MqttTopicUtils_1.MqttTopicUtils.getNotificationsTopic(DraftBotShard_1.discordConfig.PREFIX), true);
        });
        this.handleNotificationMqttMessage();
    }
}
exports.DiscordMQTT = DiscordMQTT;
DiscordMQTT.packetListener = new PacketListener_1.PacketListenerClient();
DiscordMQTT.asyncPacketSender = new AsyncCorePacketSender_1.AsyncCorePacketSender();
//# sourceMappingURL=DiscordMQTT.js.map