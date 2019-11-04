import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import {Form, Input, Button, Col, Row} from "antd";
import Select from 'react-select';
import _ from 'lodash';
import './stylesheets/decksListFilters.scss'

@inject('dictionary')
@observer
class DecksListFilters extends React.Component {

    componentDidMount(){}

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
            control: base => ({...base, minHeight: 40 })
        }

        return (
            <Form>
                <Row gutter={20}>
                    <Col {...colProps} span={6}>
                        <Form.Item>
                            {getFieldDecorator('global')(<Input.Search placeholder="By deck name or description..." size="large"/>)}
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