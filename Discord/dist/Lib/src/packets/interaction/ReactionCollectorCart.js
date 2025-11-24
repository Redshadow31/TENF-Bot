"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorCart = exports.ReactionCollectorCartData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorCartData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorCartData = ReactionCollectorCartData;
class ReactionCollectorCart extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(displayedDestination, price) {
        super();
        this.displayedDestination = displayedDestination;
        this.price = price;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorCartData, {
                displayedDestination: this.displayedDestination,
                price: this.price
            })
        };
    }
}
exports.ReactionCollectorCart = ReactionCollectorCart;
//# sourceMappingURL=ReactionCollectorCart.js.map