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
exports.Intents = exports.discordDatabase = exports.shardId = exports.keycloakConfig = exports.discordConfig = exports.draftBotClient = void 0;
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../../Lib/src/constants/Constants");
const DiscordConfig_1 = require("../config/DiscordConfig");
const i18n_1 = require("../translations/i18n");
const BotUtils_1 = require("../utils/BotUtils");
const CommandsManager_1 = require("../commands/CommandsManager");
const DiscordMQTT_1 = require("./DiscordMQTT");
const Language_1 = require("../../../Lib/src/Language");
const DiscordDatabase_1 = require("../database/discord/DiscordDatabase");
const DraftBotDiscordWebServer_1 = require("./DraftBotDiscordWebServer");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
require("source-map-support/register");
process.on("uncaughtException", error => {
    console.error(`Uncaught exception: ${error}`);
    if (DraftBotLogger_1.DraftBotLogger.isInitialized()) {
        DraftBotLogger_1.DraftBotLogger.errorWithObj("Uncaught exception", error);
    }
});
process.on("unhandledRejection", error => {
    console.error(`Unhandled rejection: ${error}`);
    if (DraftBotLogger_1.DraftBotLogger.isInitialized()) {
        DraftBotLogger_1.DraftBotLogger.errorWithObj("Unhandled rejection", error);
    }
});
exports.discordConfig = (0, DiscordConfig_1.loadConfig)();
exports.keycloakConfig = {
    realm: exports.discordConfig.KEYCLOAK_REALM,
    url: exports.discordConfig.KEYCLOAK_URL,
    clientId: exports.discordConfig.KEYCLOAK_CLIENT_ID,
    clientSecret: exports.discordConfig.KEYCLOAK_CLIENT_SECRET
};
exports.shardId = -1;
let shardCount = -1;
exports.discordDatabase = new DiscordDatabase_1.DiscordDatabase();
process.on("message", (message) => {
    if (!message.type) {
        return false;
    }
    if (message.type === "shardId") {
        exports.shardId = message.data.shardId;
        shardCount = message.data.shardCount;
        DraftBotLogger_1.DraftBotLogger.init(exports.discordConfig.LOGGER_LEVEL, exports.discordConfig.LOGGER_LOCATIONS, {
            app: "Discord",
            shard: exports.shardId.toString(10)
        }, exports.discordConfig.LOKI_HOST
            ? {
                host: exports.discordConfig.LOKI_HOST,
                username: exports.discordConfig.LOKI_USERNAME,
                password: exports.discordConfig.LOKI_PASSWORD
            }
            : undefined);
        DraftBotLogger_1.DraftBotLogger.info(`Starting shard ${exports.shardId} (shards total: ${shardCount})`);
        connectAndStartBot().then();
    }
    return true;
});
class Intents {
}
exports.Intents = Intents;
Intents.LIST = [
    discord_js_1.IntentsBitField.Flags.Guilds,
    discord_js_1.IntentsBitField.Flags.GuildMembers,
    discord_js_1.IntentsBitField.Flags.GuildMessages,
    discord_js_1.IntentsBitField.Flags.GuildMessageReactions,
    discord_js_1.IntentsBitField.Flags.DirectMessages,
    discord_js_1.IntentsBitField.Flags.DirectMessageReactions
];
function connectAndStartBot() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new discord_js_1.Client({
            intents: Intents.LIST,
            allowedMentions: { parse: ["users", "roles"] },
            partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel],
            rest: {
                offset: 0,
                timeout: Constants_1.Constants.MAX_TIME_BOT_RESPONSE
            },
            shardCount,
            shards: [exports.shardId]
        });
        function getJoinLeaveMessage(guild, join, lng) {
            const { validation, humans, bots, ratio } = BotUtils_1.BotUtils.getValidationInfos(guild);
            return i18n_1.default.t(join ? "bot:joinGuild" : "bot:leaveGuild", {
                guild: guild.name,
                humans,
                robots: bots,
                ratio,
                validation,
                lng
            });
        }
        function onDiscordGuildCreate(guild) {
            const msg = getJoinLeaveMessage(guild, true, Language_1.LANGUAGE.ENGLISH);
            DraftBotLogger_1.DraftBotLogger.info(msg);
        }
        function onDiscordGuildDelete(guild) {
            const msg = getJoinLeaveMessage(guild, false, Language_1.LANGUAGE.ENGLISH);
            DraftBotLogger_1.DraftBotLogger.info(msg);
        }
        client.on("ready", () => console.log("Bot is ready"));
        client.on("guildCreate", onDiscordGuildCreate);
        client.on("guildDelete", onDiscordGuildDelete);
        exports.draftBotClient = client;
        yield client.login(exports.discordConfig.DISCORD_CLIENT_TOKEN).catch(error => {
            console.error("Error while logging in the bot", error);
            process.exit(1);
        });
        DraftBotDiscordWebServer_1.DraftBotDiscordWebServer.start(exports.shardId);
        const isMainShard = exports.shardId === 0;
        yield CommandsManager_1.CommandsManager.register(exports.draftBotClient, isMainShard);
        yield DiscordMQTT_1.DiscordMQTT.init(isMainShard);
        yield exports.discordDatabase.init(isMainShard);
        const guild = exports.draftBotClient === null || exports.draftBotClient === void 0 ? void 0 : exports.draftBotClient.guilds.cache.get(exports.discordConfig.MAIN_SERVER_ID);
        if (guild === null || guild === void 0 ? void 0 : guild.shard) {
            (yield guild.channels.fetch(exports.discordConfig.CONSOLE_CHANNEL_ID))
                .send(`:robot: **DraftBot** - v${process.env.npm_package_version} - Shard ${exports.shardId}`)
                .catch(e => {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while sending message to console channel", e);
            });
        }
    });
}
//# sourceMappingURL=DraftBotShard.js.map