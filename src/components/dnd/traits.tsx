import React from 'react';
import { Background } from '../../core/types';

interface Props {
    background: Background;
    setTrait: (name: string, trait: number) => void;
}

class State {
    public readonly trait: number = 0;
    public readonly ideal: number = 0;
    public readonly bond: number = 0;
    public readonly flaw: number = 0;
}

export default class TraitsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.handleClickSelection = this.handleClickSelection.bind(this);
    }

    handleClickSelection(event: any, val: any) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: val
        }, () => this.props.setTrait(name, val));
    }

    public render(): JSX.Element {
        const background = this.props.background;

        return (
            <div>
                <div className='columns field'>
                    <label className='column is-2 label'>Personality Trait:</label>
                    <div className='column buttons are-small'>
                        {background.personalityTraits.map((trait, index) => {
                            return (
                                <button type="button"
                                    name="trait"
                                    key={index}
                                    onClick={(e) => this.handleClickSelection(e, trait.id)}
                                    className={"button is-fullwidth " + (this.state.trait === trait.id ? "is-link is-selected" : null)}>
                                    {trait.text}
                                </button>)
                        })}
                    </div>
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Ideal:</label>
                    <div className='column buttons are-small'>
                        {background.ideals.map((trait, index) => {
                            return (
                                <button type="button"
                                    name="ideal"
                                    key={index}
                                    onClick={(e) => this.handleClickSelection(e, trait.id)}
                                    className={"button is-fullwidth " + (this.state.ideal === trait.id ? "is-link is-selected" : null)}>
                                    {trait.text}
                                </button>)
                        })}
                    </div>
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Bond:</label>
                    <div className='column buttons are-small'>
                        {background.bonds.map((trait, index) => {
                            return (
                                <button type="button"
                                    name="bond"
                                    key={index}
                                    onClick={(e) => this.handleClickSelection(e, trait.id)}
                                    className={"button is-fullwidth " + (this.state.bond === trait.id ? "is-link is-selected" : null)}>
                                    {trait.text}
                                </button>)
                        })}
                    </div>
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Flaw:</label>
                    <div className='column buttons are-small'>
                        {background.flaws.map((trait, index) => {
                            return (
                                <button type="button"
                                    name="flaw"
                                    key={index}
                                    onClick={(e) => this.handleClickSelection(e, trait.id)}
                                    className={"button is-fullwidth " + (this.state.flaw === trait.id ? "is-link is-selected" : null)}>
                                    {trait.text}
                                </button>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}