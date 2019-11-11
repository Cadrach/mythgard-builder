import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {Layout, Typography, Alert, Row, Col, Card, Form, Input, Icon as AntIcon, Button, Divider, notification} from "antd";
import {Switch} from "antd";
import {withRouter} from 'react-router-dom';
import {Icon} from "react-fa/lib";
const { Title, Paragraph, Text } = Typography;

import './stylesheets/authenticate.scss';

@inject('dictionary')
@observer
class Authenticate extends React.Component {

    constructor(props){
        super(props);
    }

    submit(type){
        //Retrieve values
        const values = this.props.form.getFieldsValue();
        axios.post(process.env.REACT_APP_SERVER_ROOT + '/' + type, values[type]).then(({data}) => {
            this.props.history.push("/");
            this.props.dictionary.user = data;
            if(type == 'register'){
                notification.success({message: "You have been successfully registered!"});
            }
        }, ({data}) => {
            notification.destroy();
            if(data && data.errors){
                notification.error({message: <ul>{_.chain(data.errors).toArray().flatten().value().map((v,k) => <li key={k}>{v}</li>)}</ul>});
            }
        });
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const colPropsLeft = {
            xs: {
                span: 12,
            },
            lg: {
                span: 8,
                offset: 3,
            }
        }
        const colPropsRight = {
            xs: {
                span: 12,
            },
            lg: {
                span: 8,
                offset: 2,
            }
        }

        if(this.props.dictionary.isConnected){
            return <Alert message="You are already connected" style={{margin: 50}}/>
        }

        return (
            <Layout className="ant-layout-transparent" style={{padding: 40}}>
                <Row gutter={40}>
                    <Col {...colPropsLeft}>
                        <Card title="Login">
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('login.email', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('login.password', {
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
                                    <Button block type="primary" htmlType="submit" onClick={this.submit.bind(this, 'login')}>
                                        Log in
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Divider>OR</Divider>

                            <Button className="btnFacebook" size="large" type="primary" block href={process.env.REACT_APP_SERVER_ROOT + '/login/facebook'}>
                                <Icon name="facebook" fixedWidth={true}/>&nbsp;Login with Facebook
                            </Button>

                            <Divider>OR</Divider>

                            <Button className="btnGoogle" size="large" type="primary" block href={process.env.REACT_APP_SERVER_ROOT + '/login/google'}>
                                <Icon name="google" fixedWidth={true}/>&nbsp;Login with Google
                            </Button>
                        </Card>
                    </Col>
                    <Col {...colPropsRight}>
                        <Card title="Register">
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('register.name', {
                                        rules: [{ required: true, message: 'Please input your username!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Username"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('register.email', {
                                        rules: [{ required: true, message: 'Please input your email!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email"
                                        />,
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('register.password', {
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
                                    {getFieldDecorator('register.password_confirmation', {
                                        rules: [{ required: true, message: 'Please input your Password!' }],
                                    })(
                                        <Input
                                            prefix={<AntIcon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            type="password"
                                            placeholder="Password Confirmation"
                                        />,
                                    )}
                                </Form.Item>
                                <br/>
                                <Button block type="primary" htmlType="submit" onClick={this.submit.bind(this, 'register')}>
                                    Register
                                </Button>
                            </Form>

                            <Divider>OR</Divider>

                            <Button className="btnFacebook" size="large" type="primary" block href={process.env.REACT_APP_SERVER_ROOT + '/login/facebook'}>
                                <Icon name="facebook" fixedWidth={true}/>&nbsp;Register with Facebook
                            </Button>

                            <Divider>OR</Divider>

                            <Button className="btnGoogle" size="large" type="primary" block href={process.env.REACT_APP_SERVER_ROOT + '/login/google'}>
                                <Icon name="google" fixedWidth={true}/>&nbsp;Register with Google
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default withRouter(Form.create({ name: 'form_auth' })(Authenticate));