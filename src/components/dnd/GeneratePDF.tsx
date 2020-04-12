import React from 'react';
import reference from '../../core/reference';
import { Equipment } from '../../core/types';
import Util from '../../core/util';
import {IGlobalState} from "../../redux/reducer";
import { connect } from 'react-redux';
import { FormikProps } from 'formik';

interface IProps {
    form: FormikProps<IGlobalState>;
}

type StateProps = ReturnType<typeof mapStateToProps>;

const GeneratePDF = (props: IProps & StateProps) => {
    const { form, race, background, classType, languages, equip, xp, level, backgroundToolChoice, backgroundSpecialty, proficiency, archetype, playerName, characterName, alignment, stats, traits } = props;
    const allChoicesFulfilled = languages.allLanguagesChosen && proficiency.allProficienciesChosen && stats.allStatsAssigned && equip.allEquipmentChosen;

    return (
        <div id="finish">
            <button
            type="button"
            id="generate"
            disabled={!allChoicesFulfilled}
            onClick={(e) => handleGenerate(e)}
            className={'button is-large ' + (!allChoicesFulfilled ? 'is-outlined' : 'is-success')}
            >Generate PDF</button>
        </div>
    );

    ////////////////////

    function handleGenerate(event: any) {
        event.preventDefault();

        let xhr = new XMLHttpRequest();
        xhr.open('GET', './DnD_5E_CharacterSheet - Form Fillable.pdf', true);
        xhr.responseType = 'arraybuffer';
        let process = fillPdfFields;
        xhr.onload = function () {
            if (this.status === 200) {
                process(this.response);
            } else {
                alert('Couldn\'t obtain the character sheet PDF blob.');
            }
        };
        xhr.send();
    }

    function specialtyText(): string {
        if (!background.specialty) {
            return '';
        } else {
            return background.specialty.name + ': ' + background.specialty.rolls[backgroundSpecialty].text;
        }
    }

    function traitsAndFeatures(): string[] {
        let result = [];
        let backgroundFeature = background.backgroundFeature;
        result.push(backgroundFeature);

        let classFeatures = classType.features;
        for (let classFeature of classFeatures) {
            // We meet the level and it has no archetype requirement, or we match the archetype requirement
            // TODO: Also check for replacements
            if (classFeature.level <= level &&
                (classFeature.archetypeId === undefined || classFeature.archetypeId === archetype)) {
                result.push(classFeature.text);
            }
        }

        return result;
    }

    function additionalTraitsAndFeatures(): string[] {
        let result = [];

        let backgroundSpecialty = specialtyText();
        if (backgroundSpecialty !== '') {
            result.push(backgroundSpecialty);
        }

        let raceFeatures = race.extraFeatures;
        for (let raceFeature of raceFeatures) {
            result.push(raceFeature.text);
        }

        return result;
    }


    function proficiencyBonus(): number {
        return reference.proficiencyLevels[level - 1].bonus;
    }

    function savingThrow(i: number): number {
        let savingThrow = classType.savingThrows.find(th => th === i) !== undefined ? proficiencyBonus() : 0;

        return Util.getModifier(stats.statTotals[i]) + savingThrow;
    }

    function toolProficienciesText(): string {
        // TODO: This is repeated in proficiencies.tsx
        let result = background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
        let toolSelection = background.toolSelection;

        if (backgroundToolChoice !== '' && toolSelection !== undefined &&
            toolSelection.proficiencyId !== undefined) {
            result = result.replace('________', backgroundToolChoice.trim());
        }

        return result;
    }
    

    function languagesText(): string {
        let langs = race.languages.concat(languages.languageIds);
        return langs.map(language => reference.languages[language].text).join(', ');
    }

    function traitText(): string {
        return background.personalityTraits[traits.trait].text;
    }

    function idealText(): string {
        return background.ideals[traits.ideal].text;
    }

    function bondText(): string {
        return background.bonds[traits.bond].text;
    }

    function flawText(): string {
        return background.flaws[traits.flaw].text;
    }

    function buildWeaponModel(): any[] {
        // Build model of weaponry chosen or included, with atk and damage type
        let weaponModel = [];

        let equipmentData;
        for (let eqChoices of equip.equipChoices) {
            let choiceItems = eqChoices.items;
            for (let choiceItem of choiceItems) {
                equipmentData = reference.equipment[choiceItem.id];
                if (equipmentData.type === 0) {
                    weaponModel.push(addWeaponModel(equipmentData));
                }
            }
        }

        for (let equipment of equip.equipment) {
            equipmentData = reference.equipment[equipment.id];
            if (equipmentData.type === 0) {
                weaponModel.push(addWeaponModel(equipmentData));
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
    }

    function addWeaponModel(equipmentData: Equipment): any {
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
                atkBonus += stats.statModifiers[0]; // STRmod
                dmgBonus += stats.statModifiers[0];
            } else {
                atkBonus += stats.statModifiers[1]; // DEXmod
                dmgBonus += stats.statModifiers[1];
            }

            if (hasWeaponProficiency(equipmentData)) {
                atkBonus += proficiencyBonus();
            }

            newWeap.atkBonus = atkBonus;
            newWeap.dmgBonus = dmgBonus;

            return newWeap;
        }
    }

    function getArmorClass(): number {
        // No armor = 10 + dex
        let dex = stats.statModifiers[1];
        let con = stats.statModifiers[2];
        let wis = stats.statModifiers[4];
        let defaultArmorClass = 10 + dex;
        let armorClass = defaultArmorClass;

        let armorEquips = getEquipmentByType(1);
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
            if (classType.id === 0 && level > 1) {
                armorClass = 10 + dex + con;
            } else if (classType.id === 5) {
                // Or a monk (only applies if we don't have a shield)
                cannotIncludeShield = true;
                armorClass = 10 + dex + wis;
            }
        }

        let shieldEquips = getEquipmentByType(1);

        // Also include +2 shield AC
        if (shieldEquips.length > 0) {
            armorClass += 2;

            if (cannotIncludeShield) { // If we can't include a shield (monk) but have one, default to 10 + dex AC
                armorClass = defaultArmorClass;
            }
        }

        return armorClass;
    }

    function getEquipmentByType(type: number): Equipment[] {
        let equipModel = [];

        let equipmentData;
        for (let equipChoices of equip.equipChoices) {
            let choiceItems = equipChoices.items;
            for (let choiceItem of choiceItems) {
                equipmentData = reference.equipment[choiceItem.id];
                if (equipmentData.type === type) {
                    equipModel.push(equipmentData);
                }
            }
        }

        for (let equipment of equip.equipment) {
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
    }

    function hasWeaponProficiency(equipment: Equipment): boolean {
        let classWeaps = classType.weaponProficiencies;
        if (classWeaps.categories.includes(equipment.type))
            return true;
        return !!classWeaps.weapons.includes(equipment.id);
    }

    function armorAndWeaponsProficiencyText(): string {
        let armorProfs = classType.armorProficiencies;
        let weaponProfs = classType.weaponProficiencies;
        let bonusWeaponProfs = race.bonusWeaponProficiencies ?? [];

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

    function getProficiencies(): number[] {
        let profs = background.proficiencies.concat(proficiency.proficiencies);

        // If Half-Orc, add Intimidation
        if (race.id === 7) {
            profs.push(7);
        }

        // If Elf, add Perception
        else if (race.id >= 3 && race.id <= 6) {
            profs.push(11);
        }

        return profs;
    }

    function fillPdfFields(blob: any) {
        let fields: any = {};

        // Initiative: DEX modifier
        let initiative = stats.statModifiers[1];

        // Base armor class: 10 + DEX modifier (TODO: include shield & armor)
        let armorClass = getArmorClass();

        // HP: Starting HP + CON
        let hp = classType.hitDice + stats.statModifiers[2] + ((level - 1) * classType.hpIncreasePerLevel);

        fields['PlayerName'] = [playerName];
        fields['CharacterName'] = [characterName];
        fields['CharacterName 2'] = [characterName];
        fields['ClassLevel'] = [classType.text + ' ' + level];
        fields['Race '] = [race.text];
        fields['Background'] = [background.text];

        const { age, height, weight, eyeColor, skinColor, hairColor, allies, organizationFaction, additionalFeatureAndTraits, appearance, backstory, factionLogo, treasure } = form.values;

        fields['Age'] = [age];
        fields['Height'] = [height];
        fields['Weight'] = [weight];
        fields['Eyes'] = [eyeColor];
        fields['Skin'] = [skinColor];
        fields['Hair'] = [hairColor];
        fields['Allies'] = [allies];
        fields['FactionName'] = [organizationFaction];

        let featuresAndTraits = additionalTraitsAndFeatures();

        if (additionalFeatureAndTraits !== '') {
            featuresAndTraits.push(additionalFeatureAndTraits);
        }

        fields['Feat+Traits'] = [featuresAndTraits.join('\n\n')];


        fields['Backstory'] = [backstory];
        fields['Treasure'] = [treasure];

        fields['Features and Traits'] = [traitsAndFeatures().join('\n\n')];

        if (appearance !== null) {
            fields['CHARACTER IMAGE'] = [appearance];
        }
        if (factionLogo !== null) {
            fields['Faction Symbol Image'] = [factionLogo];
        }

        fields['Alignment'] = [alignment.lawfulChaotic + ' ' + alignment.goodEvil];

        fields['XP'] = [xp];

        fields['STR'] = [Util.formatModifier(stats.statModifiers[0])];
        fields['DEX'] = [Util.formatModifier(stats.statModifiers[1])];
        fields['CON'] = [Util.formatModifier(stats.statModifiers[2])];
        fields['INT'] = [Util.formatModifier(stats.statModifiers[3])];
        fields['WIS'] = [Util.formatModifier(stats.statModifiers[4])];
        fields['CHA'] = [Util.formatModifier(stats.statModifiers[5])];

        fields['STRmod'] = [stats.statTotals[0]];
        fields['DEXmod '] = [stats.statTotals[1]];
        fields['CONmod'] = [stats.statTotals[2]];
        fields['INTmod'] = [stats.statTotals[3]];
        fields['WISmod'] = [stats.statTotals[4]];
        fields['CHamod'] = [stats.statTotals[5]];

        fields['HPMax'] = [hp];
        fields['Speed'] = [race.speed];
        fields['Initiative'] = [Util.formatModifier(initiative)];

        fields['ST Strength'] = [Util.formatModifier(savingThrow(0))];
        fields['ST Dexterity'] = [Util.formatModifier(savingThrow(1))];
        fields['ST Constitution'] = [Util.formatModifier(savingThrow(2))];
        fields['ST Intelligence'] = [Util.formatModifier(savingThrow(3))];
        fields['ST Wisdom'] = [Util.formatModifier(savingThrow(4))];
        fields['ST Charisma'] = [Util.formatModifier(savingThrow(5))];

        for (let savingThrowStat of classType.savingThrows) {
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

        fields['HDTotal'] = [level + 'd' + classType.hitDice];
        fields['ProfBonus'] = [Util.formatModifier(proficiencyBonus())];

        let profLangText = armorAndWeaponsProficiencyText() + '\n\nLanguages: ' + languagesText();

        if (toolProficienciesText() !== '')
            profLangText += '\n\nProficiencies: ' + toolProficienciesText();
        fields['ProficienciesLang'] = [profLangText];

        fields['AC'] = [armorClass];
        fields['Equipment'] = [equip.equipmentText];

        // Only an amount of gold
        //fields['CP'] = [o.currency[0]];
        //fields['SP'] = [o.currency[1]];
        //fields['EP'] = [o.currency[2]];
        fields['GP'] = [background.currency[3]];
        //fields['PP'] = [o.currency[4]];

        fields['PersonalityTraits '] = [traitText()];
        fields['Ideals'] = [idealText()];
        fields['Bonds'] = [bondText()];
        fields['Flaws'] = [flawText()];

        // https://rpg.stackexchange.com/questions/101169/how-does-passive-perception-work
        let pp = 10 + stats.statModifiers[4];

        let proficiencies = getProficiencies();

        if (proficiencies.includes(11))
            pp += proficiencyBonus();

        fields['Passive'] = [pp];

        fields['Acrobatics'] = [Util.formatModifier(stats.statModifiers[1] + (proficiencies.includes(0) ? proficiencyBonus() : 0))];
        fields['Animal'] = [Util.formatModifier(stats.statModifiers[4] + (proficiencies.includes(1) ? proficiencyBonus() : 0))];
        fields['Arcana'] = [Util.formatModifier(stats.statModifiers[3] + (proficiencies.includes(2) ? proficiencyBonus() : 0))];
        fields['Athletics'] = [Util.formatModifier(stats.statModifiers[0] + (proficiencies.includes(3) ? proficiencyBonus() : 0))];
        fields['Deception '] = [Util.formatModifier(stats.statModifiers[5] + (proficiencies.includes(4) ? proficiencyBonus() : 0))];
        fields['History '] = [Util.formatModifier(stats.statModifiers[3] + (proficiencies.includes(5) ? proficiencyBonus() : 0))];
        fields['Insight'] = [Util.formatModifier(stats.statModifiers[4] + (proficiencies.includes(6) ? proficiencyBonus() : 0))];
        fields['Intimidation'] = [Util.formatModifier(stats.statModifiers[5] + (proficiencies.includes(7) ? proficiencyBonus() : 0))];
        fields['Investigation '] = [Util.formatModifier(stats.statModifiers[3] + (proficiencies.includes(8) ? proficiencyBonus() : 0))];
        fields['Medicine'] = [Util.formatModifier(stats.statModifiers[4] + (proficiencies.includes(9) ? proficiencyBonus() : 0))];
        fields['Nature'] = [Util.formatModifier(stats.statModifiers[3] + (proficiencies.includes(10) ? proficiencyBonus() : 0))];
        fields['Perception '] = [Util.formatModifier(stats.statModifiers[4] + (proficiencies.includes(11) ? proficiencyBonus() : 0))];
        fields['Performance'] = [Util.formatModifier(stats.statModifiers[5] + (proficiencies.includes(12) ? proficiencyBonus() : 0))];
        fields['Persuasion'] = [Util.formatModifier(stats.statModifiers[5] + (proficiencies.includes(13) ? proficiencyBonus() : 0))];
        fields['Religion'] = [Util.formatModifier(stats.statModifiers[3] + (proficiencies.includes(14) ? proficiencyBonus() : 0))];
        fields['SleightofHand'] = [Util.formatModifier(stats.statModifiers[1] + (proficiencies.includes(15) ? proficiencyBonus() : 0))];
        fields['Stealth '] = [Util.formatModifier(stats.statModifiers[1] + (proficiencies.includes(16) ? proficiencyBonus() : 0))];
        fields['Survival'] = [Util.formatModifier(stats.statModifiers[4] + (proficiencies.includes(17) ? proficiencyBonus() : 0))];

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
        let weaponModel = buildWeaponModel();
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
        let fileName = 'DnD5e - Lvl' + level + ' ' + race.text + ' ' + classType.text;
        if (playerName !== '')
            fileName += ' ' + playerName;

        saveAs(outBlob, fileName + '.pdf');
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const { race, background, classType, languages, equip, xp, level, backgroundToolChoice, backgroundSpecialty, proficiency, archetype, playerName, characterName, alignment, stats, traits } = state;
    return { race, background, classType, languages, equip, xp, level, backgroundToolChoice, backgroundSpecialty, proficiency, archetype, playerName, characterName, alignment, stats, traits };
};

export default connect(mapStateToProps)(GeneratePDF);
