import React from 'react';
import DndCharacterMaker from './dndstate';
import DndProps from './dndprops';
import 'bulma';

export default class DndCharacterMakerComponent extends React.Component {
    private model: DndCharacterMaker;

    constructor(props: DndProps) {
        super(props);
        this.model = new DndCharacterMaker(new DndProps());
        this.state = this.model.state;
    
        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render(): JSX.Element {
        return (
        <div className='bd-main-container container'>
            <div className='content'>
                <div className='title'>D&amp;D 5e Character Sheet Maker</div>
                <article className='message'>
                    <div className='message-header'>
                    This is a work-in-progress. Many features are missing.
                    </div>
                    <div className="message-body media-content content">
                        <div>
                            This tool will generate a pre-filled <a href="https://dnd.wizards.com/articles/features/character_sheets">D&amp;D 5e character sheet</a> in PDF format. You'll need a <a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_playershandbook">Player's Handbook</a> to fill out some details from page number references. Please see the <a href="https://github.com/drogoganor/dndcharactermaker">GitHub page</a> for more details or to report issues.
                        </div>
                        <div>
                            Missing features list:
                            <ul>
                            <li>Everything from Sword Coast Adventurer's Guide and Xanathar's Guide to Everything</li>
                            <li>Levels above 1 (no calculation of hit points, proficiency bonus, and extra features)</li>
                            <li>Armor class does not include equipped armor or shield!</li>
                            <li>Many race &amp; subrace skills, proficiencies, and features are missing (stat bonuses, speed, &amp; languages are implemented)</li>
                            <li>Class features &amp; traits</li>
                            <li>Personality traits, ideals, bonds &amp; flaws selection</li>
                            <li>Cantrips and spells</li>
                            <li>Character appearance &amp; faction logo</li>
                            </ul>
                        </div>
                        <div>
                            Known bugs and limitations:
                            <ul>
                            <li>The same item can be listed twice e.g. a Criminal Rogue with a Burglar's pack will have Crowbar listed twice instead of "Crowbar (2)"</li>
                            </ul>
                        </div>
                    </div>
                </article>
            </div>
            <div className='content has-text-left'>
            <div className='columns field'>
                <label className='column is-2 label'>Level:</label>
                <div className='column is-1' id="level">{this.model.state.level}</div>
            </div>
            
            <div className='columns field'>
                <label className='column is-2 label'>XP:</label>
                <input className='input column is-2' id="xp" type="text" value={this.model.state.xp}/>
            </div>
            </div>
            
            {/*
            <div className='columns field'>
                <label className='column is-2 label'>Character Name:</label>
                <input className='input column is-5' id="charname" type="text" :placeholder="raceNamePageReferenceText" v-model="output.characterName">
            </div>
            <div className='columns field'>
                <label className='column is-2 label'>Player Name:</label>
                <input className='input column is-5' id="playername" type="text" placeholder="Your name" v-model="output.playerName">
            </div>
            <div className='field'>
                <label className='label'>Race:</label>
                <div id="character-race">
                <div className="buttons are-small has-addons">
                    <button
                    type="button"
                    v-for="race in races"
                    v-bind:key="race.id"
                    v-on:click="setRace(race)"
                    :className="['button', { 'is-link is-selected': output.race === race.text }]"
                    >{{ race.text }}</button>
                </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Class:</label>
                <div id="character-class">
                <div className="buttons are-small has-addons">
                    <button
                    type="button"
                    v-for="cls in classes"
                    v-bind:key="cls.id"
                    v-on:click="setClass(cls)"
                    :className="['button', { 'is-link is-selected': output.class === cls.text }]"
                    >{{ cls.text }}</button>
                </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Law/Chaos:</label>
                <div id="character-alignment1">
                <div className="buttons are-small has-addons">
                    <button
                    type="button"
                    v-for="align in alignmentLawChaos"
                    v-bind:key="align.id"
                    v-on:click="output.alignmentLawChaos = align.text"
                    :className="['button', { 'is-link is-selected': output.alignmentLawChaos === align.text }]"
                    >{{ align.text }}</button>
                </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Good/Evil:</label>
                <div id="character-alignment2">
                <div className="buttons are-small has-addons">
                    <button
                    type="button"
                    v-for="align in alignmentGoodEvil"
                    v-bind:key="align.id"
                    v-on:click="output.alignmentGoodEvil = align.text"
                    :className="['button', { 'is-link is-selected': output.alignmentGoodEvil === align.text }]"
                    >{{ align.text }}</button>
                </div>
                </div>
            </div>
            <div className='field'>
                <label className='label'>Background:</label>
                <div id="character-background">
                <div className="buttons are-small has-addons">
                    <button
                    type="button"
                    v-for="bg in backgrounds"
                    v-bind:key="bg.id"
                    v-on:click="setBackground(bg)"
                    :className="['button', { 'is-link is-selected': output.background === bg.text }]"
                    >{{ bg.text }}</button>
                </div>
                </div>
            </div>
            <div className='columns field' v-if="toolProficienciesText !== ''">
                <label className='column is-2 label'>Tool Proficiencies:</label>
                <div className='column' id="toolProfs">
                <span className='tag is-dark'>{{ toolProficienciesText }}</span>
                </div>
            </div>
            <div className='columns field'>
                <label className='column is-2 label'>Currency:</label>
                <div className='column' id="currency">{{ currencyText }}</div>
            </div>
            <div className='columns'>
                <label className='column is-2 label'>Stats:</label>
                <div className='column is-1'>Assigned</div>
                <div className='column is-1'>Racial</div>
                <div className='column is-1'>Total</div>
                <div className='column is-1'>Modifier</div>
            </div>
            <div className='columns' id="stat-block" v-for="block in statBlocks" v-bind:key="block.id">
                <div className='column is-2'>{{ block.text }}</div>
                <div className='column is-1'>{{ output.statArray[block.id] }}</div>
                <div className='column is-1'>{{ output.raceStatBonuses[block.id] }}</div>
                <div className='column is-1'>{{ output.finalStats[block.id] }}</div>
                <div className='column is-1'>{{ formatModifier(output.statModifiers[block.id]) }}</div>
            </div>
            <div className='columns field' v-if='statRolls.length > 0'>
                <div className='column is-2'>Assign <b>{{ currentStatAssignmentText }}</b>:</div>
                <div className='column buttons has-addons'>
                <button
                    type="button"
                    className="button is-link"
                    v-for="(r, i) in statRolls"
                    v-bind:key="i"
                    v-on:click="allocateStat(r)"
                >{{ r }}</button>
                </div>
            </div>
            <div className='columns field'>
                <label className='column is-2 label'>Reset Stats:</label>
                <div className='column'>
                <button type="button" className='button is-danger' v-on:click="standardStats">Standard Array</button>&nbsp;
                <button type="button" className='button is-danger' v-on:click="rollStats">Reroll</button>
                </div>
            </div>
            <div className='columns field'>
                <label className='column is-2 label'>Proficiencies:</label>
                <div className='column' id="proficiencies">
                <div className='tags are-small'>
                    <span
                    v-for="prof in output.proficiencies"
                    v-bind:key="prof"
                    className='tag is-dark'
                    role="alert"
                    >{{ skills[prof].text }}</span>
                </div>
                <div v-if="allProficienciesChosen">
                    <button type="button" className='button is-danger' v-on:click="resetProficiencies">Reset Proficiencies</button>
                </div>
                <div v-if="!allProficienciesChosen">
                    <label className='label'>{{ proficiencesLeftText }}</label>
                    <div className='buttons are-small'>
                    <button
                        type="button"
                        className='button is-link'
                        v-for="prof in availableProficiencies"
                        v-bind:key="prof.id"
                        v-on:click="addProficiency(prof.id)"
                    >{{ prof.text }}</button>
                    </div>
                </div>
                </div>
            </div>

            <div className='columns field'>
                <label className='column is-2 label'>Equipment:</label>
                <div className='column tags are-small'>
                <div className='tags are-small'>
                    <span v-for="(eq, i) in equipmentTextList" v-bind:key="i" className='tag is-dark'>{{ eq }}</span>
                </div>
                <label className='label' v-if='!allEquipmentChosen'>Select Extra Equipment:</label>
                <div v-for="choices in equipmentChoiceModel" v-bind:key="choices.id">
                    <span v-for="choice in choices.choices" v-bind:key="choice.id" className='buttons are-small'>
                        <span className='tag'>{{ choice.num }}x</span>
                        <button type="button" v-for="item in choice.items" v-bind:key="item.id" className='button is-link' v-on:click="selectEquipment(choices.id, choice.id, item)">{{ getEquipmentName(item) }}</button>
                        <span className='tag' v-if="choice.id < choices.choices.length - 1">OR</span>
                    </span>
                    <hr />
                </div>
                <div v-if="hasChosenAnyEquipment">
                    <button type="button" className='button is-danger' v-on:click="resetEquipment">Reset Equipment</button>
                </div>
                </div>
            </div>

            <div className='columns field'>
                <label className='column is-2 label'>Languages:</label>
                <div className='column tags are-small'>
                <div className='tags are-small'>
                    <span
                    v-for="lang in output.languageids"
                    v-bind:key="lang"
                    className='tag is-dark'
                    >{{ languages[lang].text }}</span>
                </div>
                <div v-if="hasBonusLanguages && allLanguagesChosen">
                    <button type="button" className='button is-danger' v-on:click="resetLanguages">Reset Languages</button>
                </div>
                <div v-if="!allLanguagesChosen">
                    <label className='label'>{{ languagesLeftText }}</label>
                    <div className='buttons are-small'>
                    <button
                        type="button"
                        className='button is-link'
                        v-for="lang in availableLanguages"
                        v-bind:key="lang.id"
                        v-on:click="addLanguage(lang.id)"
                    >{{ lang.text }}</button>
                    </div>
                </div>
                </div>
            </div>
            
            <div className='field'>
                <label className='label'>Personality Traits:</label>
                <input className='input' id="personalityTraits" type="text" v-model="output.personalityTraitsText">
            </div>
            <div className='field'>
                <label className='label'>Ideals:</label>
                <input className='input' id="ideals" type="text" v-model="output.idealsText">
            </div>
            <div className='field'>
                <label className='label'>Bonds:</label>
                <input className='input' id="bonds" type="text" v-model="output.bondsText">
            </div>
            <div className='field'>
                <label className='label'>Flaws:</label>
                <input className='input' id="flaws" type="text" v-model="output.flawsText">
            </div>
            <div className='field'>
                <label className='label'>Age:</label>
                <input className='input' id="age" type="text" v-model="output.age">
            </div>
            <div className='field'>
                <label className='label'>Height:</label>
                <input className='input' id="height" type="text" v-model="output.height">
            </div>
            <div className='field'>
                <label className='label'>Weight:</label>
                <input className='input' id="weight" type="text" v-model="output.weight">
            </div>
            <div className='field'>
                <label className='label'>Eyes:</label>
                <input className='input' id="eyes" type="text" v-model="output.eyes">
            </div>
            <div className='field'>
                <label className='label'>Skin:</label>
                <input className='input' id="skin" type="text" v-model="output.skin">
            </div>
            <div className='field'>
                <label className='label'>Hair:</label>
                <input className='input' id="hair" type="text" v-model="output.hair">
            </div>
            <div className='field'>
                <label className='label'>Appearance (not implemented yet):</label>
                <input className='input' id="appearance" type="file" accept="image/*" disabled='disabled' v-on:change="setAppearance">
            </div>
            <div className='field'>
                <label className='label'>Organization/Faction:</label>
                <input className='input' id="organizations" type="text" v-model="output.organizations">
            </div>
            <div className='field'>
                <label className='label'>Faction Logo (not implemented yet):</label>
                <input className='input' id="factionLogo" type="file" accept="image/*" disabled='disabled' v-on:change="setFactionLogo">
            </div>
            <div className='field'>
                <label className='label'>Allies:</label>
                <input className='input' id="allies" type="text" v-model="output.allies">
            </div>
            <div className='field'>
                <label className='label'>Backstory:</label>
                <textarea className="textarea" rows='5' id="backstory" v-model="output.backstory" placeholder="Enter your character's backstory"></textArea>
            </div>
            <div className='field'>
                <label className='label'>Additional Features &amp; Traits:</label>
                <input className='input' id="additionalFeaturesAndTraits" type="text" v-model="output.additionalFeaturesAndTraits">
            </div>
            <div className='field'>
                <label className='label'>Treasure:</label>
                <input className='input' id="treasure" type="text" v-model="output.treasure">
            </div>

            <div id="finish">
                <button
                type="button"
                id="generate"
                v-on:click="generate"
                v-bind="generateButtonBindings"
                :className="['button is-large', { 'is-outlined': !allChoicesFulfilled, 'is-success': allChoicesFulfilled }]"
                >Generate PDF</button>
            </div>

            <div>&nbsp;</div>
            </div>
            */}
        </div>
        );
    }
}
