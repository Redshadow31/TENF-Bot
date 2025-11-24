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
exports.handleCommandPetNickPacketRes = handleCommandPetNickPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const CommandPetNickPacket_1 = require("../../../../Lib/src/packets/commands/CommandPetNickPacket");
const PetConstants_1 = require("../../../../Lib/src/constants/PetConstants");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction, keycloakUser) {
    const newNameOption = interaction.options.get("nickname");
    let newNickname;
    if (newNameOption) {
        newNickname = newNameOption.value;
    }
    return (0, DraftBotPacket_1.makePacket)(CommandPetNickPacket_1.CommandPetNickPacketReq, {
        keycloakId: keycloakUser.id,
        newNickname
    });
}
function handleCommandPetNickPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        if (!packet.foundPet) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:petDoesntExist", { lng }))
                ]
            });
            return;
        }
        if (!packet.nickNameIsAcceptable) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:petNickNotValid", {
                        lng,
                        min: PetConstants_1.PetConstants.NICKNAME_LENGTH_RANGE.MIN,
                        max: PetConstants_1.PetConstants.NICKNAME_LENGTH_RANGE.MAX
                    }))
                ]
            });
            return;
        }
        if (!packet.newNickname) {
            yield interaction.reply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("commands:petNick.successTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(i18n_1.default.t("commands:petNick.successNoName", { lng }))
                ]
            });
            return;
        }
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:petNick.successTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:petNick.success", {
                    lng,
                    name: packet.newNickname
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("petNick")
        .addStringOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("petNick", "nickname", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetNickCommand.js.map