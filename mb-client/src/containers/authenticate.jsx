import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {Layout, Typography, Row, Col, Card, Form, Input, Icon as AntIcon, Button, Divider} from "antd";
import {Switch} from "antd/es";
import {Icon} from "react-fa/lib";
const { Title, Paragraph, Text } = Typography;

@inject('dictionary')
@observer
class Authenticate extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Layout className="ant-layout-transparent" style={{padding: 40}}>
                <Row gutter={40}>
                    <Col span={12}>
                        <Card title="Login">
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(<div><Switch/> Remember me</div>)}
                                    <div>
                                        <a href="">
                                            Forgot password
                                        </a>
                                    </div>
                                    <br/>
                                    <Button block type="primary" htmlType="submit">
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Divider>OR</Divider>

                            <Button size="large" type="primary" block><Icon name="facebook" fixedWidth={true}/>&nbsp;Login with Facebook</Button>

                            <Divider>OR</Divider>

                            <Button size="large" type="primary" block><Icon name="google" fixedWidth={true}/>&nbsp;Login with Google</Button>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Register">
                        </Card>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default  Form.create({ name: 'form_auth' })(Authenticate);