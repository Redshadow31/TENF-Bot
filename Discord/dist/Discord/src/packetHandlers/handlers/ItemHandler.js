"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const PacketHandler_1 = require("../PacketHandler");
const ItemAcceptPacket_1 = require("../../../../Lib/src/packets/events/ItemAcceptPacket");
const ItemFoundPacket_1 = require("../../../../Lib/src/packets/events/ItemFoundPacket");
const ItemRefusePacket_1 = require("../../../../Lib/src/packets/events/ItemRefusePacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const ItemConstants_1 = require("../../../../Lib/src/constants/ItemConstants");
const StringUtils_1 = require("../../utils/StringUtils");
class ItemHandler {
    itemAcceptHandler(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            const menuEmbed = new DraftBotEmbed_1.DraftBotEmbed()
                .formatAuthor(i18n_1.default.t("commands:inventory.acceptedTitle", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
            }), interaction.user)
                .setDescription(DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(packet.itemWithDetails, lng));
            yield interaction.channel.send({ embeds: [menuEmbed] });
        });
    }
    itemFoundHandler(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const lng = interaction.userLanguage;
            yield interaction.channel.send({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .formatAuthor(i18n_1.default.t("commands:inventory.randomItemTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                        .setDescription(DisplayUtils_1.DisplayUtils.getItemDisplayWithStats(packet.itemWithDetails, lng))
                ]
            });
        });
    }
    itemRefuseHandler(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            if (!interaction) {
                return;
            }
            const menuEmbed = new DraftBotEmbed_1.DraftBotEmbed();
            const lng = interaction.userLanguage;
            if (packet.item.category !== ItemConstants_1.ItemCategory.POTION) {
                menuEmbed
                    .formatAuthor(packet.autoSell
                    ? i18n_1.default.t("commands:sell.soldMessageAlreadyOwnTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    })
                    : i18n_1.default.t("commands:sell.soldMessageTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:sell.soldMessage", {
                    lng,
                    item: DisplayUtils_1.DisplayUtils.getItemDisplay(packet.item, lng),
                    value: packet.soldMoney
                }));
            }
            else {
                menuEmbed
                    .formatAuthor(packet.autoSell
                    ? i18n_1.default.t("commands:sell.soldMessageAlreadyOwnTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    })
                    : i18n_1.default.t("commands:sell.potionDestroyedTitle", {
                        lng,
                        pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
                    }), interaction.user)
                    .setDescription(i18n_1.default.t("commands:sell.potionDestroyedMessage", {
                    lng,
                    item: DisplayUtils_1.DisplayUtils.getItemDisplay(packet.item, lng)
                }));
            }
            const buttonInteraction = context.discord.buttonInteraction ? DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction) : null;
            if (buttonInteraction && !buttonInteraction.replied) {
                yield buttonInteraction.editReply({ embeds: [menuEmbed] });
            }
            else {
                yield interaction.channel.send({ embeds: [menuEmbed] });
            }
        });
    }
}
exports.default = ItemHandler;
__decorate([
    (0, PacketHandler_1.packetHandler)(ItemAcceptPacket_1.ItemAcceptPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ItemAcceptPacket_1.ItemAcceptPacket]),
    __metadata("design:returntype", Promise)
], ItemHandler.prototype, "itemAcceptHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ItemFoundPacket_1.ItemFoundPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ItemFoundPacket_1.ItemFoundPacket]),
    __metadata("design:returntype", Promise)
], ItemHandler.prototype, "itemFoundHandler", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ItemRefusePacket_1.ItemRefusePacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ItemRefusePacket_1.ItemRefusePacket]),
    __metadata("design:returntype", Promise)
], ItemHandler.prototype, "itemRefuseHandler", null);
//# sourceMappingURL=ItemHandler.js.map