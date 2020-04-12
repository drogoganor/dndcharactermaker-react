import React from 'react';
import phb from '../../core/phb';
import { IGlobalState } from "../../redux/reducer";
import { raceChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const RaceComponent = (props: StateProps & DispatchProps) => {
    const { race, onRaceChanged } = props;
    return (
        <div className='field'>
            <div className='field'>
                <label className='label'>Race:</label>
                <div id="character-race">
                    <div className="buttons are-small has-addons">
                        {phb.races.map((rc, index) => {
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    name="race"
                                    onClick={() => onRaceChanged(rc)}
                                    className={"button " + (race.id === rc.id ? "is-link is-selected" : null)}
                                >{rc.text}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        race
    } = state;

    return {
        race
    };
};

const mapDispatchToProps = {
    onRaceChanged: raceChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(RaceComponent);