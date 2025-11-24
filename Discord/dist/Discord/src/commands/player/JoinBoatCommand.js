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
exports.createJoinBoatCollector = createJoinBoatCollector;
exports.handleCommandJoinBoatAcceptPacketRes = handleCommandJoinBoatAcceptPacketRes;
exports.handleCommandJoinBoatRefusePacketRes = handleCommandJoinBoatRefusePacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const CommandJoinBoatPacket_1 = require("../../../../Lib/src/packets/commands/CommandJoinBoatPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const StringUtils_1 = require("../../utils/StringUtils");
function createJoinBoatCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:joinBoat.confirmationMessage.title.confirmation", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:joinBoat.confirmationMessage.description.confirmation.text", {
            lng,
            currentEnergy: data.energy.current,
            maxEnergy: data.energy.max,
            priceText: i18n_1.default.t("commands:joinBoat.confirmationMessage.description.confirmation.priceText", {
                lng,
                count: data.price,
                gemsCost: data.price
            })
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandJoinBoatAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (buttonInteraction && originalInteraction) {
            const lng = originalInteraction.userLanguage;
            yield buttonInteraction.editReply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:joinBoat.confirmationMessage.title.confirmed", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                    }), originalInteraction.user)
                        .setDescription(i18n_1.default.t("commands:joinBoat.confirmationMessage.description.confirmed", {
                        lng,
                        gainScore: packet.score <= 0
                            ? ""
                            : i18n_1.default.t("commands:joinBoat.confirmationMessage.description.confirmedScore", {
                                lng,
                                score: packet.score
                            })
                    }))
                ]
            });
        }
    });
}
function handleCommandJoinBoatRefusePacketRes(_packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = originalInteraction.userLanguage;
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:joinBoat.confirmationMessage.title.confirmed", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:joinBoat.refuse", { lng }))
                    .setErrorColor()
            ]
        }));
    });
}
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandJoinBoatPacket_1.CommandJoinBoatPacketReq, {});
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("joinBoat"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=JoinBoatCommand.js.map