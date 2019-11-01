import React from "react";
import {Button, List, Statistic} from "antd";
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import BadgePath from "../badge/badgePath";
import {inject, observer} from "mobx-react";

@inject('deckStore')
@observer
export default class DeckHeader extends React.Component {

    render(){
        const deck = this.props.deckStore.selectedDeck;
        return (
            <div>
                <BadgePath id={deck.ide_path}/>
                <BadgePower id={deck.ide_power}/>
                <Statistic value={deck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={deck.colors} size="2x" style={{marginTop: 4, marginLeft: 8}}/>
                <div className="clearfix"/>
            </div>
        )

    }

}