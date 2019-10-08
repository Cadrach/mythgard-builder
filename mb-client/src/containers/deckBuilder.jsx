import React from "react";
import { observer, inject } from "mobx-react";
import Card from "../components/card/card";
import {Row, Col, Affix, Layout} from "antd";
import Deck from "../components/deck/deck";
import CardsList from "../components/cardsList/cardsList"

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore', 'deckStore')
@observer
export default class DeckBuilder extends React.Component {

    render() {
        const {cards} = this.props.cardStore;
        const sizeDeck = {xs: 8, md: 6, xxl: 4};
        const sizeCards  = {xs: 16, md: 18, xxl: 20};
        return (
            <Layout>
                <Row>
                    <Col {...sizeCards}>
                        {this.props.deckStore.count}
                        <CardsList cards={cards} deckStore={this.props.deckStore}/>
                    </Col>
                    <Col {...sizeDeck}>
                        <Affix offsetTop={64}>
                            <Deck/>
                        </Affix>
                    </Col>
                </Row>

                {/*<Affix offsetBottom={0}>*/}
                {/*    <Layout style={{padding: 16}}>*/}
                {/*        <div>Hellow world</div>*/}
                {/*    </Layout>*/}
                {/*</Affix>*/}
                <Affix offsetBottom={0}>
                    <Layout.Footer>footer</Layout.Footer>
                </Affix>
            </Layout>
        );
    }
}
