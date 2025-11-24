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
exports.handleCommandShopNoAlterationToHeal = handleCommandShopNoAlterationToHeal;
exports.handleCommandShopNoEnergyToHeal = handleCommandShopNoEnergyToHeal;
exports.handleCommandShopTooManyEnergyBought = handleCommandShopTooManyEnergyBought;
exports.handleCommandShopAlreadyHaveBadge = handleCommandShopAlreadyHaveBadge;
exports.handleCommandShopBoughtTooMuchDailyPotions = handleCommandShopBoughtTooMuchDailyPotions;
exports.handleCommandShopNotEnoughMoney = handleCommandShopNotEnoughMoney;
exports.handleCommandShopHealAlterationDone = handleCommandShopHealAlterationDone;
exports.handleCommandShopFullRegen = handleCommandShopFullRegen;
exports.handleCommandShopBadgeBought = handleCommandShopBadgeBought;
exports.shopInventoryExtensionCollector = shopInventoryExtensionCollector;
exports.handleReactionCollectorBuyCategorySlotBuySuccess = handleReactionCollectorBuyCategorySlotBuySuccess;
exports.handleCommandShopClosed = handleCommandShopClosed;
exports.shopCollector = shopCollector;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandShopPacket_1 = require("../../../../Lib/src/packets/commands/CommandShopPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const ReactionCollectorShop_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorShop");
const discord_js_1 = require("discord.js");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const PacketUtils_1 = require("../../utils/PacketUtils");
const ChangeBlockingReasonPacket_1 = require("../../../../Lib/src/packets/utils/ChangeBlockingReasonPacket");
const BlockingConstants_1 = require("../../../../Lib/src/constants/BlockingConstants");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const ReactionCollectorBuyCategorySlot_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorBuyCategorySlot");
const LogsConstants_1 = require("../../../../Lib/src/constants/LogsConstants");
const ShopUtils_1 = require("../../../../Lib/src/utils/ShopUtils");
const ReactionCollectorResetTimer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorResetTimer");
const StringUtils_1 = require("../../utils/StringUtils");
const Badge_1 = require("../../../../Lib/src/types/Badge");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandShopPacket_1.CommandShopPacketReq, {});
}
function handleCommandShopNoAlterationToHeal(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.noAlterationToHeal", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopNoEnergyToHeal(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.noEnergyToHeal", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopTooManyEnergyBought(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.tooManyEnergyBought", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopAlreadyHaveBadge(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.alreadyHaveBadge", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopBoughtTooMuchDailyPotions(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.boughtTooMuchDailyPotions", { lng: interaction.userLanguage }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopNotEnoughMoney(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (interaction) {
            yield (0, ErrorUtils_1.sendErrorMessage)(interaction.user, context, interaction, i18n_1.default.t("commands:shop.notEnoughMoney", {
                lng: interaction.userLanguage,
                missingCurrency: packet.missingCurrency,
                currency: packet.currency
            }), { sendManner: ErrorUtils_1.SendManner.FOLLOWUP });
        }
    });
}
function handleCommandShopHealAlterationDone(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.success", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.healAlteration", { lng }))
            ]
        });
    });
}
function handleCommandShopFullRegen(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.success", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.fullRegen", { lng }))
            ]
        });
    });
}
function handleCommandShopBadgeBought(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.success", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.badgeBought", {
                    lng,
                    badgeName: Badge_1.Badge.RICH
                }))
            ]
        });
    });
}
function shopInventoryExtensionCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const row = new discord_js_1.ActionRowBuilder();
        let slotExtensionText = `${i18n_1.default.t("commands:shop.chooseSlotIndication", { lng })}\n\n`;
        for (const category of packet.reactions.filter(reaction => reaction.type === ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotReaction.name)
            .map(r => r.data)) {
            const button = new discord_js_1.ButtonBuilder()
                .setCustomId(category.categoryId.toString(10))
                .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.itemKinds[category.categoryId]))
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            row.addComponents(button);
            slotExtensionText += i18n_1.default.t("commands:shop.shopCategoryFormat", {
                lng,
                category: i18n_1.default.t(`commands:shop.slotCategoriesKind.${category.categoryId.toString(10)}`, { lng }),
                count: category.remaining,
                limit: category.maxSlots,
                categoryId: category.categoryId
            });
        }
        const closeShopButton = new discord_js_1.ButtonBuilder()
            .setCustomId("closeShop")
            .setLabel(i18n_1.default.t("commands:shop.closeShopButton", { lng }))
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        row.addComponents(closeShopButton);
        const msg = yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.chooseSlotTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(slotExtensionText)
            ],
            components: [row]
        });
        if (!msg) {
            return null;
        }
        const buttonCollector = msg.createMessageComponentCollector({
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            yield buttonInteraction.update({ components: [] });
            if (buttonInteraction.customId === "closeShop") {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, null, packet.reactions.findIndex(r => r.type === ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotCancelReaction.name));
                return;
            }
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, null, packet.reactions.findIndex(r => r.type === ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotReaction.name
                && r.data.categoryId === parseInt(buttonInteraction.customId, 10)));
        }));
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [buttonCollector];
    });
}
function handleReactionCollectorBuyCategorySlotBuySuccess(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.success", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.buyCategorySlotSuccess", { lng }))
            ]
        });
    });
}
function handleCommandShopClosed(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const args = {
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:shop.closeShopTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:shop.closeShop", { lng }))
            ]
        };
        yield (interaction.replied ? interaction.followUp(args) : interaction.reply(args));
    });
}
function manageBuyoutConfirmation(packet, context, data, reaction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(ChangeBlockingReasonPacket_1.ChangeBlockingReasonPacket, {
            oldReason: BlockingConstants_1.BlockingConstants.REASONS.SHOP,
            newReason: BlockingConstants_1.BlockingConstants.REASONS.SHOP_CONFIRMATION
        }));
        PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(ReactionCollectorResetTimer_1.ReactionCollectorResetTimerPacketReq, { reactionCollectorId: packet.id }));
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const shopItemId = reaction.shopItemId;
        const amounts = packet.reactions.filter(r => {
            const shopData = r.data;
            return r.type === ReactionCollectorShop_1.ReactionCollectorShopItemReaction.name && shopData.shopItemId === reaction.shopItemId;
        })
            .map(r => r.data.amount);
        const row = new discord_js_1.ActionRowBuilder();
        if (amounts.length === 1 && amounts[0] === 1) {
            const buttonAccept = new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.accept))
                .setCustomId("accept")
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            row.addComponents(buttonAccept);
        }
        else {
            for (const amount of amounts) {
                const buttonAccept = new discord_js_1.ButtonBuilder()
                    .setLabel(amount.toString(10))
                    .setCustomId(amount.toString(10))
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                row.addComponents(buttonAccept);
            }
        }
        const buttonRefuse = new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse))
            .setCustomId("refuse")
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        row.addComponents(buttonRefuse);
        const shopItemNames = getShopItemNames(data, shopItemId, lng);
        const msg = yield interaction.followUp({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t(amounts.length === 1 && amounts[0] === 1 ? "commands:shop.shopConfirmationTitle" : "commands:shop.shopConfirmationTitleMultiple", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(`${getShopItemDisplay(data, reaction, lng, shopItemNames, amounts)}\n${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.collectors.warning)} ${i18n_1.default.t(`commands:shop.shopItems.${(0, ShopUtils_1.shopItemTypeToId)(shopItemId)}.info`, {
                    lng,
                    kingsMoneyAmount: (_a = data.additionnalShopData) === null || _a === void 0 ? void 0 : _a.gemToMoneyRatio,
                    thousandPoints: Constants_1.Constants.MISSION_SHOP.THOUSAND_POINTS
                })}`)
            ],
            components: [row]
        });
        if (!msg) {
            return;
        }
        const buttonCollector = msg.createMessageComponentCollector({
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            yield buttonInteraction.update({ components: [] });
            if (buttonInteraction.customId === "refuse") {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, packet.reactions.findIndex(r => r.type === ReactionCollectorShop_1.ReactionCollectorShopCloseReaction.name));
                return;
            }
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, null, packet.reactions.findIndex(r => r.type === ReactionCollectorShop_1.ReactionCollectorShopItemReaction.name
                && r.data.shopItemId === reaction.shopItemId
                && (amounts.length === 1 || r.data.amount === parseInt(buttonInteraction.customId, 10))));
        }));
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
    });
}
function getShopItemNames(data, shopItemId, lng) {
    if (shopItemId === LogsConstants_1.ShopItemType.DAILY_POTION) {
        return {
            normal: DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(data.additionnalShopData.dailyPotion, lng),
            short: DisplayUtils_1.DisplayUtils.getItemDisplay({
                id: data.additionnalShopData.dailyPotion.id,
                category: data.additionnalShopData.dailyPotion.category
            }, lng)
        };
    }
    const bothNames = i18n_1.default.t(`commands:shop.shopItems.${(0, ShopUtils_1.shopItemTypeToId)(shopItemId)}.name`, {
        lng
    });
    return {
        normal: `**${bothNames}**`,
        short: bothNames
    };
}
function getShopItemDisplay(data, reaction, lng, shopItemNames, amounts) {
    if (amounts.length === 1 && amounts[0] === 1) {
        return `${i18n_1.default.t("commands:shop.shopItemsDisplaySingle", {
            lng,
            name: shopItemNames.normal,
            price: reaction.price,
            currency: data.currency,
            remainingPotions: data.additionnalShopData.remainingPotions
        })}\n`;
    }
    let desc = "";
    for (const amount of amounts) {
        desc += `${i18n_1.default.t("commands:shop.shopItemsDisplayMultiple", {
            lng,
            name: shopItemNames.normal,
            amount,
            price: reaction.price * amount,
            currency: data.currency
        })}\n`;
    }
    return desc;
}
function shopCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const categories = [];
        for (const reaction of packet.reactions) {
            if (reaction.type === ReactionCollectorShop_1.ReactionCollectorShopItemReaction.name && categories.indexOf(reaction.data.shopCategoryId) === -1) {
                categories.push(reaction.data.shopCategoryId);
            }
        }
        categories.sort((a, b) => a.localeCompare(b));
        let shopText = "";
        const select = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("shop")
            .setPlaceholder(i18n_1.default.t("commands:shop.shopSelectPlaceholder", { lng }));
        for (const categoryId of categories) {
            let categoryItemsIds = packet.reactions.filter(reaction => reaction.type === ReactionCollectorShop_1.ReactionCollectorShopItemReaction.name && reaction.data.shopCategoryId === categoryId)
                .map(reaction => reaction.data.shopItemId);
            categoryItemsIds = categoryItemsIds.filter((item, index) => categoryItemsIds.indexOf(item) === index);
            shopText += `${`**${i18n_1.default.t(`commands:shop.shopCategories.${categoryId}`, {
                lng,
                count: data.additionnalShopData.remainingPotions
            })}** :\n`
                .concat(...categoryItemsIds.map(id => {
                const reaction = packet.reactions.find(reaction => reaction.data.shopItemId === id).data;
                const shopItemName = getShopItemNames(data, reaction.shopItemId, lng);
                select.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                    .setLabel(shopItemName.short)
                    .setDescription(i18n_1.default.t("commands:shop.shopItemsSelectDescription", {
                    lng,
                    price: reaction.price,
                    currency: data.currency
                }))
                    .setValue((0, ShopUtils_1.shopItemTypeToId)(reaction.shopItemId)));
                return getShopItemDisplay(data, reaction, lng, shopItemName, [1]);
            }))}\n`;
        }
        const closeShopButton = new discord_js_1.ButtonBuilder()
            .setCustomId("closeShop")
            .setLabel(i18n_1.default.t("commands:shop.closeShopButton", { lng }))
            .setStyle(discord_js_1.ButtonStyle.Secondary);
        const buttonRow = new discord_js_1.ActionRowBuilder().addComponents(closeShopButton);
        const selectRow = new discord_js_1.ActionRowBuilder().addComponents(select);
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:shop.title", { lng }))
            .setDescription(shopText + i18n_1.default.t("commands:shop.currentMoney", {
            lng,
            money: data.availableCurrency,
            currency: data.currency
        }));
        const reply = yield interaction.reply({
            embeds: [embed],
            components: [selectRow, buttonRow],
            withResponse: true
        });
        if (!((_a = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _a === void 0 ? void 0 : _a.message)) {
            return null;
        }
        const msg = reply.resource.message;
        const buttonCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        let hasEnded = false;
        buttonCollector.on("collect", (msgComponentInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (hasEnded) {
                return;
            }
            if (msgComponentInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(msgComponentInteraction.user, msgComponentInteraction, lng);
                return;
            }
            hasEnded = true;
            yield msgComponentInteraction.update({ components: [] });
            if (msgComponentInteraction.customId === "closeShop") {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, msgComponentInteraction, packet.reactions.findIndex(r => r.type === ReactionCollectorShop_1.ReactionCollectorShopCloseReaction.name));
                return;
            }
            yield manageBuyoutConfirmation(packet, context, data, packet.reactions.find(reaction => reaction.type === ReactionCollectorShop_1.ReactionCollectorShopItemReaction.name
                && reaction.data.shopItemId === (0, ShopUtils_1.shopItemTypeFromId)(msgComponentInteraction.values[0])).data);
        }));
        buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return [buttonCollector];
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("shop"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=ShopCommand.js.map