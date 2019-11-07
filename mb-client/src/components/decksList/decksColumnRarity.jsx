import React from "react";
import {Typography, Tooltip} from "antd";
const {Text} = Typography;

const DecksColumnRarity = (props) => {
    const valueDck = props.row["dck_nb_" + props.rarity + "s"];
    const valueUsr = props.row["user_cards_" + props.rarity + "s"];


    if(valueDck === 0){
        //No value, show nothing
        return "";
    }
    else if(valueUsr !== undefined){
        if(valueUsr<valueDck){
            //We are missing some cards, show tooltip
            return <Tooltip title={<span>You are missing {valueDck-valueUsr} {props.rarity}(s)</span>}>{valueUsr}/{valueDck}</Tooltip>
        }
        else{
            //We have everything
            return <Tooltip title={<span>You have all requested {props.rarity}(s)</span>}>{valueUsr}/{valueDck}</Tooltip>
        }
    }
    else{
        return valueDck;
    }
}

export default DecksColumnRarity;