"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBuilderGenerator = void 0;
const builders_1 = require("@discordjs/builders");
const i18n_1 = require("../translations/i18n");
const Language_1 = require("../../../Lib/src/Language");
class SlashCommandBuilderGenerator {
    static generateBaseCommand(commandSectionName) {
        return new builders_1.SlashCommandBuilder()
            .setName(i18n_1.default.t(`discordBuilder:${commandSectionName}.name`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setNameLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.name`, { lng: Language_1.LANGUAGE.FRENCH })
        })
            .setDescription(i18n_1.default.t(`discordBuilder:${commandSectionName}.description`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setDescriptionLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.description`, { lng: Language_1.LANGUAGE.FRENCH })
        });
    }
    static generateSubCommand(commandSectionName, subCommandSectionName) {
        return new builders_1.SlashCommandSubcommandBuilder()
            .setName(i18n_1.default.t(`discordBuilder:${commandSectionName}.subcommands.${subCommandSectionName}.name`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setNameLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.subcommands.${subCommandSectionName}.name`, { lng: Language_1.LANGUAGE.FRENCH })
        })
            .setDescription(i18n_1.default.t(`discordBuilder:${commandSectionName}.subcommands.${subCommandSectionName}.description`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setDescriptionLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.subcommands.${subCommandSectionName}.description`, { lng: Language_1.LANGUAGE.FRENCH })
        });
    }
    static generateOption(commandSectionName, optionSectionName, option) {
        return option.setName(i18n_1.default.t(`discordBuilder:${commandSectionName}.options.${optionSectionName}.name`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setNameLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.options.${optionSectionName}.name`, { lng: Language_1.LANGUAGE.FRENCH })
        })
            .setDescription(i18n_1.default.t(`discordBuilder:${commandSectionName}.options.${optionSectionName}.description`, { lng: Language_1.LANGUAGE.ENGLISH }))
            .setDescriptionLocalizations({
            fr: i18n_1.default.t(`discordBuilder:${commandSectionName}.options.${optionSectionName}.description`, { lng: Language_1.LANGUAGE.FRENCH })
        });
    }
}
exports.SlashCommandBuilderGenerator = SlashCommandBuilderGenerator;
//# sourceMappingURL=SlashCommandBuilderGenerator.js.map