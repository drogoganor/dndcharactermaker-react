import { handleActions } from 'redux-actions';
import { FSA } from 'flux-standard-action';
import reference from "../core/reference";
import phb from "../core/phb";
import {Alignment, Background, Class, Race} from "../core/types";
import {
    levelChanged,
    playerNameChanged,
    characterNameChanged,
    raceChanged,
    classChanged,
    archetypeChanged,
    backgroundChanged,
    backgroundSpecialtyChanged,
    backgroundToolChoiceChanged,
    alignmentChanged,
    statsChanged,
} from "./actions";

export type StatModel = {
    statArray: number[];
    statModifiers: number[];
    statTotals: number[];
    allStatsAssigned: boolean;
};

export interface IGlobalState {
    xp: number;
    level: number;
    playerName: string;
    characterName: string;
    race: Race;
    classType: Class;
    archetype: number;
    background: Background;
    backgroundSpecialty: number;
    backgroundToolChoice: string;
    alignment: Alignment;
    stats: StatModel;
}

export type GlobalState = typeof INITIAL_STATE;

const INITIAL_STATE = {
    xp: 1,
    level: 1,
    playerName: '',
    characterName: '',
    race: phb.races[0],
    classType: phb.classes[0],
    archetype: 0,
    background: phb.backgrounds[0],
    backgroundSpecialty: 0,
    backgroundToolChoice: '',
    alignment: reference.alignments[0],
    stats: {
        statArray: Array(6).fill(null),
        statModifiers: Array(6).fill(null),
        statTotals: Array(6).fill(null),
        allStatsAssigned: false
    },
};

////////////////////

// @ts-ignore
const rootReducer = handleActions({
    [levelChanged.toString()]: (state: GlobalState, { payload }: FSA<string, number>) => {
        return state.level !== payload
            ? { ...state, level: payload }
            : state;
    },

    [playerNameChanged.toString()]: (state: GlobalState, { payload }: FSA<string, string>) => {
        return state.playerName !== payload
            ? { ...state, playerName: payload }
            : state;
    },

    [characterNameChanged.toString()]: (state: GlobalState, { payload }: FSA<string, string>) => {
        return state.characterName !== payload
            ? { ...state, characterName: payload }
            : state;
    },

    [raceChanged.toString()]: (state: GlobalState, { payload }: FSA<string, Race>) => {
        return state.race !== payload
            ? { ...state, race: payload }
            : state;
    },

    [classChanged.toString()]: (state: GlobalState, { payload }: FSA<string, Class>) => {
        return state.classType !== payload
            ? { ...state, classType: payload }
            : state;
    },

    [archetypeChanged.toString()]: (state: GlobalState, { payload }: FSA<string, number>) => {
        return state.archetype !== payload
            ? { ...state, archetype: payload }
            : state;
    },

    [backgroundChanged.toString()]: (state: GlobalState, { payload }: FSA<string, Background>) => {
        return state.background !== payload
            ? { ...state, background: payload }
            : state;
    },

    [backgroundSpecialtyChanged.toString()]: (state: GlobalState, { payload }: FSA<string, number>) => {
        return state.backgroundSpecialty !== payload
            ? { ...state, backgroundSpecialty: payload }
            : state;
    },

    [backgroundToolChoiceChanged.toString()]: (state: GlobalState, { payload }: FSA<string, string>) => {
        return state.backgroundToolChoice !== payload
            ? { ...state, backgroundToolChoice: payload }
            : state;
    },

    [alignmentChanged.toString()]: (state: GlobalState, { payload }: FSA<string, Alignment>) => {
        return state.alignment !== payload
            ? { ...state, alignment: payload }
            : state;
    },

    [statsChanged.toString()]: (state: GlobalState, { payload }: FSA<string, StatModel>) => {
        return state.stats !== payload
            ? { ...state, stats: payload }
            : state;
    },
}, INITIAL_STATE);

export default rootReducer;

