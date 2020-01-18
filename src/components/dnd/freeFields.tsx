import React from 'react';

interface Props {
    readonly age: string;
    readonly height: string;
    readonly weight: string;
    readonly eyes: string;
    readonly skin: string;
    readonly hair: string;
    readonly appearance: any; // Image
    readonly factionLogo: any; // Image
    readonly organizations: string;
    readonly allies: string;
    readonly backstory: string;
    readonly treasure: string;
    readonly additionalFeaturesAndTraits: string;
    setField: (name: string, val: string) => void;
    setImage: (name: string, val: any) => void;
}

export default class FreeFields extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setAppearance = this.setAppearance.bind(this);
        this.setFactionLogo = this.setFactionLogo.bind(this);
    }

    handleInputChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.props.setField(name, value);
    }

    setAppearance(event: any) {
        event.preventDefault();
        this.readFile(event);
    };

    setFactionLogo(event: any) {
        event.preventDefault();
        this.readFile(event);
    };

    readFile(event: any) {
        let name = event.target.name;
        let file = event.currentTarget.files[0];
        var sf = this.props.setImage;

        const reader = new FileReader();
        reader.addEventListener("load", function () {
          // convert image file to base64 string
          sf(name, reader.result);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    public render(): JSX.Element {
        return (
            <div className='field'>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Age:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="age" type="text" value={this.props.age} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Height:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="height" type="text" value={this.props.height} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Weight:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="weight" type="text" value={this.props.weight} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Eyes:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="eyes" type="text" value={this.props.eyes} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Skin:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="skin" type="text" value={this.props.skin} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Hair:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="hair" type="text" value={this.props.hair} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Appearance (N/A):</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' disabled name="appearance" type="file" accept="image/*" onChange={(e) => this.setAppearance(e)} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Organization/Faction:</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' name="organizations" type="text" value={this.props.organizations} onChange={this.handleInputChange} />
                        </div>
                    </div>
                </div>
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Faction Logo (N/A):</label>
                    <div className='column'>
                        <div className='control'>
                            <input className='input' disabled name="factionLogo" type="file" accept="image/*" onChange={(e) => this.setFactionLogo(e)} />
                        </div>
                    </div>
                </div>
                <div className='field'>
                    <label className='label'>Allies:</label>
                    <textarea className="textarea" name="allies" value={this.props.allies} onChange={this.handleInputChange} placeholder="Enter your character's allies and/or organizations" />
                </div>
                <div className='field'>
                    <label className='label'>Backstory:</label>
                    <textarea className="textarea" name="backstory" value={this.props.backstory} onChange={this.handleInputChange} placeholder="Enter your character's backstory" />
                </div>
                <div className='field'>
                    <label className='label'>Additional Features &amp; Traits:</label>
                    <textarea className="textarea" name="additionalFeaturesAndTraits" value={this.props.additionalFeaturesAndTraits} onChange={this.handleInputChange} placeholder="Enter your character's additional features &amp; traits" />
                </div>
                <div className='field'>
                    <label className='label'>Treasure:</label>
                    <textarea className="textarea" name="treasure" value={this.props.treasure} onChange={this.handleInputChange} placeholder="Enter your character's additional treasure" />
                </div>
            </div>
        )
    }
}