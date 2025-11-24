"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetUtils = void 0;
const PetConstants_1 = require("../../../Lib/src/constants/PetConstants");
const i18n_1 = require("../translations/i18n");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const DisplayUtils_1 = require("./DisplayUtils");
class PetUtils {
    static petToShortString(lng, nickname, typeId, sex) {
        return i18n_1.default.t("commands:pet.shortPetField", {
            lng,
            emote: DisplayUtils_1.DisplayUtils.getPetIcon(typeId, sex),
            name: nickname !== null && nickname !== void 0 ? nickname : DisplayUtils_1.DisplayUtils.getPetTypeName(lng, typeId, sex)
        });
    }
    static getDietDisplay(diet, lng) {
        return i18n_1.default.t("models:diet", {
            lng, context: diet !== null && diet !== void 0 ? diet : PetConstants_1.PetDiet.OMNIVOROUS
        });
    }
    static getFeedCooldownDisplay(nextFeed, lng) {
        return nextFeed <= 0
            ? i18n_1.default.t("commands:shop.shopItems.lovePointsValue.petIsHungry", { lng })
            : (0, TimeUtils_1.finishInTimeDisplay)(new Date(new Date().valueOf() + nextFeed));
    }
}
exports.PetUtils = PetUtils;
//# sourceMappingURL=PetUtils.js.map