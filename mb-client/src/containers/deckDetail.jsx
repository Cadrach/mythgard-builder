import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Affix, Row, Col} from "antd";

@inject('dictionary')
@observer
class DeckDetail extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            deck: {}
        }
    }

    componentDidMount(){
        const deckId = this.props.match.params.id;
        this.props.dictionary.promise.then(() => {
            axios.get('json/deck/' + deckId).then(({data})=> this.setState({deck: data}));
        })
    }

    render() {
        const {deck} = this.state;


        return (
            <Layout className="ant-layout-transparent">
                <Layout.Header className="header">
                    <h1>{deck.dck_name}</h1>
                </Layout.Header>
                <Layout>
                    <Row>
                    <Col span={18} style={{height: 8000, background: 'blue'}}>
                        {deck.dck_description}
                    </Col>
                            <Col span={6}>
                                <Affix offsetTop={64}>
                                    <div  style={{height: 800, background: 'red'}}>
                                    </div>
                                </Affix>
                            </Col>
                    </Row>
                </Layout>
            </Layout>
        );
    }
}

export default  withRouter(DeckDetail)