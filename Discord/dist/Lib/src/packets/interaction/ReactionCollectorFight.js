"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorFight = exports.ReactionCollectorFightData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorFightData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorFightData = ReactionCollectorFightData;
class ReactionCollectorFight extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(playerStats) {
        super();
        this.playerStats = playerStats;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorFightData, { playerStats: this.playerStats })
        };
    }
}
exports.ReactionCollectorFight = ReactionCollectorFight;
//# sourceMappingURL=ReactionCollectorFight.js.map