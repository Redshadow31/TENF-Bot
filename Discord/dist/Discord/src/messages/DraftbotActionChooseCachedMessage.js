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
exports.DraftbotActionChooseCachedMessage = void 0;
const DraftbotCachedMessage_1 = require("./DraftbotCachedMessage");
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const i18n_1 = require("../translations/i18n");
const discord_js_1 = require("discord.js");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const DiscordConstants_1 = require("../DiscordConstants");
const ErrorUtils_1 = require("../utils/ErrorUtils");
const DisplayUtils_1 = require("../utils/DisplayUtils");
class DraftbotActionChooseCachedMessage extends DraftbotCachedMessage_1.DraftbotCachedMessage {
    constructor() {
        super(...arguments);
        this.duration = 30;
        this.updateMessage = (packet, context) => __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const data = packet.data.data;
            const lng = interaction.userLanguage;
            if (!this.usernameCache) {
                this.usernameCache = yield DisplayUtils_1.DisplayUtils.getEscapedUsername(data.fighterKeycloakId, interaction.userLanguage);
            }
            const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:fight.fightActionChoose.turnIndicationTitle", {
                lng,
                pseudo: this.usernameCache
            }), interaction.user)
                .setDescription(i18n_1.default.t("commands:fight.fightActionChoose.turnIndicationDescription", { lng }));
            const rows = [new discord_js_1.ActionRowBuilder()];
            const reactions = packet.reactions;
            reactions.forEach(action => {
                const react = action.data;
                const emoji = EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.fightActions[react.id]);
                const button = new discord_js_1.ButtonBuilder()
                    .setEmoji((0, discord_js_1.parseEmoji)(emoji))
                    .setCustomId(react.id)
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                if (rows[rows.length - 1].components.length >= DiscordConstants_1.DiscordConstants.MAX_BUTTONS_PER_ROW) {
                    rows.push(new discord_js_1.ActionRowBuilder());
                }
                rows[rows.length - 1].addComponents(button);
            });
            const msg = yield this.post({
                embeds: [embed],
                components: rows
            });
            const buttonCollector = msg.createMessageComponentCollector({
                time: packet.endTime - Date.now()
            });
            buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, lng);
                    return;
                }
                yield buttonInteraction.update({
                    components: []
                });
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, reactions.findIndex(reaction => reaction.data.id === buttonInteraction.customId));
            }));
            return [buttonCollector];
        });
    }
    get type() {
        return "action_choose";
    }
}
exports.DraftbotActionChooseCachedMessage = DraftbotActionChooseCachedMessage;
//# sourceMappingURL=DraftbotActionChooseCachedMessage.js.map