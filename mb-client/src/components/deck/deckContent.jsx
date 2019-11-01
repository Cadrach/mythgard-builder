import React from "react";
import { List} from "antd";
import DeckLine from "./deckLine";
import PerfectScrollbar from 'react-perfect-scrollbar';

import './stylesheets/deckContent.scss';

export default class DeckContent extends React.Component {

    render(){
        const {cards} = this.props;
        return (<div className="deck-content">
                {cards.map(card => <DeckLine key={card.id} item={card}/>)}
            </div>
        )

    }

}