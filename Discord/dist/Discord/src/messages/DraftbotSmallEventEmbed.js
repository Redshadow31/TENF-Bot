"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftbotSmallEventEmbed = void 0;
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const i18n_1 = require("../translations/i18n");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const StringUtils_1 = require("../utils/StringUtils");
class DraftbotSmallEventEmbed extends DraftBotEmbed_1.DraftBotEmbed {
    constructor(smallEventId, description, user, lng) {
        super();
        this.setAuthor({
            name: i18n_1.default.t("commands:report.journal", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(user.displayName)
            }),
            iconURL: user.displayAvatarURL()
        });
        this.setDescription(`${EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.smallEvents[smallEventId])} ${description}`);
    }
}
exports.DraftbotSmallEventEmbed = DraftbotSmallEventEmbed;
//# sourceMappingURL=DraftbotSmallEventEmbed.js.map