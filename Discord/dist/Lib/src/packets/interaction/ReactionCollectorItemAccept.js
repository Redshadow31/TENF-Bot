"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorItemAccept = exports.ReactionCollectorItemAcceptData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorItemAcceptData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorItemAcceptData = ReactionCollectorItemAcceptData;
class ReactionCollectorItemAccept extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(itemWithDetails) {
        super();
        this.itemWithDetails = itemWithDetails;
    }
    creationPacket(id, endTime, mainPacket = true) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorItemAcceptData, {
                itemWithDetails: this.itemWithDetails
            }),
            mainPacket
        };
    }
}
exports.ReactionCollectorItemAccept = ReactionCollectorItemAccept;
//# sourceMappingURL=ReactionCollectorItemAccept.js.map