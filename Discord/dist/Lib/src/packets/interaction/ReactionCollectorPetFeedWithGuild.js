"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPetFeedWithGuild = exports.ReactionCollectorPetFeedWithGuildFoodReaction = exports.ReactionCollectorPetFeedWithGuildData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPetFeedWithGuildData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorPetFeedWithGuildData = ReactionCollectorPetFeedWithGuildData;
class ReactionCollectorPetFeedWithGuildFoodReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorPetFeedWithGuildFoodReaction = ReactionCollectorPetFeedWithGuildFoodReaction;
class ReactionCollectorPetFeedWithGuild extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(pet, foods) {
        super();
        this.pet = pet;
        this.foods = foods;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                ...this.foods.map(({ food, amount, maxAmount }) => this.buildReaction(ReactionCollectorPetFeedWithGuildFoodReaction, {
                    food,
                    amount,
                    maxAmount
                })),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorPetFeedWithGuildData, {
                pet: this.pet
            })
        };
    }
}
exports.ReactionCollectorPetFeedWithGuild = ReactionCollectorPetFeedWithGuild;
//# sourceMappingURL=ReactionCollectorPetFeedWithGuild.js.map