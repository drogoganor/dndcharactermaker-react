import React from 'react';
import { Race } from '../../core/types';
import phb from '../../core/phb';

interface Props {
    race: Race;
    setRace: (race: Race) => void;
}

export default class RaceComponent extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleRaceChange = this.handleRaceChange.bind(this);
    }

    handleRaceChange(event: any, race: Race) {
        event.preventDefault();
        this.props.setRace(race);
    }

    public render(): JSX.Element {
        const race = this.props.race;

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
                                        onClick={(e) => this.handleRaceChange(e, rc)}
                                        className={"button " + (race.id === rc.id ? "is-link is-selected" : null)}
                                    >{rc.text}</button>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}