"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandSwitchCancelled = exports.CommandSwitchErrorNoItemToSwitch = exports.CommandSwitchSuccess = exports.CommandSwitchPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandSwitchPacketReq = class CommandSwitchPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSwitchPacketReq = CommandSwitchPacketReq;
exports.CommandSwitchPacketReq = CommandSwitchPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandSwitchPacketReq);
let CommandSwitchSuccess = class CommandSwitchSuccess extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSwitchSuccess = CommandSwitchSuccess;
exports.CommandSwitchSuccess = CommandSwitchSuccess = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandSwitchSuccess);
let CommandSwitchErrorNoItemToSwitch = class CommandSwitchErrorNoItemToSwitch extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSwitchErrorNoItemToSwitch = CommandSwitchErrorNoItemToSwitch;
exports.CommandSwitchErrorNoItemToSwitch = CommandSwitchErrorNoItemToSwitch = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandSwitchErrorNoItemToSwitch);
let CommandSwitchCancelled = class CommandSwitchCancelled extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandSwitchCancelled = CommandSwitchCancelled;
exports.CommandSwitchCancelled = CommandSwitchCancelled = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandSwitchCancelled);
//# sourceMappingURL=CommandSwitchPacket.js.map