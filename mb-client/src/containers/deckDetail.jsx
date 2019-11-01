import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Affix, Row, Col} from "antd";
import {Deck as DeckModel} from "../stores/deckStore";
import DeckContent from "../components/deck/deckContent";
import DeckHeader from "../components/deck/deckHeader";
import {getSnapshot} from "mobx-state-tree";

@inject('dictionary', 'deckStore')
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
                this.previousDeck = this.props.deckStore.selectedDeck;
                this.props.deckStore.setViewedDeck(data);
                this.props.deckStore.selectDeck(this.props.deckStore.viewedDeck);
            });
        })
    }

    componentWillUnmount(){
        //Restore the previously selected deck, maybe a bit ugly?
        this.props.deckStore.selectDeck(this.previousDeck);
    }


    render() {
        const deck = this.props.deckStore.selectedDeck;//this.state;

        if( ! deck) return <div></div>

        return (
            <Layout className="ant-layout-transparent">
                <Layout.Header className="header">
                    <h1>{deck.dck_name}</h1>
                </Layout.Header>
                <Layout className="ant-layout-transparent">
                    <Row>
                    <Col span={18} style={{height: 8000}}>
                        {deck.dck_description}
                    </Col>
                            <Col span={6}>
                                {deck ? <Affix offsetTop={64}>
                                    <div  style={{height: 800, overflow: 'auto'}}>
                                        <DeckHeader deck={deck}/>
                                        <DeckContent cards={deck.cards}/>
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