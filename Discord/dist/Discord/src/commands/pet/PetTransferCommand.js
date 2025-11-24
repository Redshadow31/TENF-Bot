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
exports.handlePetTransferSuccess = handlePetTransferSuccess;
exports.handlePetTransferReactionCollector = handlePetTransferReactionCollector;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandPetTransferPacket_1 = require("../../../../Lib/src/packets/commands/CommandPetTransferPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const ReactionCollectorPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const ReactionCollectorPetTransfer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetTransfer");
const discord_js_1 = require("discord.js");
const Language_1 = require("../../../../Lib/src/Language");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const MessagesUtils_1 = require("../../utils/MessagesUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandPetTransferPacket_1.CommandPetTransferPacketReq, {});
    });
}
function handlePetTransferSuccess(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const interaction = MessagesUtils_1.MessagesUtils.getCurrentInteraction(context);
        if (!interaction) {
            return;
        }
        const lng = (_c = (_a = interaction.userLanguage) !== null && _a !== void 0 ? _a : (_b = context.discord) === null || _b === void 0 ? void 0 : _b.language) !== null && _c !== void 0 ? _c : Language_1.LANGUAGE.DEFAULT_LANGUAGE;
        const oldPetDisplay = packet.oldPet ? DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(packet.oldPet, lng) : null;
        const newPetDisplay = packet.newPet ? DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(packet.newPet, lng) : null;
        const i18nDescriptionKey = `commands:petTransfer.confirm${oldPetDisplay && newPetDisplay ? "Switch" : oldPetDisplay ? "Deposit" : "Withdraw"}`;
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:petTransfer.confirmTransferTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t(i18nDescriptionKey, {
                    lng,
                    oldPet: oldPetDisplay,
                    newPet: newPetDisplay
                }))
            ]
        });
    });
}
const depositCustomId = "deposit";
const switchCustomId = "switch";
const withdrawCustomId = "withdraw";
const refuseCustomId = "refuse";
const backCustomId = "back";
function getMainMenuComponents(data, reactions, lng) {
    const rows = [];
    if (reactions.deposit) {
        rows.push(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.petTransfer.deposit))
            .setLabel(i18n_1.default.t("commands:petTransfer.depositButton", {
            lng,
            pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(data.ownPet, lng)
        }))
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setCustomId(depositCustomId)));
    }
    if (reactions.switches.length > 0) {
        rows.push(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.petTransfer.switch))
            .setLabel(i18n_1.default.t("commands:petTransfer.switchButton", {
            lng,
            pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(data.ownPet, lng)
        }))
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setCustomId(switchCustomId)));
    }
    if (reactions.withdraws.length > 0) {
        rows.push(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.petTransfer.withdraw))
            .setLabel(i18n_1.default.t("commands:petTransfer.withdrawButton", { lng }))
            .setStyle(discord_js_1.ButtonStyle.Secondary)
            .setCustomId(withdrawCustomId)));
    }
    rows.push(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
        .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse))
        .setLabel(i18n_1.default.t("commands:petTransfer.refuseButton", { lng }))
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId(refuseCustomId)));
    return rows;
}
function getBackButton(lng) {
    return new discord_js_1.ButtonBuilder()
        .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.back))
        .setLabel(i18n_1.default.t("commands:petTransfer.backButton", { lng }))
        .setStyle(discord_js_1.ButtonStyle.Secondary)
        .setCustomId(backCustomId);
}
function getShelterPetSelectMenu(data, reactions, placeHolder, lng) {
    return new discord_js_1.StringSelectMenuBuilder()
        .setPlaceholder(placeHolder)
        .setCustomId("switchSelect")
        .addOptions(reactions.map(reaction => {
        const reactionData = reaction.reaction.data;
        const shelterPet = data.shelterPets.find(pet => pet.petEntityId === reactionData.petEntityId);
        return new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(DisplayUtils_1.DisplayUtils.getPetNicknameOrTypeName(shelterPet.pet.nickname, shelterPet.pet.typeId, shelterPet.pet.sex, lng))
            .setEmoji((0, discord_js_1.parseEmoji)(EmoteUtils_1.EmoteUtils.translateEmojiForSelectMenus(DisplayUtils_1.DisplayUtils.getPetIcon(shelterPet.pet.typeId, shelterPet.pet.sex))))
            .setValue(reaction.index.toString())
            .setDescription(i18n_1.default.t("commands:petTransfer.selectMenuPetDetails", {
            lng,
            rarity: DisplayUtils_1.DisplayUtils.getPetRarityDisplay(shelterPet.pet.rarity),
            sex: DisplayUtils_1.DisplayUtils.getPetSexName(shelterPet.pet.sex, lng),
            loveLevel: DisplayUtils_1.DisplayUtils.getPetLoveLevelDisplay(shelterPet.pet.loveLevel, shelterPet.pet.sex, lng, false)
        }));
    }));
}
function getSwitchComponents(data, reactions, lng) {
    const rows = [];
    rows.push(new discord_js_1.ActionRowBuilder()
        .addComponents(getShelterPetSelectMenu(data, reactions, i18n_1.default.t("commands:petTransfer.switchPlaceholder", {
        lng,
        pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(data.ownPet, lng)
    }), lng)));
    rows.push(new discord_js_1.ActionRowBuilder().addComponents(getBackButton(lng)));
    return rows;
}
function getWithdrawComponents(data, reactions, lng) {
    const rows = [];
    rows.push(new discord_js_1.ActionRowBuilder()
        .addComponents(getShelterPetSelectMenu(data, reactions, i18n_1.default.t("commands:petTransfer.withdrawPlaceholder", { lng }), lng)));
    rows.push(new discord_js_1.ActionRowBuilder().addComponents(getBackButton(lng)));
    return rows;
}
function handlePetTransferCollect(inMainMenu, packet, context, reactions, discord) {
    return __awaiter(this, void 0, void 0, function* () {
        if (inMainMenu) {
            const customId = discord.collectedInteraction.customId;
            switch (customId) {
                case depositCustomId:
                    yield discord.collectedInteraction.deferReply();
                    DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, discord.collectedInteraction, reactions.depositReaction.index);
                    break;
                case switchCustomId:
                    yield discord.collectedInteraction.update({
                        embeds: [discord.mainMenuEmbed],
                        components: discord.switchComponents
                    });
                    inMainMenu = false;
                    break;
                case withdrawCustomId:
                    yield discord.collectedInteraction.update({
                        embeds: [discord.mainMenuEmbed],
                        components: discord.withdrawComponents
                    });
                    inMainMenu = false;
                    break;
                case refuseCustomId:
                    yield discord.collectedInteraction.deferReply();
                    DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, discord.collectedInteraction, reactions.refuseReaction.index);
                    break;
                default:
                    break;
            }
        }
        else if (discord.collectedInteraction.customId === backCustomId) {
            yield discord.collectedInteraction.update({
                embeds: [discord.mainMenuEmbed],
                components: discord.mainMenuComponents
            });
            inMainMenu = true;
        }
        else {
            yield discord.collectedInteraction.deferReply();
            DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, discord.collectedInteraction, parseInt(discord.collectedInteraction.values[0], 10));
        }
        return inMainMenu;
    });
}
function handlePetTransferReactionCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const depositReaction = packet.reactions.map((reaction, index) => ({
            reaction,
            index
        }))
            .find(reaction => reaction.reaction.type === ReactionCollectorPetTransfer_1.ReactionCollectorPetTransferDepositReaction.name);
        const switchReactions = packet.reactions.map((reaction, index) => ({
            reaction,
            index
        }))
            .filter(reaction => reaction.reaction.type === ReactionCollectorPetTransfer_1.ReactionCollectorPetTransferSwitchReaction.name);
        const withdrawReactions = packet.reactions.map((reaction, index) => ({
            reaction,
            index
        }))
            .filter(reaction => reaction.reaction.type === ReactionCollectorPetTransfer_1.ReactionCollectorPetTransferWithdrawReaction.name);
        const refuseReaction = packet.reactions.map((reaction, index) => ({
            reaction,
            index
        }))
            .find(reaction => reaction.reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name);
        const mainMenuEmbed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:petTransfer.chooseActionTitle", { lng }), interaction.user)
            .setDescription(i18n_1.default.t("commands:petTransfer.chooseActionDesc", { lng }));
        const mainMenuComponents = getMainMenuComponents(data, {
            deposit: depositReaction,
            switches: switchReactions,
            withdraws: withdrawReactions,
            refuse: refuseReaction
        }, lng);
        const switchComponents = switchReactions.length !== 0 ? getSwitchComponents(data, switchReactions, lng) : [];
        const withdrawComponents = withdrawReactions.length !== 0 ? getWithdrawComponents(data, withdrawReactions, lng) : [];
        const msg = yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [mainMenuEmbed],
            components: mainMenuComponents
        }));
        let inMainMenu = true;
        const msgCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        msgCollector.on("collect", (collectedInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (collectedInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(collectedInteraction.user, collectedInteraction, lng);
                return;
            }
            inMainMenu = yield handlePetTransferCollect(inMainMenu, packet, context, {
                depositReaction,
                refuseReaction
            }, {
                collectedInteraction,
                mainMenuEmbed,
                switchComponents,
                withdrawComponents,
                mainMenuComponents
            });
        }));
        msgCollector.on("end", () => {
            msg.edit({
                embeds: [mainMenuEmbed],
                components: []
            });
        });
        return [msgCollector];
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("petTransfer"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetTransferCommand.js.map