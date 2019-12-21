import DndProps, { EquipmentChoiceBlock, Race, Class, Alignment, Backgrounds } from './dndprops';

export interface EquipmentModel {
    id: number;
    num: number;
}

export interface EquipmentChoiceModel {
    id: number;
    chosen: boolean;
    selection: number;
    remaining: number;
    items: EquipmentModel[];
    
    // WTF
    choices?: EquipmentChoiceBlock[];
}

export default class DndState {
    readonly props: DndProps;

    constructor(props: DndProps) {
        this.props = props;

        this.race = props.races[0];
        this.class = props.classes[0];
        this.alignment = props.alignments[0];
        this.background = props.backgrounds[0];
    }

    public statAssignmentIndex: number = 0;
    public statRolls: number[] = [15, 14, 13, 12, 10, 8];

    public characterName: string = '';
    public playerName: string = '';
    public race: Race;
    public class: Class;
    public alignment: Alignment;
    public background: Backgrounds;
    public statArray: number[] = Array(6).fill(null);
    public raceStatBonuses: number[] = [0, 0, 2, 0, 0, 0];
    public classStatBonuses: number[] = Array(6).fill(0);
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

