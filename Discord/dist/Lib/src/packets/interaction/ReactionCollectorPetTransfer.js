"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPetTransfer = exports.ReactionCollectorPetTransferSwitchReaction = exports.ReactionCollectorPetTransferWithdrawReaction = exports.ReactionCollectorPetTransferDepositReaction = exports.ReactionCollectorPetTransferData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPetTransferData extends ReactionCollectorPacket_1.ReactionCollectorData {
    constructor() {
        super(...arguments);
        this.shelterPets = [];
    }
}
exports.ReactionCollectorPetTransferData = ReactionCollectorPetTransferData;
class ReactionCollectorPetTransferDepositReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorPetTransferDepositReaction = ReactionCollectorPetTransferDepositReaction;
class ReactionCollectorPetTransferWithdrawReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorPetTransferWithdrawReaction = ReactionCollectorPetTransferWithdrawReaction;
class ReactionCollectorPetTransferSwitchReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorPetTransferSwitchReaction = ReactionCollectorPetTransferSwitchReaction;
class ReactionCollectorPetTransfer extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(ownPet, shelterPets, reactions) {
        super();
        this.ownPet = ownPet;
        this.shelterPets = shelterPets;
        this.reactions = reactions;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: this.reactions.map(reaction => ({
                type: reaction.constructor.name,
                data: reaction
            })),
            data: this.buildData(ReactionCollectorPetTransferData, {
                ownPet: this.ownPet,
                shelterPets: this.shelterPets
            })
        };
    }
}
exports.ReactionCollectorPetTransfer = ReactionCollectorPetTransfer;
//# sourceMappingURL=ReactionCollectorPetTransfer.js.map