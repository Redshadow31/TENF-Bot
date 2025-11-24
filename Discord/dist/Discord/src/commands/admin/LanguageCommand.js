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
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const discord_js_1 = require("discord.js");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const KeycloakUtils_1 = require("../../../../Lib/src/keycloak/KeycloakUtils");
const DraftBotShard_1 = require("../../bot/DraftBotShard");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const Language_1 = require("../../../../Lib/src/Language");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
function getPacket(interaction, keycloakUser) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const selectLanguageMenuId = "languageSelectionMenu";
        const lng = interaction.userLanguage;
        const selectLanguageMenuOptions = Language_1.LANGUAGE.LANGUAGES
            .map(languageCode => new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(i18n_1.default.t(`commands:language.languages.${languageCode}`, { lng }))
            .setEmoji(DraftBotIcons_1.DraftBotIcons.languages[languageCode])
            .setValue(languageCode));
        const languageSelectionMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId(selectLanguageMenuId)
            .setPlaceholder(i18n_1.default.t("commands:language.selectLanguage", { lng }))
            .addOptions(selectLanguageMenuOptions);
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(languageSelectionMenu);
        const reply = yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setTitle(i18n_1.default.t("commands:language.title", { lng }))
                    .setDescription(i18n_1.default.t("commands:language.description", { lng }))
            ],
            components: [row],
            withResponse: true
        });
        if (!((_a = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _a === void 0 ? void 0 : _a.message)) {
            return null;
        }
        const msg = reply.resource.message;
        const collector = msg.createMessageComponentCollector({
            filter: menuInteraction => menuInteraction.customId === selectLanguageMenuId,
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        collector.on("collect", (menuInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (menuInteraction.user.id !== interaction.user.id) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(menuInteraction.user, menuInteraction, lng);
                return;
            }
            yield KeycloakUtils_1.KeycloakUtils.updateUserLanguage(DraftBotShard_1.keycloakConfig, keycloakUser, menuInteraction.values[0]);
            yield menuInteraction.reply({
                embeds: [
                    new DraftBotEmbed_1.DraftBotEmbed()
                        .setTitle(i18n_1.default.t("commands:language.newLanguageSetTitle", {
                        lng: menuInteraction.values[0]
                    }))
                        .setDescription(i18n_1.default.t("commands:language.newLanguageSetDescription", {
                        lng: menuInteraction.values[0]
                    }))
                ]
            });
            collector.stop();
        }));
        collector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
        }));
        return null;
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("language"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=LanguageCommand.js.map