import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Button, Col, Row} from "antd";
import Select, {components} from 'react-select';
import _ from 'lodash';
import './stylesheets/decksListFilters.scss'
import Gem from "../gem/gem";

/**
 * Option line for faction
 * @param props
 * @returns {*}
 * @constructor
 */
const OptionFaction = (props) => {
    const style = props.getStyles('option', props);
    return <div {...props.innerProps} style={{...style, fontSize: 18, lineHeight: '24px'}}>
        <div style={{position: 'relative', top: -2, background: '#333', display: 'inline-block', padding: 3, borderRadius: 50, height: 30, width: 30, marginRight: 5}}>
            <img src={'/images/' + props.data.image} style={{width: 24, position: 'relative', top: -3, }}/>
        </div>
        {props.data.name}
    </div>
}

const MultiValueLabelFaction = props => {
    return <components.MultiValueLabel {...props}>
        <div style={{position: 'relative', top: -2, background: '#333', display: 'inline-block', padding: 3, borderRadius: 50, height: 30, width: 30, marginRight: 5}}>
            <img src={'/images/' + props.data.image} style={{width: 24, position: 'relative', top: -3, }}/>
        </div>
    </components.MultiValueLabel>
};

/**
 * Option line for card
 * @param props
 * @returns {*}
 * @constructor
 */
const OptionCard = (props) => {
    const style = props.getStyles('option', props);
    return <div {...props.innerProps} style={{...style, fontSize: 18, lineHeight: '24px'}}>
        <div style={{width: 50, textAlign: "center", display: "inline-block", position: 'relative', top: -3}}>
            <Gem string={props.data.gems} styleGem={{fontSize: 8}}/>
        </div>
        {props.data.name}
    </div>
}
export {OptionCard};

@inject('dictionary')
@observer
class DecksListFilters extends React.Component {

    constructor(props){
        super(props);

        //Bindings
        this.submit = this.submit.bind(this);
    }

    submit(){
        //Retrieve values
        const values = this.props.form.getFieldsValue();

        //Format values
        const finalValues = {
            ...values,
            cards: values.cards ? values.cards.map(c => ({id: c.id, count: 1})) : null,
        };

        //Send values to callback (removing the empty ones)
        this.props.onSubmit(_.pickBy(finalValues));
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const cards = this.props.dictionary.cards.all;
        const factions = this.props.dictionary.factions;

        const colProps = {span: 8};
        const styleSelect = {
            control: base => ({...base, minHeight: 40 }),
            container: base => ({...base, zIndex: 100}),
            menu: base => ({...base, color: '#000'}),
            multiValue: base => ({...base, color: '#000', fontSize: 18}),
        }

        return (
            <Form>
                <Row gutter={20}>
                    <Col {...colProps} span={6}>
                        <Form.Item>
                            {getFieldDecorator('global')(<Input.Search placeholder="By deck name or description..." size="large" onPressEnter={this.submit}/>)}
                        </Form.Item>
                    </Col>
                    <Col {...colProps}>
                        <Form.Item>
                            {getFieldDecorator('cards', {valuePropName: 'state.value'})(
                                <Select
                                    placeholder="By Cards..."
                                    options={cards}
                                    isMulti={true}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    styles={styleSelect}
                                    components={{
                                        Option: OptionCard
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    <Col {...colProps} span={6}>
                        <Form.Item>
                            {getFieldDecorator('colors', {valuePropName: 'state.value'})(
                                <Select
                                    placeholder="By Colors..."
                                    options={factions}
                                    isMulti={true}
                                    getOptionValue={option => option.id}
                                    getOptionLabel={option => option.name}
                                    styles={styleSelect}
                                    components={{
                                        Option: OptionFaction,
                                        MultiValueLabel: MultiValueLabelFaction,
                                    }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                    {/*<Col {...colProps}>*/}
                    {/*    <Form.Item>*/}
                    {/*        {getFieldDecorator('factions')(*/}
                    {/*            <Select mode="multiple" placeholder="By color..." optionLabelProp="title" optionFilterProp="title" filterOption={true} >*/}
                    {/*                {cards.map(card => <Select.Option key={card.id} value={card.id} title={card.name}>*/}
                    {/*                    {card.name}*/}
                    {/*                </Select.Option>)}*/}
                    {/*            </Select>*/}
                    {/*        )}*/}
                    {/*    </Form.Item>*/}
                    {/*</Col>*/}
                    <Col {...colProps} span={4}>
                        <Button type="primary" icon="search" size="large" onClick={this.submit.bind(this)} block>Search</Button>
                    </Col>
                </Row>
            </Form>
        )

    }
}

//Required props
DecksListFilters.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default Form.create({name: 'decks_list_filters'})(DecksListFilters);