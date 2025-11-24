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
exports.handleCommandRespawnPacketRes = handleCommandRespawnPacketRes;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const CommandRespawnPacket_1 = require("../../../../Lib/src/packets/commands/CommandRespawnPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const EmoteUtils_1 = require("../../utils/EmoteUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandRespawnPacket_1.CommandRespawnPacketReq, {});
    });
}
function handleCommandRespawnPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            content: i18n_1.default.t("commands:respawn.response", {
                lng: interaction.userLanguage,
                respawnEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.commands.respawn),
                scoreEmote: EmoteUtils_1.EmoteUtils.translateEmojiToDiscord(DraftBotIcons_1.DraftBotIcons.unitValues.score),
                pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
                count: packet.lostScore
            })
        }));
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("respawn"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=RespawnCommand.js.map