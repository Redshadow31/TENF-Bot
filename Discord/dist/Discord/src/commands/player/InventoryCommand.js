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
exports.handleCommandInventoryPacketRes = handleCommandInventoryPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const discord_js_1 = require("discord.js");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotErrorEmbed_1 = require("../../messages/DraftBotErrorEmbed");
const CommandInventoryPacket_1 = require("../../../../Lib/src/packets/commands/CommandInventoryPacket");
const DiscordItemUtils_1 = require("../../utils/DiscordItemUtils");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const v10_1 = require("discord-api-types/v10");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandInventoryPacket_1.CommandInventoryPacketReq, { askedPlayer });
    });
}
function getBackupField(lng, items, slots, toFieldFunc, itemKind) {
    const formattedTitle = i18n_1.default.t(`commands:inventory.${itemKind}`, {
        lng,
        count: items.length,
        max: slots - 1
    });
    if (slots <= 1) {
        return {
            name: formattedTitle,
            value: i18n_1.default.t("commands:inventory.noSlot", { lng }),
            inline: false
        };
    }
    let value = "";
    for (let i = 1; i < slots; ++i) {
        const search = items.find(item => item.slot === i);
        if (!search) {
            value += i18n_1.default.t("commands:inventory.emptySlot", { lng });
        }
        else {
            value += toFieldFunc(search.display, lng).value;
        }
        value += "\n";
    }
    return {
        name: formattedTitle,
        value,
        inline: false
    };
}
function getEquippedEmbed(packet, pseudo, lng) {
    if (packet.data) {
        return new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:inventory.title", {
            lng,
            pseudo
        }))
            .addFields([
            DiscordItemUtils_1.DiscordItemUtils.getWeaponField(packet.data.weapon, lng),
            DiscordItemUtils_1.DiscordItemUtils.getArmorField(packet.data.armor, lng),
            DiscordItemUtils_1.DiscordItemUtils.getPotionField(packet.data.potion, lng),
            DiscordItemUtils_1.DiscordItemUtils.getObjectField(packet.data.object, lng)
        ]);
    }
    throw new Error("Inventory packet data must not be undefined");
}
function getBackupEmbed(packet, pseudo, lng) {
    if (packet.data) {
        return new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:inventory.stockTitle", {
            lng,
            pseudo
        }))
            .addFields([
            getBackupField(lng, packet.data.backupWeapons, packet.data.slots.weapons, DiscordItemUtils_1.DiscordItemUtils.getWeaponField, "weapons"),
            getBackupField(lng, packet.data.backupArmors, packet.data.slots.armors, DiscordItemUtils_1.DiscordItemUtils.getArmorField, "armors"),
            getBackupField(lng, packet.data.backupPotions, packet.data.slots.potions, DiscordItemUtils_1.DiscordItemUtils.getPotionField, "potions"),
            getBackupField(lng, packet.data.backupObjects, packet.data.slots.objects, DiscordItemUtils_1.DiscordItemUtils.getObjectField, "objects")
        ]);
    }
    throw new Error("Inventory packet data must not be undefined");
}
function handleCommandInventoryPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        if (!packet.foundPlayer) {
            yield interaction.reply({
                embeds: [
                    new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, i18n_1.default.t("error:playerDoesntExist", { lng }))
                ],
                flags: v10_1.MessageFlags.Ephemeral
            });
            return;
        }
        const username = yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.keycloakId, lng);
        let equippedView = true;
        const buttonId = "switchItems";
        const equippedButtonLabel = i18n_1.default.t("commands:inventory.seeEquippedItems", { lng });
        const backupButtonLabel = i18n_1.default.t("commands:inventory.seeBackupItems", { lng });
        const switchItemsButton = new discord_js_1.ButtonBuilder()
            .setCustomId(buttonId)
            .setLabel(backupButtonLabel)
            .setStyle(discord_js_1.ButtonStyle.Primary);
        const equippedEmbed = getEquippedEmbed(packet, username, lng);
        const backupEmbed = getBackupEmbed(packet, username, lng);
        const reply = yield interaction.reply({
            embeds: [equippedEmbed],
            components: [new discord_js_1.ActionRowBuilder().addComponents(switchItemsButton)],
            withResponse: true
        });
        if (!((_a = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _a === void 0 ? void 0 : _a.message)) {
            return;
        }
        const msg = reply.resource.message;
        const collector = msg.createMessageComponentCollector({
            filter: buttonInteraction => buttonInteraction.customId === buttonId,
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        collector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                return;
            }
            equippedView = !equippedView;
            switchItemsButton.setLabel(equippedView ? backupButtonLabel : equippedButtonLabel);
            yield buttonInteraction.update({
                embeds: [equippedView ? equippedEmbed : backupEmbed],
                components: [new discord_js_1.ActionRowBuilder().addComponents(switchItemsButton)]
            });
        }));
        collector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("inventory")
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("inventory", "user", option)
        .setRequired(false))
        .addIntegerOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("inventory", "rank", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=InventoryCommand.js.map