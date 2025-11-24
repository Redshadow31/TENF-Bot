"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorDrink = exports.ReactionCollectorDrinkData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorDrinkData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorDrinkData = ReactionCollectorDrinkData;
class ReactionCollectorDrink extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(potion) {
        super();
        this.potion = potion;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorDrinkData, {
                potion: this.potion
            })
        };
    }
}
exports.ReactionCollectorDrink = ReactionCollectorDrink;
//# sourceMappingURL=ReactionCollectorDrink.js.map