import DndProps, { Equipment, EquipmentChoiceBlock, Classes, Races, Backgrounds } from './dndprops';
// import FileSaver from 'file-saver'
// import 'text-encoding'
// import 'xmldom'
// import pdfform from './pdfform'

interface EquipmentModel {
    id: number;
    num: number;
}

interface EquipmentChoiceModel {
    id: number;
    chosen: boolean;
    selection: number;
    remaining: number;
    items: EquipmentModel[];
    
    // WTF
    choices?: EquipmentChoiceBlock[];
}

export class DndState {
    public statAssignmentIndex: number = 0;
    public statRolls: number[] = [15, 14, 13, 12, 10, 8];

    public level: number = 1;
    public characterName: string = '';
    public playerName: string = '';
    public race: string = 'Dwarf';
    public raceid: number = 0;
    public class: string = 'Barbarian';
    public classid: number = 0;
    public alignmentLawChaos: string = 'Lawful';
    public alignmentGoodEvil: string = 'Good';
    public background: string = 'Acolyte';
    public backgroundid: number = 0;
    public statArray: number[] = Array(6).fill(null);
    public statModifiers: number[] = Array(6).fill(null);
    public raceStatBonuses: number[] = [0, 0, 2, 0, 0, 0];
    public classStatBonuses: number[] = Array(6).fill(0);
    public finalStats: number[] = Array(6).fill(null);
    public savingThrows: number[] = Array(6).fill(null);
    public classStatSavingThrows: number[] = [0, 2];
    public hitDice: string = '1d12';
    public xp: number = 0;
    public hp: number = 6;
    public speed: number = 25;
    public initiative: number = 0;
    public proficiencyBonus: number = 2;
    public languageids: number[] = [0, 1];
    public armorClass: number = 10;
    public proficiencies: number[] = [6, 14];
    public toolProficiencies: number[] = [];
    public equipment: EquipmentModel[] = [
        { id: 66, num: 1, },
        { id: 67, num: 1, },
        { id: 68, num: 1, },
        { id: 69, num: 1, },
        { id: 70, num: 1, },
        { id: 71, num: 1, },
        { id: 4, num: 4, },
        { id: 37, num: 1, },
    ];
    public equipChoices: EquipmentChoiceModel[] = [
        { id: 0, chosen: false, selection: 0, remaining: 1, items: [] },
        { id: 1, chosen: false, selection: 0, remaining: 1, items: [] },
    ];
    public currency: number[] = [0, 0, 0, 15, 0];
    public traits: number[] = [0];
    public personalityTraitsText: string = '';
    public ideals: number[] = [0];
    public idealsText: string = '';
    public bonds: number[] = [0];
    public bondsText: string = '';
    public flaws: number[] = [0];
    public flawsText: string = '';
    public weaponModel: any[] = [];
    public age: string = '20';
    public height: string = '6\'1';
    public weight: string = '170lbs';
    public eyes: string = 'Blue';
    public skin: string = 'Fair';
    public hair: string = 'Black';
    public appearance: any = null; // Image
    public factionLogo: any = null; // Image
    public organizations: string = '';
    public allies: string = '';
    public backstory: string = '';
    public treasure: string = '';
    public additionalFeaturesAndTraits: string = '';
}

export default class DndCharacterMaker {
    readonly props: DndProps;
    state: DndState;

    constructor(props: DndProps) {
        this.props = props;
        this.state = new DndState();
    }

    // Computed
    
    public allStatsAssigned = () => {
        return this.state.statRolls.length === 0;
    };


    public allProficienciesChosen = () => {
        var numClassProfs = this.props.classProficiencies[this.state.classid].num;
        var numBackgroundProfs = this.props.backgroundProficiencies[this.state.backgroundid].profs.length;
  
        if (this.state.proficiencies.length < numClassProfs + numBackgroundProfs)
          return false;
        return true;
    };

    public allLanguagesChosen = () => {
        var racelanguages = this.props.raceLanguages[this.props.races[this.state.raceid].raceid].languages.length;
        var extraLangs = this.props.raceExtraLanguages[this.state.raceid].extras;
        var numBackgroundLangs = this.getNumBackgroundLanguages();
  
        if (this.state.languageids.length < racelanguages + extraLangs + numBackgroundLangs)
          return false;
        return true;
    };

    public allEquipmentChosen = () => {
        return this.equipmentChoiceModel().length === 0;
    };

    public allChoicesFulfilled = () => {
        if (this.allEquipmentChosen() && this.allLanguagesChosen() && this.allProficienciesChosen() && this.allStatsAssigned())
          return true;
        return false;
    };

    public proficiencesLeftText = () => {
        // Nice text label of how many proficiencies left to select
        var numBackgroundProfs = this.props.backgroundProficiencies[this.state.backgroundid].profs.length;
        var numLeft = this.props.classProficiencies[this.state.classid].num - (this.state.proficiencies.length - numBackgroundProfs);
  
        return "Choose " + numLeft + " additional proficienc" + (numLeft > 1 ? "ies" : "y") + ":";
    };

    public languagesLeftText = () => {
        // Nice text label to indicate how many additional languages you can choose
        var racelanguages = this.props.raceLanguages[this.props.races[this.state.raceid].raceid].languages.length;
        var extraLangs = this.props.raceExtraLanguages[this.state.raceid].extras;
        var numBackgroundLangs = this.getNumBackgroundLanguages();
        var numLeft = racelanguages + extraLangs + numBackgroundLangs - this.state.languageids.length;
  
        return "Choose " + numLeft + " additional language" + (numLeft > 1 ? "s" : "") + ":";
    };

    public currentStatAssignmentText = () => {
        return this.props.statBlocks[this.state.statAssignmentIndex].text;
    };

    public traitsAndFeatures = () => {
        var result = [];
        var backgroundFeature = this.props.backgroundFeatures[this.state.backgroundid];
        result.push(backgroundFeature.text);
  
        var classFeatures = this.props.classFeatures[this.state.classid];
        var i;
        for (i = 0; i < classFeatures.features.length; i++) {
          var classFeature = classFeatures.features[i];
          if (classFeature.level <= this.level()) {
            result.push(classFeature.text);
          }
        }
  
        return result;
    };

    public equipmentText = () => {
        // Nice text of selected equipment
        var i;
        var text = '';
        var equipIds = this.equipmentList();
  
        for (i = 0; i < equipIds.length; i++) {
          text += this.props.equipment[equipIds[i].id].text;
          if (equipIds[i].num > 1)
            text += ' (' + equipIds[i].num + ')';
          if (i < equipIds.length - 1)
            text += ', ';
        }
  
        return text;
    };

    public equipmentTextList = () => {
        // Array of equipment text
        var i;
        var arr = [];
        var equipIds = this.equipmentList();
  
        for (i = 0; i < equipIds.length; i++) {
          var text = this.props.equipment[equipIds[i].id].text;
          if (equipIds[i].num > 1)
            text += ' (' + equipIds[i].num + ')';
          arr.push(text);
        }
  
        return arr;
    };

    public equipmentList = () => {
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

    public languagesText = () => {
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

    public toolProficienciesText = () => {
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

    public currencyText = () => {
        // Nice text of character currencies
        var text = '';
        if (this.state.currency[0] > 0)
          text += this.state.currency[0] + " CP ";
        if (this.state.currency[1] > 0)
          text += this.state.currency[1] + " SP ";
        if (this.state.currency[2] > 0)
          text += this.state.currency[2] + " EP ";
        if (this.state.currency[3] > 0)
          text += this.state.currency[3] + " GP ";
        if (this.state.currency[4] > 0)
          text += this.state.currency[4] + " PP ";
        return text;
    };

    public raceNamePageReferenceText = () => {
        var race = this.props.races[this.state.raceid];


        // TODO: FIX!!!

        var baseRaceName = ''; // this.props.races.find(rn => rn.raceid === race.raceid).text;
        var racePageRef = this.props.raceNamePageReferences.find(rn => rn.raceid === race.raceid);
        return 'Example ' + baseRaceName + ' names can be found on page ' + ''; // racePageRef.page;
    };

    public traitText = () => {
        return this.props.personalityTraits[this.state.traits[0]].text;
    };

    public idealText = () => {
        return this.props.ideals[this.state.ideals[0]].text;
    };

    public bondText = () => {
        return this.props.bonds[this.state.bonds[0]].text;
    };

    public flawText = () => {
        return this.props.flaws[this.state.flaws[0]].text;
    };

    public level = () => {
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

    public hasBonusLanguages = () => {
        // Whether the current class/background combo is able to select additional languages
        var numBackgroundLangs = this.getNumBackgroundLanguages();
        return this.props.raceExtraLanguages[this.state.raceid].extras > 0 || numBackgroundLangs > 0;
    };

    public availableLanguages = () => {
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

    public hasChosenAnyEquipment = () => {
        return this.equipmentChoiceModel().length < this.props.classEquipment[this.state.classid].equipChoices.length;
    };

    public availableProficiencies = () => {
        // List of all available proficiencies to choose from, excluding already selected
        var profs = [];
        var i;
        var classProfs = this.props.classProficiencies[this.state.classid].profs;
        var backgroundProfs = this.props.backgroundProficiencies[this.state.backgroundid].profs;
        for (i = 0; i < this.props.skills.length; i++) {
          var prof = this.props.skills[i];
  
          if (!this.state.proficiencies.includes(i) && (classProfs.includes(i) || backgroundProfs.includes(i)))
            profs.push(prof);
        }
        return profs;
    };

    public equipmentChoiceModel = (): EquipmentChoiceModel[] => {
        // List of all available equipment choices to choose from, excluding already selected
        var equipChoices = this.props.classEquipment[this.state.classid].equipChoices;
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

    public generateButtonBindings = () => {
        if (!this.allChoicesFulfilled) {
          return {
            disabled: 'disabled'
          }
        }
        return {}
    };















    // Methods
    public isPack = (itemId: number) => {
        var equipDef = this.props.equipment[itemId];
        if (equipDef.type !== 2)
          return false;
        return true;
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

    // isInt = (x: number) => {
    //     var y = parseInt(x, 10);
    //     return !isNaN(y);
    // };

    d6 = () => {
        // D6 roll
        return Math.floor(Math.random() * 6) + 1;
    };

    dX = (x: number) => {
        // DX roll
        return Math.floor(Math.random() * x) + 1;
    };

    statRoll = () => {
        // Standard stat roll: 4d6, subtract lowest, get total of remaining
        var diceArray = [...new Array(4)]
          .map(() => this.d6())
          .sort((a, b) => a - b)
          .reverse();
        diceArray.pop();
        return diceArray.reduce((a, b) => a + b, 0);
    };

    rollStats = () => {
        // Reset stats and create random stat array to assign from
        this.resetStats();
        this.state.statRolls = [...new Array(6)]
          .map(() => this.statRoll())
          .sort((a, b) => a - b)
          .reverse();
    };

    standardStats = () => {
        // Reset stats and use create standard stat array to assign from
        this.resetStats();
        this.state.statRolls = this.props.standardStatArray.slice();
    };

    allocateStat = (val: number) => {
        // Set the stat at index i to the value val
        this.state.statArray[this.state.statAssignmentIndex] = val;
        this.state.statRolls.splice(this.state.statRolls.indexOf(val), 1);
        this.state.statAssignmentIndex++;
        if (this.state.statAssignmentIndex === 5) {
          // Auto-assign last
          this.allocateStat(this.state.statRolls[0]);
          this.state.statAssignmentIndex = 0;
        }
  
        this.calculateStats();
    };

    setBackground = (bg: Backgrounds) => {
        this.state.background = bg.text;
        this.state.backgroundid = bg.id;
        this.state.toolProficiencies = this.props.backgroundToolProficiencies[bg.id].profs.slice();
        this.state.currency = this.props.backgroundCurrency[this.state.backgroundid].currency.slice();
  
        this.resetEquipment();
        this.resetProficiencies();
        this.resetLanguages();
    };

    setClass = (cls: Classes) => {
        this.state.class = cls.text;
        this.state.classid = cls.id;
        this.state.classStatSavingThrows = this.props.savingThrows[cls.id].throws.slice();
        var hitDice = this.props.hitDice[cls.id];
        this.state.hitDice = hitDice.num + 'd' + hitDice.dice;
  
        this.resetEquipment();
        this.resetProficiencies();
        this.resetLanguages();
        this.standardStats();
    };

    setRace = (race: Races) => {
        this.state.race = race.text;
        this.state.raceid = race.id;
        this.state.speed = this.props.speeds[race.id].value;
        this.state.raceStatBonuses = this.props.racialBonuses[race.id].bonuses;
  
        this.calculateStats();
        this.resetLanguages();
    };

    resetStats = () => {
        this.state.statAssignmentIndex = 0;
        this.state.statArray = Array(6).fill(null);
        this.state.statModifiers = Array(6).fill(null);
        this.state.finalStats = Array(6).fill(null);
    };

    resetLanguages = () => {
        this.state.languageids = this.props.raceLanguages[this.props.races[this.state.raceid].raceid].languages.slice();
    };

    resetProficiencies = () => {
        this.state.proficiencies = this.props.backgroundProficiencies[this.state.backgroundid].profs.slice();
    };

    resetEquipment = () => {
        var newEquip: EquipmentModel[] = [];
        var bgEquip = this.props.backgroundEquipment[this.state.backgroundid];
        var e;
        for (e = 0; e < bgEquip.equipids.length; e++) {
          var id = bgEquip.equipids[e];
          var eq = this.props.equipment[id];
          newEquip.push({ id: eq.id, num: 1 });
        }
  
        var classFixedEquip = this.props.classEquipment[this.state.classid].fixedEquip;
        if (typeof classFixedEquip !== 'undefined') {
          for (e = 0; e < classFixedEquip.length; e++) {
            var fixedEquip = classFixedEquip[e];
            eq = this.props.equipment[fixedEquip.id];
            newEquip.push({ id: eq.id, num: fixedEquip.num || 1 });
          }
        }
  
        this.state.equipment = newEquip;
  
        // Equipment choices
        var equipChoices = this.props.classEquipment[this.state.classid].equipChoices;
        var newEquipChoices = [];
        for (e = 0; e < equipChoices.length; e++) {
          var choice = equipChoices[e];
          newEquipChoices.push({ id: choice.id, chosen: false, selection: 0, remaining: 0, items: [] });
        }
  
        this.state.equipChoices = newEquipChoices;
    };

    addLanguage = (id: number) => {
        this.state.languageids.push(id);
    };

    addProficiency = (id: number) => {
        this.state.proficiencies.push(id);
    };

    setAppearance = (image: any) => {
        this.state.appearance = image.srcElement.files[0];
    };

    setFactionLogo = (image: any) => {
        this.state.factionLogo = image.srcElement.files[0];
    };

    selectEquipment = (categoryId: number, choiceId: number, equipId: number) => {
        var choiceCategory = this.state.equipChoices[categoryId];
        var equipModel = this.props.classEquipment[this.state.classid].equipChoices[categoryId];
        if (choiceCategory.chosen === false) {
          var equipChoice = equipModel.choices[choiceId];
          choiceCategory.chosen = true;
          choiceCategory.selection = choiceId;
          choiceCategory.remaining = equipChoice.num - 1;
          this.addChoiceCategoryEquip(choiceCategory, equipId);
  
          // If 2x or more of one item, automatically add remaining
          if (equipChoice.items.length === 1 && choiceCategory.remaining > 0) {
            var i;
            for (i = 0; i < choiceCategory.remaining; i++) {
              this.addChoiceCategoryEquip(choiceCategory, equipId);
            }
            choiceCategory.remaining = 0;
          }
  
          // Add extras
          if (typeof equipChoice.extras !== 'undefined') {
            var extras = equipChoice.extras;
            for (i = 0; i < extras.length; i++) {
              // Added to fixed equipment, might have complications
              this.state.equipment.push({ id: extras[i].id, num: extras[i].num || 1 });
            }
          }
  
        } else {
          choiceCategory.remaining--;
          choiceCategory.items.push({ id: equipId, num: 1});
        }
    };

    addChoiceCategoryEquip = (equipChoice: EquipmentChoiceModel, equipId: number) => {
        var itemChoice = equipChoice.items.find(item => item.id === equipId);
        if (typeof itemChoice !== 'undefined') {
          itemChoice.num++;
        } else {
          equipChoice.items.push({ id: equipId, num: 1 });
        }
    };

    getEquipmentName = (id: number) => {
        return this.props.equipment[id].text;
    };

    getNumBackgroundLanguages = () => {
        var backgroundLangs = this.props.backgroundLangauges.find(bgl => bgl.id === this.state.backgroundid);
        return backgroundLangs ? backgroundLangs.num : 0;
    };

    hasWeaponProficiency = (equipment: Equipment) => {
        var classWeaps = this.props.classWeaponProficiencies[this.state.classid];
        if (classWeaps.categories.includes(equipment.type))
          return true;
        if (classWeaps.weapons.includes(equipment.id))
          return true;
        return false;
    };

    getModifier = (val: number) => {
        // Get stat modifier from lookup table
        var i;
        for (i = 0; i < this.props.statModifiers.length; i++) {
          var mod = this.props.statModifiers[i];
          if (val <= mod.val)
            return mod.modifier;
        }
        return this.props.statModifiers[this.props.statModifiers.length - 1].modifier;
    };

    formatModifier = (val: number) => {
        if (val > 0)
          return "+" + val;
        return val;
    };

    buildWeaponModel = () => {
        // Build model of weaponry chosen or included, with atk and damage type
        this.state.weaponModel = [];
  
        var i;
        var equipmentData;
        for (i = 0; i < this.state.equipChoices.length; i++) {
          var choiceItems = this.state.equipChoices[i].items;
          var x;
          for (x = 0; x < choiceItems.length; x++) {
            equipmentData = this.props.equipment[choiceItems[x].id];
            this.addWeaponModel(equipmentData);
          }
        }
  
        for (i = 0; i < this.state.equipment.length; i++) {
          equipmentData = this.props.equipment[this.state.equipment[i].id];
          this.addWeaponModel(equipmentData);
        }
  
        // Condense model (remove duplicates)
        var usedIds: number[] = [];
        var newWeaponModel = [];
        for (i = 0; i < this.state.weaponModel.length; i++) {
          var weapModel = this.state.weaponModel[i];
          if (!usedIds.includes(weapModel.id)) {
            usedIds.push(weapModel.id);
            newWeaponModel.push(weapModel);
          }
        }
  
        this.state.weaponModel = newWeaponModel;
    };

    addWeaponModel = (equipmentData: Equipment) => {
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
            atkBonus += this.state.statModifiers[0]; // STRmod
            dmgBonus += this.state.statModifiers[0];
          } else {
            atkBonus += this.state.statModifiers[1]; // DEXmod
            dmgBonus += this.state.statModifiers[1];
          }
  
          if (this.hasWeaponProficiency(equipmentData)) {
            atkBonus += this.state.proficiencyBonus;
          }
  
          newWeap.atkBonus = atkBonus;
          newWeap.dmgBonus = dmgBonus;
  
          this.state.weaponModel.push(newWeap);
        }
    };

    base64ToArrayBuffer = (base64: string) => {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
          var ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
        }
        return bytes;
    };

    calculateStats = () => {
        // Add all stats together
        var i;
        for (i = 0; i < this.state.statArray.length; i++) {
          if (this.state.statArray[i] === null)
            continue;
  
          this.state.finalStats[i] = this.state.statArray[i] + this.state.raceStatBonuses[i];
          this.state.statModifiers[i] = this.getModifier(this.state.finalStats[i]);
          this.state.savingThrows[i] = this.state.statModifiers[i];
        }
    };

    generate = () => {
  
        // Initiative: DEX modifier
        this.state.initiative = this.state.statModifiers[1];
  
        // Base armor class: 10 + DEX modifier (TODO: include shield & armor)
        this.state.armorClass = 10 + this.state.statModifiers[1];
  
        // HP: Starting HP + CON
        this.state.hp = this.props.startingHp[this.state.classid].hp + this.state.statModifiers[2];
        this.state.level = this.level();
  
        this.state.proficiencyBonus = this.props.proficiencyLevels[this.state.level - 1].bonus;
  
        this.buildWeaponModel();
  
        // Add proficiency to saving throw stats
        var savingThrows = this.props.savingThrows[this.state.classid].throws.slice();
        var i;
        for (i = 0; i < 2; i++) {
          this.state.savingThrows[savingThrows[i]] += this.state.proficiencyBonus;
        }
  
        this.processPdf();
    };

    processPdf = () => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './DnD_5E_CharacterSheet - Form Fillable.pdf', true);
        xhr.responseType = 'arraybuffer';
        var process = this.fillPdfFields;
        xhr.onload = function() {
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
        fields['PlayerName'] = [o.playerName];
        fields['CharacterName'] = [o.characterName];
        fields['CharacterName 2'] = [o.characterName];
        fields['ClassLevel'] = [o.class + ' ' + this.level()];
        fields['Race '] = [o.race];
        fields['Background'] = [o.background];
  
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
  
        fields['Features and Traits'] = [this.traitsAndFeatures().join('\n\n')];
  
        if (o.appearance !== null) {
          fields['CHARACTER IMAGE'] = [o.appearance];
        }
        if (o.factionLogo !== null) {
          fields['Faction Symbol Image'] = [o.factionLogo];
        }
  
        var niceAlignment = o.alignmentLawChaos + ' ' + o.alignmentGoodEvil;
        if (niceAlignment === 'Neutral Neutral')
          niceAlignment = 'True Neutral';
        fields['Alignment'] = [niceAlignment];
  
        fields['XP'] = [o.xp];
  
        fields['STR'] = [this.formatModifier(o.statModifiers[0])];
        fields['DEX'] = [this.formatModifier(o.statModifiers[1])];
        fields['CON'] = [this.formatModifier(o.statModifiers[2])];
        fields['INT'] = [this.formatModifier(o.statModifiers[3])];
        fields['WIS'] = [this.formatModifier(o.statModifiers[4])];
        fields['CHA'] = [this.formatModifier(o.statModifiers[5])];
  
        fields['STRmod'] = [o.finalStats[0]];
        fields['DEXmod '] = [o.finalStats[1]];
        fields['CONmod'] = [o.finalStats[2]];
        fields['INTmod'] = [o.finalStats[3]];
        fields['WISmod'] = [o.finalStats[4]];
        fields['CHamod'] = [o.finalStats[5]];
        
        fields['HPMax'] = [o.hp];
        fields['Speed'] = [o.speed];
        fields['Initiative'] = [this.formatModifier(o.initiative)];
  
        fields['ST Strength'] = [this.formatModifier(o.savingThrows[0])];
        fields['ST Dexterity'] = [this.formatModifier(o.savingThrows[1])];
        fields['ST Constitution'] = [this.formatModifier(o.savingThrows[2])];
        fields['ST Intelligence'] = [this.formatModifier(o.savingThrows[3])];
        fields['ST Wisdom'] = [this.formatModifier(o.savingThrows[4])];
        fields['ST Charisma'] = [this.formatModifier(o.savingThrows[5])];
  
        var i;
        for (i = 0; i < 2; i++) {
          var savingThrowStat = o.classStatSavingThrows[i];
          switch(savingThrowStat) {
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
        fields['ProfBonus'] = [o.proficiencyBonus];
  
        var profLangText = 'Languages: ' + this.languagesText();
        if (this.toolProficienciesText() !== '')
          profLangText += '\n\nProficiencies: ' + this.toolProficienciesText();
        fields['ProficienciesLang'] = [profLangText];
  
        fields['AC'] = [o.armorClass];
        fields['Equipment'] = [this.equipmentText()];
  
        // Only an amount of gold
        //fields['CP'] = [o.currency[0]];
        //fields['SP'] = [o.currency[1]];
        //fields['EP'] = [o.currency[2]];
        fields['GP'] = [o.currency[3]];
        //fields['PP'] = [o.currency[4]];
  
        fields['PersonalityTraits '] = [o.personalityTraitsText];
        fields['Ideals'] = [o.idealsText];
        fields['Bonds'] = [o.bondsText];
        fields['Flaws'] = [o.flawsText];
  
        // https://rpg.stackexchange.com/questions/101169/how-does-passive-perception-work
        var pp = 10 + o.statModifiers[4];
        if (o.proficiencies.includes(11))
          pp += o.proficiencyBonus;
  
        fields['Passive'] = [pp];
  
        fields['Acrobatics'] = [this.formatModifier(o.statModifiers[1] + (o.proficiencies.includes(0) ? o.proficiencyBonus : 0))];
        fields['Animal'] = [this.formatModifier(o.statModifiers[4] + (o.proficiencies.includes(1) ? o.proficiencyBonus : 0))];
        fields['Arcana'] = [this.formatModifier(o.statModifiers[3] + (o.proficiencies.includes(2) ? o.proficiencyBonus : 0))];
        fields['Athletics'] = [this.formatModifier(o.statModifiers[0] + (o.proficiencies.includes(3) ? o.proficiencyBonus : 0))];
        fields['Deception '] = [this.formatModifier(o.statModifiers[5] + (o.proficiencies.includes(4) ? o.proficiencyBonus : 0))];
        fields['History '] = [this.formatModifier(o.statModifiers[3] + (o.proficiencies.includes(5) ? o.proficiencyBonus : 0))];
        fields['Insight'] = [this.formatModifier(o.statModifiers[4] + (o.proficiencies.includes(6) ? o.proficiencyBonus : 0))];
        fields['Intimidation'] = [this.formatModifier(o.statModifiers[5] + (o.proficiencies.includes(7) ? o.proficiencyBonus : 0))];
        fields['Investigation '] = [this.formatModifier(o.statModifiers[3] + (o.proficiencies.includes(8) ? o.proficiencyBonus : 0))];
        fields['Medicine'] = [this.formatModifier(o.statModifiers[4] + (o.proficiencies.includes(9) ? o.proficiencyBonus : 0))];
        fields['Nature'] = [this.formatModifier(o.statModifiers[3] + (o.proficiencies.includes(10) ? o.proficiencyBonus : 0))];
        fields['Perception '] = [this.formatModifier(o.statModifiers[4] + (o.proficiencies.includes(11) ? o.proficiencyBonus : 0))];
        fields['Performance'] = [this.formatModifier(o.statModifiers[5] + (o.proficiencies.includes(12) ? o.proficiencyBonus : 0))];
        fields['Persuasion'] = [this.formatModifier(o.statModifiers[5] + (o.proficiencies.includes(13) ? o.proficiencyBonus : 0))];
        fields['Religion'] = [this.formatModifier(o.statModifiers[3] + (o.proficiencies.includes(14) ? o.proficiencyBonus : 0))];
        fields['SleightofHand'] = [this.formatModifier(o.statModifiers[1] + (o.proficiencies.includes(15) ? o.proficiencyBonus : 0))];
        fields['Stealth '] = [this.formatModifier(o.statModifiers[1] + (o.proficiencies.includes(16) ? o.proficiencyBonus : 0))];
        fields['Survival'] = [this.formatModifier(o.statModifiers[4] + (o.proficiencies.includes(17) ? o.proficiencyBonus : 0))];
  
        // Proficiencies
        for (i = 0; i < o.proficiencies.length; i++) {
          var prof = o.proficiencies[i];
          switch(prof) {
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
        for (i = 0; i < o.weaponModel.length; i++) {
          var weap = o.weaponModel[i];
          var weapAtkBonusStr = this.formatModifier(weap.atkBonus);
          var weapDmgStr = weap.dice + (weap.dmgBonus !== 0 ? ' ' + this.formatModifier(weap.dmgBonus) : '') + ' ' + weap.dmgType;
  
          switch(i) {
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
  
        // eslint-disable-next-line
        // var filledPdf = pdfform().transform(blob, fields);
        // var outBlob = new Blob([filledPdf], {type: 'application/pdf'});
        // var fileName = 'DnD5e - Lvl' + this.level() + ' ' + this.state.race + ' ' + this.state.class;
        // if (this.state.playerName !== '')
        //   fileName += ' ' + this.state.playerName;
  
        // saveAs(outBlob, fileName + '.pdf');
    }
}


