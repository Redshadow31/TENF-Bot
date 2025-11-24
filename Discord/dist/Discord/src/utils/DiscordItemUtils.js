"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordItemUtils = void 0;
const i18n_1 = require("../translations/i18n");
const ItemConstants_1 = require("../../../Lib/src/constants/ItemConstants");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const EmoteUtils_1 = require("./EmoteUtils");
const DisplayUtils_1 = require("./DisplayUtils");
class DiscordItemUtils {
    static getStringValueFor(lng, values, value) {
        var _a;
        if (value.value !== 0) {
            values.push(i18n_1.default.t(`items:${value.typeValue}`, {
                lng,
                value: ((_a = value.maxValue) !== null && _a !== void 0 ? _a : Infinity) >= value.value
                    ? value.value
                    : i18n_1.default.t("items:nerfDisplay", {
                        lng,
                        old: value.value,
                        max: value.maxValue
                    })
            }));
        }
    }
    static getValues(attack, defense, speed, language, maxStatsValue = null) {
        if (!maxStatsValue) {
            maxStatsValue = {
                attack: Infinity,
                defense: Infinity,
                speed: Infinity
            };
        }
        const values = [];
        DiscordItemUtils.getStringValueFor(language, values, {
            value: attack,
            maxValue: maxStatsValue.attack,
            typeValue: "attack"
        });
        DiscordItemUtils.getStringValueFor(language, values, {
            value: defense,
            maxValue: maxStatsValue.defense,
            typeValue: "defense"
        });
        DiscordItemUtils.getStringValueFor(language, values, {
            value: speed,
            maxValue: maxStatsValue.speed,
            typeValue: "speed"
        });
        return values.join(" ");
    }
    static getWeaponField(displayPacket, lng) {
        return DiscordItemUtils.getClassicItemField("weapons", DisplayUtils_1.DisplayUtils.getItemIcon({
            id: displayPacket.id, category: displayPacket.itemCategory
        }), DiscordItemUtils.getValues(displayPacket.attack.value, displayPacket.defense.value, displayPacket.speed.value, lng, {
            attack: displayPacket.attack.maxValue,
            defense: displayPacket.defense.maxValue,
            speed: displayPacket.speed.maxValue
        }), displayPacket, lng);
    }
    static getArmorField(displayPacket, lng) {
        return DiscordItemUtils.getClassicItemField("armors", DisplayUtils_1.DisplayUtils.getItemIcon({
            id: displayPacket.id, category: displayPacket.itemCategory
        }), DiscordItemUtils.getValues(displayPacket.attack.value, displayPacket.defense.value, displayPacket.speed.value, lng, {
            attack: displayPacket.attack.maxValue,
            defense: displayPacket.defense.maxValue,
            speed: displayPacket.speed.maxValue
        }), displayPacket, lng);
    }
    static getPotionField(displayPacket, lng) {
        return DiscordItemUtils.getClassicItemField("potions", DisplayUtils_1.DisplayUtils.getItemIcon({
            id: displayPacket.id, category: displayPacket.itemCategory
        }), i18n_1.default.t(`items:potionsNatures.${displayPacket.nature}`, {
            lng,
            power: displayPacket.nature === ItemConstants_1.ItemNature.TIME_SPEEDUP ? (0, TimeUtils_1.minutesDisplay)(displayPacket.power, lng) : displayPacket.power
        }), displayPacket, lng);
    }
    static getObjectField(displayPacket, lng) {
        return DiscordItemUtils.getClassicItemField("objects", DisplayUtils_1.DisplayUtils.getItemIcon({
            id: displayPacket.id, category: displayPacket.itemCategory
        }), i18n_1.default.t(`items:objectsNatures.${displayPacket.nature}`, {
            lng,
            power: displayPacket.nature === ItemConstants_1.ItemNature.TIME_SPEEDUP
                ? (0, TimeUtils_1.minutesDisplay)(displayPacket.power, lng)
                : [
                    ItemConstants_1.ItemNature.SPEED,
                    ItemConstants_1.ItemNature.DEFENSE,
                    ItemConstants_1.ItemNature.ATTACK
                ].includes(displayPacket.nature) && displayPacket.maxPower < displayPacket.power
                    ? i18n_1.default.t("items:nerfDisplay", {
                        lng,
                        old: displayPacket.power,
                        max: displayPacket.maxPower
                    })
                    : displayPacket.power
        }), displayPacket, lng);
    }
    static getShortDisplay(item, lng) {
        return i18n_1.default.t("items:nameDisplay", {
            lng,
            itemId: item.id,
            itemCategory: `${(0, ItemConstants_1.itemCategoryToString)(item.itemCategory)}`
        });
    }
    static getClassicItemField(model, emote, values, displayPacket, lng) {
        const itemField = i18n_1.default.t("items:itemsField", {
            lng,
            name: i18n_1.default.t(`models:${model}.${displayPacket.id}`, {
                lng
            }),
            emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(emote),
            rarity: i18n_1.default.t(`items:rarities.${displayPacket.rarity}`, { lng }),
            values
        });
        return {
            name: i18n_1.default.t(`items:${model}FieldName`, { lng }),
            value: displayPacket.id === 0 ? itemField.split("|")[0] : itemField,
            inline: false
        };
    }
}
exports.DiscordItemUtils = DiscordItemUtils;
//# sourceMappingURL=DiscordItemUtils.js.map