import React from "react";
import {Form, Button, Layout, Row, Col, Icon as AntIcon, Typography} from "antd";
const {Text} = Typography;
import { observer, inject } from "mobx-react";
import {toJS, observable} from "mobx";
import _ from 'lodash';

import PuzzleForm from '../components/puzzle/puzzleForm';

const playerDefaults = {
    life: 10,
    path: null,
    power: null,
    mana: 10,
    gems: '',
    burn: true,
    hand: [],
    boneyard: [],
    deck: [],
    lane1: {Creature: null, LaneEnchantment: null},
    lane2: {Creature: null, LaneEnchantment: null},
    lane3: {Creature: null, LaneEnchantment: null},
    lane4: {Creature: null, LaneEnchantment: null},
    lane5: {Creature: null, LaneEnchantment: null},
    lane6: {Creature: null, LaneEnchantment: null},
    lane7: {Creature: null, LaneEnchantment: null},
}

@inject('dictionary')
@observer
export default class MyPuzzle extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            p1: _.cloneDeep(playerDefaults),
            p2: _.cloneDeep(playerDefaults),
        }

        const Player1Form = Form.create({name: 'puzzle_form_1', onValuesChange: this.onChange.bind(this, 'p1')})(PuzzleForm);
        this.P1 = <Player1Form values={playerDefaults}/>;
    }

    onChange(player, props, changedValue, allValues){
        const newState = {};
        const values = toJS(allValues, {recurseEverything: true});
        newState[player] = {...values};
        this.setState(newState);
        console.log(newState);
    }


    render() {
        const cards = this.props.dictionary.cards.all;

        return (
            <Layout className="ant-layout-transparent">
                <Row>
                    <Col span={12}>
                        {this.P1}
                    </Col>
                </Row>
            </Layout>
        );
    }
}
