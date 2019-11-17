import React from "react";
import {Badge, List} from "antd";
import constants from "../../constants";
import BadgeCardType from "../badge/badgeCardType";
import CardPopover from "../card/cardPopover";
import {isWebpSupported} from "react-image-webp/dist/utils";
import Gem from "../gem/gem";

export default class DeckLine extends React.Component {

    render(){
        const {item} = this.props;
        const {id, count, card} = item;
        const color = constants.gems[card.gems[0]];

        const background = "linear-gradient(90deg, "+color+" 42%, rgba(0,255,255,0) 80%)";
        const image = isWebpSupported() ? '/images/cards/webp/'+card.image.replace('.png','.webp') : '/images/cards/m/'+card.image;

        return (
            <CardPopover card={card} popoverProps={{placement: 'left'}}>
                <div className="deck-line" style={{backgroundImage: 'url('+image+')'}}>
                    <div className="gradient" style={{background}}>
                        <span className="cost">
                            <Badge count={card.cost === null ? 'X':card.cost} />
                        </span>&nbsp;
                        <span className="name">
                            <BadgeCardType type={card.type}/>&nbsp;&nbsp;{card.name}
                        </span>
                        <span className="deck-line-gems">
                            <Gem string={card.gems} inline size={10}/>
                        </span>
                        <span className="occurences">
                            <Badge count={"x " + count} />
                        </span>&nbsp;
                        <div className="rarity" style={{backgroundColor: constants.rarities[card.rarity]}}>
                        </div>
                    </div>
                </div>
            </CardPopover>
        )

    }

}