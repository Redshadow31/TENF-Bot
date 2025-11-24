"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildDescription = exports.ReactionCollectorGuildDescriptionData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildDescriptionData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildDescriptionData = ReactionCollectorGuildDescriptionData;
class ReactionCollectorGuildDescription extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(description) {
        super();
        this.description = description;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildDescriptionData, {
                description: this.description
            })
        };
    }
}
exports.ReactionCollectorGuildDescription = ReactionCollectorGuildDescription;
//# sourceMappingURL=ReactionCollectorGuildDescription.js.map