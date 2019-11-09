import React from "react";
import {inject} from "mobx-react";
import {Tooltip} from "antd";

const BadgePath = (props) => {

    const {id} = props;
    const path = props.dictionary.pathById(id);

    return (
        path?<Tooltip title={path.name}><img src={'/images/' + path.icon} style={{width: 32}} {...props}/></Tooltip>:null
    )
}

export default inject('dictionary')(BadgePath);
