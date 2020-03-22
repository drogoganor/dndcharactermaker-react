import React from 'react';
import 'bulma';
import { Race, Class, Background } from '../../core/types';
import DndCharacter, { EquipmentChoiceModel, EquipmentModel } from '../../core/dndcharacter';
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
import { IGlobalState } from "../../redux/reducer";
import { levelChanged } from "../../redux/actions";
import { connect } from 'react-redux';
import { Formik, FormikProps, FormikHelpers } from 'formik';
import phb from '../../core/phb';

const DndCharacterMaker = () => {
    const initialValues = useInitialValues();

    return (
        <div className='bd-main-container container'>
            <Summary />

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {renderForm}
            </Formik>
        </div>
    );

    ////////////////////

    function renderForm(form: FormikProps<IGlobalState>) {
        return (
            <form onSubmit={form.handleSubmit} noValidate={true}>
                <div className='content has-text-left'>
                    <XpLevel form={form} />
                    <Names />
                    <RaceComponent />
                    <ClassComponent />
                    <AlignmentComponent />
                    <BackgroundComponent form={form} />
                    <StatsComponent />
                    <ProficienciesComponent />
                    <EquipmentComponent />
                </div>
            </form>
        );
    }

    async function handleSubmit(formValues: IGlobalState, form: FormikHelpers<IGlobalState>) {
        //await saveContact(formValues);
    }

    function useInitialValues() {
        return {
            xp: 0,
            level: 1,
            characterName: '',
            playerName: '',
            race: phb.races[0],
            classType: phb.classes[0],
            archetype: 0,
        } as IGlobalState;
    }

////////////////////

    // handleRaceChange(race: Race) {
    //     this.setState({
    //         ...this.state,
    //         race: race,
    //         languageids: []
    //     });
    // }
    //
    // handleClassChange(cls: Class) {
    //     this.setState({
    //         ...this.state,
    //         class: cls,
    //         equipment: [],
    //         equipChoices: [],
    //         proficiencies: [],
    //         languageids: [],
    //         archetype: 0
    //     });
    // }
    //
    // handleArchetypeChange(archetype: number) {
    //     this.setState({
    //         ...this.state,
    //         archetype: archetype
    //     });
    // }
    //
    // handleAlignmentChange(alignment: Alignment) {
    //     this.setState({
    //         ...this.state,
    //         alignment: alignment
    //     });
    // }
    //
    // handleBackgroundChange(background: Background) {
    //     this.setState({
    //         ...this.state,
    //         background: background,
    //         equipment: [],
    //         equipChoices: [],
    //         proficiencies: [],
    //         languageids: [],
    //         backgroundSpecialty: 0
    //     });
    // }
    //
    // handleBackgroundToolChoiceChange(tool: string) {
    //     this.setState({
    //         ...this.state,
    //         backgroundToolChoice: tool
    //     });
    // }
    //
    // handleBackgroundSpecialtyChange(backgroundSpecialty: number) {
    //     this.setState({
    //         ...this.state,
    //         backgroundSpecialty: backgroundSpecialty
    //     });
    // }
    //
    // handleStatArrayChange(statArray: number[], statTotals: number[], statModifiers: number[], allStatsAssigned: boolean) {
    //     this.setState({
    //         ...this.state,
    //         statArray: statArray,
    //         statTotals: statTotals,
    //         statModifiers: statModifiers,
    //         allStatsAssigned: allStatsAssigned
    //     });
    // }
    //
    // handleProficienciesChange(proficiencies: number[]) {
    //     this.setState({
    //         ...this.state,
    //         proficiencies: proficiencies
    //     });
    // }
    //
    // handleEquipmentChange(equipment: EquipmentModel[], equipChoices: EquipmentChoiceModel[], equipmentText: string, allEquipmentChosen: boolean) {
    //     this.setState({
    //         ...this.state,
    //         equipment: equipment,
    //         equipChoices: equipChoices,
    //         allEquipmentChosen: allEquipmentChosen,
    //         equipmentText: equipmentText
    //     });
    // }
    //
    // handleLanguagesChange(languageids: number[]) {
    //     this.setState({
    //         ...this.state,
    //         languageids: languageids
    //     });
    // }
    //
    // handleTraitSelection(name: string, val: number) {
    //     this.setState({
    //         ...this.state,
    //         [name]: val
    //     });
    // }
    //
    // handleInputChange(name: string, value: string) {
    //     this.setState({
    //         ...this.state,
    //         [name]: value
    //     });
    // }
    //
    // handleImageChange(name: string, value: any) {
    //     this.setState({
    //         ...this.state,
    //         [name]: value
    //     });
    // }
    //
    // ///////// Logic /////////
    //
    // allLanguagesChosen = (): boolean => {
    //     let extraLangs = this.state.race.extraLanguages;
    //     let numBackgroundLangs = this.state.background.languages;
    //     let numLanguagesTotal = extraLangs + numBackgroundLangs;
    //
    //     if (this.state.languageids.length < numLanguagesTotal)
    //         return false;
    //     return true;
    // };
    //
    // allProficienciesChosen = (): boolean => {
    //     let numClassProfs = this.state.class.proficiencies.num;
    //     let numBackgroundProfs = this.state.background.proficiencies.length;
    //
    //     if (this.proficiencies().length < numClassProfs + numBackgroundProfs)
    //         return false;
    //     return true;
    // };
    //
    // proficiencies = (): number[] => {
    //     let profs = this.state.background.proficiencies.concat(this.state.proficiencies);
    //
    //     // If Half-Orc, add Intimidation
    //     if (this.state.race.id === 7) {
    //         profs.push(7);
    //     }
    //
    //     // If Elf, add Perception
    //     else if (this.state.race.id >= 3 && this.state.race.id <= 6) {
    //         profs.push(11);
    //     }
    //
    //     return profs;
    // };

    ///////// Component /////////

    // public render(): JSX.Element {
    //     return (
    //         <div className='bd-main-container container'>
    //             <Summary />
    //             <div className='content has-text-left'>
    //                 <XpLevel
    //                     level={this.state.level}
    //                     xp={this.state.xp}
    //                     setXpAndLevel={this.handleXpAndLevelChange} />
    //
    //                 <Names
    //                     race={this.state.race}
    //                     playerName={this.state.playerName}
    //                     characterName={this.state.characterName}
    //                     setCharacterName={this.handleCharacterNameChange}
    //                     setPlayerName={this.handlePlayerNameChange} />
    //
    //                 <RaceComponent
    //                     race={this.state.race}
    //                     setRace={this.handleRaceChange} />
    //
    //                 <ClassComponent
    //                     class={this.state.class}
    //                     archetype={this.state.archetype}
    //                     level={this.state.level}
    //                     setClass={this.handleClassChange}
    //                     setArchetype={this.handleArchetypeChange} />
    //
    //                 <AlignmentComponent
    //                     alignment={this.state.alignment}
    //                     setAlignment={this.handleAlignmentChange} />
    //
    //                 <BackgroundComponent
    //                     background={this.state.background}
    //                     backgroundToolChoice={this.state.backgroundToolChoice}
    //                     backgroundSpecialty={this.state.backgroundSpecialty}
    //                     setBackground={this.handleBackgroundChange}
    //                     setBackgroundToolChoice={this.handleBackgroundToolChoiceChange}
    //                     setSpecialty={this.handleBackgroundSpecialtyChange} />
    //
    //                 <StatsComponent
    //                     race={this.state.race}
    //                     statArray={this.state.statArray}
    //                     statTotals={this.state.statTotals}
    //                     statModifiers={this.state.statModifiers}
    //                     setStatArray={this.handleStatArrayChange} />
    //
    //                 <ProficienciesComponent
    //                     class={this.state.class}
    //                     background={this.state.background}
    //                     proficiencies={this.state.proficiencies}
    //                     setProficiencies={this.handleProficienciesChange} />
    //
    //                 <EquipmentComponent
    //                     class={this.state.class}
    //                     background={this.state.background}
    //                     backgroundToolChoice={this.state.backgroundToolChoice}
    //                     setEquipment={this.handleEquipmentChange} />
    //
    //                 <LanguagesComponent
    //                     class={this.state.class}
    //                     race={this.state.race}
    //                     background={this.state.background}
    //                     languageids={this.state.languageids}
    //                     setLanguages={this.handleLanguagesChange}
    //                     allLanguagesChosen={this.allLanguagesChosen} />
    //
    //                 <TraitsComponent
    //                     background={this.state.background}
    //                     setTrait={this.handleTraitSelection} />
    //
    //                 <FreeFields {...this.state}
    //                     setField={this.handleInputChange}
    //                     setImage={this.handleImageChange} />
    //
    //                 <GeneratePDF {...this.state}
    //                     allLanguagesChosen={this.allLanguagesChosen}
    //                     allProficienciesChosen={this.allProficienciesChosen}
    //                     getProficiencies={this.proficiencies} />
    //
    //                 <div>&nbsp;</div>
    //             </div>
    //         </div>
    //     );
    // }
};

export default DndCharacterMaker;

