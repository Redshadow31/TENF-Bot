"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorChooseDestination = exports.ReactionCollectorChooseDestinationData = exports.ReactionCollectorChooseDestinationReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorChooseDestinationReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorChooseDestinationReaction = ReactionCollectorChooseDestinationReaction;
class ReactionCollectorChooseDestinationData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorChooseDestinationData = ReactionCollectorChooseDestinationData;
class ReactionCollectorChooseDestination extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(maps) {
        super();
        this.maps = maps;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const map of this.maps) {
            reactions.push(this.buildReaction(ReactionCollectorChooseDestinationReaction, map));
        }
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorChooseDestinationData, {})
        };
    }
}
exports.ReactionCollectorChooseDestination = ReactionCollectorChooseDestination;
//# sourceMappingURL=ReactionCollectorChooseDestination.js.map