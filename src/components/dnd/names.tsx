import React, { useMemo } from 'react';
import { Race } from '../../core/types';
import { IGlobalState } from "../../redux/reducer";
import { connect } from 'react-redux';
import { Field } from 'formik';

interface IProps {
    race: Race;
}

type StateProps = ReturnType<typeof mapStateToProps>;

const Names = (props: IProps & StateProps) => {
    const { race } = props;
    const raceNamePlaceholder = useCharacterNamePageReference();

    return (
        <div className='field'>
            <div className='columns'>
                <label className='column is-2 label'>Character Name:</label>
                <Field
                    className='input column is-fullwidth'
                    required
                    name="characterName"
                    placeholder={raceNamePlaceholder}
                />
            </div>
            <div className='columns'>
                <label className='column is-2 label'>Player Name:</label>
                <Field
                    className='input column is-fullwidth'
                    required
                    name="playerName"
                    placeholder="Your name"
                />
            </div>
        </div>
    );

    ////////////////////

    function useCharacterNamePageReference() {
        return useMemo(() => {
            return 'Example ' + race.text + ' names can be found on page ' + race.page;
        }, [race]);
    }
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

export default connect(mapStateToProps)(Names);