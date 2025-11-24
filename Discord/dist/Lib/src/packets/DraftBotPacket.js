"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftBotPacket = exports.PacketDirection = void 0;
exports.sendablePacket = sendablePacket;
exports.makePacket = makePacket;
exports.asyncMakePacket = asyncMakePacket;
require("../index");
const AllPackets = new Map();
var PacketDirection;
(function (PacketDirection) {
    PacketDirection[PacketDirection["NONE"] = 0] = "NONE";
    PacketDirection[PacketDirection["FRONT_TO_BACK"] = 1] = "FRONT_TO_BACK";
    PacketDirection[PacketDirection["BACK_TO_FRONT"] = 2] = "BACK_TO_FRONT";
})(PacketDirection || (exports.PacketDirection = PacketDirection = {}));
function sendablePacket(direction) {
    return function (constructor) {
        AllPackets.set(constructor.name, direction);
    };
}
class DraftBotPacket {
}
exports.DraftBotPacket = DraftBotPacket;
function makePacket(PacketObject, _a) {
    var args = __rest(_a, []);
    const instance = new PacketObject();
    Object.assign(instance, args);
    return instance;
}
function asyncMakePacket(PacketObject, _a) {
    var args = __rest(_a, []);
    const instance = new PacketObject();
    Object.assign(instance, args);
    return Promise.resolve(instance);
}
//# sourceMappingURL=DraftBotPacket.js.map