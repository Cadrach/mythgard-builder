import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Affix, Row, Col, Button, Tooltip} from "antd";
import DeckContent from "../components/deck/deckContent";
import DeckHeader from "../components/deck/deckHeader";

import './stylesheets/deckDetail.scss';

@inject('dictionary', 'deckStore')
@observer
class DeckDetail extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            deck: null,
            exportText: null,
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
    
    /**
     * Exports deck to clipboard
     */
    onClickExport(){
        this.props.deckStore.selectedDeck.export();
    }

    //
    render() {
        const deck = this.props.deckStore.selectedDeck;//this.state;
        const isConnected = this.props.dictionary.isConnected;

        if( ! deck) return <div></div>

        return (
            <Layout className="ant-layout-transparent">
                <Layout.Header className="header deck-detail-header">
                    <h1>
                        {deck.dck_name}
                        <div style={{float: 'right'}}>
                            {isConnected ?
                                <Button icon="star" type="primary" size="large">Favorite</Button>
                                :
                                <Tooltip title="You muse be logged-in to favorite a deck"><Button icon="star" type="primary" size="large" disabled>Favorite</Button></Tooltip>
                            }
                            <Button icon="download" type="primary" size="large" onClick={this.onClickExport.bind(this)}>Export</Button>
                        </div>
                    </h1>
                </Layout.Header>
                <Layout className="ant-layout-transparent">
                    <Row>
                    <Col span={18} style={{height: 400}}>
                        {deck.dck_description}
                    </Col>
                            <Col span={6}>
                                {deck ? <Affix offsetTop={64}>
                                    <div>
                                        <DeckHeader deck={deck}/>
                                        <DeckContent height="calc(100vh - 64px - 84px - 128px - 64px)"/>
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