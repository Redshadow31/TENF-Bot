"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandGetResourcesRes = exports.CommandGetResourcesReq = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let CommandGetResourcesReq = class CommandGetResourcesReq extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGetResourcesReq = CommandGetResourcesReq;
exports.CommandGetResourcesReq = CommandGetResourcesReq = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], CommandGetResourcesReq);
let CommandGetResourcesRes = class CommandGetResourcesRes extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandGetResourcesRes = CommandGetResourcesRes;
exports.CommandGetResourcesRes = CommandGetResourcesRes = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.NONE)
], CommandGetResourcesRes);
//# sourceMappingURL=CommandGetResourcesPacket.js.map