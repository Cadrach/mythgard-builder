import React from "react";
import {inject, observer} from "mobx-react";
import axios from '../../axios';
import { Table, Icon as AntIcon, Tooltip } from "antd";
import Icon from 'react-fa';
import constants from "../../constants";
import './stylesheets/decksListTable.scss';

const width = 50;
const columns = [
    {
        title: 'Deck',
        dataIndex: 'dck_name',
        ellipsis: true,
        sorter: true,
    },
    {
        title: 'Player',
        dataIndex: 'user.name',
        ellipsis: true,
    },
    {
        className: 'border-left',
        title: <Tooltip title="Favorites"><AntIcon type="star" style={{fontSize: 16}} theme="filled"/></Tooltip>,
        dataIndex: 'dck_stars',
        sorter: true,
        width,
    },
    {
        title: <Tooltip title="Views"><AntIcon type="eye" style={{fontSize: 16}} theme="filled"/></Tooltip>,
        dataIndex: 'dck_views',
        sorter: true,
        width,
    },
    {
        title: <Tooltip title="Downloads"><AntIcon type="cloud-download" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'dck_downloads',
        sorter: true,
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Creatures"><Icon name="male" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'stats.types.Creature',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Spells"><Icon name="magic" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'stats.types.Spell',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Enchantments"><Icon name="bookmark" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'stats.types.LaneEnchantment',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Artifacts"><Icon name="trophy" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'stats.types.Artifact',
        width,
    },
    {
        className: 'border-left text-center',
        title: <Tooltip title="Commons"><Icon name="square" style={{fontSize: 16, color: constants.rarities.common}}/></Tooltip>,
        dataIndex: 'stats.rarities.common',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Uncommons"><Icon name="square" style={{fontSize: 16, color: constants.rarities.uncommon}}/></Tooltip>,
        dataIndex: 'stats.rarities.uncommon',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Rares"><Icon name="square" style={{fontSize: 16, color: constants.rarities.rare}}/></Tooltip>,
        dataIndex: 'stats.rarities.rare',
        width,
    },
    {
        className: 'text-center',
        title: <Tooltip title="Mythics"><Icon name="square" style={{fontSize: 16, color: constants.rarities.mythic}}/></Tooltip>,
        dataIndex: 'stats.rarities.mythic',
        width,
    },
    // {
    //     title: 'Gender',
    //     dataIndex: 'gender',
    //     filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
    //     width: '20%',
    // },
    // {
    //     title: 'Email',
    //     dataIndex: 'email',
    // },
];

@inject('dictionary')
@observer
export default class DecksListTable extends React.Component {

    /**
     * Constructor
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
     * Fetch the decks for the requested page
     * - Will apply current filters
     * - Will apply current sorting
     * @param currentPage
     */
    fetchDecks(currentPage) {
        this.setState({loading: true});
        axios.post('json/decks?page=' + currentPage, {
            filters: this.props.filters
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
        this.fetchDecks(pagination.current);
    };

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