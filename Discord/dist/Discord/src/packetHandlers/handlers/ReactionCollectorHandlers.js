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
const PacketHandler_1 = require("../PacketHandler");
const ReactionCollectorPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPacket");
const ReactionCollectorBigEvent_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorBigEvent");
const ReportCommand_1 = require("../../commands/player/ReportCommand");
const ReactionCollectorChooseDestination_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorChooseDestination");
const ReactionCollectorGoToPVEIsland_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGoToPVEIsland");
const goToPVEIsland_1 = require("../../smallEvents/goToPVEIsland");
const ReactionCollectorLottery_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorLottery");
const lottery_1 = require("../../smallEvents/lottery");
const ReactionCollectorPetFree_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetFree");
const PetFreeCommand_1 = require("../../commands/pet/PetFreeCommand");
const ReactionCollectorInteractOtherPlayers_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorInteractOtherPlayers");
const interactOtherPlayers_1 = require("../../smallEvents/interactOtherPlayers");
const ReactionCollectorWitch_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorWitch");
const witch_1 = require("../../smallEvents/witch");
const ReactionCollectorItemChoice_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorItemChoice");
const ItemCollectors_1 = require("../../inventory/ItemCollectors");
const ReactionCollectorItemAccept_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorItemAccept");
const ReactionCollectorGuildCreate_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildCreate");
const GuildCreateCommand_1 = require("../../commands/guild/GuildCreateCommand");
const ReactionCollectorGuildInvite_js_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildInvite.js");
const GuildInviteCommand_js_1 = require("../../commands/guild/GuildInviteCommand.js");
const ReactionCollectorShop_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorShop");
const ShopCommand_1 = require("../../commands/player/ShopCommand");
const ReactionCollectorBuyCategorySlot_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorBuyCategorySlot");
const ReactionCollectorCart_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorCart");
const cart_1 = require("../../smallEvents/cart");
const ReactionCollectorFightPet_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorFightPet");
const fightPet_1 = require("../../smallEvents/fightPet");
const ReactionCollectorGuildKick_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildKick");
const GuildKickCommand_1 = require("../../commands/guild/GuildKickCommand");
const ReactionCollectorGobletsGame_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGobletsGame");
const gobletsGame_1 = require("../../smallEvents/gobletsGame");
const UnlockCommand_1 = require("../../commands/player/UnlockCommand");
const ReactionCollectorUnlock_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorUnlock");
const shop_1 = require("../../smallEvents/shop");
const epicItemShop_1 = require("../../smallEvents/epicItemShop");
const ReactionCollectorEpicShopSmallEvent_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorEpicShopSmallEvent");
const ReactionCollectorShopSmallEvent_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorShopSmallEvent");
const ReactionCollectorSkipMissionShopItem_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSkipMissionShopItem");
const MissionShop_1 = require("../../commands/mission/MissionShop");
const GuildElderCommand_1 = require("../../commands/guild/GuildElderCommand");
const ReactionCollectorGuildElder_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildElder");
const FightCommand_1 = require("../../commands/player/FightCommand");
const ReactionCollectorFight_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorFight");
const ReactionCollectorGuildLeave_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildLeave");
const GuildLeaveCommand_1 = require("../../commands/guild/GuildLeaveCommand");
const ReactionCollectorSwitchItem_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSwitchItem");
const SwitchCommand_1 = require("../../commands/player/SwitchCommand");
const ReactionCollectorGuildElderRemove_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildElderRemove");
const GuildElderRemoveCommand_1 = require("../../commands/guild/GuildElderRemoveCommand");
const ReactionCollectorGuildDescription_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorGuildDescription");
const GuildDescriptionCommand_1 = require("../../commands/guild/GuildDescriptionCommand");
const ReactionCollectorDrink_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorDrink");
const DrinkCommand_1 = require("../../commands/player/DrinkCommand");
const ReactionCollectorPetSell_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetSell");
const PetSellCommand_1 = require("../../commands/pet/PetSellCommand");
const ReactionCollectorStopPacket_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorStopPacket");
const ReactionCollectorResetTimer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorResetTimer");
const ReactionCollectorChangeClass_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorChangeClass");
const ClassesCommand_1 = require("../../commands/player/ClassesCommand");
const ReactionCollectorSell_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorSell");
const SellCommand_1 = require("../../commands/player/SellCommand");
const ReactionCollectorFightChooseAction_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorFightChooseAction");
const PetTransferCommand_1 = require("../../commands/pet/PetTransferCommand");
const ReactionCollectorPetTransfer_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetTransfer");
const ReactionCollectorPetFeedWithGuild_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetFeedWithGuild");
const PetFeedCommand_1 = require("../../commands/pet/PetFeedCommand");
const ReactionCollectorPetFeedWithoutGuild_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPetFeedWithoutGuild");
const JoinBoatCommand_1 = require("../../commands/player/JoinBoatCommand");
const ReactionCollectorJoinBoat_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorJoinBoat");
const ReactionCollectorPveFight_1 = require("../../../../Lib/src/packets/interaction/ReactionCollectorPveFight");
const ErrorUtils_1 = require("../../utils/ErrorUtils");
const DraftBotLogger_1 = require("../../../../Lib/src/logs/DraftBotLogger");
class ReactionCollectorHandler {
    static initCollectorMap() {
        ReactionCollectorHandler.collectorMap = new Map();
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorBigEvent_1.ReactionCollectorBigEventData.name, ReportCommand_1.createBigEventCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorChooseDestination_1.ReactionCollectorChooseDestinationData.name, ReportCommand_1.chooseDestinationCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGoToPVEIsland_1.ReactionCollectorGoToPVEIslandData.name, goToPVEIsland_1.goToPVEIslandCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorJoinBoat_1.ReactionCollectorJoinBoatData.name, JoinBoatCommand_1.createJoinBoatCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPetFree_1.ReactionCollectorPetFreeData.name, PetFreeCommand_1.createPetFreeCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildCreate_1.ReactionCollectorGuildCreateData.name, GuildCreateCommand_1.createGuildCreateCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildKick_1.ReactionCollectorGuildKickData.name, GuildKickCommand_1.createGuildKickCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildDescription_1.ReactionCollectorGuildDescriptionData.name, GuildDescriptionCommand_1.createGuildDescriptionCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildElder_1.ReactionCollectorGuildElderData.name, GuildElderCommand_1.createGuildElderCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildElderRemove_1.ReactionCollectorGuildElderRemoveData.name, GuildElderRemoveCommand_1.createGuildElderRemoveCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildLeave_1.ReactionCollectorGuildLeaveData.name, GuildLeaveCommand_1.createGuildLeaveCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorLottery_1.ReactionCollectorLotteryData.name, lottery_1.lotteryCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorInteractOtherPlayers_1.ReactionCollectorInteractOtherPlayersPoorData.name, interactOtherPlayers_1.interactOtherPlayersCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorWitch_1.ReactionCollectorWitchData.name, witch_1.witchCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorItemChoice_1.ReactionCollectorItemChoiceData.name, ItemCollectors_1.itemChoiceCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorItemAccept_1.ReactionCollectorItemAcceptData.name, ItemCollectors_1.itemAcceptCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorShop_1.ReactionCollectorShopData.name, ShopCommand_1.shopCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorBuyCategorySlot_1.ReactionCollectorBuyCategorySlotData.name, ShopCommand_1.shopInventoryExtensionCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorCart_1.ReactionCollectorCartData.name, cart_1.cartCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorFightPet_1.ReactionCollectorFightPetData.name, fightPet_1.fightPetCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGuildInvite_js_1.ReactionCollectorGuildInviteData.name, GuildInviteCommand_js_1.createGuildInviteCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorGobletsGame_1.ReactionCollectorGobletsGameData.name, gobletsGame_1.gobletsGameCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorUnlock_1.ReactionCollectorUnlockData.name, UnlockCommand_1.createUnlockCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorShopSmallEvent_1.ReactionCollectorShopSmallEventData.name, shop_1.smallShopCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorEpicShopSmallEvent_1.ReactionCollectorEpicShopSmallEventData.name, epicItemShop_1.epicItemShopCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorSkipMissionShopItem_1.ReactionCollectorSkipMissionShopItemData.name, MissionShop_1.skipMissionShopItemCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorFight_1.ReactionCollectorFightData.name, FightCommand_1.createFightCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorSwitchItem_1.ReactionCollectorSwitchItemData.name, SwitchCommand_1.switchItemCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorDrink_1.ReactionCollectorDrinkData.name, DrinkCommand_1.drinkAcceptCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPetSell_1.ReactionCollectorPetSellData.name, PetSellCommand_1.createPetSellCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorChangeClass_1.ReactionCollectorChangeClassData.name, ClassesCommand_1.handleChangeClassReactionCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorSell_1.ReactionCollectorSellData.name, SellCommand_1.handleSellReactionCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorFightChooseAction_1.ReactionCollectorFightChooseActionData.name, FightCommand_1.handleCommandFightActionChoose);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPetTransfer_1.ReactionCollectorPetTransferData.name, PetTransferCommand_1.handlePetTransferReactionCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPetFeedWithGuild_1.ReactionCollectorPetFeedWithGuildData.name, PetFeedCommand_1.handleCommandPetFeedWithGuildCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPetFeedWithoutGuild_1.ReactionCollectorPetFeedWithoutGuildData.name, PetFeedCommand_1.handleCommandPetFeedWithoutGuildCollector);
        ReactionCollectorHandler.collectorMap.set(ReactionCollectorPveFight_1.ReactionCollectorPveFightData.name, ReportCommand_1.handleStartPveFight);
    }
    collectorCreation(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ReactionCollectorHandler.collectorMap) {
                ReactionCollectorHandler.initCollectorMap();
            }
            const collector = ReactionCollectorHandler.collectorMap.get(packet.data.type);
            if (!collector) {
                DraftBotLogger_1.DraftBotLogger.error("Unknown collector type", { type: packet.data.type });
                yield (0, ErrorUtils_1.handleClassicError)(context, "error:aDevMessedUp");
                return;
            }
            const createdCollector = yield collector(context, packet);
            if (createdCollector) {
                ReactionCollectorHandler.collectorsCache.set(packet.id, createdCollector);
            }
        });
    }
    collectorStop(_context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const collector = ReactionCollectorHandler.collectorsCache.get(packet.id);
            if (!collector) {
                DraftBotLogger_1.DraftBotLogger.warn(`Collector stop received for collector with ID ${packet.id} but no collector was found with this ID`);
                return;
            }
            collector.forEach(c => {
                if (c.ended) {
                    DraftBotLogger_1.DraftBotLogger.warn(`Collector stop received for collector with ID ${packet.id} but collector was already stopped`);
                    return;
                }
                c.stop();
            });
            ReactionCollectorHandler.collectorsCache.delete(packet.id);
            yield Promise.resolve();
        });
    }
    collectorEnded(_context, _packet) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    collectorResetTimer(_context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const collector = ReactionCollectorHandler.collectorsCache.get(packet.reactionCollectorId);
            if (!collector) {
                DraftBotLogger_1.DraftBotLogger.warn(`Collector reset timer received for collector with ID ${packet.reactionCollectorId} but no collector was found with this ID`);
                return;
            }
            collector.forEach(c => {
                if (c.ended) {
                    DraftBotLogger_1.DraftBotLogger.warn(`Collector reset timer received for collector with ID ${packet.reactionCollectorId} but collector was already stopped`);
                    return;
                }
                c.resetTimer({
                    time: packet.endTime - Date.now()
                });
            });
            yield Promise.resolve();
        });
    }
}
ReactionCollectorHandler.collectorsCache = new Map();
exports.default = ReactionCollectorHandler;
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorPacket_1.ReactionCollectorCreationPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorPacket_1.ReactionCollectorCreationPacket]),
    __metadata("design:returntype", Promise)
], ReactionCollectorHandler.prototype, "collectorCreation", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorStopPacket_1.ReactionCollectorStopPacket),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorStopPacket_1.ReactionCollectorStopPacket]),
    __metadata("design:returntype", Promise)
], ReactionCollectorHandler.prototype, "collectorStop", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorPacket_1.ReactionCollectorEnded),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorPacket_1.ReactionCollectorEnded]),
    __metadata("design:returntype", Promise)
], ReactionCollectorHandler.prototype, "collectorEnded", null);
__decorate([
    (0, PacketHandler_1.packetHandler)(ReactionCollectorResetTimer_1.ReactionCollectorResetTimerPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ReactionCollectorResetTimer_1.ReactionCollectorResetTimerPacketRes]),
    __metadata("design:returntype", Promise)
], ReactionCollectorHandler.prototype, "collectorResetTimer", null);
//# sourceMappingURL=ReactionCollectorHandlers.js.map