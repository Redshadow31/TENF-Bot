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
exports.PacketListenerClient = exports.PacketListenerServer = void 0;
const DraftBotLogger_1 = require("../logs/DraftBotLogger");
class PacketListenerServer {
    constructor() {
        this.packetCallbacks = new Map();
    }
    addPacketListener(PacketInstance, callback) {
        const instance = new PacketInstance();
        this.packetCallbacks.set(instance.constructor.name, (response, context, packet) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield callback(response, context, packet);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj(`${PacketListenerServer.name} : Error while handling packet ${instance.constructor.name}`, e);
                throw e;
            }
        }));
    }
    getListener(packet) {
        return this.packetCallbacks.get(packet);
    }
}
exports.PacketListenerServer = PacketListenerServer;
class PacketListenerClient {
    constructor() {
        this.packetCallbacks = new Map();
    }
    addPacketListener(PacketInstance, callback) {
        const instance = new PacketInstance();
        this.packetCallbacks.set(instance.constructor.name, (context, packet) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield callback(context, packet);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj(`${PacketListenerClient.name} : Error while handling packet ${instance.constructor.name}`, e);
                throw e;
            }
        }));
    }
    getListener(packet) {
        return this.packetCallbacks.get(packet);
    }
}
exports.PacketListenerClient = PacketListenerClient;
//# sourceMappingURL=PacketListener.js.map