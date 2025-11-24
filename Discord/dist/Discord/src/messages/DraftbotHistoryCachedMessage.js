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
exports.DraftbotHistoryCachedMessage = void 0;
const DraftbotCachedMessage_1 = require("./DraftbotCachedMessage");
const DiscordCache_1 = require("../bot/DiscordCache");
const i18n_1 = require("../translations/i18n");
const EmoteUtils_1 = require("../utils/EmoteUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const FightAlterationResult_1 = require("../../../Lib/src/types/FightAlterationResult");
const FightConstants_1 = require("../../../Lib/src/constants/FightConstants");
const DraftbotFightStatusCachedMessage_1 = require("./DraftbotFightStatusCachedMessage");
const StringUtils_1 = require("../utils/StringUtils");
const DraftbotActionChooseCachedMessage_1 = require("./DraftbotActionChooseCachedMessage");
const PetAssistanceResult_1 = require("../../../Lib/src/types/PetAssistanceResult");
const StringConstants_1 = require("../../../Lib/src/constants/StringConstants");
const DisplayUtils_1 = require("../utils/DisplayUtils");
class DraftbotHistoryCachedMessage extends DraftbotCachedMessage_1.DraftbotCachedMessage {
    constructor(originalMessageId) {
        super(originalMessageId);
        this.usernamesCachePlayer = new Map();
        this.usernamesCacheMonster = new Map();
        this.duration = 30;
        this.updateMessage = (packet, context) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            if (packet.fighterKeycloakId && !this.usernamesCachePlayer.has(packet.fighterKeycloakId)) {
                this.usernamesCachePlayer.set(packet.fighterKeycloakId, yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.fighterKeycloakId, lng));
            }
            else if (packet.monsterId && !this.usernamesCacheMonster.has(packet.monsterId)) {
                this.usernamesCacheMonster.set(packet.monsterId, i18n_1.default.t(`models:monsters.${packet.monsterId}.name`, { lng }));
            }
            let newLine = i18n_1.default.t("commands:fight.actions.intro", {
                lng,
                emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(packet.pet
                    ? DraftBotIcons_1.DraftBotIcons.pets[packet.pet.typeId][packet.pet.sex === StringConstants_1.StringConstants.SEX.FEMALE.short ? "emoteFemale" : "emoteMale"]
                    : DraftBotIcons_1.DraftBotIcons.fightActions[packet.fightActionId]),
                fighter: packet.fighterKeycloakId ? (_a = this.usernamesCachePlayer) === null || _a === void 0 ? void 0 : _a.get(packet.fighterKeycloakId) : (_b = this.usernamesCacheMonster) === null || _b === void 0 ? void 0 : _b.get(packet.monsterId)
            }) + this.manageMainMessage(packet, lng);
            if (packet.fightActionEffectReceived) {
                newLine += this.manageReceivedEffects(packet, lng);
            }
            if (packet.fightActionEffectDealt) {
                newLine += this.manageSideEffects(packet, lng);
            }
            if (this.historyContent.length + newLine.length <= FightConstants_1.FightConstants.MAX_HISTORY_LENGTH) {
                this.historyContent = `${this.historyContent}\n${newLine}`;
                yield this.post({ content: this.historyContent });
                return null;
            }
            this.storedMessage = undefined;
            this.historyContent = newLine;
            yield this.post({ content: this.historyContent });
            DraftbotCachedMessage_1.DraftbotCachedMessages.markAsReupload(DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(this.originalMessageId, DraftbotFightStatusCachedMessage_1.DraftbotFightStatusCachedMessage));
            DraftbotCachedMessage_1.DraftbotCachedMessages.markAsReupload(DraftbotCachedMessage_1.DraftbotCachedMessages.getOrCreate(this.originalMessageId, DraftbotActionChooseCachedMessage_1.DraftbotActionChooseCachedMessage));
            return null;
        });
        this.historyContent = "";
    }
    get type() {
        return "history";
    }
    manageSideEffects(packet, lng) {
        let sideEffectString = "";
        Object.entries(packet.fightActionEffectDealt)
            .forEach(([key, value]) => {
            if (typeof value === "number") {
                const operator = value >= 0 ? FightConstants_1.FightConstants.OPERATOR.PLUS : FightConstants_1.FightConstants.OPERATOR.MINUS;
                sideEffectString += i18n_1.default.t(`commands:fight.actions.fightActionEffects.opponent.${key}`, {
                    lng,
                    operator,
                    amount: Math.abs(value)
                });
            }
            else if (value) {
                sideEffectString += i18n_1.default.t(`commands:fight.actions.fightActionEffects.opponent.${key}`, {
                    lng,
                    effect: i18n_1.default.t(`models:fight_actions.${value}.name`, { lng })
                });
            }
        });
        return sideEffectString;
    }
    manageMainMessage(packet, lng) {
        if (packet.status
            && Object.values(FightAlterationResult_1.FightAlterationState)
                .includes(packet.status)
            || Object.values(PetAssistanceResult_1.PetAssistanceState)
                .includes(packet.status)) {
            return i18n_1.default.t(`models:fight_actions.${packet.fightActionId}.${packet.status}`, {
                lng,
                petNickname: packet.pet
                    ? packet.pet.nickname
                        ? packet.pet.nickname
                        : DisplayUtils_1.DisplayUtils.getPetTypeName(lng, packet.pet.typeId, packet.pet.sex)
                    : undefined
            });
        }
        else if (packet.customMessage) {
            return i18n_1.default.t(`models:fight_actions.${packet.fightActionId}.customMessage`, {
                lng
            });
        }
        return StringUtils_1.StringUtils.getRandomTranslation(`commands:fight.actions.attacksResults.${packet.status}`, lng, {
            attack: i18n_1.default.t(`models:fight_actions.${packet.fightActionId}.name`, {
                lng,
                count: 1
            })
        });
    }
    manageReceivedEffects(packet, lng) {
        let effectsString = "";
        Object.entries(packet.fightActionEffectReceived)
            .forEach(([key, value]) => {
            if (typeof value === "number") {
                effectsString += i18n_1.default.t(`commands:fight.actions.fightActionEffects.self.${key}`, {
                    lng,
                    operator: value >= 0 ? FightConstants_1.FightConstants.OPERATOR.PLUS : FightConstants_1.FightConstants.OPERATOR.MINUS,
                    amount: Math.abs(value)
                });
            }
            else if (value) {
                effectsString += i18n_1.default.t(`commands:fight.actions.fightActionEffects.self.${key}`, {
                    lng,
                    effect: i18n_1.default.t(`models:fight_actions.${value}.name`, { lng })
                });
            }
        });
        return effectsString;
    }
}
exports.DraftbotHistoryCachedMessage = DraftbotHistoryCachedMessage;
//# sourceMappingURL=DraftbotHistoryCachedMessage.js.map