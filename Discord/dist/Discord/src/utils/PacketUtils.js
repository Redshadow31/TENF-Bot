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
exports.PacketUtils = void 0;
const DiscordMQTT_1 = require("../bot/DiscordMQTT");
const KeycloakUtils_1 = require("../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../bot/DraftBotShard");
const DraftBotErrorEmbed_1 = require("../messages/DraftBotErrorEmbed");
const i18n_1 = require("../translations/i18n");
const MqttTopicUtils_1 = require("../../../Lib/src/utils/MqttTopicUtils");
const v10_1 = require("discord-api-types/v10");
const PacketConstants_1 = require("../../../Lib/src/constants/PacketConstants");
class PacketUtils {
    static sendPacketToBackend(context, packet) {
        DiscordMQTT_1.DiscordMQTT.globalMqttClient.publish(MqttTopicUtils_1.MqttTopicUtils.getCoreTopic(DraftBotShard_1.discordConfig.PREFIX), JSON.stringify({
            packet: {
                name: packet.constructor.name,
                data: packet
            },
            context
        }));
    }
    static prepareAskedPlayer(interaction, keycloakUser) {
        return __awaiter(this, void 0, void 0, function* () {
            let askedPlayer = { keycloakId: keycloakUser.id };
            const user = interaction.options.getUser("user");
            if (user) {
                const getUser = yield KeycloakUtils_1.KeycloakUtils.getKeycloakIdFromDiscordId(DraftBotShard_1.keycloakConfig, user.id, user.displayName);
                if (!getUser || getUser.isError || !getUser.payload.keycloakId) {
                    yield interaction.reply({
                        embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, null, interaction, i18n_1.default.t("error:playerDoesntExist", { lng: interaction.userLanguage }))],
                        flags: v10_1.MessageFlags.Ephemeral
                    });
                    return null;
                }
                askedPlayer = { keycloakId: getUser.payload.keycloakId };
            }
            const rank = interaction.options.get("rank");
            if (rank) {
                askedPlayer = { rank: rank.value };
            }
            return askedPlayer;
        });
    }
    static createPacketContext(interaction, user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const groups = yield KeycloakUtils_1.KeycloakUtils.getUserGroups(DraftBotShard_1.keycloakConfig, user.id);
            if (groups.isError) {
                throw new Error("Error while getting user groups");
            }
            return {
                frontEndOrigin: PacketConstants_1.PacketConstants.FRONT_END_ORIGINS.DISCORD,
                frontEndSubOrigin: (_b = (_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : PacketConstants_1.PacketConstants.FRONT_END_SUB_ORIGINS.UNKNOWN,
                keycloakId: user.id,
                discord: {
                    user: interaction.user.id,
                    channel: interaction.channel.id,
                    interaction: interaction.id,
                    language: interaction.userLanguage,
                    shardId: DraftBotShard_1.shardId
                },
                rightGroups: groups.payload.groups
            };
        });
    }
}
exports.PacketUtils = PacketUtils;
//# sourceMappingURL=PacketUtils.js.map