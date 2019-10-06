import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter, NavLink } from 'react-router-dom'
import Card from "../components/card/card";

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore')
@withRouter
@observer
export default class Cards extends React.Component {

    render() {
        const {cards} = this.props.cardStore;
        return (

            <div>
                {cards.map(card => <Card key={card.id_card} data={card}/>)}
            </div>
        );
    }
}
