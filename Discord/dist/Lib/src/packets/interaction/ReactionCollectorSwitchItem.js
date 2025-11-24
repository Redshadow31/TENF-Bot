"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorSwitchItem = exports.ReactionCollectorSwitchItemCloseReaction = exports.ReactionCollectorSwitchItemReaction = exports.ReactionCollectorSwitchItemData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorSwitchItemData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorSwitchItemData = ReactionCollectorSwitchItemData;
class ReactionCollectorSwitchItemReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorSwitchItemReaction = ReactionCollectorSwitchItemReaction;
class ReactionCollectorSwitchItemCloseReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorSwitchItemCloseReaction = ReactionCollectorSwitchItemCloseReaction;
class ReactionCollectorSwitchItem extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(itemList) {
        super();
        this.itemList = itemList;
    }
    creationPacket(id, endTime) {
        const reactions = this.itemList.map((item, itemIndex) => this.buildReaction(ReactionCollectorSwitchItemReaction, {
            itemIndex,
            item
        }));
        reactions.push(this.buildReaction(ReactionCollectorSwitchItemCloseReaction, {}));
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorSwitchItemData, {}),
            mainPacket: true
        };
    }
}
exports.ReactionCollectorSwitchItem = ReactionCollectorSwitchItem;
//# sourceMappingURL=ReactionCollectorSwitchItem.js.map