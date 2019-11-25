import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Switch, InputNumber, Button, Col, Row} from "antd";
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

        //Set the default fields values
        this.props.form.setFields(fields);
        console.log('MOUN')
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const {paths, powers} = this.props.dictionary;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };

        return (
            <Form className="puzzle-form">

                <Form.Item label="Life" {...formItemLayout}>
                    {getFieldDecorator('life')(<InputNumber placeholder="Life"/>)}
                </Form.Item>

                <Form.Item label="Mana" {...formItemLayout}>
                    {getFieldDecorator('mana')(<InputNumber placeholder="Mana"/>)}
                </Form.Item>

                <Form.Item label="Gems" {...formItemLayout}>
                    {getFieldDecorator('gems')(
                        <Input placeholder="Gems, use letters: byrgop"/>
                    )}
                </Form.Item>

                <Form.Item label="Can burn 1 card" {...formItemLayout}>
                    {getFieldDecorator('burn',{valuePropName: 'checked'})(
                        <Switch/>
                    )}
                </Form.Item>

                <Form.Item label="Path" {...formItemLayout}>
                    {getFieldDecorator('path',{valuePropName: 'state.value'})(
                        <SingleValueWithImageSelect options={paths} placeholder="Select a Path"/>
                    )}
                </Form.Item>

                <Form.Item label="Power" {...formItemLayout}>
                    {getFieldDecorator('power',{valuePropName: 'state.value'})(
                        <SingleValueWithImageSelect options={powers} placeholder="Select a Power"/>
                    )}
                </Form.Item>

                <Form.Item label="Hand" {...formItemLayout}>
                    {getFieldDecorator('hand', {valuePropName: 'state.value'})(
                        <CardSelect defaultValue={this.props.values.hand}/>
                    )}
                </Form.Item>

                <Form.Item label="Deck" {...formItemLayout}>
                    {getFieldDecorator('deck', {valuePropName: 'state.value'})(
                        <CardSelect defaultValue={this.props.values.deck}/>
                    )}
                </Form.Item>

                <Form.Item label="Boneyard" {...formItemLayout}>
                    {getFieldDecorator('boneyard', {valuePropName: 'state.value'})(
                        <CardSelect defaultValue={this.props.values.deck}/>
                    )}
                </Form.Item>

                {_.map([1,2,3,4,5,6,7], (n) => {
                    return (<div key={"lane"+n}>
                        <Form.Item label={"Lane " + n + " Creature"} {...formItemLayout}>
                            {getFieldDecorator('lane' + n + '.Creature', {valuePropName: 'state.value'})(
                                <CardSelect defaultValue={this.props.values["lane"+n].Creature} isMulti={false} placeholder="Select one card" isClearable/>
                            )}
                        </Form.Item>
                        <Form.Item label={"Lane " + n + " Enchantment"} {...formItemLayout}>
                            {getFieldDecorator('lane' + n + '.LaneEnchantment', {valuePropName: 'state.value'})(
                                <CardSelect defaultValue={this.props.values["lane"+n].LaneEnchantment} isMulti={false} placeholder="Select one card" isClearable/>
                            )}
                        </Form.Item>
                    </div>)
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