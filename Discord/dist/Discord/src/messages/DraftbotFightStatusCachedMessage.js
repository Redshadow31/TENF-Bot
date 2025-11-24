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
exports.DraftbotFightStatusCachedMessage = void 0;
const DraftbotCachedMessage_1 = require("./DraftbotCachedMessage");
const DiscordCache_1 = require("../bot/DiscordCache");
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const i18n_1 = require("../translations/i18n");
const DisplayUtils_1 = require("../utils/DisplayUtils");
class DraftbotFightStatusCachedMessage extends DraftbotCachedMessage_1.DraftbotCachedMessage {
    constructor() {
        super(...arguments);
        this.duration = 30;
        this.updateMessage = (packet, context) => __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            const lng = interaction.userLanguage;
            if (!this.usernamesCache) {
                this.usernamesCache = new Map();
                if (packet.activeFighter.keycloakId) {
                    this.usernamesCache.set(packet.activeFighter.keycloakId, yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.activeFighter.keycloakId, lng));
                }
                if (packet.defendingFighter.keycloakId) {
                    this.usernamesCache.set(packet.defendingFighter.keycloakId, yield DisplayUtils_1.DisplayUtils.getEscapedUsername(packet.defendingFighter.keycloakId, lng));
                }
            }
            const attackerUsername = packet.activeFighter.keycloakId ? this.usernamesCache.get(packet.activeFighter.keycloakId) : i18n_1.default.t(`models:monsters.${packet.activeFighter.monsterId}.name`, { lng });
            const defenderUsername = packet.defendingFighter.keycloakId ? this.usernamesCache.get(packet.defendingFighter.keycloakId) : i18n_1.default.t(`models:monsters.${packet.defendingFighter.monsterId}.name`, { lng });
            const keyProlongation = packet.numberOfTurn > packet.maxNumberOfTurn ? "prolongation" : "noProlongation";
            const embed = new DraftBotEmbed_1.DraftBotEmbed()
                .setTitle(i18n_1.default.t("commands:fight.summarize.title", { lng }))
                .setDescription(i18n_1.default.t("commands:fight.summarize.intro.start", {
                lng,
                state: i18n_1.default.t(`commands:fight.summarize.intro.${keyProlongation}`, {
                    lng,
                    currentTurn: packet.numberOfTurn,
                    maxTurn: packet.maxNumberOfTurn
                })
            })
                + i18n_1.default.t("commands:fight.summarize.attacker", {
                    lng,
                    pseudo: attackerUsername
                })
                + i18n_1.default.t("commands:fight.summarize.stats", Object.assign({ lng }, packet.activeFighter.stats))
                + i18n_1.default.t("commands:fight.summarize.defender", {
                    lng,
                    pseudo: defenderUsername
                })
                + i18n_1.default.t("commands:fight.summarize.stats", Object.assign({ lng }, packet.defendingFighter.stats)));
            yield this.post({ embeds: [embed] });
            return null;
        });
    }
    get type() {
        return "fightStatus";
    }
}
exports.DraftbotFightStatusCachedMessage = DraftbotFightStatusCachedMessage;
//# sourceMappingURL=DraftbotFightStatusCachedMessage.js.map