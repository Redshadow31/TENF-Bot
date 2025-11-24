"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorPetSell = exports.ReactionCollectorPetSellData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorPetSellData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorPetSellData = ReactionCollectorPetSellData;
class ReactionCollectorPetSell extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(sellerKeycloakId, price, isGuildAtMaxLevel, pet, buyerKeycloakId) {
        super();
        this.sellerKeycloakId = sellerKeycloakId;
        this.price = price;
        this.isGuildAtMaxLevel = isGuildAtMaxLevel;
        this.pet = pet;
        this.buyerKeycloakId = buyerKeycloakId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorPetSellData, {
                sellerKeycloakId: this.sellerKeycloakId,
                price: this.price,
                isGuildAtMaxLevel: this.isGuildAtMaxLevel,
                pet: this.pet,
                buyerKeycloakId: this.buyerKeycloakId
            })
        };
    }
}
exports.ReactionCollectorPetSell = ReactionCollectorPetSell;
//# sourceMappingURL=ReactionCollectorPetSell.js.map