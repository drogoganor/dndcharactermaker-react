import phb from './dndbook';
import { Background, Equipment, EquipmentChoiceBlock } from './types';
import DndCharacter, { EquipmentChoiceModel, EquipmentModel } from './dndcharacter';
import Util from './util';
import reference from './reference';

export default class DndModel {
  readonly state: DndCharacter;

  constructor(state: DndCharacter) {
    this.state = state;
  }

  public statTotal(i: number): number {
    return this.state.statArray[i] + this.state.race.bonuses[i];
  }

  public statModifier(i: number): number {
    return this.getModifier(this.statTotal(i));
  }

  public savingThrow(i: number): number {
    let savingThrow = this.state.class.savingThrows.find(th => th === i) !== undefined ? this.proficiencyBonus : 0;

    return this.getModifier(this.statTotal(i)) + savingThrow;
  }

  private getModifier(val: number): number {
    // Get stat modifier from lookup table
    for (let mod of reference.statModifiers) {
      if (val <= mod.val)
        return mod.modifier;
    }
    return reference.statModifiers[reference.statModifiers.length - 1].modifier;
  };

  public get level(): number { // Defunct
    // Computed character level from XP
    if (this.state.xp === undefined)
      return 1;

    let lev = 0;
    for (let xpLevel of reference.xpLevels) {
      if (this.state.xp >= xpLevel.xp)
        lev++;
      else
        break;
    }

    return lev;
  };

  public get proficiencyBonus(): number {
    return reference.proficiencyLevels[this.level - 1].bonus;
  };

  public get toolProficienciesText(): string {
    return this.state.background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
  };

  public get specialtyText(): string {
    if (!this.state.background.specialty) {
      return '';
    } else {
      return this.state.background.specialty.name + ': ' + this.state.background.specialty.rolls[this.state.backgroundSpecialty].text;
    }
  };

  public get canSelectArchetype(): boolean {
    if (this.level >= this.state.class.subclass.atLevel) {
      return true;
    }

    return false;
  };

  public get currencyText(): string {
    let currency = this.state.background.currency.slice();

    // Nice text of character currencies
    let text = '';
    if (currency[0] > 0)
      text += currency[0] + " CP ";
    if (currency[1] > 0)
      text += currency[1] + " SP ";
    if (currency[2] > 0)
      text += currency[2] + " EP ";
    if (currency[3] > 0)
      text += currency[3] + " GP ";
    if (currency[4] > 0)
      text += currency[4] + " PP ";
    return text;
  };

  public get proficiencesLeftText(): string {
    // Nice text label of how many proficiencies left to select
    let numLeft = this.state.class.proficiencies.num - this.state.proficiencies.length;

    return "Choose " + numLeft + " additional proficienc" + (numLeft > 1 ? "ies" : "y") + ":";
  };

  public get languagesLeftText(): string {
    // Nice text label to indicate how many additional languages you can choose
    let extraLangs = this.state.race.extraLanguages;
    let numBackgroundLangs = this.numBackgroundLanguages;
    let numLeft = extraLangs + numBackgroundLangs - this.state.languageids.length;

    return "Choose " + numLeft + " additional language" + (numLeft > 1 ? "s" : "") + ":";
  };

  public get languagesText(): string {
    return this.languages.map(language => reference.languages[language].text).join(', ');
  };

  public get traitText(): string {
    return this.state.background.personalityTraits[this.state.trait].text;
  };

  public get idealText(): string {
    return this.state.background.ideals[this.state.ideal].text;
  };

  public get bondText(): string {
    return this.state.background.bonds[this.state.bond].text;
  };

  public get flawText(): string {
    return this.state.background.flaws[this.state.flaw].text;
  };

  public get traitsAndFeatures(): string[] {
    let result = [];
    let backgroundFeature = this.state.background.backgroundFeature;
    result.push(backgroundFeature);

    let backgroundSpecialty = this.specialtyText;
    if (backgroundSpecialty !== '') {
      result.push(backgroundSpecialty);
    }

    let classFeatures = this.state.class.features;
    for (let classFeature of classFeatures) {
      // We meet the level and it has no archetype requirement, or we match the archetype requirement
      // TODO: Also check for replacements
      if (classFeature.level <= this.level &&
        (classFeature.archetypeId === undefined || classFeature.archetypeId === this.state.archetype)) {
        result.push(classFeature.text);
      }
    }

    return result;
  };

  public get equipment(): EquipmentModel[] {
    let equipModel = [];
    let bgEquip = this.state.background.equipment;
    let classEquip = this.state.class.fixedEquip;

    // Selected equipment
    for (let eq of this.state.equipment) {
      equipModel.push({ id: eq.id, num: eq.num ?? 1 });
    }

    // Class fixed equipment
    if (classEquip !== undefined) {
      for (let eq of classEquip) {
        equipModel.push({ id: eq.id, num: eq.num ?? 1 });
      }
    }

    // Background
    for (let eq of bgEquip) {
      equipModel.push({ id: eq, num: 1 });
    }

    return equipModel;
  }

  public get equipmentList(): any[] {
    // Get list of equipment ID's and text
    let equipIds: any[] = [];

    // Equipment choices
    for (let equipChoice of this.state.equipChoices) {
      if (equipChoice.chosen === true) {
        for (let item of equipChoice.items) {
          if (!this.isPack(item.id)) {
            equipIds.push({ id: item.id, num: item.num });
          } else {
            equipIds = equipIds.concat(this.getPackItems(item.id)); // Add pack items
          }
        }
      }
    }

    // Background & fixed equipment
    for (let thisEquip of this.equipment) {
      if (!this.isPack(thisEquip.id)) {
        equipIds.push({ id: thisEquip.id, num: thisEquip.num });
      } else {
        equipIds = equipIds.concat(this.getPackItems(thisEquip.id)); // Add pack items
      }
    }

    return equipIds;
  };

  public get equipmentText(): string {
    // Nice text of selected equipment
    let i;
    let text = '';
    let equipIds = this.equipmentList;

    for (i = 0; i < equipIds.length; i++) {
      let equip = equipIds[i];
      text += reference.equipment[equip.id].text;
      if (equip.num > 1)
        text += ' (' + equip.num + ')';
      if (i < equipIds.length - 1)
        text += ', ';
    }

    return text;
  };

  public get equipmentTextList(): string[] {
    // Array of equipment text
    let arr = [];
    let equipIds = this.equipmentList;

    for (let equip of equipIds) {
      let text = reference.equipment[equip.id].text;
      if (equip.num > 1)
        text += ' (' + equip.num + ')';
      arr.push(text);
    }

    return arr;
  };

  public get languages(): number[] {
    return this.state.race.languages.concat(this.state.languageids);
  };

  public get availableLanguages(): any[] {
    // List of all available additional languages to choose from, excluding already selected
    let langs = [];
    let languages = this.languages;
    for (let lang of reference.languages) {
      if (!languages.includes(lang.id))
        langs.push(lang);
    }
    return langs;
  };

  public get numBackgroundLanguages(): number {
    return this.state.background.languages;
  };

  public get proficiencies(): number[] {
    return this.state.background.proficiencies.concat(this.state.proficiencies);
  };

  public get availableProficiencies(): any[] {
    // List of all available proficiencies to choose from, excluding already selected
    let profs = [];
    let classProfs = this.state.class.proficiencies.profs;
    let backgroundProfs = this.state.background.proficiencies;
    for (let prof of reference.skills) {
      if (!this.proficiencies.includes(prof.id) && (classProfs.includes(prof.id) || backgroundProfs.includes(prof.id)))
        profs.push(prof);
    }
    return profs;
  };

  public allStatsAssigned(): boolean {
    return this.state.statRolls.length === 0;
  };

  public allProficienciesChosen(): boolean {
    let numClassProfs = this.state.class.proficiencies.num;
    let numBackgroundProfs = this.state.background.proficiencies.length;

    if (this.proficiencies.length < numClassProfs + numBackgroundProfs)
      return false;
    return true;
  };

  public allLanguagesChosen(): boolean {
    let extraLangs = this.state.race.extraLanguages;
    let numBackgroundLangs = this.numBackgroundLanguages;

    if (this.state.languageids.length < extraLangs + numBackgroundLangs)
      return false;
    return true;
  };

  public allEquipmentChosen(): boolean {
    return this.equipmentChoiceModel().length === 0;
  };

  public allChoicesFulfilled(): boolean {
    if (this.allEquipmentChosen() && this.allLanguagesChosen() && this.allProficienciesChosen() && this.allStatsAssigned())
      return true;
    return false;
  };

  public hasBonusLanguages(): boolean {
    // Whether the current class/background combo is able to select additional languages
    let numBackgroundLangs = this.numBackgroundLanguages;
    return this.state.race.extraLanguages > 0 || numBackgroundLangs > 0;
  };

  public hasChosenAnyEquipment(): boolean {
    return this.equipmentChoiceModel().length < this.state.class.equipChoices.length;
  };

  public getEquipmentName(id: number): string {
    return reference.equipment[id].text;
  };

  public isPack(itemId: number): boolean {
    let equipDef = reference.equipment[itemId];
    if (equipDef.type !== 2)
      return false;
    return true;
  };

  hasWeaponProficiency(equipment: Equipment): boolean {
    let classWeaps = this.state.class.weaponProficiencies;
    if (classWeaps.categories.includes(equipment.type))
      return true;
    if (classWeaps.weapons.includes(equipment.id))
      return true;
    return false;
  };

  public equipmentChoiceModel(): EquipmentChoiceModel[] {
    // List of all available equipment choices to choose from, excluding already selected
    let equipChoices = this.state.class.equipChoices;
    let model: EquipmentChoiceModel[] = [];

    for (let equipChoice of equipChoices) {
      let chosenChoices = this.state.equipChoices.find(eq => eq.id === equipChoice.id);
      if (chosenChoices === undefined) {
        let modelRow = {
          id: equipChoice.id,
          choices: equipChoice.choices,
          chosen: false,
          selection: equipChoice.id,
          remaining: 0,

          items: []
        };
        model.push(modelRow);
      }
      else if (chosenChoices.chosen === false || (chosenChoices.chosen === true && chosenChoices.remaining > 0)) {
        let modelRow = {
          id: equipChoice.id,
          choices: equipChoice.choices,
          chosen: chosenChoices.chosen,
          selection: chosenChoices.selection,
          remaining: chosenChoices.remaining,

          items: []
        };
        model.push(modelRow);
      }
    }
    return model;
  };

  public generateButtonBindings(): any {
    if (!this.allChoicesFulfilled()) {
      return {
        disabled: 'disabled'
      }
    }
    return {}
  };

  public getPackItems(packId: number): any[] {
    let packItems: any[] = [];

    if (!this.isPack(packId))
      return packItems;

    // Iterate and add pack equipment
    let backpackItems = reference.backpackContents.find(bp => bp.id === packId);
    if (typeof backpackItems === 'undefined')
      return packItems;

    for (let backpackItem of backpackItems.contents) {
      packItems.push({ id: backpackItem.id, num: backpackItem.num });
    }

    return packItems;
  };

  public extrasText(choice: EquipmentChoiceBlock): string {
    return choice.extras ? choice.extras.map(extra =>
      reference.equipment[extra.id].text +
      (extra.num && extra.num > 1 ? ' (' + extra.num + ')' : ''))
        .join(', ') + ' + ' : '';
  };

  buildWeaponModel(): any[] {
    // Build model of weaponry chosen or included, with atk and damage type
    let weaponModel = [];

    let equipmentData;
    for (let equipChoices of this.state.equipChoices) {
      let choiceItems = equipChoices.items;
      for (let choiceItem of choiceItems) {
        equipmentData = reference.equipment[choiceItem.id];
        if (equipmentData.type === 0) {
          weaponModel.push(this.addWeaponModel(equipmentData));
        }
      }
    }

    for (let equipment of this.state.equipment) {
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
        atkBonus += this.statModifier(0); // STRmod
        dmgBonus += this.statModifier(0);
      } else {
        atkBonus += this.statModifier(1); // DEXmod
        dmgBonus += this.statModifier(1);
      }

      if (this.hasWeaponProficiency(equipmentData)) {
        atkBonus += this.proficiencyBonus;
      }

      newWeap.atkBonus = atkBonus;
      newWeap.dmgBonus = dmgBonus;

      return newWeap;
    }
  };
  
}


