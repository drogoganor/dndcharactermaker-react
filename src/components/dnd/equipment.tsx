import React, { useState } from 'react';
import { IGlobalState } from "../../redux/reducer";
import { equipmentChanged } from "../../redux/actions";
import { connect } from 'react-redux';
import {EquipmentChoiceModel, EquipmentModel} from '../../core/dndcharacter';
import reference from '../../core/reference';
import {EquipmentChoiceBlock} from "../../core/types";

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const EquipmentComponent = (props: StateProps & DispatchProps) => {
    const { classType, background, backgroundToolChoice, equip, onEquipmentChanged } = props;
    const { equipment, equipChoices } = equip; // equipment,
    const equipmentChoiceModel = useEquipmentChoiceModel();
    const hasChosenAnyEquipment = equipmentChoiceModel.length < classType.equipChoices.length;
    const allEquipmentChosen = equipmentChoiceModel.length === 0;

    return (
        <div className='columns field'>
            <label className='column is-2 label'>Equipment:</label>
            <div className='column tags are-small'>
                <div className='tags are-small'>
                    {equipmentTextList().map((eq, index) => {
                        return (
                            <span
                                className="tag is-dark"
                                key={index}
                            >{eq}</span>)
                    })}
                </div>

                {!allEquipmentChosen && (
                    <label className='label'>Select Extra Equipment:</label>)
                }

                {equipmentChoiceModel.map((choices, index) => {
                    return (
                        <div key={index}>
                            {choices.choices?.map((choice, index) => {
                                return (
                                    <span className='buttons are-small' key={index}>
                                        <span className='tag'>{extrasText(choice) + choice.num}x</span>

                                        {choice.items.map((item, index) => {
                                            return (
                                                <button type="button"
                                                    className='button is-link'
                                                    key={index}
                                                    onClick={() => selectEquipment(choices.id, choice.id, item)}>{getEquipmentName(item)}
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

                {hasChosenAnyEquipment && (
                    <button type="button" className='button is-danger' onClick={() => resetEquipment()}>Reset Equipment</button>)
                }

            </div>
        </div>
    );

    ////////////////////

    function useEquipmentChoiceModel() {
        // List of all available equipment choices to choose from, excluding already selected
        const classEquipChoices = classType.equipChoices;
        const model: EquipmentChoiceModel[] = [];

        for (const equipChoice of classEquipChoices) {
            const chosenChoices = equipChoices.find(eq => eq.id === equipChoice.id);
            if (chosenChoices === undefined) {
                const modelRow = {
                    id: equipChoice.id,
                    choices: equipChoice.choices,
                    chosen: false,
                    selection: equipChoice.id,
                    remaining: 0,
                    items: []
                };
                model.push(modelRow);
            }
            else if (!chosenChoices.chosen || (chosenChoices.chosen && chosenChoices.remaining > 0)) {
                const modelRow = {
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
    }

    function extrasText(choice: EquipmentChoiceBlock) {
        return choice.extras ? choice.extras.map(extra =>
            reference.equipment[extra.id].text +
            (extra.num && extra.num > 1 ? ' (' + extra.num + ')' : ''))
            .join(', ') + ' + ' : '';
    }

    function getEquipmentName(id: number) {
        let text = reference.equipment[id].text;
        let toolSelection = background.toolSelection;

        if (backgroundToolChoice && toolSelection !== undefined &&
            toolSelection.itemId === id) {
                text = text.replace('________', backgroundToolChoice.trim());
        }

        return text;
    }

    function isPack(itemId: number) {
        const equipDef = reference.equipment[itemId];
        return equipDef.type == 2;
    }

    function getPackItems(packId: number): any[] {
        const packItems: any[] = [];

        if (!isPack(packId))
            return packItems;

        // Iterate and add pack equipment
        const backpackItems = reference.backpackContents.find(bp => bp.id === packId);
        if (typeof backpackItems === 'undefined')
            return packItems;

        for (const backpackItem of backpackItems.contents) {
            packItems.push({ id: backpackItem.id, num: backpackItem.num });
        }

        return packItems;
    }

    function fullEquipment(): EquipmentModel[] {
        const equipModel = [];
        const bgEquip = background.equipment;
        const classEquip = classType.fixedEquip;

        // Selected equipment
        for (const eq of equipment) {
            equipModel.push({ id: eq.id, num: eq.num ?? 1 });
        }

        // Class fixed equipment
        if (classEquip !== undefined) {
            for (const eq of classEquip) {
                equipModel.push({ id: eq.id, num: eq.num ?? 1 });
            }
        }

        // Background
        for (const eq of bgEquip) {
            equipModel.push({ id: eq, num: 1 });
        }

        return equipModel;
    }

    function equipmentList(): any[] {
        // Get list of equipment ID's and text
        let equipIds: any[] = [];

        // Equipment choices
        for (const equipChoice of equipChoices) {
            if (equipChoice.chosen === true) {
                for (const item of equipChoice.items) {
                    if (!isPack(item.id)) {
                        equipIds.push({ id: item.id, num: item.num });
                    } else {
                        equipIds = equipIds.concat(getPackItems(item.id)); // Add pack items
                    }
                }
            }
        }

        // Background & fixed equipment
        for (const thisEquip of fullEquipment()) {
            if (!isPack(thisEquip.id)) {
                equipIds.push({ id: thisEquip.id, num: thisEquip.num });
            } else {
                equipIds = equipIds.concat(getPackItems(thisEquip.id)); // Add pack items
            }
        }

        // Condense (remove duplicates)
        const newEquip: any[] = [];
        for (const equip of equipIds) {
            const existingEquip = newEquip.find(x => x.id === equip.id);
            if (existingEquip !== undefined) {
                existingEquip.num += equip.num;
            } else {
                newEquip.push(equip);
            }
        }

        return newEquip;
    }

    function equipmentTextList(): string[] {
        // Array of equipment text
        const arr = [];
        const equipIds = equipmentList();

        for (let equip of equipIds) {
            let text = getEquipmentName(equip.id);
            if (equip.num > 1)
                text += ' (' + equip.num + ')';
            arr.push(text);
        }

        return arr;
    }

    function equipmentText(): string {
        // Nice text of selected equipment
        let text = '';
        const equipIds = equipmentList();

        for (let i = 0; i < equipIds.length; i++) {
            const equip = equipIds[i];
            text += getEquipmentName(equip.id);
            if (equip.num > 1)
                text += ' (' + equip.num + ')';
            if (i < equipIds.length - 1)
                text += ', ';
        }

        return text;
    }

    function selectEquipment(categoryId: number, choiceId: number, equipId: number) {
        const equipmentChoices = equipChoices.slice();
        const existingEquipment = equipment.slice();
        const equipModel = classType.equipChoices[categoryId];
        const equipChoice = equipModel.choices[choiceId];
        let choiceCategory = equipmentChoices.find(eq => eq.id === categoryId);

        if (choiceCategory === undefined) {
            // Add new if not present
            choiceCategory = { id: categoryId, chosen: false, selection: choiceId, remaining: 0, items: [] };
            equipmentChoices.push(choiceCategory);
        }

        if (choiceCategory.chosen === false) {
            choiceCategory.chosen = true;
            choiceCategory.selection = choiceId;
            choiceCategory.remaining = equipChoice.num - 1;
            addChoiceCategoryEquip(choiceCategory, equipId);

            // If 2x or more of one item, automatically add remaining
            if (equipChoice.items.length === 1 && choiceCategory.remaining > 0) {
                for (let i = 0; i < choiceCategory.remaining; i++) {
                    addChoiceCategoryEquip(choiceCategory, equipId);
                }
                choiceCategory.remaining = 0;
            }

            // Add extras
            if (typeof equipChoice.extras !== 'undefined') {
                const extras = equipChoice.extras;
                for (let i = 0; i < extras.length; i++) {
                    // Added to fixed equipment, might have complications
                    existingEquipment.push({ id: extras[i].id, num: extras[i].num || 1 });
                }
            }

        } else {
            choiceCategory.remaining--;
            choiceCategory.items.push({ id: equipId, num: 1 });
        }

        onEquipmentChanged({
            equipChoices: equipmentChoices,
            equipment: existingEquipment,
            equipmentText: equipmentText(),
            allEquipmentChosen: allEquipmentChosen
        });
    }

    function addChoiceCategoryEquip(equipChoice: EquipmentChoiceModel, equipId: number) {
        const itemChoice = equipChoice.items.find(item => item.id === equipId);
        if (typeof itemChoice !== 'undefined') {
            itemChoice.num++;
        } else {
            equipChoice.items.push({ id: equipId, num: 1 });
        }
    }

    function resetEquipment() {
        onEquipmentChanged({
            equipChoices: [],
            equipment: [],
            equipmentText: equipmentText(),
            allEquipmentChosen: allEquipmentChosen
        });
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        classType,
        background,
        backgroundToolChoice,
        equip
    } = state;

    return {
        classType,
        background,
        backgroundToolChoice,
        equip
    };
};

const mapDispatchToProps = {
    onEquipmentChanged: equipmentChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentComponent);