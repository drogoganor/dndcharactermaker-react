import React from 'react';
import { IGlobalState } from "../../redux/reducer";
import { traitsChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const TraitsComponent = (props: StateProps & DispatchProps) => {
    const { traits, background, onTraitsChanged } = props;

    return (
        <div className='field'>
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Personality Trait:</label>
                <div className='column'>
                    <div className='control'>
                        <div className='select is-fullwidth'>
                            <select name='trait' onChange={(e) => traitChanged(+e.target.value)}>
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
                            <select name='ideal' onChange={(e) => idealChanged(+e.target.value)}>
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
                            <select name='bond' onChange={(e) => bondChanged(+e.target.value)}>
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
                            <select name='flaw' onChange={(e) => flawChanged(+e.target.value)}>
                                {background.flaws.map((trait, index) => {
                                    return (<option key={index} value={trait.id}>{trait.text}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    ////////////////////

    function traitChanged(id: number) {
        onTraitsChanged({
            ...traits,
            trait: id
        });
    }

    function idealChanged(id: number) {
        onTraitsChanged({
            ...traits,
            ideal: id
        });
    }

    function bondChanged(id: number) {
        onTraitsChanged({
            ...traits,
            bond: id
        });
    }

    function flawChanged(id: number) {
        onTraitsChanged({
            ...traits,
            flaw: id
        });
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        traits,
        background
    } = state;

    return {
        traits,
        background
    };
};

const mapDispatchToProps = {
    onTraitsChanged: traitsChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(TraitsComponent);