"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
const effects = new Map();
class Effect {
    static getById(id) {
        var _a;
        return (_a = effects.get(id)) !== null && _a !== void 0 ? _a : null;
    }
    static getAll() {
        return effects.values();
    }
    constructor(id, v4Id, timeMinutes) {
        this._id = id;
        this._timeMinutes = timeMinutes;
        this._v4Id = v4Id;
        effects.set(id, this);
    }
    get timeMinutes() {
        return this._timeMinutes;
    }
    get id() {
        return this._id;
    }
    get v4Id() {
        return this._v4Id;
    }
}
exports.Effect = Effect;
Effect.NOT_STARTED = new Effect("notStarted", ":baby:", 0);
Effect.DEAD = new Effect("dead", ":skull:", 16666667);
Effect.NO_EFFECT = new Effect("none", ":smiley:", 0);
Effect.SLEEPING = new Effect("sleeping", ":sleeping:", 180);
Effect.DRUNK = new Effect("drunk", ":zany_face:", 240);
Effect.FREEZING = new Effect("freezing", ":cold_face:", 60);
Effect.FEET_HURT = new Effect("feetHurt", ":foot:", 110);
Effect.HURT = new Effect("hurt", ":head_bandage:", 360);
Effect.SICK = new Effect("sick", ":sick:", 360);
Effect.JAILED = new Effect("jailed", ":lock:", 1440);
Effect.INJURED = new Effect("injured", ":dizzy_face:", 720);
Effect.OCCUPIED = new Effect("occupied", ":clock2:", 0);
Effect.STARVING = new Effect("starving", ":drooling_face:", 80);
Effect.CONFOUNDED = new Effect("confounded", ":confounded:", 40);
Effect.SCARED = new Effect("scared", ":scream:", 10);
Effect.LOST = new Effect("lost", ":face_with_monocle:", 270);
Effect.FISHED = new Effect("fished", ":fish:", 5);
//# sourceMappingURL=Effect.js.map