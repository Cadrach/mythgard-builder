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
        <img src={"/images/cards/m/" + card.image} style={{maxHeight: 466, height: '40vh', minHeight: 200}}/>
    </div>

    return <Popover content={content} title={card.name} placement="bottom">
        {props.children}
    </Popover>
}

export default CardPopover;
