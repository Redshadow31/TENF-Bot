"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildElderRemoveNoElderPacket = exports.CommandGuildElderRemovePacketReq = exports.CommandGuildElderRemoveRefusePacketRes = exports.CommandGuildElderRemoveAcceptPacketRes = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildElderRemoveAcceptPacketRes = class CommandGuildElderRemoveAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderRemoveAcceptPacketRes = CommandGuildElderRemoveAcceptPacketRes;
exports.CommandGuildElderRemoveAcceptPacketRes = CommandGuildElderRemoveAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderRemoveAcceptPacketRes);
let CommandGuildElderRemoveRefusePacketRes = class CommandGuildElderRemoveRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderRemoveRefusePacketRes = CommandGuildElderRemoveRefusePacketRes;
exports.CommandGuildElderRemoveRefusePacketRes = CommandGuildElderRemoveRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderRemoveRefusePacketRes);
let CommandGuildElderRemovePacketReq = class CommandGuildElderRemovePacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderRemovePacketReq = CommandGuildElderRemovePacketReq;
exports.CommandGuildElderRemovePacketReq = CommandGuildElderRemovePacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildElderRemovePacketReq);
let CommandGuildElderRemoveNoElderPacket = class CommandGuildElderRemoveNoElderPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildElderRemoveNoElderPacket = CommandGuildElderRemoveNoElderPacket;
exports.CommandGuildElderRemoveNoElderPacket = CommandGuildElderRemoveNoElderPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildElderRemoveNoElderPacket);
//# sourceMappingURL=CommandGuildElderRemovePacket.js.map