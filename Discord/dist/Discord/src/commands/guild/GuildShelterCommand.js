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
exports.handleCommandGuildShelterRes = handleCommandGuildShelterRes;
const CommandGuildShelterPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildShelterPacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildShelterPacket_1.CommandGuildShelterPacketReq, {});
}
function handleCommandGuildShelterRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:guildShelter.embedTitle", {
            lng,
            guildName: packet.guildName,
            count: packet.pets.length,
            max: packet.maxCount
        }))
            .addFields(packet.pets.map((pet, index) => ({
            name: i18n_1.default.t("commands:guildShelter.petFieldName", {
                lng,
                number: index + 1
            }),
            value: DisplayUtils_1.DisplayUtils.getOwnedPetFieldDisplay(pet, lng),
            inline: true
        })));
        if (packet.pets.length === packet.maxCount) {
            embed.setFooter({ text: i18n_1.default.t("commands:guildShelter.warningFull", { lng }) });
        }
        yield interaction.reply({
            embeds: [embed]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildShelter"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildShelterCommand.js.map