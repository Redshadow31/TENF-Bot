"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandUnlockRefusePacketRes = exports.CommandUnlockAcceptPacketRes = exports.CommandUnlockHimself = exports.CommandUnlockNotEnoughMoney = exports.CommandUnlockNotInJail = exports.CommandUnlockNoPlayerFound = exports.CommandUnlockErrorPacket = exports.CommandUnlockPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandUnlockPacketReq = class CommandUnlockPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandUnlockPacketReq = CommandUnlockPacketReq;
exports.CommandUnlockPacketReq = CommandUnlockPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandUnlockPacketReq);
let CommandUnlockErrorPacket = class CommandUnlockErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandUnlockErrorPacket = CommandUnlockErrorPacket;
exports.CommandUnlockErrorPacket = CommandUnlockErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], CommandUnlockErrorPacket);
let CommandUnlockNoPlayerFound = class CommandUnlockNoPlayerFound extends CommandUnlockErrorPacket {
};
exports.CommandUnlockNoPlayerFound = CommandUnlockNoPlayerFound;
exports.CommandUnlockNoPlayerFound = CommandUnlockNoPlayerFound = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockNoPlayerFound);
let CommandUnlockNotInJail = class CommandUnlockNotInJail extends CommandUnlockErrorPacket {
};
exports.CommandUnlockNotInJail = CommandUnlockNotInJail;
exports.CommandUnlockNotInJail = CommandUnlockNotInJail = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockNotInJail);
let CommandUnlockNotEnoughMoney = class CommandUnlockNotEnoughMoney extends CommandUnlockErrorPacket {
};
exports.CommandUnlockNotEnoughMoney = CommandUnlockNotEnoughMoney;
exports.CommandUnlockNotEnoughMoney = CommandUnlockNotEnoughMoney = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockNotEnoughMoney);
let CommandUnlockHimself = class CommandUnlockHimself extends CommandUnlockErrorPacket {
};
exports.CommandUnlockHimself = CommandUnlockHimself;
exports.CommandUnlockHimself = CommandUnlockHimself = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockHimself);
let CommandUnlockAcceptPacketRes = class CommandUnlockAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandUnlockAcceptPacketRes = CommandUnlockAcceptPacketRes;
exports.CommandUnlockAcceptPacketRes = CommandUnlockAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockAcceptPacketRes);
let CommandUnlockRefusePacketRes = class CommandUnlockRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandUnlockRefusePacketRes = CommandUnlockRefusePacketRes;
exports.CommandUnlockRefusePacketRes = CommandUnlockRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandUnlockRefusePacketRes);
//# sourceMappingURL=CommandUnlockPacket.js.map