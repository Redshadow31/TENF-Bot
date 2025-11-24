"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorJoinBoat = exports.ReactionCollectorJoinBoatData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorJoinBoatData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorJoinBoatData = ReactionCollectorJoinBoatData;
class ReactionCollectorJoinBoat extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(price, currentEnergy, maxEnergy) {
        super();
        this.price = price;
        this.currentEnergy = currentEnergy;
        this.maxEnergy = maxEnergy;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorJoinBoatData, {
                price: this.price,
                energy: {
                    current: this.currentEnergy,
                    max: this.maxEnergy
                }
            })
        };
    }
}
exports.ReactionCollectorJoinBoat = ReactionCollectorJoinBoat;
//# sourceMappingURL=ReactionCollectorJoinBoat.js.map