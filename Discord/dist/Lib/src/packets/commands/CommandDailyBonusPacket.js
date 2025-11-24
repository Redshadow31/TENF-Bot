"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDailyBonusPacketRes = exports.CommandDailyBonusObjectDoNothing = exports.CommandDailyBonusObjectIsActiveDuringFights = exports.CommandDailyBonusInCooldown = exports.CommandDailyBonusNoActiveObject = exports.CommandDailyBonusPacketReq = void 0;
const DraftBotPacket_js_1 = require("../DraftBotPacket.js");
let CommandDailyBonusPacketReq = class CommandDailyBonusPacketReq extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusPacketReq = CommandDailyBonusPacketReq;
exports.CommandDailyBonusPacketReq = CommandDailyBonusPacketReq = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.FRONT_TO_BACK)
], CommandDailyBonusPacketReq);
let CommandDailyBonusNoActiveObject = class CommandDailyBonusNoActiveObject extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusNoActiveObject = CommandDailyBonusNoActiveObject;
exports.CommandDailyBonusNoActiveObject = CommandDailyBonusNoActiveObject = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandDailyBonusNoActiveObject);
let CommandDailyBonusInCooldown = class CommandDailyBonusInCooldown extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusInCooldown = CommandDailyBonusInCooldown;
exports.CommandDailyBonusInCooldown = CommandDailyBonusInCooldown = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandDailyBonusInCooldown);
let CommandDailyBonusObjectIsActiveDuringFights = class CommandDailyBonusObjectIsActiveDuringFights extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusObjectIsActiveDuringFights = CommandDailyBonusObjectIsActiveDuringFights;
exports.CommandDailyBonusObjectIsActiveDuringFights = CommandDailyBonusObjectIsActiveDuringFights = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandDailyBonusObjectIsActiveDuringFights);
let CommandDailyBonusObjectDoNothing = class CommandDailyBonusObjectDoNothing extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusObjectDoNothing = CommandDailyBonusObjectDoNothing;
exports.CommandDailyBonusObjectDoNothing = CommandDailyBonusObjectDoNothing = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandDailyBonusObjectDoNothing);
let CommandDailyBonusPacketRes = class CommandDailyBonusPacketRes extends DraftBotPacket_js_1.DraftBotPacket {
};
exports.CommandDailyBonusPacketRes = CommandDailyBonusPacketRes;
exports.CommandDailyBonusPacketRes = CommandDailyBonusPacketRes = __decorate([
    (0, DraftBotPacket_js_1.sendablePacket)(DraftBotPacket_js_1.PacketDirection.BACK_TO_FRONT)
], CommandDailyBonusPacketRes);
//# sourceMappingURL=CommandDailyBonusPacket.js.map