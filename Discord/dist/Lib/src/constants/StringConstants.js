"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringConstants = exports.Sex = void 0;
class Sex {
    constructor(short, long) {
        this.short = short;
        this.long = long;
    }
}
exports.Sex = Sex;
class StringConstants {
}
exports.StringConstants = StringConstants;
StringConstants.PROGRESS_BAR_SIZE = 20;
StringConstants.SEX = {
    MALE: new Sex("m", "male"),
    FEMALE: new Sex("f", "female")
};
//# sourceMappingURL=StringConstants.js.map