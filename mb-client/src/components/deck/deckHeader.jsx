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
        const {editable} = this.props;
        return (
            <div className="deck-header" style={{height: 128}}>
                <img src="/images/icons/cards.png" width="32" style={{float: 'left', marginRight: 8}}/>
                <Statistic value={deck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={deck.colors} size="2x" style={{marginTop: 4, marginLeft: 8}}/>
                <div className="clearfix"/>
                <div className="deck-header-badge">
                    {editable ?
                        null
                        :
                        <BadgePath id={deck.ide_path} withName/>
                    }
                </div>
                <div className="deck-header-badge">
                    {editable ?
                        null
                        :
                        <BadgePower id={deck.ide_power} withName/>
                    }
                </div>
                <div className="clearfix"/>
            </div>
        )

    }

}