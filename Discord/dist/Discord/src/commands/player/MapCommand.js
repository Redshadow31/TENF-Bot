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
exports.commandInfo = void 0;
exports.handleCommandMapDisplayRes = handleCommandMapDisplayRes;
const CommandMapPacket_1 = require("../../../../Lib/src/packets/commands/CommandMapPacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const MapConstants_1 = require("../../../../Lib/src/constants/MapConstants");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return (0, DraftBotPacket_1.makePacket)(CommandMapPacket_1.CommandMapPacketReq, { language: interaction.userLanguage });
}
function setEmbedMap(embed, mapLink) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mapLink.forced && !mapLink.fallback) {
            embed.setImage(MapConstants_1.MapConstants.FORCED_MAPS_URL.replace("{name}", mapLink.name));
        }
        else {
            yield fetch(mapLink.forced
                ? MapConstants_1.MapConstants.FORCED_MAPS_URL.replace("{name}", mapLink.name)
                : MapConstants_1.MapConstants.MAP_URL_WITH_CURSOR.replace("{mapLink}", mapLink.name))
                .then(res => {
                if (res.status !== 200 && mapLink.fallback) {
                    embed.setImage(mapLink.forced
                        ? MapConstants_1.MapConstants.FORCED_MAPS_URL.replace("{name}", mapLink.fallback)
                        : MapConstants_1.MapConstants.MAP_URL_WITH_CURSOR.replace("{mapLink}", mapLink.fallback));
                }
                else {
                    embed.setImage(mapLink.forced
                        ? MapConstants_1.MapConstants.FORCED_MAPS_URL.replace("{name}", mapLink.name)
                        : MapConstants_1.MapConstants.MAP_URL_WITH_CURSOR.replace("{mapLink}", mapLink.name));
                }
            })
                .catch(() => {
                if (mapLink.fallback) {
                    embed.setImage(mapLink.forced
                        ? MapConstants_1.MapConstants.FORCED_MAPS_URL.replace("{name}", mapLink.fallback)
                        : MapConstants_1.MapConstants.MAP_URL_WITH_CURSOR.replace("{mapLink}", mapLink.fallback));
                }
            });
        }
    });
}
function handleCommandMapDisplayRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const embed = new DraftBotEmbed_1.DraftBotEmbed().formatAuthor(i18n_1.default.t("commands:map.title", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        }), interaction.user);
        yield setEmbedMap(embed, packet.mapLink);
        const mapName = i18n_1.default.t(`models:map_locations.${packet.mapId}.name`, {
            lng
        });
        const mapParticle = i18n_1.default.t(`models:map_locations.${packet.mapId}.particle`, { lng });
        const mapDescription = i18n_1.default.t(`models:map_locations.${packet.mapId}.description`, {
            lng
        });
        embed.setDescription(i18n_1.default.t(packet.hasArrived
            ? "commands:map.description.arrived"
            : "commands:map.description.ongoing", {
            lng,
            destination: mapName,
            particle: mapParticle,
            emote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.mapTypes[packet.mapType]),
            description: mapDescription
        }));
        yield interaction.reply({ embeds: [embed] });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("map"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=MapCommand.js.map