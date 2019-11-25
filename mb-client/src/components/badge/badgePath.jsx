import React from "react";
import {inject} from "mobx-react";
import {Tooltip} from "antd";

const BadgePath = (props) => {

    const {id, withName, width=32, style={}} = props;
    const path = props.dictionary.pathById(id);

    return (
        path?
            <Tooltip title={path.name}><img src={'/images/' + path.icon} style={{...style, width}} />
                {withName ? <div style={{display: 'inline-block', marginLeft: 8}}>{path.name}</div>:null}
            </Tooltip>
        :null
    )
}

export default inject('dictionary')(BadgePath);
