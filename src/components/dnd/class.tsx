import React from 'react';
import { Class } from '../../core/types';
import phb from '../../core/phb';

interface Props {
    class: Class;
    archetype: number;
    level: number;
    setClass: (cls: Class) => void;
    setArchetype: (archetype: number) => void;
}

export default class ClassComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleClassChange = this.handleClassChange.bind(this);
        this.handleArchetypeChange = this.handleArchetypeChange.bind(this);
    }

    handleClassChange(event: any, cls: Class) {
        event.preventDefault();
        this.props.setClass(cls);
    }

    handleArchetypeChange(event: any, archetype: number) {
        event.preventDefault();
        this.props.setArchetype(archetype);
    }

    get canSelectArchetype(): boolean {
        if (this.props.level >= this.props.class.subclass.atLevel) {
            return true;
        }

        return false;
    };

    public render(): JSX.Element {
        const clas = this.props.class;
        const archetype = this.props.archetype;

        return (
            <div className='field'>
                <div className='field'>
                    <label className='label'>Class:</label>
                    <div id="character-class">
                        <div className="buttons are-small has-addons">

                            {phb.classes.map((cls, index) => {
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        name="class"
                                        onClick={(e) => this.handleClassChange(e, cls)}
                                        className={"button " + (clas.id === cls.id ? "is-link is-selected" : null)}
                                    >{cls.text}</button>)
                            })}
                        </div>
                    </div>
                </div>

                {this.canSelectArchetype && (
                    <div className='field'>
                        <label className='label'>{clas.subclass.text}:</label>
                        <div id="character-subclass">
                            <div className="buttons are-small has-addons">

                                {clas.subclass.archetypes.map((sub, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            name="archetype"
                                            onClick={(e) => this.handleArchetypeChange(e, sub.id)}
                                            className={"button " + (archetype === sub.id ? "is-link is-selected" : null)}
                                        >{sub.text}</button>)
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}