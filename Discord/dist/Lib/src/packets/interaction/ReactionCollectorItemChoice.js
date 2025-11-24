"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorItemChoice = exports.ReactionCollectorItemChoiceRefuseReaction = exports.ReactionCollectorItemChoiceItemReaction = exports.ReactionCollectorItemChoiceData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorItemChoiceData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorItemChoiceData = ReactionCollectorItemChoiceData;
class ReactionCollectorItemChoiceItemReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorItemChoiceItemReaction = ReactionCollectorItemChoiceItemReaction;
class ReactionCollectorItemChoiceRefuseReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorItemChoiceRefuseReaction = ReactionCollectorItemChoiceRefuseReaction;
class ReactionCollectorItemChoice extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(data, items) {
        super();
        this.data = data;
        this.items = items;
    }
    creationPacket(id, endTime, mainPacket = true) {
        const reactions = [];
        for (const item of this.items) {
            reactions.push(this.buildReaction(ReactionCollectorItemChoiceItemReaction, item));
        }
        reactions.push(this.buildReaction(ReactionCollectorItemChoiceRefuseReaction, {}));
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorItemChoiceData, this.data),
            mainPacket
        };
    }
}
exports.ReactionCollectorItemChoice = ReactionCollectorItemChoice;
//# sourceMappingURL=ReactionCollectorItemChoice.js.map