import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Switch, InputNumber, Button, Col, Row, Badge} from "antd";
import SingleValueWithImageSelect from "../select/singleValueWithImageSelect";
import _ from 'lodash';

// import './stylesheets/decksListFilters.scss'
import constants from "../../constants";
import CardSelect from "../card/cardSelect";
import PuzzlePlayedCards from "./puzzlePlayedCards";
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import PuzzlePlayerBar from "./puzzlePlayerBar";

class PuzzleRender extends React.Component {

    render(){
        const {data} = this.props

        return (
            <div className="puzzle-render">
                <PuzzlePlayerBar data={data.p2}/>
                <PuzzlePlayedCards data={data.p2}/>
                <div className="puzzle-divider"/>
                <PuzzlePlayedCards data={data.p1}/>
                <PuzzlePlayerBar data={data.p1}/>
            </div>
        )

    }
}

export default PuzzleRender;