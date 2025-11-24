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
exports.DraftbotChannel = exports.DraftbotInteraction = void 0;
const discord_js_1 = require("discord.js");
const i18n_1 = require("../translations/i18n");
const Language_1 = require("../../../Lib/src/Language");
const DraftBotEmbed_1 = require("./DraftBotEmbed");
const DraftBotLogger_1 = require("../../../Lib/src/logs/DraftBotLogger");
const v10_1 = require("discord-api-types/v10");
const DiscordConstants_1 = require("../DiscordConstants");
const DraftbotInteractionWithoutSendCommands = discord_js_1.CommandInteraction;
const GuildTextBasedChannel = discord_js_1.BaseGuildTextChannel;
const ChannelTypeWithoutSend = GuildTextBasedChannel;
class DraftbotInteraction extends DraftbotInteractionWithoutSendCommands {
    constructor() {
        super(...arguments);
        this.userLanguage = Language_1.LANGUAGE.DEFAULT_LANGUAGE;
        this._replyEdited = false;
    }
    get channel() {
        return this._channel;
    }
    get replyEdited() {
        return this._replyEdited;
    }
    static cast(discordInteraction) {
        if (discordInteraction === null) {
            throw new Error("DraftbotInteraction casting: discordInteraction is null.");
        }
        discordInteraction.followUp = DraftbotInteraction.prototype.followUp.bind(discordInteraction);
        discordInteraction.reply = DraftbotInteraction.prototype.reply.bind(discordInteraction);
        discordInteraction.editReply = DraftbotInteraction.prototype.editReply.bind(discordInteraction);
        const interaction = discordInteraction;
        interaction._channel = DraftbotChannel.cast(discordInteraction.channel);
        if (Object.prototype.hasOwnProperty.call(discordInteraction, "options")) {
            interaction.options = this.properCastOptions(discordInteraction.options);
        }
        return interaction;
    }
    static properCastOptions(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        (_a = options.getUser) !== null && _a !== void 0 ? _a : (options.getUser = () => {
            throw new Error("DraftbotInteraction: interaction.options.getUser is not defined for this interaction.");
        });
        (_b = options.getMember) !== null && _b !== void 0 ? _b : (options.getMember = () => {
            throw new Error("DraftbotInteraction: interaction.options.getMember is not defined for this interaction.");
        });
        (_c = options.getMessage) !== null && _c !== void 0 ? _c : (options.getMessage = () => {
            throw new Error("DraftbotInteraction: interaction.options.getMessage is not defined for this interaction.");
        });
        (_d = options.getFocused) !== null && _d !== void 0 ? _d : (options.getFocused = () => {
            throw new Error("DraftbotInteraction: interaction.options.getFocused is not defined for this interaction.");
        });
        (_e = options.getChannel) !== null && _e !== void 0 ? _e : (options.getChannel = () => {
            throw new Error("DraftbotInteraction: interaction.options.getChannel is not defined for this interaction.");
        });
        (_f = options.getAttachment) !== null && _f !== void 0 ? _f : (options.getAttachment = () => {
            throw new Error("DraftbotInteraction: interaction.options.getAttachment is not defined for this interaction.");
        });
        (_g = options.getMentionable) !== null && _g !== void 0 ? _g : (options.getMentionable = () => {
            throw new Error("DraftbotInteraction: interaction.options.getMentionable is not defined for this interaction.");
        });
        (_h = options.getRole) !== null && _h !== void 0 ? _h : (options.getRole = () => {
            throw new Error("DraftbotInteraction: interaction.options.getRole is not defined for this interaction.");
        });
        (_j = options.getNumber) !== null && _j !== void 0 ? _j : (options.getNumber = () => {
            throw new Error("DraftbotInteraction: interaction.options.getNumber is not defined for this interaction.");
        });
        (_k = options.getInteger) !== null && _k !== void 0 ? _k : (options.getInteger = () => {
            throw new Error("DraftbotInteraction: interaction.options.getInteger is not defined for this interaction.");
        });
        (_l = options.getString) !== null && _l !== void 0 ? _l : (options.getString = () => {
            throw new Error("DraftbotInteraction: interaction.options.getString is not defined for this interaction.");
        });
        (_m = options.getBoolean) !== null && _m !== void 0 ? _m : (options.getBoolean = () => {
            throw new Error("DraftbotInteraction: interaction.options.getBoolean is not defined for this interaction.");
        });
        (_o = options.getSubcommandGroup) !== null && _o !== void 0 ? _o : (options.getSubcommandGroup = () => {
            throw new Error("DraftbotInteraction: interaction.options.getSubcommandGroup is not defined for this interaction.");
        });
        (_p = options.getSubcommand) !== null && _p !== void 0 ? _p : (options.getSubcommand = () => {
            throw new Error("DraftbotInteraction: interaction.options.getSubcommand is not defined for this interaction.");
        });
        return options;
    }
    reply(options, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (DraftbotInteraction.prototype.commonSendCommand).call(this, discord_js_1.CommandInteraction.prototype.reply.bind(this), options, fallback !== null && fallback !== void 0 ? fallback : (() => {
            }));
        });
    }
    followUp(options, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (DraftbotInteraction.prototype.commonSendCommand).call(this, discord_js_1.CommandInteraction.prototype.followUp.bind(this), options, fallback !== null && fallback !== void 0 ? fallback : (() => {
            }));
        });
    }
    editReply(options, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
            this._replyEdited = true;
            return yield (DraftbotInteraction.prototype.commonSendCommand).call(this, discord_js_1.CommandInteraction.prototype.editReply.bind(this), options, fallback !== null && fallback !== void 0 ? fallback : (() => {
            }));
        });
    }
    commonSendCommand(functionPrototype, options, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield functionPrototype(options);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("An error occurred during a send, either a permission issue or a send/reply/followUp/editReply conflict", e);
                yield DraftbotInteraction.prototype.manageFallback.bind(this)(functionPrototype, e);
                yield fallback();
                return null;
            }
        });
    }
    manageFallback(functionPrototype, e) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if ((e === null || e === void 0 ? void 0 : e.constructor.name) === "DiscordAPIError"
                && e.code === 10062
                && !this.deferred
                && this.createdTimestamp + DiscordConstants_1.DiscordConstants.COMMAND_TIMEOUT_MS < Date.now()) {
                return;
            }
            const manageFallbackDevErrorCodes = [
                discord_js_1.DiscordjsErrorCodes.InteractionAlreadyReplied,
                discord_js_1.DiscordjsErrorCodes.InteractionNotReplied
            ];
            let toSendProp;
            const lng = this.userLanguage;
            if ((e === null || e === void 0 ? void 0 : e.constructor.name) === discord_js_1.DiscordjsError.name && manageFallbackDevErrorCodes.includes(e.code)) {
                toSendProp = {
                    embeds: [
                        new DraftBotEmbed_1.DraftBotEmbed()
                            .formatAuthor(i18n_1.default.t("error:errorOccurredTitle", { lng }), this.user)
                            .setDescription(i18n_1.default.t("error:aDevMessedUp", { lng }))
                            .setErrorColor()
                    ]
                };
            }
            else {
                toSendProp = { content: i18n_1.default.t("bot:noSpeakPermission", { lng }) };
            }
            try {
                yield functionPrototype.call(this, Object.assign({ flags: v10_1.MessageFlags.Ephemeral }, toSendProp));
            }
            catch (_c) {
                if (functionPrototype !== DraftbotChannel.prototype.send) {
                    yield DraftbotInteraction.prototype.manageFallback.bind(this)(discord_js_1.BaseGuildTextChannel.prototype.send.bind(this.channel), e);
                    return;
                }
                try {
                    yield discord_js_1.CommandInteraction.prototype.user.send.bind(this.user)(Object.assign({}, toSendProp));
                }
                catch (e) {
                    DraftBotLogger_1.DraftBotLogger.errorWithObj(`Unable to alert user of no speak permission : c:${(_a = this.channel) === null || _a === void 0 ? void 0 : _a.id} / u:${(_b = this.user) === null || _b === void 0 ? void 0 : _b.id}`, e);
                }
            }
        });
    }
}
exports.DraftbotInteraction = DraftbotInteraction;
class DraftbotChannel extends ChannelTypeWithoutSend {
    static cast(channel) {
        channel.send = DraftbotChannel.prototype.send.bind(channel);
        return channel;
    }
    send(options, fallback) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield discord_js_1.BaseGuildTextChannel.prototype.send.bind(this)(options);
            }
            catch (e) {
                DraftBotLogger_1.DraftBotLogger.errorWithObj("Weird Permission Error", e);
                DraftbotChannel.prototype.manageFallback.bind(this)();
                fallback !== null && fallback !== void 0 ? fallback : (fallback = () => {
                });
                yield fallback();
                return null;
            }
        });
    }
    manageFallback() {
        DraftBotLogger_1.DraftBotLogger.error(`Unable to alert user of no speak permission : c:${this.id} / u:N/A`);
    }
}
exports.DraftbotChannel = DraftbotChannel;
//# sourceMappingURL=DraftbotInteraction.js.map