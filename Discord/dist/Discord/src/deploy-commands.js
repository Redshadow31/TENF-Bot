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
require("dotenv/config");
const discord_js_1 = require("discord.js");
const token = process.env.DISCORD_CLIENT_TOKEN;
const clientId = '1386776996100440145';
const guildId = process.env.GUILD_ID;
console.log("Guild env:", guildId);
const commands = [
    {
        name: 'givebadge',
        description: 'Give a badge to a player.',
        options: [
            {
                name: 'user',
                description: 'The user who will receive the badge.',
                type: 6,
                required: true,
            },
        ],
    },
    {
        name: 'maintenance',
        description: 'Set the bot in maintenance mode.',
        options: [
            {
                name: 'enable',
                description: 'Enable or disable maintenance mode.',
                type: 5,
                required: true,
            },
            {
                name: 'save',
                description: 'Save the maintenance mode to the configuration file.',
                type: 5,
                required: true,
            },
        ],
    },
];
function deployCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token) {
            console.error('DISCORD_CLIENT_TOKEN is not set in the environment variables.');
            process.exit(1);
        }
        const rest = new discord_js_1.REST({ version: '10' }).setToken(token);
        try {
            console.log('Started refreshing application (/) commands.');
            if (guildId) {
                yield rest.put(discord_js_1.Routes.applicationGuildCommands(clientId, guildId), { body: commands });
                console.log(`Successfully reloaded application (/) commands for guild ${guildId}.`);
            }
            else {
                yield rest.put(discord_js_1.Routes.applicationCommands(clientId), { body: commands });
                console.log('Successfully reloaded global application (/) commands.');
            }
        }
        catch (error) {
            console.error('Error while reloading commands:', error);
        }
    });
}
deployCommands();
//# sourceMappingURL=deploy-commands.js.map