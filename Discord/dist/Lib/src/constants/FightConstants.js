"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FightConstants = void 0;
class FightConstants {
}
exports.FightConstants = FightConstants;
FightConstants.RARE_SUB_TEXT_INTRO = 0.001;
FightConstants.MAX_TURNS = 24;
FightConstants.REQUIRED_LEVEL = 8;
FightConstants.POINTS_REGEN_MINUTES = 7;
FightConstants.POINTS_REGEN_AMOUNT = 130;
FightConstants.REWARDS = {
    NUMBER_OF_WIN_THAT_AWARD_SCORE_BONUS: 3,
    SCORE_BONUS_AWARD: 35,
    WIN_MONEY_BONUS: 50,
    DRAW_MONEY_BONUS: 30,
    LOSS_MONEY_BONUS: 15,
    MAX_MONEY_BONUS: 200
};
FightConstants.POTION_NO_DRINK_PROBABILITY = {
    PLAYER: 0.3,
    AI: 0.85
};
FightConstants.DAMAGE_RANDOM_VARIATION = 5;
FightConstants.PLAYER_LEVEL_MINIMAL_MALUS = -55;
FightConstants.PLAYER_LEVEL_MAXIMAL_BONUS = 55;
FightConstants.MAX_PLAYER_LEVEL_FOR_BONUSES = 75;
FightConstants.CRITICAL_HIT_MULTIPLIER = 1.5;
FightConstants.OUT_OF_BREATH_FAILURE_PROBABILITY = 0.8;
FightConstants.FAILURE_DIVIDERS = [
    0.25,
    0.2,
    0.125,
    0.1,
    0
];
FightConstants.MAX_HISTORY_LENGTH = 1950;
FightConstants.OPERATOR = {
    PLUS: "+",
    MINUS: "-"
};
FightConstants.FIGHT_ACTIONS = {
    ALTERATION: {
        BLIND: "blind",
        BURNED: "burned",
        CONCENTRATED: "concentrated",
        CONFUSED: "confused",
        CURSED: "cursed",
        DIRTY: "dirty",
        FROZEN: "frozen",
        FULL: "full",
        OUTRAGE: "outrage",
        OUT_OF_BREATH: "outOfBreath",
        PARALYZED: "paralyzed",
        PETRIFIED: "petrified",
        POISONED: "poisoned",
        PROTECTED: "protected",
        SLOWED: "slowed",
        STUNNED: "stunned",
        SWALLOWED: "swallowed",
        TARGETED: "targeted",
        WEAK: "weak"
    },
    MONSTER: {
        AERIAL_DIVE_ATTACK: "aerialDiveAttack",
        BLIZZARD_RAGE_ATTACK: "blizzardRageAttack",
        BOULDER_TOSS_ATTACK: "boulderTossAttack",
        CHARGE_CHARGE_RADIANT_BLAST_ATTACK: "chargeChargeRadiantBlastAttack",
        CHARGE_CLUB_SMASH_ATTACK: "chargeClubSmashAttack",
        CHARGE_RADIANT_BLAST_ATTACK: "chargeRadiantBlastAttack",
        CLAW_ATTACK: "clawAttack",
        CLUB_SMASH_ATTACK: "clubSmashAttack",
        CRYSTALLINE_ARMOR_ATTACK: "crystallineArmorAttack",
        ERUPTION_ATTACK: "eruptionAttack",
        FAMILY_MEAL_ATTACK: "familyMealAttack",
        FROZEN_KISS_ATTACK: "frozenKissAttack",
        GLACIAL_BREATH_ATTACK: "glacialBreathAttack",
        GLACIAL_CAVE_COLLAPSE_ATTACK: "glacialCaveCollapseAttack",
        GRAB_AND_THROW_ATTACK: "grabAndThrowAttack",
        HAMMER_QUAKE_ATTACK: "hammerQuakeAttack",
        HEAT_DRAIN_ATTACK: "heatDrainAttack",
        HEAT_MUD_ATTACK: "heatMudAttack",
        ICY_SEDUCTION_ATTACK: "icySeductionAttack",
        IS_STUCK_IN_POLAR_EMBRACE: "isStuckInPolarEmbrace",
        LAVA_WAVE_ATTACK: "lavaWaveAttack",
        MAGIC_MIMIC_ATTACK: "magicMimicAttack",
        MAGMA_BATH_ATTACK: "magmaBathAttack",
        MUD_SHOT_ATTACK: "mudShotAttack",
        OUTRAGE_ATTACK: "outrageAttack",
        PETRIFICATION_ATTACK: "petrificationAttack",
        RADIANT_BLAST_ATTACK: "radiantBlastAttack",
        ROAR_ATTACK: "roarAttack",
        ROCK_SHIELD_ATTACK: "rockShieldAttack",
        SLAM_ATTACK: "slamAttack",
        SPECTRAL_REVENGE_ATTACK: "spectralRevengeAttack",
        START_POLAR_EMBRACE_ATTACK: "startPolarEmbraceAttack",
        STEALTH: "stealth",
        STONE_SKIN_ATTACK: "stoneSkinAttack",
        SUMMON_ATTACK: "summonAttack",
        WEB_SHOT_ATTACK: "webShotAttack"
    },
    PET: {
        BITE: "bite",
        BOOST_DEFENSE: "boostDefense",
        BOOST_SPEED: "boostSpeed",
        BUILD_BARRAGE: "buildBarrage",
        CLAWS: "claws",
        CREATE_BOMB: "createBomb",
        CRUSH: "crush",
        ELEPHANT_REMEMBER_LAST_ACTION: "elephantRememberLastAction",
        FISH_PROTECT_AGAINST_FIRE: "fishProtectAgainstFire",
        GOES_WILD: "goesWild",
        HEAL_EVERYONE: "healEveryone",
        HEAL_OWNER_IN_ENERGY_RANGE: "healOwnerInEnergyRange",
        HELP_BREATHE: "helpBreathe",
        HORN: "horn",
        HYPNOSIS: "hypnosis",
        IS_USELESS: "isUseless",
        MEDUSE_PARALYZE: "meduseParalyze",
        PECK: "peck",
        PET_CHARGE: "petCharge",
        PET_CURSE: "petCurse",
        PET_HIT: "petHit",
        PET_POISON: "petPoison",
        PET_SMALL_CHARGE: "petSmallCharge",
        PINCH: "pinch",
        POISONOUS_BITE: "poisonousBite",
        PROTECT_AGAINST_COLD: "protectAgainstCold",
        RAINBOW_POWER: "rainbowPower",
        REVENGE: "revenge",
        SCARE_ELEPHANT: "scareElephant",
        SCARE_FISH: "scareFish",
        SLIPPING: "slipping",
        SMALL_BITE: "smallBite",
        SMALL_CLAWS: "smallClaws",
        SMALL_REGEN: "smallRegen",
        SNOW_BALL: "snowBall",
        SPIT: "spit",
        SPIT_FIRE: "spitFire",
        SPIT_INK: "spitInk",
        STEAL_WEAPON: "stealWeapon",
        SWALLOW: "swallow",
        TRIES_TO_HELP: "triesToHelp",
        UN_BLIND: "unBlind",
        USE_TOOL: "useTool",
        VAMPIRISM: "vampirism"
    },
    PLAYER: {
        BENEDICTION: "benediction",
        BOOMERANG_ATTACK: "boomerangAttack",
        BREATH_TAKING_ATTACK: "breathTakingAttack",
        CANON_ATTACK: "canonAttack",
        CHARGE_CHARGING_ATTACK: "chargeChargingAttack",
        CHARGE_ULTIMATE_ATTACK: "chargeUltimateAttack",
        CHARGING_ATTACK: "chargingAttack",
        CONCENTRATION: "concentration",
        COUNTER_ATTACK: "counterAttack",
        CURSED_ATTACK: "cursedAttack",
        DARK_ATTACK: "darkAttack",
        DEFENSE_BUFF: "defenseBuff",
        DIVINE_ATTACK: "divineAttack",
        ENERGETIC_ATTACK: "energeticAttack",
        FIRE_ATTACK: "fireAttack",
        GET_DIRTY: "getDirty",
        GUILD_ATTACK: "guildAttack",
        HEAVY_ATTACK: "heavyAttack",
        INTENSE_ATTACK: "intenseAttack",
        NONE: "none",
        PIERCING_ATTACK: "piercingAttack",
        POISONOUS_ATTACK: "poisonousAttack",
        POWERFUL_ATTACK: "powerfulAttack",
        PROTECTION: "protection",
        QUICK_ATTACK: "quickAttack",
        RAGE_EXPLOSION: "rageExplosion",
        RAM_ATTACK: "ramAttack",
        RESTING: "resting",
        SABOTAGE_ATTACK: "sabotageAttack",
        SHIELD_ATTACK: "shieldAttack",
        SIMPLE_ATTACK: "simpleAttack",
        ULTIMATE_ATTACK: "ultimateAttack"
    }
};
FightConstants.UNCOUNTERABLE_ACTIONS = [
    FightConstants.FIGHT_ACTIONS.PLAYER.ULTIMATE_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.BENEDICTION,
    FightConstants.FIGHT_ACTIONS.PLAYER.DIVINE_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.NONE,
    FightConstants.FIGHT_ACTIONS.PLAYER.POISONOUS_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.CONCENTRATION,
    FightConstants.FIGHT_ACTIONS.PLAYER.RESTING,
    FightConstants.FIGHT_ACTIONS.PLAYER.PROTECTION,
    FightConstants.FIGHT_ACTIONS.PLAYER.COUNTER_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.DEFENSE_BUFF,
    FightConstants.FIGHT_ACTIONS.PLAYER.FIRE_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.BREATH_TAKING_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.DARK_ATTACK,
    FightConstants.FIGHT_ACTIONS.PLAYER.CURSED_ATTACK,
    FightConstants.FIGHT_ACTIONS.ALTERATION.OUT_OF_BREATH,
    FightConstants.FIGHT_ACTIONS.MONSTER.OUTRAGE_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.ROAR_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.SUMMON_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.STEALTH,
    FightConstants.FIGHT_ACTIONS.MONSTER.ERUPTION_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.MAGMA_BATH_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.LAVA_WAVE_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.MUD_SHOT_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.HEAT_MUD_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.HEAT_DRAIN_ATTACK
];
FightConstants.GOD_MOVES = [
    FightConstants.FIGHT_ACTIONS.PLAYER.BENEDICTION,
    FightConstants.FIGHT_ACTIONS.PLAYER.DIVINE_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.RADIANT_BLAST_ATTACK,
    FightConstants.FIGHT_ACTIONS.MONSTER.HAMMER_QUAKE_ATTACK
];
FightConstants.ELO = {
    DEFAULT_ELO: 0,
    MAX_ELO_GAP: 400,
    DEFAULT_K_FACTOR: 32,
    LOW_K_FACTOR: 24,
    VERY_LOW_K_FACTOR: 16,
    LOW_K_FACTOR_THRESHOLD: 2100,
    VERY_LOW_K_FACTOR_THRESHOLD: 2400,
    LOW_LEVEL_BONUS_THRESHOLD: 1000,
    MAX_RANK_FOR_LEAGUE_POINTS_REWARD: 200,
    ELO_DIFFERENCE_FOR_SAME_ELO: 30
};
FightConstants.FIGHT_COUNTDOWN_MAXIMAL_VALUE = 0;
FightConstants.FIGHT_COUNTDOWN_REGEN_LIMIT = 7;
FightConstants.DEFAULT_FIGHT_COUNTDOWN = 10;
FightConstants.DEFENDER_COOLDOWN_MINUTES = 30;
FightConstants.MAX_OFFSET_FOR_OPPONENT_SEARCH = 5;
FightConstants.ACTIVE_PLAYER_PER_OPPONENT_SEARCH = 6;
FightConstants.PLAYER_PER_OPPONENT_SEARCH = 10;
FightConstants.ATTACK_GLORY_TO_DEFENSE_GLORY_EACH_WEEK = 50;
FightConstants.MAX_DEFENSE_GLORY_FOR_TRANSFER = 1400;
FightConstants.PURGE_TIMEOUT = 60000;
FightConstants.HISTORY_LIMIT = 20;
FightConstants.HISTORY_DISPLAY_LIMIT = 5;
FightConstants.ACTIVE_PLAYER_TIME_LIMIT_DAYS = 14;
//# sourceMappingURL=FightConstants.js.map