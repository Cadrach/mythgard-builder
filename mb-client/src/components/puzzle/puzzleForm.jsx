import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Switch, InputNumber, Button, Col, Row, Badge} from "antd";
import SingleValueWithImageSelect from "../select/singleValueWithImageSelect";
import _ from 'lodash';

// import './stylesheets/decksListFilters.scss'
import constants from "../../constants";
import CardSelect from "../card/cardSelect";

@inject('dictionary')
@observer
class PuzzleForm extends React.Component {

    constructor(props){
        super(props);

        //Bindings
        // this.submit = this.submit.bind(this);
    }

    componentDidMount(){        //Create the fields object to pass values to our form
        let fields = {};
        _.each(_.keys(this.props.values), key => fields[key] = {value: this.props.values[key]});

        fields.lane = {};
        [1,2,3,4,5,6,7].forEach((n) => {
            fields.lane[n] = {
                creature: {value: this.props.values.lane[n].creature},
                enchant: {value: this.props.values.lane[n].enchant},
            }
        })

        //Set the default fields values
        this.props.form.setFields(fields);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {paths, powers} = this.props.dictionary;
        const cards = this.props.dictionary.cards.all;
        const cardsCreature = _.filter(cards, {type: 'Creature'});
        const cardsEnchant = _.filter(cards, {type: 'LaneEnchantment'});
        const cardsArtifacts = _.filter(cards, {type: 'Artifact'});


        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        };
        const formItemDualColumn = {
            labelCol: {span: 12},
            wrapperCol: {span: 12},
        }
        const styleSelect = {
            ...constants.styleSelect,
            container: base => ({...base, minHeight: 28, lineHeight: 'normal'}),
            control: base => ({...base, minHeight: 28 }),
            input: base => ({...base, height: 28}),
            singleValue: base => ({...base, }),
            multiValue: base => ({...base}),
        }

        return (
            <Form className="puzzle-form">
                <Form.Item label="Name" {...formItemLayout}>
                    {getFieldDecorator('name')(
                        <Input placeholder="Name"/>
                    )}
                </Form.Item>

                <Row>
                    <Col span={12}>
                        <Form.Item label="Mana" {...formItemDualColumn}>
                            {getFieldDecorator('mana')(<InputNumber placeholder="Mana"/>)}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Life" {...formItemDualColumn}>
                            {getFieldDecorator('life')(<InputNumber placeholder="Life"/>)}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="Gems" {...formItemDualColumn}>
                            {getFieldDecorator('gems')(
                                <Input placeholder="Gems, use letters: byrgop"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Burn used" {...formItemDualColumn}>
                            {getFieldDecorator('burn',{valuePropName: 'checked'})(
                                <Switch/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Form.Item label="Power" {...formItemDualColumn}>
                            {getFieldDecorator('power',{valuePropName: 'state.value'})(
                                <SingleValueWithImageSelect styles={styleSelect} options={powers} defaultValue={this.props.values.power} placeholder="Select a Power"/>
                            )}
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Path" {...formItemDualColumn}>
                            {getFieldDecorator('path',{valuePropName: 'state.value'})(
                                <SingleValueWithImageSelect styles={styleSelect} options={paths} defaultValue={this.props.values.path} placeholder="Select a Path"/>
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Hand" {...formItemLayout}>
                    {getFieldDecorator('hand', {valuePropName: 'state.value'})(
                        <CardSelect styles={styleSelect} defaultValue={this.props.values.hand}/>
                    )}
                </Form.Item>

                <Form.Item label="Deck" {...formItemLayout}>
                    {getFieldDecorator('deck', {valuePropName: 'state.value'})(
                        <CardSelect styles={styleSelect} defaultValue={this.props.values.deck}/>
                    )}
                </Form.Item>

                <Form.Item label="Boneyard" {...formItemLayout}>
                    {getFieldDecorator('boneyard', {valuePropName: 'state.value'})(
                        <CardSelect styles={styleSelect} defaultValue={this.props.values.boneyard}/>
                    )}
                </Form.Item>

                <Form.Item label="Artifacts" {...formItemLayout}>
                    {getFieldDecorator('artifacts', {valuePropName: 'state.value'})(
                        <CardSelect styles={styleSelect} options={cardsArtifacts} defaultValue={this.props.values.artifacts}/>
                    )}
                </Form.Item>

                Lanes:
                {_.map([1,2,3,4,5,6,7], (n) => {
                    return (
                        <Row key={"lane"+n} gutter={20}>
                            <Col style={{fontSize: 24, textAlign: 'center'}} span={2}>
                                {n}
                            </Col>
                            <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('lane.' + n + '.creature', {valuePropName: 'state.value'})(
                                        <CardSelect styles={styleSelect} options={cardsCreature} defaultValue={this.props.values.lane[n].creature} isMulti={false} placeholder="Select Creature" isClearable/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={11}>
                                <Form.Item>
                                    {getFieldDecorator('lane.' + n + '.enchant', {valuePropName: 'state.value'})(
                                        <CardSelect styles={styleSelect} options={cardsEnchant} defaultValue={this.props.values.lane[n].enchant} isMulti={false} placeholder="Select Enchantment" isClearable/>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}
            </Form>
        )

    }
}

//Required props
PuzzleForm.propTypes = {
    // onSubmit: PropTypes.func.isRequired,
}

export default PuzzleForm;