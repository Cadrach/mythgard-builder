import React from "react";
import { observer, inject } from "mobx-react";
import {Layout} from "antd";
import DecksListTable from "../components/decksList/decksListTable";

import './stylesheets/deckBuilder.scss';
import DecksListFilters from "../components/decksList/decksListFilters";

@inject('dictionary', 'deckStore')
@observer
export default class DecksList extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        return (
            <Layout className="ant-layout-transparent" style={{padding: 20}}>
                <DecksListFilters/>

                <DecksListTable/>
            </Layout>
        );
    }
}
