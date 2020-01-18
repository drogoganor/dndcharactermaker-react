import phb from './phb';
import { EquipmentChoiceBlock, Race, Class, Alignment, Background } from './types';
import reference from './reference';

export type EquipmentModel = {
    id: number;
    num: number;
}

export type EquipmentChoiceModel = {
    id: number;
    chosen: boolean;
    selection: number;
    remaining: number;
    items: EquipmentModel[];
    choices?: EquipmentChoiceBlock[];
}

export default class DndCharacter {

    constructor() {
        this.race = phb.races[0];
        this.class = phb.classes[0];
        this.alignment = reference.alignments[0];
        this.background = phb.backgrounds[0];
    }

    public readonly characterName: string = '';
    public readonly playerName: string = '';
    public readonly race: Race;
    public readonly class: Class;
    public readonly archetype: number = 0;
    public readonly alignment: Alignment;
    public readonly backgroundSpecialty: number = 0;
    public readonly background: Background;
    public readonly backgroundToolChoice: string = '';
    public readonly statArray: number[] = Array(6).fill(null);
    public readonly statModifiers: number[] = Array(6).fill(null);
    public readonly statTotals: number[] = Array(6).fill(null);
    public readonly xp: number = 0;
    public readonly languageids: number[] = [];
    public readonly proficiencies: number[] = [];
    public readonly equipment: EquipmentModel[] = [];
    public readonly equipChoices: EquipmentChoiceModel[] = [];
    public readonly trait: number = 0;
    public readonly ideal: number = 0;
    public readonly bond: number = 0;
    public readonly flaw: number = 0;
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

    // Items moved from dndmodel
    public readonly level: number = 1;

    public readonly allEquipmentChosen: boolean = false;
    public readonly allStatsAssigned: boolean = false;

    public readonly equipmentText: string = '';
}

