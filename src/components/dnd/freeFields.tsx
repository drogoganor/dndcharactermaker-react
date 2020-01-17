import React from 'react';
import { Class } from '../../core/types';
import phb from '../../core/dndbook';

interface Props {
    setField: (name: string, val: string) => void;
}

class State {
    public readonly age: string = '20';
    public readonly height: string = '6\'1';
    public readonly weight: string = '170lbs';
    public readonly eyes: string = 'Blue';
    public readonly skin: string = 'Fair';
    public readonly hair: string = 'Black';
    public readonly appearance: any = null; // Image
    public readonly factionLogo: any = null; // Image
    public readonly organizations: string = '';
    public readonly allies: string = '';
    public readonly backstory: string = '';
    public readonly treasure: string = '';
    public readonly additionalFeaturesAndTraits: string = '';
}

export default class FreeFields extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setAppearance = this.setAppearance.bind(this);
        this.setFactionLogo = this.setFactionLogo.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            [name]: value
        });

        this.props.setField(name, value);
    }

    setAppearance(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            appearance: event.currentTarget.files[0]
        });

        // TODO: Wire up
    };

    setFactionLogo(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            factionLogo: event.currentTarget.files[0]
        });

        // TODO: Wire up
    };

    public render(): JSX.Element {

        return (
            <div>
                <div className='columns field'>
                    <label className='column is-2 label'>Age:</label>
                    <input className='input column is-2' id="age" type="text" value={this.state.age} onChange={this.handleInputChange} />
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Height:</label>
                    <input className='input column is-2' id="height" type="text" value={this.state.height} onChange={this.handleInputChange} />
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Weight:</label>
                    <input className='input column is-2' id="weight" type="text" value={this.state.weight} onChange={this.handleInputChange} />
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Eyes:</label>
                    <input className='input column is-2' id="eyes" type="text" value={this.state.eyes} onChange={this.handleInputChange} />
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Skin:</label>
                    <input className='input column is-2' id="skin" type="text" value={this.state.skin} onChange={this.handleInputChange} />
                </div>
                <div className='columns field'>
                    <label className='column is-2 label'>Hair:</label>
                    <input className='input column is-2' id="hair" type="text" value={this.state.hair} onChange={this.handleInputChange} />
                </div>
                <div className='field'>
                    <label className='label'>Appearance (not implemented yet):</label>
                    <input className='input' id="appearance" type="file" accept="image/*" onChange={(e) => this.setAppearance(e)} />
                </div>
                <div className='field'>
                    <label className='label'>Organization/Faction:</label>
                    <input className='input' id="organizations" type="text" value={this.state.organizations} onChange={this.handleInputChange} />
                </div>
                <div className='field'>
                    <label className='label'>Faction Logo (not implemented yet):</label>
                    <input className='input' id="factionLogo" type="file" accept="image/*" onChange={(e) => this.setFactionLogo(e)} />
                </div>
                <div className='field'>
                    <label className='label'>Allies:</label>
                    <textarea className="textarea" id="allies" value={this.state.allies} onChange={this.handleInputChange} placeholder="Enter your character's allies and/or organizations" />
                </div>
                <div className='field'>
                    <label className='label'>Backstory:</label>
                    <textarea className="textarea" id="backstory" value={this.state.backstory} onChange={this.handleInputChange} placeholder="Enter your character's backstory" />
                </div>
                <div className='field'>
                    <label className='label'>Additional Features &amp; Traits:</label>
                    <textarea className="textarea" id="additionalFeaturesAndTraits" value={this.state.additionalFeaturesAndTraits} onChange={this.handleInputChange} placeholder="Enter your character's additional features &amp; traits" />
                </div>
                <div className='field'>
                    <label className='label'>Treasure:</label>
                    <textarea className="textarea" id="treasure" value={this.state.treasure} onChange={this.handleInputChange} placeholder="Enter your character's additional treasure" />
                </div>
            </div>
        )
    }
}