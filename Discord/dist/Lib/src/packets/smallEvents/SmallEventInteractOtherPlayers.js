"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmallEventInteractOtherPlayersAcceptToGivePoorPacket = exports.SmallEventInteractOtherPlayersRefuseToGivePoorPacket = exports.SmallEventInteractOtherPlayersPacket = exports.InteractOtherPlayerInteraction = void 0;
const SmallEventPacket_1 = require("./SmallEventPacket");
const DraftBotPacket_1 = require("../DraftBotPacket");
var InteractOtherPlayerInteraction;
(function (InteractOtherPlayerInteraction) {
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["TOP1"] = 0] = "TOP1";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["TOP10"] = 1] = "TOP10";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["TOP50"] = 2] = "TOP50";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["TOP100"] = 3] = "TOP100";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["POWERFUL_GUILD"] = 4] = "POWERFUL_GUILD";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["STAFF_MEMBER"] = 5] = "STAFF_MEMBER";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["BEGINNER"] = 6] = "BEGINNER";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["ADVANCED"] = 7] = "ADVANCED";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["SAME_CLASS"] = 8] = "SAME_CLASS";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["SAME_GUILD"] = 9] = "SAME_GUILD";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["TOP_WEEK"] = 10] = "TOP_WEEK";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["LOW_HP"] = 11] = "LOW_HP";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["FULL_HP"] = 12] = "FULL_HP";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["UNRANKED"] = 13] = "UNRANKED";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["LOWER_RANK_THAN_THEM"] = 14] = "LOWER_RANK_THAN_THEM";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["BETTER_RANK_THAN_THEM"] = 15] = "BETTER_RANK_THAN_THEM";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["RICH"] = 16] = "RICH";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["POOR"] = 17] = "POOR";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["PET"] = 18] = "PET";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["GUILD_CHIEF"] = 19] = "GUILD_CHIEF";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["GUILD_ELDER"] = 20] = "GUILD_ELDER";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["EFFECT"] = 21] = "EFFECT";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["WEAPON"] = 22] = "WEAPON";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["ARMOR"] = 23] = "ARMOR";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["POTION"] = 24] = "POTION";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["OBJECT"] = 25] = "OBJECT";
    InteractOtherPlayerInteraction[InteractOtherPlayerInteraction["CLASS"] = 26] = "CLASS";
})(InteractOtherPlayerInteraction || (exports.InteractOtherPlayerInteraction = InteractOtherPlayerInteraction = {}));
let SmallEventInteractOtherPlayersPacket = class SmallEventInteractOtherPlayersPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventInteractOtherPlayersPacket = SmallEventInteractOtherPlayersPacket;
exports.SmallEventInteractOtherPlayersPacket = SmallEventInteractOtherPlayersPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventInteractOtherPlayersPacket);
let SmallEventInteractOtherPlayersRefuseToGivePoorPacket = class SmallEventInteractOtherPlayersRefuseToGivePoorPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventInteractOtherPlayersRefuseToGivePoorPacket = SmallEventInteractOtherPlayersRefuseToGivePoorPacket;
exports.SmallEventInteractOtherPlayersRefuseToGivePoorPacket = SmallEventInteractOtherPlayersRefuseToGivePoorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventInteractOtherPlayersRefuseToGivePoorPacket);
let SmallEventInteractOtherPlayersAcceptToGivePoorPacket = class SmallEventInteractOtherPlayersAcceptToGivePoorPacket extends SmallEventPacket_1.SmallEventPacket {
};
exports.SmallEventInteractOtherPlayersAcceptToGivePoorPacket = SmallEventInteractOtherPlayersAcceptToGivePoorPacket;
exports.SmallEventInteractOtherPlayersAcceptToGivePoorPacket = SmallEventInteractOtherPlayersAcceptToGivePoorPacket = __decorate([
    (0, DraftBotPacket_1.sendablePacket)(DraftBotPacket_1.PacketDirection.BACK_TO_FRONT)
], SmallEventInteractOtherPlayersAcceptToGivePoorPacket);
//# sourceMappingURL=SmallEventInteractOtherPlayers.js.map