import React from "react";
import Image from "react-image-webp";

// Stylesheet Imports
import "./card.scss";
import {Popover, Rate} from "antd";
import _ from "lodash";


const CardPopover = (props) => {
    const card = props.card;

    const content = <div>
        <Image
            webp={"/images/cards/webp/" + card.image.replace('.png', '.webp')}
            src={"/images/cards/m/" + card.image}
            style={{maxHeight: 466, height: '40vh', minHeight: 200, minWidth: 143}}
        />
    </div>

    const popoverProps = _.extend({
        title: card.name,
        placement: 'bottom',
        onVisibleChange: function(){
            setTimeout(popoverRef.forceUpdate.bind(popoverRef), 50);
        }
    }, props.popoverProps)

    let popoverRef;

    return <Popover ref={ref=>popoverRef=ref} content={content} {...popoverProps}>
        {props.children}
    </Popover>
}

export default CardPopover;
