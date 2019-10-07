import React from "react";
import { observer, inject } from "mobx-react";
import { withRouter, NavLink } from 'react-router-dom'
import Card from "../components/card/card";
import {Row, Col, Affix} from "antd";
import Deck from "../components/deck/deck";

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore', 'deckStore')
@withRouter
@observer
export default class Cards extends React.Component {

    render() {
        const {cards} = this.props.cardStore;
        return (
            <Row>
                <Col span={20}>
                    {this.props.deckStore.count}
                    {cards.map(card => <Card key={card.id_card} data={card}/>)}
                </Col>
                <Col span={4}>
                    <Affix>
                        <Deck/>
                    </Affix>
                </Col>
            </Row>
        );
    }
}
