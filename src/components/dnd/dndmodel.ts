import DndProps, { Equipment, EquipmentChoiceBlock } from './dndprops';
import DndState, { EquipmentChoiceModel, EquipmentModel } from './dndstate';
import Util from './util';

export default class DndModel {
  readonly props: DndProps;
  readonly state: DndState;

  constructor(props: DndProps, state: DndState) {
    this.state = state;
    this.props = props;
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
    for (let mod of this.props.statModifiers) {
      if (val <= mod.val)
        return mod.modifier;
    }
    return this.props.statModifiers[this.props.statModifiers.length - 1].modifier;
  };

  public get level(): number {
    // Computed character level from XP
    if (this.state.xp === undefined)
      return 1;

    let lev = 0;
    for (let xpLevel of this.props.xpLevels) {
      if (this.state.xp >= xpLevel.xp)
        lev++;
      else
        break;
    }

    return lev;
  };

  public get proficiencyBonus(): number {
    return this.props.proficiencyLevels[this.level - 1].bonus;
  };

  public get toolProficienciesText(): string {
    return this.state.background.toolProficiencies.map(prof => this.props.toolProficiencies[prof].text).join(', ');
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

  public get raceNamePageReferenceText(): string {
    let race = this.state.race;
    return 'Example ' + race.text + ' names can be found on page ' + race.page;
  };

  public get currentStatAssignmentText(): string {
    return this.props.statBlocks[this.state.statAssignmentIndex].text;
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
    return this.languages.map(language => this.props.languages[language].text).join(', ');
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
      text += this.props.equipment[equip.id].text;
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
      let text = this.props.equipment[equip.id].text;
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
    for (let lang of this.props.languages) {
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
    for (let prof of this.props.skills) {
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
    return this.props.equipment[id].text;
  };

  public isPack(itemId: number): boolean {
    let equipDef = this.props.equipment[itemId];
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
    let backpackItems = this.props.backpackContents.find(bp => bp.id === packId);
    if (typeof backpackItems === 'undefined')
      return packItems;

    for (let backpackItem of backpackItems.contents) {
      packItems.push({ id: backpackItem.id, num: backpackItem.num });
    }

    return packItems;
  };

  public extrasText(choice: EquipmentChoiceBlock): string {
    return choice.extras ? choice.extras.map(extra =>
      this.props.equipment[extra.id].text +
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
        equipmentData = this.props.equipment[choiceItem.id];
        if (equipmentData.type === 0) {
          weaponModel.push(this.addWeaponModel(equipmentData));
        }
      }
    }

    for (let equipment of this.state.equipment) {
      equipmentData = this.props.equipment[equipment.id];
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
        dmgType: this.props.damageTypes[equipmentData.damage || 0].text,
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

  generate() {
    this.processPdf();
  };

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

  fillPdfFields = (blob: any) => {
    let fields: any = {};
    let o = this.state;

    // Initiative: DEX modifier
    let initiative = this.statModifier(1);

    // Base armor class: 10 + DEX modifier (TODO: include shield & armor)
    let armorClass = 10 + this.statModifier(1);

    // HP: Starting HP + CON
    let hp = this.state.class.hitDice + this.statModifier(2);

    fields['PlayerName'] = [o.playerName];
    fields['CharacterName'] = [o.characterName];
    fields['CharacterName 2'] = [o.characterName];
    fields['ClassLevel'] = [o.class.text + ' ' + this.level];
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
    fields['Feat+Traits'] = [o.additionalFeaturesAndTraits];
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

    fields['STR'] = [Util.formatModifier(this.statModifier(0))];
    fields['DEX'] = [Util.formatModifier(this.statModifier(1))];
    fields['CON'] = [Util.formatModifier(this.statModifier(2))];
    fields['INT'] = [Util.formatModifier(this.statModifier(3))];
    fields['WIS'] = [Util.formatModifier(this.statModifier(4))];
    fields['CHA'] = [Util.formatModifier(this.statModifier(5))];

    fields['STRmod'] = [this.statTotal(0)];
    fields['DEXmod '] = [this.statTotal(1)];
    fields['CONmod'] = [this.statTotal(2)];
    fields['INTmod'] = [this.statTotal(3)];
    fields['WISmod'] = [this.statTotal(4)];
    fields['CHamod'] = [this.statTotal(5)];

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

    fields['HDTotal'] = ['1d' + o.class.hitDice];
    fields['ProfBonus'] = [this.proficiencyBonus];

    let profLangText = 'Languages: ' + this.languagesText;

    if (this.toolProficienciesText !== '')
      profLangText += '\n\nProficiencies: ' + this.toolProficienciesText;
    fields['ProficienciesLang'] = [profLangText];

    fields['AC'] = [armorClass];
    fields['Equipment'] = [this.equipmentText];

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
    let pp = 10 + this.statModifier(4);
    if (this.proficiencies.includes(11))
      pp += this.proficiencyBonus;

    fields['Passive'] = [pp];

    fields['Acrobatics'] = [Util.formatModifier(this.statModifier(1) + (this.proficiencies.includes(0) ? this.proficiencyBonus : 0))];
    fields['Animal'] = [Util.formatModifier(this.statModifier(4) + (this.proficiencies.includes(1) ? this.proficiencyBonus : 0))];
    fields['Arcana'] = [Util.formatModifier(this.statModifier(3) + (this.proficiencies.includes(2) ? this.proficiencyBonus : 0))];
    fields['Athletics'] = [Util.formatModifier(this.statModifier(0) + (this.proficiencies.includes(3) ? this.proficiencyBonus : 0))];
    fields['Deception '] = [Util.formatModifier(this.statModifier(5) + (this.proficiencies.includes(4) ? this.proficiencyBonus : 0))];
    fields['History '] = [Util.formatModifier(this.statModifier(3) + (this.proficiencies.includes(5) ? this.proficiencyBonus : 0))];
    fields['Insight'] = [Util.formatModifier(this.statModifier(4) + (this.proficiencies.includes(6) ? this.proficiencyBonus : 0))];
    fields['Intimidation'] = [Util.formatModifier(this.statModifier(5) + (this.proficiencies.includes(7) ? this.proficiencyBonus : 0))];
    fields['Investigation '] = [Util.formatModifier(this.statModifier(3) + (this.proficiencies.includes(8) ? this.proficiencyBonus : 0))];
    fields['Medicine'] = [Util.formatModifier(this.statModifier(4) + (this.proficiencies.includes(9) ? this.proficiencyBonus : 0))];
    fields['Nature'] = [Util.formatModifier(this.statModifier(3) + (this.proficiencies.includes(10) ? this.proficiencyBonus : 0))];
    fields['Perception '] = [Util.formatModifier(this.statModifier(4) + (this.proficiencies.includes(11) ? this.proficiencyBonus : 0))];
    fields['Performance'] = [Util.formatModifier(this.statModifier(5) + (this.proficiencies.includes(12) ? this.proficiencyBonus : 0))];
    fields['Persuasion'] = [Util.formatModifier(this.statModifier(5) + (this.proficiencies.includes(13) ? this.proficiencyBonus : 0))];
    fields['Religion'] = [Util.formatModifier(this.statModifier(3) + (this.proficiencies.includes(14) ? this.proficiencyBonus : 0))];
    fields['SleightofHand'] = [Util.formatModifier(this.statModifier(1) + (this.proficiencies.includes(15) ? this.proficiencyBonus : 0))];
    fields['Stealth '] = [Util.formatModifier(this.statModifier(1) + (this.proficiencies.includes(16) ? this.proficiencyBonus : 0))];
    fields['Survival'] = [Util.formatModifier(this.statModifier(4) + (this.proficiencies.includes(17) ? this.proficiencyBonus : 0))];

    // Proficiencies
    for (let prof of this.proficiencies) {
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
    let fileName = 'DnD5e - Lvl' + this.level + ' ' + this.state.race.text + ' ' + this.state.class.text;
    if (this.state.playerName !== '')
      fileName += ' ' + this.state.playerName;

    saveAs(outBlob, fileName + '.pdf');
  }
}


