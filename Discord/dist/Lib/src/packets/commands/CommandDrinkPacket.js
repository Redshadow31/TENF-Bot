"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandDrinkConsumePotionRes = exports.CommandDrinkCancelDrink = exports.CommandDrinkObjectIsActiveDuringFights = exports.CommandDrinkNoActiveObjectError = exports.CommandDrinkPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandDrinkPacketReq = class CommandDrinkPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandDrinkPacketReq = CommandDrinkPacketReq;
exports.CommandDrinkPacketReq = CommandDrinkPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandDrinkPacketReq);
let CommandDrinkNoActiveObjectError = class CommandDrinkNoActiveObjectError extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandDrinkNoActiveObjectError = CommandDrinkNoActiveObjectError;
exports.CommandDrinkNoActiveObjectError = CommandDrinkNoActiveObjectError = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandDrinkNoActiveObjectError);
let CommandDrinkObjectIsActiveDuringFights = class CommandDrinkObjectIsActiveDuringFights extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandDrinkObjectIsActiveDuringFights = CommandDrinkObjectIsActiveDuringFights;
exports.CommandDrinkObjectIsActiveDuringFights = CommandDrinkObjectIsActiveDuringFights = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandDrinkObjectIsActiveDuringFights);
let CommandDrinkCancelDrink = class CommandDrinkCancelDrink extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandDrinkCancelDrink = CommandDrinkCancelDrink;
exports.CommandDrinkCancelDrink = CommandDrinkCancelDrink = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandDrinkCancelDrink);
let CommandDrinkConsumePotionRes = class CommandDrinkConsumePotionRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandDrinkConsumePotionRes = CommandDrinkConsumePotionRes;
exports.CommandDrinkConsumePotionRes = CommandDrinkConsumePotionRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandDrinkConsumePotionRes);
//# sourceMappingURL=CommandDrinkPacket.js.map