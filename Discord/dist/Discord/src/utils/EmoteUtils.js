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
exports.EmoteUtils = void 0;
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const discord_js_1 = require("discord.js");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
class EmoteUtils {
    static translateEmojiToDiscord(emoji) {
        if (this.emojiUnicodeMap[emoji]) {
            return this.emojiUnicodeMap[emoji];
        }
        return emoji;
    }
    static translateEmojiForSelectMenus(emoji) {
        if (this.emojiSelectMenuMap[emoji]) {
            return this.emojiSelectMenuMap[emoji];
        }
        return emoji;
    }
    static testAllEmotesInSelectMenu(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let emojis = Object.values(DraftBotIcons_1.DraftBotIcons.weapons).concat(Object.values(DraftBotIcons_1.DraftBotIcons.armors), Object.values(DraftBotIcons_1.DraftBotIcons.potions), Object.values(DraftBotIcons_1.DraftBotIcons.pets).map(pet => pet.emoteMale), Object.values(DraftBotIcons_1.DraftBotIcons.pets).map(pet => pet.emoteFemale));
            emojis = emojis.filter((value, index, self) => self.indexOf(value) === index);
            emojis.splice(emojis.indexOf("👁️‍🗨️"), 1);
            emojis.splice(emojis.indexOf("🦄️"), 1);
            emojis.splice(emojis.indexOf("🐉️"), 1);
            emojis.splice(emojis.indexOf("🦖️"), 1);
            emojis.splice(emojis.indexOf("🦔️"), 1);
            const embed = new DraftBotEmbed_1.DraftBotEmbed()
                .setTitle("Test select menu")
                .setDescription("Test select menu");
            const msg = yield interaction.channel.send({
                embeds: [embed]
            });
            const maxOptions = 25;
            for (let i = 0; i < Math.ceil(emojis.length / maxOptions); i++) {
                DraftBotLogger_1.DraftBotLogger.info(`Test select menu slice ${i} / ${Math.ceil(emojis.length / maxOptions)}`);
                const emojisSlice = emojis.slice(i * maxOptions, (i + 1) * maxOptions);
                DraftBotLogger_1.DraftBotLogger.info(`Emojis slice: ${emojisSlice}`);
                const row = new discord_js_1.ActionRowBuilder();
                const selectMenu = new discord_js_1.StringSelectMenuBuilder()
                    .setCustomId("testSelectMenu")
                    .setPlaceholder("Test select menu")
                    .addOptions(emojisSlice.map((emoji, index) => new discord_js_1.StringSelectMenuOptionBuilder()
                    .setDescription("Test")
                    .setLabel("Test")
                    .setValue(index.toString())
                    .setEmoji((0, discord_js_1.parseEmoji)(emoji))));
                try {
                    yield msg.edit({
                        embeds: [embed],
                        components: [row.addComponents(selectMenu)]
                    });
                }
                catch (e) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while sending select menu", e);
                }
            }
        });
    }
}
exports.EmoteUtils = EmoteUtils;
EmoteUtils.emojiUnicodeMap = {
    "⛰": ":mountain:",
    "♨": ":hotsprings:",
    "✒": ":black_nib:",
    "⛴": ":ferry:"
};
EmoteUtils.emojiSelectMenuMap = {
    "👁️‍🗨️": "👁️",
    "🦄️": "❓",
    "🐉️": "❓",
    "🦖️": "❓",
    "🦔️": "❓"
};
//# sourceMappingURL=EmoteUtils.js.map