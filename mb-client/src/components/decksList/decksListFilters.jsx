import React from "react";
import {inject, observer} from "mobx-react";
import {Form, Input, Button, Col, Row} from "antd";
import Select from 'react-select';
import './stylesheets/decksListFilters.scss'

@inject('dictionary')
@observer
class DecksListFilters extends React.Component {

    componentDidMount(){}

    submit(){
        const values = this.props.form.getFieldsValue();
        console.log(values);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const cards = this.props.dictionary.cards.all;
        const factions = this.props.dictionary.factions;
        console.log(factions)

        const colProps = {span: 8};
        const styleSelect = {
            control: base => ({...base, minHeight: 40 })
        }

        return (
            <Form>
                <Row gutter={20}>
                    <Col {...colProps}>
                        <Form.Item>
                            {getFieldDecorator('global')(<Input.Search placeholder="By deck name, description or author..." size="large"/>)}
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
                    <Col {...colProps}>
                        <Button onClick={this.submit.bind(this)} block title="test"/>
                    </Col>
                </Row>
            </Form>
        )

    }

}

export default Form.create({name: 'decks_list_filters'})(DecksListFilters);