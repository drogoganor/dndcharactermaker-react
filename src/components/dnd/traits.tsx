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

    handleOptionSelection(event: any) {
        event.preventDefault();

        const target = event.target;
        const name = target.name;
        const val = target.value;

        this.setState({
            ...this.state,
            [name]: val
        }, () => this.props.setTrait(name, val));
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
            <div className='field'>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Personality Trait:</label>
                    <div className='column'>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select name='trait' onChange={(e) => this.handleOptionSelection(e)}>
                                    {background.personalityTraits.map((trait, index) => {
                                        return (<option key={index} value={trait.id}>{trait.text}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Ideal:</label>
                    <div className='column'>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select name='ideal' onChange={(e) => this.handleOptionSelection(e)}>
                                    {background.ideals.map((trait, index) => {
                                        return (<option key={index} value={trait.id}>{trait.text}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Bond:</label>
                    <div className='column'>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select name='bond' onChange={(e) => this.handleOptionSelection(e)}>
                                    {background.bonds.map((trait, index) => {
                                        return (<option key={index} value={trait.id}>{trait.text}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Flaw:</label>
                    <div className='column'>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select name='flaw' onChange={(e) => this.handleOptionSelection(e)}>
                                    {background.flaws.map((trait, index) => {
                                        return (<option key={index} value={trait.id}>{trait.text}</option>)
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}