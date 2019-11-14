import React from "react";
import {Button, List, Statistic} from "antd";
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import BadgePath from "../badge/badgePath";
import {inject, observer} from "mobx-react";

import './stylesheets/deckHeader.scss';

@inject('deckStore')
@observer
export default class DeckHeader extends React.Component {

    render(){
        const deck = this.props.deckStore.selectedDeck;
        return (
            <div className="deck-header" style={{height: 128}}>
                <Statistic value={deck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={deck.colors} size="2x" style={{marginTop: 4, marginLeft: 8}}/>
                <div className="clearfix"/>
                <div className="deck-header-badge">
                    <BadgePath id={deck.ide_path}/> {deck.path.name}
                </div>
                <div className="deck-header-badge">
                    <BadgePower id={deck.ide_power}/> {deck.power.name}
                </div>
                <div className="clearfix"/>
            </div>
        )

    }

}