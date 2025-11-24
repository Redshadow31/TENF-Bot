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
const DiscordConfig_1 = require("./config/DiscordConfig");
const discord_js_1 = require("discord.js");
const topgg_autoposter_1 = require("topgg-autoposter");
const DraftBotLogger_1 = require("../../Lib/src/logs/DraftBotLogger");
const DraftBotShard_1 = require("./bot/DraftBotShard");
const mqtt_1 = require("mqtt");
const MqttConstants_1 = require("../../Lib/src/constants/MqttConstants");
const MqttTopicUtils_1 = require("../../Lib/src/utils/MqttTopicUtils");
const DiscordConstants_1 = require("./DiscordConstants");
const shardCount = "auto";
let spawnedShards = [];
function startShardingManagerMqtt(config, shardingManager) {
    const mqttClient = (0, mqtt_1.connect)(DraftBotShard_1.discordConfig.MQTT_HOST, {
        connectTimeout: MqttConstants_1.MqttConstants.CONNECTION_TIMEOUT
    });
    mqttClient.on("connect", () => {
        DraftBotLogger_1.DraftBotLogger.info("Connected to MQTT");
        const topic = MqttTopicUtils_1.MqttTopicUtils.getDiscordShardManagerTopic(config.PREFIX);
        mqttClient.publish(topic, "");
        mqttClient.subscribe(topic);
    });
    mqttClient.on("message", (_topic, message) => __awaiter(this, void 0, void 0, function* () {
        const messageString = message.toString();
        if (messageString.startsWith(DiscordConstants_1.DiscordConstants.MQTT.SHARD_DUPLICATED_MSG)) {
            const messageParts = messageString.split(":");
            const shardId = parseInt(messageParts[1], 10);
            DraftBotLogger_1.DraftBotLogger.info(`Shard ${shardId} is duplicated, killing all its instances`);
            spawnedShards.forEach(shard => {
                if (shard.id === shardId) {
                    const pid = shard.process.pid;
                    DraftBotLogger_1.DraftBotLogger.info(`Killing shard ${shardId} with PID ${pid}...`);
                    try {
                        shard.kill();
                        DraftBotLogger_1.DraftBotLogger.info(`Shard ${shardId} with PID ${pid} killed`);
                    }
                    catch (e) {
                        DraftBotLogger_1.DraftBotLogger.errorWithObj(`Error while killing shard ${shardId} with PID ${pid}. Kill the whole process to clean everything up.`, e);
                        process.exit(1);
                    }
                }
            });
            spawnedShards = spawnedShards.filter(shard => shard.id !== shardId);
            DraftBotLogger_1.DraftBotLogger.info(`Creating a new shard ${shardId}...`);
            try {
                const newShard = shardingManager.createShard(shardId);
                yield newShard.spawn();
                DraftBotLogger_1.DraftBotLogger.info(`New shard ${shardId} created`);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj(`Error while creating shard ${shardId}. Kill the whole process to clean everything up.`, e);
                process.exit(1);
            }
        }
    }));
}
function main() {
    const config = (0, DiscordConfig_1.loadConfig)();
    DraftBotLogger_1.DraftBotLogger.init(config.LOGGER_LEVEL, config.LOGGER_LOCATIONS, { app: "ShardManager" }, config.LOKI_HOST
        ? {
            host: config.LOKI_HOST,
            username: config.LOKI_USERNAME,
            password: config.LOKI_PASSWORD
        }
        : undefined);
    const shardingManager = new discord_js_1.ShardingManager("./dist/Discord/src/bot/DraftBotShard.js", {
        totalShards: shardCount,
        token: config.DISCORD_CLIENT_TOKEN
    });
    startShardingManagerMqtt(config, shardingManager);
    shardingManager.on("shardCreate", shard => {
        shard.on("ready", () => DraftBotLogger_1.DraftBotLogger.info("Shard connected to Discord's Gateway"));
        shard.on("spawn", () => {
            spawnedShards.push(shard);
            DraftBotLogger_1.DraftBotLogger.info(`Shard ${shard.id} created`);
            shard.send({
                type: "shardId",
                data: {
                    shardId: shard.id,
                    shardCount: shardingManager.totalShards
                }
            })
                .then();
        });
        shard.on("death", () => DraftBotLogger_1.DraftBotLogger.error(`Shard ${shard.id} exited`));
        shard.on("disconnect", () => {
            DraftBotLogger_1.DraftBotLogger.error(`Shard ${shard.id} disconnected`);
        });
        shard.on("reconnecting", () => {
            DraftBotLogger_1.DraftBotLogger.error(`Shard ${shard.id} reconnecting`);
        });
        shard.on("error", err => DraftBotLogger_1.DraftBotLogger.errorWithObj(`Shard ${shard.id} error`, err));
    });
    if (config.DBL_TOKEN !== "" && config.DBL_TOKEN !== "") {
        (0, topgg_autoposter_1.AutoPoster)(config.DBL_TOKEN, shardingManager)
            .on("posted", data => {
            DraftBotLogger_1.DraftBotLogger.info(`Successfully posted following data to DBL: ${data}`);
        });
    }
    shardingManager.spawn({
        amount: shardCount
    }).catch(e => {
        DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while spawning shards", e);
    });
}
main();
//# sourceMappingURL=index.js.map