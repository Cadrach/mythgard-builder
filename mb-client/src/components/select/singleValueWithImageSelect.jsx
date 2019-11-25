import React from "react";
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import constants from "../../constants";
import Select, {components} from 'react-select';

const SingleValueWithImage = ({ children, ...props }) => (
    <components.SingleValue {...props}>
        {props.data.icon ? <img src={'/images/' + props.data.icon} style={{width: 32, marginRight: 6}}/>:null} {children}
    </components.SingleValue>
);

@inject('dictionary', 'deckStore')
@observer
class SingleValueWithImageSelect extends React.Component {
    render() {
        const styleSelect = {...constants.styleSelect};
        return (
            <Select
                // placeholder="Select Power..."
                // options={powers}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                styles={styleSelect}
                // value={selectedDeck.ide_power ? selectedDeck.power:null}
                // onChange={({id}) => selectedDeck.setFormValues({ide_power: id})}
                components={{
                    SingleValue: SingleValueWithImage
                }}
                {...this.props}
            />
        );
    }
}

export default SingleValueWithImageSelect;