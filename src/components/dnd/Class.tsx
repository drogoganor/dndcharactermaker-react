import React from 'react';
import phb from '../../core/phb';
import {IGlobalState} from "../../redux/reducer";
import { classChanged, archetypeChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ClassComponent = (props: StateProps & DispatchProps) => {
    const { level, classType, archetype, onClassChanged, onArchetypeChanged } = props;
    const canSelectArchetype = level >= classType.subclass.atLevel;
    return (
        <div className='field'>
            <div className='field'>                <label className='label'>Class:</label>
                <div id="character-class">
                    <div className="buttons are-small has-addons">
                        {phb.classes.map((cls, index) => {
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    name="class"
                                    onClick={() => onClassChanged(cls)}
                                    className={"button " + (classType.id === cls.id ? "is-link is-selected" : null)}
                                >{cls.text}</button>)
                        })}
                    </div>
                </div>
            </div>

            {canSelectArchetype && (
                <div className='field'>
                    <label className='label'>{classType.subclass.text}:</label>
                    <div id="character-subclass">
                        <div className="buttons are-small has-addons">
                            {classType.subclass.archetypes.map((sub, index) => {
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        name="archetype"
                                        onClick={() => onArchetypeChanged(sub.id)}
                                        className={"button " + (archetype === sub.id ? "is-link is-selected" : null)}
                                    >{sub.text}</button>)
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        level,
        classType,
        archetype,
    } = state;

    return {
        level,
        classType,
        archetype,
    };
};

const mapDispatchToProps = {
    onClassChanged: classChanged,
    onArchetypeChanged: archetypeChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassComponent);
