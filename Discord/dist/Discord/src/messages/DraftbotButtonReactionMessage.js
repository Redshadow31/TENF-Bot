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
exports.DraftbotButtonReactionMessage = void 0;
const discord_js_1 = require("discord.js");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const ErrorUtils_1 = require("../utils/ErrorUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
class DraftbotButtonReactionMessage {
    constructor(interaction, messageOptions) {
        this._buttonRow = new discord_js_1.ActionRowBuilder();
        this._buttonRow.addComponents(messageOptions.reactions.map(({ emote, buttonStyle, customId }) => new discord_js_1.ButtonBuilder()
            .setCustomId(customId)
            .setStyle(buttonStyle !== null && buttonStyle !== void 0 ? buttonStyle : discord_js_1.ButtonStyle.Secondary)
            .setEmoji(emote)));
        this._embed = messageOptions.embed;
        this._embed.setDescription(this._embed.toJSON().description + this.createMenuDescription(messageOptions.reactions));
        this._interaction = interaction;
        this._messageOptions = messageOptions;
    }
    sendReaction(customId) {
        const indexes = this._messageOptions.reactions.map(r => r.customId);
        DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(this._messageOptions.packet, this._messageOptions.context, this._messageOptions.context.keycloakId, null, indexes.findIndex(r => r === customId));
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this._interaction.editReply({
                embeds: [this._embed],
                components: [this._buttonRow]
            });
            if (!message) {
                return null;
            }
            const buttonCollector = message.createMessageComponentCollector({
                time: this._messageOptions.packet.endTime - Date.now()
            });
            const reactionCollector = this._messageOptions.canEndReact
                ? message.createReactionCollector({
                    filter: (reaction, user) => user.id === this._interaction.user.id && reaction.emoji.name === DraftBotIcons_1.DraftBotIcons.messages.notReplied,
                    time: this._messageOptions.packet.endTime - Date.now()
                })
                : null;
            buttonCollector.on("collect", (i) => __awaiter(this, void 0, void 0, function* () {
                if (i.user.id !== this._interaction.user.id) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(i.user, i, this._interaction.userLanguage);
                    return;
                }
                this.sendReaction(i.customId);
            }));
            reactionCollector === null || reactionCollector === void 0 ? void 0 : reactionCollector.on("collect", () => {
                this.sendReaction(null);
            });
            buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield this._interaction.editReply({
                    components: [],
                    embeds: [this._embed]
                });
            }));
            if (reactionCollector) {
                return [buttonCollector, reactionCollector];
            }
            return [buttonCollector];
        });
    }
    createMenuDescription(reactions) {
        return `\n\n${reactions.map(({ emote, description }) => `${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(emote)} ${description}`)
            .join("\n")}`;
    }
}
exports.DraftbotButtonReactionMessage = DraftbotButtonReactionMessage;
//# sourceMappingURL=DraftbotButtonReactionMessage.js.map