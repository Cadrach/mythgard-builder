import React from "react";
import {Icon} from "react-fa/lib";

const BadgeCardType = (props) => {

    const {type} = props;

    const types = {
        "Creature": "male",
        "Spell": "magic",
        "LaneEnchantment": "bookmark",
        "Artifact": "trophy",
    }

    return (
        <Icon name={types[type]} fixedWidth={true}/>
    )
}

export default BadgeCardType;
