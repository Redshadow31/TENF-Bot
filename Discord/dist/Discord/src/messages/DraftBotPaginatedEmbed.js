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
exports.DraftBotPaginatedEmbed = void 0;
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const discord_js_1 = require("discord.js");
const ErrorUtils_1 = require("../utils/ErrorUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const Constants_1 = require("../../../Lib/src/constants/Constants");
const i18n_1 = require("../translations/i18n");
class DraftBotPaginatedEmbed extends DraftBotEmbed_1.DraftBotEmbed {
    constructor(options) {
        super();
        this.options = options;
    }
    send(originalInteraction) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let currentPage = (_a = this.options.selectedPageIndex) !== null && _a !== void 0 ? _a : 0;
            const previousCustomId = "previous";
            const nextCustomId = "next";
            const previousButton = new discord_js_1.ButtonBuilder()
                .setEmoji(DraftBotIcons_1.DraftBotIcons.collectors.previousPage)
                .setCustomId(previousCustomId)
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const nextButton = new discord_js_1.ButtonBuilder()
                .setEmoji(DraftBotIcons_1.DraftBotIcons.collectors.nextPage)
                .setCustomId(nextCustomId)
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            const msg = yield originalInteraction.editReply({
                embeds: [this.setDescription(this.options.pages[currentPage]).setFooter(DraftBotPaginatedEmbed.getPageFooter(currentPage, this.options.pages.length, this.options.lng))],
                components: DraftBotPaginatedEmbed.getPageComponents(currentPage, this.options.pages.length, previousButton, nextButton)
            });
            if (!msg) {
                return;
            }
            const collector = msg.createMessageComponentCollector({
                time: (_b = this.options.collectorTime) !== null && _b !== void 0 ? _b : Constants_1.Constants.MESSAGES.COLLECTOR_TIME
            });
            collector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
                if (this.options.allowedUserIds
                    ? !this.options.allowedUserIds.includes(buttonInteraction.user.id)
                    : buttonInteraction.user.id !== originalInteraction.user.id) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, this.options.lng);
                    return;
                }
                if (buttonInteraction.customId === previousCustomId) {
                    currentPage--;
                }
                else if (buttonInteraction.customId === nextCustomId) {
                    currentPage++;
                }
                yield buttonInteraction.update({
                    embeds: [this.setDescription(this.options.pages[currentPage]).setFooter(DraftBotPaginatedEmbed.getPageFooter(currentPage, this.options.pages.length, this.options.lng))],
                    components: DraftBotPaginatedEmbed.getPageComponents(currentPage, this.options.pages.length, previousButton, nextButton)
                });
            }));
            collector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield msg.edit({
                    components: []
                });
            }));
        });
    }
    static getPageComponents(currentPage, pagesCount, previousButton, nextButton) {
        if (pagesCount <= 1) {
            return [];
        }
        const components = [];
        if (currentPage > 0) {
            components.push(previousButton.setDisabled(false));
        }
        else {
            components.push(previousButton.setDisabled(true));
        }
        if (currentPage < pagesCount - 1) {
            components.push(nextButton.setDisabled(false));
        }
        else {
            components.push(nextButton.setDisabled(true));
        }
        return [
            new discord_js_1.ActionRowBuilder()
                .addComponents(components)
        ];
    }
    static getPageFooter(currentPage, totalPages, lng) {
        return {
            text: i18n_1.default.t("embeds:paginated.footer", {
                lng,
                page: currentPage + 1,
                total: totalPages
            })
        };
    }
}
exports.DraftBotPaginatedEmbed = DraftBotPaginatedEmbed;
//# sourceMappingURL=DraftBotPaginatedEmbed.js.map