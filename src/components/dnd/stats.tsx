import React from 'react';
import { Race, Alignment } from '../../core/types';
import phb from '../../core/dndbook';
import reference from '../../core/reference';
import Util from '../../core/util';

interface Props {
    race: Race;
    setStatArray: (statArray: number[]) => void;
}

class State {
    public readonly statArray: number[] = Array(6).fill(null);
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

    getModifier(val: number): number {
        // Get stat modifier from lookup table
        for (let mod of reference.statModifiers) {
          if (val <= mod.val)
            return mod.modifier;
        }
        return reference.statModifiers[reference.statModifiers.length - 1].modifier;
    };

    statTotal(i: number): number {
        return this.state.statArray[i] + this.props.race.bonuses[i];
    }

    statModifier(i: number): number {
        return this.getModifier(this.statTotal(i));
    }

    rerollStatsStandard(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statArray: Array(6).fill(null),
            statRolls: reference.standardStatArray.slice(),
            statAssignmentIndex: 0
        });
    };

    rerollStatsRandom(event: any) {
        event.preventDefault();

        this.setState({
            ...this.state,
            statArray: Array(6).fill(null),
            statRolls: [...new Array(6)]
                .map(() => Util.statRoll())
                .sort((a, b) => a - b)
                .reverse(),
            statAssignmentIndex: 0
        });
    };

    allocateStat(event: any, index: number, val: number) {
        event.preventDefault();

        var statArray = this.state.statArray.slice();
        var statRolls = this.state.statRolls.slice();
        statRolls.splice(index, 1);
        var assignIndex = this.state.statAssignmentIndex;

        statArray[assignIndex] = val;
        assignIndex++;

        if (assignIndex === 5) {
            // Auto-assign last
            statArray[assignIndex] = statRolls[0];
            statRolls = [];
            assignIndex = 0;
        }

        this.setState({
            ...this.state,
            statArray: statArray,
            statRolls: statRolls,
            statAssignmentIndex: assignIndex
        });

        this.props.setStatArray(statArray);
    };

    public render(): JSX.Element {
        //const statArray = this.props.statArray;
        const race = this.props.race;

        return (
            <div>
                <div className='columns'>
                    <label className='column is-2 label'>Stats:</label>
                    <div className='column is-1'>Assigned</div>
                    <div className='column is-1'>Racial</div>
                    <div className='column is-1'>Total</div>
                    <div className='column is-1'>Modifier</div>
                </div>
                {reference.statBlocks.map((block, index) => {
                    return (
                        <div className='columns' id="stat-block" key={index}>
                            <div className='column is-2'>{block.text}</div>
                            <div className='column is-1'>{this.state.statArray[block.id]}</div>
                            <div className='column is-1'>{race.bonuses[block.id]}</div>
                            <div className='column is-1'>{this.statTotal(block.id)}</div>
                            <div className='column is-1'>{Util.formatModifier(this.statModifier(block.id))}</div>
                        </div>)
                })}
                {this.state.statRolls.length > 0 && (
                    <div className='columns field'>
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
                <div className='columns field'>
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