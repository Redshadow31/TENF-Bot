"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildKick = exports.ReactionCollectorGuildKickData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildKickData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildKickData = ReactionCollectorGuildKickData;
class ReactionCollectorGuildKick extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(guildName, kickedKeycloakId) {
        super();
        this.guildName = guildName;
        this.kickedKeycloakId = kickedKeycloakId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildKickData, {
                guildName: this.guildName,
                kickedKeycloakId: this.kickedKeycloakId
            })
        };
    }
}
exports.ReactionCollectorGuildKick = ReactionCollectorGuildKick;
//# sourceMappingURL=ReactionCollectorGuildKick.js.map