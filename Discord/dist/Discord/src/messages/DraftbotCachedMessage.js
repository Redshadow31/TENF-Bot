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
exports.DraftbotCachedMessages = exports.DraftbotCachedMessage = void 0;
const TimeUtils_1 = require("../../../Lib/src/utils/TimeUtils");
const DiscordCache_1 = require("../bot/DiscordCache");
class DraftbotCachedMessage {
    constructor(originalMessageId) {
        this.reuploadMessage = false;
        this.originalMessageId = originalMessageId;
    }
    get cacheKey() {
        return `${this.originalMessageId}-${this.type}`;
    }
    update(packet, context) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.updateMessage(packet, context);
        });
    }
    post(options) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (this.reuploadMessage) {
                (_a = this.storedMessage) === null || _a === void 0 ? void 0 : _a.delete().then();
                this.storedMessage = undefined;
                this.reuploadMessage = false;
            }
            if (this.storedMessage) {
                return yield this.storedMessage.edit(options);
            }
            const mainMessage = DiscordCache_1.DiscordCache.getInteraction(this.originalMessageId);
            if (!mainMessage) {
                return null;
            }
            const message = yield mainMessage.channel.send(options);
            this.storedMessage = message;
            return message;
        });
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storedMessage) {
                yield this.storedMessage.delete();
            }
            this.storedMessage = undefined;
        });
    }
}
exports.DraftbotCachedMessage = DraftbotCachedMessage;
class DraftbotCachedMessages {
    static createCachedMessage(message) {
        DraftbotCachedMessages.cachedMessages.set(message.cacheKey, message);
        setTimeout(() => {
            DraftbotCachedMessages.remove(message.cacheKey);
        }, (0, TimeUtils_1.minutesToMilliseconds)(message.duration));
    }
    static remove(cacheKey) {
        DraftbotCachedMessages.cachedMessages.delete(cacheKey);
    }
    static removeAllFromMessageId(originalMessageId, removeCallback) {
        DraftbotCachedMessages.cachedMessages.forEach((message, key) => {
            if (key.startsWith(originalMessageId)) {
                DraftbotCachedMessages.remove(key);
                removeCallback(message);
            }
        });
    }
    static getOrCreate(originalMessageId, MessageLike) {
        const type = new MessageLike("").type;
        const message = DraftbotCachedMessages.cachedMessages.get(`${originalMessageId}-${type}`);
        if (!message) {
            const newMessage = new MessageLike(originalMessageId);
            DraftbotCachedMessages.createCachedMessage(newMessage);
            return newMessage;
        }
        return message;
    }
    static markAsReupload(message) {
        DraftbotCachedMessages.cachedMessages.get(message.cacheKey).reuploadMessage = true;
    }
}
exports.DraftbotCachedMessages = DraftbotCachedMessages;
DraftbotCachedMessages.cachedMessages = new Map();
//# sourceMappingURL=DraftbotCachedMessage.js.map