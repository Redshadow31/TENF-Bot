"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const PacketHandler_1 = require("../../../PacketHandler");
const ReactionCollectorShop_1 = require("../../../../../../Lib/src/packets/interaction/ReactionCollectorShop");
const ShopCommand_1 = require("../../../../commands/player/ShopCommand");
const ReactionCollectorBuyCategorySlot_1 = require("../../../../../../Lib/src/packets/interaction/ReactionCollectorBuyCategorySlot");
class ShopCommandPacketHandlers {
    shopClosed(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopClosed)(context);
        });
    }
    shopNoAlterationToHeal(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopNoAlterationToHeal)(context);
        });
    }
    shopHealAlterationDone(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopHealAlterationDone)(context);
        });
    }
    shopTooManyEnergyBought(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopTooManyEnergyBought)(context);
        });
    }
    shopNoEnergyToHeal(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopNoEnergyToHeal)(context);
        });
    }
    shopFullRegen(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopFullRegen)(context);
        });
    }
    shopAlreadyHaveBadge(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopAlreadyHaveBadge)(context);
        });
    }
    shopBadgeBought(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopBadgeBought)(context);
        });
    }
    shopBoughtTooMuchDailyPotions(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopBoughtTooMuchDailyPotions)(context);
        });
    }
    shopNotEnoughMoney(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleCommandShopNotEnoughMoney)(packet, context);
        });
    }
    buyCategorySlotBuySuccess(context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, ShopCommand_1.handleReactionCollectorBuyCategorySlotBuySuccess)(context);
        });
    }
}
exports.default = ShopCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopClosed),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopClosed]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopClosed", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopNoAlterationToHeal),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopNoAlterationToHeal]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopNoAlterationToHeal", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopHealAlterationDone),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopHealAlterationDone]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopHealAlterationDone", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopTooManyEnergyBought),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopTooManyEnergyBought]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopTooManyEnergyBought", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopNoEnergyToHeal),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopNoEnergyToHeal]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopNoEnergyToHeal", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopFullRegen),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopFullRegen]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopFullRegen", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopAlreadyHaveBadge),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopAlreadyHaveBadge]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopAlreadyHaveBadge", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopBadgeBought),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopBadgeBought]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopBadgeBought", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopBoughtTooMuchDailyPotions),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopBoughtTooMuchDailyPotions]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopBoughtTooMuchDailyPotions", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorShop_1.CommandShopNotEnoughCurrency),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorShop_1.CommandShopNotEnoughCurrency]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "shopNotEnoughMoney", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotBuySuccess),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotBuySuccess]),
    __metadata("design:returntype", Promise)
], ShopCommandPacketHandlers.prototype, "buyCategorySlotBuySuccess", null);
//# sourceMappingURL=ShopCommandPacketHandlers.js.map