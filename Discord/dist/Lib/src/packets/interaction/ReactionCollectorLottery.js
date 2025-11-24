"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorLottery = exports.ReactionCollectorLotteryData = exports.ReactionCollectorLotteryHardReaction = exports.ReactionCollectorLotteryMediumReaction = exports.ReactionCollectorLotteryEasyReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorLotteryEasyReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorLotteryEasyReaction = ReactionCollectorLotteryEasyReaction;
class ReactionCollectorLotteryMediumReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorLotteryMediumReaction = ReactionCollectorLotteryMediumReaction;
class ReactionCollectorLotteryHardReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorLotteryHardReaction = ReactionCollectorLotteryHardReaction;
class ReactionCollectorLotteryData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorLotteryData = ReactionCollectorLotteryData;
class ReactionCollectorLottery extends ReactionCollectorPacket_1.ReactionCollector {
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorLotteryEasyReaction, {}),
                this.buildReaction(ReactionCollectorLotteryMediumReaction, {}),
                this.buildReaction(ReactionCollectorLotteryHardReaction, {})
            ],
            data: this.buildData(ReactionCollectorLotteryData, {})
        };
    }
}
exports.ReactionCollectorLottery = ReactionCollectorLottery;
//# sourceMappingURL=ReactionCollectorLottery.js.map