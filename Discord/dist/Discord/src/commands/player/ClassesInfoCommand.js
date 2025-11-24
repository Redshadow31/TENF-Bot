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
exports.handleCommandClassesInfoPacketRes = handleCommandClassesInfoPacketRes;
const CommandClassesInfoPacket_1 = require("../../../../Lib/src/packets/commands/CommandClassesInfoPacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const DiscordCache_1 = require("../../bot/DiscordCache");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const i18n_1 = require("../../translations/i18n");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const Constants_1 = require("../../../../Lib/src/constants/Constants");
const ClassInfoConstants_1 = require("../../../../Lib/src/constants/ClassInfoConstants");
const discord_js_1 = require("discord.js");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
function getPacket() {
    return (0, DraftBotPacket_1.makePacket)(CommandClassesInfoPacket_1.CommandClassesInfoPacketReq, {});
}
function getListEmbed(lng, classList) {
    const embed = new DraftBotEmbed_1.DraftBotEmbed().setTitle(i18n_1.default.t("commands:classesInfo.title.list", { lng }));
    const classesFields = [];
    for (const foundClass of classList) {
        classesFields.push({
            name: DisplayUtils_1.DisplayUtils.getClassDisplay(foundClass.id, lng),
            value: i18n_1.default.t("commands:classesInfo.displays.class", {
                lng,
                health: foundClass.stats.health,
                attack: foundClass.stats.attack,
                defense: foundClass.stats.defense,
                speed: foundClass.stats.speed,
                baseBreath: foundClass.stats.baseBreath,
                maxBreath: foundClass.stats.maxBreath,
                breathRegen: foundClass.stats.breathRegen,
                fightPoint: foundClass.stats.fightPoint
            }),
            inline: false
        });
    }
    embed
        .setDescription(i18n_1.default.t("commands:classesInfo.description.list", {
        lng
    }))
        .addFields(classesFields);
    return embed;
}
function getDetailsEmbed(lng, classDetails) {
    const embed = new DraftBotEmbed_1.DraftBotEmbed().setTitle(DisplayUtils_1.DisplayUtils.getClassDisplay(classDetails.id, lng));
    const attackFields = [];
    for (const attack of classDetails.attacks) {
        attackFields.push({
            name: i18n_1.default.t("commands:classesInfo.title.attack", {
                lng,
                emote: DraftBotIcons_1.DraftBotIcons.fightActions[attack.id],
                name: attack.name,
                cost: attack.cost
            }),
            value: attack.description,
            inline: false
        });
    }
    embed
        .setDescription(i18n_1.default.t("commands:classesInfo.displays.details", {
        lng,
        classDetails: classDetails.description
    }))
        .setFields(attackFields);
    return embed;
}
function handleCommandClassesInfoPacketRes(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return;
        }
        const lng = interaction.userLanguage;
        const classListEmbed = getListEmbed(lng, packet.data.classesStats);
        const classesMenuOptions = packet.data.classesStats.map(classStats => new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(`${i18n_1.default.t(`models:classes.${classStats.id}`, { lng })}`)
            .setEmoji(DraftBotIcons_1.DraftBotIcons.classes[classStats.id])
            .setValue(classStats.id.toString()));
        const classSelectionMenuOption = new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(i18n_1.default.t("commands:classesInfo.mainOption.name", { lng }))
            .setEmoji(DraftBotIcons_1.DraftBotIcons.commands.classesInfo)
            .setValue(ClassInfoConstants_1.ClassInfoConstants.MENU_IDS.LIST_OPTION);
        classesMenuOptions.unshift(classSelectionMenuOption);
        const classSelectionMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId(ClassInfoConstants_1.ClassInfoConstants.MENU_IDS.CLASS_SELECTION)
            .setPlaceholder(i18n_1.default.t("commands:classesInfo.mainOption.placeholder", { lng }))
            .addOptions(classesMenuOptions);
        const row = new discord_js_1.ActionRowBuilder()
            .addComponents(classSelectionMenu);
        const reply = yield interaction.reply({
            embeds: [classListEmbed],
            components: [row],
            withResponse: true
        });
        if (!((_a = reply === null || reply === void 0 ? void 0 : reply.resource) === null || _a === void 0 ? void 0 : _a.message)) {
            return;
        }
        const msg = reply.resource.message;
        const collector = msg.createMessageComponentCollector({
            filter: menuInteraction => menuInteraction.customId === ClassInfoConstants_1.ClassInfoConstants.MENU_IDS.CLASS_SELECTION,
            time: Constants_1.Constants.MESSAGES.COLLECTOR_TIME
        });
        collector.on("collect", (menuInteraction) => __awaiter(this, void 0, void 0, function* () {
            if (menuInteraction.user.id !== interaction.user.id) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(menuInteraction.user, menuInteraction, lng);
                return;
            }
            if (menuInteraction.values[0] === ClassInfoConstants_1.ClassInfoConstants.MENU_IDS.LIST_OPTION) {
                yield menuInteraction.update({
                    embeds: [classListEmbed],
                    components: [row]
                });
                return;
            }
            const chosenClass = packet.data.classesStats.find(classStats => classStats.id === parseInt(menuInteraction.values[0], 10));
            const attackList = [];
            for (const attack of chosenClass.attacks) {
                attackList.push({
                    id: attack.id,
                    name: i18n_1.default.t(`models:fight_actions.${attack.id}.name_one`, { lng }),
                    description: i18n_1.default.t(`models:fight_actions.${attack.id}.description`, { lng }),
                    cost: attack.cost
                });
            }
            const classDetailsEmbed = getDetailsEmbed(lng, {
                id: parseInt(menuInteraction.values[0]),
                name: i18n_1.default.t(`models:classes.${parseInt(menuInteraction.values[0], 10)}`, { lng }),
                description: i18n_1.default.t(`models:class_descriptions.${parseInt(menuInteraction.values[0], 10)}`, { lng }),
                kind: chosenClass.stats.classKind,
                attacks: attackList
            });
            yield menuInteraction.update({
                embeds: [classDetailsEmbed],
                components: [row]
            });
        }));
        collector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({ components: [] });
        }));
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("classesInfo"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=ClassesInfoCommand.js.map