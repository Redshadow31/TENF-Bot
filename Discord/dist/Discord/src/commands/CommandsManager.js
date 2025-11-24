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
exports.CommandsManager = void 0;
const discord_js_1 = require("discord.js");
const v10_1 = require("discord-api-types/v10");
const DraftBotShard_1 = require("../bot/DraftBotShard");
const fs_1 = require("fs");
const i18n_1 = require("../translations/i18n");
const ErrorUtils_1 = require("../utils/ErrorUtils");
const Constants_1 = require("../../../Lib/src/constants/Constants");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const StringUtils_1 = require("../../../Lib/src/utils/StringUtils");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DraftbotInteraction_1 = require("../messages/DraftbotInteraction");
const DiscordCache_1 = require("../bot/DiscordCache");
const BotUtils_1 = require("../utils/BotUtils");
const Language_1 = require("../../../Lib/src/Language");
const PacketUtils_1 = require("../utils/PacketUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DiscordConstants_1 = require("../DiscordConstants");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
class CommandsManager {
    static register(client, isMainShard) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.registerAllCommands(client, isMainShard);
            this.manageInteractionCreate(client);
            this.manageMessageCreate(client);
        });
    }
    static registerCommands(clientId, commands, regFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            const rest = new discord_js_1.REST({ version: "10" }).setToken(DraftBotShard_1.discordConfig.DISCORD_CLIENT_TOKEN);
            try {
                DraftBotLogger_1.DraftBotLogger.info(`Started refreshing ${commands.length} application (/) commands.`);
                const data = yield rest.put(regFunc(clientId, DraftBotShard_1.discordConfig.MAIN_SERVER_ID), { body: commands });
                if (Array.isArray(data)) {
                    DraftBotLogger_1.DraftBotLogger.info(`Successfully reloaded ${data.length} application (/) commands.`);
                }
                else {
                    DraftBotLogger_1.DraftBotLogger.error("Failed to reload commands", { data });
                }
            }
            catch (error) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Failed to reload commands", error);
            }
        });
    }
    static registerAllCommands(client, isMainShard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCommandToRegister = yield this.getAllCommandsToRegister();
                if (isMainShard) {
                    yield CommandsManager.registerCommands(client.application.id, allCommandToRegister[1], v10_1.Routes.applicationGuildCommands);
                    yield CommandsManager.registerCommands(client.application.id, allCommandToRegister[0], v10_1.Routes.applicationCommands);
                }
                yield this.refreshCommands(client);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Failed to register commands", e);
                process.exit(1);
            }
        });
    }
    static handlePrivateMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = message instanceof discord_js_1.Message ? message.author.id : message.user.id;
            if (author === DraftBotShard_1.discordConfig.DM_MANAGER_ID) {
                return;
            }
            if (message instanceof discord_js_1.Message) {
                yield this.sendBackDMMessageToSupportChannel(message);
            }
            yield this.sendHelperMessage(message);
        });
    }
    static getAllCommandsToRegister() {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = (0, fs_1.readdirSync)("dist/Discord/src/commands");
            const globalCommandsToRegister = [];
            const guildsCommandsToRegister = [];
            const commandsToCheck = [];
            for (const category of categories) {
                if (category.endsWith(".js") || category.endsWith(".js.map")) {
                    continue;
                }
                commandsToCheck.push(this.checkCommandFromCategory(category, globalCommandsToRegister, guildsCommandsToRegister));
            }
            yield Promise.all(commandsToCheck);
            return [globalCommandsToRegister, guildsCommandsToRegister];
        });
    }
    static refreshCommands(client) {
        return __awaiter(this, void 0, void 0, function* () {
            DraftBotLogger_1.DraftBotLogger.info("Fetching and saving commands...");
            const commands = (yield client.application.commands.fetch({ withLocalizations: true }))
                .concat(yield (yield client.guilds.fetch(DraftBotShard_1.discordConfig.MAIN_SERVER_ID)).commands.fetch({ withLocalizations: true }));
            for (const command of commands) {
                CommandsManager.commandsInstances.set(command[1].name, command[1]);
                this.addSubCommandsToTheCommandsMentions(command);
                BotUtils_1.BotUtils.commandsMentions.set(command[1].name, `</${command[1].name}:${command[0]}>`);
            }
        });
    }
    static addSubCommandsToTheCommandsMentions(command) {
        if (command[1].options) {
            for (const option of command[1].options) {
                if (option.type === discord_js_1.ApplicationCommandOptionType.Subcommand) {
                    BotUtils_1.BotUtils.commandsMentions.set(`${command[1].name} ${option.name}`, `</${command[1].name} ${option.name}:${command[0]}>`);
                }
            }
        }
    }
    static checkCommandFromCategory(category, globalCommandsToRegister, guildsCommandsToRegister) {
        return __awaiter(this, void 0, void 0, function* () {
            let commandsFiles = (0, fs_1.readdirSync)(`dist/Discord/src/commands/${category}`)
                .filter(command => command.endsWith(".js"));
            if (!DraftBotShard_1.discordConfig.TEST_MODE) {
                commandsFiles = commandsFiles.filter(command => !command.startsWith("Test"));
            }
            for (const commandFile of commandsFiles) {
                const commandInfo = (yield Promise.resolve(`${`./${category}/${commandFile}`}`).then(s => require(s))).commandInfo;
                if (!(commandInfo === null || commandInfo === void 0 ? void 0 : commandInfo.slashCommandBuilder)) {
                    DraftBotLogger_1.DraftBotLogger.error(`Command dist/Discord/src/commands/${category}/${commandFile} is not a slash command`);
                    continue;
                }
                this.commands.set(commandInfo.slashCommandBuilder.name, commandInfo);
                if (commandInfo.mainGuildCommand || DraftBotShard_1.discordConfig.TEST_MODE) {
                    guildsCommandsToRegister.push(commandInfo.slashCommandBuilder.toJSON());
                    DraftBotLogger_1.DraftBotLogger.info(`Registering guild command ${category}/${commandFile}`);
                }
                else {
                    globalCommandsToRegister.push(commandInfo.slashCommandBuilder.toJSON());
                    DraftBotLogger_1.DraftBotLogger.info(`Registering global command ${category}/${commandFile}`);
                }
            }
        });
    }
    static manageMessageCreate(client) {
        client.on("messageCreate", (message) => __awaiter(this, void 0, void 0, function* () {
            if (this.isAMessageFromBotOrEmpty(message)) {
                return;
            }
            if (message.channel.type === discord_js_1.ChannelType.DM) {
                yield CommandsManager.handlePrivateMessage(message);
                return;
            }
            if (this.isAMessageFromMassOrMissPing(message) || !this.shouldSendHelpMessage(message, client)) {
                return;
            }
            const user = yield KeycloakUtils_1.KeycloakUtils.getDiscordUser(DraftBotShard_1.keycloakConfig, message.author.id, (0, StringUtils_1.escapeUsername)(message.author.displayName));
            message.channel.send({
                content: `${i18n_1.default.t("bot:mentionHelp", {
                    lng: !user.isError ? KeycloakUtils_1.KeycloakUtils.getUserLanguage(user.payload.user) : Language_1.LANGUAGE.DEFAULT_LANGUAGE
                })}`
            })
                .then();
        }));
    }
    static shouldSendHelpMessage(message, client) {
        return message.mentions.has(client.user.id) && this.hasChannelPermission(message.channel)[0];
    }
    static isAMessageFromMassOrMissPing(message) {
        return message.content.includes("@here") || message.content.includes("@everyone") || message.type === discord_js_1.MessageType.Reply;
    }
    static isAMessageFromBotOrEmpty(message) {
        return message.author.bot || message.author.id === DraftBotShard_1.draftBotClient.user.id || !message.content && message.channel.type !== discord_js_1.ChannelType.DM;
    }
    static manageInteractionCreate(client) {
        client.on("interactionCreate", (discordInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (!discordInteraction.isCommand() || discordInteraction.user.bot || discordInteraction.user.id === DraftBotShard_1.draftBotClient.user.id) {
                return;
            }
            const interaction = DraftbotInteraction_1.DraftbotInteraction.cast(discordInteraction);
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getOrRegisterDiscordUser(DraftBotShard_1.keycloakConfig, discordInteraction.user.id, (0, StringUtils_1.escapeUsername)(discordInteraction.user.displayName), discordInteraction.locale.substring(0, 2));
            if (getUser.isError) {
                const errorLng = discordInteraction.locale.substring(0, 2);
                (0, ErrorUtils_1.replyEphemeralErrorMessage)(null, interaction, i18n_1.default.t("error:errorOccurred", { lng: Language_1.LANGUAGE.LANGUAGES.includes(errorLng) ? errorLng : Language_1.LANGUAGE.DEFAULT_LANGUAGE }))
                    .finally(() => null);
                DraftBotLogger_1.DraftBotLogger.error("Error while getting user", { apiResult: getUser });
                return;
            }
            const lng = KeycloakUtils_1.KeycloakUtils.getUserLanguage(getUser.payload.user);
            interaction.userLanguage = lng;
            if (!interaction.channel) {
                (0, ErrorUtils_1.replyEphemeralErrorMessage)(null, interaction, i18n_1.default.t("bot:noChannelAccess", { lng }))
                    .finally(() => null);
                return;
            }
            if (!interaction.member) {
                CommandsManager.handlePrivateMessage(discordInteraction)
                    .finally(() => null);
                return;
            }
            CommandsManager.handleCommand(interaction, getUser.payload.user)
                .then();
        }));
    }
    static sendBackDMMessageToSupportChannel(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DraftBotShard_1.draftBotClient.users.fetch(DraftBotShard_1.discordConfig.DM_MANAGER_ID)
                .then((user) => __awaiter(this, void 0, void 0, function* () {
                const attachmentList = Array.from(message.attachments.values());
                if (message.content.length > Constants_1.Constants.DM.MAX_MESSAGE_LENGTH_ALLOWED) {
                    attachmentList.push(new discord_js_1.AttachmentBuilder(Buffer.from(message.content)).setName(`userMessage-${message.author.id}-${message.id}.txt`));
                }
                const supportAlert = i18n_1.default.t("bot:supportAlert", {
                    lng: Language_1.LANGUAGE.FRENCH,
                    username: (0, StringUtils_1.escapeUsername)(message.author.displayName),
                    id: message.author.id
                }) + (message.content.length > Constants_1.Constants.DM.MAX_MESSAGE_LENGTH_ALLOWED
                    ? Constants_1.Constants.DM.TOO_LONG_MESSAGE
                    : message.content.length === 0
                        ? Constants_1.Constants.DM.NO_MESSAGE
                        : Constants_1.Constants.DM.COMMENT_MESSAGE_START + message.content);
                yield user.send({
                    content: supportAlert,
                    files: attachmentList.slice(0, Constants_1.Constants.DM.MAX_ATTACHMENTS)
                });
                for (let i = 1; i < attachmentList.length / Constants_1.Constants.DM.MAX_ATTACHMENTS; i++) {
                    yield user.send({
                        content: "",
                        files: attachmentList.slice(i * Constants_1.Constants.DM.MAX_ATTACHMENTS, (i + 1) * Constants_1.Constants.DM.MAX_ATTACHMENTS)
                    });
                }
            }))
                .catch(e => DraftBotLogger_1.DraftBotLogger.warn("Could not find a place to forward the DM message", e));
        });
    }
    static sendSupportMessage(message, title, descTrKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const author = message instanceof discord_js_1.Message ? message.author : message.user;
            const sendMessage = message instanceof discord_js_1.CommandInteraction ? message.followUp.bind(message) : message.author.send.bind(message.author);
            const row = [new discord_js_1.ActionRowBuilder()];
            let desc = "";
            for (const lng of [Language_1.LANGUAGE.FRENCH, Language_1.LANGUAGE.ENGLISH]) {
                desc += `${i18n_1.default.t(descTrKey, {
                    lng,
                    langFlag: DraftBotIcons_1.DraftBotIcons.languages[lng]
                })}\n`;
            }
            for (const lng of Language_1.LANGUAGE.LANGUAGES) {
                if (row[row.length - 1].components.length >= DiscordConstants_1.DiscordConstants.MAX_BUTTONS_PER_ROW) {
                    row.push(new discord_js_1.ActionRowBuilder());
                }
                row[row.length - 1].addComponents(new discord_js_1.ButtonBuilder()
                    .setEmoji(DraftBotIcons_1.DraftBotIcons.languages[lng])
                    .setCustomId(lng)
                    .setStyle(discord_js_1.ButtonStyle.Secondary));
            }
            const supportMessage = new DraftBotEmbed_1.DraftBotEmbed()
                .formatAuthor(title, author)
                .setDescription(desc);
            const msg = yield message.reply({
                embeds: [supportMessage],
                content: Constants_1.Constants.DM.INVITE_LINK,
                components: row
            });
            const collector = msg.createMessageComponentCollector({
                filter: interaction => interaction instanceof discord_js_1.ButtonInteraction,
                time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
            });
            collector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
                collector.stop();
                const lng = buttonInteraction.customId;
                yield sendMessage({
                    embeds: [
                        new DraftBotEmbed_1.DraftBotEmbed()
                            .formatAuthor(i18n_1.default.t("bot:dmHelpMessageTitle", {
                            lng
                        }), author)
                            .setDescription(i18n_1.default.t("bot:dmHelpMessage", { lng }))
                    ]
                });
            }));
            collector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield msg.edit({
                    components: []
                });
            }));
        });
    }
    static sendHelperMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message instanceof discord_js_1.Message) {
                yield CommandsManager.sendSupportMessage(message, Constants_1.Constants.DM.TITLE_SUPPORT, "bot:supportMessage");
            }
            else {
                yield CommandsManager.sendSupportMessage(message, Constants_1.Constants.DM.TITLE_SUPPORT, "bot:commandDisabledInDM");
            }
        });
    }
    static handleCommand(interaction, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const lng = interaction.userLanguage;
            const commandInfo = this.commands.get(interaction.commandName);
            if (!commandInfo) {
                yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(null, interaction, i18n_1.default.t("bot:command404", { lng }));
                DraftBotLogger_1.DraftBotLogger.error(`Command "${interaction.commandName}" is not registered`);
                return;
            }
            const channelAccess = this.hasChannelPermission(interaction.channel);
            if (!channelAccess[0]) {
                yield (0, ErrorUtils_1.replyEphemeralErrorMessage)(null, interaction, i18n_1.default.t(channelAccess[1], { lng }));
                return;
            }
            DiscordCache_1.DiscordCache.cacheInteraction(interaction);
            const packet = yield commandInfo.getPacket(interaction, user);
            if (packet) {
                const context = yield PacketUtils_1.PacketUtils.createPacketContext(interaction, user);
                PacketUtils_1.PacketUtils.sendPacketToBackend(context, packet);
            }
        });
    }
    static hasChannelPermission(channel) {
        var _a, _b, _c, _d, _e, _f, _g;
        if (!((_a = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _a === void 0 ? void 0 : _a.has(discord_js_1.PermissionsBitField.Flags.ViewChannel))) {
            DraftBotLogger_1.DraftBotLogger.error(`No way to access the channel where the command has been executed : ${channel.guildId}/${channel.id}`);
            return [false, "noChannelAccess"];
        }
        if (!((_b = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _b === void 0 ? void 0 : _b.has(discord_js_1.PermissionsBitField.Flags.SendMessages))) {
            DraftBotLogger_1.DraftBotLogger.error(`No way to send messages in the channel where the command has been executed : ${channel.guildId}/${channel.id}`);
            return [false, "noSpeakPermission"];
        }
        if (!((_c = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _c === void 0 ? void 0 : _c.has(discord_js_1.PermissionsBitField.Flags.SendMessagesInThreads)) && channel.isThread()) {
            const thread = channel;
            DraftBotLogger_1.DraftBotLogger.error(`No way to send messages in the thread where the command has been executed : ${thread.guildId}/${thread.id}`);
            return [false, "noSpeakInThreadPermission"];
        }
        if (!((_d = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _d === void 0 ? void 0 : _d.has(discord_js_1.PermissionsBitField.Flags.AddReactions))) {
            DraftBotLogger_1.DraftBotLogger.error(`No perms to show i can't react in server / channel : ${channel.guildId}/${channel.id}`);
            return [false, "noReacPermission"];
        }
        if (!((_e = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _e === void 0 ? void 0 : _e.has(discord_js_1.PermissionsBitField.Flags.EmbedLinks))) {
            DraftBotLogger_1.DraftBotLogger.error(`No perms to show i can't embed in server / channel : ${channel.guildId}/${channel.id}`);
            return [false, "noEmbedPermission"];
        }
        if (!((_f = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _f === void 0 ? void 0 : _f.has(discord_js_1.PermissionsBitField.Flags.AttachFiles))) {
            DraftBotLogger_1.DraftBotLogger.error(`No perms to show i can't attach files in server / channel : ${channel.guildId}/${channel.id}`);
            return [false, "noFilePermission"];
        }
        if (!((_g = channel.permissionsFor(DraftBotShard_1.draftBotClient.user)) === null || _g === void 0 ? void 0 : _g.has(discord_js_1.PermissionsBitField.Flags.ReadMessageHistory))) {
            DraftBotLogger_1.DraftBotLogger.error(`No perms to show i can't see messages history in server / channel : ${channel.guildId}/${channel.id}`);
            return [false, "noHistoryPermission"];
        }
        return [true, ""];
    }
}
exports.CommandsManager = CommandsManager;
CommandsManager.commands = new Map();
CommandsManager.commandsInstances = new Map();
//# sourceMappingURL=CommandsManager.js.map