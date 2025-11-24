"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PET_ENTITY_GIVE_RETURN = exports.PetConstants = exports.PetDiet = void 0;
const FightConstants_1 = require("./FightConstants");
var PetDiet;
(function (PetDiet) {
    PetDiet["CARNIVOROUS"] = "carnivorous";
    PetDiet["HERBIVOROUS"] = "herbivorous";
    PetDiet["OMNIVOROUS"] = "omnivorous";
})(PetDiet || (exports.PetDiet = PetDiet = {}));
class PetConstants {
}
exports.PetConstants = PetConstants;
_a = PetConstants;
PetConstants.NICKNAME_LENGTH_RANGE = {
    MIN: 3,
    MAX: 16
};
PetConstants.PET_AGE_GROUP_NAMES = {
    ANCESTOR: "ancestor",
    VERY_OLD: "veryOld",
    OLD: "old",
    ADULT: "adult",
    OTHER: "other"
};
PetConstants.PET_AGE_GROUPS_THRESHOLDS = {
    ANCESTOR: 100,
    VERY_OLD: 1000,
    OLD: 5000,
    ADULT: 20000
};
PetConstants.PET_INTERACTIONS_NAMES = {
    WIN_MONEY: "money",
    WIN_HEALTH: "gainLife",
    WIN_LOVE: "gainLove",
    WIN_ENERGY: "gainEnergy",
    WIN_FOOD: "food",
    NOTHING: "nothing",
    WIN_TIME: "gainTime",
    WIN_POINTS: "points",
    WIN_BADGE: "badge",
    LOSE_HEALTH: "loseLife",
    LOSE_MONEY: "loseMoney",
    LOSE_TIME: "loseTime",
    PET_FLEE: "petFlee",
    LOSE_LOVE: "loseLove",
    WIN_ITEM: "item"
};
PetConstants.PET_INTERACTIONS = {
    PET_NORMAL: [
        {},
        {
            WIN_ENERGY: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_ENERGY, probabilityWeight: 9
            },
            WIN_FOOD: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_FOOD, probabilityWeight: 5
            },
            NOTHING: {
                name: _a.PET_INTERACTIONS_NAMES.NOTHING, probabilityWeight: 15
            },
            WIN_POINTS: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_POINTS, probabilityWeight: 5
            }
        },
        {
            WIN_LOVE: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_LOVE, probabilityWeight: 6
            }
        },
        {
            WIN_MONEY: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_MONEY, probabilityWeight: 9
            },
            WIN_TIME: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_TIME, probabilityWeight: 4
            }
        },
        {
            WIN_HEALTH: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_HEALTH, probabilityWeight: 5
            }
        },
        {
            WIN_ITEM: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_ITEM, probabilityWeight: 3
            }
        },
        {
            WIN_BADGE: {
                name: _a.PET_INTERACTIONS_NAMES.WIN_BADGE, probabilityWeight: 1
            }
        }
    ],
    PET_FEISTY: {
        LOSE_HEALTH: {
            name: _a.PET_INTERACTIONS_NAMES.LOSE_HEALTH, probabilityWeight: 5
        },
        LOSE_MONEY: {
            name: _a.PET_INTERACTIONS_NAMES.LOSE_MONEY, probabilityWeight: 5
        },
        LOSE_TIME: {
            name: _a.PET_INTERACTIONS_NAMES.LOSE_TIME, probabilityWeight: 5
        },
        PET_FLEE: {
            name: _a.PET_INTERACTIONS_NAMES.PET_FLEE, probabilityWeight: 1
        },
        LOSE_LOVE: {
            name: _a.PET_INTERACTIONS_NAMES.LOSE_LOVE, probabilityWeight: 5
        }
    }
};
PetConstants.BREED_COOLDOWN = 60 * 60 * 1000;
PetConstants.MAX_LOVE_POINTS = 100;
PetConstants.BASE_LOVE = 10;
PetConstants.GUILD_LEVEL_USED_FOR_NO_GUILD_LOOT = 20;
PetConstants.LOVE_LEVELS = [
    5,
    20,
    50
];
PetConstants.LOVE_LEVEL = {
    FEISTY: 1,
    WILD: 2,
    FEARFUL: 3,
    TAMED: 4,
    TRAINED: 5
};
PetConstants.SELL_PRICE = {
    MIN: 100,
    MAX: 50000
};
PetConstants.SLOTS = 6;
PetConstants.PROBABILITIES = [
    [
        0.9000,
        0.0900,
        0.0090,
        0.0009,
        0.0001
    ],
    [
        0.8940,
        0.0916,
        0.0109,
        0.0023,
        0.0012
    ],
    [
        0.8760,
        0.0964,
        0.0166,
        0.0065,
        0.0045
    ],
    [
        0.8460,
        0.1044,
        0.0262,
        0.0135,
        0.0099
    ],
    [
        0.8040,
        0.1156,
        0.0396,
        0.0233,
        0.0175
    ],
    [
        0.7500,
        0.1300,
        0.0568,
        0.0359,
        0.0273
    ],
    [
        0.6840,
        0.1476,
        0.0778,
        0.0513,
        0.0393
    ],
    [
        0.6060,
        0.1684,
        0.1026,
        0.0695,
        0.0535
    ],
    [
        0.5160,
        0.1924,
        0.1312,
        0.0905,
        0.0699
    ],
    [
        0.4140,
        0.2196,
        0.1637,
        0.1143,
        0.0884
    ],
    [
        0.3000,
        0.2500,
        0.2000,
        0.1409,
        0.1091
    ]
];
PetConstants.RESTRICTIVES_DIETS = {
    CARNIVOROUS: PetDiet.CARNIVOROUS,
    HERBIVOROUS: PetDiet.HERBIVOROUS
};
PetConstants.PET_FOOD = {
    COMMON_FOOD: "commonFood",
    CARNIVOROUS_FOOD: "carnivorousFood",
    HERBIVOROUS_FOOD: "herbivorousFood",
    ULTIMATE_FOOD: "ultimateFood"
};
PetConstants.PET_FOOD_BY_ID = [
    _a.PET_FOOD.COMMON_FOOD,
    _a.PET_FOOD.HERBIVOROUS_FOOD,
    _a.PET_FOOD.CARNIVOROUS_FOOD,
    _a.PET_FOOD.ULTIMATE_FOOD
];
PetConstants.PETS = {
    NO_PET: 0,
    DOG: 1,
    POODLE: 2,
    CAT: 3,
    BLACK_CAT: 4,
    MOUSE: 5,
    HAMSTER: 6,
    RABBIT: 7,
    COW: 8,
    PIG: 9,
    CHICKEN: 10,
    BIRD: 11,
    DUCK: 12,
    HORSE: 13,
    TURTLE: 14,
    SNAKE: 15,
    LIZARD: 16,
    SHEEP: 17,
    GOAT: 18,
    TURKEY: 19,
    FOX: 20,
    BEAR: 21,
    KOALA: 22,
    FROG: 23,
    MONKEY: 24,
    PENGUIN: 25,
    OWL: 26,
    BAT: 27,
    WOLF: 28,
    BOAR: 29,
    SEAL: 30,
    HIPPO: 31,
    LLAMA: 32,
    SWAN: 33,
    FLAMINGO: 34,
    RACCOON: 35,
    SKUNK: 36,
    BADGER: 37,
    BEAVER: 38,
    SLOTH: 39,
    CHIPMUNK: 40,
    HEDGEHOG: 41,
    POLAR_BEAR: 42,
    PANDA: 43,
    SCORPION: 44,
    CROCODILE: 45,
    ELEPHANT: 46,
    ZEBRA: 47,
    RHINO: 48,
    DROMEDARY: 49,
    CAMEL: 50,
    GIRAFFE: 51,
    KANGAROO: 52,
    PEACOCK: 53,
    PARROT: 54,
    OTTER: 55,
    TIGER: 56,
    LION: 57,
    EAGLE: 58,
    DODO: 59,
    LEOPARD: 60,
    MAMMOTH: 61,
    DOVE: 62,
    UNICORN: 63,
    DRAGON: 64,
    T_REX: 65,
    STITCH: 66,
    SNOWMAN: 67,
    SCARLET_DUCK: 68,
    SNOW_PERSON: 69,
    ALIEN: 70,
    OCTOPUS: 71,
    EMPEROR_PENGUIN: 72,
    FISH: 73,
    TROPICAL_FISH: 74,
    PUFFERFISH: 75,
    JELLYFISH: 76,
    SHARK: 77,
    WHALE: 78,
    WHALE_2: 79,
    SHRIMP: 80,
    LOBSTER: 81,
    DOLPHIN: 82,
    PHOENIX: 83,
    DINOSAUR: 84,
    SNAIL: 85,
    CRAB: 86,
    DEER: 87,
    WATER_BUFFALO: 88,
    BISON: 89,
    ORANGUTAN: 90,
    GORILLA: 91,
    CHICK: 92,
    RAT: 93,
    BLACK_BIRD: 94,
    RAVEN: 95
};
PetConstants.PET_BEHAVIORS = [
    {
        petIds: [_a.PETS.SHARK],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SCARE_FISH
    },
    {
        petIds: [
            _a.PETS.FISH,
            _a.PETS.TROPICAL_FISH,
            _a.PETS.PUFFERFISH,
            _a.PETS.DOLPHIN
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.FISH_PROTECT_AGAINST_FIRE
    },
    {
        petIds: [
            _a.PETS.LION,
            _a.PETS.TIGER,
            _a.PETS.LEOPARD
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.CLAWS
    },
    {
        petIds: [
            _a.PETS.CAT,
            _a.PETS.BADGER
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SMALL_CLAWS
    },
    {
        petIds: [_a.PETS.DRAGON],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SPIT_FIRE
    },
    {
        petIds: [
            _a.PETS.DOG,
            _a.PETS.POODLE,
            _a.PETS.FOX,
            _a.PETS.WOLF,
            _a.PETS.CROCODILE
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.BITE
    },
    {
        petIds: [
            _a.PETS.SCORPION,
            _a.PETS.SNAKE
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.POISONOUS_BITE
    },
    {
        petIds: [_a.PETS.MOUSE],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SCARE_ELEPHANT
    },
    {
        petIds: [_a.PETS.ELEPHANT],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.ELEPHANT_REMEMBER_LAST_ACTION
    },
    {
        petIds: [
            _a.PETS.HAMSTER,
            _a.PETS.RABBIT,
            _a.PETS.TURKEY,
            _a.PETS.CHIPMUNK,
            _a.PETS.FLAMINGO,
            _a.PETS.CHICK
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.TRIES_TO_HELP
    },
    {
        petIds: [
            _a.PETS.CHICKEN,
            _a.PETS.DUCK,
            _a.PETS.PEACOCK,
            _a.PETS.BIRD,
            _a.PETS.DODO,
            _a.PETS.PARROT,
            _a.PETS.BLACK_BIRD
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PECK
    },
    {
        petIds: [
            _a.PETS.KOALA,
            _a.PETS.SLOTH,
            _a.PETS.SHRIMP,
            _a.PETS.PANDA,
            _a.PETS.SNAIL
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.IS_USELESS
    },
    {
        petIds: [
            _a.PETS.COW,
            _a.PETS.BEAR,
            _a.PETS.BOAR,
            _a.PETS.BISON,
            _a.PETS.WATER_BUFFALO
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PET_CHARGE
    },
    {
        petIds: [
            _a.PETS.SHEEP,
            _a.PETS.GOAT,
            _a.PETS.SWAN,
            _a.PETS.PIG
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PET_SMALL_CHARGE
    },
    {
        petIds: [
            _a.PETS.FROG,
            _a.PETS.SKUNK
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PET_POISON
    },
    {
        petIds: [
            _a.PETS.BLACK_CAT,
            _a.PETS.RAVEN
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PET_CURSE
    },
    {
        petIds: [
            _a.PETS.HORSE,
            _a.PETS.ZEBRA,
            _a.PETS.DROMEDARY,
            _a.PETS.CAMEL
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.BOOST_SPEED
    },
    {
        petIds: [_a.PETS.TURTLE],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.BOOST_DEFENSE
    },
    {
        petIds: [_a.PETS.LIZARD],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SMALL_REGEN
    },
    {
        petIds: [
            _a.PETS.SNOWMAN,
            _a.PETS.SNOW_PERSON
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SNOW_BALL
    },
    {
        petIds: [
            _a.PETS.MAMMOTH,
            _a.PETS.POLAR_BEAR
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PROTECT_AGAINST_COLD
    },
    {
        petIds: [_a.PETS.JELLYFISH],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.MEDUSE_PARALYZE
    },
    {
        petIds: [_a.PETS.HEDGEHOG],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.REVENGE
    },
    {
        petIds: [
            _a.PETS.MONKEY,
            _a.PETS.RACCOON
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.STEAL_WEAPON
    },
    {
        petIds: [_a.PETS.BAT],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.VAMPIRISM
    },
    {
        petIds: [_a.PETS.UNICORN],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.RAINBOW_POWER
    },
    {
        petIds: [
            _a.PETS.T_REX,
            _a.PETS.STITCH,
            _a.PETS.HIPPO
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.GOES_WILD
    },
    {
        petIds: [
            _a.PETS.PENGUIN,
            _a.PETS.EMPEROR_PENGUIN
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SLIPPING
    },
    {
        petIds: [
            _a.PETS.OWL,
            _a.PETS.EAGLE,
            _a.PETS.GIRAFFE
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.UN_BLIND
    },
    {
        petIds: [_a.PETS.OCTOPUS],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SPIT_INK
    },
    {
        petIds: [
            _a.PETS.KANGAROO,
            _a.PETS.GORILLA
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PET_HIT
    },
    {
        petIds: [
            _a.PETS.RHINO,
            _a.PETS.DEER
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.HORN
    },
    {
        petIds: [_a.PETS.DOVE],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.HEAL_EVERYONE
    },
    {
        petIds: [
            _a.PETS.LOBSTER,
            _a.PETS.CRAB
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.PINCH
    },
    {
        petIds: [_a.PETS.ALIEN],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.HYPNOSIS
    },
    {
        petIds: [
            _a.PETS.OTTER,
            _a.PETS.SEAL
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.HELP_BREATHE
    },
    {
        petIds: [_a.PETS.LLAMA],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SPIT
    },
    {
        petIds: [
            _a.PETS.WHALE,
            _a.PETS.WHALE_2
        ],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SWALLOW
    },
    {
        petIds: [_a.PETS.BEAVER],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.BUILD_BARRAGE
    },
    {
        petIds: [_a.PETS.SCARLET_DUCK],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.CREATE_BOMB
    },
    {
        petIds: [_a.PETS.PHOENIX],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.HEAL_OWNER_IN_ENERGY_RANGE
    },
    {
        petIds: [_a.PETS.DINOSAUR],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.CRUSH
    },
    {
        petIds: [_a.PETS.ORANGUTAN],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.USE_TOOL
    },
    {
        petIds: [_a.PETS.RAT],
        behaviorId: FightConstants_1.FightConstants.FIGHT_ACTIONS.PET.SMALL_BITE
    }
];
PetConstants.PET_FOOD_LOVE_POINTS_AMOUNT = [
    1,
    3,
    3,
    5
];
PetConstants.FLYING_PETS = [
    _a.PETS.BIRD,
    _a.PETS.DUCK,
    _a.PETS.OWL,
    _a.PETS.BAT,
    _a.PETS.SWAN,
    _a.PETS.FLAMINGO,
    _a.PETS.PARROT,
    _a.PETS.EAGLE,
    _a.PETS.DOVE,
    _a.PETS.DRAGON,
    _a.PETS.SCARLET_DUCK,
    _a.PETS.BLACK_BIRD,
    _a.PETS.RAVEN,
    _a.PETS.PHOENIX
];
var PET_ENTITY_GIVE_RETURN;
(function (PET_ENTITY_GIVE_RETURN) {
    PET_ENTITY_GIVE_RETURN[PET_ENTITY_GIVE_RETURN["NO_SLOT"] = 0] = "NO_SLOT";
    PET_ENTITY_GIVE_RETURN[PET_ENTITY_GIVE_RETURN["GUILD"] = 1] = "GUILD";
    PET_ENTITY_GIVE_RETURN[PET_ENTITY_GIVE_RETURN["PLAYER"] = 2] = "PLAYER";
})(PET_ENTITY_GIVE_RETURN || (exports.PET_ENTITY_GIVE_RETURN = PET_ENTITY_GIVE_RETURN = {}));
//# sourceMappingURL=PetConstants.js.map