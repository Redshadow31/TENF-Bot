"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorInteractOtherPlayersPoor = exports.ReactionCollectorInteractOtherPlayersPoorData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorInteractOtherPlayersPoorData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorInteractOtherPlayersPoorData = ReactionCollectorInteractOtherPlayersPoorData;
class ReactionCollectorInteractOtherPlayersPoor extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(keycloakId, rank) {
        super();
        this.keycloakId = keycloakId;
        this.rank = rank;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorInteractOtherPlayersPoorData, {
                keycloakId: this.keycloakId,
                rank: this.rank
            })
        };
    }
}
exports.ReactionCollectorInteractOtherPlayersPoor = ReactionCollectorInteractOtherPlayersPoor;
//# sourceMappingURL=ReactionCollectorInteractOtherPlayers.js.map