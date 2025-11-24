"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftBotEmbed = void 0;
const discord_js_1 = require("discord.js");
const ColorConstants_1 = require("../../../Lib/src/constants/ColorConstants");
class DraftBotEmbed extends discord_js_1.EmbedBuilder {
    formatAuthor(title, user) {
        this.setAuthor({
            name: title,
            iconURL: user.displayAvatarURL()
        });
        return this;
    }
    setErrorColor() {
        this.setColor(ColorConstants_1.ColorConstants.ERROR);
        return this;
    }
}
exports.DraftBotEmbed = DraftBotEmbed;
//# sourceMappingURL=DraftBotEmbed.js.map