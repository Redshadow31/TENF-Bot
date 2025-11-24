"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorGobletsGame = exports.ReactionCollectorGobletsGameData = exports.ReactionCollectorGobletsGameSparklingReaction = exports.ReactionCollectorGobletsGameBiggestReaction = exports.ReactionCollectorGobletsGameMetalReaction = exports.ReactionCollectorGobletsGameReaction = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorGobletsGameReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorGobletsGameReaction = ReactionCollectorGobletsGameReaction;
class ReactionCollectorGobletsGameMetalReaction extends ReactionCollectorGobletsGameReaction {
    constructor() {
        super(...arguments);
        this.id = "metal";
    }
}
exports.ReactionCollectorGobletsGameMetalReaction = ReactionCollectorGobletsGameMetalReaction;
class ReactionCollectorGobletsGameBiggestReaction extends ReactionCollectorGobletsGameReaction {
    constructor() {
        super(...arguments);
        this.id = "biggest";
    }
}
exports.ReactionCollectorGobletsGameBiggestReaction = ReactionCollectorGobletsGameBiggestReaction;
class ReactionCollectorGobletsGameSparklingReaction extends ReactionCollectorGobletsGameReaction {
    constructor() {
        super(...arguments);
        this.id = "sparkling";
    }
}
exports.ReactionCollectorGobletsGameSparklingReaction = ReactionCollectorGobletsGameSparklingReaction;
class ReactionCollectorGobletsGameData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorGobletsGameData = ReactionCollectorGobletsGameData;
class ReactionCollectorGobletsGame extends ReactionCollectorPacket_1.ReactionCollector {
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                this.buildReaction(ReactionCollectorGobletsGameMetalReaction, {}),
                this.buildReaction(ReactionCollectorGobletsGameBiggestReaction, {}),
                this.buildReaction(ReactionCollectorGobletsGameSparklingReaction, {})
            ],
            data: this.buildData(ReactionCollectorGobletsGameData, {})
        };
    }
}
exports.ReactionCollectorGobletsGame = ReactionCollectorGobletsGame;
//# sourceMappingURL=ReactionCollectorGobletsGame.js.map