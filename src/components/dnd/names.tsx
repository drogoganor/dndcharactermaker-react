import React from 'react';
import { Race } from '../../core/types';

interface Props {
    playerName: string;
    characterName: string;
    race: Race;
    setPlayerName: (playerName: string) => void;
    setCharacterName: (characterName: string) => void;
}

export default class Names extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
        this.handleCharacterNameChange = this.handleCharacterNameChange.bind(this);
    }

    handlePlayerNameChange(event: any) {
        this.props.setPlayerName(event.target.value);
    }

    handleCharacterNameChange(event: any) {
        this.props.setCharacterName(event.target.value);
    }

    get raceNamesPageReference(): string {
        return 'Example ' + this.props.race.text + ' names can be found on page ' + this.props.race.page;
    }

    public render(): JSX.Element {
        const playerName = this.props.playerName;
        const characterName = this.props.characterName;

        return (
            <div className='field'>
                <div className='columns'>
                    <label className='column is-2 label'>Character Name:</label>
                    <input className='input column is-fullwidth' id="charname" type="text"
                        name="characterName"
                        placeholder={this.raceNamesPageReference}
                        value={characterName}
                        onChange={this.handleCharacterNameChange}
                    />
                </div>
                <div className='columns'>
                    <label className='column is-2 label'>Player Name:</label>
                    <input className='input column is-fullwidth' id="playername" type="text" placeholder="Your name"
                        name="playerName"
                        value={playerName}
                        onChange={this.handlePlayerNameChange}
                    />
                </div>
            </div>
        )
    }
}