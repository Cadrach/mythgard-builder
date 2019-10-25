import {Rate} from "antd";
import {Icon} from "react-fa/lib";
import React from "react";

import constants from "../../constants";

const FilterIcon = (props) => (
    <Rate
        style={{color: props.color, margin: '0 8px'}}
        value={props.value}
        count={1}
        defaultValue={1}
        character={props.icon}
        onChange={props.onChange}
    />
)

export default FilterIcon;