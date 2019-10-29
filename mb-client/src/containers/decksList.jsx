import React from "react";
import { observer, inject } from "mobx-react";
import {Drawer, Layout, Button, Menu, Icon as AntIcon, Divider, List} from "antd";
import Icon from 'react-fa';
import _ from 'lodash';
import DecksListTable from "../components/decksList/decksListTable";

import './stylesheets/deckBuilder.scss';

@inject('dictionary', 'deckStore')
@observer
export default class DecksList extends React.Component {

    constructor(props){
        super(props);

    }

    render() {
        return (
            <Layout className="ant-layout-transparent" style={{padding: 20}}>
                <DecksListTable/>
            </Layout>
        );
    }
}
