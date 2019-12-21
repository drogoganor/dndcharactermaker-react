interface XpLevel {
    xp: number;
    level: number;
}

export interface Race {
    id: number;
    raceid: number;
    text: string;
    page: string;
    bonuses: number[];
    speed: number;
    extraLanguages: number;
}

export interface Class {
    id: number;
    text: string;
    features: Feature[];
    armorProficiencies: number[];
    weaponProficiencies: ClassWeaponProficiency;
}

interface ClassWeaponProficiency {
  categories: number[];
  weapons: number[];
}

interface Feature {
    level: number;
    text: string;
}

interface ArmorCategory {
    id: number;
    text: string;
}

interface EquipmentCategory {
    id: number;
    text: string;
}

interface WeaponCategory {
    id: number;
    text: string;
}

interface DamageType {
    id: number;
    text: string;
}

interface ClassEquipment {
    id: number;
    equipChoices: EquipmentChoice[];
    fixedEquip?: EquipmentFixedBlock[];
}

interface EquipmentChoice {
    id: number;
    choices: EquipmentChoiceBlock[];
}

export interface EquipmentChoiceBlock {
    id: number;
    num: number;
    items: number[];
    extras?: EquipmentFixedBlock[];
}

interface EquipmentFixedBlock {
    id: number;
    num?: number;
}

export interface Equipment {
    id: number;
    type: number;
    text: string;
    weapon: boolean;
    weaponCategory?: number;
    damage?: number;
    dice?: string;
    melee?: boolean;
    thrown?: boolean;
    light?: boolean;
    twohanded?: boolean;
    weight?: number;
}

interface Backpack {
    id: number;
    contents: BackpackContent[];
}

interface BackpackContent {
    id: number;
    num: number;
}

export interface Background {
    id: number;
    text: string;
    equipment: number[];
}

interface BackgroundFeature {
    id: number;
    text: string;
}

interface BackgroundCurrency {
    id: number;
    currency: number[];
}

interface BackgroundLangauge {
    id: number;
    num: number;
}

interface ToolProficiency {
    id: number;
    text: string;
}

interface BackgroundToolProficiency {
    id: number;
    profs: number[];
}

interface PersonalityTrait {
    id: number;
    roll?: number;
    bg: number;
    text: string;
}

interface RaceLanguage {
    id: number;
    languages: number[];
}

interface RaceExtraLanguage {
    id: number;
    extras: number;
}

interface Language {
    id: number;
    text: string;
}

interface ProficiencyLevel {
    level: number;
    bonus: number;
}

interface ClassSavingThrow {
    id: number;
    throws: number[];
}

interface HitDice {
    id: number;
    num: number;
    dice: number;
}

interface StartingHP {
    id: number;
    hp: number;
}

export interface Alignment {
    id: number;
    lawfulChaotic: string;
    goodEvil: string;
}

interface BackgroundProficiency {
    id: number;
    profs: number[];
}

interface ClassProficiency {
    id: number;
    num: number;
    profs: number[];
}

interface Skill {
    id: number;
    attr: number;
    text: string;
}

interface StatBlock {
    id: number;
    text: string;
}

interface Modifier {
    val: number;
    modifier: number;
}

export default class DndProps {
    public xpLevels: XpLevel[] = [
        { xp: 0, level: 1 },
        { xp: 300, level: 2 },
        { xp: 900, level: 3 },
        { xp: 2700, level: 4 },
        { xp: 6500, level: 5 },
        { xp: 14000, level: 6 },
        { xp: 23000, level: 7 },
        { xp: 34000, level: 8 },
        { xp: 48000, level: 9 },
        { xp: 64000, level: 10 },
        { xp: 85000, level: 11 },
        { xp: 100000, level: 12 },
        { xp: 120000, level: 13 },
        { xp: 140000, level: 14 },
        { xp: 165000, level: 15 },
        { xp: 195000, level: 16 },
        { xp: 225000, level: 17 },
        { xp: 265000, level: 18 },
        { xp: 305000, level: 19 },
        { xp: 355000, level: 20 },
    ];
    public races: Race[] = [
      {
        id: 0,
        raceid: 0,
        text: 'Dwarf',
        page: '20',
        bonuses: [0, 0, 2, 0, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 1,
        raceid: 0,
        text: 'Hill Dwarf',
        page: '20',
        bonuses: [0, 0, 2, 0, 1, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 2,
        raceid: 0,
        text: 'Mountain Dwarf',
        page: '20',
        bonuses: [2, 0, 2, 0, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 3,
        raceid: 1,
        text: 'Elf',
        page: '22',
        bonuses: [0, 2, 0, 0, 0, 0],
        speed: 30,
        extraLanguages: 0
      },
      {
        id: 4,
        raceid: 1,
        text: 'High Elf',
        page: '22',
        bonuses: [0, 2, 0, 1, 0, 0],
        speed: 30,
        extraLanguages: 1
      },
      {
        id: 5,
        raceid: 1,
        text: 'Wood Elf',
        page: '22',
        bonuses: [0, 2, 0, 0, 1, 0],
        speed: 35,
        extraLanguages: 0
      },
      {
        id: 6,
        raceid: 1,
        text: 'Dark Elf (Drow)',
        page: '22',
        bonuses: [0, 2, 0, 0, 0, 1],
        speed: 30,
        extraLanguages: 0
      },
      {
        id: 7,
        raceid: 2,
        text: 'Halfling',
        page: '27',
        bonuses: [0, 2, 0, 0, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 8,
        raceid: 2,
        text: 'Halfling (Lightfoot)',
        page: '27',
        bonuses: [0, 2, 0, 0, 0, 1],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 9,
        raceid: 2,
        text: 'Halfling (Stout)',
        page: '27',
        bonuses: [0, 2, 1, 0, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 10,
        raceid: 3,
        text: 'Human',
        page: '30',
        bonuses: [1, 1, 1, 1, 1, 1],
        speed: 30,
        extraLanguages: 1
      },
      {
        id: 11,
        raceid: 4,
        text: 'Dragonborn',
        page: '33',
        bonuses: [2, 0, 0, 0, 0, 1],
        speed: 30,
        extraLanguages: 0
      },
      {
        id: 12,
        raceid: 5,
        text: 'Gnome',
        page: '36',
        bonuses: [0, 0, 0, 2, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 13,
        raceid: 5,
        text: 'Forest Gnome',
        page: '36',
        bonuses: [0, 1, 0, 2, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 14,
        raceid: 5,
        text: 'Rock Gnome',
        page: '36',
        bonuses: [0, 0, 1, 2, 0, 0],
        speed: 25,
        extraLanguages: 0
      },
      {
        id: 15,
        raceid: 6,
        text: 'Half-Elf',
        page: '22 and 30',
        bonuses: [0, 0, 0, 0, 0, 2],
        speed: 30,
        extraLanguages: 1
      },
      {
        id: 16,
        raceid: 7,
        text: 'Half-Orc',
        page: '41',
        bonuses: [2, 0, 1, 0, 0, 0],
        speed: 30,
        extraLanguages: 0
      },
      {
        id: 17,
        raceid: 8,
        text: 'Tiefling',
        page: '43',
        bonuses: [0, 0, 0, 1, 0, 2],
        speed: 30,
        extraLanguages: 0
      },
    ];
    public raceLanguages: RaceLanguage[] = [
      { id: 0, languages: [0, 1] },
      { id: 1, languages: [0, 2] },
      { id: 2, languages: [0, 6] },
      { id: 3, languages: [0] },
      { id: 4, languages: [0, 10] },
      { id: 5, languages: [0, 4] },
      { id: 6, languages: [0, 2] },
      { id: 7, languages: [0, 7] },
      { id: 8, languages: [0, 12] },
    ];
    public classes: Class[] = [
      {
        id: 0,
        text: 'Barbarian',
        features: [
          { level: 1, text: 'Rage (p.48)' },
          { level: 1, text: 'Unarmored Defense (p.48)' },
          //{ level: 2, text: 'Reckless Attack (p.48)' },
          // TODO: Features above level 1
        ],
        armorProficiencies: [0, 1, 3],
        weaponProficiencies: {
          categories: [0, 1],
          weapons: []
        },
      },
      {
        id: 1,
        text: 'Bard',
        features: [
          { level: 1, text: 'Bardic Inspiration (p.53)' },
        ],
        armorProficiencies: [0],
        weaponProficiencies: {
          categories: [0],
          weapons: [33, 21, 25, 27]
        },
      },
      {
        id: 2,
        text: 'Cleric',
        features: [
          { level: 1, text: 'Divine Domain (p.58)' },
        ],
        armorProficiencies: [0, 1, 3],
        weaponProficiencies: {
          categories: [0],
          weapons: []
        },
      },
      {
        id: 3,
        text: 'Druid',
        features: [
          { level: 1, text: 'Druidic (p.66)' },
        ],
        armorProficiencies: [0, 1, 3], // Non-metal only
        weaponProficiencies: {
          categories: [],
          weapons: [0, 1, 11, 4, 6, 7, 26, 8, 13, 9]
        },
      },
      {
        id: 4,
        text: 'Fighter',
        features: [
          { level: 1, text: 'Fighting Style (p.72)' },
          { level: 1, text: 'Second Wind (p.72)' },
        ],
        armorProficiencies: [0, 1, 2, 3],
        weaponProficiencies: {
          categories: [0, 1],
          weapons: []
        },
      },
      {
        id: 5,
        text: 'Monk',
        features: [
          { level: 1, text: 'Unarmored Defense (p.78)' },
          { level: 1, text: 'Martial Arts (p.78)' },
        ],
        armorProficiencies: [],
        weaponProficiencies: {
          categories: [0],
          weapons: [27]
        },
      },
      {
        id: 6,
        text: 'Paladin',
        features: [
          { level: 1, text: 'Divine Sense (p.84)' },
          { level: 1, text: 'Lay on Hands (p.84)' },
        ],
        armorProficiencies: [0, 1, 2, 3],
        weaponProficiencies: {
          categories: [0, 1],
          weapons: []
        },
      },
      {
        id: 7,
        text: 'Ranger',
        features: [
          { level: 1, text: 'Favored Enemy (p.91)' },
          { level: 1, text: 'Natural Explorer (p.91)' },
        ],
        armorProficiencies: [0, 1, 3],
        weaponProficiencies: {
          categories: [0, 1],
          weapons: []
        },
      },
      {
        id: 8,
        text: 'Rogue',
        features: [
          { level: 1, text: 'Expertise (p.96)' },
          { level: 1, text: 'Sneak Attack (p.96)' },
          { level: 1, text: 'Thieves\' Cant (p.96)' },
        ],
        armorProficiencies: [0],
        weaponProficiencies: {
          categories: [0],
          weapons: [33, 21, 25, 27]
        },
      },
      {
        id: 9,
        text: 'Sorcerer',
        features: [
          { level: 1, text: 'Sorcerous Origin (p.101)' },
        ],
        armorProficiencies: [],
        weaponProficiencies: {
          categories: [],
          weapons: [1, 11, 13, 7, 10]
        },
      },
      {
        id: 10,
        text: 'Warlock',
        features: [
          { level: 1, text: 'Otherworldly Patron (p.107)' },
        ],
        armorProficiencies: [0],
        weaponProficiencies: {
          categories: [0],
          weapons: []
        },
      },
      {
        id: 11,
        text: 'Wizard',
        features: [
          { level: 1, text: 'Arcane Recovery (p.115)' },
        ],
        armorProficiencies: [],
        weaponProficiencies: {
          categories: [0],
          weapons: [1, 11, 13, 7, 10]
        },
      },
    ];
    public classProficiencies: ClassProficiency[] = [
      { id: 0, num: 2, profs: [1, 3, 7, 10, 11, 17] },
      { id: 1, num: 3, profs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
      { id: 2, num: 2, profs: [5, 6, 9, 13, 14] },
      { id: 3, num: 2, profs: [1, 2, 6, 9, 10, 11, 17] },
      { id: 4, num: 2, profs: [0, 1, 3, 5, 6, 7, 11, 17] },
      { id: 5, num: 2, profs: [0, 3, 5, 6, 14, 16] },
      { id: 6, num: 2, profs: [3, 6, 7, 9, 13, 14] },
      { id: 7, num: 3, profs: [1, 3, 6, 8, 10, 11, 16, 17] },
      { id: 8, num: 4, profs: [0, 3, 4, 6, 7, 8, 11, 12, 13, 15, 16] },
      { id: 9, num: 2, profs: [2, 4, 6, 7, 13, 14] },
      { id: 10, num: 2, profs: [2, 4, 5, 7, 8, 10, 14] },
      { id: 11, num: 2, profs: [2, 5, 6, 8, 9, 14] },
    ];
    public savingThrows: ClassSavingThrow[] = [
      { id: 0, throws: [0, 2] },
      { id: 1, throws: [1, 5] },
      { id: 2, throws: [4, 5] },
      { id: 3, throws: [3, 4] },
      { id: 4, throws: [0, 2] },
      { id: 5, throws: [0, 1] },
      { id: 6, throws: [4, 5] },
      { id: 7, throws: [0, 1] },
      { id: 8, throws: [1, 3] },
      { id: 9, throws: [2, 5] },
      { id: 10, throws: [4, 5] },
      { id: 11, throws: [3, 4] },
    ];
    public hitDice: HitDice[] = [
      { id: 0, num: 1, dice: 12 },
      { id: 1, num: 1, dice: 8 },
      { id: 2, num: 1, dice: 8 },
      { id: 3, num: 1, dice: 8 },
      { id: 4, num: 1, dice: 10 },
      { id: 5, num: 1, dice: 8 },
      { id: 6, num: 1, dice: 10 },
      { id: 7, num: 1, dice: 10 },
      { id: 8, num: 1, dice: 8 },
      { id: 9, num: 1, dice: 6 },
      { id: 10, num: 1, dice: 8 },
      { id: 11, num: 1, dice: 6 },
    ];
    public startingHp: StartingHP[] = [ /* +Constitution */
      { id: 0, hp: 12 },
      { id: 1, hp: 8 },
      { id: 2, hp: 8 },
      { id: 3, hp: 8 },
      { id: 4, hp: 10 },
      { id: 5, hp: 8 },
      { id: 6, hp: 10 },
      { id: 7, hp: 10 },
      { id: 8, hp: 8 },
      { id: 9, hp: 6 },
      { id: 10, hp: 8 },
      { id: 11, hp: 6 },
    ];
    public classEquipment: ClassEquipment[] = [
      {
        id: 0, // Barbarian
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [17] }, // Greataxe, or
              { id: 1, num: 1, items: [14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] }, // Any martial melee
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 2, items: [3] }, // Handaxe, or
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, // Any simple weapon
            ],
          },
        ],
        fixedEquip: [
          { num: 4, id: 4 }, // Javelin
          { num: 1, id: 37 }, // Explorer's pack
        ],
      },
      {
        id: 1, // Bard
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [25] }, // Rapier, or
              { id: 1, num: 1, items: [21] }, // Longsword, or
              { id: 2, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [38] }, // Diplomat's pack, or
              { id: 1, num: 1, items: [39] }, // Entertainer's pack
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [62] }, // Lute, or
              { id: 1, num: 1, items: [63] }, // Other musical instrument
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 1 }, // Dagger
          { num: 1, id: 45 }, // Leather armor
        ],
      },
      {
        id: 2, // Cleric
        equipChoices: [
          {
            id: 0,
            // * If proficient
            choices: [
              { id: 0, num: 1, items: [6] }, // Mace, or
              { id: 1, num: 1, items: [30] }, // Warhammer
            ],
          },
          {
            id: 1,
            // * If proficient
            choices: [
              { id: 0, num: 1, items: [49] }, // Scale mail, or
              { id: 1, num: 1, items: [45] }, // Leather armor, or
              { id: 2, num: 1, items: [53] }, // Chain mail
            ],
          },
          {
            id: 2,
            choices: [
              {
                id: 0, num: 1, items: [10], extras: [
                  { id: 59, num: 20 }
                ],
              }, // Light crossbow and 20 bolts, or (TODO: Special ammo modeling)
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 3,
            choices: [
              { id: 0, num: 1, items: [40] }, // Priest's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 57 }, // Shield
          { num: 1, id: 66 }, // Holy symbol
        ],
      },
      {
        id: 3, // Druid
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [56] }, // Wooden shield, or
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [26] }, // Scimitar, or
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, // Any simple melee weapon
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 45 }, // Leather armor
          { num: 1, id: 37 }, // Explorer's pack
          { num: 1, id: 65 }, // Druidic focus
        ],
      },
      {
        id: 4, // Fighter
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [53] }, // Chain mail, or
              {
                id: 1, num: 1, items: [45], extras: [
                  { id: 35 },
                  { id: 58, num: 20 },
                ]
              }, // Leather armor, longbow, and 20 arrows (TODO: Special ammo modeling)
            ],
          },
          {
            id: 1,
            choices: [
              {
                id: 0, num: 1, items: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
                extras: [{ id: 57 }]
              }, // A martial weapon and a shield, or
              { id: 1, num: 2, items: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] }, // Two martial weapons
            ],
          },
          {
            id: 2,
            choices: [
              {
                id: 0, num: 1, items: [10], extras: [
                  { id: 59, num: 20 }
                ],
              }, // Light crossbow and 20 bolts, or (TODO: Special ammo modeling)
              { id: 1, num: 2, items: [3] }, // Two handaxes
            ],
          },
          {
            id: 3,
            choices: [
              { id: 0, num: 1, items: [41] }, // Dungeoneer's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
      },
      {
        id: 5, // Monk
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [27] }, // Shortsword, or
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [41] }, // Dungeoneer's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 20, id: 11 }, // 20 darts
        ],
      },
      {
        id: 6, // Paladin
        equipChoices: [
          {
            id: 0,
            choices: [
              {
                id: 0, num: 1, items: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
                extras: [{ id: 57 }]
              }, // A martial weapon and a shield, or
              { id: 1, num: 2, items: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36] }, // Two martial weapons
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 5, items: [4] }, // 5 Javelins, or
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, // Any simple melee weapon
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [40] }, // Priest's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 53 }, // Chain mail
          { num: 1, id: 66 }, // Holy symbol
        ],
      },
      {
        id: 7, // Ranger
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [49] }, // Scale mail, or
              { id: 1, num: 1, items: [45] }, // Leather armor
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 2, items: [27] }, // 2 Shortswords, or
              { id: 1, num: 2, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }, // 2 simple melee weapons
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [41] }, // Dungeoneer's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 35 }, // Longbow
          { num: 20, id: 58 }, // 20 arrows
        ],
      },
      {
        id: 8, // Rogue
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [25] }, // Rapier, or
              { id: 1, num: 1, items: [27] }, // Shortsword
            ],
          },
          {
            id: 1,
            choices: [
              {
                id: 0, num: 1, items: [12], extras: [
                  { id: 58, num: 20 }
                ],
              }, // Shortbow and 20 arrows, or (TODO: Special ammo modeling)
              { id: 1, num: 1, items: [27] }, // Shortsword
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [42] }, // Burglar's pack, or
              { id: 1, num: 1, items: [41] }, // Dungeoneer's pack, or
              { id: 2, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 45 }, // Leather armor
          { num: 2, id: 1 }, // 2 daggers
          { num: 1, id: 106 }, // Thieves' tools
        ],
      },
      {
        id: 9, // Sorcerer
        equipChoices: [
          {
            id: 0,
            choices: [
              {
                id: 0, num: 1, items: [10], extras: [
                  { id: 59, num: 20 }
                ],
              }, // Light crossbow and 20 bolts, or (TODO: Special ammo modeling)
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [64] }, // Component pouch, or
              { id: 1, num: 1, items: [107] }, // Arcane focus
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [41] }, // Dungeoneer's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 2, id: 1 }, // 2 daggers
        ],
      },
      {
        id: 10, // Warlock
        equipChoices: [
          {
            id: 0,
            choices: [
              {
                id: 0, num: 1, items: [10], extras: [
                  { id: 59, num: 20 }
                ],
              }, // Light crossbow and 20 bolts, or (TODO: Special ammo modeling)
              { id: 1, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [64] }, // Component pouch, or
              { id: 1, num: 1, items: [107] }, // Arcane focus
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [43] }, // Scholar's pack, or
              { id: 1, num: 1, items: [41] }, // Dungeoneer's pack
            ],
          },
          {
            id: 3,
            choices: [ // TODO: This should really be fixed equipment, remember to model a single choice
              { id: 0, num: 1, items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13] }, // Any simple weapon
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 45 }, // Leather armor
          { num: 2, id: 1 }, // 2 daggers
        ],
      },
      {
        id: 11, // Wizard
        equipChoices: [
          {
            id: 0,
            choices: [
              { id: 0, num: 1, items: [7] }, // Quarterstaff, or
              { id: 1, num: 1, items: [1] }, // Dagger
            ],
          },
          {
            id: 1,
            choices: [
              { id: 0, num: 1, items: [64] }, // Component pouch, or
              { id: 1, num: 1, items: [107] }, // Arcane focus
            ],
          },
          {
            id: 2,
            choices: [
              { id: 0, num: 1, items: [43] }, // Scholar's pack, or
              { id: 1, num: 1, items: [37] }, // Explorer's pack
            ],
          },
        ],
        fixedEquip: [
          { num: 1, id: 108 }, // Spellbook
        ],
      },
    ];
    public backgrounds: Background[] = [
      {
        id: 0,
        text: 'Acolyte',
        equipment: [66, 67, 68, 69, 70, 71]
      },
      {
        id: 1,
        text: 'Charlatan',
        equipment: [72, 73, 74, 71]
      },
      {
        id: 2,
        text: 'Criminal',
        equipment: [75, 76, 71]
      },
      {
        id: 3,
        text: 'Entertainer',
        equipment: [63, 77, 78, 71]
      },
      {
        id: 4,
        text: 'Folk Hero',
        equipment: [79, 80, 81, 70, 71]
      },
      {
        id: 5,
        text: 'Guild Artisan',
        equipment: [79, 82, 83, 71]
      },
      {
        id: 6,
        text: 'Hermit',
        equipment: [84, 85, 70, 86]
      },
      {
        id: 7,
        text: 'Noble',
        equipment: [72, 87, 88, 89]
      },
      {
        id: 8,
        text: 'Outlander',
        equipment: [90, 91, 92, 83, 71]
      },
      {
        id: 9,
        text: 'Sage',
        equipment: [93, 94, 95, 96, 70, 71]
      },
      {
        id: 10,
        text: 'Sailor',
        equipment: [97, 98, 99, 70, 71]
      },
      {
        id: 11,
        text: 'Soldier',
        equipment: [100, 101, 102, 70, 71]
      },
      {
        id: 12,
        text: 'Urchin',
        equipment: [95, 103, 104, 105, 70, 71]
      },
    ];
    public backgroundFeatures: BackgroundFeature[] = [
      { id: 0, text: 'Shelter of the Faithful (p.127)' },
      { id: 1, text: 'False Identity (p.128)' },
      { id: 2, text: 'Criminal Contact (p.129)' },
      { id: 3, text: 'By Popular Demand (p.130)' },
      { id: 4, text: 'Rustic Hospitality (p.131)' },
      { id: 5, text: 'Guild Membership (p.133)' },
      { id: 6, text: 'Discovery (p.134)' },
      { id: 7, text: 'Position of Privilege (p.135)' },
      { id: 8, text: 'Wanderer (p.136)' },
      { id: 9, text: 'Researcher (p.138)' },
      { id: 10, text: 'Ship\'s Passage (p.139)' },
      { id: 11, text: 'Military Rank (p.140)' },
      { id: 12, text: 'City Secrets (p.141)' },
    ];
    public backgroundCurrency: BackgroundCurrency[] = [
      { id: 0, currency: [0, 0, 0, 15, 0] }, /* CP, SP, EP, GP, PP */
      { id: 1, currency: [0, 0, 0, 15, 0] },
      { id: 2, currency: [0, 0, 0, 15, 0] },
      { id: 3, currency: [0, 0, 0, 15, 0] },
      { id: 4, currency: [0, 0, 0, 10, 0] },
      { id: 5, currency: [0, 0, 0, 15, 0] },
      { id: 6, currency: [0, 0, 0, 5, 0] },
      { id: 7, currency: [0, 0, 0, 25, 0] },
      { id: 8, currency: [0, 0, 0, 10, 0] },
      { id: 9, currency: [0, 0, 0, 10, 0] },
      { id: 10, currency: [0, 0, 0, 10, 0] },
      { id: 11, currency: [0, 0, 0, 10, 0] },
      { id: 12, currency: [0, 0, 0, 10, 0] },
    ];
    public backgroundLangauges: BackgroundLangauge[] = [
      { id: 0, num: 2 },
      { id: 5, num: 1 },
      { id: 6, num: 1 },
      { id: 7, num: 1 },
      { id: 8, num: 1 },
      { id: 9, num: 2 },
    ];
    public backgroundToolProficiencies: BackgroundToolProficiency[] = [
      { id: 0, profs: [] },
      { id: 1, profs: [0, 1] },
      { id: 2, profs: [2, 3] },
      { id: 3, profs: [0, 4] },
      { id: 4, profs: [5, 6] },
      { id: 5, profs: [5] },
      { id: 6, profs: [7] },
      { id: 7, profs: [2] },
      { id: 8, profs: [4] },
      { id: 9, profs: [] },
      { id: 10, profs: [8, 9] },
      { id: 11, profs: [2, 6] },
      { id: 12, profs: [0, 3] },
    ];
    public backgroundProficiencies: BackgroundProficiency[] = [
      { id: 0, profs: [6, 14] },
      { id: 1, profs: [4, 15] },
      { id: 2, profs: [4, 16] },
      { id: 3, profs: [0, 12] },
      { id: 4, profs: [1, 17] },
      { id: 5, profs: [6, 13] },
      { id: 6, profs: [9, 13] },
      { id: 7, profs: [5, 13] },
      { id: 8, profs: [3, 17] },
      { id: 9, profs: [2, 5] },
      { id: 10, profs: [3, 11] },
      { id: 11, profs: [3, 7] },
      { id: 12, profs: [15, 16] },
    ];
    public armorCategories: ArmorCategory[] = [
      { id: 0, text: 'Light Armor' },
      { id: 1, text: 'Medium Armor' },
      { id: 2, text: 'Heavy Armor' },
      { id: 3, text: 'Shield' },
    ];
    public equipmentCategories: EquipmentCategory[] = [
      { id: 0, text: 'Weapon' },
      { id: 1, text: 'Armor' },
      { id: 2, text: 'Pack' },
      { id: 3, text: 'Shield' },
      { id: 4, text: 'Ammo' },
      { id: 5, text: 'Trinket' },
      { id: 6, text: 'Other' },
    ];
    public weaponCategories: WeaponCategory[] = [
      { id: 0, text: 'Simple weapons' },
      { id: 1, text: 'Martial weapons' },
    ];
    public damageTypes: DamageType[] = [
      { id: 0, text: 'Bludgeoning' },
      { id: 1, text: 'Piercing' },
      { id: 2, text: 'Slashing' },
    ];
    public equipment: Equipment[] = [ // TODO: Finesse, cost, versatile, loading, heavy, reach, special
      {
        id: 0,
        text: 'Club',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d4',
        weapon: true,
        melee: true, // Whether it can be used melee (STR mod)
        thrown: false, // Whether it can be thrown if necessary. (DEX mod)
        light: true,
        twohanded: false,
        weight: 2
      },
      {
        id: 1,
        text: 'Dagger',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d4',
        weapon: true,
        melee: true,
        thrown: true,
        light: true,
        twohanded: false,
        weight: 1
      },
      {
        id: 2,
        text: 'Greatclub',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 10
      },
      {
        id: 3,
        text: 'Handaxe',
        type: 0,
        weaponCategory: 0,
        damage: 2,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: true,
        light: true,
        twohanded: false,
        weight: 2
      },
      {
        id: 4,
        text: 'Javelin',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: true,
        light: false,
        twohanded: false,
        weight: 2
      },
      {
        id: 5,
        text: 'Light Hammer',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d4',
        weapon: true,
        melee: true,
        thrown: true,
        light: true,
        twohanded: false,
        weight: 2
      },
      {
        id: 6,
        text: 'Mace',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 4
      },
      {
        id: 7,
        text: 'Quarterstaff',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 4
      },
      {
        id: 8,
        text: 'Sickle',
        type: 0,
        weaponCategory: 0,
        damage: 2,
        dice: '1d4',
        weapon: true,
        melee: true,
        thrown: false,
        light: true,
        twohanded: false,
        weight: 2
      },
      {
        id: 9,
        text: 'Spear',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 3
      },
      // Simple ranged
      {
        id: 10,
        text: 'Crossbow (Light)',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d8',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 5
      },
      {
        id: 11,
        text: 'Dart',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d4',
        weapon: true,
        melee: false,
        thrown: true,
        light: false,
        twohanded: false,
        weight: 0.25
      },
      {
        id: 12,
        text: 'Shortbow',
        type: 0,
        weaponCategory: 0,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 2
      },
      {
        id: 13,
        text: 'Sling',
        type: 0,
        weaponCategory: 0,
        damage: 0,
        dice: '1d4',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 0
      },
      // Martial melee
      {
        id: 14,
        text: 'Battleaxe',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 4
      },
      {
        id: 15,
        text: 'Flail',
        type: 0,
        weaponCategory: 1,
        damage: 0,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 2
      },
      {
        id: 16,
        text: 'Glaive',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d10',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 6
      },
      {
        id: 17,
        text: 'Greataxe',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d12',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 7
      },
      {
        id: 18,
        text: 'Greatsword',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '2d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 6
      },
      {
        id: 19,
        text: 'Halberd',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d10',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 6
      },
      {
        id: 20,
        text: 'Lance',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d12',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 6
      },
      {
        id: 21,
        text: 'Longsword',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 3
      },
      {
        id: 22,
        text: 'Maul',
        type: 0,
        weaponCategory: 1,
        damage: 0,
        dice: '2d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 10
      },
      {
        id: 23,
        text: 'Morningstar',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 4
      },
      {
        id: 24,
        text: 'Pike',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d10',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 18
      },
      {
        id: 25,
        text: 'Rapier',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 2
      },
      {
        id: 26,
        text: 'Scimitar',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: true,
        twohanded: false,
        weight: 3
      },
      {
        id: 27,
        text: 'Shortsword',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: false,
        light: true,
        twohanded: false,
        weight: 2
      },
      {
        id: 28,
        text: 'Trident',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: true,
        thrown: true,
        light: false,
        twohanded: false,
        weight: 4
      },
      {
        id: 29,
        text: 'War Pick',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 2
      },
      {
        id: 30,
        text: 'Warhammer',
        type: 0,
        weaponCategory: 1,
        damage: 0,
        dice: '1d8',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 2
      },
      {
        id: 31,
        text: 'Whip',
        type: 0,
        weaponCategory: 1,
        damage: 2,
        dice: '1d4',
        weapon: true,
        melee: true,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 3
      },
      // Martial ranged
      {
        id: 32,
        text: 'Blowgun',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: false,
        weight: 1
      },
      {
        id: 33,
        text: 'Crossbow (Hand)',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d6',
        weapon: true,
        melee: false,
        thrown: false,
        light: true,
        twohanded: false,
        weight: 3
      },
      {
        id: 34,
        text: 'Crossbow (Heavy)',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d10',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 18
      },
      {
        id: 35,
        text: 'Longbow',
        type: 0,
        weaponCategory: 1,
        damage: 1,
        dice: '1d8',
        weapon: true,
        melee: false,
        thrown: false,
        light: false,
        twohanded: true,
        weight: 2
      },
      {
        id: 36,
        text: 'Net',
        type: 0,
        weaponCategory: 1,
        damage: 0,
        dice: '0',
        weapon: true,
        melee: false,
        thrown: true,
        light: false,
        twohanded: false,
        weight: 3
      },
      // Items (TODO: Weights)
      // Packs
      {
        id: 37,
        type: 2,
        text: 'Explorer\'s pack',
        weapon: false,
      },
      {
        id: 38,
        type: 2,
        text: 'Diplomat\'s pack',
        weapon: false,
      },
      {
        id: 39,
        type: 2,
        text: 'Entertainer\'s pack',
        weapon: false,
      },
      {
        id: 40,
        type: 2,
        text: 'Priest\'s pack',
        weapon: false,
      },
      {
        id: 41,
        type: 2,
        text: 'Dungeoneer\'s pack',
        weapon: false,
      },
      {
        id: 42,
        type: 2,
        text: 'Burglar\'s pack',
        weapon: false,
      },
      {
        id: 43,
        type: 2,
        text: 'Scholar\'s pack',
        weapon: false,
      },
      // Armor
      {
        id: 44,
        type: 1,
        text: 'Padded armor',
        weapon: false,
      },
      {
        id: 45,
        type: 1,
        text: 'Leather armor',
        weapon: false,
      },
      {
        id: 46,
        type: 1,
        text: 'Studded leather armor',
        weapon: false,
      },
      {
        id: 47,
        type: 1,
        text: 'Hide armor',
        weapon: false,
      },
      {
        id: 48,
        type: 1,
        text: 'Chain shirt',
        weapon: false,
      },
      {
        id: 49,
        type: 1,
        text: 'Scale mail',
        weapon: false,
      },
      {
        id: 50,
        type: 1,
        text: 'Breastplate',
        weapon: false,
      },
      {
        id: 51,
        type: 1,
        text: 'Half plate',
        weapon: false,
      },
      {
        id: 52,
        type: 1,
        text: 'Ring mail',
        weapon: false,
      },
      {
        id: 53,
        type: 1,
        text: 'Chain mail',
        weapon: false,
      },
      {
        id: 54,
        type: 1,
        text: 'Splint',
        weapon: false,
      },
      {
        id: 55,
        type: 1,
        text: 'Plate',
        weapon: false,
      },
      // Shields
      {
        id: 56,
        type: 3,
        text: 'Wooden shield',
        weapon: false,
      },
      {
        id: 57,
        type: 3,
        text: 'Shield',
        weapon: false,
      },
      // Ammo
      {
        id: 58,
        type: 4,
        text: 'Arrows',
        weapon: false,
      },
      {
        id: 59,
        type: 4,
        text: 'Bolts',
        weapon: false,
      },
      {
        id: 60,
        type: 4,
        text: 'Sling Bullets',
        weapon: false,
      },
      {
        id: 61,
        type: 4,
        text: 'Blowgun Needles',
        weapon: false,
      },
      // Musical instruments
      {
        id: 62,
        type: 6,
        text: 'Lute',
        weapon: false,
      },
      {
        id: 63,
        type: 6,
        text: 'Musical instrument (________)',
        weapon: false,
      },
      // Other
      {
        id: 64,
        type: 6,
        text: 'Component pouch',
        weapon: false,
      },
      {
        id: 65,
        type: 6,
        text: 'Druidic focus',
        weapon: false,
      },
      // Adventurers equipment
      {
        id: 66,
        type: 6,
        text: 'Holy symbol',  /* A gift to you when you entered the priesthood */
        weapon: false,
      },
      {
        id: 67,
        type: 6,
        text: 'Prayer book/prayer wheel',
        weapon: false,
      },
      {
        id: 68,
        type: 6,
        text: 'Incense stick (5)',
        weapon: false,
      },
      {
        id: 69,
        type: 6,
        text: 'Vestments',
        weapon: false,
      },
      {
        id: 70,
        type: 6,
        text: 'Common clothes',
        weapon: false,
      },
      {
        id: 71,
        type: 6,
        text: 'Belt pouch',
        weapon: false,
      },
      {
        id: 72,
        type: 6,
        text: 'Fine clothes',
        weapon: false,
      },
      {
        id: 73,
        type: 6,
        text: 'Disguise kit',
        weapon: false,
      },
      {
        id: 74,
        type: 6,
        text: 'Con tools',  /* Tools of the con of your choice (ten stoppered bottles filled with colored liquid, a set of weighted dice, a deck of marked cards, or a signet ring of an imaginary duke) */
        weapon: false,
      },
      {
        id: 75,
        type: 6,
        text: 'Crowbar',
        weapon: false,
      },
      {
        id: 76,
        type: 6,
        text: 'Dark common clothes (w/ hood)',
        weapon: false,
      },
      {
        id: 77,
        type: 6,
        text: 'Admirer\'s favor', /* Love letter, lock of hair, or trinket */
        weapon: false,
      },
      {
        id: 78,
        type: 6,
        text: 'Costume',
        weapon: false,
      },
      {
        id: 79,
        type: 6,
        text: 'Artisan\'s tools (________)',
        weapon: false,
      },
      {
        id: 80,
        type: 6,
        text: 'Shovel',
        weapon: false,
      },
      {
        id: 81,
        type: 6,
        text: 'Iron pot',
        weapon: false,
      },
      {
        id: 82,
        type: 6,
        text: 'Guild introduction letter',
        weapon: false,
      },
      {
        id: 83,
        type: 6,
        text: 'Traveler\'s clothes',
        weapon: false,
      },
      {
        id: 84,
        type: 6,
        text: 'Scroll case of notes from studies or prayers',
        weapon: false,
      },
      {
        id: 85,
        type: 6,
        text: 'Winter blanket',
        weapon: false,
      },
      {
        id: 86,
        type: 6,
        text: 'Herbalism kit',
        weapon: false,
      },
      {
        id: 87,
        type: 6,
        text: 'Signet ring',
        weapon: false,
      },
      {
        id: 88,
        type: 6,
        text: 'Scroll of pedigree',
        weapon: false,
      },
      {
        id: 89,
        type: 6,
        text: 'Purse',
        weapon: false,
      },
      {
        id: 90,
        type: 6,
        text: 'Staff',
        weapon: false,
      },
      {
        id: 91,
        type: 6,
        text: 'Hunting trap',
        weapon: false,
      },
      {
        id: 92,
        type: 6,
        text: 'Animal trophy',
        weapon: false,
      },
      {
        id: 93,
        type: 6,
        text: 'Bottle of black ink',
        weapon: false,
      },
      {
        id: 94,
        type: 6,
        text: 'Quill',
        weapon: false,
      },
      {
        id: 95,
        type: 6,
        text: 'Small knife',
        weapon: false,
      },
      {
        id: 96,
        type: 6,
        text: 'Letter from a dead colleague posing a question you are unable to answer',
        weapon: false,
      },
      {
        id: 97,
        type: 6,
        text: 'Belaying pin (club)',
        weapon: false,
      },
      {
        id: 98,
        type: 6,
        text: '50 feet of silk rope',
        weapon: false,
      },
      {
        id: 99,
        type: 6,
        text: 'Lucky charm', /* Such as a rabbit foot or small stone with a hole in the center (or you may roll for a random trinket on the Trinkets table in chapter 5) */
        weapon: false,
      },
      {
        id: 100,
        type: 6,
        text: 'Insignia of rank',
        weapon: false,
      },
      {
        id: 101,
        type: 6,
        text: 'Trophy from a fallen enemy', /* A dagger, broken blade, or piece of a banner */
        weapon: false,
      },
      {
        id: 102,
        type: 6,
        text: 'Set of bone dice or deck of cards',
        weapon: false,
      },
      {
        id: 103,
        type: 6,
        text: 'Map of your home city',
        weapon: false,
      },
      {
        id: 104,
        type: 6,
        text: 'Pet mouse', /* Go for the eyes, boo! */
        weapon: false,
      },
      {
        id: 105,
        type: 6,
        text: 'A token to remember your parents by',
        weapon: false,
      },
      {
        id: 106,
        type: 6,
        text: 'Thieves\' tools',
        weapon: false,
      },
      {
        id: 107,
        type: 6,
        text: 'Arcane focus',
        weapon: false,
      },
      {
        id: 108,
        type: 6,
        text: 'Spellbook',
        weapon: false,
      },
      // Pack contents
      {
        id: 109,
        type: 6,
        text: 'Backpack',
        weapon: false
      },
      {
        id: 110,
        type: 6,
        text: 'Bedroll',
        weapon: false
      },
      {
        id: 111,
        type: 6,
        text: 'Mess kit',
        weapon: false
      },
      {
        id: 112,
        type: 6,
        text: 'Tinderbox',
        weapon: false
      },
      {
        id: 113,
        type: 6,
        text: 'Torch',
        weapon: false
      },
      {
        id: 114,
        type: 6,
        text: 'Rations',
        weapon: false
      },
      {
        id: 115,
        type: 6,
        text: 'Waterskin',
        weapon: false
      },
      {
        id: 116,
        type: 6,
        text: 'Chest',
        weapon: false
      },
      {
        id: 117,
        type: 6,
        text: 'Map/scroll case',
        weapon: false
      },
      {
        id: 118,
        type: 6,
        text: 'Ink pen',
        weapon: false
      },
      {
        id: 119,
        type: 6,
        text: 'Lamp',
        weapon: false
      },
      {
        id: 120,
        type: 6,
        text: 'Oil flask',
        weapon: false
      },
      {
        id: 121,
        type: 6,
        text: 'Sheet of paper',
        weapon: false
      },
      {
        id: 122,
        type: 6,
        text: 'Vial of perfume',
        weapon: false
      },
      {
        id: 123,
        type: 6,
        text: 'Sealing wax',
        weapon: false
      },
      {
        id: 124,
        type: 6,
        text: 'Soap',
        weapon: false
      },
      {
        id: 125,
        type: 6,
        text: 'Candle',
        weapon: false
      },
      {
        id: 126,
        type: 6,
        text: 'Blanket',
        weapon: false
      },
      {
        id: 127,
        type: 6,
        text: 'Alms box',
        weapon: false
      },
      {
        id: 128,
        type: 6,
        text: 'Block of incense',
        weapon: false
      },
      {
        id: 129,
        type: 6,
        text: 'Censer',
        weapon: false
      },
      {
        id: 130,
        type: 6,
        text: 'Hammer',
        weapon: false
      },
      {
        id: 131,
        type: 6,
        text: 'Piton',
        weapon: false
      },
      {
        id: 132,
        type: 6,
        text: 'Ball bearings',
        weapon: false
      },
      {
        id: 133,
        type: 6,
        text: 'String (10ft)',
        weapon: false
      },
      {
        id: 134,
        type: 6,
        text: 'Bell',
        weapon: false
      },
      {
        id: 135,
        type: 6,
        text: 'Hooded lantern',
        weapon: false
      },
      {
        id: 136,
        type: 6,
        text: 'Hempen rope (50ft)',
        weapon: false
      },
      {
        id: 137,
        type: 6,
        text: 'Book of lore',
        weapon: false
      },
      {
        id: 138,
        type: 6,
        text: 'Parchment sheet',
        weapon: false
      },
      {
        id: 139,
        type: 6,
        text: 'Small bag of sand',
        weapon: false
      },
    ];
    public backpackContents: Backpack[] = [
      { 
        id: 37, // Explorers pack
        contents: [
          { id: 109, num: 1 },
          { id: 110, num: 1 },
          { id: 111, num: 1 },
          { id: 112, num: 1 },
          { id: 113, num: 10 },
          { id: 114, num: 10 },
          { id: 115, num: 1 },
        ],
      },
      { 
        id: 38, // Diplomat pack
        contents: [
          { id: 116, num: 1 },
          { id: 117, num: 2 },
          { id: 72, num: 1 },
          { id: 93, num: 1 }, // TODO: Bottle of ink, not necessarily black
          { id: 118, num: 1 },
          { id: 119, num: 1 },
          { id: 120, num: 2 },
          { id: 121, num: 5 },
          { id: 122, num: 1 },
          { id: 123, num: 1 },
          { id: 124, num: 1 },
        ],
      },
      { 
        id: 39, // Entertainer pack
        contents: [
          { id: 109, num: 1 },
          { id: 110, num: 1 },
          { id: 78, num: 2 },
          { id: 125, num: 5 },
          { id: 114, num: 5 },
          { id: 115, num: 1 },
          { id: 73, num: 1 },
        ],
      },
      { 
        id: 40, // Priest pack
        contents: [
          { id: 109, num: 1 },
          { id: 126, num: 1 },
          { id: 125, num: 10 },
          { id: 112, num: 1 },
          { id: 127, num: 1 },
          { id: 128, num: 2 },
          { id: 129, num: 1 },
          { id: 69, num: 1 },
          { id: 114, num: 2 },
          { id: 115, num: 1 },
        ],
      },
      { 
        id: 41, // Dungeoneer pack
        contents: [
          { id: 109, num: 1 },
          { id: 75, num: 1 },
          { id: 130, num: 1 },
          { id: 131, num: 10 },
          { id: 113, num: 10 },
          { id: 112, num: 1 },
          { id: 114, num: 10 },
          { id: 115, num: 1 },
        ],
      },
      { 
        id: 42, // Burglar pack
        contents: [
          { id: 109, num: 1 },
          { id: 132, num: 1000 },
          { id: 133, num: 1 },
          { id: 134, num: 1 },
          { id: 125, num: 5 },
          { id: 75, num: 1 },
          { id: 130, num: 1 },
          { id: 131, num: 10 },
          { id: 135, num: 1 },
          { id: 120, num: 2 },
          { id: 114, num: 5 },
          { id: 112, num: 1 },
          { id: 115, num: 1 },
          { id: 136, num: 1 },
        ],
      },
      { 
        id: 43, // Scholar pack
        contents: [
          { id: 109, num: 1 },
          { id: 137, num: 1 },
          { id: 93, num: 1 }, // TODO: Bottle of ink, not necessarily black
          { id: 118, num: 1 },
          { id: 138, num: 10 },
          { id: 139, num: 1 },
          { id: 95, num: 1 },
        ],
      },
    ];
    public toolProficiencies: ToolProficiency[] = [
      { id: 0, text: 'Disguise kit' }, /* Start background tools */
      { id: 1, text: 'Forgery kit' },
      { id: 2, text: 'Gaming set (________)' },
      { id: 3, text: 'Thieves\' tools' },
      { id: 4, text: 'Musical instrument  (________)' },
      { id: 5, text: 'Artisan\'s tools (________)' },
      { id: 6, text: 'Vehicles (land)' },
      { id: 7, text: 'Herbalism kit' },
      { id: 8, text: 'Navigator\'s tools' },
      { id: 9, text: 'Vehicles (water)' },
    ];
    public personalityTraits: PersonalityTrait[] = [ // http://www.enworld.org/forum/showthread.php?469002-List-of-All-Personality-Traits-Ideals-Bonds-amp-Flaws
      { id: 0, roll: 1, bg: 0, text: '1. I idolize (p.127)' },
      { id: 1, roll: 2, bg: 0, text: '2. I can (p.127)' },
      { id: 2, roll: 3, bg: 0, text: '3. I see (p.127)' },
      { id: 3, roll: 4, bg: 0, text: '4. Nothing can (p.127)' },
      { id: 4, roll: 5, bg: 0, text: '5. I quote (p.127)' },
      { id: 5, roll: 6, bg: 0, text: '6. I am (p.127)' },
      { id: 6, roll: 7, bg: 0, text: '7. I\'ve enjoyed (p.127)' },
      { id: 7, roll: 8, bg: 0, text: '8. I\'ve spent (p.127)' },
      { id: 8, roll: 1, bg: 1, text: '1. I fall (p.128)' },
      { id: 9, roll: 2, bg: 1, text: '2. I have (p.128)' },
      { id: 10, roll: 3, bg: 1, text: '3. Flattery is (p.128)' },
      { id: 11, roll: 4, bg: 1, text: '4. I\'m a (p.128)' },
      { id: 12, roll: 5, bg: 1, text: '5. I lie (p.128)' },
      { id: 13, roll: 6, bg: 1, text: '6. Sarcasm and (p.128)' },
      { id: 14, roll: 7, bg: 1, text: '7. I keep (p.128)' },
      { id: 15, roll: 8, bg: 1, text: '8. I pocket (p.128)' },
      { id: 16, roll: 1, bg: 2, text: '1. I always (p.129)' },
      { id: 17, roll: 2, bg: 2, text: '2. I am (p.129)' },
      { id: 18, roll: 3, bg: 2, text: '3. The first (p.129)' },
      { id: 19, roll: 4, bg: 2, text: '4. I would (p.129)' },
      { id: 20, roll: 5, bg: 2, text: '5. I am (p.129)' },
      { id: 21, roll: 6, bg: 2, text: '6. I don\'t (p.129)' },
      { id: 22, roll: 7, bg: 2, text: '7. The best (p.129)' },
      { id: 23, roll: 8, bg: 2, text: '8. I blow (p.129)' },
      { id: 24, roll: 1, bg: 3, text: '1. I know (p.130)' },
      { id: 25, roll: 2, bg: 3, text: '2. Whenever I (p.130)' },
      { id: 26, roll: 3, bg: 3, text: '3. I\'m a (p.130)' },
      { id: 27, roll: 4, bg: 3, text: '4. Nobody stays (p.130)' },
      { id: 28, roll: 5, bg: 3, text: '5. I love (p.130)' },
      { id: 29, roll: 6, bg: 3, text: '6. I get (p.130)' },
      { id: 30, roll: 7, bg: 3, text: '7. I\'ll settle (p.130)' },
      { id: 31, roll: 8, bg: 3, text: '8. I change (p.130)' },
      { id: 32, roll: 1, bg: 4, text: '1. I judge (p.131)' },
      { id: 33, roll: 2, bg: 4, text: '2. If someone (p.131)' },
      { id: 34, roll: 3, bg: 4, text: '3. When I (p.131)' },
      { id: 35, roll: 4, bg: 4, text: '4. I have (p.131)' },
      { id: 36, roll: 5, bg: 4, text: '5. I\'m confident (p.131)' },
      { id: 37, roll: 6, bg: 4, text: '6. Thinking is (p.131)' },
      { id: 38, roll: 7, bg: 4, text: '7. I misuse (p.131)' },
      { id: 39, roll: 8, bg: 4, text: '8. I get (p.131)' },
      { id: 40, roll: 1, bg: 5, text: '1. I believe (p.133)' },
      { id: 41, roll: 2, bg: 5, text: '2. I\'m a (p.133)' },
      { id: 42, roll: 3, bg: 5, text: '3. I always (p.133)' },
      { id: 43, roll: 4, bg: 5, text: '4. I\'m full (p.133)' },
      { id: 44, roll: 5, bg: 5, text: '5. I\'m rude (p.133)' },
      { id: 45, roll: 6, bg: 5, text: '6. I like (p.133)' },
      { id: 46, roll: 7, bg: 5, text: '7. I don\'t (p.133)' },
      { id: 47, roll: 8, bg: 5, text: '8. I don\'t (p.133)' },
      { id: 48, roll: 1, bg: 6, text: '1. I\'ve been (p.134)' },
      { id: 49, roll: 2, bg: 6, text: '2. I am (p.134)' },
      { id: 50, roll: 3, bg: 6, text: '3. The leader (p.134)' },
      { id: 51, roll: 4, bg: 6, text: '4. I feel (p.134)' },
      { id: 52, roll: 5, bg: 6, text: '5. I\'m oblivious (p.134)' },
      { id: 53, roll: 6, bg: 6, text: '6. I connect (p.134)' },
      { id: 54, roll: 7, bg: 6, text: '7. I often (p.134)' },
      { id: 55, roll: 8, bg: 6, text: '8. I often (p.134)' },
      { id: 56, roll: 1, bg: 7, text: '1. My eloquent (p.135)' },
      { id: 57, roll: 2, bg: 7, text: '2. The common (p.135)' },
      { id: 58, roll: 3, bg: 7, text: '3. No one (p.135)' },
      { id: 59, roll: 4, bg: 7, text: '4. I take (p.135)' },
      { id: 60, roll: 5, bg: 7, text: '5. I don\'t (p.135)' },
      { id: 61, roll: 6, bg: 7, text: '6. Despite my (p.135)' },
      { id: 62, roll: 7, bg: 7, text: '7. My favor (p.135)' },
      { id: 63, roll: 8, bg: 7, text: '8. If you (p.135)' },
      { id: 64, roll: 1, bg: 8, text: '1. I\'m driven (p.137)' },
      { id: 65, roll: 2, bg: 8, text: '2. I watch (p.137)' },
      { id: 66, roll: 3, bg: 8, text: '3. I once (p.137)' },
      { id: 67, roll: 4, bg: 8, text: '4. I have (p.137)' },
      { id: 68, roll: 5, bg: 8, text: '5. I place (p.137)' },
      { id: 69, roll: 6, bg: 8, text: '6. I\'m always (p.137)' },
      { id: 70, roll: 7, bg: 8, text: '7. I feel (p.137)' },
      { id: 71, roll: 8, bg: 8, text: '8. I was (p.137)' },
      { id: 72, roll: 1, bg: 9, text: '1. I use (p.138)' },
      { id: 73, roll: 2, bg: 9, text: '2. I\'ve read (p.138)' },
      { id: 74, roll: 3, bg: 9, text: '3. I\'m used (p.138)' },
      { id: 75, roll: 4, bg: 9, text: '4. There\'s nothing (p.138)' },
      { id: 76, roll: 5, bg: 9, text: '5. I\'m willing (p.138)' },
      { id: 77, roll: 6, bg: 9, text: '6. I...speak (p.138)' },
      { id: 78, roll: 7, bg: 9, text: '7. I am (p.138)' },
      { id: 79, roll: 8, bg: 9, text: '8. I\'m convinced (p.138)' },
      { id: 80, roll: 1, bg: 10, text: '1. My friends (p.139)' },
      { id: 81, roll: 2, bg: 10, text: '2. I work (p.139)' },
      { id: 82, roll: 3, bg: 10, text: '3. I enjoy (p.139)' },
      { id: 83, roll: 4, bg: 10, text: '4. I stretch (p.139)' },
      { id: 84, roll: 5, bg: 10, text: '5. To me (p.139)' },
      { id: 85, roll: 6, bg: 10, text: '6. I never (p.139)' },
      { id: 86, roll: 7, bg: 10, text: '7. My language (p.139)' },
      { id: 87, roll: 8, bg: 10, text: '8. I like (p.139)' },
      { id: 88, roll: 1, bg: 11, text: '1. I\'m always (p.140)' },
      { id: 89, roll: 2, bg: 11, text: '2. I\'m haunted (p.140)' },
      { id: 90, roll: 3, bg: 11, text: '3. I\'ve lost (p.140)' },
      { id: 91, roll: 4, bg: 11, text: '4. I\'m full (p.140)' },
      { id: 92, roll: 5, bg: 11, text: '5. I can (p.140)' },
      { id: 93, roll: 6, bg: 11, text: '6. I enjoy (p.140)' },
      { id: 94, roll: 7, bg: 11, text: '7. I have (p.140)' },
      { id: 95, roll: 8, bg: 11, text: '8. I face (p.140)' },
      { id: 96, roll: 1, bg: 12, text: '1. I hide (p.141)' },
      { id: 97, roll: 2, bg: 12, text: '2. I ask (p.141)' },
      { id: 98, roll: 3, bg: 12, text: '3. I like (p.141)' },
      { id: 99, roll: 4, bg: 12, text: '4. I sleep (p.141)' },
      { id: 100, roll: 5, bg: 12, text: '5. I eat (p.141)' },
      { id: 101, roll: 6, bg: 12, text: '6. I think (p.141)' },
      { id: 102, roll: 7, bg: 12, text: '7. I don\'t (p.141)' },
      { id: 103, roll: 8, bg: 12, text: '8. I bluntly (p.141)' },
    ];
    public ideals: PersonalityTrait[] = [
      { id: 0, bg: 0, text: '1. Tradition (p.127)' },
      { id: 1, bg: 0, text: '2. Charity (p.127)' },
      { id: 2, bg: 0, text: '3. Change (p.127)' },
      { id: 3, bg: 0, text: '4. Power (p.127)' },
      { id: 4, bg: 0, text: '5. Faith (p.127)' },
      { id: 5, bg: 0, text: '6. Aspiration (p.127)' },
      { id: 6, bg: 1, text: '1. Independence (p.128)' },
      { id: 7, bg: 1, text: '2. Fairness (p.128)' },
      { id: 8, bg: 1, text: '3. Charity (p.128)' },
      { id: 9, bg: 1, text: '4. Creativity (p.128)' },
      { id: 10, bg: 1, text: '5. Friendship (p.128)' },
      { id: 11, bg: 1, text: '6. Aspiration (p.128)' },
      { id: 12, bg: 2, text: '1. Honor (p.129)' },
      { id: 13, bg: 2, text: '2. Freedom (p.129)' },
      { id: 14, bg: 2, text: '3. Charity (p.129)' },
      { id: 15, bg: 2, text: '4. Greed (p.129)' },
      { id: 16, bg: 2, text: '5. People (p.129)' },
      { id: 17, bg: 2, text: '6. Redemption (p.129)' },
      { id: 18, bg: 3, text: '1. Beauty (p.131)' },
      { id: 19, bg: 3, text: '2. Tradition (p.131)' },
      { id: 20, bg: 3, text: '3. Creativity (p.131)' },
      { id: 21, bg: 3, text: '4. Greed (p.131)' },
      { id: 22, bg: 3, text: '5. People (p.131)' },
      { id: 23, bg: 3, text: '6. Honesty (p.131)' },
      { id: 24, bg: 4, text: '1. Respect (p.132)' },
      { id: 25, bg: 4, text: '2. Fairness (p.132)' },
      { id: 26, bg: 4, text: '3. Freedom (p.132)' },
      { id: 27, bg: 4, text: '4. Might (p.132)' },
      { id: 28, bg: 4, text: '5. Sincerity (p.132)' },
      { id: 29, bg: 4, text: '6. Destiny (p.132)' },
      { id: 30, bg: 5, text: '1. Community (p.133)' },
      { id: 31, bg: 5, text: '2. Generosity (p.133)' },
      { id: 32, bg: 5, text: '3. Freedom (p.133)' },
      { id: 33, bg: 5, text: '4. Greed (p.133)' },
      { id: 34, bg: 5, text: '5. People (p.133)' },
      { id: 35, bg: 5, text: '6. Aspiration (p.133)' },
      { id: 36, bg: 6, text: '1. Greater Good (p.134)' },
      { id: 37, bg: 6, text: '2. Logic (p.134)' },
      { id: 38, bg: 6, text: '3. Free Thinking (p.134)' },
      { id: 39, bg: 6, text: '4. Power (p.134)' },
      { id: 40, bg: 6, text: '5. Live and Let Live (p.134)' },
      { id: 41, bg: 6, text: '6. Self-Knowledge (p.134)' },
      { id: 42, bg: 7, text: '1. Respect (p.136)' },
      { id: 43, bg: 7, text: '2. Responsibility (p.136)' },
      { id: 44, bg: 7, text: '3. Independence (p.136)' },
      { id: 45, bg: 7, text: '4. Power (p.136)' },
      { id: 46, bg: 7, text: '5. Family (p.136)' },
      { id: 47, bg: 7, text: '6. Noble Obligation (p.136)' },
      { id: 48, bg: 8, text: '1. Change (p.137)' },
      { id: 49, bg: 8, text: '2. Greater Good (p.137)' },
      { id: 50, bg: 8, text: '3. Honor (p.137)' },
      { id: 51, bg: 8, text: '4. Might (p.137)' },
      { id: 52, bg: 8, text: '5. Nature (p.137)' },
      { id: 53, bg: 8, text: '6. Glory (p.137)' },
      { id: 54, bg: 9, text: '1. Knowledge (p.138)' },
      { id: 55, bg: 9, text: '2. Beauty (p.138)' },
      { id: 56, bg: 9, text: '3. Logic (p.138)' },
      { id: 57, bg: 9, text: '4. No Limits (p.138)' },
      { id: 58, bg: 9, text: '5. Power (p.138)' },
      { id: 59, bg: 9, text: '6. Self-Improvement (p.138)' },
      { id: 60, bg: 10, text: '1. Respect (p.139)' },
      { id: 61, bg: 10, text: '2. Fairness (p.139)' },
      { id: 62, bg: 10, text: '3. Freedom (p.139)' },
      { id: 63, bg: 10, text: '4. Mastery (p.139)' },
      { id: 64, bg: 10, text: '5. People (p.139)' },
      { id: 65, bg: 10, text: '6. Aspiration (p.139)' },
      { id: 66, bg: 11, text: '1. Greater Good (p.140)' },
      { id: 67, bg: 11, text: '2. Responsibility (p.140)' },
      { id: 68, bg: 11, text: '3. Independence (p.140)' },
      { id: 69, bg: 11, text: '4. Might (p.140)' },
      { id: 70, bg: 11, text: '5. Live and Let Live (p.140)' },
      { id: 71, bg: 11, text: '6. Nation (p.140)' },
      { id: 72, bg: 12, text: '1. Respect (p.141)' },
      { id: 73, bg: 12, text: '2. Community (p.141)' },
      { id: 74, bg: 12, text: '3. Change (p.141)' },
      { id: 75, bg: 12, text: '4. Retribution (p.141)' },
      { id: 76, bg: 12, text: '5. People (p.141)' },
      { id: 77, bg: 12, text: '6. Aspiration (p.141)' },
    ];
    public bonds: PersonalityTrait[] = [
      { id: 0, bg: 0, text: '1. (p.127)' },
      { id: 1, bg: 0, text: '2. (p.127)' },
      { id: 2, bg: 0, text: '3. (p.127)' },
      { id: 3, bg: 0, text: '4. (p.127)' },
      { id: 4, bg: 0, text: '5. (p.127)' },
      { id: 5, bg: 0, text: '6. (p.127)' },
      { id: 6, bg: 1, text: '1. (p.128)' },
      { id: 7, bg: 1, text: '2. (p.128)' },
      { id: 8, bg: 1, text: '3. (p.128)' },
      { id: 9, bg: 1, text: '4. (p.128)' },
      { id: 10, bg: 1, text: '5. (p.128)' },
      { id: 11, bg: 1, text: '6. (p.128)' },
      { id: 12, bg: 2, text: '1. (p.129)' },
      { id: 13, bg: 2, text: '2. (p.129)' },
      { id: 14, bg: 2, text: '3. (p.129)' },
      { id: 15, bg: 2, text: '4. (p.129)' },
      { id: 16, bg: 2, text: '5. (p.129)' },
      { id: 17, bg: 2, text: '6. (p.129)' },
      { id: 18, bg: 3, text: '1. (p.131)' },
      { id: 19, bg: 3, text: '2. (p.131)' },
      { id: 20, bg: 3, text: '3. (p.131)' },
      { id: 21, bg: 3, text: '4. (p.131)' },
      { id: 22, bg: 3, text: '5. (p.131)' },
      { id: 23, bg: 3, text: '6. (p.131)' },
      { id: 24, bg: 4, text: '1. (p.132)' },
      { id: 25, bg: 4, text: '2. (p.132)' },
      { id: 26, bg: 4, text: '3. (p.132)' },
      { id: 27, bg: 4, text: '4. (p.132)' },
      { id: 28, bg: 4, text: '5. (p.132)' },
      { id: 29, bg: 4, text: '6. (p.132)' },
      { id: 30, bg: 5, text: '1. (p.133)' },
      { id: 31, bg: 5, text: '2. (p.133)' },
      { id: 32, bg: 5, text: '3. (p.133)' },
      { id: 33, bg: 5, text: '4. (p.133)' },
      { id: 34, bg: 5, text: '5. (p.133)' },
      { id: 35, bg: 5, text: '6. (p.133)' },
      { id: 36, bg: 6, text: '1. (p.135)' },
      { id: 37, bg: 6, text: '2. (p.135)' },
      { id: 38, bg: 6, text: '3. (p.135)' },
      { id: 39, bg: 6, text: '4. (p.135)' },
      { id: 40, bg: 6, text: '5. (p.135)' },
      { id: 41, bg: 6, text: '6. (p.135)' },
      { id: 42, bg: 7, text: '1. (p.136)' },
      { id: 43, bg: 7, text: '2. (p.136)' },
      { id: 44, bg: 7, text: '3. (p.136)' },
      { id: 45, bg: 7, text: '4. (p.136)' },
      { id: 46, bg: 7, text: '5. (p.136)' },
      { id: 47, bg: 7, text: '6. (p.136)' },
      { id: 48, bg: 8, text: '1. (p.137)' },
      { id: 49, bg: 8, text: '2. (p.137)' },
      { id: 50, bg: 8, text: '3. (p.137)' },
      { id: 51, bg: 8, text: '4. (p.137)' },
      { id: 52, bg: 8, text: '5. (p.137)' },
      { id: 53, bg: 8, text: '6. (p.137)' },
      { id: 54, bg: 9, text: '1. (p.138)' },
      { id: 55, bg: 9, text: '2. (p.138)' },
      { id: 56, bg: 9, text: '3. (p.138)' },
      { id: 57, bg: 9, text: '4. (p.138)' },
      { id: 58, bg: 9, text: '5. (p.138)' },
      { id: 59, bg: 9, text: '6. (p.138)' },
      { id: 60, bg: 10, text: '1. (p.139)' },
      { id: 61, bg: 10, text: '2. (p.139)' },
      { id: 62, bg: 10, text: '3. (p.139)' },
      { id: 63, bg: 10, text: '4. (p.139)' },
      { id: 64, bg: 10, text: '5. (p.139)' },
      { id: 65, bg: 10, text: '6. (p.139)' },
      { id: 66, bg: 11, text: '1. (p.141)' },
      { id: 67, bg: 11, text: '2. (p.141)' },
      { id: 68, bg: 11, text: '3. (p.141)' },
      { id: 69, bg: 11, text: '4. (p.141)' },
      { id: 70, bg: 11, text: '5. (p.141)' },
      { id: 71, bg: 11, text: '6. (p.141)' },
      { id: 72, bg: 12, text: '1. (p.141)' },
      { id: 73, bg: 12, text: '2. (p.141)' },
      { id: 74, bg: 12, text: '3. (p.141)' },
      { id: 75, bg: 12, text: '4. (p.141)' },
      { id: 76, bg: 12, text: '5. (p.141)' },
      { id: 77, bg: 12, text: '6. (p.141)' },
    ];
    public flaws: PersonalityTrait[] = [
      { id: 0, bg: 0, text: '1. (p.127)' },
      { id: 1, bg: 0, text: '2. (p.127)' },
      { id: 2, bg: 0, text: '3. (p.127)' },
      { id: 3, bg: 0, text: '4. (p.127)' },
      { id: 4, bg: 0, text: '5. (p.127)' },
      { id: 5, bg: 0, text: '6. (p.127)' },
      { id: 6, bg: 1, text: '1. (p.128)' },
      { id: 7, bg: 1, text: '2. (p.128)' },
      { id: 8, bg: 1, text: '3. (p.128)' },
      { id: 9, bg: 1, text: '4. (p.128)' },
      { id: 10, bg: 1, text: '5. (p.128)' },
      { id: 11, bg: 1, text: '6. (p.128)' },
      { id: 12, bg: 2, text: '1. (p.130)' },
      { id: 13, bg: 2, text: '2. (p.130)' },
      { id: 14, bg: 2, text: '3. (p.130)' },
      { id: 15, bg: 2, text: '4. (p.130)' },
      { id: 16, bg: 2, text: '5. (p.130)' },
      { id: 17, bg: 2, text: '6. (p.130)' },
      { id: 18, bg: 3, text: '1. (p.131)' },
      { id: 19, bg: 3, text: '2. (p.131)' },
      { id: 20, bg: 3, text: '3. (p.131)' },
      { id: 21, bg: 3, text: '4. (p.131)' },
      { id: 22, bg: 3, text: '5. (p.131)' },
      { id: 23, bg: 3, text: '6. (p.131)' },
      { id: 24, bg: 4, text: '1. (p.132)' },
      { id: 25, bg: 4, text: '2. (p.132)' },
      { id: 26, bg: 4, text: '3. (p.132)' },
      { id: 27, bg: 4, text: '4. (p.132)' },
      { id: 28, bg: 4, text: '5. (p.132)' },
      { id: 29, bg: 4, text: '6. (p.132)' },
      { id: 30, bg: 5, text: '1. (p.133)' },
      { id: 31, bg: 5, text: '2. (p.133)' },
      { id: 32, bg: 5, text: '3. (p.133)' },
      { id: 33, bg: 5, text: '4. (p.133)' },
      { id: 34, bg: 5, text: '5. (p.133)' },
      { id: 35, bg: 5, text: '6. (p.133)' },
      { id: 36, bg: 6, text: '1. (p.135)' },
      { id: 37, bg: 6, text: '2. (p.135)' },
      { id: 38, bg: 6, text: '3. (p.135)' },
      { id: 39, bg: 6, text: '4. (p.135)' },
      { id: 40, bg: 6, text: '5. (p.135)' },
      { id: 41, bg: 6, text: '6. (p.135)' },
      { id: 42, bg: 7, text: '1. (p.136)' },
      { id: 43, bg: 7, text: '2. (p.136)' },
      { id: 44, bg: 7, text: '3. (p.136)' },
      { id: 45, bg: 7, text: '4. (p.136)' },
      { id: 46, bg: 7, text: '5. (p.136)' },
      { id: 47, bg: 7, text: '6. (p.136)' },
      { id: 48, bg: 8, text: '1. (p.137)' },
      { id: 49, bg: 8, text: '2. (p.137)' },
      { id: 50, bg: 8, text: '3. (p.137)' },
      { id: 51, bg: 8, text: '4. (p.137)' },
      { id: 52, bg: 8, text: '5. (p.137)' },
      { id: 53, bg: 8, text: '6. (p.137)' },
      { id: 54, bg: 9, text: '1. (p.138)' },
      { id: 55, bg: 9, text: '2. (p.138)' },
      { id: 56, bg: 9, text: '3. (p.138)' },
      { id: 57, bg: 9, text: '4. (p.138)' },
      { id: 58, bg: 9, text: '5. (p.138)' },
      { id: 59, bg: 9, text: '6. (p.138)' },
      { id: 60, bg: 10, text: '1. (p.139)' },
      { id: 61, bg: 10, text: '2. (p.139)' },
      { id: 62, bg: 10, text: '3. (p.139)' },
      { id: 63, bg: 10, text: '4. (p.139)' },
      { id: 64, bg: 10, text: '5. (p.139)' },
      { id: 65, bg: 10, text: '6. (p.139)' },
      { id: 66, bg: 11, text: '1. (p.141)' },
      { id: 67, bg: 11, text: '2. (p.141)' },
      { id: 68, bg: 11, text: '3. (p.141)' },
      { id: 69, bg: 11, text: '4. (p.141)' },
      { id: 70, bg: 11, text: '5. (p.141)' },
      { id: 71, bg: 11, text: '6. (p.141)' },
      { id: 72, bg: 12, text: '1. (p.141)' },
      { id: 73, bg: 12, text: '2. (p.141)' },
      { id: 74, bg: 12, text: '3. (p.141)' },
      { id: 75, bg: 12, text: '4. (p.141)' },
      { id: 76, bg: 12, text: '5. (p.141)' },
      { id: 77, bg: 12, text: '6. (p.141)' },
    ];
    public languages: Language[] = [
      { id: 0, text: 'Common' },
      { id: 1, text: 'Dwarvish' },
      { id: 2, text: 'Elvish' },
      { id: 3, text: 'Giant' },
      { id: 4, text: 'Gnomish' },
      { id: 5, text: 'Goblin' },
      { id: 6, text: 'Halfling' },
      { id: 7, text: 'Orc' },
      { id: 8, text: 'Abyssal' }, /* Exotic */
      { id: 9, text: 'Celestial' },
      { id: 10, text: 'Draconic' },
      { id: 11, text: 'Deep Speech' },
      { id: 12, text: 'Infernal' },
      { id: 13, text: 'Primordial' },
      { id: 14, text: 'Sylvan' },
      { id: 15, text: 'Undercommon' },
      { id: 16, text: 'Druidic' },
    ];
    public proficiencyLevels: ProficiencyLevel[] = [
      { level: 1, bonus: 2 },
      { level: 2, bonus: 2 },
      { level: 3, bonus: 2 },
      { level: 4, bonus: 2 },
      { level: 5, bonus: 3 },
      { level: 6, bonus: 3 },
      { level: 7, bonus: 3 },
      { level: 8, bonus: 3 },
      { level: 9, bonus: 4 },
      { level: 10, bonus: 4 },
      { level: 11, bonus: 4 },
      { level: 12, bonus: 4 },
      { level: 13, bonus: 5 },
      { level: 14, bonus: 5 },
      { level: 15, bonus: 5 },
      { level: 16, bonus: 5 },
      { level: 17, bonus: 6 },
      { level: 18, bonus: 6 },
      { level: 19, bonus: 6 },
      { level: 20, bonus: 6 },
    ];
    public alignments: Alignment[] = [
      { id: 0, lawfulChaotic: 'Lawful', goodEvil: 'Good' },
      { id: 1, lawfulChaotic: 'Neutral', goodEvil: 'Good' },
      { id: 2, lawfulChaotic: 'Chaotic', goodEvil: 'Good' },
      { id: 3, lawfulChaotic: 'Lawful', goodEvil: 'Neutral' },
      { id: 4, lawfulChaotic: 'True Neutral', goodEvil: '' },
      { id: 5, lawfulChaotic: 'Chaotic', goodEvil: 'Neutral' },
      { id: 6, lawfulChaotic: 'Lawful', goodEvil: 'Evil' },
      { id: 7, lawfulChaotic: 'Neutral', goodEvil: 'Evil' },
      { id: 8, lawfulChaotic: 'Chaotic', goodEvil: 'Evil' },
    ];
    public skills: Skill[] = [
      { id: 0, attr: 1, text: 'Acrobatics (Dex)' },
      { id: 1, attr: 4, text: 'Animal Handling (Wis)' },
      { id: 2, attr: 3, text: 'Arcana (Int)' },
      { id: 3, attr: 0, text: 'Athletics (Str)' },
      { id: 4, attr: 5, text: 'Deception (Cha)' },
      { id: 5, attr: 3, text: 'History (Int)' },
      { id: 6, attr: 4, text: 'Insight (Wis)' },
      { id: 7, attr: 5, text: 'Intimidation (Cha)' },
      { id: 8, attr: 3, text: 'Investigation (Int)' },
      { id: 9, attr: 4, text: 'Medicine (Wis)' },
      { id: 10, attr: 3, text: 'Nature (Int)' },
      { id: 11, attr: 4, text: 'Perception (Wis)' },
      { id: 12, attr: 5, text: 'Performance (Cha)' },
      { id: 13, attr: 5, text: 'Persuasion (Cha)' },
      { id: 14, attr: 3, text: 'Religion (Int)' },
      { id: 15, attr: 1, text: 'Sleight of Hand (Dex)' },
      { id: 16, attr: 1, text: 'Stealth (Dex)' },
      { id: 17, attr: 4, text: 'Survival (Wis)' },
    ];
    public standardStatArray: number[] = [15, 14, 13, 12, 10, 8];
    public statBlocks: StatBlock[] = [
      { id: 0, text: 'Strength' },
      { id: 1, text: 'Dexterity' },
      { id: 2, text: 'Constitution' },
      { id: 3, text: 'Intelligence' },
      { id: 4, text: 'Wisdom' },
      { id: 5, text: 'Charisma' },
    ];
    public statModifiers: Modifier[] = [
      { val: 1, modifier: -5 },
      { val: 3, modifier: -4 },
      { val: 5, modifier: -3 },
      { val: 7, modifier: -2 },
      { val: 9, modifier: -1 },
      { val: 11, modifier: 0 },
      { val: 13, modifier: 1 },
      { val: 15, modifier: 2 },
      { val: 17, modifier: 3 },
      { val: 19, modifier: 4 },
      { val: 21, modifier: 5 },
      { val: 23, modifier: 6 },
      { val: 25, modifier: 7 },
      { val: 27, modifier: 8 },
      { val: 29, modifier: 9 },
      { val: 30, modifier: 10 },
    ];
}

