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
exports.createPetSellCollector = createPetSellCollector;
exports.handlePetSellSuccess = handlePetSellSuccess;
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const CommandPetSellPacket_1 = require("../../../../Lib/src/packets/commands/CommandPetSellPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const GuildDailyCommand_1 = require("../guild/GuildDailyCommand");
const CommandGuildDailyPacket_1 = require("../../../../Lib/src/packets/commands/CommandGuildDailyPacket");
const StringUtils_1 = require("../../../../Lib/src/utils/StringUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        const price = interaction.options.get("price", true).value;
        const askedPlayer = yield PacketUtils_1.PacketUtils.prepareAskedPlayer(interaction, keycloakUser);
        if (!askedPlayer) {
            return null;
        }
        return (0, DraftBotPacket_1.makePacket)(CommandPetSellPacket_1.CommandPetSellPacketReq, {
            askedPlayer: !interaction.options.getUser("user") && askedPlayer.keycloakId === keycloakUser.id ? {} : askedPlayer,
            price
        });
    });
}
function createPetSellCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        yield interaction.deferReply();
        const data = packet.data.data;
        const lng = interaction.userLanguage;
        const buyerUser = interaction.options.getUser("user");
        let description = i18n_1.default.t("commands:petSell.sellDescription", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName),
            price: data.price
        });
        if (data.isGuildAtMaxLevel) {
            description += `\n\n${i18n_1.default.t("commands:petSell.maxLevelWarning", { lng })}`;
        }
        const embedKeyTitle = buyerUser ? "sellTitleWithBuyer" : "sellTitle";
        const embed = new DraftBotEmbed_1.DraftBotEmbed()
            .formatAuthor(i18n_1.default.t(`commands:petSell.${embedKeyTitle}`, {
            lng,
            buyer: buyerUser === null || buyerUser === void 0 ? void 0 : buyerUser.displayName,
            seller: interaction.user.displayName
        }), buyerUser !== null && buyerUser !== void 0 ? buyerUser : interaction.user)
            .setDescription(description)
            .addFields([
            {
                name: i18n_1.default.t("commands:petSell.petFieldName", {
                    lng
                }),
                value: DisplayUtils_1.DisplayUtils.getOwnedPetFieldDisplay(data.pet, lng),
                inline: false
            }
        ])
            .setFooter({
            text: i18n_1.default.t("commands:petSell.sellFooter", {
                lng
            })
        });
        const opts = data.buyerKeycloakId
            ? {
                acceptedUsersId: [data.buyerKeycloakId, context.keycloakId]
            }
            : {
                anyoneCanReact: true
            };
        return yield DiscordCollectorUtils_1.DiscordCollectorUtils.createAcceptRefuseCollector(interaction, embed, packet, context, opts);
    });
}
function handlePetSellSuccess(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        const buttonInteraction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        const lng = interaction.userLanguage;
        if (!packet.isGuildMax) {
            yield (0, GuildDailyCommand_1.handleCommandGuildDailyRewardPacket)((0, DraftBotPacket_1.makePacket)(CommandGuildDailyPacket_1.CommandGuildDailyRewardPacket, {
                guildXp: packet.xpEarned,
                guildName: packet.guildName
            }), context, false);
        }
        yield buttonInteraction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(i18n_1.default.t("commands:petSell.successTitle", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(buttonInteraction.user.displayName)
                }), buttonInteraction.user)
                    .setDescription(i18n_1.default.t("commands:petSell.successDescription", {
                    lng,
                    pet: DisplayUtils_1.DisplayUtils.getOwnedPetInlineDisplay(packet.pet, lng)
                }))
            ]
        });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("petSell")
        .addNumberOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("petSell", "price", option)
        .setRequired(true))
        .addUserOption(option => SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateOption("petSell", "user", option)
        .setRequired(false)),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=PetSellCommand.js.map