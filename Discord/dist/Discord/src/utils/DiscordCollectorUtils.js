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
exports.DiscordCollectorUtils = exports.SEND_POLITICS = void 0;
const DraftBotPacket_1 = require("../../../Lib/src/packets/DraftBotPacket");
const ReactionCollectorPacket_1 = require("../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const DiscordCache_1 = require("../bot/DiscordCache");
const discord_js_1 = require("discord.js");
const DraftBotIcons_1 = require("../../../Lib/src/DraftBotIcons");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const ErrorUtils_1 = require("./ErrorUtils");
const PacketUtils_1 = require("./PacketUtils");
const DraftBotShard_js_1 = require("../bot/DraftBotShard.js");
const KeycloakUtils_js_1 = require("../../../Lib/src/keycloak/KeycloakUtils.js");
const DiscordMQTT_1 = require("../bot/DiscordMQTT");
const RequirementEffectPacket_1 = require("../../../Lib/src/packets/commands/requirements/RequirementEffectPacket");
const Effect_1 = require("../../../Lib/src/types/Effect");
const PacketConstants_1 = require("../../../Lib/src/constants/PacketConstants");
const DiscordConstants_1 = require("../DiscordConstants");
exports.SEND_POLITICS = {
    ALWAYS_FOLLOWUP: [ErrorUtils_1.SendManner.FOLLOWUP],
    REPLY_OR_FOLLOWUP: [ErrorUtils_1.SendManner.REPLY, ErrorUtils_1.SendManner.FOLLOWUP],
    REPLY_OR_EDIT_REPLY: [ErrorUtils_1.SendManner.REPLY, ErrorUtils_1.SendManner.EDIT_REPLY],
    EDIT_REPLY_OR_FOLLOWUP: [ErrorUtils_1.SendManner.EDIT_REPLY, ErrorUtils_1.SendManner.FOLLOWUP],
    ALWAYS_SEND: [ErrorUtils_1.SendManner.SEND]
};
const MANNER_TO_METHOD = {
    [ErrorUtils_1.SendManner.SEND]: (interaction) => interaction.channel.send,
    [ErrorUtils_1.SendManner.REPLY]: (interaction) => interaction.reply,
    [ErrorUtils_1.SendManner.FOLLOWUP]: (interaction) => interaction.followUp,
    [ErrorUtils_1.SendManner.EDIT_REPLY]: (interaction) => interaction.editReply
};
function getSendingManner(interaction, sendManners) {
    return sendManners.length === 1 ? sendManners[0] : interaction.replied ? sendManners[1] : sendManners[0];
}
class DiscordCollectorUtils {
    static sendReaction(packet, context, userKeycloakId, component, reactionIndex) {
        const responsePacket = (0, DraftBotPacket_1.makePacket)(ReactionCollectorPacket_1.ReactionCollectorReactPacket, {
            id: packet.id,
            keycloakId: userKeycloakId,
            reactionIndex
        });
        if (component) {
            if (component.isButton()) {
                DiscordCache_1.DiscordCache.cacheButtonInteraction(component);
            }
            else if (component.isStringSelectMenu()) {
                DiscordCache_1.DiscordCache.cacheStringSelectMenuInteraction(component);
            }
        }
        PacketUtils_1.PacketUtils.sendPacketToBackend({
            frontEndOrigin: PacketConstants_1.PacketConstants.FRONT_END_ORIGINS.DISCORD,
            frontEndSubOrigin: context.frontEndSubOrigin,
            keycloakId: userKeycloakId,
            discord: {
                user: context.discord.user,
                channel: context.discord.channel,
                interaction: context.discord.interaction,
                buttonInteraction: (component === null || component === void 0 ? void 0 : component.isButton()) ? component.id : undefined,
                stringSelectMenuInteraction: (component === null || component === void 0 ? void 0 : component.isStringSelectMenu()) ? component.id : undefined,
                language: context.discord.language,
                shardId: DraftBotShard_js_1.shardId
            }
        }, responsePacket);
    }
    static createAcceptRefuseCollector(interaction, messageContentOrEmbed, reactionCollectorCreationPacket, context, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const emojis = Object.assign({ accept: DraftBotIcons_1.DraftBotIcons.collectors.accept, refuse: DraftBotIcons_1.DraftBotIcons.collectors.refuse }, options === null || options === void 0 ? void 0 : options.emojis);
            const userDiscordIds = [context.discord.user];
            if (options === null || options === void 0 ? void 0 : options.acceptedUsersId) {
                userDiscordIds.pop();
                for (const id of options.acceptedUsersId) {
                    const getUser = yield KeycloakUtils_js_1.KeycloakUtils.getUserByKeycloakId(DraftBotShard_js_1.keycloakConfig, id);
                    if (!getUser.isError) {
                        userDiscordIds.push(getUser.payload.user.attributes.discordId[0]);
                    }
                }
            }
            const row = new discord_js_1.ActionRowBuilder();
            const acceptCustomId = "accept";
            const buttonAccept = new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(emojis.accept))
                .setCustomId(acceptCustomId)
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            row.addComponents(buttonAccept);
            const buttonRefuse = new discord_js_1.ButtonBuilder()
                .setEmoji((0, discord_js_1.parseEmoji)(emojis.refuse))
                .setCustomId("refuse")
                .setStyle(discord_js_1.ButtonStyle.Secondary);
            row.addComponents(buttonRefuse);
            const sendFunction = reactionCollectorCreationPacket.mainPacket ? interaction.editReply : interaction.channel.send;
            let msg;
            if (messageContentOrEmbed instanceof DraftBotEmbed_1.DraftBotEmbed) {
                msg = (yield sendFunction({
                    embeds: [messageContentOrEmbed],
                    components: [row]
                }));
            }
            else {
                msg = (yield sendFunction({
                    content: messageContentOrEmbed,
                    components: [row]
                }));
            }
            const buttonCollector = msg.createMessageComponentCollector({
                time: reactionCollectorCreationPacket.endTime - Date.now()
            });
            buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!(options === null || options === void 0 ? void 0 : options.anyoneCanReact) && (!(options === null || options === void 0 ? void 0 : options.canInitiatorRefuse) || buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user) || buttonInteraction.customId !== "refuse")
                    && !userDiscordIds.find(userDiscordId => userDiscordId === buttonInteraction.user.id)) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, interaction.userLanguage);
                    return;
                }
                const getReactingPlayer = yield KeycloakUtils_js_1.KeycloakUtils.getKeycloakIdFromDiscordId(DraftBotShard_js_1.keycloakConfig, buttonInteraction.user.id, buttonInteraction.user.displayName);
                if (!getReactingPlayer.isError && getReactingPlayer.payload.keycloakId) {
                    if (!(options === null || options === void 0 ? void 0 : options.notDeferReply)) {
                        yield buttonInteraction.deferReply();
                    }
                    else if (messageContentOrEmbed instanceof DraftBotEmbed_1.DraftBotEmbed) {
                        yield msg.edit({
                            embeds: [messageContentOrEmbed],
                            components: []
                        });
                    }
                    else {
                        yield msg.edit({
                            content: messageContentOrEmbed,
                            components: []
                        });
                    }
                    DiscordCollectorUtils.sendReaction(reactionCollectorCreationPacket, context, getReactingPlayer.payload.keycloakId, buttonInteraction, reactionCollectorCreationPacket.reactions.findIndex(reaction => reaction.type === (buttonInteraction.customId === acceptCustomId
                        ? ReactionCollectorPacket_1.ReactionCollectorAcceptReaction.name
                        : ReactionCollectorPacket_1.ReactionCollectorRefuseReaction.name)));
                }
                else {
                    const listener = DiscordMQTT_1.DiscordMQTT.packetListener.getListener(RequirementEffectPacket_1.RequirementEffectPacket.name);
                    if (listener) {
                        yield listener(context, (0, DraftBotPacket_1.makePacket)(RequirementEffectPacket_1.RequirementEffectPacket, {
                            remainingTime: -1,
                            currentEffectId: Effect_1.Effect.NOT_STARTED.id
                        }));
                    }
                }
            }));
            buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield msg.edit({
                    components: []
                });
            }));
            return [buttonCollector];
        });
    }
    static createChoiceListCollector(interaction_1, _a, _b, options_1) {
        return __awaiter(this, arguments, void 0, function* (interaction, { packet, context }, { embed, items }, options) {
            var _c, _d;
            if (items.length > DiscordCollectorUtils.choiceListEmotes.length) {
                throw "Too many items to display";
            }
            let choiceDesc = "";
            const rows = [new discord_js_1.ActionRowBuilder()];
            for (let i = 0; i < items.length; ++i) {
                const button = new discord_js_1.ButtonBuilder()
                    .setEmoji((0, discord_js_1.parseEmoji)(DiscordCollectorUtils.choiceListEmotes[i]))
                    .setCustomId(i.toString())
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                if (rows[rows.length - 1].components.length >= DiscordConstants_1.DiscordConstants.MAX_BUTTONS_PER_ROW) {
                    rows.push(new discord_js_1.ActionRowBuilder());
                }
                rows[rows.length - 1].addComponents(button);
                choiceDesc += `${DiscordCollectorUtils.choiceListEmotes[i]} - ${items[i]}\n`;
            }
            if (options.refuse.can) {
                const buttonRefuse = new discord_js_1.ButtonBuilder()
                    .setEmoji((0, discord_js_1.parseEmoji)(DraftBotIcons_1.DraftBotIcons.collectors.refuse))
                    .setCustomId("refuse")
                    .setStyle(discord_js_1.ButtonStyle.Secondary);
                if (rows[rows.length - 1].components.length >= DiscordConstants_1.DiscordConstants.MAX_BUTTONS_PER_ROW) {
                    rows.push(new discord_js_1.ActionRowBuilder());
                }
                rows[rows.length - 1].addComponents(buttonRefuse);
            }
            if (embed instanceof DraftBotEmbed_1.DraftBotEmbed) {
                embed.setDescription(((_c = embed.data.description) !== null && _c !== void 0 ? _c : "") + choiceDesc);
            }
            else {
                embed += choiceDesc;
            }
            if (!options.sendManners) {
                options.sendManners = exports.SEND_POLITICS.REPLY_OR_FOLLOWUP;
            }
            const sendManner = getSendingManner(interaction, options.sendManners);
            const reply = yield MANNER_TO_METHOD[sendManner](interaction)(Object.assign({ components: rows, withResponse: true }, embed instanceof DraftBotEmbed_1.DraftBotEmbed
                ? { embeds: [embed] }
                : { content: embed }));
            let msg;
            if (reply instanceof discord_js_1.InteractionCallbackResponse) {
                msg = (_d = reply.resource) === null || _d === void 0 ? void 0 : _d.message;
            }
            else {
                msg = reply;
            }
            if (!msg) {
                return null;
            }
            const buttonCollector = msg.createMessageComponentCollector({
                time: packet.endTime - Date.now()
            });
            buttonCollector.on("collect", (buttonInteraction) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (buttonInteraction.user.id !== ((_a = context.discord) === null || _a === void 0 ? void 0 : _a.user)) {
                    yield (0, ErrorUtils_1.sendInteractionNotForYou)(buttonInteraction.user, buttonInteraction, interaction.userLanguage);
                    return;
                }
                yield buttonInteraction.deferReply();
                if (buttonInteraction.customId !== "refuse") {
                    DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, parseInt(buttonInteraction.customId, 10));
                }
                else {
                    DiscordCollectorUtils.sendReaction(packet, context, context.keycloakId, buttonInteraction, options.refuse.reactionIndex);
                }
            }));
            buttonCollector.on("end", () => __awaiter(this, void 0, void 0, function* () {
                yield msg.edit({
                    components: []
                });
            }));
            return [buttonCollector];
        });
    }
}
exports.DiscordCollectorUtils = DiscordCollectorUtils;
DiscordCollectorUtils.choiceListEmotes = [
    "1⃣",
    "2⃣",
    "3⃣",
    "4⃣",
    "5⃣",
    "6⃣",
    "7⃣",
    "8⃣",
    "9⃣"
];
//# sourceMappingURL=DiscordCollectorUtils.js.map