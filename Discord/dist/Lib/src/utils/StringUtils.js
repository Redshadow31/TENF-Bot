"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeUsername = escapeUsername;
exports.progressBar = progressBar;
exports.checkNameString = checkNameString;
exports.discordIdToMention = discordIdToMention;
exports.isAnId = isAnId;
exports.isAnEmoji = isAnEmoji;
exports.getMention = getMention;
exports.getChannelMention = getChannelMention;
exports.toSignedPercent = toSignedPercent;
const StringConstants_1 = require("../constants/StringConstants");
function escapeUsername(username) {
    let fixedName = username.replace(/[*`_|]/gu, "");
    if (fixedName === "") {
        fixedName = ".";
    }
    return fixedName;
}
function progressBar(value, maxValue) {
    let percentage = value / maxValue;
    if (percentage < 0 || isNaN(percentage) || percentage === Infinity) {
        percentage = 0;
    }
    if (percentage > 1) {
        percentage = 1;
    }
    const progress = Math.round(StringConstants_1.StringConstants.PROGRESS_BAR_SIZE * percentage);
    const emptyProgress = StringConstants_1.StringConstants.PROGRESS_BAR_SIZE - progress;
    const progressText = "▇".repeat(progress);
    const emptyProgressText = "—".repeat(emptyProgress);
    const percentageText = `${Math.floor(percentage * 100)}%`;
    return `\`\`\`[${progressText}${emptyProgressText}]${percentageText}\`\`\``;
}
function checkNameString(name, range) {
    const regexAllowed = /^[A-Za-z0-9 ÇçÜüÉéÂâÄäÀàÊêËëÈèÏïÎîÔôÖöÛû!,'.:()-]+$/u;
    const regexSpecialCases = /^[0-9 ]+$|( {2})+$|([ÇçÜüÉéÂâÄäÀàÊêËëÈèÏïÎîÔôÖöÛû]{2})+$|([!,'.:()-]{2})+/u;
    return regexAllowed.test(name) && !regexSpecialCases.test(name) && name.length >= range.MIN && name.length <= range.MAX;
}
function discordIdToMention(id) {
    return `<@${id}>`;
}
function isAnId(variable) {
    return (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/u).test(variable);
}
function isAnEmoji(variable) {
    return (/\p{Emoji}/u).test(variable);
}
function getMention(discordUserId) {
    return `<@${discordUserId}>`;
}
function getChannelMention(discordChannelId) {
    return `<#${discordChannelId}>`;
}
function toSignedPercent(value) {
    return Math.round(-((1 - value) * 100));
}
//# sourceMappingURL=StringUtils.js.map