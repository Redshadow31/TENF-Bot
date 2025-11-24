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
exports.handleCommandClassesChangeSuccessPacket = handleCommandClassesChangeSuccessPacket;
exports.handleChangeClassReactionCollector = handleChangeClassReactionCollector;
const CommandClassesPacket_1 = require("../../../../Lib/src/packets/commands/CommandClassesPacket");
const DraftBotPacket_1 = require("../../../../Lib/src/packets/DraftBotPacket");
const SlashCommandBuilderGenerator_1 = require("../SlashCommandBuilderGenerator");
const DiscordCache_1 = require("../../bot/DiscordCache");
const i18n_1 = require("../../translations/i18n");
const DraftBotEmbed_1 = require("../../messages/DraftBotEmbed");
const ReactionCollectorPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const ReactionCollectorChangeClass_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorChangeClass");
const DisplayUtils_1 = require("../../utils/DisplayUtils");
const discord_js_1 = require("discord.js");
const DraftBotIcons_1 = require("../../../../Lib/src/DraftBotIcons");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const TimeUtils_1 = require("../../../../Lib/src/utils/TimeUtils");
const PacketUtils_1 = require("../../utils/PacketUtils");
const ReactionCollectorResetTimer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorResetTimer");
const DiscordCollectorUtils_1 = require("../../utils/DiscordCollectorUtils");
const StringUtils_1 = require("../../utils/StringUtils");
function getPacket(interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.deferReply();
        return (0, DraftBotPacket_1.makePacket)(CommandClassesPacket_1.CommandClassesPacketReq, {});
    });
}
function handleCommandClassesChangeSuccessPacket(packet, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getButtonInteraction(context.discord.buttonInteraction);
        if (!interaction) {
            return;
        }
        const lng = context.discord.language;
        const title = i18n_1.default.t("commands:classes.success", {
            lng,
            pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
        });
        const description = i18n_1.default.t("commands:classes.newClass", {
            lng,
            name: i18n_1.default.t(`models:classes.${packet.classId}`, { lng })
        });
        yield interaction.editReply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .formatAuthor(title, interaction.user)
                    .setDescription(description)
            ]
        });
    });
}
function handleChangeClassReactionCollector(context, packet) {
    return __awaiter(this, void 0, void 0, function* () {
        const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
        if (!interaction) {
            return null;
        }
        const lng = interaction.userLanguage;
        const data = packet.data.data;
        const classesReactions = packet.reactions.filter(reaction => reaction.type === ReactionCollectorChangeClass_1.ReactionCollectorChangeClassReaction.name)
            .map(reaction => reaction.data);
        const mainEmbed = new DraftBotEmbed_1.DraftBotEmbed()
            .setTitle(i18n_1.default.t("commands:classes.title", { lng }))
            .setDescription(i18n_1.default.t("commands:classes.desc", { lng }))
            .addFields(classesReactions.map(reaction => ({
            name: DisplayUtils_1.DisplayUtils.getClassDisplay(reaction.classId, lng),
            value: i18n_1.default.t(`commands:classes.description.${reaction.classId}`, { lng })
        })));
        const refuseCustomId = "refuse";
        const acceptCustomId = "validate";
        const mainEmbedRow = new discord_js_1.ActionRowBuilder();
        const selectMenu = new discord_js_1.StringSelectMenuBuilder()
            .setCustomId("classSelectionMenu")
            .setPlaceholder(i18n_1.default.t("commands:classes.chooseClass", { lng }));
        for (const reaction of classesReactions) {
            selectMenu.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
                .setLabel(i18n_1.default.t(`models:classes.${reaction.classId}`, { lng }))
                .setValue(reaction.classId.toString())
                .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.classes[reaction.classId])));
        }
        selectMenu.addOptions(new discord_js_1.StringSelectMenuOptionBuilder()
            .setLabel(i18n_1.default.t("commands:classes.refuse", { lng }))
            .setValue(refuseCustomId)
            .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse)));
        mainEmbedRow.addComponents(selectMenu);
        const msg = yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
            embeds: [mainEmbed],
            components: [mainEmbedRow]
        }));
        let validateCollector;
        const selectCollector = msg.createMessageComponentCollector({
            time: packet.endTime - Date.now()
        });
        selectCollector.on("collect", (selectMenuInteraction) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (selectMenuInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                yield (0, ErrorUtils_1.sendInteractionNotForYou)(selectMenuInteraction.user, selectMenuInteraction, lng);
                return;
            }
            yield selectMenuInteraction.deferReply();
            yield msg.edit({
                embeds: [mainEmbed],
                components: []
            });
            const selectedOption = selectMenuInteraction.values[0];
            if (selectedOption === refuseCustomId) {
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, selectMenuInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name));
                return;
            }
            PacketUtils_1.PacketUtils.sendPacketToBackend(context, (0, DraftBotPacket_1.makePacket)(ReactionCollectorResetTimer_1.ReactionCollectorResetTimerPacketReq, { reactionCollectorId: packet.id }));
            const classDetails = data.classesDetails.find(details => details.id === parseInt(selectedOption, 10));
            const validateClassChangeEmbed = new DraftBotEmbed_1.DraftBotEmbed()
                .formatAuthor(i18n_1.default.t("commands:classes.confirm", {
                lng,
                pseudo: (0, StringUtils_1.escapeUsername)(interaction.user.displayName)
            }), interaction.user)
                .setDescription(i18n_1.default.t("commands:classes.display", {
                lng,
                name: i18n_1.default.t("models:classWithStatsFormat", {
                    lng,
                    id: classDetails.id,
                    energy: classDetails.energy,
                    attack: classDetails.attack,
                    defense: classDetails.defense,
                    speed: classDetails.speed,
                    initialBreath: classDetails.initialBreath,
                    maxBreath: classDetails.maxBreath,
                    breathRegen: classDetails.breathRegen,
                    health: classDetails.health
                }),
                description: i18n_1.default.t(`commands:classes.description.${classDetails.id}`, {
                    lng
                }),
                time: (0, TimeUtils_1.dateDisplay)(new Date(Date.now() + data.cooldownSeconds * 1000))
            }));
            const validateRow = new discord_js_1.ActionRowBuilder()
                .addComponents(new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.accept))
                .setCustomId(acceptCustomId)
                .setStyle(discord_js_1.ButtonStyle.Secondary))
                .addComponents(new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse))
                .setCustomId(refuseCustomId)
                .setStyle(discord_js_1.ButtonStyle.Secondary));
            const validateMsg = yield selectMenuInteraction.editReply({
                embeds: [validateClassChangeEmbed],
                components: [validateRow]
            });
            validateCollector = validateMsg.createMessageComponentCollector();
            validateCollector.on("collect", (validateInteraction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (validateInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(validateInteraction.user, validateInteraction, lng);
                    return;
                }
                yield validateInteraction.deferReply();
                if (validateInteraction.customId === refuseCustomId) {
                    DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, validateInteraction, packet.reactions.findIndex(reaction => reaction.type === ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name));
                    return;
                }
                DiscordCollectorUtils_1.DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, validateInteraction, classesReactions.findIndex(reaction => reaction.classId === classDetails.id));
            }));
            validateCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield validateMsg.edit({
                    components: []
                });
            }));
        }));
        selectCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
            yield msg.edit({
                components: []
            });
            if (validateCollector && !validateCollector.ended) {
                validateCollector.stop();
            }
        }));
        return [selectCollector];
    });
}
exports.commandInfo = {
    slashCommandBuilder: SlashCommandBuilderGenerator_1.SlashCommandBuilderGenerator.generateBaseCommand("classes"),
    getPacket,
    mainGuildCommand: false
};
//# sourceMappingURL=ClassesCommand.js.map