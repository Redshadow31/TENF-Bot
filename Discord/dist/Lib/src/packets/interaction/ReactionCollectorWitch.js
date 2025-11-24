"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorWitch = exports.ReactionCollectorWitchData = exports.ReactionCollectorWitchReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorWitchReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorWitchReaction = ReactionCollectorWitchReaction;
class ReactionCollectorWitchData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorWitchData = ReactionCollectorWitchData;
class ReactionCollectorWitch extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(ingredients) {
        super();
        this.ingredients = ingredients;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const ingredient of this.ingredients) {
            reactions.push(this.buildReaction(ReactionCollectorWitchReaction, ingredient));
        }
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorWitchData, {})
        };
    }
}
exports.ReactionCollectorWitch = ReactionCollectorWitch;
//# sourceMappingURL=ReactionCollectorWitch.js.map