"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nDraftbot = void 0;
const i18next = require("i18next");
const Language_1 = require("../../../Lib/src/Language");
const fs_1 = require("fs");
const path_1 = require("path");
const BotUtils_1 = require("../utils/BotUtils");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
function getI18nOptions() {
    const resources = {};
    for (const language of Language_1.LANGUAGE.LANGUAGES) {
        const resourceFiles = {};
        const dirPath = `../../../Lang/${language}`;
        for (const file of (0, fs_1.readdirSync)((0, path_1.resolve)(__dirname, dirPath))) {
            if (file.endsWith(".json")) {
                console.log(`Loading i18next resource ${dirPath}/${file}`);
                resourceFiles[file.substring(0, file.length - 5)] = require(`${dirPath}/${file}`);
            }
        }
        resources[language] = resourceFiles;
    }
    return {
        fallbackLng: Language_1.LANGUAGE.DEFAULT_LANGUAGE,
        interpolation: { escapeValue: false },
        resources
    };
}
function convertCommandFormat(str) {
    return str.replace(/{command:(.*?)}/g, (_match, command) => { var _a; return (_a = BotUtils_1.BotUtils.commandsMentions.get(command)) !== null && _a !== void 0 ? _a : `\`COMMAND NOT FOUND : ${command}\``; });
}
function convertEmoteFormat(str) {
    return str.replace(/{emote:(.*?)}/g, (_match, emote) => { var _a; return EmoteUtils_1.EmoteUtils.translateEmojiToDiscord((_a = getEmote(emote)) !== null && _a !== void 0 ? _a : `EMOTE NOT FOUND : ${emote}`); });
}
function getEmote(emote) {
    try {
        let basePath = DraftBotIcons_1.DraftBotIcons;
        const emotePath = emote.split(".");
        for (const path of emotePath) {
            if (typeof basePath === "string") {
                return null;
            }
            basePath = Array.isArray(basePath) ? basePath[parseInt(path, 10)] : basePath[path];
        }
        return typeof basePath === "string" ? basePath : null;
    }
    catch (e) {
        DraftBotLogger_1.DraftBotLogger.errorWithObj(`Error while getting emote ${emote}`, e);
        return null;
    }
}
function draftbotFormat(str) {
    return convertCommandFormat(convertEmoteFormat(str));
}
i18next.init(getI18nOptions())
    .then();
class I18nDraftbot {
    static t(key, options) {
        const value = i18next.t(key, options);
        if (options.returnObjects && !Array.isArray(value)) {
            return Object.entries(value)
                .reduce((acc, [k, v]) => {
                acc[k] = draftbotFormat(v);
                return acc;
            }, {});
        }
        if (Array.isArray(value)) {
            return value.map(draftbotFormat);
        }
        return draftbotFormat(value);
    }
}
exports.I18nDraftbot = I18nDraftbot;
const i18n = I18nDraftbot;
exports.default = i18n;
//# sourceMappingURL=i18n.js.map