import React from "react";
import {inject, observer} from "mobx-react";
import {Badge, List} from "antd";
import DeckLine from "./deckLine";

@inject('deckStore', 'cardStore')
@observer
export default class Deck extends React.Component {

    render(){
        const {deckStore, cardStore} = this.props;
        const {selectedDeck} = deckStore;
        return (
            <div>
                <div>{deckStore.selectedDeck.sum}/40</div>
                <List
                    bordered
                    rowKey={'id'}
                    dataSource={deckStore.selectedDeck.cards}
                    renderItem={item => (
                        <List.Item><DeckLine item={item}/></List.Item>
                    )}
                />
            </div>
        )

    }

}