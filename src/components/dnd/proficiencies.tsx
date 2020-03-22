import React from 'react';
import reference from '../../core/reference';
import { IGlobalState } from "../../redux/reducer";
import { proficienciesChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ProficienciesComponent = (props: StateProps & DispatchProps) => {
    const { classType, background, proficiency, onProficienciesChanged } = props;
    const { proficiencies } = proficiency;
    const allProficiencies = background.proficiencies.concat(proficiencies);
    const proficienciesLeftText = useProficienciesLeftText();
    const allProficienciesChosen = useAllProficienciesChosen();
    const availableProficiencies = useAvailableProficiencies();
    const resetProficiencies = useResetProficiencies;
    const addProficiency = useAddProficiency;

    return (
        <div className='columns field'>
            <label className='column is-2 label'>Proficiencies:</label>
            <div className='column' id="proficiencies">
                <div className='tags are-small'>
                    {allProficiencies.map((prof, index) => {
                        return (
                            <span
                                className="tag is-dark"
                                role="alert"
                                key={index}
                            >{reference.skills[prof].text}</span>)
                    })}
                </div>

                {allProficienciesChosen && (
                    <button type="button" className='button is-danger' onClick={resetProficiencies}>Reset Proficiencies</button>)
                }

                {!allProficienciesChosen && (
                    <div>
                        <label className='label'>{proficienciesLeftText}</label>
                        <div className='buttons are-small'>
                            {availableProficiencies.map((prof, index) => {
                                return (
                                    <button
                                        type="button"
                                        className="button is-link"
                                        name="proficiency"
                                        onClick={() => addProficiency(prof.id)}
                                        key={index}
                                    >{prof.text}</button>)
                            })}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );

    ////////////////////

    function useResetProficiencies() {
        onProficienciesChanged({
            proficiencies: [],
            allProficienciesChosen: false
        });
    }

    function useAddProficiency(id: number) {
        const profs = proficiencies.slice();
        profs.push(id);

        onProficienciesChanged({
            proficiencies: profs,
            allProficienciesChosen: useAllProficienciesChosen()
        });
    }

    function useProficienciesLeftText() {
        // Nice text label of how many proficiencies left to select
        const numLeft = classType.proficiencies.num - proficiencies.length;
        return "Choose " + numLeft + " additional proficienc" + (numLeft > 1 ? "ies" : "y") + ":";
    }

    function useAllProficienciesChosen() {
        const numClassProfs = classType.proficiencies.num;
        const numBackgroundProfs = background.proficiencies.length;
        return allProficiencies.length >= numClassProfs + numBackgroundProfs;
    }

    function useAvailableProficiencies() {
        // List of all available proficiencies to choose from, excluding already selected
        const profs = [];
        const classProfs = classType.proficiencies.profs;
        const backgroundProfs = background.proficiencies;
        for (const prof of reference.skills) {
            if (!allProficiencies.includes(prof.id) && (classProfs.includes(prof.id) || backgroundProfs.includes(prof.id))) {
                profs.push(prof);
            }
        }

        return profs;
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        classType,
        background,
        proficiency
    } = state;

    return {
        classType,
        background,
        proficiency
    };
};

const mapDispatchToProps = {
    onProficienciesChanged: proficienciesChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProficienciesComponent);