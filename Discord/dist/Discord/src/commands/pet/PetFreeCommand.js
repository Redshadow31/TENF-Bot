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
exports.handleCommandPetFreePacketRes = handleCommandPetFreePacketRes;
exports.createPetFreeCollector = createPetFreeCollector;
exports.handleCommandPetFreeRefusePacketRes = handleCommandPetFreeRefusePacketRes;
exports.handleCommandPetFreeAcceptPacketRes = handleCommandPetFreeAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandPetFreePacket_1 = require("../../../../Lib/src/packets/commands/CommandPetFreePacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const PetUtils_1 = require("../../utils/PetUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(_interaction, keycloakUser) {
    return (0, DraftBotPacket_1.makePacket)(CommandPetFreePacket_1.CommandPetFreePacketReq, { keycloakId: keycloakUser.id });
}
function handleCommandPetFreePacketRes(packet, context) {
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
        if (packet.petCanBeFreed) {
            return;
        }
        if (packet.missingMoney > 0) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:notEnoughMoney", {
                        lng,
                        money: packet.missingMoney
                    }))
                ]
            });
        }
        if (packet.cooldownRemainingTimeMs > 0) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:cooldownPetFree", {
                        lng,
                        remainingTime: (0, TimeUtils_1.printTimeBeforeDate)(packet.cooldownRemainingTimeMs + new Date().valueOf())
                    }))
                ]
            });
        }
    });
}
function createPetFreeCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:petFree.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:petFree.confirmDesc", {
            lng,
            pet: PetUtils_1.PetUtils.petToShortString(lng, data.petNickname, data.petId, data.petSex)
        }));
        if (data.freeCost) {
            embed.setFooter({
                text: i18n_1.default.t("commands:petFree.isFeisty", {
                    lng,
                    cost: data.freeCost
                })
            });
        }
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandPetFreeRefusePacketRes(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:petFree.canceledTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:petFree.canceledDesc", { lng }))
                        .setErrorColor()
                ]
            });
        }
    });
}
function handleCommandPetFreeAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:petFree.title", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:petFree.acceptedDesc", {
                        lng,
                        pet: PetUtils_1.PetUtils.petToShortString(lng, packet.petNickname, packet.petId, packet.petSex)
                    }))
                ]
            });
        }
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("petFree"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetFreeCommand.js.map