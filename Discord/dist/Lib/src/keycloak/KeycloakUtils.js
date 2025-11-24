"use strict";
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
exports.KeycloakUtils = void 0;
function formatApiCallError(res) {
    return __awaiter(this, void 0, void 0, function* () {
        let payload;
        try {
            payload = yield res.json();
        }
        catch (_a) {
            payload = {};
        }
        return {
            status: res.status,
            payload: "error" in payload ? payload : {},
            isError: true
        };
    });
}
function formatApiCallOk(res, payload) {
    return {
        status: res.status,
        payload,
        isError: false
    };
}
class KeycloakUtils {
    static getUserGroups(keycloakConfig, keycloakId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.nextCacheClean || this.nextCacheClean < new Date()) {
                this.keycloakUserGroupsMap.clear();
                this.nextCacheClean = new Date(Date.now() + this.cacheCleanInterval);
            }
            else {
                const groups = this.keycloakUserGroupsMap.get(keycloakId);
                if (groups) {
                    return {
                        status: 200,
                        payload: { groups },
                        isError: false
                    };
                }
            }
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users/${keycloakId}/groups`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const groups = (yield res.json()).map(group => group.name);
            this.keycloakUserGroupsMap.set(keycloakId, groups);
            return formatApiCallOk(res, { groups });
        });
    }
    static getUserByKeycloakId(keycloakConfig, keycloakId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users/${keycloakId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, { user: yield res.json() });
        });
    }
    static getUserIdByUsername(keycloakConfig, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users?username=${username}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const obj = yield res.json();
            if (obj.length === 0) {
                return formatApiCallOk(res, {});
            }
            return formatApiCallOk(res, { user: obj[0] });
        });
    }
    static registerUser(keycloakConfig, registerParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const attributes = {};
            attributes.language = [registerParams.language];
            attributes.gameUsername = [registerParams.gameUsername];
            if (registerParams.discordId) {
                attributes.discordId = [registerParams.discordId];
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: registerParams.keycloakUsername,
                    attributes,
                    enabled: true,
                    credentials: registerParams.password
                        ? [
                            {
                                type: "password",
                                value: registerParams.password,
                                temporary: false
                            }
                        ]
                        : undefined
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const getUser = yield this.getUserIdByUsername(keycloakConfig, registerParams.keycloakUsername);
            if (getUser.isError || !("user" in getUser.payload)) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, { user: getUser.payload.user });
        });
    }
    static getDiscordUser(keycloakConfig, discordId, gameUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users?q=discordId:${discordId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const obj = yield res.json();
            const user = obj.length === 1 ? obj[0] : null;
            if (user) {
                if (gameUsername && user.attributes.gameUsername[0] !== gameUsername) {
                    yield KeycloakUtils.updateGameUsername(user, gameUsername, keycloakConfig);
                }
                KeycloakUtils.keycloakDiscordToIdMap.set(discordId, user.id);
            }
            return formatApiCallOk(res, { user });
        });
    }
    static getOrRegisterDiscordUser(keycloakConfig, discordId, gameUsername, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield this.getUserFromDiscordId(keycloakConfig, discordId);
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const obj = yield res.json();
            let user;
            if (obj.length === 0) {
                const registerUser = yield this.registerUser(keycloakConfig, {
                    keycloakUsername: `discord-${discordId}`,
                    gameUsername,
                    discordId,
                    language
                });
                if (registerUser.isError) {
                    return registerUser;
                }
                user = registerUser.payload.user;
            }
            else {
                user = obj[0];
                if (gameUsername && user.attributes.gameUsername[0] !== gameUsername) {
                    yield KeycloakUtils.updateGameUsername(user, gameUsername, keycloakConfig);
                }
            }
            KeycloakUtils.keycloakDiscordToIdMap.set(discordId, user.id);
            return formatApiCallOk(res, { user });
        });
    }
    static getKeycloakIdFromDiscordId(keycloakConfig, discordId, gameUsername) {
        return __awaiter(this, void 0, void 0, function* () {
            const cachedId = KeycloakUtils.keycloakDiscordToIdMap.get(discordId);
            if (cachedId) {
                return {
                    status: 200,
                    payload: { keycloakId: cachedId },
                    isError: false
                };
            }
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield this.getUserFromDiscordId(keycloakConfig, discordId);
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const obj = yield res.json();
            const user = obj.length === 0 ? null : obj[0];
            const id = user === null || user === void 0 ? void 0 : user.id;
            if (user && id) {
                KeycloakUtils.keycloakDiscordToIdMap.set(discordId, id);
                if (gameUsername && user.attributes.gameUsername[0] !== gameUsername) {
                    yield KeycloakUtils.updateGameUsername(user, gameUsername, keycloakConfig);
                }
            }
            return formatApiCallOk(res, { keycloakId: id });
        });
    }
    static updateUserLanguage(keycloakConfig, user, newLanguage) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const attributes = user.attributes;
            attributes.language = [newLanguage];
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    attributes
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, {});
        });
    }
    static getUserLanguage(user) {
        return user.attributes.language[0];
    }
    static getUsersFromIds(keycloakConfig, keycloakIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const users = [];
            for (const keycloakId of keycloakIds) {
                const getUser = yield KeycloakUtils.getUserByKeycloakId(keycloakConfig, keycloakId);
                if (getUser.isError || !("user" in getUser.payload)) {
                    return {
                        status: getUser.status,
                        payload: getUser.payload,
                        isError: true
                    };
                }
                users.push(getUser.payload.user);
            }
            return {
                status: 200,
                payload: { users },
                isError: false
            };
        });
    }
    static userExists(keycloakConfig, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users?username=${username}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            const obj = yield res.json();
            return formatApiCallOk(res, { exists: obj.length > 0 });
        });
    }
    static loginUser(keycloakConfig, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: keycloakConfig.clientId,
                    client_secret: keycloakConfig.clientSecret,
                    username,
                    password,
                    grant_type: "password",
                    scope: "openid"
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, yield res.json());
        });
    }
    static checkUserAccessToken(keycloakConfig, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token/introspect`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: keycloakConfig.clientId,
                    client_secret: keycloakConfig.clientSecret,
                    token: accessToken
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, { valid: true });
        });
    }
    static checkTokenAndGetKeycloakId(keycloakConfig, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, { keycloakId: (yield res.json()).sub });
        });
    }
    static refreshUserToken(keycloakConfig, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: keycloakConfig.clientId,
                    client_secret: keycloakConfig.clientSecret,
                    refresh_token: refreshToken,
                    grant_type: "refresh_token"
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, yield res.json());
        });
    }
    static getUserAccessToken(keycloakConfig, keycloakId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    client_id: keycloakConfig.clientId,
                    client_secret: keycloakConfig.clientSecret,
                    grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
                    subject_token: this.keycloakToken,
                    subject_token_type: "urn:ietf:params:oauth:token-type:access_token",
                    requested_subject: keycloakId,
                    scope: "openid"
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, yield res.json());
        });
    }
    static checkAndQueryToken(keycloakConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.keycloakToken === null || this.keycloakTokenExpirationDate < Date.now()) {
                const res = yield fetch(`${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: new URLSearchParams({
                        client_id: keycloakConfig.clientId,
                        client_secret: keycloakConfig.clientSecret,
                        grant_type: "client_credentials"
                    })
                });
                if (!res.ok) {
                    return formatApiCallError(res);
                }
                const obj = yield res.json();
                this.keycloakToken = obj.access_token;
                this.keycloakTokenExpirationDate = Date.now() + obj.expires_in - Math.ceil(0.1 * obj.expires_in);
            }
            return {
                status: 200,
                payload: {},
                isError: false
            };
        });
    }
    static updateGameUsername(user, newGameUsername, keycloakConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkAndQueryToken = yield this.checkAndQueryToken(keycloakConfig);
            if (checkAndQueryToken.isError) {
                return checkAndQueryToken;
            }
            const attributes = user.attributes;
            attributes.gameUsername = [newGameUsername];
            const res = yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users/${user.id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    attributes
                })
            });
            if (!res.ok) {
                return formatApiCallError(res);
            }
            return formatApiCallOk(res, {});
        });
    }
    static getUserFromDiscordId(keycloakConfig, discordId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(`${keycloakConfig.url}/admin/realms/${keycloakConfig.realm}/users?q=discordId:${discordId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${this.keycloakToken}`,
                    "Content-Type": "application/json"
                }
            });
        });
    }
}
exports.KeycloakUtils = KeycloakUtils;
KeycloakUtils.keycloakToken = null;
KeycloakUtils.keycloakTokenExpirationDate = null;
KeycloakUtils.keycloakDiscordToIdMap = new Map();
KeycloakUtils.keycloakUserGroupsMap = new Map();
KeycloakUtils.cacheCleanInterval = 1000 * 60 * 10;
//# sourceMappingURL=KeycloakUtils.js.map