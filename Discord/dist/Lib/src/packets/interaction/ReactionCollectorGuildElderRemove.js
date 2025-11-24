"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildElderRemove = exports.ReactionCollectorGuildElderRemoveData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildElderRemoveData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildElderRemoveData = ReactionCollectorGuildElderRemoveData;
class ReactionCollectorGuildElderRemove extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(guildName, demotedKeycloakId) {
        super();
        this.guildName = guildName;
        this.demotedKeycloakId = demotedKeycloakId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildElderRemoveData, {
                guildName: this.guildName,
                demotedKeycloakId: this.demotedKeycloakId
            })
        };
    }
}
exports.ReactionCollectorGuildElderRemove = ReactionCollectorGuildElderRemove;
//# sourceMappingURL=ReactionCollectorGuildElderRemove.js.map