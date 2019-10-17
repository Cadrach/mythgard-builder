import React from "react";
import { observer, inject } from "mobx-react";
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Row, Col, Affix, Layout, Rate, Button, Menu, Icon as AntIcon, Divider, List} from "antd";
import Deck from "../components/deck/deck";
import CardsList from "../components/cardsList/cardsList"
import constants from "../constants";
import FilterColor from "../components/filters/filterColor";
import FilterIcon from "../components/filters/filterIcon";
import Icon from 'react-fa';

import './stylesheets/deckBuilder.scss';

@inject('dictionary', 'deckStore')
@observer
export default class DeckBuilder extends React.Component {

    constructor(props){
        super(props);

        this.filters = {
            colors: Object.keys(constants.colors).map(c => c[0]),
            types: ['Creature', 'Spell', 'LaneEnchantment', 'Artifact']
        }

        this.state = {
            leftCollapsed: true,
            rightCollapsed: false,
            siderCollapsedWidth: 80,
            siderWidth: 300,
        }

        props.deckStore.fetchMyDecks();
    }

    onToggleSlider(collapsed, type){
        const state = {...this.state};
        state.leftCollapsed = !state.leftCollapsed;
        state.rightCollapsed = !state.rightCollapsed;
        this.setState(state);
    }

    onChangeFilter(type, key, value){
        value ? this.filters[type].push(key) : this.filters[type].splice(this.filters[type].indexOf(key), 1)
        this.props.dictionary.cards.applyFilters(this.filters);
    }

    onSelectDeck(deck){
        this.props.deckStore.selectDeck(deck);
        this.onToggleSlider();
    }

    render() {
        const {cards} = this.props.dictionary;
        const {myDecks, selectedDeck} = this.props.deckStore;
        const {leftCollapsed, rightCollapsed, siderCollapsedWidth, siderWidth} = this.state;
        const height = 'calc(100vh - 48px - 48px - 64px)';
        return (
            <Layout>

                {/*LEFT SIDER + MENU*/}
                <Layout.Sider
                    width={siderWidth + siderCollapsedWidth}
                    collapsible={true}
                    collapsed={leftCollapsed}
                    collapsedWidth={siderCollapsedWidth}
                    onCollapse={this.onToggleSlider.bind(this)}
                    >

                        <Menu className="menu" mode="inline" selectable={false} theme="dark">
                            <Menu.Item key="0"><AntIcon type="file-add" /><span>Create new Deck</span></Menu.Item>
                            <Menu.Item key="1"><AntIcon type="copy" /><span>Export</span></Menu.Item>
                            <Menu.Item key="2"><AntIcon type="import" /><span>Import</span></Menu.Item>
                            <Menu.Item key="3" onClick={this.onToggleSlider.bind(this)}><AntIcon type="unordered-list" /><span>My Decks</span><AntIcon type="down" style={{float: 'right', marginTop: 14}}/></Menu.Item>
                        </Menu>

                    { ! leftCollapsed ?
                        <PerfectScrollbar style={{height: 'calc(100vh - 64px - (48px * 4) - 48px)'}}>
                                <List
                                    itemLayout="horizontal"
                                    size="small"
                                    theme="dark"
                                    dataSource={myDecks}
                                    renderItem={deck =>
                                        <List.Item key={deck.id} onClick={() => this.onSelectDeck(deck)}>
                                            <span className={(!deck.id ? 'empty':'')+ ' ' + (deck===selectedDeck?'selected':'')}>
                                                &nbsp;&nbsp;&nbsp;{deck.id ? deck.name:<span><AntIcon type="plus-square"/> New Deck</span>}
                                            </span>
                                        </List.Item>
                                    }/>
                        </PerfectScrollbar>
                    :null}
                </Layout.Sider>

                {/*CARDS LIST + FOOTER */}
                <Layout style={{overflowY: 'hidden'}}>

                    <Layout.Content style={{height}}>
                        <Layout.Content style={{height}}>
                            <CardsList
                                cards={cards.filtered}
                                deckStore={this.props.deckStore}
                                shavedWidth={300 + 80}
                                shavedHeight={64+96}
                            />
                        </Layout.Content>
                    </Layout.Content>

                    <Layout.Footer style={{height: 96, padding: '30px 50px', background: 'rgba(0,0,0,0.01)'}}>
                        {Object.keys(constants.colors).map(key => (
                            <FilterColor key={key} color={key} onChange={(number) => this.onChangeFilter('colors', key[0], !!number)}/>
                        ))}
                        <Divider type="vertical"/>
                        <FilterIcon icon={<Icon name="male" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Creature', !!number)}/>
                        <FilterIcon icon={<Icon name="magic" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Spell', !!number)}/>
                        <FilterIcon icon={<Icon name="bookmark" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'LaneEnchantment', !!number)}/>
                        <FilterIcon icon={<Icon name="trophy" size="2x"/>} color="#000" onChange={(number) => this.onChangeFilter('types', 'Artifact', !!number)}/>
                    </Layout.Footer>
                </Layout>

                {/*RIGHT SIDER + DECK */}
                <Layout.Sider
                    width={siderWidth}
                    collapsible={true}
                    collapsed={rightCollapsed}
                    collapsedWidth={0}
                    onCollapse={this.onToggleSlider.bind(this)}

                    trigger={null}
                    theme="light"
                    style={{background: 'rgba(0,0,0,0.01)'}}
                >
                <Deck/>
                </Layout.Sider>
            </Layout>
        );
    }
}
