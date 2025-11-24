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
exports.handleItemSwitch = handleItemSwitch;
exports.switchItemCollector = switchItemCollector;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const CommandSwitchPacket_1 = require("../../../../Lib/src/packets/commands/CommandSwitchPacket");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const ReactionCollectorSwitchItem_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSwitchItem");
const DiscordItemUtils_1 = require("../../utils/DiscordItemUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandSwitchPacket_1.CommandSwitchPacketReq, {});
    });
}
function handleItemSwitch(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = interaction.userLanguage;
        yield ((_a = (buttonInteraction !== null && buttonInteraction !== void 0 ? buttonInteraction : interaction)) === null || _a === void 0 ? void 0 : _a.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:switch.titleSuccess", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                }), interaction.user)
                    .setDescription(i18n_1.default.t(`commands:switch.${packet.itemBackedUp.id === 0 ? "switchingSingle" : "switchingDouble"}`, {
                    lng,
                    item1: DiscordItemUtils_1.DiscordItemUtils.getShortDisplay(packet.itemEquipped, lng),
                    item2: DiscordItemUtils_1.DiscordItemUtils.getShortDisplay(packet.itemBackedUp, lng)
                }))
            ]
        }));
    });
}
function getFielder(itemCategory) {
    switch (itemCategory) {
        case 0:
            return DiscordItemUtils_1.DiscordItemUtils.getWeaponField;
        case 1:
            return DiscordItemUtils_1.DiscordItemUtils.getArmorField;
        case 2:
            return DiscordItemUtils_1.DiscordItemUtils.getPotionField;
        default:
            return DiscordItemUtils_1.DiscordItemUtils.getObjectField;
    }
}
function switchItemCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t("commands:switch.switchSelectionTitle", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user)
            .setDescription(`${i18n_1.default.t("commands:switch.switchSelectionDescription", { lng })}\n\n`);
        const reactions = packet.reactions
            .map(reaction => reaction.data)
            .filter(reaction => reaction.item);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createChoiceListCollector(interaction, {
            packet,
            context
        }, {
            embed,
            items: reactions.map(reaction => getFielder(reaction.item.itemCategory)(reaction.item, lng).value)
        }, {
            refuse: {
                can: true,
                reactionIndex: packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorSwitchItem_1.ReactionCollectorSwitchItemCloseReaction.name)
            },
            sendManners: DiscordCollectorUtils_1.SEND_POLITICS.EDIT_REPLY_OR_FOLLOWUP
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("switch"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=SwitchCommand.js.map