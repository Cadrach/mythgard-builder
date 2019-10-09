import React from "react";
import { observer, inject } from "mobx-react";
import {Row, Col, Affix, Layout, Rate} from "antd";
import Deck from "../components/deck/deck";
import CardsList from "../components/cardsList/cardsList"
import constants from "../constants";
import FilterColor from "../components/filters/filterColor";
import FilterIcon from "../components/filters/filterIcon";
import Icon from 'react-fa';

// const cards = [{id_card: 1, card_name: '1'},{id_card: 2, card_name: '2'},{id_card: 3, card_name: '3'}];

@inject('cardStore', 'deckStore')
@observer
export default class DeckBuilder extends React.Component {

    constructor(props){
        super(props);

        this.filters = {
            colors: Object.keys(constants.colors).map(c => c[0]),
            types: ['Creature', 'Spell', 'LaneEnchantment', 'Artifact']
        }
    }

    onChangeFilter(type, key, value){
        value ? this.filters[type].push(key) : this.filters[type].splice(this.filters[type].indexOf(key), 1)
        this.props.cardStore.applyFilters(this.filters);
    }

    render() {
        const {filteredCards} = this.props.cardStore;

        return (
            <Layout>

                <Layout>
                    <Layout.Content>
                        <CardsList cards={filteredCards} deckStore={this.props.deckStore} shavedWidth={300} shavedHeight={64+89}/>
                    </Layout.Content>

                    <Layout.Sider width={300} style={{background: 'transparent', padding: 8}}>
                        <Deck/>
                    </Layout.Sider>
                </Layout>

                <Layout.Footer>
                    {Object.keys(constants.colors).map(key => (
                        <FilterColor key={key} color={key} onChange={(number) => this.onChangeFilter('colors', key[0], !!number)}/>
                    ))}
                    <FilterIcon icon={<Icon name="male" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Creature', !!number)}/>
                    <FilterIcon icon={<Icon name="magic" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Spell', !!number)}/>
                    <FilterIcon icon={<Icon name="bookmark" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'LaneEnchantment', !!number)}/>
                    <FilterIcon icon={<Icon name="trophy" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Artifact', !!number)}/>
                </Layout.Footer>

            </Layout>
        );
    }
}
