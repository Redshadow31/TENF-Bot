"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorEpicShopSmallEvent = exports.ReactionCollectorEpicShopSmallEventData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
const ReactionCollectorAnyShopSmallEvent_1 = require("./ReactionCollectorAnyShopSmallEvent");
class ReactionCollectorEpicShopSmallEventData extends ReactionCollectorAnyShopSmallEvent_1.ReactionCollectorAnyShopSmallEventData {
}
exports.ReactionCollectorEpicShopSmallEventData = ReactionCollectorEpicShopSmallEventData;
class ReactionCollectorEpicShopSmallEvent extends ReactionCollectorPacket_1.ReactionCollector {
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
            data: this.buildData(ReactionCollectorEpicShopSmallEventData, this.data)
        };
    }
}
exports.ReactionCollectorEpicShopSmallEvent = ReactionCollectorEpicShopSmallEvent;
//# sourceMappingURL=ReactionCollectorEpicShopSmallEvent.js.map