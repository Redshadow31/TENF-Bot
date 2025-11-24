"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
exports.escapeUsername = escapeUsername;
const i18n_1 = require("../translations/i18n");
function escapeUsername(username) {
    let fixedName = username.replace(/[*`_|]/gu, "");
    if (fixedName === "") {
        fixedName = ".";
    }
    return fixedName;
}
class StringUtils {
    static getRandomTranslation(tr, lng, replacements = {}) {
        const intros = i18n_1.default.t(tr, Object.assign({ returnObjects: true, lng }, replacements));
        return intros[Math.floor(Math.random() * intros.length)];
    }
    static capitalizeFirstLetter(str) {
        if (str.length === 0) {
            return "";
        }
        if (str.length === 1) {
            return str.toUpperCase();
        }
        return str.charAt(0)
            .toUpperCase() + str.slice(1);
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=StringUtils.js.map