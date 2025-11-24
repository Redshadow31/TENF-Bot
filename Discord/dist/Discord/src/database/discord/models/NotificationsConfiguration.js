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
exports.NotificationsConfigurations = exports.NotificationsConfiguration = void 0;
exports.initModel = initModel;
const sequelize_1 = require("sequelize");
const moment = require("moment");
const NotificationSendType_1 = require("../../../notifications/NotificationSendType");
class NotificationsConfiguration extends sequelize_1.Model {
}
exports.NotificationsConfiguration = NotificationsConfiguration;
class NotificationsConfigurations {
    static getOrRegister(discordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield NotificationsConfiguration.findOrCreate({
                where: {
                    discordId
                }
            }))[0];
        });
    }
}
exports.NotificationsConfigurations = NotificationsConfigurations;
function initModel(sequelize) {
    NotificationsConfiguration.init({
        discordId: {
            type: sequelize_1.DataTypes.STRING(32),
            primaryKey: true
        },
        reportEnabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        reportSendType: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: NotificationSendType_1.NotificationSendTypeEnum.DM
        },
        reportChannelId: {
            type: sequelize_1.DataTypes.STRING(32)
        },
        guildDailyEnabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        guildDailySendType: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: NotificationSendType_1.NotificationSendTypeEnum.DM
        },
        guildDailyChannelId: {
            type: sequelize_1.DataTypes.STRING(32)
        },
        playerFreedFromJailEnabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        playerFreedFromJailSendType: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: NotificationSendType_1.NotificationSendTypeEnum.DM
        },
        playerFreedFromJailChannelId: {
            type: sequelize_1.DataTypes.STRING(32)
        },
        fightChallengeEnabled: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: true
        },
        fightChallengeSendType: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: NotificationSendType_1.NotificationSendTypeEnum.DM
        },
        fightChallengeChannelId: {
            type: sequelize_1.DataTypes.STRING(32)
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: moment()
                .format("YYYY-MM-DD HH:mm:ss")
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            defaultValue: moment()
                .format("YYYY-MM-DD HH:mm:ss")
        }
    }, {
        sequelize,
        tableName: "notifications",
        freezeTableName: true
    });
    NotificationsConfiguration.beforeSave(instance => {
        instance.updatedAt = new Date();
    });
}
exports.default = NotificationsConfiguration;
//# sourceMappingURL=NotificationsConfiguration.js.map