import React from 'react';
import { Background } from '../../core/types';
import phb from '../../core/phb';
import reference from '../../core/reference';

interface Props {
    background: Background;
    backgroundToolChoice: string;
    backgroundSpecialty: number;
    setBackground: (background: Background) => void;
    setBackgroundToolChoice: (tool: string) => void;
    setSpecialty: (backgroundSpecialty: number) => void;
}

export default class BackgroundComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
        this.handleBackgroundToolChoiceChange = this.handleBackgroundToolChoiceChange.bind(this);
        this.handleSpecialtySelection = this.handleSpecialtySelection.bind(this);
    }

    handleBackgroundChange(event: any, bg: Background) {
        event.preventDefault();
        this.props.setBackground(bg);
    }

    handleBackgroundToolChoiceChange(event: any) {
        event.preventDefault();
        this.props.setBackgroundToolChoice(event.target.value);
    }

    handleSpecialtySelection(event: any) {
        event.preventDefault();

        const target = event.target;
        const val = target.value;

        this.props.setSpecialty(val);
    }

    get toolProficienciesText(): string {
        let result = this.props.background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
        let toolSelection = this.props.background.toolSelection;

        if (this.props.backgroundToolChoice !== '' && toolSelection !== undefined &&
            toolSelection.proficiencyId !== undefined) {
            result = result.replace('________', this.props.backgroundToolChoice.trim());
        }
        
        return result;
    };

    get currencyText(): string {
        let currency = this.props.background.currency.slice();

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
    };

    public render(): JSX.Element {
        const background = this.props.background;
        const backgroundToolChoice = this.props.backgroundToolChoice;

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
                                        onClick={(e) => this.handleBackgroundChange(e, bg)}
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
                                    <select name='backgroundSpecialty' onChange={(e) => this.handleSpecialtySelection(e)}>
                                        {background.specialty.rolls.map((roll, index) => {
                                            return (<option key={index} value={roll.id}>{roll.text}</option>)
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
                {this.props.background.toolSelection !== undefined && (

                    <div className='field is-vcentered'>
                        <div className='columns'>
                            <label className='column is-2 label'>{this.props.background.toolSelection.text}:</label>
                            <input className='input column is-fullwidth' id="charname" type="text"
                                name="toolSelection"
                                value={backgroundToolChoice}
                                onChange={this.handleBackgroundToolChoiceChange}
                            />
                        </div>
                        <div className='columns'>
                            <div className="notification">
                                <b>Suggestions: </b>{this.props.background.toolSelection.suggestions}
                            </div>
                        </div>
                    </div>)
                }
                {this.toolProficienciesText !== '' && (
                    <div className='columns field'>
                        <label className='column is-2 label'>Tool Proficiencies:</label>
                        <div className='column' id="toolProfs">
                            <span className='tag is-dark'>{this.toolProficienciesText}</span>
                        </div>
                    </div>)
                }
                <div className='columns field'>
                    <label className='column is-2 label'>Currency:</label>
                    <div className='column' id="currency">{this.currencyText}</div>
                </div>
            </div>
        )
    }
}