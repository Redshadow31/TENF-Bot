"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorSell = exports.ReactionCollectorSellItemReaction = exports.ReactionCollectorSellData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorSellData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorSellData = ReactionCollectorSellData;
class ReactionCollectorSellItemReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorSellItemReaction = ReactionCollectorSellItemReaction;
class ReactionCollectorSell extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(sellItems) {
        super();
        this.sellItems = sellItems;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                ...this.sellItems.map(sellItem => this.buildReaction(ReactionCollectorSellItemReaction, Object.assign({}, sellItem))),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorSellData, {})
        };
    }
}
exports.ReactionCollectorSell = ReactionCollectorSell;
//# sourceMappingURL=ReactionCollectorSell.js.map