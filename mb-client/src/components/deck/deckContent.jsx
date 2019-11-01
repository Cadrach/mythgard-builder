import React from "react";
import { List} from "antd";
import DeckLine from "./deckLine";
import PerfectScrollbar from 'react-perfect-scrollbar';

import './stylesheets/deckContent.scss';
import {inject, observer} from "mobx-react";

@inject('deckStore')
@observer
export default class DeckContent extends React.Component {

    render(){
        const deck = this.props.deckStore.selectedDeck;
        return (<div className="deck-content">
                {deck.cards.map(card => <DeckLine key={card.id} item={card} count={card.count}/>)}
            </div>
        )

    }

}