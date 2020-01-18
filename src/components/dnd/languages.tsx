import React from 'react';
import { Class, Race, Background } from '../../core/types';
import reference from '../../core/reference';

interface Props {
    class: Class;
    race: Race;
    background: Background;
    languageids: number[];
    setLanguages: (languageids: number[]) => void;
    allLanguagesChosen: () => boolean;
}

export default class LanguagesComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.resetLanguages = this.resetLanguages.bind(this);
        this.addLanguage = this.addLanguage.bind(this);
    }

    get languages(): number[] {
        return this.props.race.languages.concat(this.props.languageids);
    };

    get hasBonusLanguages(): boolean {
        // Whether the current class/background combo is able to select additional languages
        let numBackgroundLangs = this.props.background.languages;
        return this.props.race.extraLanguages > 0 || numBackgroundLangs > 0;
    };

    get languagesLeftText(): string {
        // Nice text label to indicate how many additional languages you can choose
        let extraLangs = this.props.race.extraLanguages;
        let numBackgroundLangs = this.props.background.languages;
        let numLeft = extraLangs + numBackgroundLangs - this.props.languageids.length;

        return "Choose " + numLeft + " additional language" + (numLeft > 1 ? "s" : "") + ":";
    };

    get availableLanguages(): any[] {
        // List of all available additional languages to choose from, excluding already selected
        let langs = [];
        let languages = this.languages;
        for (let lang of reference.languages) {
            if (!languages.includes(lang.id))
                langs.push(lang);
        }
        return langs;
    };

    resetLanguages(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            languageids: []
        }, () => this.props.setLanguages([]));
    };

    addLanguage = (event: any, id: number) => {
        event.preventDefault();

        var languageids = this.props.languageids.slice();
        languageids.push(id);

        this.setState({
            ...this.state,
            languageids: languageids
        }, () => this.props.setLanguages(languageids));
    };

    public render(): JSX.Element {
        return (
            <div className='columns field'>
                <label className='column is-2 label'>Languages:</label>
                <div className='column tags are-small'>
                    <div className='tags are-small'>
                        {this.languages.map((lang, index) => {
                            return (
                                <span
                                    className="tag is-dark"
                                    key={index}
                                >{reference.languages[lang].text}</span>)
                        })}
                    </div>
                    {this.hasBonusLanguages && this.props.allLanguagesChosen() && (
                        <button type="button" className='button is-danger' onClick={(e) => this.resetLanguages(e)}>Reset Languages</button>)
                    }
                    {!this.props.allLanguagesChosen() && (
                        <div>
                            <label className='label'>{this.languagesLeftText}</label>
                            <div className='buttons are-small'>
                                {this.availableLanguages.map((lang, index) => {
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
        )
    }
}