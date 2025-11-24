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
exports.handleSuccess = handleSuccess;
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const CommandGuildStoragePacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildStoragePacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const GuildConstants_1 = require("../../../../Lib/src/constants/GuildConstants");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandGuildStoragePacket_1.CommandGuildStoragePacketReq, {});
}
function handleSuccess(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:guildStorage.embed.title", {
            lng,
            guildName: packet.guildName
        }))
            .setThumbnail(GuildConstants_1.GuildConstants.ICON)
            .addFields({
            name: i18n_1.default.t("commands:guildStorage.embed.descriptionTitle", { lng }),
            value: i18n_1.default.t("commands:guildStorage.embed.description", { lng })
        });
        for (const food of packet.foods) {
            embed.addFields({
                name: i18n_1.default.t("commands:guildStorage.food.title", {
                    lng,
                    foodId: food.id
                }),
                value: i18n_1.default.t("commands:guildStorage.food.description", {
                    lng,
                    amount: food.amount,
                    maxAmount: food.maxAmount
                }),
                inline: true
            });
        }
        yield interaction.reply({ embeds: [embed] });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("guildStorage"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=GuildStorageCommand.js.map