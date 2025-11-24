"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorShop = exports.ReactionCollectorShopCloseReaction = exports.ReactionCollectorShopItemReaction = exports.ReactionCollectorShopData = exports.CommandShopNotEnoughCurrency = exports.CommandShopBoughtTooMuchDailyPotions = exports.CommandShopBadgeBought = exports.CommandShopAlreadyHaveBadge = exports.CommandShopFullRegen = exports.CommandShopNoEnergyToHeal = exports.CommandShopTooManyEnergyBought = exports.CommandShopHealAlterationDone = exports.CommandShopNoAlterationToHeal = exports.CommandShopClosed = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
const ShopConstants_1 = require("../../constants/ShopConstants");
let CommandShopClosed = class CommandShopClosed extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopClosed = CommandShopClosed;
exports.CommandShopClosed = CommandShopClosed = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopClosed);
let CommandShopNoAlterationToHeal = class CommandShopNoAlterationToHeal extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopNoAlterationToHeal = CommandShopNoAlterationToHeal;
exports.CommandShopNoAlterationToHeal = CommandShopNoAlterationToHeal = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopNoAlterationToHeal);
let CommandShopHealAlterationDone = class CommandShopHealAlterationDone extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopHealAlterationDone = CommandShopHealAlterationDone;
exports.CommandShopHealAlterationDone = CommandShopHealAlterationDone = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopHealAlterationDone);
let CommandShopTooManyEnergyBought = class CommandShopTooManyEnergyBought extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopTooManyEnergyBought = CommandShopTooManyEnergyBought;
exports.CommandShopTooManyEnergyBought = CommandShopTooManyEnergyBought = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopTooManyEnergyBought);
let CommandShopNoEnergyToHeal = class CommandShopNoEnergyToHeal extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopNoEnergyToHeal = CommandShopNoEnergyToHeal;
exports.CommandShopNoEnergyToHeal = CommandShopNoEnergyToHeal = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopNoEnergyToHeal);
let CommandShopFullRegen = class CommandShopFullRegen extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopFullRegen = CommandShopFullRegen;
exports.CommandShopFullRegen = CommandShopFullRegen = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopFullRegen);
let CommandShopAlreadyHaveBadge = class CommandShopAlreadyHaveBadge extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopAlreadyHaveBadge = CommandShopAlreadyHaveBadge;
exports.CommandShopAlreadyHaveBadge = CommandShopAlreadyHaveBadge = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopAlreadyHaveBadge);
let CommandShopBadgeBought = class CommandShopBadgeBought extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopBadgeBought = CommandShopBadgeBought;
exports.CommandShopBadgeBought = CommandShopBadgeBought = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopBadgeBought);
let CommandShopBoughtTooMuchDailyPotions = class CommandShopBoughtTooMuchDailyPotions extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopBoughtTooMuchDailyPotions = CommandShopBoughtTooMuchDailyPotions;
exports.CommandShopBoughtTooMuchDailyPotions = CommandShopBoughtTooMuchDailyPotions = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopBoughtTooMuchDailyPotions);
let CommandShopNotEnoughCurrency = class CommandShopNotEnoughCurrency extends DraftBotPacket_1.DraftBotPacket {
};
exports.CommandShopNotEnoughCurrency = CommandShopNotEnoughCurrency;
exports.CommandShopNotEnoughCurrency = CommandShopNotEnoughCurrency = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], CommandShopNotEnoughCurrency);
class ReactionCollectorShopData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorShopData = ReactionCollectorShopData;
class ReactionCollectorShopItemReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorShopItemReaction = ReactionCollectorShopItemReaction;
class ReactionCollectorShopCloseReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorShopCloseReaction = ReactionCollectorShopCloseReaction;
class ReactionCollectorShop extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(shopCategories, availableCurrency, additionnalShopData = {}) {
        var _a;
        super();
        this.shopCategories = shopCategories;
        this.availableCurrency = availableCurrency;
        this.currency = (_a = additionnalShopData.currency) !== null && _a !== void 0 ? _a : ShopConstants_1.ShopCurrency.MONEY;
        this.additionnalShopData = additionnalShopData;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        for (const shopCategory of this.shopCategories) {
            for (const shopItem of shopCategory.items) {
                for (const amount of shopItem.amounts) {
                    reactions.push(this.buildReaction(ReactionCollectorShopItemReaction, {
                        shopCategoryId: shopCategory.id,
                        shopItemId: shopItem.id,
                        price: shopItem.price * amount,
                        amount
                    }));
                }
            }
        }
        reactions.push(this.buildReaction(ReactionCollectorShopCloseReaction, {}));
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorShopData, {
                availableCurrency: this.availableCurrency,
                currency: this.currency,
                additionnalShopData: this.additionnalShopData
            })
        };
    }
}
exports.ReactionCollectorShop = ReactionCollectorShop;
//# sourceMappingURL=ReactionCollectorShop.js.map