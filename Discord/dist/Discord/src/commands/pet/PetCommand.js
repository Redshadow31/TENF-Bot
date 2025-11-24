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
exports.handleCommandPetPacketRes = handleCommandPetPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandPetPacket_1 = require("../../../../Lib/src/packets/commands/CommandPetPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCache_1 = require("../../bot/DiscordCache");
const PacketUtils_1 = require("../../utils/PacketUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandPetPacket_1.CommandPetPacketReq, { askedPlayer });
    });
}
function handleCommandPetPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        let foundPlayerUsername;
        if (packet.askedKeycloakId) {
            foundPlayerUsername = yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.askedKeycloakId, lng);
        }
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:pet.embedTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(foundPlayerUsername !== null && foundPlayerUsername !== void 0 ? foundPlayerUsername : interaction.user.displayName)
                }), interaction.user)
                    .setDescription(DisplayUtils_1.DisplayUtils.getOwnedPetFieldDisplay(packet.pet, lng))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("pet")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("pet", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("pet", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetCommand.js.map