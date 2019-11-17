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
        const {withoutPowerAndPath} = this.props;
        const height = withoutPowerAndPath ? 48 : 128;
        return (
            <div className="deck-header" style={{height}}>
                <img src="/images/icons/cards.png" width="32" style={{float: 'left', marginRight: 8}}/>
                <Statistic value={deck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={deck.colors} size={24} style={{justifyContent: 'start', paddingLeft: 8, paddingTop: 4}}/>
                <div className="clearfix"/>
                {withoutPowerAndPath ? null :
                    <div className="deck-header-badge"><BadgePath id={deck.ide_path} withName/></div>
                }
                {withoutPowerAndPath ? null :
                    <div className="deck-header-badge"><BadgePower id={deck.ide_power} withName/></div>
                }
                <div className="clearfix"/>
            </div>
        )

    }

}