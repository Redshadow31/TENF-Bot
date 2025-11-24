"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPetFree = exports.ReactionCollectorPetFreeData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPetFreeData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorPetFreeData = ReactionCollectorPetFreeData;
class ReactionCollectorPetFree extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(petId, petSex, petNickname, freeCost) {
        super();
        this.petId = petId;
        this.petSex = petSex;
        this.petNickname = petNickname;
        this.freeCost = freeCost;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorPetFreeData, {
                petId: this.petId,
                petSex: this.petSex,
                petNickname: this.petNickname,
                freeCost: this.freeCost
            })
        };
    }
}
exports.ReactionCollectorPetFree = ReactionCollectorPetFree;
//# sourceMappingURL=ReactionCollectorPetFree.js.map