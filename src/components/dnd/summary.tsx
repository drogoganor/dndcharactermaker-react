import React from 'react';

export default class Summary extends React.Component {
    public render(): JSX.Element {
        return (
            <div className='content'>
                <div className='title'>D&amp;D 5e Character Sheet Maker</div>
                <article className='message'>
                    <div className='message-header'>
                        This is a work-in-progress. Many features are missing.
                    </div>
                    <div className="message-body media-content content">
                        <p>
                            This tool will generate a pre-filled <a href="https://dnd.wizards.com/articles/features/character_sheets">D&amp;D 5e character sheet</a> in PDF format. You'll need a <a href="https://dnd.wizards.com/products/tabletop-games/rpg-products/rpg_playershandbook">Player's Handbook</a> to fill out some details from page number references. Please see the <a href="https://github.com/drogoganor/dndcharactermaker-react">GitHub page</a> for more details or to report issues.
                        </p>
                        <p>
                            Missing features list:
                        </p>
                        <ul>
                            <li>Everything from books other than the Player's Handbook</li>
                            <li>Cantrips and spells</li>
                            <li>Background variant selection</li>
                            <li>Feats and ability score improvements</li>
                            <li>Class tool proficiency selection</li>
                            <li>Character appearance &amp; faction logo</li>
                            <li>Race:</li>
                            <ul>
                                <li>Dwarf: Cannot select Tool Proficiency (p. 20)</li>
                                <li>Dragonborn: No Draconic Ancestry selection (p. 34)</li>
                                <li>Half-Elf: Skill Versatility: Proficiency in two skills of your choice. (p. 39)</li>
                            </ul>
                            <li>Class:</li>
                            <ul>
                                <li>Barbarian: No Rage table. (p. 47)</li>
                                <li>Fighter: No fighting style selection. (p. 72)</li>
                                <li>Fighter-Battlemaster: No maneuvers selection. (p. 74)</li>
                                <li>Monk: No Ki table. (p. 77)</li>
                                <li>Paladin: No fighting style selection. (p. 84)</li>
                                <li>Ranger: No fighting style selection. (p. 91)</li>
                                <li>Rogue: No sneak attack table. (p. 95)</li>
                                <li>Sorcerer: No sorcery points table. (p. 100)</li>
                                <li>Sorcerer: No Draconic Ancestry selection (p. 102)</li>
                                <li>Warlock: No invocations table. (p. 100)</li>
                            </ul>
                            <li>Background:</li>
                            <ul>
                                <li>Entertainer: No choice of favor of admirer. (p. 130)</li>
                            </ul>
                        </ul>
                    </div>
                </article>
            </div>
        )
    }
}
