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
exports.handleCommandSellSuccessPacket = handleCommandSellSuccessPacket;
exports.handleSellReactionCollector = handleSellReactionCollector;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const CommandSellPacket_1 = require("../../../../Lib/src/packets/commands/CommandSellPacket");
const ItemConstants_1 = require("../../../../Lib/src/constants/ItemConstants");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const ReactionCollectorPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const ReactionCollectorSell_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSell");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const discord_js_1 = require("discord.js");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const ReactionCollectorResetTimer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorResetTimer");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandSellPacket_1.CommandSellPacketReq, {});
    });
}
function handleCommandSellSuccessPacket(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        const title = i18n_1.default.t("commands:sell.soldMessageTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        });
        const description = i18n_1.default.t(packet.item.category === ItemConstants_1.ItemCategory.POTION && packet.price === 0
            ? "commands:sell.potionDestroyedMessage"
            : "commands:sell.soldMessage", {
            lng,
            item: DisplayUtils_1.DisplayUtils.getItemDisplay(packet.item, lng),
            value: packet.price
        });
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(title, interaction.user)
                    .setDescription(description)
            ]
        });
    });
}
function validateSell(packet, context, interaction, reactionsInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const lng = context.discord.language;
        const validateClassChangeEmbed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:sell.sellTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t(reactionsInfo.reaction.item.category === ItemConstants_1.ItemCategory.POTION && reactionsInfo.reaction.price === 0 ? "commands:sell.confirmThrowAway" : "commands:sell.confirmSell", {
            lng,
            item: DisplayUtils_1.DisplayUtils.getItemDisplay(reactionsInfo.reaction.item, lng),
            value: reactionsInfo.reaction.price
        }));
        const refuseCustomId = "refuse";
        const acceptCustomId = "validate";
        const validateRow = new discord_js_1.ActionRowBuilder()
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.accept))
            .setCustomId(acceptCustomId)
            .setStyle(discord_js_1.ButtonStyle.Secondary))
            .addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse))
            .setCustomId(refuseCustomId)
            .setStyle(discord_js_1.ButtonStyle.Secondary));
        const validateMsg = yield interaction.editReply({
            embeds: [validateClassChangeEmbed],
            components: [validateRow]
        });
        const validateCollector = validateMsg.createMessageComponentCollector();
        validateCollector.on("collect", (validateInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (validateInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(validateInteraction.user, validateInteraction, lng);
                return;
            }
            yield validateInteraction.deferReply();
            if (validateInteraction.customId === refuseCustomId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, validateInteraction, reactionsInfo.refuseReactionIndex);
                return;
            }
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, validateInteraction, reactionsInfo.reactionIndex);
        }));
        validateCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield validateMsg.edit({
                components: []
            });
        }));
        return [validateCollector];
    });
}
function handleSellReactionCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const itemsReactions = packet.reactions.filter(reaction => reaction.type === ReactionCollectorSell_1.ReactionCollectorSellItemReaction.name)
            .map(reaction => reaction.data);
        const refuseReactionIndex = packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name);
        if (itemsReactions.length === 1) {
            return yield validateSell(packet, context, interaction, {
                reaction: itemsReactions[0],
                reactionIndex: packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorSell_1.ReactionCollectorSellItemReaction.name),
                refuseReactionIndex
            });
        }
        const mainEmbed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:sell.titleChoiceEmbed", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(i18n_1.default.t("commands:sell.sellIndication", { lng }));
        const refuseCustomId = "refuse";
        const mainEmbedRow = new discord_js_1.ActionRowBuilder();
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("sellSelectionMenu")
            .setPlaceholder(i18n_1.default.t("commands:sell.menuPlaceholder", { lng }));
        for (let i = 0; i < itemsReactions.length; i++) {
            const reaction = itemsReactions[i];
            selectMenu.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(DisplayUtils_1.DisplayUtils.getSimpleItemName(reaction.item, lng))
                .setValue(i.toString())
                .setDescription(i18n_1.default.t(reaction.item.category === ItemConstants_1.ItemCategory.POTION && reaction.price === 0 ? "commands:sell.selectMenuDescThrow" : "commands:sell.selectMenuDescSell", {
                lng,
                value: reaction.price
            }))
                .setEmoji((0, discord_js_1.parseEmoji)(DisplayUtils_1.DisplayUtils.getItemIcon(reaction.item, false))));
        }
        selectMenu.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(i18n_1.default.t("commands:sell.cancel", { lng }))
            .setValue(refuseCustomId)
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse)));
        mainEmbedRow.addComponents(selectMenu);
        const msg = (yield interaction.editReply({
            embeds: [mainEmbed],
            components: [mainEmbedRow]
        }));
        let validateCollector;
        const selectCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        selectCollector.on("collect", (selectMenuInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (selectMenuInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(selectMenuInteraction.user, selectMenuInteraction, lng);
                return;
            }
            yield selectMenuInteraction.deferReply();
            yield msg.edit({
                embeds: [mainEmbed],
                components: []
            });
            const selectedOption = selectMenuInteraction.values[0];
            if (selectedOption === refuseCustomId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, selectMenuInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name));
                return;
            }
            PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(ReactionCollectorResetTimer_1.ReactionCollectorResetTimerPacketReq, { reactionCollectorId: packet.id }));
            const reaction = itemsReactions[parseInt(selectedOption, 10)];
            validateCollector = (yield validateSell(packet, context, selectMenuInteraction, {
                reaction,
                reactionIndex: packet.reactions.findIndex(packetReaction => JSON.stringify(packetReaction.data) === JSON.stringify(reaction)),
                refuseReactionIndex
            }))[0];
        }));
        selectCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
            if (validateCollector && !validateCollector.ended) {
                validateCollector.stop();
            }
        }));
        return [selectCollector];
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("sell"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=SellCommand.js.map