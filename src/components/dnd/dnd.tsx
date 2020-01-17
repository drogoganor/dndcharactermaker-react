import React from 'react';
import phb from '../../core/dndbook';
import DndCharacter, { EquipmentChoiceModel } from '../../core/dndcharacter';
import DndModel from '../../core/dndmodel';
import Util from '../../core/util';
import 'bulma';
import Summary from './summary';
import XpLevel from './xpLevel';
import reference from '../../core/reference';
import PlayerAndCharacterName from './playerAndCharacterName';
import { Race, Class } from '../../core/types';
import RaceComponent from './race';
import ClassComponent from './class';

interface Props { }

export default class DndCharacterMakerComponent extends React.Component<Props, DndCharacter> {
    constructor(props: Props) {
        super(props);
        this.state = new DndCharacter();
        //this.handleInputChange = this.handleInputChange.bind(this);

        this.handleXpChange = this.handleXpChange.bind(this);
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
        this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
        this.handleRaceChange = this.handleRaceChange.bind(this);
    }

    handleXpChange(xp: number) {
        this.setState({
            ...this.state,
            xp: xp,
            level: reference.getLevel(xp)
        });
    }

    handlePlayerNameChange(name: string) {
        this.setState({
            ...this.state,
            playerName: name
        });
    }

    handleCharacterNameChange(name: string) {
        this.setState({
            ...this.state,
            characterName: name
        });
    }

    handleRaceChange(race: Race) {
        this.setState({
            ...this.state,
            race: race,
            languageids: []
        });
    }

    handleClassChange(cls: Class) {
        this.setState({
            ...this.state,
            class: cls,
            equipment: [],
            equipChoices: [],
            proficiencies: [],
            languageids: [],
            archetype: 0
        });
    }

    handleArchetypeChange(archetype: number) {
        this.setState({
            ...this.state,
            archetype: archetype
        });
    }

    public render(): JSX.Element {
        var model = new DndModel(this.state);

        return (
            <div className='bd-main-container container'>
                <Summary />
                <div className='content has-text-left'>
                    <XpLevel
                        level={this.state.level}
                        xp={this.state.xp}
                        setXp={this.handleXpChange} />

                    <PlayerAndCharacterName
                        race={this.state.race}
                        playerName={this.state.playerName}
                        characterName={this.state.characterName}
                        setCharacterName={this.handleCharacterNameChange}
                        setPlayerName={this.handlePlayerNameChange} />

                    <RaceComponent
                        race={this.state.race}
                        setRace={this.handleRaceChange} />

                    <ClassComponent
                        class={this.state.class}
                        archetype={this.state.archetype}
                        level={this.state.level}
                        setClass={this.handleClassChange} 
                        setArchetype={this.handleArchetypeChange}/>
                    
                    <div className='field'>
                        <label className='label'>Alignment:</label>
                        <div id="character-alignment1">
                            <div className="buttons are-small has-addons">
                                {reference.alignments.map((align, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            name="alignment"
                                            onClick={(e) => this.handleClickSelection(e, align)}
                                            className={"button " + (this.state.alignment.id === align.id ? "is-link is-selected" : null)}
                                        >{align.lawfulChaotic + ' ' + align.goodEvil}</button>)
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Background:</label>
                        <div id="character-background">
                            <div className="buttons are-small has-addons">
                                {phb.backgrounds.map((bg, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            name="background"
                                            onClick={(e) => this.selectClassOrBackground(e, bg)}
                                            className={"button " + (this.state.background.id === bg.id ? "is-link is-selected" : null)}
                                        >{bg.text}</button>)
                                })}
                            </div>
                        </div>
                    </div>
                    {model.toolProficienciesText !== '' && (
                        <div className='columns field'>
                            <label className='column is-2 label'>Tool Proficiencies:</label>
                            <div className='column' id="toolProfs">
                                <span className='tag is-dark'>{model.toolProficienciesText}</span>
                            </div>
                        </div>)
                    }
                    <div className='columns field'>
                        <label className='column is-2 label'>Currency:</label>
                        <div className='column' id="currency">{model.currencyText}</div>
                    </div>
                    <div className='columns'>
                        <label className='column is-2 label'>Stats:</label>
                        <div className='column is-1'>Assigned</div>
                        <div className='column is-1'>Racial</div>
                        <div className='column is-1'>Total</div>
                        <div className='column is-1'>Modifier</div>
                    </div>
                    {reference.statBlocks.map((block, index) => {
                        return (
                            <div className='columns' id="stat-block" key={index}>
                                <div className='column is-2'>{block.text}</div>
                                <div className='column is-1'>{this.state.statArray[block.id]}</div>
                                <div className='column is-1'>{this.state.race.bonuses[block.id]}</div>
                                <div className='column is-1'>{model.statTotal(block.id)}</div>
                                <div className='column is-1'>{Util.formatModifier(model.statModifier(block.id))}</div>
                            </div>)
                    })}
                    {this.state.statRolls.length > 0 && (
                        <div className='columns field'>
                            <div className='column is-2'>Assign <b>{model.currentStatAssignmentText}</b>:</div>
                            <div className='column buttons has-addons'>
                                {this.state.statRolls.map((r, index) => {
                                    return (
                                        <button
                                            type="button"
                                            className="button is-link"
                                            name="assignStat"
                                            onClick={(e) => this.allocateStat(e, index, r)}
                                            key={index}
                                        >{r}</button>)
                                })}
                            </div>
                        </div>)
                    }
                    <div className='columns field'>
                        <label className='column is-2 label'>Reset Stats:</label>
                        <div className='column'>
                            <button type="button" className='button is-danger' onClick={(e) => this.rerollStatsStandard(e)}>Standard Array</button>&nbsp;
                <button type="button" className='button is-danger' onClick={(e) => this.rerollStatsRandom(e)}>Reroll</button>
                        </div>
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Proficiencies:</label>
                        <div className='column' id="proficiencies">
                            <div className='tags are-small'>
                                {model.proficiencies.map((prof, index) => {
                                    return (
                                        <span
                                            className="tag is-dark"
                                            role="alert"
                                            key={index}
                                        >{reference.skills[prof].text}</span>)
                                })}
                            </div>
                            {model.allProficienciesChosen() && (
                                <button type="button" className='button is-danger' onClick={(e) => this.resetProficiencies(e)}>Reset Proficiencies</button>)
                            }
                            {!model.allProficienciesChosen() && (
                                <div>
                                    <label className='label'>{model.proficiencesLeftText}</label>
                                    <div className='buttons are-small'>
                                        {model.availableProficiencies.map((prof, index) => {
                                            return (
                                                <button
                                                    type="button"
                                                    className="button is-link"
                                                    name="proficiency"
                                                    onClick={(e) => this.addProficiency(e, prof.id)}
                                                    key={index}
                                                >{prof.text}</button>)
                                        })}
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='columns field'>
                        <label className='column is-2 label'>Equipment:</label>
                        <div className='column tags are-small'>
                            <div className='tags are-small'>
                                {model.equipmentTextList.map((eq, index) => {
                                    return (
                                        <span
                                            className="tag is-dark"
                                            key={index}
                                        >{eq}</span>)
                                })}
                            </div>

                            {!model.allEquipmentChosen() && (
                                <label className='label'>Select Extra Equipment:</label>)
                            }

                            {model.equipmentChoiceModel().map((choices: EquipmentChoiceModel, index) => {
                                return (
                                    <div key={index}>
                                        {choices.choices?.map((choice, index) => {
                                            return (
                                                <span className='buttons are-small' key={index}>
                                                    <span className='tag'>{model.extrasText(choice) + choice.num}x</span>

                                                    {choice.items.map((item, index) => {
                                                        return (
                                                            <button type="button"
                                                                className='button is-link'
                                                                key={index}
                                                                onClick={(e) => this.selectEquipment(e, choices.id, choice.id, item)}>{model.getEquipmentName(item)}
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

                            {model.hasChosenAnyEquipment() && (
                                <button type="button" className='button is-danger' onClick={(e) => this.resetEquipment(e)}>Reset Equipment</button>)
                            }

                        </div>
                    </div>

                    <div className='columns field'>
                        <label className='column is-2 label'>Languages:</label>
                        <div className='column tags are-small'>
                            <div className='tags are-small'>
                                {model.languages.map((lang, index) => {
                                    return (
                                        <span
                                            className="tag is-dark"
                                            key={index}
                                        >{reference.languages[lang].text}</span>)
                                })}
                            </div>
                            {model.hasBonusLanguages() && model.allLanguagesChosen() && (
                                <button type="button" className='button is-danger' onClick={(e) => this.resetLanguages(e)}>Reset Languages</button>)
                            }
                            {!model.allLanguagesChosen() && (
                                <div>
                                    <label className='label'>{model.languagesLeftText}</label>
                                    <div className='buttons are-small'>
                                        {model.availableLanguages.map((lang, index) => {
                                            return (
                                                <button type="button"
                                                    className='button is-link'
                                                    key={index}
                                                    onClick={(e) => this.addLanguage(e, lang.id)}>{lang.text}
                                                </button>)
                                        })}
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className='columns field'>
                        <label className='column is-2 label'>Personality Trait:</label>
                        <div className='column buttons are-small'>
                            {this.state.background.personalityTraits.map((trait, index) => {
                                return (
                                    <button type="button"
                                        name="trait"
                                        key={index}
                                        onClick={(e) => this.handleClickSelection(e, trait.id)}
                                        className={"button is-fullwidth " + (this.state.trait === trait.id ? "is-link is-selected" : null)}>
                                            {trait.text}
                                    </button>)
                            })}
                        </div>
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Ideal:</label>
                        <div className='column buttons are-small'>
                            {this.state.background.ideals.map((trait, index) => {
                                return (
                                    <button type="button"
                                        name="ideal"
                                        key={index}
                                        onClick={(e) => this.handleClickSelection(e, trait.id)}
                                        className={"button is-fullwidth " + (this.state.ideal === trait.id ? "is-link is-selected" : null)}>
                                            {trait.text}
                                    </button>)
                            })}
                        </div>
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Bond:</label>
                        <div className='column buttons are-small'>
                            {this.state.background.bonds.map((trait, index) => {
                                return (
                                    <button type="button"
                                        name="bond"
                                        key={index}
                                        onClick={(e) => this.handleClickSelection(e, trait.id)}
                                        className={"button is-fullwidth " + (this.state.bond === trait.id ? "is-link is-selected" : null)}>
                                            {trait.text}
                                    </button>)
                            })}
                        </div>
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Flaw:</label>
                        <div className='column buttons are-small'>
                            {this.state.background.flaws.map((trait, index) => {
                                return (
                                    <button type="button"
                                        name="flaw"
                                        key={index}
                                        onClick={(e) => this.handleClickSelection(e, trait.id)}
                                        className={"button is-fullwidth " + (this.state.flaw === trait.id ? "is-link is-selected" : null)}>
                                            {trait.text}
                                    </button>)
                            })}
                        </div>
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Age:</label>
                        <input className='input column is-2' id="age" type="text" value={this.state.age} onChange={this.handleInputChange} />
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Height:</label>
                        <input className='input column is-2' id="height" type="text" value={this.state.height} onChange={this.handleInputChange} />
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Weight:</label>
                        <input className='input column is-2' id="weight" type="text" value={this.state.weight} onChange={this.handleInputChange} />
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Eyes:</label>
                        <input className='input column is-2' id="eyes" type="text" value={this.state.eyes} onChange={this.handleInputChange} />
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Skin:</label>
                        <input className='input column is-2' id="skin" type="text" value={this.state.skin} onChange={this.handleInputChange} />
                    </div>
                    <div className='columns field'>
                        <label className='column is-2 label'>Hair:</label>
                        <input className='input column is-2' id="hair" type="text" value={this.state.hair} onChange={this.handleInputChange} />
                    </div>
                    <div className='field'>
                        <label className='label'>Appearance (not implemented yet):</label>
                        <input className='input' id="appearance" type="file" accept="image/*" onChange={(e) => this.setAppearance(e)} />
                    </div>
                    <div className='field'>
                        <label className='label'>Organization/Faction:</label>
                        <input className='input' id="organizations" type="text" value={this.state.organizations} onChange={this.handleInputChange} />
                    </div>
                    <div className='field'>
                        <label className='label'>Faction Logo (not implemented yet):</label>
                        <input className='input' id="factionLogo" type="file" accept="image/*" onChange={(e) => this.setFactionLogo(e)} />
                    </div>
                    <div className='field'>
                        <label className='label'>Allies:</label>
                        <textarea className="textarea" id="allies" value={this.state.allies} onChange={this.handleInputChange} placeholder="Enter your character's allies and/or organizations" />
                    </div>
                    <div className='field'>
                        <label className='label'>Backstory:</label>
                        <textarea className="textarea" id="backstory" value={this.state.backstory} onChange={this.handleInputChange} placeholder="Enter your character's backstory" />
                    </div>
                    <div className='field'>
                        <label className='label'>Additional Features &amp; Traits:</label>
                        <textarea className="textarea" id="additionalFeaturesAndTraits" value={this.state.additionalFeaturesAndTraits} onChange={this.handleInputChange} placeholder="Enter your character's additional features &amp; traits" />
                    </div>
                    <div className='field'>
                        <label className='label'>Treasure:</label>
                        <textarea className="textarea" id="treasure" value={this.state.treasure} onChange={this.handleInputChange} placeholder="Enter your character's additional treasure" />
                    </div>

                    <div id="finish">
                        <button
                            type="button"
                            id="generate"
                            disabled={!model.allChoicesFulfilled()}
                            onClick={(e) => this.generate(e, model)}
                            className={'button is-large ' + (!model.allChoicesFulfilled() ? 'is-outlined' : 'is-success')}
                        >Generate PDF</button>
                    </div>

                    <div>&nbsp;</div>
                </div>
            </div>
        );
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        });
    }

    handleClickSelection(event: any, val: any) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: val
        });
    }

    selectRace(event: any, val: any) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: val,
            languageids: []
        });
    };

    selectClassOrBackground(event: any, val: any) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: val,
            equipment: [],
            equipChoices: [],
            proficiencies: [],
            languageids: [],
            backgroundSpecialty: 0, // TODO: This is bg only - separate out handlers
            archetype: 0 // TODO: This is class only - separate out handlers
        });
    };

    allocateStat(event: any, index: number, val: number) {
        event.preventDefault();

        var statArray = this.state.statArray.slice();
        var statRolls = this.state.statRolls.slice();
        statRolls.splice(index, 1);
        var assignIndex = this.state.statAssignmentIndex;

        statArray[assignIndex] = val;
        assignIndex++;

        if (assignIndex === 5) {
            // Auto-assign last
            statArray[assignIndex] = statRolls[0];
            statRolls = [];
            assignIndex = 0;
        }

        this.setState({
            ...this.state,
            statArray: statArray,
            statRolls: statRolls,
            statAssignmentIndex: assignIndex
        });
    };

    rerollStatsStandard(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statArray: Array(6).fill(null),
            statRolls: reference.standardStatArray.slice(),
            statAssignmentIndex: 0
        });
    };

    rerollStatsRandom(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statArray: Array(6).fill(null),
            statRolls: [...new Array(6)]
                .map(() => Util.statRoll())
                .sort((a, b) => a - b)
                .reverse(),
            statAssignmentIndex: 0
        });
    };

    resetProficiencies(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            proficiencies: []
        });
    };

    addProficiency(event: any, id: number) {
        event.preventDefault();

        var profs = this.state.proficiencies;
        profs.push(id);

        this.setState({
            ...this.state,
            proficiencies: profs
        });
    };

    selectEquipment(event: any, categoryId: number, choiceId: number, equipId: number) {
        event.preventDefault();

        var equipChoices = this.state.equipChoices.slice();
        var existingEquipment = this.state.equipment.slice();
        var equipModel = this.state.class.equipChoices[categoryId];
        var equipChoice = equipModel.choices[choiceId];
        var choiceCategory = equipChoices.find(eq => eq.id === categoryId);

        if (choiceCategory === undefined)
        {
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
        });
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
        });
    };

    resetLanguages(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            languageids: []
        });
    };

    addLanguage = (event: any, id: number) => {
        event.preventDefault();

        var languageids = this.state.languageids.slice();
        languageids.push(id);

        this.setState({
            ...this.state,
            languageids: languageids
        });
    };
    

    setAppearance(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            appearance: event.currentTarget.files[0]
        });
    };

    setFactionLogo(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            factionLogo: event.currentTarget.files[0]
        });
    };

    generate(event: any, model: DndModel) {
        event.preventDefault();

        model.generate();
    };
}
