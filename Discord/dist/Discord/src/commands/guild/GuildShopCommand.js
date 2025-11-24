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
exports.handleCommandGuildShopNoFoodStorageSpace = handleCommandGuildShopNoFoodStorageSpace;
exports.handleCommandGuildShopEmpty = handleCommandGuildShopEmpty;
exports.handleCommandGuildShopGiveXp = handleCommandGuildShopGiveXp;
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandGuildShopPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildShopPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildShopPacket_1.CommandGuildShopPacketReq, {});
}
function handleCommandGuildShopNoFoodStorageSpace(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:guildShop.noFoodStorageSpace", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandGuildShopEmpty(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:guildShop.empty", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandGuildShopGiveXp(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:guildShop.giveXpTitle", { lng }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:guildShop.giveXp", {
                    lng,
                    xp: packet.xp
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildShop"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildShopCommand.js.map