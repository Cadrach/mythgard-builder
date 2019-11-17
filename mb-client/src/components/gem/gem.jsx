import React from "react";

// Stylesheet Imports
import "./gem.scss";
import constants from "../../constants";
import {Icon} from "react-fa/lib";

const Gem = (props) => {

    const {string, size=10, inline=false} = props;
    const fontSize = size + 3;
    const height = size;
    const style = {
        height,
        fontSize,
        ...props.styleGem
    }
    return (

        <span className="gem" style={{display: inline ? 'inline-block':'flex', ...props.style}}>
            {[...string].map((g, k) => (
                <Icon key={k} name="circle" style={{color: constants.gems[g], ...style}}/>
            ))}
        </span>
    )
}

export default Gem;
