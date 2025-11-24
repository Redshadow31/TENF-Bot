"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetFreeAcceptPacketRes = exports.CommandPetFreeRefusePacketRes = exports.CommandPetFreePacketRes = exports.CommandPetFreePacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandPetFreePacketReq = class CommandPetFreePacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFreePacketReq = CommandPetFreePacketReq;
exports.CommandPetFreePacketReq = CommandPetFreePacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetFreePacketReq);
let CommandPetFreePacketRes = class CommandPetFreePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFreePacketRes = CommandPetFreePacketRes;
exports.CommandPetFreePacketRes = CommandPetFreePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFreePacketRes);
let CommandPetFreeRefusePacketRes = class CommandPetFreeRefusePacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFreeRefusePacketRes = CommandPetFreeRefusePacketRes;
exports.CommandPetFreeRefusePacketRes = CommandPetFreeRefusePacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFreeRefusePacketRes);
let CommandPetFreeAcceptPacketRes = class CommandPetFreeAcceptPacketRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFreeAcceptPacketRes = CommandPetFreeAcceptPacketRes;
exports.CommandPetFreeAcceptPacketRes = CommandPetFreeAcceptPacketRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFreeAcceptPacketRes);
//# sourceMappingURL=CommandPetFreePacket.js.map