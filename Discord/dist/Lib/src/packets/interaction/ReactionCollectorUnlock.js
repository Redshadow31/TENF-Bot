"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorUnlock = exports.ReactionCollectorUnlockData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorUnlockData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorUnlockData = ReactionCollectorUnlockData;
class ReactionCollectorUnlock extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(unlockedKeycloakId) {
        super();
        this.unlockedKeycloakId = unlockedKeycloakId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorUnlockData, {
                unlockedKeycloakId: this.unlockedKeycloakId
            })
        };
    }
}
exports.ReactionCollectorUnlock = ReactionCollectorUnlock;
//# sourceMappingURL=ReactionCollectorUnlock.js.map