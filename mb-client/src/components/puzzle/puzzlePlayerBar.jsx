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
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import BadgePath from "../badge/badgePath";

class PuzzlePlayerBar extends React.Component {

    render(){
        const {data} = this.props;

        return (
            <div className="puzzle-player-bar">
                <div className="puzzle-circle">
                    {data.mana}
                </div>
                <div className="puzzle-gem-bar">
                    <Gem string={data.gems} size={40} inline styleGem={{marginRight: 4}}/>
                    {/*empty gem to keep in place this bar*/}
                    <span className="fa fa-circle" style={{height: 40, fontSize: 43, marginRight: 4, color: 'transparent'}}></span>
                </div>
                <div className="puzzle-circle">
                    <BadgePower id={data.power.id} width={58} style={{position:'relative', top:-5}}/>
                </div>
                <div className="puzzle-circle">
                    <BadgePath id={data.path.id} width={58} style={{position:'relative', top:-5}}/>
                </div>
                <div className="puzzle-circle" style={{borderColor: 'rgba(255,0,0,0.5)'}}>
                    {data.life}
                </div>
            </div>
        )

    }
}

export default PuzzlePlayerBar;