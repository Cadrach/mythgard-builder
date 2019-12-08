import React from "react";
import {inject, observer} from "mobx-react";
import axios from '../../axios';
import {Table, Icon as AntIcon, Tooltip, message} from "antd";
import Icon from 'react-fa';
import moment from "moment";
import './stylesheets/decksListTable.scss';
import copy from "copy-to-clipboard";

const width = 50;
const columns = [
    {
        title: 'Puzzle',
        dataIndex: 'pzl_name',
        ellipsis: true,
        sorter: true,
        render: (dck_name, row) => (<span><b style={{fontSize: 16}}>{dck_name}</b> {row.user ? <span style={{fontStyle:'italic'}}> by {row.user.name}</span> : null}</span>),
    },
    {
        title: 'Difficulty',
        dataIndex: 'pzl_difficulty',
        ellipsis: true,
        sorter: true,
        render: (value, row) => (<span>{[1,2,3,4,5].map(v => (<Icon key={v} name="star" fixedWidth size="lg" style={{color: v<=value?"#fadb14":null}}/>))}</span>),
    },
    // {
    //     className: 'border-left text-center',
    //     title: <Tooltip title="Favorites"><AntIcon type="star" style={{fontSize: 16}} theme="filled"/></Tooltip>,
    //     dataIndex: 'dck_stars',
    //     sorter: true,
    //     width,
    // },
    // {
    //     className: 'text-center',
    //     title: <Tooltip title="Downloads"><AntIcon type="cloud-download" style={{fontSize: 16}}/></Tooltip>,
    //     dataIndex: 'dck_downloads',
    //     sorter: true,
    //     width,
    // },
    {
        className: 'text-center',
        title: <Tooltip title="Last Updated"><AntIcon type="clock-circle" style={{fontSize: 16}}/></Tooltip>,
        dataIndex: 'updated_at',
        sorter: true,
        render: (value) => <span style={{fontSize: 14}}>{moment(value, 'YYYY-MM-DD HH:mm:ss').fromNow()}</span>,
        width: 120,
    },
];

@inject('dictionary')
@observer
class PuzzlesListTable extends React.Component {

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
        this.fetchPuzzles(1);
    }

    /**
     * LIFECYCLE - triggered after every props change
     * @param prevProps
     */
    componentDidUpdate(prevProps){
        if( ! _.isEqual(prevProps.filters, this.props.filters)){
            const filters = {...this.props.filters};
            this.setState({filters}, () => this.fetchPuzzles(1))            ;
        }
    }

    onRowClick(record){

        //Send to clipboard
        copy(record.pzl_export, {
            message: 'Press #{key} to copy',
            format: 'text/plain',
        })

        //Notify user
        message.info("Puzzle exported to clipboard");
    }

    /**
     * Fetch the decks for the requested page
     * - Will apply current filters
     * - Will apply current sorting
     * @param currentPage
     */
    fetchPuzzles(currentPage, sorter) {
        const filters = this.state.filters;
        this.setState({loading: true});
        axios.post('json/puzzles?page=' + currentPage, {
            filters,
            sorter,
        }).then(({data}) => {
            const state = {
                data: data.data,
                pagination: {
                    current: data.current_page,
                    pageSize: data.per_page,
                    total: data.total,
                },
                loading: false,
                filters,
            }

            this.setState(state)
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetchPuzzles(pagination.current, {field: sorter.field, order: sorter.order});
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

export default PuzzlesListTable;