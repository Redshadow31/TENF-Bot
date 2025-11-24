"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandReportBigEventResultRes = exports.CommandReportChooseDestinationRes = exports.CommandReportRefusePveFightRes = exports.CommandReportErrorNoMonsterRes = exports.CommandReportMonsterRewardRes = exports.CommandReportTravelSummaryRes = exports.CommandReportPacketReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandReportPacketReq = class CommandReportPacketReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportPacketReq = CommandReportPacketReq;
exports.CommandReportPacketReq = CommandReportPacketReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandReportPacketReq);
let CommandReportTravelSummaryRes = class CommandReportTravelSummaryRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportTravelSummaryRes = CommandReportTravelSummaryRes;
exports.CommandReportTravelSummaryRes = CommandReportTravelSummaryRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportTravelSummaryRes);
let CommandReportMonsterRewardRes = class CommandReportMonsterRewardRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportMonsterRewardRes = CommandReportMonsterRewardRes;
exports.CommandReportMonsterRewardRes = CommandReportMonsterRewardRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportMonsterRewardRes);
let CommandReportErrorNoMonsterRes = class CommandReportErrorNoMonsterRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportErrorNoMonsterRes = CommandReportErrorNoMonsterRes;
exports.CommandReportErrorNoMonsterRes = CommandReportErrorNoMonsterRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportErrorNoMonsterRes);
let CommandReportRefusePveFightRes = class CommandReportRefusePveFightRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportRefusePveFightRes = CommandReportRefusePveFightRes;
exports.CommandReportRefusePveFightRes = CommandReportRefusePveFightRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportRefusePveFightRes);
let CommandReportChooseDestinationRes = class CommandReportChooseDestinationRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportChooseDestinationRes = CommandReportChooseDestinationRes;
exports.CommandReportChooseDestinationRes = CommandReportChooseDestinationRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportChooseDestinationRes);
let CommandReportBigEventResultRes = class CommandReportBigEventResultRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandReportBigEventResultRes = CommandReportBigEventResultRes;
exports.CommandReportBigEventResultRes = CommandReportBigEventResultRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandReportBigEventResultRes);
//# sourceMappingURL=CommandReportPacket.js.map