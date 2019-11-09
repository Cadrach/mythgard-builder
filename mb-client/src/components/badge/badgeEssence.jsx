import React from "react";
import {inject} from "mobx-react";
import {Tooltip} from "antd";

const styles = {
    div:{
        display: "inline-block",
        background: '#222',
        padding: '0px 5px',
        border: '2px solid #666',
        borderRadius: 50,
        width: 80,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgb(180, 225, 133)',
    },
    img:{
        width: 18,
        marginRight: 3,
        position: 'relative',
        top: -2
    }
}

const BadgeEssence = (props) => {

    const {value} = props;

    return (
        <div style={styles.div}><img src="/images/essence.png" style={styles.img}/>{value}</div>
    )
}

export default BadgeEssence;
