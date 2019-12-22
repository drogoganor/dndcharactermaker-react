import DndProps, { Equipment } from './dndprops';
import DndState, { EquipmentChoiceModel } from './dndstate';
import Util from './util';

export default class DndModel {
  readonly props: DndProps;
  readonly state: DndState;

  constructor(props: DndProps, state: DndState) {
    this.state = state;
    this.props = props;
  }

  // Stats
  public statTotal(i: number): number {
    return this.state.statArray[i] + this.state.race.bonuses[i];
  }

  public statModifier(i: number): number {
    return this.getModifier(this.statTotal(i));
  }

  public savingThrow(i: number): number {
    var savingThrow = this.state.class.savingThrows.find(th => th === i) !== undefined ? this.proficiencyBonus : 0;

    return this.getModifier(this.statTotal(i)) + savingThrow;
  }

  private getModifier(val: number): number {
    // Get stat modifier from lookup table
    var i;
    for (i = 0; i < this.props.statModifiers.length; i++) {
      var mod = this.props.statModifiers[i];
      if (val <= mod.val)
        return mod.modifier;
    }
    return this.props.statModifiers[this.props.statModifiers.length - 1].modifier;
  };

  // Getters

  public get level(): number {
    // Computed character level from XP
    if (this.state.xp === null) // || this.state.xp === '' || !this.state.isInt(this.xp))
      return 1;

    var i;
    var lev = 0;
    for (i = 0; i < this.props.xpLevels.length; i++) {
      if (this.state.xp >= this.props.xpLevels[i].xp)
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
    // Nice text of selected tool proficiencies
    var i;
    var text = '';
    for (i = 0; i < this.state.toolProficiencies.length; i++) {
      var name = this.props.toolProficiencies[this.state.toolProficiencies[i]].text;
      text += name;
      if (i < this.state.toolProficiencies.length - 1)
        text += ', ';
    }
    return text;
  };

  public get currencyText(): string {
    var currency = this.state.background.currency.slice();

    // Nice text of character currencies
    var text = '';
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
    var race = this.state.race;
    return 'Example ' + race.text + ' names can be found on page ' + race.page;
  };

  public get currentStatAssignmentText(): string {
    return this.props.statBlocks[this.state.statAssignmentIndex].text;
  };

  public get proficiencesLeftText(): string {
    // Nice text label of how many proficiencies left to select
    var numBackgroundProfs = this.state.background.proficiencies.length;
    var numLeft = this.state.class.proficiencies.num - (this.state.proficiencies.length - numBackgroundProfs);

    return "Choose " + numLeft + " additional proficienc" + (numLeft > 1 ? "ies" : "y") + ":";
  };

  public get languagesLeftText(): string {
    // Nice text label to indicate how many additional languages you can choose
    var racelanguages = this.state.race.languages.length;
    var extraLangs = this.state.race.extraLanguages;
    var numBackgroundLangs = this.numBackgroundLanguages;
    var numLeft = racelanguages + extraLangs + numBackgroundLangs - this.state.languageids.length;

    return "Choose " + numLeft + " additional language" + (numLeft > 1 ? "s" : "") + ":";
  };

  public get languagesText(): string {
    // Nice text of selected languages
    var i;
    var text = '';
    for (i = 0; i < this.state.languageids.length; i++) {
      var langName = this.props.languages[this.state.languageids[i]].text;
      text += langName;
      if (i < this.state.languageids.length - 1)
        text += ', ';
    }
    return text;
  };

  public get traitText(): string {
    return this.props.personalityTraits[this.state.traits[0]].text;
  };

  public get idealText(): string {
    return this.props.ideals[this.state.ideals[0]].text;
  };

  public get bondText(): string {
    return this.props.bonds[this.state.bonds[0]].text;
  };

  public get flawText(): string {
    return this.props.flaws[this.state.flaws[0]].text;
  };

  public get traitsAndFeatures(): string[] {
    var result = [];
    var backgroundFeature = this.state.background.backgroundFeature;
    result.push(backgroundFeature);

    var classFeatures = this.state.class.features;
    var i;
    for (i = 0; i < classFeatures.length; i++) {
      var classFeature = classFeatures[i];
      if (classFeature.level <= this.level) {
        result.push(classFeature.text);
      }
    }

    return result;
  };

  public get equipmentText(): string {
    // Nice text of selected equipment
    var i;
    var text = '';
    var equipIds = this.equipmentList;

    for (i = 0; i < equipIds.length; i++) {
      text += this.props.equipment[equipIds[i].id].text;
      if (equipIds[i].num > 1)
        text += ' (' + equipIds[i].num + ')';
      if (i < equipIds.length - 1)
        text += ', ';
    }

    return text;
  };

  public get equipmentTextList(): string[] {
    // Array of equipment text
    var i;
    var arr = [];
    var equipIds = this.equipmentList;

    for (i = 0; i < equipIds.length; i++) {
      var text = this.props.equipment[equipIds[i].id].text;
      if (equipIds[i].num > 1)
        text += ' (' + equipIds[i].num + ')';
      arr.push(text);
    }

    return arr;
  };

  public get equipmentList(): any[] {
    // Get list of equipment ID's and text
    var i;
    var equipIds: any[] = [];
    for (i = 0; i < this.state.equipment.length; i++) {
      var thisEquip = this.state.equipment[i];
      if (!this.isPack(thisEquip.id)) {
        equipIds.push({ id: thisEquip.id, num: thisEquip.num });
      } else {
        equipIds = equipIds.concat(this.getPackItems(thisEquip.id)); // Add pack items
      }
    }

    for (i = 0; i < this.state.equipChoices.length; i++) {
      var equipChoice = this.state.equipChoices[i];
      if (equipChoice.chosen === true) {
        var e;
        for (e = 0; e < equipChoice.items.length; e++) {
          var item = equipChoice.items[e];
          if (!this.isPack(item.id)) {
            equipIds.push({ id: item.id, num: item.num });
          } else {
            equipIds = equipIds.concat(this.getPackItems(item.id)); // Add pack items
          }
        }
      }
    }

    return equipIds;
  };

  public get availableLanguages(): any[] {
    // List of all available additional languages to choose from, excluding already selected
    var langs = [];
    var i;
    for (i = 0; i < this.props.languages.length; i++) {
      var lang = this.props.languages[i];
      if (!this.state.languageids.includes(lang.id))
        langs.push(lang);
    }
    return langs;
  };

  public get availableProficiencies(): any[] {
    // List of all available proficiencies to choose from, excluding already selected
    var profs = [];
    var i;
    var classProfs = this.state.class.proficiencies.profs;
    var backgroundProfs = this.state.background.proficiencies;
    for (i = 0; i < this.props.skills.length; i++) {
      var prof = this.props.skills[i];

      if (!this.state.proficiencies.includes(i) && (classProfs.includes(i) || backgroundProfs.includes(i)))
        profs.push(prof);
    }
    return profs;
  };

  public get numBackgroundLanguages(): number {
    return this.state.background.languages;
  };

  // Computed

  public allStatsAssigned(): boolean {
    return this.state.statRolls.length === 0;
  };

  public allProficienciesChosen(): boolean {
    var numClassProfs = this.state.class.proficiencies.num;
    var numBackgroundProfs = this.state.background.proficiencies.length;

    if (this.state.proficiencies.length < numClassProfs + numBackgroundProfs)
      return false;
    return true;
  };

  public allLanguagesChosen(): boolean {
    var racelanguages = this.state.race.languages.length;
    var extraLangs = this.state.race.extraLanguages;
    var numBackgroundLangs = this.numBackgroundLanguages;

    if (this.state.languageids.length < racelanguages + extraLangs + numBackgroundLangs)
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
    var numBackgroundLangs = this.numBackgroundLanguages;
    return this.state.race.extraLanguages > 0 || numBackgroundLangs > 0;
  };

  public hasChosenAnyEquipment(): boolean {
    return this.equipmentChoiceModel().length < this.state.class.equipChoices.length;
  };

  public getEquipmentName(id: number): string {
    return this.props.equipment[id].text;
  };

  public isPack(itemId: number): boolean {
    var equipDef = this.props.equipment[itemId];
    if (equipDef.type !== 2)
      return false;
    return true;
  };

  hasWeaponProficiency(equipment: Equipment): boolean {
    var classWeaps = this.state.class.weaponProficiencies;
    if (classWeaps.categories.includes(equipment.type))
      return true;
    if (classWeaps.weapons.includes(equipment.id))
      return true;
    return false;
  };

  public equipmentChoiceModel = (): EquipmentChoiceModel[] => {
    // List of all available equipment choices to choose from, excluding already selected
    var equipChoices = this.state.class.equipChoices;
    var model: EquipmentChoiceModel[] = [];
    var i;
    for (i = 0; i < equipChoices.length; i++) {
      var equipChoice = equipChoices[i];
      var chosenChoices = this.state.equipChoices[i];
      if (chosenChoices.chosen === false || (chosenChoices.chosen === true && chosenChoices.remaining > 0)) {
        var modelRow: EquipmentChoiceModel = {
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

  public getPackItems = (packId: number) => {
    var packItems: any[] = [];

    if (!this.isPack(packId))
      return packItems;

    // Iterate and add pack equipment
    var backpackItems = this.props.backpackContents.find(bp => bp.id === packId);
    if (typeof backpackItems === 'undefined')
      return packItems;

    var i;
    for (i = 0; i < backpackItems.contents.length; i++) {
      var backpackItem = backpackItems.contents[i];
      packItems.push({ id: backpackItem.id, num: backpackItem.num });
    }

    return packItems;
  };

  buildWeaponModel(): any[] {
    // Build model of weaponry chosen or included, with atk and damage type
    var weaponModel = [];

    var i;
    var equipmentData;
    for (i = 0; i < this.state.equipChoices.length; i++) {
      var choiceItems = this.state.equipChoices[i].items;
      var x;
      for (x = 0; x < choiceItems.length; x++) {
        equipmentData = this.props.equipment[choiceItems[x].id];
        if (equipmentData.type === 0) {
          weaponModel.push(this.addWeaponModel(equipmentData));
        }
      }
    }

    for (i = 0; i < this.state.equipment.length; i++) {
      equipmentData = this.props.equipment[this.state.equipment[i].id];
      if (equipmentData.type === 0) {
        weaponModel.push(this.addWeaponModel(equipmentData));
      }
    }

    // Condense model (remove duplicates)
    var usedIds: number[] = [];
    var newWeaponModel = [];
    for (i = 0; i < weaponModel.length; i++) {
      var weapModel = weaponModel[i];
      if (!usedIds.includes(weapModel.id)) {
        usedIds.push(weapModel.id);
        newWeaponModel.push(weapModel);
      }
    }

    return newWeaponModel;
  };

  addWeaponModel(equipmentData: Equipment): any {
    if (equipmentData.type === 0) { // Weapon
      var newWeap = {
        id: equipmentData.id,
        name: equipmentData.text,
        dice: equipmentData.dice,
        dmgType: this.props.damageTypes[equipmentData.damage || 0].text,
        atkBonus: 0,
        dmgBonus: 0
      };

      // TODO: Calc attack bonus, this is going to be ugly
      var atkBonus = 0;
      var dmgBonus = 0;
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

  generate = () => {

    this.processPdf();
  };

  processPdf = () => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './DnD_5E_CharacterSheet - Form Fillable.pdf', true);
    xhr.responseType = 'arraybuffer';
    var process = this.fillPdfFields;
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
    var fields: any = {};
    var o = this.state;

    // Initiative: DEX modifier
    var initiative = this.statModifier(1);

    // Base armor class: 10 + DEX modifier (TODO: include shield & armor)
    var armorClass = 10 + this.statModifier(1);

    // HP: Starting HP + CON
    var hp = this.state.class.hitDice + this.statModifier(2);

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

    var i;
    for (i = 0; i < 2; i++) {
      var savingThrowStat = o.classStatSavingThrows[i];
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

    fields['HDTotal'] = [o.hitDice];
    fields['ProfBonus'] = [this.proficiencyBonus];

    var profLangText = 'Languages: ' + this.languagesText;

    if (this.toolProficienciesText !== '')
      profLangText += '\n\nProficiencies: ' + this.toolProficienciesText;
    fields['ProficienciesLang'] = [profLangText];

    fields['AC'] = [armorClass];
    fields['Equipment'] = [this.equipmentText];

    // Only an amount of gold
    //fields['CP'] = [o.currency[0]];
    //fields['SP'] = [o.currency[1]];
    //fields['EP'] = [o.currency[2]];
    fields['GP'] = [o.currency[3]];
    //fields['PP'] = [o.currency[4]];

    fields['PersonalityTraits '] = [this.traitText];
    fields['Ideals'] = [this.idealText];
    fields['Bonds'] = [this.bondText];
    fields['Flaws'] = [this.flawText];

    // https://rpg.stackexchange.com/questions/101169/how-does-passive-perception-work
    var pp = 10 + this.statModifier(4);
    if (o.proficiencies.includes(11))
      pp += this.proficiencyBonus;

    fields['Passive'] = [pp];

    fields['Acrobatics'] = [Util.formatModifier(this.statModifier(1) + (o.proficiencies.includes(0) ? this.proficiencyBonus : 0))];
    fields['Animal'] = [Util.formatModifier(this.statModifier(4) + (o.proficiencies.includes(1) ? this.proficiencyBonus : 0))];
    fields['Arcana'] = [Util.formatModifier(this.statModifier(3) + (o.proficiencies.includes(2) ? this.proficiencyBonus : 0))];
    fields['Athletics'] = [Util.formatModifier(this.statModifier(0) + (o.proficiencies.includes(3) ? this.proficiencyBonus : 0))];
    fields['Deception '] = [Util.formatModifier(this.statModifier(5) + (o.proficiencies.includes(4) ? this.proficiencyBonus : 0))];
    fields['History '] = [Util.formatModifier(this.statModifier(3) + (o.proficiencies.includes(5) ? this.proficiencyBonus : 0))];
    fields['Insight'] = [Util.formatModifier(this.statModifier(4) + (o.proficiencies.includes(6) ? this.proficiencyBonus : 0))];
    fields['Intimidation'] = [Util.formatModifier(this.statModifier(5) + (o.proficiencies.includes(7) ? this.proficiencyBonus : 0))];
    fields['Investigation '] = [Util.formatModifier(this.statModifier(3) + (o.proficiencies.includes(8) ? this.proficiencyBonus : 0))];
    fields['Medicine'] = [Util.formatModifier(this.statModifier(4) + (o.proficiencies.includes(9) ? this.proficiencyBonus : 0))];
    fields['Nature'] = [Util.formatModifier(this.statModifier(3) + (o.proficiencies.includes(10) ? this.proficiencyBonus : 0))];
    fields['Perception '] = [Util.formatModifier(this.statModifier(4) + (o.proficiencies.includes(11) ? this.proficiencyBonus : 0))];
    fields['Performance'] = [Util.formatModifier(this.statModifier(5) + (o.proficiencies.includes(12) ? this.proficiencyBonus : 0))];
    fields['Persuasion'] = [Util.formatModifier(this.statModifier(5) + (o.proficiencies.includes(13) ? this.proficiencyBonus : 0))];
    fields['Religion'] = [Util.formatModifier(this.statModifier(3) + (o.proficiencies.includes(14) ? this.proficiencyBonus : 0))];
    fields['SleightofHand'] = [Util.formatModifier(this.statModifier(1) + (o.proficiencies.includes(15) ? this.proficiencyBonus : 0))];
    fields['Stealth '] = [Util.formatModifier(this.statModifier(1) + (o.proficiencies.includes(16) ? this.proficiencyBonus : 0))];
    fields['Survival'] = [Util.formatModifier(this.statModifier(4) + (o.proficiencies.includes(17) ? this.proficiencyBonus : 0))];

    // Proficiencies
    for (i = 0; i < o.proficiencies.length; i++) {
      var prof = o.proficiencies[i];
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
    var weaponModel = this.buildWeaponModel();
    for (i = 0; i < weaponModel.length; i++) {
      var weap = weaponModel[i];
      var weapAtkBonusStr = Util.formatModifier(weap.atkBonus);
      var weapDmgStr = weap.dice + (weap.dmgBonus !== 0 ? ' ' + Util.formatModifier(weap.dmgBonus) : '') + ' ' + weap.dmgType;

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

    // @ts-ignore: Unreachable code error
    var filledPdf = pdfform().transform(blob, fields);
    var outBlob = new Blob([filledPdf], { type: 'application/pdf' });
    var fileName = 'zzz DnD5e - Lvl' + this.level + ' ' + this.state.race.text + ' ' + this.state.class.text;
    if (this.state.playerName !== '')
      fileName += ' ' + this.state.playerName;

    saveAs(outBlob, fileName + '.pdf');
  }
}


