"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventSpaceResultPacket = exports.SmallEventSpaceInitialPacket = void 0;
const SmallEventPacket_1 = require("./SmallEventPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
let SmallEventSpaceInitialPacket = class SmallEventSpaceInitialPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventSpaceInitialPacket = SmallEventSpaceInitialPacket;
exports.SmallEventSpaceInitialPacket = SmallEventSpaceInitialPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventSpaceInitialPacket);
let SmallEventSpaceResultPacket = class SmallEventSpaceResultPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventSpaceResultPacket = SmallEventSpaceResultPacket;
exports.SmallEventSpaceResultPacket = SmallEventSpaceResultPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventSpaceResultPacket);
//# sourceMappingURL=SmallEventSpacePacket.js.map