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
exports.handleCommandUnlockNotEnoughMoneyError = handleCommandUnlockNotEnoughMoneyError;
exports.createUnlockCollector = createUnlockCollector;
exports.handleCommandUnlockRefusePacketRes = handleCommandUnlockRefusePacketRes;
exports.handleCommandUnlockAcceptPacketRes = handleCommandUnlockAcceptPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const CommandUnlockPacket_1 = require("../../../../Lib/src/packets/commands/CommandUnlockPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const UnlockConstants_1 = require("../../../../Lib/src/constants/UnlockConstants");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, user);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandUnlockPacket_1.CommandUnlockPacketReq, { askedPlayer });
    });
}
function handleCommandUnlockNotEnoughMoneyError(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("error:notEnoughMoney", {
            lng: interaction.userLanguage,
            money: UnlockConstants_1.UnlockConstants.PRICE_FOR_UNLOCK - packet.money
        }), { sendManner: ErrorUtils_1.SendManner.REPLY });
    });
}
function createUnlockCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const pseudo = yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.unlockedKeycloakId, lng);
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:unlock.title", {
            lng,
            pseudo
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:unlock.confirmDesc", {
            lng,
            pseudo,
            price: UnlockConstants_1.UnlockConstants.PRICE_FOR_UNLOCK
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleCommandUnlockRefusePacketRes(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const lng = originalInteraction.userLanguage;
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:unlock.canceledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(originalInteraction.user.displayName)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:unlock.canceledDesc", { lng }))
                    .setErrorColor()
            ]
        }));
    });
}
function handleCommandUnlockAcceptPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const originalInteraction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!originalInteraction) {
            return;
        }
        const lng = originalInteraction.userLanguage;
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        yield (buttonInteraction === null || buttonInteraction === void 0 ? void 0 : buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:unlock.title", {
                    lng,
                    pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.unlockedKeycloakId, lng)
                }), originalInteraction.user)
                    .setDescription(i18n_1.default.t("commands:unlock.acceptedDesc", {
                    lng,
                    pseudo: yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.unlockedKeycloakId, lng)
                }))
            ]
        }));
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("unlock")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("unlock", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("unlock", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=UnlockCommand.js.map