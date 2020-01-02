
export interface Race {
  id: number;
  raceid: number;
  text: string;
  page: string;
  bonuses: number[];
  speed: number;
  extraLanguages: number;
  languages: number[];
}

export interface Class {
  id: number;
  text: string;
  features: Feature[];
  armorProficiencies: number[];
  weaponProficiencies: ClassWeaponProficiency;
  proficiencies: ClassProficiency;
  savingThrows: number[];
  hitDice: number;
  equipChoices: EquipmentChoice[];
  fixedEquip?: EquipmentFixedBlock[];
}

export interface Background {
  id: number;
  text: string;
  equipment: number[];
  backgroundFeature: string;
  currency: number[];
  languages: number;
  toolProficiencies: number[];
  proficiencies: number[];
  specialty?: BackgroundSpecialty;
  personalityTraits: PersonalityTrait[];
  ideals: PersonalityTrait[];
  bonds: PersonalityTrait[];
  flaws: PersonalityTrait[];
}

interface BackgroundSpecialty {
  name: string;
  rolls: BackgroundSpecialtyRoll[];
}

interface BackgroundSpecialtyRoll {
  id: number;
  text: string;
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

interface EquipmentChoice {
  id: number;
  choices: EquipmentChoiceBlock[];
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

interface Backpack {
  id: number;
  contents: BackpackContent[];
}

interface BackpackContent {
  id: number;
  num: number;
}

interface ToolProficiency {
  id: number;
  text: string;
}

interface PersonalityTrait {
  id: number;
  text: string;
}

interface Language {
  id: number;
  text: string;
}

interface ProficiencyLevel {
  level: number;
  bonus: number;
}

export interface Alignment {
  id: number;
  lawfulChaotic: string;
  goodEvil: string;
}

interface ClassProficiency {
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

interface XpLevel {
  xp: number;
  level: number;
}

export default class DndProps {
  public races: Race[] = [
    {
      id: 0,
      raceid: 0,
      text: 'Dwarf',
      page: '20',
      bonuses: [0, 0, 2, 0, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 1]
    },
    {
      id: 1,
      raceid: 0,
      text: 'Hill Dwarf',
      page: '20',
      bonuses: [0, 0, 2, 0, 1, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 1]
    },
    {
      id: 2,
      raceid: 0,
      text: 'Mountain Dwarf',
      page: '20',
      bonuses: [2, 0, 2, 0, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 1]
    },
    {
      id: 3,
      raceid: 1,
      text: 'Elf',
      page: '22',
      bonuses: [0, 2, 0, 0, 0, 0],
      speed: 30,
      extraLanguages: 0,
      languages: [0, 2]
    },
    {
      id: 4,
      raceid: 1,
      text: 'High Elf',
      page: '22',
      bonuses: [0, 2, 0, 1, 0, 0],
      speed: 30,
      extraLanguages: 1,
      languages: [0, 2]
    },
    {
      id: 5,
      raceid: 1,
      text: 'Wood Elf',
      page: '22',
      bonuses: [0, 2, 0, 0, 1, 0],
      speed: 35,
      extraLanguages: 0,
      languages: [0, 2]
    },
    {
      id: 6,
      raceid: 1,
      text: 'Dark Elf (Drow)',
      page: '22',
      bonuses: [0, 2, 0, 0, 0, 1],
      speed: 30,
      extraLanguages: 0,
      languages: [0, 2]
    },
    {
      id: 7,
      raceid: 2,
      text: 'Halfling',
      page: '27',
      bonuses: [0, 2, 0, 0, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 6]
    },
    {
      id: 8,
      raceid: 2,
      text: 'Halfling (Lightfoot)',
      page: '27',
      bonuses: [0, 2, 0, 0, 0, 1],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 6]
    },
    {
      id: 9,
      raceid: 2,
      text: 'Halfling (Stout)',
      page: '27',
      bonuses: [0, 2, 1, 0, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 6]
    },
    {
      id: 10,
      raceid: 3,
      text: 'Human',
      page: '30',
      bonuses: [1, 1, 1, 1, 1, 1],
      speed: 30,
      extraLanguages: 1,
      languages: [0]
    },
    {
      id: 11,
      raceid: 4,
      text: 'Dragonborn',
      page: '33',
      bonuses: [2, 0, 0, 0, 0, 1],
      speed: 30,
      extraLanguages: 0,
      languages: [0, 10]
    },
    {
      id: 12,
      raceid: 5,
      text: 'Gnome',
      page: '36',
      bonuses: [0, 0, 0, 2, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 4]
    },
    {
      id: 13,
      raceid: 5,
      text: 'Forest Gnome',
      page: '36',
      bonuses: [0, 1, 0, 2, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 4]
    },
    {
      id: 14,
      raceid: 5,
      text: 'Rock Gnome',
      page: '36',
      bonuses: [0, 0, 1, 2, 0, 0],
      speed: 25,
      extraLanguages: 0,
      languages: [0, 4]
    },
    {
      id: 15,
      raceid: 6,
      text: 'Half-Elf',
      page: '22 and 30',
      bonuses: [0, 0, 0, 0, 0, 2],
      speed: 30,
      extraLanguages: 1,
      languages: [0, 2]
    },
    {
      id: 16,
      raceid: 7,
      text: 'Half-Orc',
      page: '41',
      bonuses: [2, 0, 1, 0, 0, 0],
      speed: 30,
      extraLanguages: 0,
      languages: [0, 7]
    },
    {
      id: 17,
      raceid: 8,
      text: 'Tiefling',
      page: '43',
      bonuses: [0, 0, 0, 1, 0, 2],
      speed: 30,
      extraLanguages: 0,
      languages: [0, 12]
    },
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
      proficiencies: { num: 2, profs: [1, 3, 7, 10, 11, 17] },
      savingThrows: [0, 2],
      hitDice: 12,
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
      proficiencies: { num: 3, profs: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17] },
      savingThrows: [1, 5],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [5, 6, 9, 13, 14] },
      savingThrows: [4, 5],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [1, 2, 6, 9, 10, 11, 17] },
      savingThrows: [3, 4],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [0, 1, 3, 5, 6, 7, 11, 17] },
      savingThrows: [0, 2],
      hitDice: 10,
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
      proficiencies: { num: 2, profs: [0, 3, 5, 6, 14, 16] },
      savingThrows: [0, 1],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [3, 6, 7, 9, 13, 14] },
      savingThrows: [4, 5],
      hitDice: 10,
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
      proficiencies: { num: 3, profs: [1, 3, 6, 8, 10, 11, 16, 17] },
      savingThrows: [0, 1],
      hitDice: 10,
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
      proficiencies: { num: 4, profs: [0, 3, 4, 6, 7, 8, 11, 12, 13, 15, 16] },
      savingThrows: [1, 3],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [2, 4, 6, 7, 13, 14] },
      savingThrows: [2, 5],
      hitDice: 6,
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
      proficiencies: { num: 2, profs: [2, 4, 5, 7, 8, 10, 14] },
      savingThrows: [4, 5],
      hitDice: 8,
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
      proficiencies: { num: 2, profs: [2, 5, 6, 8, 9, 14] },
      savingThrows: [3, 4],
      hitDice: 6,
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
      equipment: [66, 67, 68, 69, 70, 71],
      backgroundFeature: 'Shelter of the Faithful (p.127)',
      currency: [0, 0, 0, 15, 0],
      languages: 2,
      toolProficiencies: [],
      proficiencies: [6, 14],
      personalityTraits: [
        { id: 0, text: "I idolize a parlicular hero of my faith, and constantly refer to that person's deeds and example." },
        { id: 1, text: "I can find common ground between the fiercest enemies, empathizing with them and always working toward peace." },
        { id: 2, text: "I see omens in every event and action. The gods try to speak to us, we just need to listen." },
        { id: 3, text: "Nothing can shake my optimistic attitude." },
        { id: 4, text: "I quote (or misquote) the sacred texts and proverbs in almost every situation." },
        { id: 5, text: "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods." },
        { id: 6, text: "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me." },
        { id: 7, text: "I've spent so long in the temple that I have little practical experience dealing with people in the outside world." },
      ],
      ideals: [
        { id: 0, text: "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)" },
        { id: 1, text: "Tradition. The ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)" },
        { id: 2, text: "Charity. I always try to help those in need, no matter what the personal cost. (Good)" },
        { id: 3, text: "Change. We must help bring about the changes the gods are constantly working in the world. (Chaotic)" },
        { id: 4, text: "Power. I hope to one day rise to the top of my faith's religious hierarchy. (Lawful)" },
        { id: 5, text: "Aspiration. I seek to prove my self worthy of my god's favor by matching my actions against his or her teachings. (Any)" },
      ],
      bonds: [
        { id: 0, text: "I would die to recover an ancient artifact of my faith that was lost long ago." },
        { id: 1, text: "I will someday get revenge on the corrupt temple hierarchy who branded me a heretic." },
        { id: 2, text: "I owe me life to the priest who took me in when my parents died." },
        { id: 3, text: "Everything I do is for the common people." },
        { id: 4, text: "I will do anything to protect the temple where I served." },
        { id: 5, text: "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy." },
      ],
      flaws: [
        { id: 0, text: "I judge others harshly, and myself even more severely." },
        { id: 1, text: "I put too much trust in those who wield power within my temple's hierarchy." },
        { id: 2, text: "My piety sometimes leads me to blindly trust those that profess faith in my god." },
        { id: 3, text: "I am inflexible in my thinking." },
        { id: 4, text: "I am suspicious of strangers and suspect the worst of them." },
        { id: 5, text: "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life." },
      ],
    },
    {
      id: 1,
      text: 'Charlatan',
      equipment: [72, 73, 74, 71],
      backgroundFeature: 'False Identity (p.128)',
      currency: [0, 0, 0, 15, 0],
      languages: 0,
      toolProficiencies: [0, 1],
      proficiencies: [4, 15],
      specialty: {
        name: 'Scheme',
        rolls: [
          { id: 0, text: "I cheat at games of chance." },
          { id: 1, text: "I shave coins or forge documents." },
          { id: 2, text: "I insinuate myself into people's lives to prey on their weakness and secure their fortunes." },
          { id: 3, text: "I put on new identities like clothes." },
          { id: 4, text: "I run sleight-of-hand cons on street corners." },
          { id: 5, text: "I convince people that worthless junk is worth their hard-earned money." },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I fall in and out of love easily, and am always pursuing someone." },
        { id: 1, text: "I have a joke for every occasion, especially occasions where humor is inappropriate." },
        { id: 2, text: "Flattery is my preferred trick for getting what I want." },
        { id: 3, text: "I'm a born gambler who can't resist taking a risk for a potential payoff." },
        { id: 4, text: "I lie about almost everything, even when there's no good reason to." },
        { id: 5, text: "Sarcasm and insults are my weapons of choice." },
        { id: 6, text: "I keep multiple holy symbols on me and invoke whatever deity might come in useful at any given moment." },
        { id: 7, text: "I pocket anything I see that might have some value." },
      ],
      ideals: [
        { id: 0, text: "Independence. I am a free spirit--no one tells me what to do. (Chaotic)" },
        { id: 1, text: "Fairness. I never target people who can't afford to lose a few coins. (Lawful)" },
        { id: 2, text: "Charity. I distribute money I acquire to the people who really need it. (Good)" },
        { id: 3, text: "Creativity. I never run the same con twice. (Chaotic)" },
        { id: 4, text: "Friendship. Material goods come and go. Bonds of friendship last forever. (Good)" },
        { id: 5, text: "Aspiration. I'm determined to make something of myself. (Any)" },
      ],
      bonds: [
        { id: 0, text: "I fleeced the wrong person and must work to ensure that this individual never crosses paths with me or those I care about." },
        { id: 1, text: "I owe everything to my mentor--a horrible person who's probably rotting in jail somewhere." },
        { id: 2, text: "Somewhere out there I have a child who doesn't know me. I'm making the world better for him or her." },
        { id: 3, text: "I come from a noble family, and one day I'll reclaim my lands and title from those who stole them from me." },
        { id: 4, text: "A powerful person killed someone I love. Some day soon, I'll have my revenge." },
        { id: 5, text: "I swindled and ruined a person who didn't deserve it. I seek to atone for my misdeeds but might never be able to forgive myself." },
      ],
      flaws: [
        { id: 0, text: "I can't resist a pretty face." },
        { id: 1, text: "I'm always in debt. I spend my ill-gotten gains on decadent luxuries faster than I bring them in." },
        { id: 2, text: "I'm convinced that no one could ever fool me in the way I fool others." },
        { id: 3, text: "I'm too greedy for my own good. I can't resist taking a risk if there's money involved." },
        { id: 4, text: "I can't resist swindling people who are more powerful than me." },
        { id: 5, text: "I hate to admit it and will hate myself for it, but I'll run and preserve my own hide if the going gets tough." },
      ],
    },
    {
      id: 2,
      text: 'Criminal',
      equipment: [75, 76, 71],
      backgroundFeature: 'Criminal Contact (p.129)',
      currency: [0, 0, 0, 15, 0],
      languages: 0,
      toolProficiencies: [2, 3],
      proficiencies: [4, 16],
      specialty: {
        name: 'Specialty',
        rolls: [
          { id: 0, text: "Blackmailer" },
          { id: 1, text: "Burglar" },
          { id: 2, text: "Enforcer" },
          { id: 3, text: "Fence" },
          { id: 4, text: "Highway Robber" },
          { id: 5, text: "Hired killer" },
          { id: 6, text: "Pickpocket" },
          { id: 7, text: "Smuggler" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I always have plan for what to do when things go wrong." },
        { id: 1, text: "I am always calm, no matter what the situation. I never raise my voice or let my emotions control me." },
        { id: 2, text: "The first thing I do in a new place is note the locations of everything valuable--or where such things could be hidden." },
        { id: 3, text: "I would rather make a new friend than a new enemy." },
        { id: 4, text: "I am incredibly slow to trust. Those who seem the fairest often have the most to hide." },
        { id: 5, text: "I don't pay attention to the risks in a situation. Never tell me the odds." },
        { id: 6, text: "The best way to get me to do something is to tell me I can't do it." },
        { id: 7, text: "I blow up at the slightest insult." },
      ],
      ideals: [
        { id: 0, text: "Honor. I don't steal from others in the trade. (Lawful)" },
        { id: 1, text: "Freedom. Chains are meant to be broken, as are those who would forge them. (Chaotic)" },
        { id: 2, text: "Charity. I steal from the wealthy so that I can help people in need. (Good)" },
        { id: 3, text: "Greed. I will do whatever it takes to become wealthy. (Evil)" },
        { id: 4, text: "People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care. (Neutral)" },
        { id: 5, text: "Redemption. There's a spark of good in everyone. (Good)" },
      ],
      bonds: [
        { id: 0, text: "I'm trying to pay off an old debt I owe to a generous benefactor." },
        { id: 1, text: "My ill-gotten gains go to support my family." },
        { id: 2, text: "Something important was taken from me, and I aim to steal it back." },
        { id: 3, text: "I will become the greatest thief that ever lived." },
        { id: 4, text: "I'm guilty of a terrible crime. I hope I can redeem myself for it." },
        { id: 5, text: "Someone I loved died because of a mistake I made. That will never happen again." },
      ],
      flaws: [
        { id: 0, text: "When I see something valuable, I can't think about anything but how to steal it." },
        { id: 1, text: "When faced with a choice between money and my friends, I usually choose the money." },
        { id: 2, text: "If there's a plan, I'll forget it. If I don't forget it, I'll ignore it." },
        { id: 3, text: "I have a 'tell' that reveals when I'm lying." },
        { id: 4, text: "I turn tail and run when things go bad." },
        { id: 5, text: "An innocent person is in prison for a crime that I committed. I'm okay with that." },
      ],
    },
    {
      id: 3,
      text: 'Entertainer',
      equipment: [63, 77, 78, 71],
      backgroundFeature: 'By Popular Demand (p.130)',
      currency: [0, 0, 0, 15, 0],
      languages: 0,
      toolProficiencies: [0, 4],
      proficiencies: [0, 12],
      specialty: {
        name: 'Routine',
        rolls: [
          { id: 0, text: "Actor" },
          { id: 1, text: "Dancer" },
          { id: 2, text: "Fire-eater" },
          { id: 3, text: "Jester" },
          { id: 4, text: "Juggler" },
          { id: 5, text: "Instrumentalist" },
          { id: 6, text: "Poet" },
          { id: 7, text: "Singer" },
          { id: 8, text: "Storyteller" },
          { id: 9, text: "Tumbler" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I know a story relevant to almost every situation." },
        { id: 1, text: "Whenever I come to a new place, I collect local rumors and spread gossip." },
        { id: 2, text: "I'm a hopeless romantic, always searching for that 'special someone'." },
        { id: 3, text: "Nobody stays angry at me or around me for long, since I can defuse any amount of tension." },
        { id: 4, text: "I love a good insult, even one directed at me." },
        { id: 5, text: "I get bitter if I'm not the center of attention." },
        { id: 6, text: "I'll settle for nothing less than perfection." },
        { id: 7, text: "I change my mood or my mind as quickly as I change key in a song." },
      ],
      ideals: [
        { id: 0, text: "Beauty. When I perform, I make the world better than it was. (Good)" },
        { id: 1, text: "Tradition. The stories, legends, and songs of the past must never be forgotten. (Lawful)" },
        { id: 2, text: "Creativity. The world is in need of new ideas and bold action. (Chaotic)" },
        { id: 3, text: "Greed. I'm only in it for the money and fame. (Evil)" },
        { id: 4, text: "People. I like seeing the smiles on people's faces when I perform. That's all that matters. (Neutral)" },
        { id: 5, text: "Honesty. Art should reflect the soul; it should come from within and reveal who we really are. (Any)" },
      ],
      bonds: [
        { id: 0, text: "My instrument is my most treasured possession, and it reminds me of someone I love." },
        { id: 1, text: "Someone stole my precious instrument, and someday I'll get it back." },
        { id: 2, text: "I want to be famous, whatever it takes." },
        { id: 3, text: "I idolize a hero of the old tales and measure my deeds against that person's." },
        { id: 4, text: "I will do anything to prove myself superior to me hated rival." },
        { id: 5, text: "I would do anything for the other members of my old troupe." },
      ],
      flaws: [
        { id: 0, text: "I'll do anything to win fame and renown." },
        { id: 1, text: "I'm a sucker for a pretty face." },
        { id: 2, text: "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around." },
        { id: 3, text: "I once satirized a noble who still wants my head. It was a mistake that I will likely repeat." },
        { id: 4, text: "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble." },
        { id: 5, text: "Despite my best efforts, I am unreliable to my friends." },
      ],
    },
    {
      id: 4,
      text: 'Folk Hero',
      equipment: [79, 80, 81, 70, 71],
      backgroundFeature: 'Rustic Hospitality (p.131)',
      currency: [0, 0, 0, 10, 0],
      languages: 0,
      toolProficiencies: [5, 6],
      proficiencies: [1, 17],
      specialty: {
        name: 'Defining event',
        rolls: [
          { id: 0, text: "I stood up to a tyrant's agents." },
          { id: 1, text: "I saved people during a natural disaster." },
          { id: 2, text: "I stood alone against a terrible monster." },
          { id: 3, text: "I stole from a corrupt merchant to help the poor." },
          { id: 4, text: "I led a militia to fight off an invading army." },
          { id: 5, text: "I broke into a tyrant's castle and stole weapons to arm the people." },
          { id: 6, text: "I trained the peasantry to use farm implements as weapons against a tyrant's soldiers." },
          { id: 7, text: "A lord rescinded an unpopular decree after I led a symbolic act of protect against it." },
          { id: 8, text: "A celestial, fey, or similar creature gave me a blessing or revealed my secret origin." },
          { id: 9, text: "Recruited into a lord's army, I rose to leadership and was commended for my heroism." },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I judge people by their actions, not their words." },
        { id: 1, text: "If someone is in trouble, I'm always willing to lend help." },
        { id: 2, text: "When I set my mind to something, I follow through no matter what gets in my way." },
        { id: 3, text: "I have a strong sense of fair play and always try to find the most equitable solution to arguments." },
        { id: 4, text: "I'm confident in my own abilities and do what I can to instill confidence in others." },
        { id: 5, text: "Thinking is for other people. I prefer action." },
        { id: 6, text: "I misuse long words in an attempt to sound smarter." },
        { id: 7, text: "I get bored easily. When am I going to get on with my destiny." },
      ],
      ideals: [
        { id: 0, text: "Respect. People deserve to be treated with dignity and respect. (Good)" },
        { id: 1, text: "Fairness. No one should get preferential treatment before the law, and no one is above the law. (Lawful)" },
        { id: 2, text: "Freedom. Tyrants must not be allowed to oppress the people. (Chaotic)" },
        { id: 3, text: "Might. If I become strong, I can take what I want--what I deserve. (Evil)" },
        { id: 4, text: "Sincerity. There's no good pretending to be something I'm not. (Neutral)" },
        { id: 5, text: "Destiny. Nothing and no one can steer me away from my higher calling. (Any)" },
      ],
      bonds: [
        { id: 0, text: "I have a family, but I have no idea where they are. One day, I hope to see them again." },
        { id: 1, text: "I worked the land, I love the land, and I will protect the land." },
        { id: 2, text: "A proud noble once gave me a horrible beating, and I will take my revenge on any bully I encounter." },
        { id: 3, text: "My tools are symbols of my past life, and I carry them so that I will never forget my roots." },
        { id: 4, text: "I protect those who cannot protect themselves." },
        { id: 5, text: "I wish my childhood sweetheart had come with me to pursue my destiny." },
      ],
      flaws: [
        { id: 0, text: "The tyrant who rules my land will stop at nothing to see me killed." },
        { id: 1, text: "I'm convinced of the significance of my destiny, and blind to my shortcomings and the risk of failure." },
        { id: 2, text: "The people who knew me when I was young know my shameful secret, so I can never go home again." },
        { id: 3, text: "I have a weakness for the vices of the city, especially hard drink." },
        { id: 4, text: "Secretly, I believe that things would be better if I were a tyrant lording over the land." },
        { id: 5, text: "I have trouble trusting in my allies." },
      ],
    },
    {
      id: 5,
      text: 'Guild Artisan',
      equipment: [79, 82, 83, 71],
      backgroundFeature: 'Guild Membership (p.133)',
      currency: [0, 0, 0, 15, 0],
      languages: 1,
      toolProficiencies: [5],
      proficiencies: [6, 13],
      specialty: {
        name: 'Guild Business',
        rolls: [
          { id: 0, text: "Alchemists and apothecaries" },
          { id: 1, text: "Armorers, locksmiths, and finesmiths" },
          { id: 2, text: "Brewers, distillers, and vintners" },
          { id: 3, text: "Calligraphers, scribes, and scriveners" },
          { id: 4, text: "Carpenters, roofers, and plasterers" },
          { id: 5, text: "Cartographers, surveyors, and chart-makers" },
          { id: 6, text: "Cobblers and shoemakers" },
          { id: 7, text: "Cooks and bakers" },
          { id: 8, text: "Glassblowers and glaziers" },
          { id: 9, text: "Jewelers and gemcutters" },
          { id: 10, text: "Leatherworkers, skinners, and tanners" },
          { id: 11, text: "Masons and stonecutters" },
          { id: 12, text: "Painters, limners, and sign-makers" },
          { id: 13, text: "Potters and tile-makers" },
          { id: 14, text: "Shipwrights and sailmakers" },
          { id: 15, text: "Smiths and metal-forgers" },
          { id: 16, text: "Tinkers, pewterers, and casters" },
          { id: 17, text: "Wagon-makers and wheelwrights" },
          { id: 18, text: "Weavers and dyers" },
          { id: 19, text: "Woodcarvers, coopers, and bowyers" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I believe that everything worth doing is worth doing right. I can't help it--I'm a perfectionist." },
        { id: 1, text: "I'm a snob who looks down on those who can't appreciate fine art." },
        { id: 2, text: "I always want to know how things work and what makes people tick." },
        { id: 3, text: "I'm full of witty aphorisms and have a proverb for every occasion." },
        { id: 4, text: "I'm rude to people who lack my commitment to hard work and fair play." },
        { id: 5, text: "I like to talk at length about my profession." },
        { id: 6, text: "I don't part with my money easily and will haggle tirelessly to get the best deal possible." },
        { id: 7, text: "I'm well known for my work, and I want to make sure everyone appreciates it. I'm always taken aback when people haven't heard of me." },
      ],
      ideals: [
        { id: 0, text: "Community. It is the duty of all civilized people to strengthen the bonds of community and the security of civilization. (Lawful)" },
        { id: 1, text: "Generosity. My talents were given to me so that I could use them to benefit the world. (Good)" },
        { id: 2, text: "Freedom. Everyone should be free to pursue his or her livelihood. (Chaotic)" },
        { id: 3, text: "Greed. I'm only in it for the money. (Evil)" },
        { id: 4, text: "People. I'm committed to the people I care about, not to ideals. (Neutral)" },
        { id: 5, text: "Aspiration. I work hard to be the best there is at my craft. (Any)" },
      ],
      bonds: [
        { id: 0, text: "The workshop where I learned my trade is the most important place in the world to me." },
        { id: 1, text: "I created a great work for someone, and then found them unworthy to receive it. I'm still looking for someone worthy." },
        { id: 2, text: "I owe my guild a great debt for forging me into the person I am today." },
        { id: 3, text: "I pursue wealth to secure someone's love." },
        { id: 4, text: "One day I will return to my guild and prove that I am the greatest artisan of them all." },
        { id: 5, text: "I will get revenge on the evil forces that destroyed my place of business and ruined my livelihood." },
      ],
      flaws: [
        { id: 0, text: "I'll do anything to get my hands on something rare or priceless." },
        { id: 1, text: "I'm quick to assume that someone is trying to cheat me." },
        { id: 2, text: "No one must ever learn that I once stole money from guild coffers." },
        { id: 3, text: "I'm never satisfied with what I have--I always want more." },
        { id: 4, text: "I would kill to acquire a noble title." },
        { id: 5, text: "I'm horribly jealous of anyone who outshines my handiwork. Everywhere I go, I'm surrounded by rivals." },
      ],
    },
    {
      id: 6,
      text: 'Hermit',
      equipment: [84, 85, 70, 86],
      backgroundFeature: 'Discovery (p.134)',
      currency: [0, 0, 0, 5, 0],
      languages: 1,
      toolProficiencies: [7],
      proficiencies: [9, 13],
      specialty: {
        name: 'Life of Seclusion',
        rolls: [
          { id: 0, text: "I was searching for spiritual enlightenment." },
          { id: 1, text: "I was partaking of communal living in accordance with the dictates of a religious order." },
          { id: 2, text: "I was exiled for a crime I didn't commit." },
          { id: 3, text: "I retreated from society after a life-altering event." },
          { id: 4, text: "I needed a quiet plase to work on my art, literature, music, or manifesto." },
          { id: 5, text: "I needed to commune with nature, far from civilization." },
          { id: 6, text: "I was the caretaker of an ancient ruin or relic." },
          { id: 7, text: "I was a pilgrim in search of a person, place, or relic of spiritual significance." },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt." },
        { id: 1, text: "I am utterly serene, even in the face of disaster." },
        { id: 2, text: "The leader of my community has something wise to say on every topic, and I am eager to share that wisdom." },
        { id: 3, text: "I feel tremendous empathy for all who suffer." },
        { id: 4, text: "I'm oblivious to etiquette and social expectations." },
        { id: 5, text: "I connect everything that happens to me to a grand cosmic plan." },
        { id: 6, text: "I often get lost in my own thoughts and contemplations, becoming oblivious to my surroundings." },
        { id: 7, text: "I am working on a grand philosophical theory and love sharing my ideas." },
      ],
      ideals: [
        { id: 0, text: "Greater Good. My gifts are meant to be shared with all, not used for my own benefit. (Good)" },
        { id: 1, text: "Logic. Emotions must not cloud our sense of what is right and true, or our logical thinking. (Lawful)" },
        { id: 2, text: "Free Thinking. Inquiry and curiosity are the pillars of progress. (Chaotic)" },
        { id: 3, text: "Power. Solitude and contemplation are paths toward mystical or magical power. (Evil)" },
        { id: 4, text: "Live and Let Live. Meddling in the affairs of others only causes trouble. (Neutral)" },
        { id: 5, text: "Self-Knowledge. If you know yourself, there're nothing left to know. (Any)" },
      ],
      bonds: [
        { id: 0, text: "Nothing is more important than the other members of my hermitage, order, or association." },
        { id: 1, text: "I entered seclusion to hide from the ones who might still be hunting me. I must someday confront them." },
        { id: 2, text: "I'm still seeking the enlightenment I pursued in my seclusion, and it still eludes me." },
        { id: 3, text: "I entered seclusion because I loved someone I could not have." },
        { id: 4, text: "Should my discovery come to light, it could bring ruin to the world." },
        { id: 5, text: "My isolation gave me great insight into a great evil that only I can destroy." },
      ],
      flaws: [
        { id: 0, text: "Now that I've returned to the world, I enjoy its delights a little too much." },
        { id: 1, text: "I harbor dark bloodthirsty thoughts that my isolation failed to quell." },
        { id: 2, text: "I am dogmatic in my thoughts and philosophy." },
        { id: 3, text: "I let my need to win arguments overshadow friendships and harmony." },
        { id: 4, text: "I'd risk too much to uncover a lost bit of knowledge." },
        { id: 5, text: "I like keeping secrets and won't share them with anyone." },
      ],
    },
    {
      id: 7,
      text: 'Noble',
      equipment: [72, 87, 88, 89],
      backgroundFeature: 'Position of Privilege (p.135)',
      currency: [0, 0, 0, 25, 0],
      languages: 1,
      toolProficiencies: [2],
      proficiencies: [5, 13],
      personalityTraits: [
        { id: 0, text: "My eloquent flattery makes everyone I talk to feel like the most wonderful and important person in the world." },
        { id: 1, text: "The common folk love me for my kindness and generosity." },
        { id: 2, text: "No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses." },
        { id: 3, text: "I take great pains to always look my best and follow the latest fashions." },
        { id: 4, text: "I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations." },
        { id: 5, text: "Despite my birth, I do not place myself above other folk. We all have the same blood." },
        { id: 6, text: "My favor, once lost, is lost forever." },
        { id: 7, text: "If you do me an injury, I will crush you, ruin your name, and salt your fields." },
      ],
      ideals: [
        { id: 0, text: "Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity. (Good)" },
        { id: 1, text: "Responsibility. It is my duty to respect the authority of those above me, just as those below me must respect mine. (Lawful)" },
        { id: 2, text: "Independence. I must prove that I can handle myself without the coddling of my family. (Chaotic)" },
        { id: 3, text: "Power. If I can attain more power, no one will tell me what to do. (Evil)" },
        { id: 4, text: "Family. Blood runs thicker than water. (Any)" },
        { id: 5, text: "Noble Obligation. It is my duty to protect and care for the people beneath me. (Good)" },
      ],
      bonds: [
        { id: 0, text: "I will face any challenge to win the approval of my family." },
        { id: 1, text: "My house's alliance with another noble family must be sustained at all costs." },
        { id: 2, text: "Nothing is more important that the other members of my family." },
        { id: 3, text: "I am in love with the heir of a family that my family despises." },
        { id: 4, text: "My loyalty to my sovereign is unwavering." },
        { id: 5, text: "The common folk must see me as a hero of the people." },
      ],
      flaws: [
        { id: 0, text: "I secretly believe that everyone is beneath me." },
        { id: 1, text: "I hide a truly scandalous secret that could ruin my family forever." },
        { id: 2, text: "I too often hear veiled insults and threats in every word addressed to me, and I'm quick to anger." },
        { id: 3, text: "I have an insatiable desire for carnal pleasures." },
        { id: 4, text: "In fact, the world does revolve around me." },
        { id: 5, text: "By my words and actions, I often bring shame to my family." },
      ],
    },
    {
      id: 8,
      text: 'Outlander',
      equipment: [90, 91, 92, 83, 71],
      backgroundFeature: 'Wanderer (p.136)',
      currency: [0, 0, 0, 10, 0],
      languages: 1,
      toolProficiencies: [4],
      proficiencies: [3, 17],
      specialty: {
        name: 'Origin',
        rolls: [
          { id: 0, text: "Forester" },
          { id: 1, text: "Trapper" },
          { id: 2, text: "Homesteader" },
          { id: 3, text: "Guide" },
          { id: 4, text: "Exile or outcast" },
          { id: 5, text: "Bounty hunter" },
          { id: 6, text: "Pilgrim" },
          { id: 7, text: "Tribal nomad" },
          { id: 8, text: "Hunter-gatherer" },
          { id: 9, text: "Tribal marauder" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I'm driven by a wanderlust that led me away from home." },
        { id: 1, text: "I watch over my friends as if they were a litter of newborn pups." },
        { id: 2, text: "I once ran twenty-five miles without stopping to warn my clan of an approaching orc horde. I'd do it again if I had to." },
        { id: 3, text: "I have a lesson for every situation, drawn from observing nature." },
        { id: 4, text: "I place no stock in wealthy or well-mannered folk. Money and manners won't save you from a hungry owlbear." },
        { id: 5, text: "I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them." },
        { id: 6, text: "I feel far more comfortable around animals than people." },
        { id: 7, text: "I was, in fact, raised by wolves." },
      ],
      ideals: [
        { id: 0, text: "Change. Life is like the seasons, in constant change, and we must change with it. (Chaotic)" },
        { id: 1, text: "Greater Good. It is each person's responsibility to make the most happiness for the whole tribe. (Good)" },
        { id: 2, text: "Honor. If I dishonor myself, I dishonor my whole clan. (Lawful)" },
        { id: 3, text: "Might. The strongest are meant to rule. (Evil)" },
        { id: 4, text: "Nature. The natural world is more important than all the constructs of civilization. (Neutral)" },
        { id: 5, text: "Glory. I must earn glory in battle, for myself and my clan. (Any)" },
      ],
      bonds: [
        { id: 0, text: "My family, clan, or tribe is the most important thing in my life, even when they are far from me." },
        { id: 1, text: "An injury to the unspoiled wilderness of my home is an injury to me." },
        { id: 2, text: "I will bring terrible wrath down on the evildoers who destroyed my homeland." },
        { id: 3, text: "I am the last of my tribe, and it is up to me to ensure their names enter legend." },
        { id: 4, text: "I suffer awful visions of a coming disaster and will do anything to prevent it." },
        { id: 5, text: "It is my duty to provide children to sustain my tribe." },
      ],
      flaws: [
        { id: 0, text: "I am too enamored of ale, wine, and other intoxicants." },
        { id: 1, text: "There's no room for caution in a life lived to the fullest." },
        { id: 2, text: "I remember every insult I've received and nurse a silent resentment toward anyone who's ever wronged me." },
        { id: 3, text: "I am slow to trust members of other races." },
        { id: 4, text: "Violence is my answer to almost any challenge." },
        { id: 5, text: "Don't expect me to save those who can't save themselves. It is nature's way that the strong thrive and the weak perish." },
      ],
    },
    {
      id: 9,
      text: 'Sage',
      equipment: [93, 94, 95, 96, 70, 71],
      backgroundFeature: 'Researcher (p.138)',
      currency: [0, 0, 0, 10, 0],
      languages: 2,
      toolProficiencies: [],
      proficiencies: [2, 5],
      specialty: {
        name: 'Specialty',
        rolls: [
          { id: 0, text: "Alchemist" },
          { id: 1, text: "Astronomer" },
          { id: 2, text: "Discredited academic" },
          { id: 3, text: "Librarian" },
          { id: 4, text: "Professor" },
          { id: 5, text: "Researcher" },
          { id: 6, text: "Wizard's apprentice" },
          { id: 7, text: "Scribe" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I use polysyllabic words to convey the impression of great erudition." },
        { id: 1, text: "I've read every book in the world's greatest libraries--or like to boast that I have." },
        { id: 2, text: "I'm used to helping out those who aren't as smart as I am, and I patiently explain anything and everything to others." },
        { id: 3, text: "There's nothing I like more than a good mystery." },
        { id: 4, text: "I'm willing to listen to every side of an argument before I make my own judgment." },
        { id: 5, text: "I...speak...slowly...when talking...to idiots...which...almost...everyone...is...compared...to me." },
        { id: 6, text: "I am horribly, horribly awkward in social situations." },
        { id: 7, text: "I'm convinced that people are always trying to steal my secrets." },
      ],
      ideals: [
        { id: 0, text: "Knowledge. The path to power and self-improvement is through knowledge. (Neutral)" },
        { id: 1, text: "Beauty. What is beautiful points us beyond itself toward what is true. (Good)" },
        { id: 2, text: "Logic. Emotions must not cloud our logical thinking. (Lawful)" },
        { id: 3, text: "No Limits. Nothing should fetter the infinite possibility inherent in all existence. (Chaotic)" },
        { id: 4, text: "Power. Knowledge is the path to power and domination. (Evil)" },
        { id: 5, text: "Self-improvement. The goal of a life of study is the betterment of oneself." },
      ],
      bonds: [
        { id: 0, text: "It is my duty to protect my students." },
        { id: 1, text: "I have an ancient text that holds terrible secrets that must not fall into the wrong hands." },
        { id: 2, text: "I work to preserve a library, university, scriptorium, or monastery." },
        { id: 3, text: "My life's work is a series of tomes related to a specific field of lore." },
        { id: 4, text: "I've been searching my whole life for the answer to a certain question." },
        { id: 5, text: "I sold my soul for knowledge. I hope to do great deeds and win it back." },
      ],
      flaws: [
        { id: 0, text: "I am easily distracted by the promise of information." },
        { id: 1, text: "Most people scream and run when they see a demon. I stop and take notes on its anatomy." },
        { id: 2, text: "Unlocking an ancient mystery is worth the price of a civilization." },
        { id: 3, text: "I overlook obvious solutions in favor of complicated ones." },
        { id: 4, text: "I speak without really thinking through my words, invariably insulting others." },
        { id: 5, text: "I can't keep a secret to save my life, or anyone else's." },
      ],
    },
    {
      id: 10,
      text: 'Sailor',
      equipment: [97, 98, 99, 70, 71],
      backgroundFeature: 'Ship\'s Passage (p.139)',
      currency: [0, 0, 0, 10, 0],
      languages: 0,
      toolProficiencies: [8, 9],
      proficiencies: [3, 11],
      personalityTraits: [
        { id: 0, text: "My friends know they can rely on me, no matter what." },
        { id: 1, text: "I work hard so that I can play hard when the work is done." },
        { id: 2, text: "I enjoy sailing into new ports and making new friends over a flagon of ale." },
        { id: 3, text: "I stretch the truth for the sake of a good story." },
        { id: 4, text: "To me, a tavern brawl is a nice way to get to know a new city." },
        { id: 5, text: "I never pass up a friendly wager." },
        { id: 6, text: "My language is as foul as an otyugh nest." },
        { id: 7, text: "I like a job well done, especially if I can convince someone else to do it." },
      ],
      ideals: [
        { id: 0, text: "Respect. The thing that keeps a ship together is mutual respect between captain and crew. (Good)" },
        { id: 1, text: "Fairness. We all do the work, so we all share in the rewards. (Lawful)" },
        { id: 2, text: "Freedom. The sea is freedom--the freedom to go anywhere and do anything. (Chaotic)" },
        { id: 3, text: "Master. I'm a predator, and the other ships on the sea are my prey. (Evil)" },
        { id: 4, text: "People. I'm committed to my crewmates, not to ideals. (Neutral)" },
        { id: 5, text: "Aspiration. Someday I'll own my own ship and chart my own destiny. (Any)" },
      ],
      bonds: [
        { id: 0, text: "I'm loyal to my captain first, everything else second." },
        { id: 1, text: "The ship is most important--crewmates and captains come and go." },
        { id: 2, text: "I'll always remember my first ship." },
        { id: 3, text: "In a harbor town, I have a paramour whose eyes nearly stole me from the sea." },
        { id: 4, text: "I was cheated of my fair share of the profits, and I want to get my due." },
        { id: 5, text: "Ruthless pirates murdered my captain and crewmates, plundered our ship, and left me to die. Vengeance will be mine." },
      ],
      flaws: [
        { id: 0, text: "I follow orders, even if I think they're wrong." },
        { id: 1, text: "I'll say anything to avoid having to do extra work." },
        { id: 2, text: "Once someone questions my courage, I never back down no matter how dangerous the situation." },
        { id: 3, text: "Once I start drinking, it's hard for me to stop." },
        { id: 4, text: "I can't help but pocket loose coins and other trinkets I come across." },
        { id: 5, text: "My pride will probably lead to my destruction." },
      ],
    },
    {
      id: 11,
      text: 'Soldier',
      equipment: [100, 101, 102, 70, 71],
      backgroundFeature: 'Military Rank (p.140)',
      currency: [0, 0, 0, 10, 0],
      languages: 0,
      toolProficiencies: [2, 6],
      proficiencies: [3, 7],
      specialty: {
        name: 'Specialty',
        rolls: [
          { id: 0, text: "Officer" },
          { id: 1, text: "Scout" },
          { id: 2, text: "Infantry" },
          { id: 3, text: "Cavalry" },
          { id: 4, text: "Healer" },
          { id: 5, text: "Quartermaster" },
          { id: 6, text: "Standard bearer" },
          { id: 7, text: "Support staff (cook, blacksmith, or the like)" },
        ]
      },
      personalityTraits: [
        { id: 0, text: "I'm always polite and respectful." },
        { id: 1, text: "I'm haunted by memories of war. I can't get the images of violence out of my mind." },
        { id: 2, text: "I've lost too many friends, and I'm slow to make new ones." },
        { id: 3, text: "I'm full of inspiring and cautionary tales from my military experience relevant to almost every combat situation." },
        { id: 4, text: "I can stare down a hellhound without flinching." },
        { id: 5, text: "I enjoy being strong and like breaking things." },
        { id: 6, text: "I have a crude sense of humor." },
        { id: 7, text: "I face problems head-on. A simple direct solution is the best path to success." },
      ],
      ideals: [
        { id: 0, text: "Greater Good. Our lot is to lay down our lives in defense of others. (Good)" },
        { id: 1, text: "Responsibility. I do what I must and obey just authority. (Lawful)" },
        { id: 2, text: "Independence. When people follow orders blindly they embrace a kind of tyranny. (Chaotic)" },
        { id: 3, text: "Might. In life as in war, the stronger force wins. (Evil)" },
        { id: 4, text: "Ideals aren't worth killing for or going to war for. (Neutral)" },
        { id: 5, text: "Nation. My city, nation, or people are all that matter. (Any)" },
      ],
      bonds: [
        { id: 0, text: "I would lay down my life for the people I served with." },
        { id: 1, text: "Someone saved my life on the battlefield. To this day, I will never leave a friend behind." },
        { id: 2, text: "My honor is my life." },
        { id: 3, text: "I'll never forget the crushing defeat my company suffered or the enemies who dealt it." },
        { id: 4, text: "Those who fight beside me are those worth dying for." },
        { id: 5, text: "I fight for those who cannot fight for themselves." },
      ],
      flaws: [
        { id: 0, text: "The monstrous enemy we faced in battle still leaves me quivering with fear." },
        { id: 1, text: "I have little respect for anyone who is not a proven warrior." },
        { id: 2, text: "I made a terrible mistake in battle that cost many lives--and I would do anything to keep that mistake secret." },
        { id: 3, text: "My hatred of my enemies is blind and unreasoning." },
        { id: 4, text: "I obey the law, even if the law causes misery." },
        { id: 5, text: "I'd rather eat my armor than admit when I'm wrong." },
      ],
    },
    {
      id: 12,
      text: 'Urchin',
      equipment: [95, 103, 104, 105, 70, 71],
      backgroundFeature: 'City Secrets (p.141)',
      currency: [0, 0, 0, 10, 0],
      languages: 0,
      toolProficiencies: [0, 3],
      proficiencies: [15, 16],
      personalityTraits: [
        { id: 0, text: "I hide scraps of food and trinkets away in my pockets." },
        { id: 1, text: "I ask a lot of questions." },
        { id: 2, text: "I like to squeeze into small places where no one else can get to me." },
        { id: 3, text: "I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms." },
        { id: 4, text: "I eat like a pig and have bad manners." },
        { id: 5, text: "I think anyone who's nice to me is hiding evil intent." },
        { id: 6, text: "I don't like to bathe." },
        { id: 7, text: "I bluntly say what other people are hinting or hiding." },
      ],
      ideals: [
        { id: 0, text: "Respect. All people, rich or poor, deserve respect. (Good)" },
        { id: 1, text: "Community. We have to take care of each other, because no one else is going to do it. (Lawful)" },
        { id: 2, text: "Change. The low are lifted up, and the high and mighty are brought down. Change is the nature of things. (Chaotic)" },
        { id: 3, text: "Retribution. The rich need to be shown what life and death are like in the gutters. (Evil)" },
        { id: 4, text: "People. I help people who help me--that's what keeps us alive. (Neutral)" },
        { id: 5, text: "Aspiration. I'm going to prove that I'm worthy of a better life. (Any)" },
      ],
      bonds: [
        { id: 0, text: "My town or city is my home, and I'll fight to defend it." },
        { id: 1, text: "I sponsor an orphanage to keep others from enduring what I was forced to endure." },
        { id: 2, text: "I owe my survival to another urchin who taught me to live on the streets." },
        { id: 3, text: "I owe a debt I can never repay to the person who took pity on me." },
        { id: 4, text: "I escaped my life of poverty by robbing an important person, and I'm wanted for it." },
        { id: 5, text: "No one else is going to have to endure the hardships I've been through." },
      ],
      flaws: [
        { id: 0, text: "If I'm outnumbered, I always run away from a fight." },
        { id: 1, text: "Gold seems like a lot of money to me, and I'll do just about anything for more of it." },
        { id: 2, text: "I will never fully trust anyone other than myself." },
        { id: 3, text: "I'd rather kill someone in their sleep than fight fair." },
        { id: 4, text: "It's not stealing if I need it more than someone else." },
        { id: 5, text: "People who don't take care of themselves get what they deserve." },
      ],
    },
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
}

