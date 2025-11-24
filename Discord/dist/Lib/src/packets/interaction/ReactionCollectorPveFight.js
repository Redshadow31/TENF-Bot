"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPveFight = exports.ReactionCollectorPveFightData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPveFightData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorPveFightData = ReactionCollectorPveFightData;
class ReactionCollectorPveFight extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(data) {
        super();
        this.data = data;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorPveFightData, this.data)
        };
    }
}
exports.ReactionCollectorPveFight = ReactionCollectorPveFight;
//# sourceMappingURL=ReactionCollectorPveFight.js.map