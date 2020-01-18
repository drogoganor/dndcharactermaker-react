import React from 'react';
import reference from '../../core/reference';
import { Equipment } from '../../core/types';
import DndCharacter from '../../core/dndcharacter';
import Util from '../../core/util';

interface CharacterPdfModel extends DndCharacter {
    allLanguagesChosen: () => boolean;
    allProficienciesChosen: () => boolean;
    getProficiencies: () => number[];
}

export default class GeneratePDF extends React.Component<CharacterPdfModel> {
    constructor(props: CharacterPdfModel) {
        super(props);
        this.handleGenerate = this.handleGenerate.bind(this);
    }

    handleGenerate(event: any) {
        event.preventDefault();
        this.processPdf();
    }

    processPdf() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './DnD_5E_CharacterSheet - Form Fillable.pdf', true);
        xhr.responseType = 'arraybuffer';
        let process = this.fillPdfFields;
        xhr.onload = function () {
            if (this.status === 200) {
                process(this.response);
            } else {
                alert('Couldn\'t obtain the character sheet PDF blob.');
            }
        };
        xhr.send();
    };

    get allChoicesFulfilled(): boolean {
        return this.props.allProficienciesChosen() &&
            this.props.allStatsAssigned &&
            this.props.allEquipmentChosen &&
            this.props.allLanguagesChosen();
    };

    get specialtyText(): string {
        if (!this.props.background.specialty) {
            return '';
        } else {
            return this.props.background.specialty.name + ': ' + this.props.background.specialty.rolls[this.props.backgroundSpecialty].text;
        }
    };

    get traitsAndFeatures(): string[] {
        let result = [];
        let backgroundFeature = this.props.background.backgroundFeature;
        result.push(backgroundFeature);

        let classFeatures = this.props.class.features;
        for (let classFeature of classFeatures) {
            // We meet the level and it has no archetype requirement, or we match the archetype requirement
            // TODO: Also check for replacements
            if (classFeature.level <= this.props.level &&
                (classFeature.archetypeId === undefined || classFeature.archetypeId === this.props.archetype)) {
                result.push(classFeature.text);
            }
        }

        return result;
    };
    
    get additionalTraitsAndFeatures(): string[] {
        let result = [];

        let backgroundSpecialty = this.specialtyText;
        if (backgroundSpecialty !== '') {
            result.push(backgroundSpecialty);
        }

        let raceFeatures = this.props.race.extraFeatures;
        for (let raceFeature of raceFeatures) {
            result.push(raceFeature.text);
        }

        return result;
    };

    get proficiencyBonus(): number {
        return reference.proficiencyLevels[this.props.level - 1].bonus;
    };

    savingThrow(i: number): number {
        let savingThrow = this.props.class.savingThrows.find(th => th === i) !== undefined ? this.proficiencyBonus : 0;

        return Util.getModifier(this.props.statTotals[i]) + savingThrow;
    }

    get toolProficienciesText(): string {
        // TODO: This is repeated in proficiencies.tsx
        let result = this.props.background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
        let toolSelection = this.props.background.toolSelection;

        if (this.props.backgroundToolChoice !== '' && toolSelection !== undefined &&
            toolSelection.proficiencyId !== undefined) {
            result = result.replace('________', this.props.backgroundToolChoice.trim());
        }

        return result;
    };

    get languagesText(): string {
        let languages = this.props.race.languages.concat(this.props.languageids);
        return languages.map(language => reference.languages[language].text).join(', ');
    };

    get traitText(): string {
        return this.props.background.personalityTraits[this.props.trait].text;
    };

    get idealText(): string {
        return this.props.background.ideals[this.props.ideal].text;
    };

    get bondText(): string {
        return this.props.background.bonds[this.props.bond].text;
    };

    get flawText(): string {
        return this.props.background.flaws[this.props.flaw].text;
    };

    buildWeaponModel(): any[] {
        // Build model of weaponry chosen or included, with atk and damage type
        let weaponModel = [];

        let equipmentData;
        for (let equipChoices of this.props.equipChoices) {
            let choiceItems = equipChoices.items;
            for (let choiceItem of choiceItems) {
                equipmentData = reference.equipment[choiceItem.id];
                if (equipmentData.type === 0) {
                    weaponModel.push(this.addWeaponModel(equipmentData));
                }
            }
        }

        for (let equipment of this.props.equipment) {
            equipmentData = reference.equipment[equipment.id];
            if (equipmentData.type === 0) {
                weaponModel.push(this.addWeaponModel(equipmentData));
            }
        }

        // Condense model (remove duplicates)
        let usedIds: number[] = [];
        let newWeaponModel = [];
        for (let weapModel of weaponModel) {
            if (!usedIds.includes(weapModel.id)) {
                usedIds.push(weapModel.id);
                newWeaponModel.push(weapModel);
            }
        }

        return newWeaponModel;
    };

    addWeaponModel(equipmentData: Equipment): any {
        if (equipmentData.type === 0) { // Weapon
            let newWeap = {
                id: equipmentData.id,
                name: equipmentData.text,
                dice: equipmentData.dice,
                dmgType: reference.damageTypes[equipmentData.damage || 0].text,
                atkBonus: 0,
                dmgBonus: 0
            };

            // Calc attack bonus
            let atkBonus = 0;
            let dmgBonus = 0;
            if (equipmentData.melee === true) { // TODO: Check finesse, use DEX if true
                atkBonus += this.props.statModifiers[0]; // STRmod
                dmgBonus += this.props.statModifiers[0];
            } else {
                atkBonus += this.props.statModifiers[1]; // DEXmod
                dmgBonus += this.props.statModifiers[1];
            }

            if (this.hasWeaponProficiency(equipmentData)) {
                atkBonus += this.proficiencyBonus;
            }

            newWeap.atkBonus = atkBonus;
            newWeap.dmgBonus = dmgBonus;

            return newWeap;
        }
    };

    getArmorClass(): number {
        // No armor = 10 + dex
        let dex = this.props.statModifiers[1];
        let con = this.props.statModifiers[2];
        let wis = this.props.statModifiers[4];
        let defaultArmorClass = 10 + dex;
        let armorClass = defaultArmorClass;

        let armorEquips = this.getEquipmentByType(1);
        let cannotIncludeShield = false;

        if (armorEquips.length > 0) {
            // Find armor with highest AC
            let armor = armorEquips.reduce((a, b) => { return ((a.ac ?? 0) > (b.ac ?? 0)) ? a : b; });

            armorClass += armor.ac ?? 0;
            if (armor.armorCategory === 0) {
                armorClass += dex; // Plus dex modifier for light armor
            } else if (armor.armorCategory === 1) {
                armorClass += Math.min(dex, 2); // Plus dex modifier for medium armor to a max of 2
            }
        } else {
            // If no armor, check if we're a barb of level 2+ - unarmored defense (10 + dex + con)
            if (this.props.class.id === 0 && this.props.level > 1) {
                armorClass = 10 + dex + con;
            } else if (this.props.class.id === 5) {
                // Or a monk (only applies if we don't have a shield)
                cannotIncludeShield = true;
                armorClass = 10 + dex + wis;
            }
        }

        let shieldEquips = this.getEquipmentByType(1);

        // Also include +2 shield AC
        if (shieldEquips.length > 0) {
            armorClass += 2;

            if (cannotIncludeShield) { // If we can't include a shield (monk) but have one, default to 10 + dex AC
                armorClass = defaultArmorClass;
            }
        }

        return armorClass;
    }

    getEquipmentByType(type: number): Equipment[] {
        let equipModel = [];

        let equipmentData;
        for (let equipChoices of this.props.equipChoices) {
            let choiceItems = equipChoices.items;
            for (let choiceItem of choiceItems) {
                equipmentData = reference.equipment[choiceItem.id];
                if (equipmentData.type === type) {
                    equipModel.push(equipmentData);
                }
            }
        }

        for (let equipment of this.props.equipment) {
            equipmentData = reference.equipment[equipment.id];
            if (equipmentData.type === type) {
                equipModel.push(equipmentData);
            }
        }

        // Condense model (remove duplicates)
        let usedIds: number[] = [];
        let newEquipModel = [];
        for (let equip of equipModel) {
            if (!usedIds.includes(equip.id)) {
                usedIds.push(equip.id);
                newEquipModel.push(equip);
            }
        }

        return newEquipModel;
    };


    hasWeaponProficiency(equipment: Equipment): boolean {
        let classWeaps = this.props.class.weaponProficiencies;
        if (classWeaps.categories.includes(equipment.type))
            return true;
        if (classWeaps.weapons.includes(equipment.id))
            return true;
        return false;
    };

    get armorAndWeaponsProficiencyText(): string {
        let armorProfs = this.props.class.armorProficiencies;
        let weaponProfs = this.props.class.weaponProficiencies;
        let bonusWeaponProfs = this.props.race.bonusWeaponProficiencies ?? [];

        let result: string[] = [];
        for (let armorProf of armorProfs) {
            result.push(reference.armorCategories[armorProf].text);
        }

        for (let weaponCategory of weaponProfs.categories) {
            result.push(reference.weaponCategories[weaponCategory].text);
        }

        let uniqueWeaponArray = Array.from(new Set([...weaponProfs.weapons, ...bonusWeaponProfs]));
        for (let weapon of uniqueWeaponArray) {
            result.push(reference.equipment[weapon].text);
        }

        return result.join(', ');
    }

    fillPdfFields = (blob: any) => {
        let fields: any = {};
        let o = this.props;

        // Initiative: DEX modifier
        let initiative = o.statModifiers[1];

        // Base armor class: 10 + DEX modifier (TODO: include shield & armor)
        let armorClass = this.getArmorClass();

        // HP: Starting HP + CON
        let hp = o.class.hitDice + o.statModifiers[2] + ((o.level - 1) * o.class.hpIncreasePerLevel);

        fields['PlayerName'] = [o.playerName];
        fields['CharacterName'] = [o.characterName];
        fields['CharacterName 2'] = [o.characterName];
        fields['ClassLevel'] = [o.class.text + ' ' + o.level];
        fields['Race '] = [o.race.text];
        fields['Background'] = [o.background.text];

        fields['Age'] = [o.age];
        fields['Height'] = [o.height];
        fields['Weight'] = [o.weight];
        fields['Eyes'] = [o.eyes];
        fields['Skin'] = [o.skin];
        fields['Hair'] = [o.hair];
        fields['Allies'] = [o.allies];
        fields['FactionName'] = [o.organizations];

        let featuresAndTraits = this.additionalTraitsAndFeatures;
        if (o.additionalFeaturesAndTraits !== '') {
            featuresAndTraits.push(o.additionalFeaturesAndTraits);
        }

        fields['Feat+Traits'] = [featuresAndTraits.join('\n\n')];


        fields['Backstory'] = [o.backstory];
        fields['Treasure'] = [o.treasure];

        fields['Features and Traits'] = [this.traitsAndFeatures.join('\n\n')];

        if (o.appearance !== null) {
            fields['CHARACTER IMAGE'] = [o.appearance];
        }
        if (o.factionLogo !== null) {
            fields['Faction Symbol Image'] = [o.factionLogo];
        }

        fields['Alignment'] = [o.alignment.lawfulChaotic + ' ' + o.alignment.goodEvil];

        fields['XP'] = [o.xp];

        fields['STR'] = [Util.formatModifier(o.statModifiers[0])];
        fields['DEX'] = [Util.formatModifier(o.statModifiers[1])];
        fields['CON'] = [Util.formatModifier(o.statModifiers[2])];
        fields['INT'] = [Util.formatModifier(o.statModifiers[3])];
        fields['WIS'] = [Util.formatModifier(o.statModifiers[4])];
        fields['CHA'] = [Util.formatModifier(o.statModifiers[5])];

        fields['STRmod'] = [o.statTotals[0]];
        fields['DEXmod '] = [o.statTotals[1]];
        fields['CONmod'] = [o.statTotals[2]];
        fields['INTmod'] = [o.statTotals[3]];
        fields['WISmod'] = [o.statTotals[4]];
        fields['CHamod'] = [o.statTotals[5]];

        fields['HPMax'] = [hp];
        fields['Speed'] = [o.race.speed];
        fields['Initiative'] = [Util.formatModifier(initiative)];

        fields['ST Strength'] = [Util.formatModifier(this.savingThrow(0))];
        fields['ST Dexterity'] = [Util.formatModifier(this.savingThrow(1))];
        fields['ST Constitution'] = [Util.formatModifier(this.savingThrow(2))];
        fields['ST Intelligence'] = [Util.formatModifier(this.savingThrow(3))];
        fields['ST Wisdom'] = [Util.formatModifier(this.savingThrow(4))];
        fields['ST Charisma'] = [Util.formatModifier(this.savingThrow(5))];

        for (let savingThrowStat of o.class.savingThrows) {
            switch (savingThrowStat) {
                case 0:
                    fields['Check Box 11'] = [true];
                    break;
                case 1:
                    fields['Check Box 18'] = [true];
                    break;
                case 2:
                    fields['Check Box 19'] = [true];
                    break;
                case 3:
                    fields['Check Box 20'] = [true];
                    break;
                case 4:
                    fields['Check Box 21'] = [true];
                    break;
                case 5:
                    fields['Check Box 22'] = [true];
                    break;
                default:
                    break;
            }
        }

        fields['HDTotal'] = [this.props.level + 'd' + o.class.hitDice];
        fields['ProfBonus'] = [Util.formatModifier(this.proficiencyBonus)];

        let profLangText = this.armorAndWeaponsProficiencyText + '\n\nLanguages: ' + this.languagesText;

        if (this.toolProficienciesText !== '')
            profLangText += '\n\nProficiencies: ' + this.toolProficienciesText;
        fields['ProficienciesLang'] = [profLangText];

        fields['AC'] = [armorClass];
        fields['Equipment'] = [o.equipmentText];

        // Only an amount of gold
        //fields['CP'] = [o.currency[0]];
        //fields['SP'] = [o.currency[1]];
        //fields['EP'] = [o.currency[2]];
        fields['GP'] = [o.background.currency[3]];
        //fields['PP'] = [o.currency[4]];

        fields['PersonalityTraits '] = [this.traitText];
        fields['Ideals'] = [this.idealText];
        fields['Bonds'] = [this.bondText];
        fields['Flaws'] = [this.flawText];

        // https://rpg.stackexchange.com/questions/101169/how-does-passive-perception-work
        let pp = 10 + o.statModifiers[4];

        let proficiencies = o.getProficiencies();

        if (proficiencies.includes(11))
            pp += this.proficiencyBonus;

        fields['Passive'] = [pp];

        fields['Acrobatics'] = [Util.formatModifier(o.statModifiers[1] + (proficiencies.includes(0) ? this.proficiencyBonus : 0))];
        fields['Animal'] = [Util.formatModifier(o.statModifiers[4] + (proficiencies.includes(1) ? this.proficiencyBonus : 0))];
        fields['Arcana'] = [Util.formatModifier(o.statModifiers[3] + (proficiencies.includes(2) ? this.proficiencyBonus : 0))];
        fields['Athletics'] = [Util.formatModifier(o.statModifiers[0] + (proficiencies.includes(3) ? this.proficiencyBonus : 0))];
        fields['Deception '] = [Util.formatModifier(o.statModifiers[5] + (proficiencies.includes(4) ? this.proficiencyBonus : 0))];
        fields['History '] = [Util.formatModifier(o.statModifiers[3] + (proficiencies.includes(5) ? this.proficiencyBonus : 0))];
        fields['Insight'] = [Util.formatModifier(o.statModifiers[4] + (proficiencies.includes(6) ? this.proficiencyBonus : 0))];
        fields['Intimidation'] = [Util.formatModifier(o.statModifiers[5] + (proficiencies.includes(7) ? this.proficiencyBonus : 0))];
        fields['Investigation '] = [Util.formatModifier(o.statModifiers[3] + (proficiencies.includes(8) ? this.proficiencyBonus : 0))];
        fields['Medicine'] = [Util.formatModifier(o.statModifiers[4] + (proficiencies.includes(9) ? this.proficiencyBonus : 0))];
        fields['Nature'] = [Util.formatModifier(o.statModifiers[3] + (proficiencies.includes(10) ? this.proficiencyBonus : 0))];
        fields['Perception '] = [Util.formatModifier(o.statModifiers[4] + (proficiencies.includes(11) ? this.proficiencyBonus : 0))];
        fields['Performance'] = [Util.formatModifier(o.statModifiers[5] + (proficiencies.includes(12) ? this.proficiencyBonus : 0))];
        fields['Persuasion'] = [Util.formatModifier(o.statModifiers[5] + (proficiencies.includes(13) ? this.proficiencyBonus : 0))];
        fields['Religion'] = [Util.formatModifier(o.statModifiers[3] + (proficiencies.includes(14) ? this.proficiencyBonus : 0))];
        fields['SleightofHand'] = [Util.formatModifier(o.statModifiers[1] + (proficiencies.includes(15) ? this.proficiencyBonus : 0))];
        fields['Stealth '] = [Util.formatModifier(o.statModifiers[1] + (proficiencies.includes(16) ? this.proficiencyBonus : 0))];
        fields['Survival'] = [Util.formatModifier(o.statModifiers[4] + (proficiencies.includes(17) ? this.proficiencyBonus : 0))];

        // Proficiencies
        for (let prof of proficiencies) {
            switch (prof) {
                case 0:
                    fields['Check Box 23'] = [true];
                    break;
                case 1:
                    fields['Check Box 24'] = [true];
                    break;
                case 2:
                    fields['Check Box 25'] = [true];
                    break;
                case 3:
                    fields['Check Box 26'] = [true];
                    break;
                case 4:
                    fields['Check Box 27'] = [true];
                    break;
                case 5:
                    fields['Check Box 28'] = [true];
                    break;
                case 6:
                    fields['Check Box 29'] = [true];
                    break;
                case 7:
                    fields['Check Box 30'] = [true];
                    break;
                case 8:
                    fields['Check Box 31'] = [true];
                    break;
                case 9:
                    fields['Check Box 32'] = [true];
                    break;
                case 10:
                    fields['Check Box 33'] = [true];
                    break;
                case 11:
                    fields['Check Box 34'] = [true];
                    break;
                case 12:
                    fields['Check Box 35'] = [true];
                    break;
                case 13:
                    fields['Check Box 36'] = [true];
                    break;
                case 14:
                    fields['Check Box 37'] = [true];
                    break;
                case 15:
                    fields['Check Box 38'] = [true];
                    break;
                case 16:
                    fields['Check Box 39'] = [true];
                    break;
                case 17:
                    fields['Check Box 40'] = [true];
                    break;
                default:
                    break;
            }
        }

        // Weapons
        let weaponModel = this.buildWeaponModel();
        for (let i = 0; i < weaponModel.length; i++) {
            let weap = weaponModel[i];
            let weapAtkBonusStr = Util.formatModifier(weap.atkBonus);
            let weapDmgStr = weap.dice + (weap.dmgBonus !== 0 ? ' ' + Util.formatModifier(weap.dmgBonus) : '') + ' ' + weap.dmgType;

            switch (i) {
                case 0:
                    fields['Wpn Name'] = [weap.name];
                    fields['Wpn1 AtkBonus'] = [weapAtkBonusStr];
                    fields['Wpn1 Damage'] = [weapDmgStr];
                    break;
                case 1:
                    fields['Wpn Name 2'] = [weap.name];
                    fields['Wpn2 AtkBonus '] = [weapAtkBonusStr];
                    fields['Wpn2 Damage '] = [weapDmgStr];
                    break;
                case 2:
                    fields['Wpn Name 3'] = [weap.name];
                    fields['Wpn3 AtkBonus  '] = [weapAtkBonusStr];
                    fields['Wpn3 Damage '] = [weapDmgStr];
                    break;
                default:
                    break;
            }
        }

        // @ts-ignore: Legacy library
        let filledPdf = pdfform().transform(blob, fields);
        let outBlob = new Blob([filledPdf], { type: 'application/pdf' });
        let fileName = 'DnD5e - Lvl' + o.level + ' ' + o.race.text + ' ' + o.class.text;
        if (o.playerName !== '')
            fileName += ' ' + o.playerName;

        saveAs(outBlob, fileName + '.pdf');
    }

    public render(): JSX.Element {
        return (
            <div id="finish">
                <button
                    type="button"
                    id="generate"
                    disabled={!this.allChoicesFulfilled}
                    onClick={(e) => this.handleGenerate(e)}
                    className={'button is-large ' + (!this.allChoicesFulfilled ? 'is-outlined' : 'is-success')}
                >Generate PDF</button>
            </div>
        )
    }
}