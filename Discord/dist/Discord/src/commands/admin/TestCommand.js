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
exports.handleCommandTestPacketRes = handleCommandTestPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandTestPacket_1 = require("../../../../Lib/src/packets/commands/CommandTestPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const ColorConstants_1 = require("../../../../Lib/src/constants/ColorConstants");
function getPacket(interaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandName = interaction.options.get("command");
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandTestPacket_1.CommandTestPacketReq, {
            keycloakId: user.id,
            command: commandName ? commandName.value : undefined
        });
    });
}
function handleCommandTestPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            if (packet.isError) {
                if (interaction.replied) {
                    yield interaction.channel.send({ content: packet.result });
                }
                else {
                    yield interaction.editReply({ content: packet.result });
                }
            }
            else {
                const embedTestSuccessful = new DraftBotEmbed_1.DraftBotEmbed()
                    .setAuthor({
                    name: `Commande test ${packet.commandName} exécutée :`,
                    iconURL: interaction.user.displayAvatarURL()
                })
                    .setDescription(packet.result)
                    .setColor(ColorConstants_1.ColorConstants.SUCCESSFUL);
                if (interaction.replied) {
                    yield interaction.channel.send({ embeds: [embedTestSuccessful] });
                }
                else {
                    yield interaction.editReply({ embeds: [embedTestSuccessful] });
                }
            }
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("test")
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("test", "commandName", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=TestCommand.js.map