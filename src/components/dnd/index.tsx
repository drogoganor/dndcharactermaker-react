import React from 'react';
import 'bulma';
import Summary from './Summary';
import XpLevel from './XpLevel';
import Names from './Names';
import RaceComponent from './Race';
import ClassComponent from './Class';
import AlignmentComponent from './Alignment';
import BackgroundComponent from './Background';
import StatsComponent from './Stats';
import ProficienciesComponent from './Proficiencies';
import EquipmentComponent from './Equipment';
import LanguagesComponent from './Languages';
import TraitsComponent from './Traits';
import FreeFields from './FreeFields';
import GeneratePDF from './GeneratePDF';
import { IGlobalState } from "../../redux/reducer";
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
                    <LanguagesComponent />
                    <TraitsComponent />
                    <FreeFields />
                    <GeneratePDF form={form} />
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

};

export default DndCharacterMaker;

