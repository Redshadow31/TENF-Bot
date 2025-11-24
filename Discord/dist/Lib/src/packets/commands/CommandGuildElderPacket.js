"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildElderFoundPlayerPacketRes = exports.CommandGuildElderAlreadyElderPacketRes = exports.CommandGuildElderHimselfPacketRes = exports.CommandGuildElderSameGuildPacketRes = exports.CommandGuildElderPacketReq = exports.CommandGuildElderRefusePacketRes = exports.CommandGuildElderAcceptPacketRes = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildElderAcceptPacketRes = class CommandGuildElderAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderAcceptPacketRes = CommandGuildElderAcceptPacketRes;
exports.CommandGuildElderAcceptPacketRes = CommandGuildElderAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderAcceptPacketRes);
let CommandGuildElderRefusePacketRes = class CommandGuildElderRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderRefusePacketRes = CommandGuildElderRefusePacketRes;
exports.CommandGuildElderRefusePacketRes = CommandGuildElderRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderRefusePacketRes);
let CommandGuildElderPacketReq = class CommandGuildElderPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderPacketReq = CommandGuildElderPacketReq;
exports.CommandGuildElderPacketReq = CommandGuildElderPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildElderPacketReq);
let CommandGuildElderSameGuildPacketRes = class CommandGuildElderSameGuildPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderSameGuildPacketRes = CommandGuildElderSameGuildPacketRes;
exports.CommandGuildElderSameGuildPacketRes = CommandGuildElderSameGuildPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderSameGuildPacketRes);
let CommandGuildElderHimselfPacketRes = class CommandGuildElderHimselfPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderHimselfPacketRes = CommandGuildElderHimselfPacketRes;
exports.CommandGuildElderHimselfPacketRes = CommandGuildElderHimselfPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderHimselfPacketRes);
let CommandGuildElderAlreadyElderPacketRes = class CommandGuildElderAlreadyElderPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderAlreadyElderPacketRes = CommandGuildElderAlreadyElderPacketRes;
exports.CommandGuildElderAlreadyElderPacketRes = CommandGuildElderAlreadyElderPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderAlreadyElderPacketRes);
let CommandGuildElderFoundPlayerPacketRes = class CommandGuildElderFoundPlayerPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderFoundPlayerPacketRes = CommandGuildElderFoundPlayerPacketRes;
exports.CommandGuildElderFoundPlayerPacketRes = CommandGuildElderFoundPlayerPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderFoundPlayerPacketRes);
//# sourceMappingURL=CommandGuildElderPacket.js.map