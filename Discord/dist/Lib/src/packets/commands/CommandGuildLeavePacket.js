"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildLeaveNotInAGuildPacketRes = exports.CommandGuildLeaveAcceptPacketRes = exports.CommandGuildLeaveRefusePacketRes = exports.CommandGuildLeavePacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildLeavePacketReq = class CommandGuildLeavePacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildLeavePacketReq = CommandGuildLeavePacketReq;
exports.CommandGuildLeavePacketReq = CommandGuildLeavePacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildLeavePacketReq);
let CommandGuildLeaveRefusePacketRes = class CommandGuildLeaveRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildLeaveRefusePacketRes = CommandGuildLeaveRefusePacketRes;
exports.CommandGuildLeaveRefusePacketRes = CommandGuildLeaveRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildLeaveRefusePacketRes);
let CommandGuildLeaveAcceptPacketRes = class CommandGuildLeaveAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildLeaveAcceptPacketRes = CommandGuildLeaveAcceptPacketRes;
exports.CommandGuildLeaveAcceptPacketRes = CommandGuildLeaveAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildLeaveAcceptPacketRes);
let CommandGuildLeaveNotInAGuildPacketRes = class CommandGuildLeaveNotInAGuildPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildLeaveNotInAGuildPacketRes = CommandGuildLeaveNotInAGuildPacketRes;
exports.CommandGuildLeaveNotInAGuildPacketRes = CommandGuildLeaveNotInAGuildPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildLeaveNotInAGuildPacketRes);
//# sourceMappingURL=CommandGuildLeavePacket.js.map