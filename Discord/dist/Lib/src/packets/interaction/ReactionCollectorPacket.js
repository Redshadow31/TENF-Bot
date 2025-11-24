"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ReactionCollector = exports.ReactionCollectorCreationPacket = exports.ReactionCollectorRefuseReaction = exports.ReactionCollectorAcceptReaction = exports.ReactionCollectorData = exports.ReactionCollectorReaction = exports.ReactionCollectorEnded = exports.ReactionCollectorReactPacket = void 0;
const DraftBotPacket_1 = require("../DraftBotPacket");
let ReactionCollectorReactPacket = class ReactionCollectorReactPacket extends DraftBotPacket_1.DraftBotPacket {
};
exports.ReactionCollectorReactPacket = ReactionCollectorReactPacket;
exports.ReactionCollectorReactPacket = ReactionCollectorReactPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.FRONT_TO_BACK)
], ReactionCollectorReactPacket);
let ReactionCollectorEnded = class ReactionCollectorEnded extends DraftBotPacket_1.DraftBotPacket {
};
exports.ReactionCollectorEnded = ReactionCollectorEnded;
exports.ReactionCollectorEnded = ReactionCollectorEnded = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ReactionCollectorEnded);
class ReactionCollectorReaction {
}
exports.ReactionCollectorReaction = ReactionCollectorReaction;
class ReactionCollectorData {
}
exports.ReactionCollectorData = ReactionCollectorData;
class ReactionCollectorAcceptReaction extends ReactionCollectorReaction {
}
exports.ReactionCollectorAcceptReaction = ReactionCollectorAcceptReaction;
class ReactionCollectorRefuseReaction extends ReactionCollectorReaction {
}
exports.ReactionCollectorRefuseReaction = ReactionCollectorRefuseReaction;
let ReactionCollectorCreationPacket = class ReactionCollectorCreationPacket extends DraftBotPacket_1.DraftBotPacket {
    constructor() {
        super(...arguments);
        this.mainPacket = true;
    }
};
exports.ReactionCollectorCreationPacket = ReactionCollectorCreationPacket;
exports.ReactionCollectorCreationPacket = ReactionCollectorCreationPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ReactionCollectorCreationPacket);
class ReactionCollector {
    buildData(Packet, _a) {
        var args = __rest(_a, []);
        const instance = new Packet();
        Object.assign(instance, args);
        return {
            type: instance.constructor.name,
            data: instance
        };
    }
    buildReaction(Packet, _a) {
        var args = __rest(_a, []);
        const instance = new Packet();
        Object.assign(instance, args);
        return {
            type: instance.constructor.name,
            data: instance
        };
    }
}
exports.ReactionCollector = ReactionCollector;
//# sourceMappingURL=ReactionCollectorPacket.js.map