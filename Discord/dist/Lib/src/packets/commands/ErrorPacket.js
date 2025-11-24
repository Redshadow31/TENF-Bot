"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorSeasonEndIsNow = exports.ErrorResetIsNow = exports.ErrorBannedPacket = exports.ErrorMaintenancePacket = exports.ErrorPacket = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let ErrorPacket = class ErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.ErrorPacket = ErrorPacket;
exports.ErrorPacket = ErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ErrorPacket);
let ErrorMaintenancePacket = class ErrorMaintenancePacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.ErrorMaintenancePacket = ErrorMaintenancePacket;
exports.ErrorMaintenancePacket = ErrorMaintenancePacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ErrorMaintenancePacket);
let ErrorBannedPacket = class ErrorBannedPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.ErrorBannedPacket = ErrorBannedPacket;
exports.ErrorBannedPacket = ErrorBannedPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ErrorBannedPacket);
let ErrorResetIsNow = class ErrorResetIsNow extends DraftBotPacket_1.DraftBotPacket {
};
exports.ErrorResetIsNow = ErrorResetIsNow;
exports.ErrorResetIsNow = ErrorResetIsNow = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ErrorResetIsNow);
let ErrorSeasonEndIsNow = class ErrorSeasonEndIsNow extends DraftBotPacket_1.DraftBotPacket {
};
exports.ErrorSeasonEndIsNow = ErrorSeasonEndIsNow;
exports.ErrorSeasonEndIsNow = ErrorSeasonEndIsNow = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ErrorSeasonEndIsNow);
//# sourceMappingURL=ErrorPacket.js.map