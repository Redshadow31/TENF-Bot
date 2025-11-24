"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftBotDiscordMetrics = exports.draftBotMetricsRegistry = void 0;
const client = require("prom-client");
exports.draftBotMetricsRegistry = new client.Registry();
const packetsTimeBuckets = [];
for (let i = 0.1; i < 1; i += 0.1) {
    packetsTimeBuckets.push(i);
}
for (let i = 1; i < 5; i += 0.5) {
    packetsTimeBuckets.push(i);
}
for (let i = 5; i <= 10; i += 1) {
    packetsTimeBuckets.push(i);
}
class DraftBotDiscordMetrics {
    static observePacketTime(packetName, time) {
        this.packetsTimeHistogram.labels(packetName)
            .observe(time);
    }
    static incrementPacketCount(packetName) {
        this.packetsCount.labels(packetName)
            .inc();
    }
    static incrementPacketErrorCount(packetName) {
        this.packetsErrorCount.labels(packetName)
            .inc();
    }
}
exports.DraftBotDiscordMetrics = DraftBotDiscordMetrics;
DraftBotDiscordMetrics.packetsTimeHistogram = new client.Histogram({
    name: "discord_packets_time",
    help: "Histogram of packets times",
    labelNames: ["packet"],
    registers: [exports.draftBotMetricsRegistry],
    buckets: packetsTimeBuckets
});
DraftBotDiscordMetrics.packetsCount = new client.Counter({
    name: "discord_packets_count",
    help: "Count of packets",
    labelNames: ["packet"],
    registers: [exports.draftBotMetricsRegistry]
});
DraftBotDiscordMetrics.packetsErrorCount = new client.Counter({
    name: "discord_packets_error_count",
    help: "Count of packets errors",
    labelNames: ["packet"],
    registers: [exports.draftBotMetricsRegistry]
});
client.collectDefaultMetrics({
    register: exports.draftBotMetricsRegistry
});
//# sourceMappingURL=DraftBotDiscordMetrics.js.map