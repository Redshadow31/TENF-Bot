"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorSkipMissionShopItem = exports.ReactionCollectorSkipMissionShopItemCloseReaction = exports.ReactionCollectorSkipMissionShopItemReaction = exports.ReactionCollectorSkipMissionShopItemData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorSkipMissionShopItemData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorSkipMissionShopItemData = ReactionCollectorSkipMissionShopItemData;
class ReactionCollectorSkipMissionShopItemReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorSkipMissionShopItemReaction = ReactionCollectorSkipMissionShopItemReaction;
class ReactionCollectorSkipMissionShopItemCloseReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorSkipMissionShopItemCloseReaction = ReactionCollectorSkipMissionShopItemCloseReaction;
class ReactionCollectorSkipMissionShopItem extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(missionList) {
        super();
        this.missionList = missionList;
    }
    creationPacket(id, endTime) {
        const reactions = this.missionList.map((mission, missionIndex) => this.buildReaction(ReactionCollectorSkipMissionShopItemReaction, {
            mission,
            missionIndex
        }));
        reactions.push(this.buildReaction(ReactionCollectorSkipMissionShopItemCloseReaction, {}));
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorSkipMissionShopItemData, {})
        };
    }
}
exports.ReactionCollectorSkipMissionShopItem = ReactionCollectorSkipMissionShopItem;
//# sourceMappingURL=ReactionCollectorSkipMissionShopItem.js.map