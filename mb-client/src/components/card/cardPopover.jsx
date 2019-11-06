import React from "react";

// Stylesheet Imports
import "./card.scss";
import {inject} from "mobx-react";
import {Popover, Rate} from "antd";
import {Icon} from "react-fa/lib";


const CardPopover = (props) => {
    const card = props.card;
    console.log(card);
    const content = <div>
        <img src={"/images/cards/m/" + card.image}/>
    </div>

    return <Popover content={content} title={card.name}>
        {props.children}
    </Popover>
}

export default CardPopover;
