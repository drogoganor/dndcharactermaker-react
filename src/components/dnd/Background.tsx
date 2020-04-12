import React, { useEffect } from 'react';
import phb from '../../core/phb';
import reference from '../../core/reference';
import {IGlobalState} from "../../redux/reducer";
import {
    backgroundChanged,
    backgroundSpecialtyChanged,
    backgroundToolChoiceChanged
} from "../../redux/actions";
import { connect } from 'react-redux';
import { Field, FormikProps } from 'formik';

interface IProps {
    form: FormikProps<IGlobalState>;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const BackgroundComponent = (props: IProps & StateProps & DispatchProps) => {
    const {
        form,
        background,
        onBackgroundChanged,
        onBackgroundSpecialtyChanged,
        onBackgroundToolChoiceChanged
    } = props;

    const backgroundToolChoice = form.values['backgroundToolChoice'];
    const toolProficienciesText = useToolProficienciesText();
    const currencyText = useCurrencyText();
    useBackgroundChoice();

    return (
        <div className='field'>
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
                                    onClick={() => onBackgroundChanged(bg)}
                                    className={"button " + (background.id === bg.id ? "is-link is-selected" : null)}
                                >{bg.text}</button>)
                        })}
                    </div>
                </div>
            </div>

            {background.specialty !== undefined && (
                <div className='field is-vcentered'>
                    <div className='columns'>
                        <label className='column is-2 label'>{background.specialty.name}:</label>
                        <div className='control'>
                            <div className='select'>
                                <select name='backgroundSpecialty' onChange={(e) => onBackgroundSpecialtyChanged(+e.target.value)}>
                                    {background.specialty.rolls.map((roll, index) => {
                                        return (<option key={index} value={roll.id}>{roll.text}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>)
            }

            {background.toolSelection !== undefined && (

                <div className='field is-vcentered'>
                    <div className='columns'>
                        <label className='column is-2 label'>{background.toolSelection.text}:</label>
                        <Field
                            className='input column is-fullwidth'
                            required
                            name="backgroundToolChoice"
                        />
                    </div>
                    <div className='columns'>
                        <div className="notification">
                            <b>Suggestions: </b>{background.toolSelection.suggestions}
                        </div>
                    </div>
                </div>)
            }

            {toolProficienciesText !== '' && (
                <div className='columns field'>
                    <label className='column is-2 label'>Tool Proficiencies:</label>
                    <div className='column' id="toolProfs">
                        <span className='tag is-dark'>{toolProficienciesText}</span>
                    </div>
                </div>)
            }

            <div className='columns field'>
                <label className='column is-2 label'>Currency:</label>
                <div className='column' id="currency">{currencyText}</div>
            </div>
        </div>
    );

    ////////////////////

    function useBackgroundChoice() {
        useEffect(() => {
            onBackgroundToolChoiceChanged(backgroundToolChoice);
        }, [backgroundToolChoice, onBackgroundToolChoiceChanged])
    }

    function useToolProficienciesText() {
        let result = background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
        let toolSelection = background.toolSelection;

        if (backgroundToolChoice && toolSelection !== undefined &&
            toolSelection.proficiencyId !== undefined) {
            result = result.replace('________', backgroundToolChoice.trim());
        }

        return result;
    }

    function useCurrencyText() {
        let currency = background.currency.slice();

        // Nice text of character currencies
        let text = '';
        if (currency[0] > 0)
            text += currency[0] + " CP ";
        if (currency[1] > 0)
            text += currency[1] + " SP ";
        if (currency[2] > 0)
            text += currency[2] + " EP ";
        if (currency[3] > 0)
            text += currency[3] + " GP ";
        if (currency[4] > 0)
            text += currency[4] + " PP ";

        return text;
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        background,
        backgroundToolChoice
    } = state;

    return {
        background,
        backgroundToolChoice
    };
};

const mapDispatchToProps = {
    onBackgroundChanged: backgroundChanged,
    onBackgroundSpecialtyChanged: backgroundSpecialtyChanged,
    onBackgroundToolChoiceChanged: backgroundToolChoiceChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(BackgroundComponent);