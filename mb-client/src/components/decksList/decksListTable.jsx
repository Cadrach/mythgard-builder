import React from "react";
import {inject, observer} from "mobx-react";
import {NavLink} from 'react-router-dom'
import axios from '../../axios';
import { Table, Icon as AntIcon, Tooltip, Button } from "antd";
import Icon from 'react-fa';
import constants from "../../constants";
import './stylesheets/decksListTable.scss';
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import DecksColumnRarity from "./decksColumnRarity";
import Dictionary from "../../stores/dictionary";

const isConnected = Dictionary.isConnected;
const width = 50;
const columns = [
    {
        title: 'Deck',
        dataIndex: 'dck_name',
        ellipsis: true,
        sorter: true,
        render: (dck_name, row) => (<span><b>{dck_name}</b> {row.user ? <span style={{fontStyle:'italic'}}> by {row.user.name}</span> : null}</span>),
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Power"><Icon name="bolt" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'ide_power',
        render: id => <BadgePower id={id}/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Colors"><Icon name="tint" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_colors',
        render: gems => <Gem string={gems} style={{fontSize: 24}}/>,
        width: 120,
    },
    {
        className: 'text-center',
        title: <Tooltip title={"Essence Cost" + (isConnected ? ' based on your cards':'')}><Icon name="flask" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: isConnected && Dictionary.user.cards ? 'user_cost':'dck_cost',
        sorter: true,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Favorites"><AntIcon type="star" style={{fontSize: 16}} theme="filled"/></Tooltip>,
        dataIndex: 'dck_stars',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Views"><AntIcon type="eye" style={{fontSize: 16}} theme="filled"/></Tooltip>,
        dataIndex: 'dck_views',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Downloads"><AntIcon type="cloud-download" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_downloads',
        sorter: true,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Creatures"><Icon name="male" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_creatures',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Spells"><Icon name="magic" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_spells',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Enchantments"><Icon name="bookmark" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_laneenchantments',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Artifacts"><Icon name="trophy" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_artifacts',
        sorter: true,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Commons"><Icon name="square" style={{fontSize: 16, color: constants.rarities.common}}/></Tooltip>,
        dataIndex: 'dck_nb_commons',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="common"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Uncommons"><Icon name="square" style={{fontSize: 16, color: constants.rarities.uncommon}}/></Tooltip>,
        dataIndex: 'dck_nb_uncommons',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="uncommon"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Rares"><Icon name="square" style={{fontSize: 16, color: constants.rarities.rare}}/></Tooltip>,
        dataIndex: 'dck_nb_rares',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="rare"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Mythics"><Icon name="square" style={{fontSize: 16, color: constants.rarities.mythic}}/></Tooltip>,
        dataIndex: 'dck_nb_mythics',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="mythic"/>,
        width,
    },
    {
        dataIndex: 'id',
        render: id => <NavLink to={"/decks/" + id}><Button type="primary">Details <AntIcon type="right"/></Button></NavLink>,
        width: 65,
    },
];

@inject('dictionary')
@observer
class DecksListTable extends React.Component {

    /**
     * LIFECYCLE - Constructor
     * @param props
     */
    constructor(props){
        super(props);

        //Set default state
        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }

    }

    /**
     * LIFECYCLE - triggered once after mounting component
     */
    componentDidMount(){
        this.fetchDecks(1)
    }

    /**
     * LIFECYCLE - triggered after every props change
     * @param prevProps
     */
    componentDidUpdate(prevProps){
        if( ! _.isEqual(prevProps.filters, this.props.filters)){
            this.fetchDecks(1);
        }
    }

    /**
     * Fetch the decks for the requested page
     * - Will apply current filters
     * - Will apply current sorting
     * @param currentPage
     */
    fetchDecks(currentPage, sorter) {
        this.setState({loading: true});
        axios.post('json/decks?page=' + currentPage, {
            filters: this.props.filters,
            sorter,
        }).then(({data}) => {
            const decks = data.data;
            const dictionary = this.props.dictionary;
            const cardsStore = dictionary.cards;

            //We must have a loaded dictionary to continue
            dictionary.promise.then(() => {
                decks.map(deck => deck.stats = cardsStore.computeStats(deck.dck_cards))

                this.setState({
                    data: decks,
                    pagination: {
                        current: data.current_page,
                        pageSize: data.per_page,
                        total: data.total,
                    },
                    loading: false,
                })
            })
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetchDecks(pagination.current, {field: sorter.field, order: sorter.order});
    };

    /**
     * LIFECYCLE - render the component
     * @param prevProps
     */
    render(){
        const { data, loading, pagination } = this.state;

        return (
            <div>

                <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={this.handleTableChange}
                />
            </div>
        );

    }

}

export default DecksListTable;