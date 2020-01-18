import React from 'react';
import reference from '../../core/reference';

interface Props {
    xp: number;
    level: number;
    setXpAndLevel: (xp: number, level: number) => void;
}

export default class XpLevel extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        let xp = event.target.value;

        this.props.setXpAndLevel(xp, this.getLevel(xp));
    }

    getLevel(xp: number): number {
        // Computed character level from XP
        if (xp === undefined)
            return 1;

        let lev = 0;
        for (let xpLevel of reference.xpLevels) {
            if (xp >= xpLevel.xp)
                lev++;
            else
                break;
        }

        return lev;
    };

    public render(): JSX.Element {
        const level = this.props.level;
        const xp = this.props.xp;

        return (
            <div className='field'>
                <div className='columns'>
                    <label className='column is-2 label'>Level:</label>
                    <div className='column is-1' id="level">{level}</div>
                </div>

                <div className='columns'>
                    <label className='column is-2 label'>XP:</label>
                    <input className='input column is-fullwidth' id="xp" type="text" name="xp" value={xp} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}