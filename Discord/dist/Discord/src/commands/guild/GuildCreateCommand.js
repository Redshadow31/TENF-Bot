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
exports.handleCommandGuildCreatePacketRes = handleCommandGuildCreatePacketRes;
exports.createGuildCreateCollector = createGuildCreateCollector;
exports.handleCommandGuildCreateRefusePacketRes = handleCommandGuildCreateRefusePacketRes;
exports.handleCommandGuildCreateAcceptPacketRes = handleCommandGuildCreateAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const CommandGuildCreatePacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildCreatePacket");
const GuildConstants_1 = require("../../../../Lib/src/constants/GuildConstants");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const GuildCreateConstants_1 = require("../../../../Lib/src/constants/GuildCreateConstants");
const Language_1 = require("../../../../Lib/src/Language");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction, user) {
    const askedGuildName = interaction.options.get("name", true).value;
    return (0, DraftBotPacket_1.makePacket)(CommandGuildCreatePacket_1.CommandGuildCreatePacketReq, {
        keycloakId: user.id,
        askedGuildName
    });
}
function replyErrorEmbed(context_1, errorKey_1) {
    return __awaiter(this, arguments, void 0, function* (context, errorKey, formatParams = {}) {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const replacements = Object.assign({ lng: (_a = interaction === null || interaction === void 0 ? void 0 : interaction.userLanguage) !== null && _a !== void 0 ? _a : Language_1.LANGUAGE.ENGLISH }, formatParams);
        const params = {
            embeds: [
                new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t(errorKey, replacements))
            ]
        };
        if (interaction && buttonInteraction) {
            yield buttonInteraction.editReply(params);
        }
        else if (interaction) {
            yield interaction.reply(params);
        }
    });
}
function handleCommandGuildCreatePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            if (packet.playerMoney < GuildCreateConstants_1.GuildCreateConstants.PRICE) {
                yield replyErrorEmbed(context, "error:notEnoughMoney", {
                    money: GuildCreateConstants_1.GuildCreateConstants.PRICE - packet.playerMoney
                });
                return;
            }
            if (packet.foundGuild) {
                yield replyErrorEmbed(context, "error:alreadyInAGuild");
                return;
            }
            if (!packet.guildNameIsAvailable) {
                yield replyErrorEmbed(context, "error:guildAlreadyExist");
                return;
            }
            if (!packet.guildNameIsAcceptable) {
                yield replyErrorEmbed(context, "error:guildNameNotValid", {
                    min: GuildConstants_1.GuildConstants.GUILD_NAME_LENGTH_RANGE.MIN,
                    max: GuildConstants_1.GuildConstants.GUILD_NAME_LENGTH_RANGE.MAX
                });
            }
        }
    });
}
function createGuildCreateCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildCreate.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:guildCreate.confirmDesc", {
            lng,
            guildName: data.guildName,
            price: GuildCreateConstants_1.GuildCreateConstants.PRICE
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandGuildCreateRefusePacketRes(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildCreate.canceledTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildCreate.canceledDesc", { lng }))
                        .setErrorColor()
                ]
            });
        }
    });
}
function handleCommandGuildCreateAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:guildCreate.title", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:guildCreate.acceptedDesc", {
                        lng,
                        guildName: packet.guildName
                    }))
                        .setFooter({
                        text: i18n_1.default.t("commands:guildCreate.acceptedFooter", { lng })
                    })
                ]
            });
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildCreate")
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("guildCreate", "guildName", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildCreateCommand.js.map