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
exports.drinkAcceptCollector = drinkAcceptCollector;
exports.handleDrinkConsumePotion = handleDrinkConsumePotion;
exports.handleDrinkCancellation = handleDrinkCancellation;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandDrinkPacket_1 = require("../../../../Lib/src/packets/commands/CommandDrinkPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        const forceOption = interaction.options.get("force");
        let force = false;
        if (forceOption) {
            force = forceOption.value;
        }
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandDrinkPacket_1.CommandDrinkPacketReq, { force });
    });
}
function drinkAcceptCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:drink.confirmationTitle", {
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
            lng
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:drink.confirmation", {
            lng,
            potion: DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(data.potion, lng)
        }))
            .setFooter({ text: i18n_1.default.t("commands:drink.confirmationFooter", { lng }) });
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
function handleDrinkConsumePotion(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const mainInteraction = context.discord.buttonInteraction
            ? DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction)
            : DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction || !mainInteraction) {
            return;
        }
        const lng = interaction.userLanguage;
        let msg;
        if (packet.time) {
            msg = i18n_1.default.t("commands:drink.timeBonus", {
                lng,
                value: (0, TimeUtils_1.minutesDisplay)(packet.time, lng)
            });
        }
        else if (packet.energy) {
            msg = i18n_1.default.t("commands:drink.energyBonus", {
                lng,
                value: packet.energy
            });
        }
        else if (packet.health) {
            msg = i18n_1.default.t("commands:drink.healthBonus", {
                lng,
                value: packet.health
            });
        }
        else {
            msg = i18n_1.default.t("commands:drink.noBonus", { lng });
        }
        yield mainInteraction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:drink.drinkSuccessTitle", {
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
                    lng
                }), interaction.user)
                    .setDescription(msg)
            ]
        });
    });
}
function handleDrinkCancellation(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:drink.cancelledTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:drink.cancelled", { lng }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("drink")
        .addBooleanOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("drink", "force", option)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=DrinkCommand.js.map