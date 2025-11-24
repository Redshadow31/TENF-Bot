"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionCollectorBuyCategorySlot = exports.ReactionCollectorBuyCategorySlotCancelReaction = exports.ReactionCollectorBuyCategorySlotReaction = exports.ReactionCollectorBuyCategorySlotData = exports.ReactionCollectorBuyCategorySlotBuySuccess = void 0;
const ReactionCollectorPacket_1 = require("./ReactionCollectorPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
const ItemConstants_1 = require("../../constants/ItemConstants");
let ReactionCollectorBuyCategorySlotBuySuccess = class ReactionCollectorBuyCategorySlotBuySuccess extends DraftBotPacket_1.DraftBotPacket {
};
exports.ReactionCollectorBuyCategorySlotBuySuccess = ReactionCollectorBuyCategorySlotBuySuccess;
exports.ReactionCollectorBuyCategorySlotBuySuccess = ReactionCollectorBuyCategorySlotBuySuccess = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], ReactionCollectorBuyCategorySlotBuySuccess);
class ReactionCollectorBuyCategorySlotData extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorBuyCategorySlotData = ReactionCollectorBuyCategorySlotData;
class ReactionCollectorBuyCategorySlotReaction extends ReactionCollectorPacket_1.ReactionCollectorReaction {
}
exports.ReactionCollectorBuyCategorySlotReaction = ReactionCollectorBuyCategorySlotReaction;
class ReactionCollectorBuyCategorySlotCancelReaction extends ReactionCollectorPacket_1.ReactionCollectorData {
}
exports.ReactionCollectorBuyCategorySlotCancelReaction = ReactionCollectorBuyCategorySlotCancelReaction;
class ReactionCollectorBuyCategorySlot extends ReactionCollectorPacket_1.ReactionCollector {
    constructor(availableCategories) {
        super();
        this.availableCategories = availableCategories;
    }
    creationPacket(id, endTime) {
        const reactions = [];
        const categoriesCount = Object.keys(ItemConstants_1.ItemCategory).length;
        for (let i = 0; i < categoriesCount; ++i) {
            if (this.availableCategories[i] > 0) {
                reactions.push(this.buildReaction(ReactionCollectorBuyCategorySlotReaction, {
                    categoryId: i,
                    maxSlots: ItemConstants_1.ItemConstants.SLOTS.LIMITS[i] - 1,
                    remaining: this.availableCategories[i]
                }));
            }
        }
        reactions.push(this.buildReaction(ReactionCollectorBuyCategorySlotCancelReaction, {}));
        return {
            id,
            endTime,
            reactions,
            data: this.buildData(ReactionCollectorBuyCategorySlotData, {
                price: this.price
            })
        };
    }
}
exports.ReactionCollectorBuyCategorySlot = ReactionCollectorBuyCategorySlot;
//# sourceMappingURL=ReactionCollectorBuyCategorySlot.js.map