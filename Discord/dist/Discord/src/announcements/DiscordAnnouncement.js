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
exports.DiscordAnnouncement = void 0;
const DraftBotShard_1 = require("../bot/DraftBotShard");
const i18n_1 = require("../translations/i18n");
const Language_1 = require("../../../Lib/src/Language");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const StringUtils_1 = require("../utils/StringUtils");
class DiscordAnnouncement {
    static announceTop(messageFr, messageEn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const frenchChannel = yield DraftBotShard_1.draftBotClient.channels.fetch(DraftBotShard_1.discordConfig.FRENCH_ANNOUNCEMENT_CHANNEL_ID);
                yield (yield frenchChannel.send({ content: messageFr })).react(DraftBotIcons_1.DraftBotIcons.announcements.trophy);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while sending top announcement in french channel", e);
            }
            try {
                const englishChannel = yield DraftBotShard_1.draftBotClient.channels.fetch(DraftBotShard_1.discordConfig.ENGLISH_ANNOUNCEMENT_CHANNEL_ID);
                yield (yield englishChannel.send({ content: messageEn })).react(DraftBotIcons_1.DraftBotIcons.announcements.trophy);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Error while sending top announcement in english channel", e);
            }
        });
    }
    static canAnnounce() {
        return __awaiter(this, void 0, void 0, function* () {
            const guild = yield DraftBotShard_1.draftBotClient.guilds.fetch(DraftBotShard_1.discordConfig.MAIN_SERVER_ID);
            return Boolean(guild.shard);
        });
    }
    static announceTopWeek(topWeekAnnouncementPacket) {
        return __awaiter(this, void 0, void 0, function* () {
            DraftBotLogger_1.DraftBotLogger.info("Announcing top week...");
            if (topWeekAnnouncementPacket.winnerKeycloakId) {
                const winner = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, topWeekAnnouncementPacket.winnerKeycloakId);
                if (!winner.isError) {
                    const mention = winner.payload.user.attributes.discordId ? `<@${winner.payload.user.attributes.discordId[0]}>` : (0, StringUtils_1.escapeUsername)(winner.payload.user.attributes.gameUsername[0]);
                    const messageFr = i18n_1.default.t("bot:topWeekAnnouncement", {
                        lng: Language_1.LANGUAGE.FRENCH,
                        mention
                    });
                    const messageEn = i18n_1.default.t("bot:topWeekAnnouncement", {
                        lng: Language_1.LANGUAGE.ENGLISH,
                        mention
                    });
                    yield this.announceTop(messageFr, messageEn);
                }
                else {
                    DraftBotLogger_1.DraftBotLogger.error(`Failed to announce top week: winner with keycloak id ${topWeekAnnouncementPacket.winnerKeycloakId} not found`);
                }
            }
            else {
                const messageFr = i18n_1.default.t("bot:topWeekAnnouncementNoWinner", { lng: Language_1.LANGUAGE.FRENCH });
                const messageEn = i18n_1.default.t("bot:topWeekAnnouncementNoWinner", { lng: Language_1.LANGUAGE.ENGLISH });
                yield this.announceTop(messageFr, messageEn);
            }
        });
    }
    static announceTopWeekFight(topWeekFightAnnouncementPacket) {
        return __awaiter(this, void 0, void 0, function* () {
            DraftBotLogger_1.DraftBotLogger.info("Announcing fight top week...");
            if (topWeekFightAnnouncementPacket.winnerKeycloakId) {
                const winner = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, topWeekFightAnnouncementPacket.winnerKeycloakId);
                if (!winner.isError) {
                    const mention = winner.payload.user.attributes.discordId ? `<@${winner.payload.user.attributes.discordId[0]}>` : (0, StringUtils_1.escapeUsername)(winner.payload.user.attributes.gameUsername[0]);
                    const messageFr = i18n_1.default.t("bot:seasonEndAnnouncement", {
                        lng: Language_1.LANGUAGE.FRENCH,
                        mention
                    });
                    const messageEn = i18n_1.default.t("bot:seasonEndAnnouncement", {
                        lng: Language_1.LANGUAGE.ENGLISH,
                        mention
                    });
                    yield this.announceTop(messageFr, messageEn);
                }
                else {
                    DraftBotLogger_1.DraftBotLogger.error(`Failed to announce top week fight: winner with keycloak id ${topWeekFightAnnouncementPacket.winnerKeycloakId} not found`);
                }
            }
            else {
                const messageFr = i18n_1.default.t("bot:seasonEndAnnouncementNoWinner", { lng: Language_1.LANGUAGE.FRENCH });
                const messageEn = i18n_1.default.t("bot:seasonEndAnnouncementNoWinner", { lng: Language_1.LANGUAGE.ENGLISH });
                yield this.announceTop(messageFr, messageEn);
            }
        });
    }
}
exports.DiscordAnnouncement = DiscordAnnouncement;
//# sourceMappingURL=DiscordAnnouncement.js.map