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
exports.handleCommandPetFeedSuccessPacket = handleCommandPetFeedSuccessPacket;
exports.handleCommandPetFeedWithGuildCollector = handleCommandPetFeedWithGuildCollector;
exports.handleCommandPetFeedWithoutGuildCollector = handleCommandPetFeedWithoutGuildCollector;
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandPetFeedPacket_1 = require("../../../../Lib/src/packets/commands/CommandPetFeedPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const ReactionCollectorPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const ReactionCollectorPetFeedWithGuild_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetFeedWithGuild");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const StringUtils_1 = require("../../utils/StringUtils");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const discord_js_1 = require("discord.js");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandPetFeedPacket_1.CommandPetFeedPacketReq, {});
    });
}
function handleCommandPetFeedSuccessPacket(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        const title = i18n_1.default.t("commands:petFeed.resultTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        });
        const description = i18n_1.default.t(`commands:petFeed.result.${packet.result}`, { lng });
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(title, interaction.user)
                    .setDescription(description)
            ]
        });
    });
}
function handleCommandPetFeedWithGuildCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const foodReactions = packet.reactions.map((reaction, index) => ({
            reaction,
            index
        }))
            .filter(reaction => reaction.reaction.type === ReactionCollectorPetFeedWithGuild_1.ReactionCollectorPetFeedWithGuildFoodReaction.name);
        const refuseIndex = packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name);
        const rowFood = new discord_js_1.ActionRowBuilder();
        let foodsList = "";
        for (const foodReaction of foodReactions) {
            const foodData = foodReaction.reaction.data;
            foodsList += `${i18n_1.default.t("commands:petFeed.feedFoodBullet", {
                lng,
                food: StringUtils_1.StringUtils.capitalizeFirstLetter(DisplayUtils_1.DisplayUtils.getFoodDisplay(foodData.food, 1, lng, true)),
                amount: foodData.amount,
                maxAmount: foodData.maxAmount
            })}\n`;
            rowFood.addComponents(new discord_js_1.ButtonBuilder()
                .setCustomId(foodReaction.index.toString())
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setEmoji(DraftBotIcons_1.DraftBotIcons.foods[foodData.food]));
        }
        const refuseCustomId = "refuse";
        const rowRefuse = new discord_js_1.ActionRowBuilder();
        rowRefuse.addComponents(new discord_js_1.ButtonBuilder()
            .setCustomId(refuseCustomId)
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setLabel(i18n_1.default.t("commands:petFeed.cancelButton", { lng }))
            .setEmoji(DraftBotIcons_1.DraftBotIcons.collectors.refuse));
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:petFeed.feedTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(`${i18n_1.default.t("commands:petFeed.feedDescription", {
            lng,
            pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(data.pet, lng)
        })}\n\n${foodsList}`);
        const msg = yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [embed],
            components: [rowFood, rowRefuse]
        }));
        const msgCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        msgCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            yield buttonInteraction.deferReply();
            if (buttonInteraction.customId === refuseCustomId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, refuseIndex);
                return;
            }
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, parseInt(buttonInteraction.customId, 10));
        }));
        msgCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [msgCollector];
    });
}
function handleCommandPetFeedWithoutGuildCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:petFeed.feedTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:petFeed.feedWithoutGuildDesc", {
            lng,
            pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(data.pet, lng),
            food: StringUtils_1.StringUtils.capitalizeFirstLetter(DisplayUtils_1.DisplayUtils.getFoodDisplay(data.food, 1, lng, true)),
            price: data.price
        }));
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context);
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("petFeed"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetFeedCommand.js.map