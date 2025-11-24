"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGuildDescriptionInvalidPacket = exports.CommandGuildDescriptionNotAnElderPacket = exports.CommandGuildDescriptionNoGuildPacket = exports.CommandGuildDescriptionPacketReq = exports.CommandGuildDescriptionRefusePacketRes = exports.CommandGuildDescriptionAcceptPacketRes = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGuildDescriptionAcceptPacketRes = class CommandGuildDescriptionAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionAcceptPacketRes = CommandGuildDescriptionAcceptPacketRes;
exports.CommandGuildDescriptionAcceptPacketRes = CommandGuildDescriptionAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDescriptionAcceptPacketRes);
let CommandGuildDescriptionRefusePacketRes = class CommandGuildDescriptionRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionRefusePacketRes = CommandGuildDescriptionRefusePacketRes;
exports.CommandGuildDescriptionRefusePacketRes = CommandGuildDescriptionRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDescriptionRefusePacketRes);
let CommandGuildDescriptionPacketReq = class CommandGuildDescriptionPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionPacketReq = CommandGuildDescriptionPacketReq;
exports.CommandGuildDescriptionPacketReq = CommandGuildDescriptionPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGuildDescriptionPacketReq);
let CommandGuildDescriptionNoGuildPacket = class CommandGuildDescriptionNoGuildPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionNoGuildPacket = CommandGuildDescriptionNoGuildPacket;
exports.CommandGuildDescriptionNoGuildPacket = CommandGuildDescriptionNoGuildPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDescriptionNoGuildPacket);
let CommandGuildDescriptionNotAnElderPacket = class CommandGuildDescriptionNotAnElderPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionNotAnElderPacket = CommandGuildDescriptionNotAnElderPacket;
exports.CommandGuildDescriptionNotAnElderPacket = CommandGuildDescriptionNotAnElderPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDescriptionNotAnElderPacket);
let CommandGuildDescriptionInvalidPacket = class CommandGuildDescriptionInvalidPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGuildDescriptionInvalidPacket = CommandGuildDescriptionInvalidPacket;
exports.CommandGuildDescriptionInvalidPacket = CommandGuildDescriptionInvalidPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandGuildDescriptionInvalidPacket);
//# sourceMappingURL=CommandGuildDescriptionPacket.js.map