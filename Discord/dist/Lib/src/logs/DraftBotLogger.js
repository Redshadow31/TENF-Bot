"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftBotLogger = void 0;
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const Constants_1 = require("../constants/Constants");
const LokiTransport = require("winston-loki");
const myFormatWithLabel = winston_1.format.printf(({ level, message, metadata, label, timestamp }) => `${timestamp} [${label}] [${level.toUpperCase()}]: ${message}${metadata && Object.keys(metadata).length > 0 ? ` ${JSON.stringify(metadata)}` : ""}`);
const myFormat = winston_1.format.printf(({ level, message, metadata, timestamp }) => `${timestamp} [${level.toUpperCase()}]: ${message}${metadata && Object.keys(metadata).length > 0 ? ` ${JSON.stringify(metadata)}` : ""}`);
class DraftBotLogger {
    static init(level, locations, labels, lokiSettings) {
        const transportsList = [];
        for (const location of locations) {
            switch (location) {
                case "console":
                    transportsList.push(new winston_1.transports.Console());
                    break;
                case "file":
                    transportsList.push(new winston_1.transports.DailyRotateFile({
                        filename: `${Constants_1.Constants.LOGS.FILE_BASE_PATH}/%DATE%.log`,
                        datePattern: "YYYY-MM-DD",
                        zippedArchive: Constants_1.Constants.LOGS.FILE_ZIPPED_ARCHIVE,
                        maxSize: Constants_1.Constants.LOGS.FILE_MAX_SIZE,
                        maxFiles: Constants_1.Constants.LOGS.FILE_RETENTION
                    }));
                    break;
                case "loki":
                    if (!lokiSettings) {
                        throw new Error("Loki settings are required for loki transport");
                    }
                    transportsList.push(new LokiTransport({
                        labels,
                        host: lokiSettings.host,
                        basicAuth: lokiSettings.username
                            && lokiSettings.password
                            && lokiSettings.username !== ""
                            && lokiSettings.password !== ""
                            ? `${lokiSettings.username}:${lokiSettings.password}`
                            : undefined,
                        format: winston_1.format.simple(),
                        json: true,
                        onConnectionError: console.error,
                        interval: 5,
                        timeout: 5
                    }));
                    break;
                default:
                    throw new Error(`Unknown log location: ${location}`);
            }
        }
        const formatToUse = Object.keys(labels).length > 0
            ? winston_1.format.combine(winston_1.format.metadata(), winston_1.format.label({ label: Object.entries(labels).map(l => `${l[0]}=${l[1]}`)
                    .join(",") }), winston_1.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss.SSS"
            }), myFormatWithLabel)
            : winston_1.format.combine(winston_1.format.metadata(), winston_1.format.timestamp({
                format: "YYYY-MM-DD HH:mm:ss.SSS"
            }), myFormat);
        this.logger = (0, winston_1.createLogger)({
            level,
            format: formatToUse,
            transports: transportsList
        });
        console.log("Logger initialized with level:", level);
        console.log("Logger transports:", locations);
        console.log("Logger labels:", labels);
    }
    static get() {
        if (!this.logger) {
            throw new Error("Logger not initialized");
        }
        return this.logger;
    }
    static isInitialized() {
        return Boolean(this.logger);
    }
    static error(message, metadata) {
        this.get().error(message, metadata);
    }
    static errorWithObj(message, e) {
        if (e instanceof Error) {
            this.get().error(message, e);
        }
        else {
            this.get().error(message, new Error(String(e)));
        }
    }
    static warn(message, metadata) {
        this.get().warn(message, metadata);
    }
    static info(message, metadata) {
        this.get().info(message, metadata);
    }
    static debug(message, metadata) {
        this.get().debug(message, metadata);
    }
}
exports.DraftBotLogger = DraftBotLogger;
//# sourceMappingURL=DraftBotLogger.js.map