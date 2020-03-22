import React from 'react';
import { IGlobalState } from "../../redux/reducer";
import { levelChanged } from "../../redux/actions";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Field, FormikProps } from 'formik';
import reference from "../../core/reference";

interface IProps {
    form: FormikProps<IGlobalState>;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const XpLevel = (props: IProps & StateProps & DispatchProps) => {
    const { form, level, onLevelChanged } = props;
    const xp = form.values['xp'];
    useLevelCalculation();

    return (
        <div className='field'>
            <div className='columns'>
                <label className='column is-2 label'>Level:</label>
                <div className='column is-1' id="level">{level}</div>
            </div>

            <div className='columns'>
                <label className='column is-2 label'>XP:</label>
                <Field
                    className='input column is-fullwidth'
                    required
                    name="xp"
                    // component={FormInputControl}
                />
            </div>
        </div>
    );

    ////////////////////

    function useLevelCalculation() {
        useEffect(() => {
            // Computed character level from XP
            if (xp === undefined) {
                onLevelChanged(1);
                return;
            }

            let lev = 0;
            for (let xpLevel of reference.xpLevels) {
                if (xp >= xpLevel.xp)
                    lev++;
                else
                    break;
            }

            onLevelChanged(lev);
        }, [xp])
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        level
    } = state;

    return {
        level
    };
};

const mapDispatchToProps = {
    onLevelChanged: levelChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(XpLevel);