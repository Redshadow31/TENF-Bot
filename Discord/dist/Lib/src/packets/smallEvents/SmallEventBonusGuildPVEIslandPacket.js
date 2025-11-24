"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventBonusGuildPVEIslandResultType = exports.SmallEventBonusGuildPVEIslandOutcomeSurrounding = exports.SmallEventBonusGuildPVEIslandPacket = void 0;
const SmallEventPacket_1 = require("./SmallEventPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
let SmallEventBonusGuildPVEIslandPacket = class SmallEventBonusGuildPVEIslandPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventBonusGuildPVEIslandPacket = SmallEventBonusGuildPVEIslandPacket;
exports.SmallEventBonusGuildPVEIslandPacket = SmallEventBonusGuildPVEIslandPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventBonusGuildPVEIslandPacket);
var SmallEventBonusGuildPVEIslandOutcomeSurrounding;
(function (SmallEventBonusGuildPVEIslandOutcomeSurrounding) {
    SmallEventBonusGuildPVEIslandOutcomeSurrounding["WITH_GUILD"] = "withGuild";
    SmallEventBonusGuildPVEIslandOutcomeSurrounding["SOLO_WITH_GUILD"] = "soloWithGuild";
    SmallEventBonusGuildPVEIslandOutcomeSurrounding["SOLO"] = "solo";
})(SmallEventBonusGuildPVEIslandOutcomeSurrounding || (exports.SmallEventBonusGuildPVEIslandOutcomeSurrounding = SmallEventBonusGuildPVEIslandOutcomeSurrounding = {}));
var SmallEventBonusGuildPVEIslandResultType;
(function (SmallEventBonusGuildPVEIslandResultType) {
    SmallEventBonusGuildPVEIslandResultType["SUCCESS"] = "success";
    SmallEventBonusGuildPVEIslandResultType["ESCAPE"] = "escape";
    SmallEventBonusGuildPVEIslandResultType["LOSE"] = "lose";
})(SmallEventBonusGuildPVEIslandResultType || (exports.SmallEventBonusGuildPVEIslandResultType = SmallEventBonusGuildPVEIslandResultType = {}));
//# sourceMappingURL=SmallEventBonusGuildPVEIslandPacket.js.map