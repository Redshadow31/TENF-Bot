"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftBotErrorEmbed = void 0;
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const i18n_1 = require("../translations/i18n");
const StringUtils_1 = require("../utils/StringUtils");
const Language_1 = require("../../../Lib/src/Language");
class DraftBotErrorEmbed extends DraftBotEmbed_1.DraftBotEmbed {
    constructor(user, context, interaction, reason, isCancelling = false, isBlockedError = true) {
        var _a, _b, _c;
        super();
        this.setErrorColor();
        this.setDescription(reason);
        const isOther = interaction.user !== user;
        this.formatAuthor(i18n_1.default.t(isCancelling ? "error:titleCanceled" : isOther && isBlockedError ? "error:titleBlocked" : "error:titleDidntWork", {
            lng: (_c = (_a = interaction.userLanguage) !== null && _a !== void 0 ? _a : (_b = context === null || context === void 0 ? void 0 : context.discord) === null || _b === void 0 ? void 0 : _b.language) !== null && _c !== void 0 ? _c : Language_1.LANGUAGE.DEFAULT_LANGUAGE,
            pseudo: (0, StringUtils_1.escapeUsername)(user.displayName)
        }), user);
    }
}
exports.DraftBotErrorEmbed = DraftBotErrorEmbed;
//# sourceMappingURL=DraftBotErrorEmbed.js.map