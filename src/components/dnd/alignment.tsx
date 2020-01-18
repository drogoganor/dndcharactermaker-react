import React from 'react';
import reference from '../../core/reference';
import { Alignment } from '../../core/types';

interface Props {
    alignment: Alignment;
    setAlignment: (alignment: Alignment) => void;
}

export default class AlignmentComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleAlignmentChange = this.handleAlignmentChange.bind(this);
    }

    handleAlignmentChange(event: any, alignment: Alignment) {
        event.preventDefault();
        this.props.setAlignment(alignment);
    }

    public render(): JSX.Element {
        const alignment = this.props.alignment;

        return (
            <div className='field'>
                <label className='label'>Alignment:</label>
                <div id="character-alignment1">
                    <div className="buttons are-small has-addons">
                        {reference.alignments.map((align, index) => {
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    name="alignment"
                                    onClick={(e) => this.handleAlignmentChange(e, align)}
                                    className={"button " + (alignment.id === align.id ? "is-link is-selected" : null)}
                                >{align.lawfulChaotic + ' ' + align.goodEvil}</button>)
                        })}
                    </div>
                </div>
            </div>
        )
    }
}