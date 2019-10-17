import React from "react";
import {inject, observer} from "mobx-react";
import {Badge, List} from "antd";
import constants from "../../constants";
import Gem from "../gem/gem";
import './deckLine.scss';

export default class DeckLine extends React.Component {

    render(){
        const {item} = this.props;
        const {id, count, card} = item;
        // console.log(card)
        return (
            <span className="deckLine">
                <div className="cost">
                    <Badge count={count} />
                </div>
                <div className="gems">
                  <Gem string={card.gems}/>
                </div>
                <div className="name">
                    {card.name}
                </div>
                <div className="rarity">
                </div>
            </span>
        )

    }

}