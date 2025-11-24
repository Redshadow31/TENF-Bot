"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorShopSmallEvent = exports.ReactionCollectorShopSmallEventData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
const ReactionCollectorAnyShopSmallEvent_1 = require("./ReactionCollectorAnyShopSmallEvent");
class ReactionCollectorShopSmallEventData extends ReactionCollectorAnyShopSmallEvent_1.ReactionCollectorAnyShopSmallEventData {
}
exports.ReactionCollectorShopSmallEventData = ReactionCollectorShopSmallEventData;
class ReactionCollectorShopSmallEvent extends ReactionCollectorPacket_1.ReactionCollector {
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
            data: this.buildData(ReactionCollectorShopSmallEventData, this.data)
        };
    }
}
exports.ReactionCollectorShopSmallEvent = ReactionCollectorShopSmallEvent;
//# sourceMappingURL=ReactionCollectorShopSmallEvent.js.map