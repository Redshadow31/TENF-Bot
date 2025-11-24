"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSetPlayerInfoDoesntExistError = exports.CommandSetPlayerInfoRes = exports.CommandSetPlayerInfoReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandSetPlayerInfoReq = class CommandSetPlayerInfoReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSetPlayerInfoReq = CommandSetPlayerInfoReq;
exports.CommandSetPlayerInfoReq = CommandSetPlayerInfoReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandSetPlayerInfoReq);
let CommandSetPlayerInfoRes = class CommandSetPlayerInfoRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSetPlayerInfoRes = CommandSetPlayerInfoRes;
exports.CommandSetPlayerInfoRes = CommandSetPlayerInfoRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandSetPlayerInfoRes);
let CommandSetPlayerInfoDoesntExistError = class CommandSetPlayerInfoDoesntExistError extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSetPlayerInfoDoesntExistError = CommandSetPlayerInfoDoesntExistError;
exports.CommandSetPlayerInfoDoesntExistError = CommandSetPlayerInfoDoesntExistError = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandSetPlayerInfoDoesntExistError);
//# sourceMappingURL=CommandSetPlayerInfo.js.map