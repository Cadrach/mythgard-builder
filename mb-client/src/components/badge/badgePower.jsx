import React from "react";
import {inject} from "mobx-react";
import {Tooltip} from "antd";

const BadgePower = (props) => {

    const {id, withName, width=32, style={}} = props;
    const power = props.dictionary.powerById(id);

    return (
        power?
            <Tooltip title={power.name}><img src={'/images/' + power.icon} style={{...style, width}} />
                {withName ? <div style={{display: 'inline-block', marginLeft: 8}}>{power.name}</div>:null}
            </Tooltip>
        :null
    )
}

export default inject('dictionary')(BadgePower);
