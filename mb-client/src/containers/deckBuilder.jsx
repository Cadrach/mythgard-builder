import React from "react";
import { observer, inject } from "mobx-react";
import Card from "../components/card/card";
import {Row, Col, Affix} from "antd";
import Deck from "../components/deck/deck";
import CardsList from "../components/cardsList/cardsList"

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore', 'deckStore')
@observer
export default class DeckBuilder extends React.Component {

    render() {
        const {cards} = this.props.cardStore;
        return (
            <Row>
                <Col span={20}>
                    {this.props.deckStore.count}
                    <CardsList cards={cards} deckStore={this.props.deckStore}/>
                </Col>
                <Col span={4}>
                    <Affix>
                        <Deck/>
                    </Affix>
                </Col>
                <Affix offsetBottom={0}>
                    <div>Hellow world</div>
                </Affix>
            </Row>
        );
    }
}
