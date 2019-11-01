import React from "react";
import {inject} from "mobx-react";

const BadgePower = (props) => {

    const {id} = props;
    const power = props.dictionary.powerById(id);

    return (
        <div>{power?power.name:null}</div>
    )
}

export default inject('dictionary')(BadgePower);
