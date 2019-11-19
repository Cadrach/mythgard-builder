import React from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from 'react-router-dom'
import axios from '../../axios';
import { Table, Icon as AntIcon, Tooltip, Button } from "antd";
import Icon from 'react-fa';
import moment from "moment";
import './stylesheets/decksListTable.scss';
import Gem from "../gem/gem";
import BadgePower from "../badge/badgePower";
import DecksColumnRarity from "./decksColumnRarity";
import Dictionary from "../../stores/dictionary";
import BadgePath from "../badge/badgePath";
import BadgeEssence from "../badge/badgeEssence";

const width = 50;
const columns = [
    {
        title: 'Deck',
        dataIndex: 'dck_name',
        ellipsis: true,
        sorter: true,
        render: (dck_name, row) => (<span><b style={{fontSize: 16}}>{dck_name}</b> {row.user ? <span style={{fontStyle:'italic'}}> by {row.user.name}</span> : null}</span>),
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Path"><Icon name="code-fork" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'ide_path',
        render: id => <BadgePath id={id}/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Power"><Icon name="bolt" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'ide_power',
        render: id => <BadgePower id={id}/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Colors"><Icon name="tint" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_colors',
        render: gems => <Gem string={gems} size={20}/>,
        width: 120,
    },
    {
        className: 'text-center',
        title: <Tooltip title={"Essence Cost" + (Dictionary.userHasCards ? ' based on your cards':'')}><Icon name="flask" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: Dictionary.userHasCards ? 'user_cost':'dck_cost',
        sorter: true,
        render: (value, row) => <BadgeEssence value={Dictionary.userHasCards ? row.user_cost : row.dck_cost}/>,
        width: 100,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Commons"><img src="/images/icons/rarity_common.png" width={24}/></Tooltip>,
        dataIndex: 'dck_nb_commons',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="common"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Uncommons"><img src="/images/icons/rarity_uncommon.png" width={24}/></Tooltip>,
        dataIndex: 'dck_nb_uncommons',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="uncommon"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Rares"><img src="/images/icons/rarity_rare.png" width={24}/></Tooltip>,
        dataIndex: 'dck_nb_rares',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="rare"/>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Mythics"><img src="/images/icons/rarity_mythic.png" width={24}/></Tooltip>,
        dataIndex: 'dck_nb_mythics',
        sorter: true,
        render: (value, row) => <DecksColumnRarity row={row} rarity="mythic"/>,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Creatures"><Icon name="male" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_creatures',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{value}&nbsp;<Icon name="male"/></span>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Spells"><Icon name="magic" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_spells',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{value}&nbsp;<Icon name="magic"/></span>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Enchantments"><Icon name="bookmark" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_laneenchantments',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{value}&nbsp;<Icon name="bookmark"/></span>,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Artifacts"><Icon name="trophy" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_nb_artifacts',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{value}&nbsp;<Icon name="trophy"/></span>,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Favorites"><AntIcon type="star" style={{fontSize: 16}} theme="filled"/></Tooltip>,
        dataIndex: 'dck_stars',
        sorter: true,
        width,
    },
    // {
    //     className: 'text-center',
    //     title: <Tooltip title="Views"><AntIcon type="eye" style={{fontSize: 16}} theme="filled"/></Tooltip>,
    //     dataIndex: 'dck_views',
    //     sorter: true,
    //     width,
    // },
    {
        className: 'text-center',
        title: <Tooltip title="Downloads"><AntIcon type="cloud-download" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_downloads',
        sorter: true,
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Last Updated"><AntIcon type="clock-circle" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'updated_at',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{moment(value, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>,
        width: 120,
    },
    // {
    //     dataIndex: 'id',
    //     render: id => <NavLink to={"/decks/" + id}><Button type="primary">Details <AntIcon type="right"/></Button></NavLink>,
    //     width: 65,
    // },
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
            filters: props.filters ? props.filters:{},
        }
    }

    /**
     * LIFECYCLE - triggered once after mounting component
     */
    componentDidMount(){
        if(this.props.dictionary.interface.decksListCache){
            this.setState(this.props.dictionary.interface.decksListCache);
        }
        else{
            this.fetchDecks(1)
        }

    }

    /**
     * LIFECYCLE - triggered after every props change
     * @param prevProps
     */
    componentDidUpdate(prevProps){
        if( ! _.isEqual(prevProps.filters, this.props.filters)){
            const filters = {...this.props.filters};
            this.setState({filters}, () => this.fetchDecks(1))            ;
        }
    }

    onRowClick(record, {ctrlKey}){
        if(ctrlKey){
            window.open('/decks/' + record.id)
        }
        else{
            this.props.history.push('/decks/' + record.id);
        }
    }

    /**
     * Fetch the decks for the requested page
     * - Will apply current filters
     * - Will apply current sorting
     * @param currentPage
     */
    fetchDecks(currentPage, sorter) {
        const filters = this.state.filters;
        this.setState({loading: true});
        axios.post('json/decks?page=' + currentPage, {
            filters,
            sorter,
        }).then(({data}) => {
            const decks = data.data;
            const dictionary = this.props.dictionary;
            const cardsStore = dictionary.cards;

            //We must have a loaded dictionary to continue
            dictionary.promise.then(() => {
                decks.map(deck => deck.stats = cardsStore.computeStats(deck.dck_cards))
                const state = {
                    data: decks,
                    pagination: {
                        current: data.current_page,
                        pageSize: data.per_page,
                        total: data.total,
                    },
                    loading: false,
                    filters,
                }

                //Cache current setup
                this.props.dictionary.interface.decksListCache = {...state};

                this.setState(state)
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
            <div className="decks-list-table">

                <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                scroll={{x: true}}
                onChange={this.handleTableChange}
                onRow={(record) => ({onClick: this.onRowClick.bind(this, record)})}
                />
            </div>
        );

    }

}

export default withRouter(DecksListTable);