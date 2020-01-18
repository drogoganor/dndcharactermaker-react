import React from 'react';
import reference from '../../core/reference';
import { Class, Background, EquipmentChoiceBlock } from '../../core/types';
import { EquipmentChoiceModel, EquipmentModel } from '../../core/dndcharacter';

interface Props {
    class: Class;
    background: Background;
    backgroundToolChoice: string;
    setEquipment: (equipment: EquipmentModel[], equipChoices: EquipmentChoiceModel[], equipmentText: string, allEquipmentChosen: boolean) => void;
}

class State {
    public readonly equipment: EquipmentModel[] = [];
    public readonly equipChoices: EquipmentChoiceModel[] = [];
}

export default class EquipmentComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.resetEquipment = this.resetEquipment.bind(this);
        this.selectEquipment = this.selectEquipment.bind(this);
    }

    get hasChosenAnyEquipment(): boolean {
        return this.equipmentChoiceModel.length < this.props.class.equipChoices.length;
    };

    get equipmentChoiceModel(): EquipmentChoiceModel[] {
        // List of all available equipment choices to choose from, excluding already selected
        let equipChoices = this.props.class.equipChoices;
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

    get allEquipmentChosen(): boolean {
        return this.equipmentChoiceModel.length === 0;
    };

    extrasText(choice: EquipmentChoiceBlock): string {
        return choice.extras ? choice.extras.map(extra =>
            reference.equipment[extra.id].text +
            (extra.num && extra.num > 1 ? ' (' + extra.num + ')' : ''))
            .join(', ') + ' + ' : '';
    };

    getEquipmentName(id: number): string {
        let text = reference.equipment[id].text;
        let toolSelection = this.props.background.toolSelection;
        
        if (this.props.backgroundToolChoice !== '' && toolSelection !== undefined &&
            toolSelection.itemId === id) {
                text = text.replace('________', this.props.backgroundToolChoice.trim());
        }

        return text;
    };

    isPack(itemId: number): boolean {
        let equipDef = reference.equipment[itemId];
        if (equipDef.type !== 2)
            return false;
        return true;
    };

    getPackItems(packId: number): any[] {
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

    get equipment(): EquipmentModel[] {
        let equipModel = [];
        let bgEquip = this.props.background.equipment;
        let classEquip = this.props.class.fixedEquip;

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

    get equipmentList(): any[] {
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

        // Condense (remove duplicates)
        let newEquip: any[] = [];
        for (let equip of equipIds) {
            let existingEquip = newEquip.find(x => x.id === equip.id);
            if (existingEquip !== undefined) {
                existingEquip.num += equip.num;
            } else {
                newEquip.push(equip);
            }
        }

        return newEquip;
    };

    get equipmentTextList(): string[] {
        // Array of equipment text
        let arr = [];
        let equipIds = this.equipmentList;

        for (let equip of equipIds) {
            let text = this.getEquipmentName(equip.id);
            if (equip.num > 1)
                text += ' (' + equip.num + ')';
            arr.push(text);
        }

        return arr;
    };

    get equipmentText(): string {
        // Nice text of selected equipment
        let i;
        let text = '';
        let equipIds = this.equipmentList;

        for (i = 0; i < equipIds.length; i++) {
            let equip = equipIds[i];
            text += this.getEquipmentName(equip.id);
            if (equip.num > 1)
                text += ' (' + equip.num + ')';
            if (i < equipIds.length - 1)
                text += ', ';
        }

        return text;
    };

    selectEquipment(event: any, categoryId: number, choiceId: number, equipId: number) {
        event.preventDefault();

        var equipChoices = this.state.equipChoices.slice();
        var existingEquipment = this.state.equipment.slice();
        var equipModel = this.props.class.equipChoices[categoryId];
        var equipChoice = equipModel.choices[choiceId];
        var choiceCategory = equipChoices.find(eq => eq.id === categoryId);

        if (choiceCategory === undefined) {
            // Add new if not present
            choiceCategory = { id: categoryId, chosen: false, selection: choiceId, remaining: 0, items: [] };
            equipChoices.push(choiceCategory);
        }

        if (choiceCategory.chosen === false) {
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
                    existingEquipment.push({ id: extras[i].id, num: extras[i].num || 1 });
                }
            }

        } else {
            choiceCategory.remaining--;
            choiceCategory.items.push({ id: equipId, num: 1 });
        }

        this.setState({
            ...this.state,
            equipment: existingEquipment,
            equipChoices: equipChoices
        }, () => this.props.setEquipment(existingEquipment, equipChoices, this.equipmentText, this.allEquipmentChosen));
    };

    addChoiceCategoryEquip(equipChoice: EquipmentChoiceModel, equipId: number) {
        var itemChoice = equipChoice.items.find(item => item.id === equipId);
        if (typeof itemChoice !== 'undefined') {
            itemChoice.num++;
        } else {
            equipChoice.items.push({ id: equipId, num: 1 });
        }
    };

    resetEquipment(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            equipment: [],
            equipChoices: []
        }, () => this.props.setEquipment([], [], this.equipmentText, this.allEquipmentChosen));
    };

    public render(): JSX.Element {
        return (
            <div className='columns field'>
                <label className='column is-2 label'>Equipment:</label>
                <div className='column tags are-small'>
                    <div className='tags are-small'>
                        {this.equipmentTextList.map((eq, index) => {
                            return (
                                <span
                                    className="tag is-dark"
                                    key={index}
                                >{eq}</span>)
                        })}
                    </div>

                    {!this.allEquipmentChosen && (
                        <label className='label'>Select Extra Equipment:</label>)
                    }

                    {this.equipmentChoiceModel.map((choices, index) => {
                        return (
                            <div key={index}>
                                {choices.choices?.map((choice, index) => {
                                    return (
                                        <span className='buttons are-small' key={index}>
                                            <span className='tag'>{this.extrasText(choice) + choice.num}x</span>

                                            {choice.items.map((item, index) => {
                                                return (
                                                    <button type="button"
                                                        className='button is-link'
                                                        key={index}
                                                        onClick={(e) => this.selectEquipment(e, choices.id, choice.id, item)}>{this.getEquipmentName(item)}
                                                    </button>)
                                            })}

                                            {choices.choices && choice.id < choices.choices.length - 1 && (
                                                <span className='tag' v-if="">OR</span>)
                                            }

                                        </span>)
                                })}
                                <hr />
                            </div>)
                    })}

                    {this.hasChosenAnyEquipment && (
                        <button type="button" className='button is-danger' onClick={(e) => this.resetEquipment(e)}>Reset Equipment</button>)
                    }

                </div>
            </div>
        )
    }
}