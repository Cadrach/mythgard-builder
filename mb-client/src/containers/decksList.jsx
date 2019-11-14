import React from "react";
import { observer, inject } from "mobx-react";
import {Alert, Layout} from "antd";
import DecksListTable from "../components/decksList/decksListTable";

import './stylesheets/deckBuilder.scss';
import DecksListFilters from "../components/decksList/decksListFilters";

@inject('dictionary', 'deckStore')
@observer
export default class DecksList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            filters: {},
            sort: {},
        }
    }

    onFiltersSubmit(filters){
        this.setState({filters});
    }

    render() {
        const {isConnected, userHasCards} = this.props.dictionary;
        const alertStyle = {marginBottom: 20};
        return (
            <Layout className="ant-layout-transparent" style={{padding: 20}}>
                <DecksListFilters onSubmit={this.onFiltersSubmit.bind(this)}/>
                { ! isConnected ? <Alert message={<span>If you <b><a href="/auth">register</a></b> you can have the decks' essence cost displayed based on the cards you own.</span>} showIcon style={alertStyle}/> : null}
                { isConnected && ! userHasCards ? <Alert message={<span>If you <b><a href="/cards">setup your cards</a></b> you can have the decks' essence cost displayed based what you own.</span>} showIcon style={alertStyle}/> : null}
                <DecksListTable filters={this.state.filters}/>
            </Layout>
        );
    }
}
