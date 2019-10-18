import React from "react";
import {inject, observer} from "mobx-react";
import {Button, List, Statistic} from "antd";
import DeckLine from "./deckLine";
import Gem from "../gem/gem";
import PerfectScrollbar from 'react-perfect-scrollbar';

@inject('deckStore')
@observer
export default class Deck extends React.Component {

    render(){
        const {deckStore} = this.props;
        const {selectedDeck} = deckStore;
        return (
            <div>
                <div style={{padding: 20, textAlign: 'right'}}>
                    <Button type="primary" icon="save" size="large" disabled={selectedDeck.saved} onClick={deckStore.saveSelectedDeck}>Save</Button>
                </div>

                <Statistic value={selectedDeck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={selectedDeck.colors} size="2x" style={{marginTop: 4, marginLeft: 8}}/>

                <div className="clearfix"/>

                <PerfectScrollbar style={{maxHeight: 400}}>
                    <List
                        bordered
                        rowKey={'id'}
                        dataSource={selectedDeck.cards}
                        renderItem={item => (
                            <List.Item><DeckLine item={item}/></List.Item>
                        )}
                    />
                </PerfectScrollbar>
            </div>
        )

    }

}