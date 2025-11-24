"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerLeavePveIslandPacket = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let PlayerLeavePveIslandPacket = class PlayerLeavePveIslandPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.PlayerLeavePveIslandPacket = PlayerLeavePveIslandPacket;
exports.PlayerLeavePveIslandPacket = PlayerLeavePveIslandPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], PlayerLeavePveIslandPacket);
//# sourceMappingURL=PlayerLeavePveIslandPacket.js.map