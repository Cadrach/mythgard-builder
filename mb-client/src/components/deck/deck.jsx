import React from "react";
import {inject, observer} from "mobx-react";
import {Badge, List} from "antd";

@inject('deckStore', 'cardStore')
@observer
export default class Deck extends React.Component {

    render(){
        const {deckStore, cardStore} = this.props;
        return (
            <div>
                <div>{deckStore.sum}/40</div>
                <List
                    bordered
                    rowKey={'id_card'}
                    dataSource={deckStore.cards}
                    renderItem={item => (
                        <List.Item>{cardStore.cardById(item.id_card).card_name} <Badge count={item.count} /></List.Item>
                    )}
                />
            </div>
        )

    }

}