import React from "react";
import axios from '../axios';
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Affix, Row, Col, Button, Tooltip, Icon as AntIcon} from "antd";
import DeckContent from "../components/deck/deckContent";
import DeckHeader from "../components/deck/deckHeader";

import './stylesheets/deckDetail.scss';
import TextEditorReadonly from "../components/textEditor/textEditorReadonly";
import ChartContainer from "../components/chart/chartContainer";

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
            this.props.deckStore.fetchDeckDetails(deckId).then(() => this.props.deckStore.selectDeckById(deckId));
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

    onClickFavorite(){
        this.props.deckStore.selectedDeck.toggleFavorite();
    }

    //
    render() {
        const deck = this.props.deckStore.selectedDeck;//this.state;
        const isConnected = this.props.dictionary.isConnected;
        const content = deck.dck_description;
        if( ! deck || ! deck.id) return <div></div>

        return (
            <Layout className="deck-detail ant-layout-transparent">
                <Affix offsetTop={64}>
                    <Layout.Header className="deck-detail-header with-background">
                        <h1>
                            {deck.dck_name}
                            <div style={{float: 'right'}}>
                                {isConnected ?
                                    <Button type="primary" size="large" onClick={this.onClickFavorite.bind(this)}>
                                        <AntIcon type="star" theme={deck.is_favorite?'filled':null}/> Favorite
                                    </Button>
                                    :
                                    <Tooltip title="You muse be logged-in to favorite a deck"><Button icon="star" type="primary" size="large" disabled>Favorite</Button></Tooltip>
                                }
                                <Button icon="download" type="primary" size="large" onClick={this.onClickExport.bind(this)}>Export</Button>
                            </div>
                        </h1>
                    </Layout.Header>
                </Affix>
                <Layout className="deck-detail-content">
                    <Row>
                        <Col className="col-container-text" xs={{span: 24}} sm={{span: 12}} md={{span: 14}} lg={{span: 18}}>
                            <Layout className="ant-layout-transparent" style={{padding: 20}}>
                                <ChartContainer deck={deck}/>
                                <TextEditorReadonly content={content}/>
                            </Layout>
                        </Col>
                        <Col xs={{span: 24}} sm={{span: 12}} md={{span: 10}} lg={{span: 6}}>
                            {deck ? <Affix offsetTop={64+70}>
                                <div>
                                    <DeckHeader deck={deck}/>
                                    <DeckContent height="calc(100vh - 64px - 70px - 128px)"/>
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