import React from "react";
import { List} from "antd";
import DeckLine from "./deckLine";
import PerfectScrollbar from 'react-perfect-scrollbar';

export default class DeckContent extends React.Component {

    render(){
        const {deck} = this.props;
        return (
            <div>
                <PerfectScrollbar style={{maxHeight: 400}}>
                    <List
                        bordered
                        rowKey={'id'}
                        dataSource={deck.cards}
                        renderItem={item => (
                            <List.Item><DeckLine item={item}/></List.Item>
                        )}
                    />
                </PerfectScrollbar>
            </div>
        )

    }

}