"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionUtils = void 0;
class MissionUtils {
    static fromPlaceToPlaceDataFromSaveBlob(saveBlob) {
        return saveBlob
            ? {
                startTimestamp: Number(saveBlob.readBigUInt64LE()),
                startMap: saveBlob.readUInt16LE(8)
            }
            : null;
    }
    static fromPlaceToPlaceParamsFromVariant(variant) {
        return {
            fromMap: variant >> 20 & 0x3ff,
            toMap: variant >> 10 & 0x3ff,
            time: variant & 0x3ff,
            orderMatter: (variant & 0x40000000) !== 0
        };
    }
    static isRequiredFightActionId(mission) {
        return ["fightAttacks", "finishWithAttack"].includes(mission.missionId);
    }
    static isRequiredMapLocationMapType(mission) {
        return ["goToPlace"].includes(mission.missionId);
    }
}
exports.MissionUtils = MissionUtils;
//# sourceMappingURL=MissionUtils.js.map