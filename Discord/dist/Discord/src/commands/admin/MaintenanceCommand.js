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
exports.handleCommandMaintenancePacketRes = handleCommandMaintenancePacketRes;
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandMaintenancePacket_1 = require("../../../../Lib/src/packets/commands/CommandMaintenancePacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCache_1 = require("../../bot/DiscordCache");
function getPacket(interaction) {
    const enable = interaction.options.getBoolean("enable");
    const save = interaction.options.getBoolean("save");
    return (0, DraftBotPacket_1.makePacket)(CommandMaintenancePacket_1.CommandMaintenancePacketReq, {
        enable: enable.valueOf(),
        save: save.valueOf()
    });
}
function handleCommandMaintenancePacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:maintenance.title", { lng }), interaction.user)
                    .setDescription(i18n_1.default.t(packet.enabled ? "commands:maintenance.on" : "commands:maintenance.off", { lng }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("maintenance")
        .addBooleanOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("maintenance", "enable", option)
        .setRequired(true))
        .addBooleanOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("maintenance", "save", option)
        .setRequired(true)),
    getPacket,
    mainGuildCommand: true
};
//# sourceMappingURL=MaintenanceCommand.js.map