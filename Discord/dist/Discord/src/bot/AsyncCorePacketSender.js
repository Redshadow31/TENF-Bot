"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncCorePacketSender = void 0;
const AsyncPacketSender_1 = require("../../../Lib/src/packets/AsyncPacketSender");
const PacketUtils_1 = require("../utils/PacketUtils");
class AsyncCorePacketSender extends AsyncPacketSender_1.AsyncPacketSender {
    sendPacket(context, packet) {
        PacketUtils_1.PacketUtils.sendPacketToBackend(context, packet);
        return Promise.resolve();
    }
}
exports.AsyncCorePacketSender = AsyncCorePacketSender;
//# sourceMappingURL=AsyncCorePacketSender.js.map