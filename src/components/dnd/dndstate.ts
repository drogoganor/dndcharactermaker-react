import DndProps, { EquipmentChoiceBlock, Race, Class, Alignment, Background } from './dndprops';

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

    public readonly statAssignmentIndex: number = 0;
    public readonly statRolls: number[] = [15, 14, 13, 12, 10, 8];

    public readonly characterName: string = '';
    public readonly playerName: string = '';
    public readonly race: Race;
    public readonly class: Class;
    public readonly alignment: Alignment;
    public readonly background: Background;
    public readonly statArray: number[] = Array(6).fill(null);
    //public readonly raceStatBonuses: number[] = [0, 0, 2, 0, 0, 0];
    public readonly classStatBonuses: number[] = Array(6).fill(0);
    public readonly classStatSavingThrows: number[] = [0, 2];
    public readonly hitDice: string = '1d12';
    public readonly xp: number = 0;
    public readonly languageids: number[] = [0, 1];
    public readonly proficiencies: number[] = [6, 14];
    public readonly toolProficiencies: number[] = [];
    public readonly equipment: EquipmentModel[] = [
        { id: 66, num: 1, },
        { id: 67, num: 1, },
        { id: 68, num: 1, },
        { id: 69, num: 1, },
        { id: 70, num: 1, },
        { id: 71, num: 1, },
        { id: 4, num: 4, },
        { id: 37, num: 1, },
    ];
    public readonly equipChoices: EquipmentChoiceModel[] = [
        { id: 0, chosen: false, selection: 0, remaining: 1, items: [] },
        { id: 1, chosen: false, selection: 0, remaining: 1, items: [] },
    ];
    public readonly currency: number[] = [0, 0, 0, 15, 0];
    public readonly traits: number[] = [0];
    public readonly ideals: number[] = [0];
    public readonly bonds: number[] = [0];
    public readonly flaws: number[] = [0];
    public readonly weaponModel: any[] = [];
    public readonly age: string = '20';
    public readonly height: string = '6\'1';
    public readonly weight: string = '170lbs';
    public readonly eyes: string = 'Blue';
    public readonly skin: string = 'Fair';
    public readonly hair: string = 'Black';
    public readonly appearance: any = null; // Image
    public readonly factionLogo: any = null; // Image
    public readonly organizations: string = '';
    public readonly allies: string = '';
    public readonly backstory: string = '';
    public readonly treasure: string = '';
    public readonly additionalFeaturesAndTraits: string = '';
}

