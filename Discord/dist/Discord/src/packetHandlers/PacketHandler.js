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
exports.packetHandler = void 0;
exports.registerAllPacketHandlers = registerAllPacketHandlers;
const fs_1 = require("fs");
const DiscordMQTT_1 = require("../bot/DiscordMQTT");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const packetHandler = (val) => (target, prop, descriptor) => {
    DiscordMQTT_1.DiscordMQTT.packetListener.addPacketListener(val, descriptor.value);
    DraftBotLogger_1.DraftBotLogger.info(`[${val.name}] Registered packet handler (function '${prop}' in class '${target.constructor.name}')`);
};
exports.packetHandler = packetHandler;
function registerAllPacketHandlers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const file of (0, fs_1.readdirSync)("dist/Discord/src/packetHandlers/handlers", {
            recursive: true
        })) {
            if (file.toString().endsWith(".js")) {
                yield Promise.resolve(`${`./handlers/${file.toString().substring(0, file.length - 3)}`}`).then(s => require(s));
            }
        }
    });
}
//# sourceMappingURL=PacketHandler.js.map