"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildLeave = exports.ReactionCollectorGuildLeaveData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildLeaveData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildLeaveData = ReactionCollectorGuildLeaveData;
class ReactionCollectorGuildLeave extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(guildName, isGuildDestroyed, newChiefKeycloakId) {
        super();
        this.guildName = guildName;
        this.newChiefKeycloakId = newChiefKeycloakId;
        this.isGuildDestroyed = isGuildDestroyed;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildLeaveData, {
                guildName: this.guildName,
                newChiefKeycloakId: this.newChiefKeycloakId,
                isGuildDestroyed: this.isGuildDestroyed
            })
        };
    }
}
exports.ReactionCollectorGuildLeave = ReactionCollectorGuildLeave;
//# sourceMappingURL=ReactionCollectorGuildLeave.js.map