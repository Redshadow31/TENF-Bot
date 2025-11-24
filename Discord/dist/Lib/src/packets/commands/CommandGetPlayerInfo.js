"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGetPlayerInfoRes = exports.CommandGetPlayerInfoReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGetPlayerInfoReq = class CommandGetPlayerInfoReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGetPlayerInfoReq = CommandGetPlayerInfoReq;
exports.CommandGetPlayerInfoReq = CommandGetPlayerInfoReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGetPlayerInfoReq);
let CommandGetPlayerInfoRes = class CommandGetPlayerInfoRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGetPlayerInfoRes = CommandGetPlayerInfoRes;
exports.CommandGetPlayerInfoRes = CommandGetPlayerInfoRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], CommandGetPlayerInfoRes);
//# sourceMappingURL=CommandGetPlayerInfo.js.map