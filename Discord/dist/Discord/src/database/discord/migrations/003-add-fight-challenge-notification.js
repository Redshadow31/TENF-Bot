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
exports.up = up;
exports.down = down;
const sequelize_1 = require("sequelize");
const NotificationSendType_1 = require("../../../notifications/NotificationSendType");
function up(_a) {
    return __awaiter(this, arguments, void 0, function* ({ context }) {
        yield context.addColumn("notifications", "fightChallengeEnabled", {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        });
        yield context.addColumn("notifications", "fightChallengeSendType", {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: NotificationSendType_1.NotificationSendTypeEnum.DM
        });
        return context.addColumn("notifications", "fightChallengeChannelId", {
            type: sequelize_1.DataTypes.STRING(32)
        });
    });
}
function down(_a) {
    return __awaiter(this, arguments, void 0, function* ({ context }) {
        yield context.removeColumn("notifications", "fightChallengeEnabled");
        yield context.removeColumn("notifications", "fightChallengeSendType");
        return context.removeColumn("notifications", "fightChallengeChannelId");
    });
}
//# sourceMappingURL=003-add-fight-challenge-notification.js.map