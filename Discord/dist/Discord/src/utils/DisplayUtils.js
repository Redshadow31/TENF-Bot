"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayUtils = void 0;
const ItemConstants_1 = require("../../../Lib/src/constants/ItemConstants");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const i18n_1 = require("../translations/i18n");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const EmoteUtils_1 = require("./EmoteUtils");
const StringConstants_1 = require("../../../Lib/src/constants/StringConstants");
const StringUtils_1 = require("./StringUtils");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../bot/DraftBotShard");
class DisplayUtils {
    static getItemDisplay(item, language) {
        switch (item.category) {
            case ItemConstants_1.ItemCategory.WEAPON:
                return DisplayUtils.getWeaponDisplay(item.id, language);
            case ItemConstants_1.ItemCategory.ARMOR:
                return DisplayUtils.getArmorDisplay(item.id, language);
            case ItemConstants_1.ItemCategory.POTION:
                return DisplayUtils.getPotionDisplay(item.id, language);
            case ItemConstants_1.ItemCategory.OBJECT:
                return DisplayUtils.getObjectDisplay(item.id, language);
            default:
                return "Missing no";
        }
    }
    static getSimpleItemName(item, lng) {
        return i18n_1.default.t(`models:${(0, ItemConstants_1.itemCategoryToString)(item.category)}.${item.id}`, { lng });
    }
    static getItemIcon(item, translateEmote = true) {
        let emote;
        switch (item.category) {
            case ItemConstants_1.ItemCategory.WEAPON:
                emote = DraftBotIcons_1.DraftBotIcons.weapons[item.id];
                break;
            case ItemConstants_1.ItemCategory.ARMOR:
                emote = DraftBotIcons_1.DraftBotIcons.armors[item.id];
                break;
            case ItemConstants_1.ItemCategory.POTION:
                emote = DraftBotIcons_1.DraftBotIcons.potions[item.id];
                break;
            case ItemConstants_1.ItemCategory.OBJECT:
                emote = DraftBotIcons_1.DraftBotIcons.objects[item.id];
                break;
            default:
                return "Missing no";
        }
        return translateEmote ? EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(emote) : emote;
    }
    static getWeaponDisplay(weaponId, lng) {
        return `${DisplayUtils.getItemIcon({
            category: ItemConstants_1.ItemCategory.WEAPON,
            id: weaponId
        })} ${i18n_1.default.t(`models:weapons.${weaponId}`, { lng })}`;
    }
    static getArmorDisplay(armorId, lng) {
        return `${DisplayUtils.getItemIcon({
            category: ItemConstants_1.ItemCategory.ARMOR,
            id: armorId
        })} ${i18n_1.default.t(`models:armors.${armorId}`, { lng })}`;
    }
    static getPotionDisplay(potionId, lng) {
        return `${DisplayUtils.getItemIcon({
            category: ItemConstants_1.ItemCategory.POTION,
            id: potionId
        })} ${i18n_1.default.t(`models:potions.${potionId}`, { lng })}`;
    }
    static getObjectDisplay(objectId, lng) {
        return `${DisplayUtils.getItemIcon({
            category: ItemConstants_1.ItemCategory.OBJECT,
            id: objectId
        })} ${i18n_1.default.t(`models:objects.${objectId}`, { lng })}`;
    }
    static getItemDisplayWithStats(itemWithDetails, language) {
        switch (itemWithDetails.category) {
            case ItemConstants_1.ItemCategory.WEAPON:
                return this.getMainItemDisplayWithStats("weapons", itemWithDetails, language);
            case ItemConstants_1.ItemCategory.ARMOR:
                return this.getMainItemDisplayWithStats("armors", itemWithDetails, language);
            case ItemConstants_1.ItemCategory.POTION:
                return this.getPotionDisplayWithStats(itemWithDetails, language);
            case ItemConstants_1.ItemCategory.OBJECT:
                return this.getObjectDisplayWithStats(itemWithDetails, language);
            default:
                return "Missing no";
        }
    }
    static getMapLocationDisplay(mapType, mapLocationId, lng) {
        return i18n_1.default.t("{emote:mapTypes.{{mapType}}} $t(models:map_locations.{{mapLocationId}}.name)", {
            lng,
            mapLocationId,
            mapType
        });
    }
    static getPetIcon(petId, sex) {
        return DraftBotIcons_1.DraftBotIcons.pets[petId][sex === StringConstants_1.StringConstants.SEX.FEMALE.short ? "emoteFemale" : "emoteMale"];
    }
    static getPetTypeName(lng, typeId, sex) {
        const sexStringContext = sex === StringConstants_1.StringConstants.SEX.MALE.short ? StringConstants_1.StringConstants.SEX.MALE.long : StringConstants_1.StringConstants.SEX.FEMALE.long;
        return i18n_1.default.t(`models:pets:${typeId}`, {
            lng,
            context: sexStringContext
        });
    }
    static getPetDisplay(petId, sex, lng) {
        const context = sex === StringConstants_1.StringConstants.SEX.FEMALE.short ? StringConstants_1.StringConstants.SEX.FEMALE.long : StringConstants_1.StringConstants.SEX.MALE.long;
        return i18n_1.default.t(`{emote:pets.{{petId}}.emote${context[0].toUpperCase() + context.slice(1)}} $t(models:pets.{{petId}})`, {
            lng,
            context,
            petId
        });
    }
    static getPetNicknameOrTypeName(nickname, typeId, sex, lng) {
        return nickname ? DisplayUtils.getPetDisplayNickname(lng, nickname) : DisplayUtils.getPetTypeName(lng, typeId, sex);
    }
    static getOwnedPetInlineDisplay(ownedPet, lng) {
        return `${DisplayUtils.getPetIcon(ownedPet.typeId, ownedPet.sex)} ${DisplayUtils.getPetNicknameOrTypeName(ownedPet.nickname, ownedPet.typeId, ownedPet.sex, lng)}`;
    }
    static getPetDisplayNickname(lng, nickname) {
        return nickname ? nickname : i18n_1.default.t("commands:pet.noNickname", { lng });
    }
    static getPetRarityDisplay(rarity) {
        return DraftBotIcons_1.DraftBotIcons.unitValues.petRarity.repeat(rarity);
    }
    static getPetSexName(sex, lng) {
        return sex === "f" ? i18n_1.default.t("models:sex.female", { lng }) : i18n_1.default.t("models:sex.male", { lng });
    }
    static getPetLoveLevelDisplay(loveLevel, sex, lng, withIcon = true) {
        const sexStringContext = sex === StringConstants_1.StringConstants.SEX.MALE.short ? StringConstants_1.StringConstants.SEX.MALE.long : StringConstants_1.StringConstants.SEX.FEMALE.long;
        const text = i18n_1.default.t(`commands:pet.loveLevels.${loveLevel}`, {
            context: sexStringContext,
            lng
        });
        if (withIcon) {
            return text;
        }
        return text.split(" ")[1];
    }
    static getOwnedPetFieldDisplay(ownedPet, lng) {
        return i18n_1.default.t("commands:pet.petField", {
            lng,
            emote: DisplayUtils.getPetIcon(ownedPet.typeId, ownedPet.sex),
            typeName: DisplayUtils.getPetTypeName(lng, ownedPet.typeId, ownedPet.sex),
            nickname: DisplayUtils.getPetDisplayNickname(lng, ownedPet.nickname),
            rarity: DisplayUtils.getPetRarityDisplay(ownedPet.rarity),
            sex: i18n_1.default.t("commands:pet.sexDisplay", {
                lng,
                context: ownedPet.sex
            }),
            loveLevel: DisplayUtils.getPetLoveLevelDisplay(ownedPet.loveLevel, ownedPet.sex, lng)
        });
    }
    static getClassDisplay(classId, lng) {
        return i18n_1.default.t("models:classFormat", {
            lng,
            id: classId
        });
    }
    static getFoodDisplay(food, count, lng, capitalizeFirstLetter) {
        let name = i18n_1.default.t(`models:foods.${food}`, {
            lng,
            count
        });
        if (capitalizeFirstLetter) {
            name = StringUtils_1.StringUtils.capitalizeFirstLetter(name);
        }
        return `${DraftBotIcons_1.DraftBotIcons.foods[food]} ${name}`;
    }
    static getEscapedUsername(keycloakId, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, keycloakId);
            if (getUser.isError) {
                return i18n_1.default.t("error:unknownPlayer", { lng });
            }
            return (0, StringUtils_1.escapeUsername)(getUser.payload.user.attributes.gameUsername[0]);
        });
    }
    static getStringValueFor(values, maxValue, value, typeValue, lng) {
        if (value !== 0) {
            values.push(i18n_1.default.t(`items:${typeValue}`, {
                lng,
                value: (maxValue !== null && maxValue !== void 0 ? maxValue : Infinity >= value)
                    ? value
                    : i18n_1.default.t("items:nerfDisplay", {
                        old: value,
                        max: maxValue,
                        lng
                    })
            }));
        }
    }
    static getMainItemDisplayWithStats(itemType, itemWithDetails, lng) {
        var _a, _b, _c, _d, _e, _f;
        const values = [];
        this.getStringValueFor(values, (_b = (_a = itemWithDetails.maxStats) === null || _a === void 0 ? void 0 : _a.attack) !== null && _b !== void 0 ? _b : null, itemWithDetails.detailsMainItem.stats.attack, "attack", lng);
        this.getStringValueFor(values, (_d = (_c = itemWithDetails.maxStats) === null || _c === void 0 ? void 0 : _c.defense) !== null && _d !== void 0 ? _d : null, itemWithDetails.detailsMainItem.stats.defense, "defense", lng);
        this.getStringValueFor(values, (_f = (_e = itemWithDetails.maxStats) === null || _e === void 0 ? void 0 : _e.speed) !== null && _f !== void 0 ? _f : null, itemWithDetails.detailsMainItem.stats.speed, "speed", lng);
        return i18n_1.default.t("items:itemsField", {
            lng,
            name: i18n_1.default.t(`models:${itemType}.${itemWithDetails.id}`, {
                lng
            }),
            emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons[itemType][itemWithDetails.id]),
            rarity: i18n_1.default.t(`items:rarities.${itemWithDetails.rarity}`, { lng }),
            values: values.join(" ")
        });
    }
    static getPotionDisplayWithStats(itemWithDetails, lng) {
        const itemField = i18n_1.default.t("items:itemsField", {
            name: i18n_1.default.t(`models:potions.${itemWithDetails.id}`, {
                lng
            }),
            emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DisplayUtils.getItemIcon({
                category: itemWithDetails.category,
                id: itemWithDetails.id
            })),
            rarity: i18n_1.default.t(`items:rarities.${itemWithDetails.rarity}`, { lng }),
            values: i18n_1.default.t(`items:potionsNatures.${itemWithDetails.detailsSupportItem.nature}`, {
                power: itemWithDetails.detailsSupportItem.nature === ItemConstants_1.ItemNature.TIME_SPEEDUP
                    ? (0, TimeUtils_1.minutesDisplay)(itemWithDetails.detailsSupportItem.power, lng)
                    : itemWithDetails.detailsSupportItem.power,
                lng
            }),
            lng
        });
        return itemWithDetails.id === 0 ? itemField.split("|")[0] : itemField;
    }
    static getObjectNatureTranslation(itemWithDetails, lng) {
        var _a;
        const nature = itemWithDetails.detailsSupportItem.nature;
        const power = itemWithDetails.detailsSupportItem.power;
        const maxStats = (_a = itemWithDetails.maxStats) !== null && _a !== void 0 ? _a : {
            attack: Infinity,
            defense: Infinity,
            speed: Infinity
        };
        switch (nature) {
            case ItemConstants_1.ItemNature.TIME_SPEEDUP:
                return i18n_1.default.t(`items:objectsNatures.${nature}`, {
                    power: (0, TimeUtils_1.minutesDisplay)(power, lng),
                    lng
                });
            case ItemConstants_1.ItemNature.SPEED: {
                const display = maxStats.speed >= power / 2
                    ? power
                    : i18n_1.default.t("items:nerfDisplay", {
                        old: power,
                        max: maxStats.speed * 2,
                        lng
                    });
                return i18n_1.default.t(`items:objectsNatures.${nature}`, {
                    power: display, lng
                });
            }
            case ItemConstants_1.ItemNature.ATTACK: {
                const display = maxStats.attack >= power / 2
                    ? power
                    : i18n_1.default.t("items:nerfDisplay", {
                        old: power,
                        max: maxStats.attack * 2,
                        lng
                    });
                return i18n_1.default.t(`items:objectsNatures.${nature}`, {
                    power: display, lng
                });
            }
            case ItemConstants_1.ItemNature.DEFENSE: {
                const display = maxStats.defense >= power / 2
                    ? power
                    : i18n_1.default.t("items:nerfDisplay", {
                        old: power,
                        max: maxStats.defense * 2,
                        lng
                    });
                return i18n_1.default.t(`items:objectsNatures.${nature}`, {
                    power: display, lng
                });
            }
            default:
                return i18n_1.default.t(`items:objectsNatures.${nature}`, {
                    power,
                    lng
                });
        }
    }
    static getObjectDisplayWithStats(itemWithDetails, lng) {
        const itemField = i18n_1.default.t("items:itemsField", {
            name: i18n_1.default.t(`models:objects.${itemWithDetails.id}`, {
                lng
            }),
            emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.objects[itemWithDetails.id]),
            rarity: i18n_1.default.t(`items:rarities.${itemWithDetails.rarity}`, { lng }),
            values: DisplayUtils.getObjectNatureTranslation(itemWithDetails, lng),
            lng
        });
        return itemWithDetails.id === 0 ? itemField.split("|")[0] : itemField;
    }
}
exports.DisplayUtils = DisplayUtils;
//# sourceMappingURL=DisplayUtils.js.map