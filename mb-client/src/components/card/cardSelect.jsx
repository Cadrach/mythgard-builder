import React from "react";
import Select from 'react-select';
import {inject, observer} from "mobx-react";

import Gem from "../gem/gem";
import constants from "../../constants";

/**
 * Option line for card
 * @param props
 * @returns {*}
 * @constructor
 */
const OptionCard = (props) => {
    const style = props.getStyles('option', props);
    return <div {...props.innerProps} style={{...style, fontSize: 18, lineHeight: '24px'}}>
        <div style={{width: 25, height: 18, display: 'inline-block', position: 'relative', top: -5}}>
            <Gem string={props.data.gems} size={5}/>
        </div>
        {props.data.name}
    </div>
}
export {OptionCard};

@inject('dictionary')
@observer
class CardSelect extends React.Component {

    render(){
        const cards = this.props.dictionary.cards.all;

        return (
            <Select
                placeholder="Select some Cards..."
                options={cards}
                isMulti={true}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                styles={constants.styleSelect}
                components={{
                    Option: OptionCard
                }}
                {...this.props}
            />
        )
    }
}

export default CardSelect;
