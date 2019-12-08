import React from "react";
import { observer, inject } from "mobx-react";
import {Alert, Layout} from "antd";

import './stylesheets/deckBuilder.scss';
import PuzzlesListTable from "../components/puzzlesList/puzzlesListTable";

const alertStyle = {
    fontSize: 16,
    marginBottom: 20,
}

@inject('dictionary')
@observer
export default class PuzzlesList extends React.Component {

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
        const {isConnected, userHasCards, isLoading} = this.props.dictionary;

        if(isLoading){
            return <div></div>;
        }

        return (
            <Layout className="ant-layout-transparent" style={{padding: 20}}>
                <Alert message={<ul style={{margin: 0}}>
                    <li>This list is manually curated. If you want to add your puzzle there, reach out to me on Discord (Cadrach#2754).</li>
                    <li>Click on a line to export the Puzzle to your clipboard, then use the "Import" button on the puzzle screen in-game.</li>
                </ul>} style={alertStyle}/>
                <PuzzlesListTable filters={this.state.filters}/>
            </Layout>
        );
    }
}
