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
exports.DraftBotDiscordWebServer = void 0;
const DraftBotDiscordMetrics_1 = require("./DraftBotDiscordMetrics");
const DraftBotShard_1 = require("./DraftBotShard");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const express = require("express");
class DraftBotDiscordWebServer {
    static start(shardId) {
        const app = express();
        app.get("/metrics", (_req, res) => __awaiter(this, void 0, void 0, function* () {
            res.setHeader("Content-Type", DraftBotDiscordMetrics_1.draftBotMetricsRegistry.contentType);
            res.end(yield DraftBotDiscordMetrics_1.draftBotMetricsRegistry.metrics());
        }));
        app.post("/log_level", (req, res) => {
            const logger = DraftBotLogger_1.DraftBotLogger.get();
            if (!req.query.level) {
                res.status(400).send("Missing log level");
                return;
            }
            logger.level = req.query.level.toString();
            logger.info("Log level changed", { logLevel: logger.level });
            res.status(200).send("OK");
        });
        app.listen(DraftBotShard_1.discordConfig.WEB_SERVER_PORT + shardId, () => {
            DraftBotLogger_1.DraftBotLogger.info(`Web server is running on port ${DraftBotShard_1.discordConfig.WEB_SERVER_PORT + shardId}`);
        });
    }
}
exports.DraftBotDiscordWebServer = DraftBotDiscordWebServer;
//# sourceMappingURL=DraftBotDiscordWebServer.js.map