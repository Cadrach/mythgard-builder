import React from "react";
import {Typography, Tooltip, Badge} from "antd";
import constants from "../../constants";
const {Text} = Typography;

const badgeStyle = {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textShadow: '0px 0px 3px #000,  0px 0px 3px #000,  0px 0px 3px #000',
}

const DecksColumnRarity = (props) => {
    const valueDck = props.row["dck_nb_" + props.rarity + "s"];
    const valueUsr = props.row["user_cards_" + props.rarity + "s"];


    if(valueDck === 0){
        //No value, show nothing
        return "";
    }
    else if(valueUsr !== undefined){
        const percent = Math.round(valueUsr/valueDck*100);
        if(valueUsr<valueDck){
            //We are missing some cards, show tooltip
            return <Tooltip title={<span>You are missing {valueDck-valueUsr} {props.rarity}(s)</span>}>
                <Badge count={valueUsr +'/'+ valueDck} style={{backgroundColor: percent<50 ? constants.colors.red:constants.colors.orange, ...badgeStyle}}></Badge>
            </Tooltip>
        }
        else{
            //We have everything
            return <Tooltip title={<span>You have all requested {props.rarity}(s)</span>}>
                <Badge count={valueUsr +'/'+ valueDck} style={{backgroundColor: constants.colors.green,  ...badgeStyle}}></Badge>
            </Tooltip>
        }
    }
    else{
        return <Badge count={valueDck} style={{backgroundColor: constants.raritiesBackground[props.rarity],  ...badgeStyle}}/>;
    }
}

export default DecksColumnRarity;