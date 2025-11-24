"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildElder = exports.ReactionCollectorGuildElderData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildElderData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildElderData = ReactionCollectorGuildElderData;
class ReactionCollectorGuildElder extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(guildName, promotedKeycloakId) {
        super();
        this.guildName = guildName;
        this.promotedKeycloakId = promotedKeycloakId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildElderData, {
                guildName: this.guildName,
                promotedKeycloakId: this.promotedKeycloakId
            })
        };
    }
}
exports.ReactionCollectorGuildElder = ReactionCollectorGuildElder;
//# sourceMappingURL=ReactionCollectorGuildElder.js.map