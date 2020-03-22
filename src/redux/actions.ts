import { createAction } from 'redux-actions';
import { Alignment, Background, Class, Race } from '../core/types';
import { StatModel, ProficienciesModel, EquipModel, LanguagesModel, TraitModel } from "./reducer";

const ActionTypes = {
    LEVEL_CHANGED: 'LEVEL_CHANGED',
    PLAYER_NAME_CHANGED: 'PLAYER_NAME_CHANGED',
    CHARACTER_NAME_CHANGED: 'CHARACTER_NAME_CHANGED',
    RACE_CHANGED: 'RACE_CHANGED',
    CLASS_CHANGED: 'CLASS_CHANGED',
    ARCHETYPE_CHANGED: 'ARCHETYPE_CHANGED',
    BACKGROUND_CHANGED: 'BACKGROUND_CHANGED',
    BACKGROUND_SPECIALTY_CHANGED: 'BACKGROUND_SPECIALTY_CHANGED',
    BACKGROUND_TOOL_CHOICE_CHANGED: 'BACKGROUND_TOOL_CHOICE_CHANGED',
    ALIGNMENT_CHANGED: 'ALIGNMENT_CHANGED',
    STATS_CHANGED: 'STATS_CHANGED',
    PROFICIENCIES_CHANGED: 'PROFICIENCIES_CHANGED',
    EQUIPMENT_CHANGED: 'EQUIPMENT_CHANGED',
    LANGUAGES_CHANGED: 'LANGUAGES_CHANGED',
    TRAITS_CHANGED: 'TRAITS_CHANGED',
};

export default ActionTypes;

export const levelChanged = createAction<number>(ActionTypes.LEVEL_CHANGED);
export const playerNameChanged = createAction<string>(ActionTypes.PLAYER_NAME_CHANGED);
export const characterNameChanged = createAction<string>(ActionTypes.CHARACTER_NAME_CHANGED);
export const raceChanged = createAction<Race>(ActionTypes.RACE_CHANGED);
export const classChanged = createAction<Class>(ActionTypes.CLASS_CHANGED);
export const archetypeChanged = createAction<number>(ActionTypes.ARCHETYPE_CHANGED);
export const backgroundChanged = createAction<Background>(ActionTypes.BACKGROUND_CHANGED);
export const backgroundSpecialtyChanged = createAction<number>(ActionTypes.BACKGROUND_SPECIALTY_CHANGED);
export const backgroundToolChoiceChanged = createAction<string>(ActionTypes.BACKGROUND_TOOL_CHOICE_CHANGED);
export const alignmentChanged = createAction<Alignment>(ActionTypes.ALIGNMENT_CHANGED);
export const statsChanged = createAction<StatModel>(ActionTypes.STATS_CHANGED);
export const proficienciesChanged = createAction<ProficienciesModel>(ActionTypes.PROFICIENCIES_CHANGED);
export const equipmentChanged = createAction<EquipModel>(ActionTypes.EQUIPMENT_CHANGED);
export const languagesChanged = createAction<LanguagesModel>(ActionTypes.LANGUAGES_CHANGED);
export const traitsChanged = createAction<TraitModel>(ActionTypes.TRAITS_CHANGED);