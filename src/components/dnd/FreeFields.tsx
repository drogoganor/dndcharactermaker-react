import React from 'react';
import { Field } from 'formik';
import {IGlobalState} from "../../redux/reducer";
import {statsChanged} from "../../redux/actions";

const FreeFields = () => {
    // constructor(props: Props) {
    //     super(props);
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.setAppearance = this.setAppearance.bind(this);
    //     this.setFactionLogo = this.setFactionLogo.bind(this);
    // }
    //
    // handleInputChange(event: any) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //
    //     this.props.setField(name, value);
    // }
    //
    // setAppearance(event: any) {
    //     event.preventDefault();
    //     this.readFile(event);
    // };
    //
    // setFactionLogo(event: any) {
    //     event.preventDefault();
    //     this.readFile(event);
    // };
    //
    // readFile(event: any) {
    //     let name = event.target.name;
    //     let file = event.currentTarget.files[0];
    //     var sf = this.props.setImage;
    //
    //     const reader = new FileReader();
    //     reader.addEventListener("load", function () {
    //       // convert image file to base64 string
    //       sf(name, reader.result);
    //     }, false);
    //
    //     if (file) {
    //         reader.readAsDataURL(file);
    //     }
    // }

    return (
        <div className='field'>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Age:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="age"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Height:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="height"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Weight:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="weight"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Eyes:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="eyes"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Skin:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="skin"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Hair:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="hair"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Appearance (N/A):</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            type={"file"}
                            disabled
                            name="appearance"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Organization/Faction:</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            name="organizations"
                        />
                    </div>
                </div>
            </div>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Faction Logo (N/A):</label>
                <div className='column'>
                    <div className='control'>
                        <Field
                            className='input'
                            type={"file"}
                            disabled
                            name="factionLogo"
                        />
                    </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Allies:</label>
                <Field
                    className='input'
                    name="allies"
                    placeholder="Enter your character's allies and/or organizations"
                />
            </div>
            <div className='field'>
                <label className='label'>Backstory:</label>
                <Field
                    className='input'
                    name="backstory"
                    placeholder="Enter your character's backstory"
                />
            </div>
            <div className='field'>
                <label className='label'>Additional Features &amp; Traits:</label>
                <Field
                    className='input'
                    name="additionalFeaturesAndTraits"
                    placeholder="Enter your character's additional features &amp; traits"
                />
            </div>
            <div className='field'>
                <label className='label'>Treasure:</label>
                <Field
                    className='input'
                    name="treasure"
                    placeholder="Enter your character's additional treasure"
                />
            </div>
        </div>
    );
};

////////////////////

export default FreeFields;