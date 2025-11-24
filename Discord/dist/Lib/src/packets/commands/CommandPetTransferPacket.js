"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetTransferSuccessPacket = exports.CommandPetTransferFeistyErrorPacket = exports.CommandPetTransferNoPetErrorPacket = exports.CommandPetTransferSituationChangedErrorPacket = exports.CommandPetTransferCancelErrorPacket = exports.CommandPetTransferAnotherMemberTransferringErrorPacket = exports.CommandPetTransferPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandPetTransferPacketReq = class CommandPetTransferPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferPacketReq = CommandPetTransferPacketReq;
exports.CommandPetTransferPacketReq = CommandPetTransferPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetTransferPacketReq);
let CommandPetTransferAnotherMemberTransferringErrorPacket = class CommandPetTransferAnotherMemberTransferringErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferAnotherMemberTransferringErrorPacket = CommandPetTransferAnotherMemberTransferringErrorPacket;
exports.CommandPetTransferAnotherMemberTransferringErrorPacket = CommandPetTransferAnotherMemberTransferringErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferAnotherMemberTransferringErrorPacket);
let CommandPetTransferCancelErrorPacket = class CommandPetTransferCancelErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferCancelErrorPacket = CommandPetTransferCancelErrorPacket;
exports.CommandPetTransferCancelErrorPacket = CommandPetTransferCancelErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferCancelErrorPacket);
let CommandPetTransferSituationChangedErrorPacket = class CommandPetTransferSituationChangedErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferSituationChangedErrorPacket = CommandPetTransferSituationChangedErrorPacket;
exports.CommandPetTransferSituationChangedErrorPacket = CommandPetTransferSituationChangedErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferSituationChangedErrorPacket);
let CommandPetTransferNoPetErrorPacket = class CommandPetTransferNoPetErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferNoPetErrorPacket = CommandPetTransferNoPetErrorPacket;
exports.CommandPetTransferNoPetErrorPacket = CommandPetTransferNoPetErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferNoPetErrorPacket);
let CommandPetTransferFeistyErrorPacket = class CommandPetTransferFeistyErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferFeistyErrorPacket = CommandPetTransferFeistyErrorPacket;
exports.CommandPetTransferFeistyErrorPacket = CommandPetTransferFeistyErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferFeistyErrorPacket);
let CommandPetTransferSuccessPacket = class CommandPetTransferSuccessPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetTransferSuccessPacket = CommandPetTransferSuccessPacket;
exports.CommandPetTransferSuccessPacket = CommandPetTransferSuccessPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetTransferSuccessPacket);
//# sourceMappingURL=CommandPetTransferPacket.js.map