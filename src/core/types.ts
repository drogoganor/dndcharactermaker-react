export type Race = {
    id: number;
    raceid: number;
    text: string;
    page: string;
    bonuses: number[];
    speed: number;
    extraLanguages: number;
    languages: number[];
    extraFeatures: RaceFeature[];
    bonusWeaponProficiencies?: number[];
}

export type RaceFeature = {
    text: string;
}

export type Class = {
    id: number;
    text: string;
    features: Feature[];
    armorProficiencies: number[];
    weaponProficiencies: ClassWeaponProficiency;
    proficiencies: ClassProficiency;
    savingThrows: number[];
    hitDice: number;
    hpIncreasePerLevel: number;
    equipChoices: EquipmentChoice[];
    fixedEquip?: EquipmentFixedBlock[];
    subclass: Subclass;
    spellCasting?: Spellcasting;
}

type Subclass = {
    atLevel: number;
    text: string;
    archetypes: Archetype[];
}

type Archetype = {
    id: number;
    text: string;
}

type Spellcasting = {
    atLevel: number;
    requiresSubclass?: number;
    modifier?: number;
    saveDC?: number;
    spellTable?: SpellcasterLevel[];
}

type SpellcasterLevel = {
    level: number;
    numSpellsOfEachLevel: number[];
    spellsKnown?: number;
}

export type Background = {
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
    toolSelection?: BackgroundToolSelection;
}

export type Feat = {
    id: number;
    text: string;
    attributeRequirement?: number[];
    attributeMinimum?: number;
    attributeBoost?: number[];
    requiresSpellcasting?: boolean;
    requiresArmorProficiency?: number;
}

type BackgroundToolSelection = {
    text: string;
    proficiencyId?: number;
    itemId?: number;
    suggestions: string;
}

type BackgroundSpecialty = {
    name: string;
    rolls: BackgroundSpecialtyRoll[];
}

type BackgroundSpecialtyRoll = {
    id: number;
    text: string;
}

type ClassWeaponProficiency = {
    categories: number[];
    weapons: number[];
}

type Feature = {
    id: number;
    level: number;
    text: string;
    replaces?: number;
    archetypeId?: number;
}

export type ArmorCategory = {
    id: number;
    text: string;
}

export type EquipmentCategory = {
    id: number;
    text: string;
}

export type WeaponCategory = {
    id: number;
    text: string;
}

export type DamageType = {
    id: number;
    text: string;
}

type EquipmentChoice = {
    id: number;
    choices: EquipmentChoiceBlock[];
}

export type Equipment = {
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
    ac?: number;
    armorCategory?: number;
}

export type EquipmentChoiceBlock = {
    id: number;
    num: number;
    items: number[];
    extras?: EquipmentFixedBlock[];
}

type EquipmentFixedBlock = {
    id: number;
    num?: number;
}

export type Backpack = {
    id: number;
    contents: BackpackContent[];
}

type BackpackContent = {
    id: number;
    num: number;
}

export type ToolProficiency = {
    id: number;
    text: string;
}

type PersonalityTrait = {
    id: number;
    text: string;
}

export type Language = {
    id: number;
    text: string;
}

export type ProficiencyLevel = {
    level: number;
    bonus: number;
}

export type Alignment = {
    id: number;
    lawfulChaotic: string;
    goodEvil: string;
}

type ClassProficiency = {
    num: number;
    profs: number[];
}

export type Skill = {
    id: number;
    attr: number;
    text: string;
}

export type StatBlock = {
    id: number;
    text: string;
}

export type Modifier = {
    val: number;
    modifier: number;
}

export type XpLevel = {
    xp: number;
    level: number;
}

export type Book = {
    classes: Class[];
    backgrounds: Background[];
    races: Race[];
}
