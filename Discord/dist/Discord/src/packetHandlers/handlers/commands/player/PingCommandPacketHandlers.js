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
const CommandPingPacket_1 = require("../../../../../../Lib/src/packets/commands/CommandPingPacket");
const DiscordCache_1 = require("../../../../bot/DiscordCache");
const i18n_1 = require("../../../../translations/i18n");
const DraftBotShard_1 = require("../../../../bot/DraftBotShard");
class PingCommandPacketHandlers {
    pingRes(context, packet) {
        return __awaiter(this, void 0, void 0, function* () {
            const interaction = DiscordCache_1.DiscordCache.getInteraction(context.discord.interaction);
            yield (interaction === null || interaction === void 0 ? void 0 : interaction.editReply({
                content: i18n_1.default.t("commands:ping.discord.edit", {
                    lng: interaction === null || interaction === void 0 ? void 0 : interaction.userLanguage,
                    totalLatency: Date.now() - packet.clientTime,
                    discordApiLatency: DraftBotShard_1.draftBotClient.ws.ping,
                    shardId: DraftBotShard_1.shardId,
                    totalShards: DraftBotShard_1.draftBotClient.shard.count - 1
                })
            }));
        });
    }
}
exports.default = PingCommandPacketHandlers;
__decorate([
    (0, PacketHandler_1.packetHandler)(CommandPingPacket_1.CommandPingPacketRes),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CommandPingPacket_1.CommandPingPacketRes]),
    __metadata("design:returntype", Promise)
], PingCommandPacketHandlers.prototype, "pingRes", null);
//# sourceMappingURL=PingCommandPacketHandlers.js.map