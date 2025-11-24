"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPetFeedWithoutGuild = exports.ReactionCollectorPetFeedWithoutGuildData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPetFeedWithoutGuildData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorPetFeedWithoutGuildData = ReactionCollectorPetFeedWithoutGuildData;
class ReactionCollectorPetFeedWithoutGuild extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(pet, food, price) {
        super();
        this.pet = pet;
        this.price = price;
        this.food = food;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorPetFeedWithoutGuildData, {
                pet: this.pet,
                price: this.price,
                food: this.food
            })
        };
    }
}
exports.ReactionCollectorPetFeedWithoutGuild = ReactionCollectorPetFeedWithoutGuild;
//# sourceMappingURL=ReactionCollectorPetFeedWithoutGuild.js.map