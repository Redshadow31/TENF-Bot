"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorFightPet = exports.ReactionCollectorFightPetData = exports.ReactionCollectorFightPetReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorFightPetReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorFightPetReaction = ReactionCollectorFightPetReaction;
class ReactionCollectorFightPetData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorFightPetData = ReactionCollectorFightPetData;
class ReactionCollectorFightPet extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(petId, isFemale, actions) {
        super();
        this.petId = petId;
        this.isFemale = isFemale;
        this.actions = actions;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const action of this.actions) {
            reactions.push(this.buildReaction(ReactionCollectorFightPetReaction, action));
        }
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorFightPetData, {
                petId: this.petId, isFemale: this.isFemale
            })
        };
    }
}
exports.ReactionCollectorFightPet = ReactionCollectorFightPet;
//# sourceMappingURL=ReactionCollectorFightPet.js.map