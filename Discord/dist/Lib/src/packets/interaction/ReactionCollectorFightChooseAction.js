"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorFightChooseAction = exports.ReactionCollectorFightChooseActionData = exports.ReactionCollectorFightChooseActionReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorFightChooseActionReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorFightChooseActionReaction = ReactionCollectorFightChooseActionReaction;
class ReactionCollectorFightChooseActionData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorFightChooseActionData = ReactionCollectorFightChooseActionData;
class ReactionCollectorFightChooseAction extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(fightId, fighterKeycloakId, reactions) {
        super();
        this.fightId = fightId;
        this.reactions = reactions.map(r => ({
            id: r
        }));
        this.fighterKeycloackId = fighterKeycloakId;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const reaction of this.reactions) {
            reactions.push(this.buildReaction(ReactionCollectorFightChooseActionReaction, reaction));
        }
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorFightChooseActionData, {
                fightId: this.fightId,
                fighterKeycloakId: this.fighterKeycloackId
            })
        };
    }
}
exports.ReactionCollectorFightChooseAction = ReactionCollectorFightChooseAction;
//# sourceMappingURL=ReactionCollectorFightChooseAction.js.map