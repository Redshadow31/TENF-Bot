"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightStatBuffed = void 0;
exports.defaultFightActionResult = defaultFightActionResult;
exports.customMessageActionResult = customMessageActionResult;
exports.defaultFailFightActionResult = defaultFailFightActionResult;
exports.defaultMaxUsesFightActionResult = defaultMaxUsesFightActionResult;
exports.fightActionResultFromSuccessTest = fightActionResultFromSuccessTest;
exports.updateFightActionResultFromSuccessTest = updateFightActionResultFromSuccessTest;
const FightActionStatus_1 = require("./FightActionStatus");
var FightStatBuffed;
(function (FightStatBuffed) {
    FightStatBuffed[FightStatBuffed["ATTACK"] = 0] = "ATTACK";
    FightStatBuffed[FightStatBuffed["DEFENSE"] = 1] = "DEFENSE";
    FightStatBuffed[FightStatBuffed["SPEED"] = 2] = "SPEED";
    FightStatBuffed[FightStatBuffed["BREATH"] = 3] = "BREATH";
    FightStatBuffed[FightStatBuffed["ENERGY"] = 4] = "ENERGY";
    FightStatBuffed[FightStatBuffed["DAMAGE"] = 5] = "DAMAGE";
    FightStatBuffed[FightStatBuffed["SUMMON"] = 6] = "SUMMON";
    FightStatBuffed[FightStatBuffed["DAMAGE_BOOST"] = 7] = "DAMAGE_BOOST";
})(FightStatBuffed || (exports.FightStatBuffed = FightStatBuffed = {}));
function defaultFightActionResult() {
    return {
        attackStatus: FightActionStatus_1.FightActionStatus.NORMAL,
        customMessage: false
    };
}
function customMessageActionResult() {
    return {
        attackStatus: FightActionStatus_1.FightActionStatus.NORMAL,
        customMessage: true
    };
}
function defaultFailFightActionResult() {
    return {
        fail: true,
        attackStatus: FightActionStatus_1.FightActionStatus.MISSED
    };
}
function defaultMaxUsesFightActionResult() {
    return {
        fail: true,
        attackStatus: FightActionStatus_1.FightActionStatus.MAX_USES
    };
}
function fightActionResultFromSuccessTest(success) {
    return success ? defaultFightActionResult() : defaultFailFightActionResult();
}
function updateFightActionResultFromSuccessTest(result, success) {
    result.fail = !success;
    result.attackStatus = success ? FightActionStatus_1.FightActionStatus.NORMAL : FightActionStatus_1.FightActionStatus.MISSED;
    return result;
}
//# sourceMappingURL=FightActionResult.js.map