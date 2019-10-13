import React from "react";

// Stylesheet Imports
import "./gem.scss";
import constants from "../../constants";
import {Icon} from "react-fa/lib";


const Gem = (props) => {

    const {string} = props;

    return (

        <span className="gem">
            {[...string].map((g, k) => (
                <Icon key={k} name="circle" style={{color: constants.gems[g]}}/>
            ))}
        </span>
    )
}

export default Gem;
