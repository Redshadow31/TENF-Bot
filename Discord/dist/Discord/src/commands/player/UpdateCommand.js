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
exports.handleCommandUpdatePacketRes = handleCommandUpdatePacketRes;
const CommandUpdatePacket_1 = require("../../../../Lib/src/packets/commands/CommandUpdatePacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCache_1 = require("../../bot/DiscordCache");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandUpdatePacket_1.CommandUpdatePacketReq, {});
}
function handleCommandUpdatePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setTitle(i18n_1.default.t("commands:update.title", { lng }))
                    .setDescription(i18n_1.default.t("commands:update.description", {
                    coreVersion: packet.coreVersion,
                    discordModuleVersion: process.env.npm_package_version,
                    lng
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("update"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=UpdateCommand.js.map