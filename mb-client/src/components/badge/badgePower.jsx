import React from "react";
import {inject} from "mobx-react";
import {Tooltip} from "antd";

const BadgePower = (props) => {

    const {id} = props;
    const power = props.dictionary.powerById(id);

    return (
        power?<Tooltip title={power.name}><img src={'/images/' + power.icon} style={{width: 32}} {...props}/></Tooltip>:null
    )
}

export default inject('dictionary')(BadgePower);
