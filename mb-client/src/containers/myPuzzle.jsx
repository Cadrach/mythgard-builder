import React from "react";
import {Form, Button, Layout, Row, Col, Icon as AntIcon, Typography, Tabs, message} from "antd";
const {Text} = Typography;
import { observer, inject } from "mobx-react";
import {toJS, observable} from "mobx";
import _ from 'lodash';

import './stylesheets/myPuzzle.scss';
import PuzzleForm from '../components/puzzle/puzzleForm';
import PuzzleRender from '../components/puzzle/puzzleRender';
import json from "../components/puzzle/puzzleExample";
import copy from "copy-to-clipboard";
import PuzzleImportButton from "../components/puzzle/puzzleImportButton";

@inject('dictionary')
@observer
export default class MyPuzzle extends React.Component {

    constructor(props){
        super(props);

        this.state = json;

        const Player1Form = Form.create({name: 'puzzle_form_1', onValuesChange: this.onChange.bind(this, 'p1')})(PuzzleForm);
        const Player2Form = Form.create({name: 'puzzle_form_2', onValuesChange: this.onChange.bind(this, 'p2')})(PuzzleForm);
        this.P1 = <Player1Form values={json.p1}/>;
        this.P2 = <Player2Form values={json.p2}/>;

        this.onClickExport = this.onClickExport.bind(this);
        this.onClickImport = this.onClickImport.bind(this);
    }

    onChange(player, props, changedValue, allValues){
        const newState = {};
        const values = toJS(allValues, {recurseEverything: true});
        newState[player] = {...values};

        this.setState(newState);
    }

    onClickImport(importData){
        const Player1Form = Form.create({name: 'puzzle_form_1', onValuesChange: this.onChange.bind(this, 'p1')})(PuzzleForm);
        const Player2Form = Form.create({name: 'puzzle_form_2', onValuesChange: this.onChange.bind(this, 'p2')})(PuzzleForm);
        this.P1 = <Player1Form values={importData.p1}/>;
        this.P2 = <Player2Form values={importData.p2}/>;
        this.setState(importData);
    }

    /**
     * Export the puzzle
     */
    onClickExport(){
        const exp = ['intro: Update the first line of the export to change the intro text!'];
        _.each(this.state, (pData, player) => {
            _.each(pData, (value, key) => {
                const pfx = player + " " + key + ": ";
                switch(key){
                    case 'path': case 'power':
                        exp.push(pfx + value.name); break;
                    case 'hand': case 'boneyard': case 'deck': case 'artifacts':
                        exp.push(pfx + value.map(card => card.name_export).join("; ")); break;
                    case 'lane':
                        _.each(value, (v, k) => {
                            if(v){
                                exp.push(player + " lane " + k + ": " + (v.creature ? v.creature.name_export:'') + ";" + (v.enchant ? v.enchant.name_export:''));
                            }
                        })
                    break;
                    default:
                        exp.push(pfx + value)
                }
            })
        })

        const string = exp.join("\r\n");

        //Send to clipboard
        copy(string, {
            message: 'Press #{key} to copy',
            format: 'text/plain',
        })

        //Notify user
        message.info("Puzzle exported to clipboard");

    }

    render() {
        const cards = this.props.dictionary.cards.all;

        return (
            <Layout className="my-puzzle">
                <Row>
                    <Col span={8}>
                        <div style={{marginTop: 20, marginLeft: 20}}>
                            <Button style={{float: 'left', marginRight: 20}} type="primary" size="large" icon="export" onClick={this.onClickExport}>Export</Button>
                            <PuzzleImportButton onImport={this.onClickImport}>
                                <Button type="primary" size="large" icon="import" >Import</Button>
                            </PuzzleImportButton>
                            <div className="clearfix"/>
                        </div>
                        <Tabs >
                            <Tabs.TabPane tab="Player" key={1}>
                                {this.P1}
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Opponent" key={2}>
                                {this.P2}
                            </Tabs.TabPane>
                        </Tabs>
                    </Col>
                    <Col span={16}>
                        <PuzzleRender data={this.state}/>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
