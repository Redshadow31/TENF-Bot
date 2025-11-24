"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandClassesChangeSuccessPacket = exports.CommandClassesCancelErrorPacket = exports.CommandClassesCooldownErrorPacket = exports.CommandClassesPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandClassesPacketReq = class CommandClassesPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandClassesPacketReq = CommandClassesPacketReq;
exports.CommandClassesPacketReq = CommandClassesPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandClassesPacketReq);
let CommandClassesCooldownErrorPacket = class CommandClassesCooldownErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandClassesCooldownErrorPacket = CommandClassesCooldownErrorPacket;
exports.CommandClassesCooldownErrorPacket = CommandClassesCooldownErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandClassesCooldownErrorPacket);
let CommandClassesCancelErrorPacket = class CommandClassesCancelErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandClassesCancelErrorPacket = CommandClassesCancelErrorPacket;
exports.CommandClassesCancelErrorPacket = CommandClassesCancelErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandClassesCancelErrorPacket);
let CommandClassesChangeSuccessPacket = class CommandClassesChangeSuccessPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandClassesChangeSuccessPacket = CommandClassesChangeSuccessPacket;
exports.CommandClassesChangeSuccessPacket = CommandClassesChangeSuccessPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandClassesChangeSuccessPacket);
//# sourceMappingURL=CommandClassesPacket.js.map