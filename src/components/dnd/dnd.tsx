import React from 'react';
import reference from '../../core/reference';
import { Race, Class, Alignment, Background } from '../../core/types';
import DndCharacter, { EquipmentChoiceModel, EquipmentModel } from '../../core/dndcharacter';
import 'bulma';
import Summary from './summary';
import XpLevel from './xpLevel';
import Names from './names';
import RaceComponent from './race';
import ClassComponent from './class';
import AlignmentComponent from './alignment';
import BackgroundComponent from './background';
import StatsComponent from './stats';
import ProficienciesComponent from './proficiencies';
import EquipmentComponent from './equipment';
import LanguagesComponent from './languages';
import TraitsComponent from './traits';
import FreeFields from './freeFields';
import GeneratePDF from './generatePDF';

interface Props { }

export default class DndCharacterMakerComponent extends React.Component<Props, DndCharacter> {
    constructor(props: Props) {
        super(props);
        this.state = new DndCharacter();
        this.handleTraitSelection = this.handleTraitSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.handleXpChange = this.handleXpChange.bind(this);
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
        this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
        this.handleRaceChange = this.handleRaceChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleArchetypeChange = this.handleArchetypeChange.bind(this);
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleStatArrayChange = this.handleStatArrayChange.bind(this);
        this.handleProficienciesChange = this.handleProficienciesChange.bind(this);
        this.handleEquipmentChange = this.handleEquipmentChange.bind(this);
        this.handleLanguagesChange = this.handleLanguagesChange.bind(this);
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

    handleAlignmentChange(alignment: Alignment) {
        this.setState({
            ...this.state,
            alignment: alignment
        });
    }

    handleBackgroundChange(background: Background) {
        this.setState({
            ...this.state,
            background: background,
            equipment: [],
            equipChoices: [],
            proficiencies: [],
            languageids: [],
            backgroundSpecialty: 0
        });
    }
    
    handleStatArrayChange(statArray: number[], allStatsAssigned: boolean) {
        this.setState({
            ...this.state,
            statArray: statArray,
            allStatsAssigned: allStatsAssigned
        });
    }
    
    handleProficienciesChange(proficiencies: number[], allProficienciesChosen: boolean) {
        this.setState({
            ...this.state,
            proficiencies: proficiencies,
            allProficienciesChosen: allProficienciesChosen
        });
    }

    handleEquipmentChange(equipment: EquipmentModel[], equipChoices: EquipmentChoiceModel[], equipmentText: string, allEquipmentChosen: boolean) {
        this.setState({
            ...this.state,
            equipment: equipment,
            equipChoices: equipChoices,
            allEquipmentChosen: allEquipmentChosen,
            equipmentText: equipmentText
        });
    }

    handleLanguagesChange(languageids: number[], allLanguagesChosen: boolean) {
        this.setState({
            ...this.state,
            languageids: languageids,
            allLanguagesChosen: allLanguagesChosen
        });
    }

    handleTraitSelection(name: string, val: number) {
        this.setState({
            ...this.state,
            [name]: val
        });
    }

    handleInputChange(name: string, value: string) {
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    public render(): JSX.Element {
        return (
            <div className='bd-main-container container'>
                <Summary />
                <div className='content has-text-left'>
                    <XpLevel
                        level={this.state.level}
                        xp={this.state.xp}
                        setXp={this.handleXpChange} />

                    <Names
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
                    
                    <AlignmentComponent
                        alignment={this.state.alignment}
                        setAlignment={this.handleAlignmentChange}/>

                    <BackgroundComponent
                        background={this.state.background}
                        setBackground={this.handleBackgroundChange}/>

                    <StatsComponent
                        race={this.state.race}
                        setStatArray={this.handleStatArrayChange}/>
                    
                    <ProficienciesComponent
                        class={this.state.class}
                        background={this.state.background}
                        setProficiencies={this.handleProficienciesChange}/>
                    
                    <EquipmentComponent
                        class={this.state.class}
                        background={this.state.background}
                        setEquipment={this.handleEquipmentChange}/>
                    
                    <LanguagesComponent
                        class={this.state.class}
                        race={this.state.race}
                        background={this.state.background}
                        setLanguages={this.handleLanguagesChange}/>

                    <TraitsComponent
                        background={this.state.background}
                        setTrait={this.handleTraitSelection}/>
                    
                    <FreeFields setField={this.handleInputChange}/>
                    
                    <GeneratePDF {...this.state} />

                    <div>&nbsp;</div>
                </div>
            </div>
        );
    }
}
