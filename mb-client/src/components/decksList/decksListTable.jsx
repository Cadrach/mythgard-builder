import React from "react";
import {inject, observer} from "mobx-react";
import axios from '../../axios';
import { Table } from "antd";

const columns = [
    {
        title: 'Name',
        dataIndex: 'dck_name',
        sorter: true,
        width: '20%',
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

export default class DecksListTable extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            data: [],
            pagination: {},
            loading: false,
        }

    }

    fetchDecks(currentPage) {
        this.setState({loading: true});
        axios.get('json/decks?page=' + currentPage).then(({data}) => {
            this.setState({
                data: data.data,
                pagination: {
                    current: data.current_page,
                    pageSize: data.per_page,
                    total: data.total,
                },
                loading: false,
            })
        })
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        this.fetchDecks(pagination.current);
    };

    componentDidMount(){
        this.fetchDecks(1);
    }

    render(){
        const { data, loading, pagination } = this.state;
        console.log(pagination);
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