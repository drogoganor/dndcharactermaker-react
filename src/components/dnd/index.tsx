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
};

export default DndCharacterMaker;

