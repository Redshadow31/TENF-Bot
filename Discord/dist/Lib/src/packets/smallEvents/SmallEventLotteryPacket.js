"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventLotteryLosePacket = exports.SmallEventLotteryWinPacket = exports.SmallEventLotteryPoorPacket = exports.SmallEventLotteryNoAnswerPacket = void 0;
const SmallEventPacket_1 = require("./SmallEventPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
let SmallEventLotteryNoAnswerPacket = class SmallEventLotteryNoAnswerPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventLotteryNoAnswerPacket = SmallEventLotteryNoAnswerPacket;
exports.SmallEventLotteryNoAnswerPacket = SmallEventLotteryNoAnswerPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventLotteryNoAnswerPacket);
let SmallEventLotteryPoorPacket = class SmallEventLotteryPoorPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventLotteryPoorPacket = SmallEventLotteryPoorPacket;
exports.SmallEventLotteryPoorPacket = SmallEventLotteryPoorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventLotteryPoorPacket);
let SmallEventLotteryWinPacket = class SmallEventLotteryWinPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventLotteryWinPacket = SmallEventLotteryWinPacket;
exports.SmallEventLotteryWinPacket = SmallEventLotteryWinPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventLotteryWinPacket);
let SmallEventLotteryLosePacket = class SmallEventLotteryLosePacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventLotteryLosePacket = SmallEventLotteryLosePacket;
exports.SmallEventLotteryLosePacket = SmallEventLotteryLosePacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventLotteryLosePacket);
//# sourceMappingURL=SmallEventLotteryPacket.js.map