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
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.reply({ content: i18n_1.default.t("commands:invite.discord.main", { lng: interaction.userLanguage }) });
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("invite"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=InviteCommand.js.map