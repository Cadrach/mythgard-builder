import React from "react";
import {Button, Layout, Icon as AntIcon} from "antd";
import { observer, inject } from "mobx-react";
import CardsList from "../components/cardsList/cardsList"
import {Deck} from "../stores/deckStore";
import {toJS} from "mobx";
import DeckImportButton from "../components/deck/deckImportButton";

@inject('dictionary', 'deckStore')
@observer
export default class MyCards extends React.Component {

    constructor(props){
        super(props);

        //Initial state
        this.state = {deck: null}

        //Create a deck once we are connected
        const {dictionary} = this.props;
        dictionary.promise.then(() => {
            if(dictionary.isConnected){
                this.setState({deck: Deck.create({id: 1, dck_cards: toJS(dictionary.user.cards)})})
            }
        })
    }

    render() {
        const cards = this.props.dictionary.cards.all;
        return (
            <Layout className="ant-layout-transparent">
                <Layout.Header className="header" style={{height: 88}}>
                    <DeckImportButton deck={this.state.deck}/>
                </Layout.Header>
                <CardsList cards={cards} deck={this.state.deck} shavedHeight={64+88}/>
            </Layout>
        );
    }
}
