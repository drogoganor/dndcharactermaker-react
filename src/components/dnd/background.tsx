import React from 'react';
import { Background } from '../../core/types';
import phb from '../../core/dndbook';
import reference from '../../core/reference';

interface Props {
    background: Background;
    setBackground: (background: Background) => void;
}

export default class BackgroundComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleBackgroundChange = this.handleBackgroundChange.bind(this);
    }

    handleBackgroundChange(event: any, bg: Background) {
        event.preventDefault();
        this.props.setBackground(bg);
    }

    get toolProficienciesText(): string {
        return this.props.background.toolProficiencies.map(prof => reference.toolProficiencies[prof].text).join(', ');
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

        return (
            <div>
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