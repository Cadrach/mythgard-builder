import React from "react";
import { observer, inject } from "mobx-react";
import {Row, Col, Affix, Layout, Rate} from "antd";
import Deck from "../components/deck/deck";
import CardsList from "../components/cardsList/cardsList"
import constants from "../constants";
import FilterColor from "../components/filters/filterColor";

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore', 'deckStore')
@observer
export default class DeckBuilder extends React.Component {

    constructor(props){
        super(props);

        this.filters = {
            colors: Object.keys(constants.colors).map(c => c[0]),
        }
    }

    onChangeFilter(type, key, value){
        value ? this.filters[type].push(key) : this.filters[type].splice(this.filters[type].indexOf(key), 1)
        this.props.cardStore.applyFilters(this.filters);
    }

    render() {
        const {filteredCards} = this.props.cardStore;
        const sizeDeck = {xs: 8, md: 6, xxl: 4};
        const sizeCards  = {xs: 16, md: 18, xxl: 20};
        return (
            <Layout>
                <Row>
                    <Col {...sizeCards}>
                        {this.props.deckStore.count}
                        <CardsList cards={filteredCards} deckStore={this.props.deckStore}/>
                    </Col>
                    <Col {...sizeDeck}>
                        <Affix offsetTop={64}>
                            <Deck/>
                        </Affix>
                    </Col>
                </Row>

                <Affix offsetBottom={0}>
                    <Layout.Footer>
                        {Object.keys(constants.colors).map(key => (
                            <FilterColor key={key} color={key} onChange={(number) => this.onChangeFilter('colors', key[0], !!number)}/>
                        ))}
                    </Layout.Footer>
                </Affix>
            </Layout>
        );
    }
}
