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
exports.interactOtherPlayerGetPlayerDisplay = interactOtherPlayerGetPlayerDisplay;
exports.interactOtherPlayersCollector = interactOtherPlayersCollector;
const DiscordCache_1 = require("../bot/DiscordCache");
const i18n_1 = require("../translations/i18n");
const DraftbotSmallEventEmbed_1 = require("../messages/DraftbotSmallEventEmbed");
const StringUtils_1 = require("../utils/StringUtils");
const DiscordCollectorUtils_1 = require("../utils/DiscordCollectorUtils");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../bot/DraftBotShard");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const EmoteUtils_1 = require("../utils/EmoteUtils");
function interactOtherPlayerGetPlayerDisplay(keycloakId, rank, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        const getUser = yield KeycloakUtils_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_1.keycloakConfig, keycloakId);
        return i18n_1.default.t(`smallEvents:interactOtherPlayers.playerDisplay${rank ? "Ranked" : "Unranked"}`, {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(!getUser.isError && getUser.payload.user.attributes.gameUsername ? getUser.payload.user.attributes.gameUsername[0] : i18n_1.default.t("error:unknownPlayer", { lng })),
            rank
        });
    });
}
function interactOtherPlayersCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const playerDisplay = yield interactOtherPlayerGetPlayerDisplay(data.keycloakId, data.rank, lng);
        const embed = new DraftbotSmallEventEmbed_1.DraftbotSmallEventEmbed("interactOtherPlayers", StringUtils_1.StringUtils.getRandomTranslation("smallEvents:interactOtherPlayers.poor", lng, { playerDisplay }), interaction.user, lng);
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context, {
            emojis: {
                accept: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.collectors.interactPoorCoin),
                refuse: DraftBotIcons_1.DraftBotIcons.collectors.refuse
            }
        });
    });
}
//# sourceMappingURL=interactOtherPlayers.js.map