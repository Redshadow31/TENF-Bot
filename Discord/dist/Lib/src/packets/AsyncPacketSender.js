"use strict";
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
exports.AsyncPacketSender = void 0;
class AsyncPacketSender {
    constructor() {
        this.waitingPackets = new Map();
    }
    sendPacketAndHandleResponse(context, packet, callback) {
        context.packetId = crypto.randomUUID();
        this.waitingPackets.set(context.packetId, callback);
        return this.sendPacket(context, packet);
    }
    handleResponse(context, packetName, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (context.packetId) {
                const callback = this.waitingPackets.get(context.packetId);
                if (callback) {
                    this.waitingPackets.delete(context.packetId);
                    yield callback(context, packetName, packet);
                    return true;
                }
            }
            return false;
        });
    }
}
exports.AsyncPacketSender = AsyncPacketSender;
//# sourceMappingURL=AsyncPacketSender.js.map