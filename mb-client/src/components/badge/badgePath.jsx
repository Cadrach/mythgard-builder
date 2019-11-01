import React from "react";
import {inject} from "mobx-react";

const BadgePath = (props) => {

    const {id} = props;
    const path = props.dictionary.pathById(id);

    return (
        <div>{path?path.name:null}</div>
    )
}

export default inject('dictionary')(BadgePath);
