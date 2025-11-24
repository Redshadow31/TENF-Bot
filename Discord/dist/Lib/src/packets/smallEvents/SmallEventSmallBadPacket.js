"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventSmallBadPacket = exports.SmallEventBadIssue = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
const SmallEventPacket_1 = require("./SmallEventPacket");
var SmallEventBadIssue;
(function (SmallEventBadIssue) {
    SmallEventBadIssue["HEALTH"] = "healthLost";
    SmallEventBadIssue["MONEY"] = "moneyLost";
    SmallEventBadIssue["TIME"] = "timeLost";
})(SmallEventBadIssue || (exports.SmallEventBadIssue = SmallEventBadIssue = {}));
let SmallEventSmallBadPacket = class SmallEventSmallBadPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventSmallBadPacket = SmallEventSmallBadPacket;
exports.SmallEventSmallBadPacket = SmallEventSmallBadPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventSmallBadPacket);
//# sourceMappingURL=SmallEventSmallBadPacket.js.map