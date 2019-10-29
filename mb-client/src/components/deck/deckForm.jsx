import React from "react";
import {inject, observer} from "mobx-react";
import {Form, Input, Button, Switch } from "antd";

@inject('deckStore')
@observer
class DeckForm extends React.Component {

    componentDidMount(){
        //Create the fields object to pass values to our form
        let fields = {};
        _.each([
            'dck_name',
            'dck_description',
            'dck_public',
        ], key => fields[key] = {value: this.props.deckStore.selectedDeck[key]});

        //Set the default fields values
        this.props.form.setFields(fields);
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <div>
                <Form {...formItemLayout} >
                    <Form.Item label="Name">
                        {getFieldDecorator('dck_name', {
                            rules: [{required: true, message: 'Your deck must have a name!'}]
                        })(<Input/>)}
                    </Form.Item>

                    <Form.Item label="Public Deck">
                        {getFieldDecorator('dck_public',{
                            valuePropName: 'checked'
                        })(<Switch/>)}
                    </Form.Item>

                    <Form.Item label="Description">
                        {getFieldDecorator('dck_description')(<Input.TextArea/>)}
                    </Form.Item>
                </Form>
            </div>
        )

    }

}

export default Form.create({name: 'deck_form'})(DeckForm);