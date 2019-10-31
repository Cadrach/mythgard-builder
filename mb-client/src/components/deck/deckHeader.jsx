import React from "react";
import {Button, List, Statistic} from "antd";
import Gem from "../gem/gem";

export default class DeckHeader extends React.Component {

    render(){
        const {deck} = this.props;
        return (
            <div>
                <Statistic value={deck.sum} suffix="/ 40" style={{float: 'left'}}/>
                <Gem string={deck.colors} size="2x" style={{marginTop: 4, marginLeft: 8}}/>
            </div>
        )

    }

}