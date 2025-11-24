"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorBigEvent = exports.ReactionCollectorBigEventData = exports.ReactionCollectorBigEventPossibilityReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorBigEventPossibilityReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorBigEventPossibilityReaction = ReactionCollectorBigEventPossibilityReaction;
class ReactionCollectorBigEventData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorBigEventData = ReactionCollectorBigEventData;
class ReactionCollectorBigEvent extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(eventId, reactions) {
        super();
        this.eventId = eventId;
        this.reactions = reactions;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const reaction of this.reactions) {
            reactions.push(this.buildReaction(ReactionCollectorBigEventPossibilityReaction, reaction));
        }
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorBigEventData, { eventId: this.eventId })
        };
    }
}
exports.ReactionCollectorBigEvent = ReactionCollectorBigEvent;
//# sourceMappingURL=ReactionCollectorBigEvent.js.map