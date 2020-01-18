import React from 'react';
import { Class, Background } from '../../core/types';
import reference from '../../core/reference';

interface Props {
    class: Class;
    background: Background;
    proficiencies: number[];
    setProficiencies: (proficiencies: number[]) => void;
}

export default class ProficienciesComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.resetProficiencies = this.resetProficiencies.bind(this);
        this.addProficiency = this.addProficiency.bind(this);
    }

    get proficiencies(): number[] {
        return this.props.background.proficiencies.concat(this.props.proficiencies);
    };

    get allProficienciesChosen(): boolean {
        let numClassProfs = this.props.class.proficiencies.num;
        let numBackgroundProfs = this.props.background.proficiencies.length;
        if (this.proficiencies.length < numClassProfs + numBackgroundProfs) {
            return false;
        }

        return true;
    };

    get proficiencesLeftText(): string {
        // Nice text label of how many proficiencies left to select
        let numLeft = this.props.class.proficiencies.num - this.props.proficiencies.length;

        return "Choose " + numLeft + " additional proficienc" + (numLeft > 1 ? "ies" : "y") + ":";
    };

    get availableProficiencies(): any[] {
        // List of all available proficiencies to choose from, excluding already selected
        let profs = [];
        let classProfs = this.props.class.proficiencies.profs;
        let backgroundProfs = this.props.background.proficiencies;
        for (let prof of reference.skills) {
            if (!this.proficiencies.includes(prof.id) && (classProfs.includes(prof.id) || backgroundProfs.includes(prof.id))) {
                profs.push(prof);
            }
        }

        return profs;
    };

    resetProficiencies(event: any) {
        event.preventDefault();

        // this.setState({
        //     ...this.state,
        //     proficiencies: []
        // }, () => this.props.setProficiencies([]));

        this.props.setProficiencies([]);
    };

    addProficiency(event: any, id: number) {
        event.preventDefault();

        let profs = this.props.proficiencies;
        profs.push(id);

        // this.setState({
        //     ...this.state,
        //     proficiencies: profs
        // }, () => this.props.setProficiencies(profs));

        this.props.setProficiencies(profs)
    };

    public render(): JSX.Element {
        //const proficiencies = this.props.proficiencies;

        return (
            <div className='columns field'>
                <label className='column is-2 label'>Proficiencies:</label>
                <div className='column' id="proficiencies">
                    <div className='tags are-small'>
                        {this.proficiencies.map((prof, index) => {
                            return (
                                <span
                                    className="tag is-dark"
                                    role="alert"
                                    key={index}
                                >{reference.skills[prof].text}</span>)
                        })}
                    </div>
                    {this.allProficienciesChosen && (
                        <button type="button" className='button is-danger' onClick={(e) => this.resetProficiencies(e)}>Reset Proficiencies</button>)
                    }
                    {!this.allProficienciesChosen && (
                        <div>
                            <label className='label'>{this.proficiencesLeftText}</label>
                            <div className='buttons are-small'>
                                {this.availableProficiencies.map((prof, index) => {
                                    return (
                                        <button
                                            type="button"
                                            className="button is-link"
                                            name="proficiency"
                                            onClick={(e) => this.addProficiency(e, prof.id)}
                                            key={index}
                                        >{prof.text}</button>)
                                })}
                            </div>
                        </div>)
                    }
                </div>
            </div>
        )
    }
}