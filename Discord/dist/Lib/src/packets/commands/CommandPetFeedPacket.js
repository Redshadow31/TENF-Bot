"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandPetFeedSuccessPacket = exports.CommandPetFeedCancelErrorPacket = exports.CommandPetFeedGuildStorageEmptyErrorPacket = exports.CommandPetFeedNoMoneyFeedErrorPacket = exports.CommandPetFeedNotHungryErrorPacket = exports.CommandPetFeedNoPetErrorPacket = exports.CommandPetFeedPacketReq = exports.CommandPetFeedResult = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
var CommandPetFeedResult;
(function (CommandPetFeedResult) {
    CommandPetFeedResult["HAPPY"] = "happy";
    CommandPetFeedResult["VERY_HAPPY"] = "veryHappy";
    CommandPetFeedResult["VERY_VERY_HAPPY"] = "veryVeryHappy";
    CommandPetFeedResult["DISLIKE"] = "dislike";
})(CommandPetFeedResult || (exports.CommandPetFeedResult = CommandPetFeedResult = {}));
let CommandPetFeedPacketReq = class CommandPetFeedPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedPacketReq = CommandPetFeedPacketReq;
exports.CommandPetFeedPacketReq = CommandPetFeedPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandPetFeedPacketReq);
let CommandPetFeedNoPetErrorPacket = class CommandPetFeedNoPetErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedNoPetErrorPacket = CommandPetFeedNoPetErrorPacket;
exports.CommandPetFeedNoPetErrorPacket = CommandPetFeedNoPetErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedNoPetErrorPacket);
let CommandPetFeedNotHungryErrorPacket = class CommandPetFeedNotHungryErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedNotHungryErrorPacket = CommandPetFeedNotHungryErrorPacket;
exports.CommandPetFeedNotHungryErrorPacket = CommandPetFeedNotHungryErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedNotHungryErrorPacket);
let CommandPetFeedNoMoneyFeedErrorPacket = class CommandPetFeedNoMoneyFeedErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedNoMoneyFeedErrorPacket = CommandPetFeedNoMoneyFeedErrorPacket;
exports.CommandPetFeedNoMoneyFeedErrorPacket = CommandPetFeedNoMoneyFeedErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedNoMoneyFeedErrorPacket);
let CommandPetFeedGuildStorageEmptyErrorPacket = class CommandPetFeedGuildStorageEmptyErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedGuildStorageEmptyErrorPacket = CommandPetFeedGuildStorageEmptyErrorPacket;
exports.CommandPetFeedGuildStorageEmptyErrorPacket = CommandPetFeedGuildStorageEmptyErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedGuildStorageEmptyErrorPacket);
let CommandPetFeedCancelErrorPacket = class CommandPetFeedCancelErrorPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedCancelErrorPacket = CommandPetFeedCancelErrorPacket;
exports.CommandPetFeedCancelErrorPacket = CommandPetFeedCancelErrorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedCancelErrorPacket);
let CommandPetFeedSuccessPacket = class CommandPetFeedSuccessPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandPetFeedSuccessPacket = CommandPetFeedSuccessPacket;
exports.CommandPetFeedSuccessPacket = CommandPetFeedSuccessPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandPetFeedSuccessPacket);
//# sourceMappingURL=CommandPetFeedPacket.js.map