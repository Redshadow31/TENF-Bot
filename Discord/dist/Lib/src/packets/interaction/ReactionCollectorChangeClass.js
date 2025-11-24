"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorChangeClass = exports.ReactionCollectorChangeClassReaction = exports.ReactionCollectorChangeClassData = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
class ReactionCollectorChangeClassData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorChangeClassData = ReactionCollectorChangeClassData;
class ReactionCollectorChangeClassReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorChangeClassReaction = ReactionCollectorChangeClassReaction;
class ReactionCollectorChangeClass extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(classesDetails, cooldownSeconds) {
        super();
        this.classesDetails = classesDetails;
        this.cooldownSeconds = cooldownSeconds;
    }
    creationPacket(id, endTime) {
        return {
            id,
            endTime,
            reactions: [
                ...this.classesDetails.map(classDetails => this.buildReaction(ReactionCollectorChangeClassReaction, {
                    classId: classDetails.id
                })),
                this.buildReaction(ReactionCollectorPacket_1.ReactionCollectorRefuseReaction, {})
            ],
            data: this.buildData(ReactionCollectorChangeClassData, {
                classesDetails: this.classesDetails,
                cooldownSeconds: this.cooldownSeconds
            })
        };
    }
}
exports.ReactionCollectorChangeClass = ReactionCollectorChangeClass;
//# sourceMappingURL=ReactionCollectorChangeClass.js.map