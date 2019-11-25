import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Switch, InputNumber, Button, Col, Row, Badge} from "antd";
import SingleValueWithImageSelect from "../select/singleValueWithImageSelect";
import _ from 'lodash';

// import './stylesheets/decksListFilters.scss'
import constants from "../../constants";
import CardSelect from "../card/cardSelect";
import Card from "../card/card";

class PuzzlePlayedCards extends React.Component {

    render(){
        const {data} = this.props;

        return (
            <div className="puzzle-played-cards">
                {_.map([1,2,3,4,5,6,7], (n) => {
                    const cardCreature = data.lane[n].creature;
                    const cardEnchant = data.lane[n].enchant;
                    return(
                        <div className="puzzle-played-slot" key={n}>
                            <div className="puzzle-played-enchant">{cardEnchant ? <Card data={cardEnchant}/> : null}</div>
                            <div className="puzzle-played-creature">{cardCreature ? <Card data={cardCreature}/> : null}</div>
                        </div>
                    )
                })}
                <div className="clearfix"/>
            </div>
        )

    }
}

export default PuzzlePlayedCards;