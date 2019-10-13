import React from "react";
import {inject, observer} from "mobx-react";
import {Badge, List} from "antd";
import constants from "../../constants";
import Gem from "../gem/gem";
import './deckLine.scss';

@inject('cardStore')
export default class DeckLine extends React.Component {

    render(){
        const {cardStore, item} = this.props;
        const {id, count} = item;
        const card = cardStore.cardById(id);
        const {gems, colors} = constants;
        console.log(card)
        return (
            <span className="deckLine">
                <div className="cost">
                    <Badge count={count} />
                </div>
                <div className="gems">
                  <Gem string={card.card_gems}/>
                </div>
                <div className="name">
                    {card.card_name}
                </div>
                <div className="rarity">
                </div>
            </span>
        )

    }

}