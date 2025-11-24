"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordCache = void 0;
const Constants_1 = require("../../../Lib/src/constants/Constants");
class DiscordCache {
    static init() {
        if (!DiscordCache.initialized) {
            setInterval(DiscordCache.purge, 60000);
            DiscordCache.initialized = true;
        }
    }
    static purge() {
        const now = Date.now();
        DiscordCache.interactionsCache.forEach(interactionEntry => {
            if (interactionEntry.time < now) {
                DiscordCache.interactionsCache.delete(interactionEntry.interaction.id);
            }
        });
    }
    static cacheInteraction(interaction) {
        DiscordCache.init();
        DiscordCache.interactionsCache.set(interaction.id, {
            interaction, time: Date.now() + Constants_1.Constants.CACHE_TIME.INTERACTIONS
        });
    }
    static cacheButtonInteraction(interaction) {
        DiscordCache.init();
        DiscordCache.buttonInteractionsCache.set(interaction.id, {
            interaction, time: Date.now() + Constants_1.Constants.CACHE_TIME.INTERACTIONS
        });
    }
    static cacheStringSelectMenuInteraction(component) {
        DiscordCache.init();
        DiscordCache.stringSelectMenuInteractionsCache.set(component.id, {
            interaction: component, time: Date.now() + Constants_1.Constants.CACHE_TIME.INTERACTIONS
        });
    }
    static getInteraction(id) {
        var _a;
        const entry = DiscordCache.interactionsCache.get(id);
        return (_a = entry === null || entry === void 0 ? void 0 : entry.interaction) !== null && _a !== void 0 ? _a : null;
    }
    static getButtonInteraction(id) {
        var _a;
        const entry = DiscordCache.buttonInteractionsCache.get(id);
        return (_a = entry === null || entry === void 0 ? void 0 : entry.interaction) !== null && _a !== void 0 ? _a : null;
    }
    static getStringSelectMenuInteraction(id) {
        var _a;
        const entry = DiscordCache.stringSelectMenuInteractionsCache.get(id);
        return (_a = entry === null || entry === void 0 ? void 0 : entry.interaction) !== null && _a !== void 0 ? _a : null;
    }
}
exports.DiscordCache = DiscordCache;
DiscordCache.initialized = false;
DiscordCache.interactionsCache = new Map();
DiscordCache.buttonInteractionsCache = new Map();
DiscordCache.stringSelectMenuInteractionsCache = new Map();
//# sourceMappingURL=DiscordCache.js.map