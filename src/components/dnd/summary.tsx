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
                            <li>Armor class does not include equipped armor or shield</li>
                            <li>Cantrips and spells</li>
                            <li>Race features such as Darkvision, Luck, etc.</li>
                            <li>Feats and stat improvement</li>
                            <li>Character appearance &amp; faction logo</li>
                        </ul>
                        <p>
                            Known bugs and limitations:
                        </p>
                        <ul>
                            <li>The same item can be listed twice e.g. a Criminal Rogue with a Burglar's pack will have Crowbar listed twice instead of "Crowbar (2)"</li>
                        </ul>
                    </div>
                </article>
            </div>
        )
    }
}
