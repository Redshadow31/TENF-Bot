"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetSellNoOneAvailableErrorPacket = exports.CommandPetSellSuccessPacket = exports.CommandPetSellInitiatorSituationChangedErrorPacket = exports.CommandPetSellNotEnoughMoneyError = exports.CommandPetSellAlreadyHavePetError = exports.CommandPetSellSameGuildError = exports.CommandPetSellCantSellToYourselfErrorPacket = exports.CommandPetSellCancelPacket = exports.CommandPetSellOnlyOwnerCanCancelErrorPacket = exports.CommandPetSellBadPriceErrorPacket = exports.CommandPetSellFeistyErrorPacket = exports.CommandPetSellNotInGuildErrorPacket = exports.CommandPetSellNoPetErrorPacket = exports.CommandPetSellPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandPetSellPacketReq = class CommandPetSellPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellPacketReq = CommandPetSellPacketReq;
exports.CommandPetSellPacketReq = CommandPetSellPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetSellPacketReq);
let CommandPetSellNoPetErrorPacket = class CommandPetSellNoPetErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellNoPetErrorPacket = CommandPetSellNoPetErrorPacket;
exports.CommandPetSellNoPetErrorPacket = CommandPetSellNoPetErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellNoPetErrorPacket);
let CommandPetSellNotInGuildErrorPacket = class CommandPetSellNotInGuildErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellNotInGuildErrorPacket = CommandPetSellNotInGuildErrorPacket;
exports.CommandPetSellNotInGuildErrorPacket = CommandPetSellNotInGuildErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellNotInGuildErrorPacket);
let CommandPetSellFeistyErrorPacket = class CommandPetSellFeistyErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellFeistyErrorPacket = CommandPetSellFeistyErrorPacket;
exports.CommandPetSellFeistyErrorPacket = CommandPetSellFeistyErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellFeistyErrorPacket);
let CommandPetSellBadPriceErrorPacket = class CommandPetSellBadPriceErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellBadPriceErrorPacket = CommandPetSellBadPriceErrorPacket;
exports.CommandPetSellBadPriceErrorPacket = CommandPetSellBadPriceErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellBadPriceErrorPacket);
let CommandPetSellOnlyOwnerCanCancelErrorPacket = class CommandPetSellOnlyOwnerCanCancelErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellOnlyOwnerCanCancelErrorPacket = CommandPetSellOnlyOwnerCanCancelErrorPacket;
exports.CommandPetSellOnlyOwnerCanCancelErrorPacket = CommandPetSellOnlyOwnerCanCancelErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellOnlyOwnerCanCancelErrorPacket);
let CommandPetSellCancelPacket = class CommandPetSellCancelPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellCancelPacket = CommandPetSellCancelPacket;
exports.CommandPetSellCancelPacket = CommandPetSellCancelPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellCancelPacket);
let CommandPetSellCantSellToYourselfErrorPacket = class CommandPetSellCantSellToYourselfErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellCantSellToYourselfErrorPacket = CommandPetSellCantSellToYourselfErrorPacket;
exports.CommandPetSellCantSellToYourselfErrorPacket = CommandPetSellCantSellToYourselfErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellCantSellToYourselfErrorPacket);
let CommandPetSellSameGuildError = class CommandPetSellSameGuildError extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellSameGuildError = CommandPetSellSameGuildError;
exports.CommandPetSellSameGuildError = CommandPetSellSameGuildError = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellSameGuildError);
let CommandPetSellAlreadyHavePetError = class CommandPetSellAlreadyHavePetError extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellAlreadyHavePetError = CommandPetSellAlreadyHavePetError;
exports.CommandPetSellAlreadyHavePetError = CommandPetSellAlreadyHavePetError = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellAlreadyHavePetError);
let CommandPetSellNotEnoughMoneyError = class CommandPetSellNotEnoughMoneyError extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellNotEnoughMoneyError = CommandPetSellNotEnoughMoneyError;
exports.CommandPetSellNotEnoughMoneyError = CommandPetSellNotEnoughMoneyError = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellNotEnoughMoneyError);
let CommandPetSellInitiatorSituationChangedErrorPacket = class CommandPetSellInitiatorSituationChangedErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellInitiatorSituationChangedErrorPacket = CommandPetSellInitiatorSituationChangedErrorPacket;
exports.CommandPetSellInitiatorSituationChangedErrorPacket = CommandPetSellInitiatorSituationChangedErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellInitiatorSituationChangedErrorPacket);
let CommandPetSellSuccessPacket = class CommandPetSellSuccessPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellSuccessPacket = CommandPetSellSuccessPacket;
exports.CommandPetSellSuccessPacket = CommandPetSellSuccessPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellSuccessPacket);
let CommandPetSellNoOneAvailableErrorPacket = class CommandPetSellNoOneAvailableErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetSellNoOneAvailableErrorPacket = CommandPetSellNoOneAvailableErrorPacket;
exports.CommandPetSellNoOneAvailableErrorPacket = CommandPetSellNoOneAvailableErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetSellNoOneAvailableErrorPacket);
//# sourceMappingURL=CommandPetSellPacket.js.map