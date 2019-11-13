import React from "react";

// Stylesheet Imports
import "./card.scss";
import {Popover, Rate} from "antd";
import _ from "lodash";


const CardPopover = (props) => {
    const card = props.card;

    const content = <div>
        <img src={"/images/cards/m/" + card.image} style={{maxHeight: 466, height: '40vh', minHeight: 200}}/>
    </div>

    const popoverProps = _.extend({
        title: card.name,
        placement: 'bottom',
        onVisibleChange: function(){
            console.log(arguments);
            console.log(popoverRef);
            setTimeout(popoverRef.forceUpdate.bind(popoverRef), 50);
        }
    }, props.popoverProps)

    let popoverRef;

    return <Popover ref={ref=>popoverRef=ref} content={content} {...popoverProps}>
        {props.children}
    </Popover>
}

export default CardPopover;
