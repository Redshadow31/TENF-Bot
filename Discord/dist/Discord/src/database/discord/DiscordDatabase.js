"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordDatabase = void 0;
const Database_1 = require("../../../../Lib/src/database/Database");
const DiscordConfig_1 = require("../../config/DiscordConfig");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
class DiscordDatabase extends Database_1.Database {
    constructor() {
        super((0, DiscordConfig_1.getDatabaseConfiguration)(DraftBotShard_1.discordConfig, "discord"), `${__dirname}/models`, `${__dirname}/migrations`);
    }
}
exports.DiscordDatabase = DiscordDatabase;
//# sourceMappingURL=DiscordDatabase.js.map