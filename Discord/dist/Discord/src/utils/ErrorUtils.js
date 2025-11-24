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
exports.SendManner = void 0;
exports.replyEphemeralErrorMessage = replyEphemeralErrorMessage;
exports.sendErrorMessage = sendErrorMessage;
exports.sendInteractionNotForYou = sendInteractionNotForYou;
exports.effectsErrorTextValue = effectsErrorTextValue;
exports.handleClassicError = handleClassicError;
const DraftBotErrorEmbed_1 = require("../messages/DraftBotErrorEmbed");
const Language_1 = require("../../../Lib/src/Language");
const i18n_1 = require("../translations/i18n");
const DraftBotEmbed_1 = require("../messages/DraftBotEmbed");
const StringUtils_1 = require("../../../Lib/src/utils/StringUtils");
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const Effect_1 = require("../../../Lib/src/types/Effect");
const MessagesUtils_1 = require("./MessagesUtils");
const v10_1 = require("discord-api-types/v10");
function replyEphemeralErrorMessage(context, interaction, reason) {
    return __awaiter(this, void 0, void 0, function* () {
        if (interaction.deferred) {
            yield interaction.deleteReply();
        }
        yield (interaction.replied || interaction.deferred ? interaction.followUp.bind(interaction) : interaction.reply.bind(interaction))({
            embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interaction.user, context, interaction, reason)],
            flags: v10_1.MessageFlags.Ephemeral
        });
    });
}
var SendManner;
(function (SendManner) {
    SendManner["SEND"] = "SEND";
    SendManner["REPLY"] = "REPLY";
    SendManner["FOLLOWUP"] = "FOLLOWUP";
    SendManner["EDIT_REPLY"] = "EDIT_REPLY";
})(SendManner || (exports.SendManner = SendManner = {}));
function sendErrorMessage(user_1, context_1, interaction_1, reason_1) {
    return __awaiter(this, arguments, void 0, function* (user, context, interaction, reason, { isCancelling = false, isBlockedError = true, sendManner = SendManner.SEND } = {}) {
        const sendArg = {
            embeds: [new DraftBotErrorEmbed_1.DraftBotErrorEmbed(user, context, interaction, reason, isCancelling, isBlockedError)]
        };
        switch (sendManner) {
            case SendManner.REPLY:
                yield interaction.reply(sendArg);
                break;
            case SendManner.EDIT_REPLY:
                yield interaction.editReply(sendArg);
                break;
            case SendManner.FOLLOWUP:
                yield interaction.followUp(sendArg);
                break;
            default:
                yield interaction.channel.send(sendArg);
                break;
        }
    });
}
function sendInteractionNotForYou(user, interaction, lng) {
    return __awaiter(this, void 0, void 0, function* () {
        yield interaction.reply({
            embeds: [
                new DraftBotEmbed_1.DraftBotEmbed()
                    .setDescription(i18n_1.default.t("error:interactionNotForYou", { lng }))
                    .setErrorColor()
                    .formatAuthor(i18n_1.default.t("error:titleDidntWork", {
                    lng,
                    pseudo: (0, StringUtils_1.escapeUsername)(user.displayName)
                }), user)
            ],
            flags: v10_1.MessageFlags.Ephemeral
        });
    });
}
function getDescriptionTranslationKey(effectId, self) {
    switch (effectId) {
        case Effect_1.Effect.NO_EFFECT.id:
            return "error:notPossibleWithoutStatus";
        case Effect_1.Effect.NOT_STARTED.id:
            return `error:effects.notStartedHint.${self ? "self" : "other"}`;
        case Effect_1.Effect.DEAD.id:
            return `error:effects.deadHint.${self ? "self" : "other"}`;
        default:
            return self ? "error:pleaseWaitForHeal" : "error:pleaseWaitForHisHeal";
    }
}
function effectsErrorTextValue(escapedPseudo, lng, self, effectId, effectRemainingTime) {
    return {
        title: i18n_1.default.t(`error:effects.${effectId}.${self ? "self" : "other"}`, {
            lng,
            pseudo: escapedPseudo
        }),
        description: i18n_1.default.t(`{emote:effects.${effectId}} $t(${getDescriptionTranslationKey(effectId, self)})`, {
            lng,
            time: (0, TimeUtils_1.minutesDisplay)((0, TimeUtils_1.millisecondsToMinutes)(effectRemainingTime), lng)
        })
    };
}
function handleClassicError(context_1, errorKey_1) {
    return __awaiter(this, arguments, void 0, function* (context, errorKey, replacements = {}, opts = {}) {
        var _a, _b, _c;
        const interactionToRespondTo = MessagesUtils_1.MessagesUtils.getCurrentInteraction(context);
        const lng = (_c = (_a = interactionToRespondTo.userLanguage) !== null && _a !== void 0 ? _a : (_b = context.discord) === null || _b === void 0 ? void 0 : _b.language) !== null && _c !== void 0 ? _c : Language_1.LANGUAGE.DEFAULT_LANGUAGE;
        const embed = new DraftBotErrorEmbed_1.DraftBotErrorEmbed(interactionToRespondTo.user, context, interactionToRespondTo, i18n_1.default.t(errorKey, Object.assign({ lng }, replacements)));
        if (opts.forcedTitle) {
            embed.setTitle(i18n_1.default.t(opts.forcedTitle, Object.assign({ lng }, replacements)));
        }
        yield (!interactionToRespondTo.replied
            ? interactionToRespondTo.deferred
                ? interactionToRespondTo.editReply.bind(interactionToRespondTo)
                : interactionToRespondTo.reply.bind(interactionToRespondTo)
            : interactionToRespondTo.followUp.bind(interactionToRespondTo))({
            embeds: [embed],
            flags: opts.ephemeral ? v10_1.MessageFlags.Ephemeral : 0
        });
    });
}
//# sourceMappingURL=ErrorUtils.js.map