import React from 'react';

interface Props {
    xp: number;
    level: number;
    setXp: (xp: number) => void;
}

export default class XpLevel extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        this.props.setXp(event.target.value);
    }

    public render(): JSX.Element {
        const level = this.props.level;
        const xp = this.props.xp;

        return (
            <div>
                <div className='columns field'>
                    <label className='column is-2 label'>Level:</label>
                    <div className='column is-1' id="level">{level}</div>
                </div>

                <div className='columns field'>
                    <label className='column is-2 label'>XP:</label>
                    <input className='input column is-2' id="xp" type="text" name="xp" value={xp} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}