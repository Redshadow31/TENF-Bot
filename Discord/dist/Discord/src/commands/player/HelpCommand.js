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
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const BotUtils_1 = require("../../utils/BotUtils");
const Language_1 = require("../../../../Lib/src/Language");
const PetConstants_1 = require("../../../../Lib/src/constants/PetConstants");
const HelpConstants_1 = require("../../../../Lib/src/constants/HelpConstants");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DraftBotLogger_1 = require("../../../../Lib/src/logs/DraftBotLogger");
const StringUtils_1 = require("../../utils/StringUtils");
const dmHelpCooldowns = new Map();
function getListOfMentionFromCommandData(commandData, lng) {
    const commandName = commandData[1].NAME;
    const commandMention = BotUtils_1.BotUtils.commandsMentions.get(commandName);
    return commandMention ? commandMention : i18n_1.default.t("error:commandDoesntExist", { lng });
}
function getCommandByCategories(language) {
    const utilCommands = [], playerCommands = [], missionCommands = [], guildCommands = [], petCommands = [];
    for (const commandData of Object.entries(HelpConstants_1.HelpConstants.COMMANDS_DATA)) {
        switch (commandData[1].CATEGORY) {
            case HelpConstants_1.HelpConstants.COMMAND_CATEGORY.UTIL:
                utilCommands.push(getListOfMentionFromCommandData(commandData, language));
                break;
            case HelpConstants_1.HelpConstants.COMMAND_CATEGORY.PLAYER:
                playerCommands.push(getListOfMentionFromCommandData(commandData, language));
                break;
            case HelpConstants_1.HelpConstants.COMMAND_CATEGORY.MISSION:
                missionCommands.push(getListOfMentionFromCommandData(commandData, language));
                break;
            case HelpConstants_1.HelpConstants.COMMAND_CATEGORY.GUILD:
                guildCommands.push(getListOfMentionFromCommandData(commandData, language));
                break;
            case HelpConstants_1.HelpConstants.COMMAND_CATEGORY.PET:
                petCommands.push(getListOfMentionFromCommandData(commandData, language));
                break;
            default:
                break;
        }
    }
    return {
        utilCommands,
        playerCommands,
        missionCommands,
        guildCommands,
        petCommands
    };
}
function generateGenericHelpMessage(helpMessage, interaction) {
    const lng = interaction.userLanguage;
    const { utilCommands, playerCommands, missionCommands, guildCommands, petCommands } = getCommandByCategories(lng);
    helpMessage.formatAuthor(i18n_1.default.t("commands:help.helpEmbedTitle", {
        lng,
        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
    }), interaction.user);
    helpMessage.setDescription(`${i18n_1.default.t("commands:help.helpEmbedDescription", {
        lng
    })}\n\u200b`);
    helpMessage.addFields([
        {
            name: i18n_1.default.t("commands:help.utilCommands", { lng }),
            value: `${utilCommands.sort()
                .join(HelpConstants_1.HelpConstants.COMMAND_SEPARATOR_FOR_GENERAL_DESCRIPTION)}`
        },
        {
            name: i18n_1.default.t("commands:help.playerCommands", { lng }),
            value: `${playerCommands.join(HelpConstants_1.HelpConstants.COMMAND_SEPARATOR_FOR_GENERAL_DESCRIPTION)}`
        },
        {
            name: i18n_1.default.t("commands:help.missionCommands", { lng }),
            value: `${missionCommands.join(HelpConstants_1.HelpConstants.COMMAND_SEPARATOR_FOR_GENERAL_DESCRIPTION)}`
        },
        {
            name: i18n_1.default.t("commands:help.guildCommands", { lng }),
            value: `${guildCommands.sort()
                .join(HelpConstants_1.HelpConstants.COMMAND_SEPARATOR_FOR_GENERAL_DESCRIPTION)}`
        },
        {
            name: i18n_1.default.t("commands:help.petCommands", { lng }),
            value: `${petCommands.sort()
                .join(HelpConstants_1.HelpConstants.COMMAND_SEPARATOR_FOR_GENERAL_DESCRIPTION)} \n\u200b`
        },
        {
            name: i18n_1.default.t("commands:help.forMoreHelp", { lng }),
            value: i18n_1.default.t("commands:help.forMoreHelpValue", { lng })
        }
    ]);
}
function getCommandAliasMap() {
    const helpAlias = new Map();
    Object.entries(HelpConstants_1.HelpConstants.ACCEPTED_SEARCH_WORDS)
        .forEach(commands => {
        for (const alias of commands[1]) {
            helpAlias.set(alias, commands[0]);
        }
    });
    return helpAlias;
}
function sendHelpDm(interaction, lng) {
    DraftBotShard_1.draftBotClient.shard.broadcastEval((client, context) => __awaiter(this, void 0, void 0, function* () {
        const guild = yield client.guilds.fetch(context.mainServerId);
        if (guild.shard) {
            try {
                return Boolean(yield guild.members.fetch(context.userId));
            }
            catch (_a) {
                return false;
            }
        }
        return false;
    }), {
        context: {
            mainServerId: DraftBotShard_1.discordConfig.MAIN_SERVER_ID,
            userId: interaction.user.id
        }
    })
        .then((ret) => {
        if (!ret.some(value => value)) {
            interaction.user.send({
                content: HelpConstants_1.HelpConstants.HELP_INVITE_LINK,
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("commands:help.needHelp", {
                        lng
                    }), interaction.user)
                        .setDescription(i18n_1.default.t("commands:help.needHelpDescription", {
                        lng,
                        inviteLink: HelpConstants_1.HelpConstants.HELP_INVITE_LINK
                    }))
                ]
            })
                .catch(e => {
                DraftBotLogger_1.DraftBotLogger.errorWithObj(`Error while sending help DM to user ${interaction.user.id}`, e);
            });
        }
        dmHelpCooldowns.set(interaction.user.id, new Date(Date.now() + (0, TimeUtils_1.minutesToMilliseconds)(HelpConstants_1.HelpConstants.HELP_DM_COOLDOWN_TIME_MINUTES)));
    })
        .catch(error => {
        DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while broadcasting the message in help command", error);
    });
}
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const helpMessage = new DraftBotEmbed_1.DraftBotEmbed();
        const command = interaction.options.get(i18n_1.default.t("discordBuilder:help.options.commandName.name", { lng: Language_1.LANGUAGE.ENGLISH }));
        const askedCommand = command ? command.value : null;
        const lng = interaction.userLanguage;
        if (!askedCommand) {
            generateGenericHelpMessage(helpMessage, interaction);
            yield interaction.reply({
                embeds: [helpMessage]
            });
        }
        else {
            const helpAlias = getCommandAliasMap();
            const command = helpAlias.get(askedCommand.toLowerCase()
                .replace(" ", ""));
            if (!command) {
                generateGenericHelpMessage(helpMessage, interaction);
                yield interaction.reply({
                    embeds: [helpMessage]
                });
                return null;
            }
            const commandMention = BotUtils_1.BotUtils.commandsMentions.get(HelpConstants_1.HelpConstants.COMMANDS_DATA[command].NAME);
            const commandMentionString = commandMention ? commandMention : i18n_1.default.t("error:commandDoesntExist", { lng });
            if (command === "FIGHT") {
                helpMessage.setImage(i18n_1.default.t("commands:help.commands.FIGHT.image", { lng }));
            }
            helpMessage.setTitle(i18n_1.default.t("commands:help.commandEmbedTitle", {
                lng,
                emote: HelpConstants_1.HelpConstants.COMMANDS_DATA[command].EMOTE
            }))
                .setDescription(i18n_1.default.t(`commands:help.commands.${command}.description`, {
                lng: interaction.userLanguage,
                petSellMinPrice: PetConstants_1.PetConstants.SELL_PRICE.MIN,
                petSellMaxPrice: PetConstants_1.PetConstants.SELL_PRICE.MAX
            }))
                .addFields({
                name: i18n_1.default.t("commands:help.usageFieldTitle", { lng }),
                value: commandMentionString,
                inline: true
            });
            yield interaction.reply({
                embeds: [helpMessage]
            });
        }
        const dmCooldown = dmHelpCooldowns.get(interaction.user.id);
        if (!dmCooldown || dmCooldown && dmCooldown.valueOf() < Date.now()) {
            sendHelpDm(interaction, lng);
        }
        return null;
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("help")
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("help", "commandName", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=HelpCommand.js.map