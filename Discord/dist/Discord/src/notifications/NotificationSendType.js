"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSendType = exports.NotificationSendTypeEnum = void 0;
const i18n_1 = require("../translations/i18n");
const StringUtils_1 = require("../../../Lib/src/utils/StringUtils");
var NotificationSendTypeEnum;
(function (NotificationSendTypeEnum) {
    NotificationSendTypeEnum[NotificationSendTypeEnum["DM"] = 0] = "DM";
    NotificationSendTypeEnum[NotificationSendTypeEnum["CHANNEL"] = 1] = "CHANNEL";
})(NotificationSendTypeEnum || (exports.NotificationSendTypeEnum = NotificationSendTypeEnum = {}));
function toString(sendType, lng, channelId) {
    return sendType === NotificationSendTypeEnum.DM
        ? i18n_1.default.t("commands:notifications.inDM", { lng })
        : i18n_1.default.t("commands:notifications.inChannel", {
            lng,
            channel: (0, StringUtils_1.getChannelMention)(channelId)
        });
}
exports.NotificationSendType = {
    toString
};
//# sourceMappingURL=NotificationSendType.js.map