import React from 'react';
import reference from '../../core/reference';
import { Race } from '../../core/types';
import Util from '../../core/util';

interface Props {
    race: Race;
    statArray: number[];
    statTotals: number[];
    statModifiers: number[];
    setStatArray: (statArray: number[],
        statTotals: number[],
        statModifiers: number[],
        allStatsAssigned: boolean) => void;
}

class State {
    public readonly statAssignmentIndex: number = 0;
    public readonly statRolls: number[] = [15, 14, 13, 12, 10, 8];
}

export default class StatsComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
        this.allocateStat = this.allocateStat.bind(this);
    }

    get currentStatAssignmentText(): string {
        return reference.statBlocks[this.state.statAssignmentIndex].text;
    };

    get allStatsAssigned(): boolean {
        return this.state.statRolls.length === 0;
    }

    rerollStatsStandard(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statRolls: reference.standardStatArray.slice(),
            statAssignmentIndex: 0
        }, () => this.props.setStatArray(Array(6).fill(null), 
            Array(6).fill(null),
            Array(6).fill(null),
            this.allStatsAssigned));
    };

    rerollStatsRandom(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statRolls: [...new Array(6)]
                .map(() => Util.statRoll())
                .sort((a, b) => a - b)
                .reverse(),
            statAssignmentIndex: 0
        }, () => this.props.setStatArray(Array(6).fill(null),
            Array(6).fill(null),
            Array(6).fill(null),
            this.allStatsAssigned));
    };

    allocateStat(event: any, index: number, val: number) {
        event.preventDefault();

        var statArray = this.props.statArray.slice();
        var statTotals = this.props.statTotals.slice();
        var statModifiers = this.props.statModifiers.slice();
        var statRolls = this.state.statRolls.slice();
        statRolls.splice(index, 1);
        var assignIndex = this.state.statAssignmentIndex;

        statArray[assignIndex] = val;
        let total = val + this.props.race.bonuses[assignIndex];
        statTotals[assignIndex] = total;
        statModifiers[assignIndex] = Util.getModifier(total);
        assignIndex++;

        if (assignIndex === 5) {
            // Auto-assign last
            let lastAssigned = statRolls[0];
            statArray[assignIndex] = lastAssigned;

            let total = lastAssigned + this.props.race.bonuses[assignIndex];
            statTotals[assignIndex] = total;
            statModifiers[assignIndex] = Util.getModifier(total);

            statRolls = [];
            assignIndex = 0;
        }

        this.setState({
            ...this.state,
            statRolls: statRolls,
            statAssignmentIndex: assignIndex
        }, () => this.props.setStatArray(statArray,
            statTotals,
            statModifiers,
            this.allStatsAssigned));
    };

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.race.id !== prevProps.race.id) {
            let modifiers = Array(6).fill(null);
            let totals = Array(6).fill(null);
            for (let i = 0; i < 6; i++) {
                if (this.props.statArray[i] !== null) {
                    let total = this.props.statArray[i] + this.props.race.bonuses[i];
                    totals[i] = total;
                    modifiers[i] = Util.getModifier(total);
                }
            }
    
            this.props.setStatArray(this.props.statArray,
                totals,
                modifiers,
                this.allStatsAssigned);
        }
    };

    public render(): JSX.Element {
        const race = this.props.race;

        return (
            <div className='field is-vcentered'>
                <div className='columns'>
                    <label className='column is-2 label'>Stats:</label>
                    <div className='column is-1'>Assigned</div>
                    <div className='column is-1'>Racial</div>
                    <div className='column is-1'>Total</div>
                    <div className='column is-1'>Modifier</div>
                </div>
                {reference.statBlocks.map((block, index) => {
                    return (
                        <div className='columns is-vcentered' id="stat-block" key={index}>
                            <div className='column is-2'>{block.text}</div>
                            <div className='column is-1'>{this.props.statArray[block.id]}</div>
                            <div className='column is-1'>{race.bonuses[block.id]}</div>
                            <div className='column is-1'>{this.props.statTotals[block.id]}</div>
                            <div className='column is-1'>{Util.formatModifier(this.props.statModifiers[block.id])}</div>
                        </div>)
                })}
                {this.state.statRolls.length > 0 && (
                    <div className='columns field is-vcentered'>
                        <div className='column is-2'>Assign <b>{this.currentStatAssignmentText}</b>:</div>
                        <div className='column buttons has-addons'>
                            {this.state.statRolls.map((r, index) => {
                                return (
                                    <button
                                        type="button"
                                        className="button is-link"
                                        name="assignStat"
                                        onClick={(e) => this.allocateStat(e, index, r)}
                                        key={index}
                                    >{r}</button>)
                            })}
                        </div>
                    </div>)
                }
                <div className='columns field is-vcentered'>
                    <label className='column is-2 label'>Reset Stats:</label>
                    <div className='column'>
                        <button type="button" className='button is-danger' onClick={(e) => this.rerollStatsStandard(e)}>Standard Array</button>&nbsp;
                        <button type="button" className='button is-danger' onClick={(e) => this.rerollStatsRandom(e)}>Reroll</button>
                    </div>
                </div>
            </div>
        )
    }
}