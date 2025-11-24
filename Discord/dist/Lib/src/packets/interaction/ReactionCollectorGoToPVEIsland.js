"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGoToPVEIsland = exports.ReactionCollectorGoToPVEIslandData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGoToPVEIslandData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGoToPVEIslandData = ReactionCollectorGoToPVEIslandData;
class ReactionCollectorGoToPVEIsland extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(price, currentEnergy, maxEnergy) {
        super();
        this.price = price;
        this.currentEnergy = currentEnergy;
        this.maxEnergy = maxEnergy;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGoToPVEIslandData, {
                price: this.price,
                energy: {
                    current: this.currentEnergy,
                    max: this.maxEnergy
                }
            })
        };
    }
}
exports.ReactionCollectorGoToPVEIsland = ReactionCollectorGoToPVEIsland;
//# sourceMappingURL=ReactionCollectorGoToPVEIsland.js.map