"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionUtils = void 0;
const i18n_1 = require("../translations/i18n");
const MissionUtils_1 = require("../../../Lib/src/utils/MissionUtils");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
class MissionUtils {
    static formatBaseMission(mission, lng) {
        return i18n_1.default.t(`models:missions.${mission.missionId}`, {
            lng,
            count: mission.missionObjective,
            variantText: this.getVariantText(mission, lng)
        });
    }
    static formatCompletedMission(mission, lng) {
        const rewards = [
            {
                value: mission.pointsToWin, key: "pointsDisplay"
            },
            {
                value: mission.gemsToWin, key: "gemsDisplay"
            },
            {
                value: mission.moneyToWin, key: "moneyDisplay"
            },
            {
                value: mission.xpToWin, key: "xpDisplay"
            }
        ];
        const rewardDisplays = rewards
            .filter(reward => reward.value > 0)
            .map(reward => i18n_1.default.t(`notifications:missions.completed.${reward.key}`, {
            count: reward.value,
            lng
        }));
        return i18n_1.default.t("notifications:missions.completed.missionDisplay", {
            lng,
            missionDescription: this.formatBaseMission(mission, lng),
            missionsReward: rewardDisplays.length === 0 ? "" : ` (${rewardDisplays.join(", ")})`
        });
    }
    static generateDisplayProgression(current, objective) {
        let progression = current / objective;
        if (progression < 0) {
            return "ERROR:PROGRESS_BAR_NEGATIVE";
        }
        if (progression > 1) {
            progression = 1;
        }
        const squareToDisplay = Math.floor(progression * 10);
        return `[${"■".repeat(squareToDisplay)}${"□".repeat(10 - squareToDisplay)}]`;
    }
    static getVariantText(mission, lng) {
        if (mission.missionId === "fromPlaceToPlace") {
            return this.manageFromPlaceToPlaceVariant(mission, lng);
        }
        if (mission.missionId === "chooseClassTier") {
            return String(mission.missionVariant + 1);
        }
        if (!MissionUtils_1.MissionUtils.isRequiredFightActionId(mission)) {
            return i18n_1.default.t([`models:missionVariants.${mission.missionId}`, "models:missionVariants.default"], {
                lng,
                variant: mission.missionVariant,
                mapType: mission.mapType
            });
        }
        if (!mission.fightAction) {
            throw new Error("fightAction is not set for a fight mission");
        }
        if (mission.missionId === "fightAttacks") {
            return i18n_1.default.t("models:missionVariants.fightAttacks", {
                lng,
                count: mission.missionObjective,
                variant: mission.fightAction
            });
        }
        return i18n_1.default.t("models:missionVariants.finishWithAttack", {
            lng,
            variant: mission.fightAction
        }).toLowerCase();
    }
    static manageFromPlaceToPlaceVariant(mission, lng) {
        const params = MissionUtils_1.MissionUtils.fromPlaceToPlaceParamsFromVariant(mission.missionVariant);
        const saveData = mission.saveBlob ? MissionUtils_1.MissionUtils.fromPlaceToPlaceDataFromSaveBlob(Buffer.from(mission.saveBlob, "binary")) : null;
        if (!saveData || saveData.startTimestamp + (0, TimeUtils_1.hoursToMilliseconds)(params.time) < Date.now()) {
            return i18n_1.default.t("models:missionVariants.fromPlaceToPlace", {
                lng,
                place1: i18n_1.default.t(`models:map_locations.${params.fromMap}.name`, { lng }),
                place2: i18n_1.default.t(`models:map_locations.${params.toMap}.name`, { lng }),
                time: params.time,
                context: params.orderMatter ? "order" : "noOrder"
            });
        }
        return i18n_1.default.t("models:missionVariants.fromPlaceToPlace_secondPart", {
            lng,
            place: i18n_1.default.t(`models:map_locations.${saveData.startMap === params.fromMap ? params.toMap : params.fromMap}.name`, { lng }),
            time: (0, TimeUtils_1.dateDisplay)(new Date(saveData.startTimestamp + (0, TimeUtils_1.hoursToMilliseconds)(params.time)))
        });
    }
}
exports.MissionUtils = MissionUtils;
//# sourceMappingURL=MissionUtils.js.map