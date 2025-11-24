"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildCreate = exports.ReactionCollectorGuildCreateData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGuildCreateData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildCreateData = ReactionCollectorGuildCreateData;
class ReactionCollectorGuildCreate extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(guildName) {
        super();
        this.guildName = guildName;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildCreateData, {
                guildName: this.guildName
            })
        };
    }
}
exports.ReactionCollectorGuildCreate = ReactionCollectorGuildCreate;
//# sourceMappingURL=ReactionCollectorGuildCreate.js.map