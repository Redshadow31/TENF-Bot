"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const PacketHandler_1 = require("../../../PacketHandler");
const CommandReportPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandReportPacket");
const ReportCommand_1 = require("../../../../commands/player/ReportCommand");
const ErrorUtils_1 = require("../../../../utils/ErrorUtils");
class ReportCommandPacketHandlers {
    reportResultRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ReportCommand_1.reportResult)(packet, context);
        });
    }
    reportTravelSummaryRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ReportCommand_1.reportTravelSummary)(packet, context);
        });
    }
    reportMonsterRewardRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ReportCommand_1.displayMonsterReward)(packet, context);
        });
    }
    reportErrorNoMonsterRes(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ErrorUtils_1.handleClassicError)(context, "commands:fight.monsterNotFound");
        });
    }
    reportRefusePveFightRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ReportCommand_1.refusePveFight)(packet, context);
        });
    }
}
exports.default = ReportCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportBigEventResultRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportBigEventResultRes]),
    __metadata("design:returntype", Promise)
], ReportCommandPacketHandlers.prototype, "reportResultRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportTravelSummaryRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportTravelSummaryRes]),
    __metadata("design:returntype", Promise)
], ReportCommandPacketHandlers.prototype, "reportTravelSummaryRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportMonsterRewardRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportMonsterRewardRes]),
    __metadata("design:returntype", Promise)
], ReportCommandPacketHandlers.prototype, "reportMonsterRewardRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportErrorNoMonsterRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportErrorNoMonsterRes]),
    __metadata("design:returntype", Promise)
], ReportCommandPacketHandlers.prototype, "reportErrorNoMonsterRes", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandReportPacket_1.CommandReportRefusePveFightRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandReportPacket_1.CommandReportRefusePveFightRes]),
    __metadata("design:returntype", Promise)
], ReportCommandPacketHandlers.prototype, "reportRefusePveFightRes", null);
//# sourceMappingURL=ReportCommandPacketHandlers.js.map