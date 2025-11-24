"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGuildInvite = exports.ReactionCollectorGuildInviteData = void 0;
const ReactionCollectorPacket_js_1 = require("./ReactionCollectorPacket.js");
class ReactionCollectorGuildInviteData extends ReactionCollectorPacket_js_1.ReactionCollectorData {
}
exports.ReactionCollectorGuildInviteData = ReactionCollectorGuildInviteData;
class ReactionCollectorGuildInvite extends ReactionCollectorPacket_js_1.ReactionCollector {
    constructor(guildName, invitedId) {
        super();
        this.guildName = guildName;
        this.invitedKeycloakId = invitedId;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorPacket_js_1.ReactionCollectorAcceptReaction, {}),
                this.buildReaction(ReactionCollectorPacket_js_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorGuildInviteData, {
                invitedPlayerKeycloakId: this.invitedKeycloakId,
                guildName: this.guildName
            })
        };
    }
}
exports.ReactionCollectorGuildInvite = ReactionCollectorGuildInvite;
//# sourceMappingURL=ReactionCollectorGuildInvite.js.map