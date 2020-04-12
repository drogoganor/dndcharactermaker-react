import React, { useState, useEffect } from 'react';
import reference from '../../core/reference';
import Util from '../../core/util';
import { IGlobalState } from "../../redux/reducer";
import { statsChanged } from "../../redux/actions";
import { connect } from 'react-redux';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const StatsComponent = (props: StateProps & DispatchProps) => {
    const [statAssignmentIndex, setStatAssignmentIndex] = useState(0);
    const [statRolls, setStatRolls] = useState([15, 14, 13, 12, 10, 8]);

    const { race, stats, onStatsChanged } = props;
    const { statArray, statTotals, statModifiers, allStatsAssigned } = stats;
    const currentStatAssignmentText = reference.statBlocks[statAssignmentIndex].text;
    const rerollStatsStandard = useStatRerollStandard;
    const rerollStatsRandom = useStatRerollRandom;
    useRaceStats();
    useAllStatsChosen();

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
                        <div className='column is-1'>{statArray[block.id]}</div>
                        <div className='column is-1'>{race.bonuses[block.id]}</div>
                        <div className='column is-1'>{statTotals[block.id]}</div>
                        <div className='column is-1'>{Util.formatModifier(statModifiers[block.id])}</div>
                    </div>)
            })}

            {statRolls.length > 0 && (
                <div className='columns field is-vcentered'>
                    <div className='column is-2'>Assign <b>{currentStatAssignmentText}</b>:</div>
                    <div className='column buttons has-addons'>
                        {statRolls.map((r, index) => {
                            return (
                                <button
                                    type="button"
                                    className="button is-link"
                                    name="assignStat"
                                    onClick={() => allocateStat(index, r)}
                                    key={index}
                                >{r}</button>)
                        })}
                    </div>
                </div>)
            }
            <div className='columns field is-vcentered'>
                <label className='column is-2 label'>Reset Stats:</label>
                <div className='column'>
                    <button type="button" className='button is-danger' onClick={() => rerollStatsStandard()}>Standard Array</button>&nbsp;
                    <button type="button" className='button is-danger' onClick={() => rerollStatsRandom()}>Reroll</button>
                </div>
            </div>
        </div>
    );

    ////////////////////


    function useAllStatsChosen() {
        useEffect(() => {
            if (statRolls.length === 0 && !allStatsAssigned) {
                onStatsChanged({
                    statArray,
                    statTotals,
                    statModifiers,
                    allStatsAssigned: true
                });
            }
        }, [statArray, statTotals, statModifiers, statRolls, allStatsAssigned]);
    }

    function useRaceStats() {
        useEffect(() => {
            let modifiers = Array(6).fill(null);
            let totals = Array(6).fill(null);
            for (let i = 0; i < 6; i++) {
                if (statArray[i] !== null) {
                    let total = statArray[i] + race.bonuses[i];
                    totals[i] = total;
                    modifiers[i] = Util.getModifier(total);
                }
            }

            onStatsChanged({
                statArray,
                statTotals: totals,
                statModifiers: modifiers,
                allStatsAssigned: allStatsAssigned
            });
        }, [race]);
    }

    function allocateStat(index: number, value: number) {
        const array = statArray.slice();
        const totals = statTotals.slice();
        const modifiers = statModifiers.slice();
        let rolls = statRolls.slice()
        rolls.splice(index, 1);
        let assignIndex = statAssignmentIndex;
        array[assignIndex] = value;
        let total = value + race.bonuses[assignIndex];
        totals[assignIndex] = total;
        modifiers[assignIndex] = Util.getModifier(total);
        assignIndex++;

        if (assignIndex === 5) {
            // Auto-assign last
            let lastAssigned = rolls[0];
            array[assignIndex] = lastAssigned;
            let total = lastAssigned + race.bonuses[assignIndex];
            totals[assignIndex] = total;
            modifiers[assignIndex] = Util.getModifier(total);
            rolls = [];
            assignIndex = 0;
        }

        setStatRolls(rolls);
        setStatAssignmentIndex(assignIndex);

        onStatsChanged({
            statArray: array,
            statTotals: totals,
            statModifiers: modifiers,
            allStatsAssigned: false
        });
    }

    function resetState() {
        setStatAssignmentIndex(0);
    }

    function useStatRerollStandard() {
        resetState();
        setStatRolls(reference.standardStatArray.slice());

        onStatsChanged({
            statArray: Array(6).fill(null),
            statTotals: Array(6).fill(null),
            statModifiers: Array(6).fill(null),
            allStatsAssigned: false
        });
    }

    function useStatRerollRandom() {
        resetState();
        setStatRolls([...new Array(6)]
            .map(() => Util.statRoll())
            .sort((a, b) => a - b)
            .reverse());

        onStatsChanged({
            statArray: Array(6).fill(null),
            statTotals: Array(6).fill(null),
            statModifiers: Array(6).fill(null),
            allStatsAssigned: false
        });
    }
};

////////////////////

const mapStateToProps = (state: IGlobalState) => {
    const {
        race,
        stats
    } = state;

    return {
        race,
        stats
    };
};

const mapDispatchToProps = {
    onStatsChanged: statsChanged,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsComponent);