import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Affix, Row, Col} from "antd";
import {Deck as DeckModel} from "../stores/deckStore";
import DeckContent from "../components/deck/deckContent";
import DeckHeader from "../components/deck/deckHeader";

@inject('dictionary')
@observer
class DeckDetail extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            deck: null
        }
    }

    componentDidMount(){
        const deckId = this.props.match.params.id;
        this.props.dictionary.promise.then(() => {
            axios.get('json/deck/' + deckId).then(({data})=> {
                const deck = DeckModel.create(data, {
                    cardStore: this.props.dictionary.cards,
                });
                this.setState({deck})
            });
        })
    }

    render() {
        const {deck} = this.state;

        if( ! deck) return <div></div>

        console.log(deck);

        const cardsStore = this.props.dictionary.cards;

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
                                {deck ? <Affix offsetTop={64}>
                                    <div  style={{height: 800, background: 'red', overflow: 'auto'}}>
                                        <DeckHeader deck={deck}/>
                                        <DeckContent deck={deck}/>
                                    </div>
                                </Affix> : null}
                            </Col>
                    </Row>
                </Layout>
            </Layout>
        );
    }
}

export default  withRouter(DeckDetail)