"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotUtils = void 0;
class BotUtils {
    static getValidationInfos(guild) {
        const humans = guild.members.cache.filter(member => !member.user.bot).size;
        const bots = guild.members.cache.filter(member => member.user.bot).size;
        const ratio = Math.round(bots / humans * 100);
        let validation = ":white_check_mark:";
        if (ratio > 30 || humans < 30 || humans < 100 && ratio > 20) {
            validation = ":x:";
        }
        else if (ratio > 20 || bots > 15 || humans < 100) {
            validation = ":warning:";
        }
        return {
            validation, humans, bots, ratio
        };
    }
}
exports.BotUtils = BotUtils;
BotUtils.commandsMentions = new Map();
//# sourceMappingURL=BotUtils.js.map