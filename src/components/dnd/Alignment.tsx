import React from 'react';
import reference from '../../core/reference';
import { IGlobalState } from "../../redux/reducer";
import { alignmentChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const AlignmentComponent = (props: StateProps & DispatchProps) => {
    const { alignment, onAlignmentChanged } = props;
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
                                onClick={() => onAlignmentChanged(align)}
                                className={"button " + (alignment.id === align.id ? "is-link is-selected" : null)}
                            >{align.lawfulChaotic + ' ' + align.goodEvil}</button>)
                    })}
                </div>
            </div>
        </div>
    );
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        alignment,
    } = state;

    return {
        alignment,
    };
};

const mapDispatchToProps = {
    onAlignmentChanged: alignmentChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlignmentComponent);