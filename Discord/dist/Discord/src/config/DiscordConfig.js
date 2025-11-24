"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
exports.getDatabaseConfiguration = getDatabaseConfiguration;
const toml_1 = require("toml");
const fs_1 = require("fs");
function loadConfig() {
    var _a, _b, _c;
    const config = (0, toml_1.parse)((0, fs_1.readFileSync)(`${process.cwd()}/config/config.toml`, "utf-8"));
    return {
        BADGE_MANAGER_ROLE: config.roles.badge_manager_ids,
        CONSOLE_CHANNEL_ID: config.channels.console_channel_id,
        CONTRIBUTORS_CHANNEL: config.channels.contributor_channel,
        CONTRIBUTOR_ROLE: config.roles.contributor_role_id,
        DISCORD_CLIENT_TOKEN: config.general.token,
        DM_MANAGER_ID: config.users.dm_manager_id,
        ENGLISH_ANNOUNCEMENT_CHANNEL_ID: config.channels.english_announcements_channel_id,
        FRENCH_ANNOUNCEMENT_CHANNEL_ID: config.channels.french_announcements_channel_id,
        MAIN_SERVER_ID: config.general.main_server_id,
        KEYCLOAK_REALM: config.keycloak.realm,
        KEYCLOAK_URL: config.keycloak.url,
        KEYCLOAK_CLIENT_ID: config.keycloak.clientId,
        KEYCLOAK_CLIENT_SECRET: config.keycloak.clientSecret,
        TEST_MODE: config.general.test_mode,
        MQTT_HOST: config.mqtt.host,
        MARIADB_HOST: config.database.host,
        MARIADB_USER: config.database.user,
        MARIADB_PASSWORD: config.database.password,
        MARIADB_ROOT_PASSWORD: config.database.root_password,
        MARIADB_PORT: config.database.port,
        PREFIX: config.general.prefix,
        DBL_TOKEN: config.discord_bot_list.token,
        WEB_SERVER_PORT: config.others.webserver_port,
        LOGGER_LEVEL: config.logs.level,
        LOGGER_LOCATIONS: config.logs.locations,
        LOKI_HOST: (_a = config.logs.loki) === null || _a === void 0 ? void 0 : _a.host,
        LOKI_USERNAME: (_b = config.logs.loki) === null || _b === void 0 ? void 0 : _b.username,
        LOKI_PASSWORD: (_c = config.logs.loki) === null || _c === void 0 ? void 0 : _c.password
    };
}
function getDatabaseConfiguration(config, databaseName) {
    return {
        host: config.MARIADB_HOST,
        port: config.MARIADB_PORT,
        rootUser: "root",
        rootPassword: config.MARIADB_ROOT_PASSWORD,
        user: config.MARIADB_USER,
        userPassword: config.MARIADB_PASSWORD,
        databaseName,
        prefix: config.PREFIX
    };
}
//# sourceMappingURL=DiscordConfig.js.map