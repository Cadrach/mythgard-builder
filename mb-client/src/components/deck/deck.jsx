import React from "react";
import {inject, observer} from "mobx-react";
import {Badge, List} from "antd";
import DeckLine from "./deckLine";
import Gem from "../gem/gem";

@inject('deckStore', 'cardStore')
@observer
export default class Deck extends React.Component {

    render(){
        const {deckStore, cardStore} = this.props;
        const {selectedDeck} = deckStore;
        return (
            <div>
                <div>
                    {selectedDeck.sum}/40
                    <Gem string={selectedDeck.colors}/>
                </div>
                <List
                    bordered
                    rowKey={'id'}
                    dataSource={selectedDeck.cards}
                    renderItem={item => (
                        <List.Item><DeckLine item={item}/></List.Item>
                    )}
                />
            </div>
        )

    }

}