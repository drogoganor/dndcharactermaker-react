import React, { useEffect } from 'react';
import reference from '../../core/reference';
import { IGlobalState } from "../../redux/reducer";
import { languagesChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const LanguagesComponent = (props: StateProps & DispatchProps) => {
    const { race, background, languages, onLanguagesChanged } = props;
    const { languageIds, allLanguagesChosen } = languages;
    const allLanguages = race.languages.concat(languageIds);
    const hasBonusLanguages = race.extraLanguages > 0 || background.languages > 0;
    const numLanguagesTotal = race.extraLanguages + background.languages;
    useAllLanguagesChosen();

    return (
        <div className='columns field'>
            <label className='column is-2 label'>Languages:</label>
            <div className='column tags are-small'>
                <div className='tags are-small'>
                    {allLanguages.map((lang, index) => {
                        return (
                            <span
                                className="tag is-dark"
                                key={index}
                            >{reference.languages[lang].text}</span>)
                    })}
                </div>
                {hasBonusLanguages && allLanguagesChosen && (
                    <button type="button" className='button is-danger' onClick={() => resetLanguages()}>Reset Languages</button>)
                }
                {!allLanguagesChosen && (
                    <div>
                        <label className='label'>{languagesLeftText()}</label>
                        <div className='buttons are-small'>
                            {availableLanguages().map((lang, index) => {
                                return (
                                    <button type="button"
                                        className='button is-link'
                                        key={index}
                                        onClick={() => addLanguage(lang.id)}>{lang.text}
                                    </button>)
                            })}
                        </div>
                    </div>)
                }
            </div>
        </div>
    );

    ////////////////////

    function useAllLanguagesChosen() {
        useEffect(() => {
            if (languageIds.length >= numLanguagesTotal && !allLanguagesChosen) {
                onLanguagesChanged({
                    languageIds: languageIds,
                    allLanguagesChosen: true
                });
            }
        }, [languageIds]);
    }

    function languagesLeftText(): string {
        // Nice text label to indicate how many additional languages you can choose
        const extraLangs = race.extraLanguages;
        const numBackgroundLangs = background.languages;
        const numLeft = extraLangs + numBackgroundLangs - languageIds.length;

        return "Choose " + numLeft + " additional language" + (numLeft > 1 ? "s" : "") + ":";
    }

    function availableLanguages(): any[] {
        // List of all available additional languages to choose from, excluding already selected
        const langs = [];
        for (const lang of reference.languages) {
            if (!allLanguages.includes(lang.id))
                langs.push(lang);
        }
        return langs;
    }

    function resetLanguages() {
        onLanguagesChanged({
            languageIds: [],
            allLanguagesChosen: false
        });
    }

    function addLanguage(id: number) {
        const langs = languageIds.slice();
        langs.push(id);

        onLanguagesChanged({
            languageIds: langs,
            allLanguagesChosen: langs.length >= numLanguagesTotal
        });
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        race,
        background,
        languages
    } = state;

    return {
        race,
        background,
        languages
    };
};

const mapDispatchToProps = {
    onLanguagesChanged: languagesChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent);