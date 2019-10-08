import {Rate} from "antd";
import {Icon} from "react-fa/lib";
import React from "react";

import constants from "../../constants";

const FilterColor = (props) => (
    <Rate
        style={{color: constants.colors[props.color], margin: '0 8px'}}
        count={1}
        defaultValue={1}
        character={<Icon name="circle" size="2x"/>}
        onChange={props.onChange}
    />
)

export default FilterColor;