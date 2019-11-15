import React from "react";
import { observer, inject } from "mobx-react";
import {withRouter} from "react-router-dom";
import {Layout, Button, Menu, Icon as AntIcon, Divider, List, Input} from "antd";
import DeckContent from "../components/deck/deckContent";
import DeckHeader from "../components/deck/deckHeader";
import CardsList from "../components/cardsList/cardsList"
import constants from "../constants";
import FilterColor from "../components/filters/filterColor";
import FilterIcon from "../components/filters/filterIcon";
import Icon from 'react-fa';
import _ from 'lodash';
import Select, {components} from 'react-select';

import './stylesheets/deckBuilder.scss';
import DeckDrawer from "../components/deck/deckDrawer";
import {Scrollbars} from "react-custom-scrollbars";
import DeckImportButton from "../components/deck/deckImportButton";
import Gem from "../components/gem/gem";

const SingleValueWithImage = ({ children, ...props }) => (
    <components.SingleValue {...props}>
        {props.data.icon ? <img src={'/images/' + props.data.icon} style={{width: 32, marginRight: 6}}/>:null} {children}
    </components.SingleValue>
);

@inject('dictionary', 'deckStore')
@observer
class DeckBuilder extends React.Component {

    constructor(props){
        super(props);

        //Original filters
        this.defaultFilters = {
            colors: Object.keys(constants.colors).map(c => c[0]),
            types: ['Creature', 'Spell', 'LaneEnchantment', 'Artifact'],
            search: '',
        }

        //Current filters
        this.filters = _.cloneDeep(this.defaultFilters);

        //Our default state
        this.state = {
            leftCollapsed: true,
            rightCollapsed: false,
            siderCollapsedWidth: 80,
            siderWidth: 300,
            deckDrawerVisible: false,
        }

        //Fetch our decks
        props.dictionary.promise.then(() => {
            props.deckStore.fetchMyDecks().then(() => {
                if(props.match.params.id){
                    props.deckStore.selectDeckById(props.match.params.id);
                }
            });
        })
    }

    /**
     * Toggle the left/right sliders
     * @param collapsed
     * @param type
     */
    onToggleSlider(collapsed, type){
        const state = {...this.state};
        state.leftCollapsed = !state.leftCollapsed;
        state.rightCollapsed = !state.rightCollapsed;
        this.setState(state);
    }

    /**
     * Change a filters (will update the card list)
     * @param type
     * @param key
     */
    onChangeFilter(type, key){
        //Are the filters of this type currently all toggle ON?
        const allActive = this.defaultFilters[type].length == this.filters[type].length;
        const isActive = this.filters[type].indexOf(key) >= 0;
        if(allActive){
            //If we are toggling the first filter, then simply toggle off everything else
            this.filters[type] = [key];
        }
        else if(this.filters[type].length == 1 && isActive){
            //Toggling off the last one: toggle on everything
            this.filters[type] = _.cloneDeep(this.defaultFilters[type]);
        }
        else{
            //Otherwise it is a classic toggle on/off
            !isActive ? this.filters[type].push(key) : this.filters[type].splice(this.filters[type].indexOf(key), 1)
        }
        this.props.dictionary.cards.applyFilters(this.filters);
    }

    onChangeFilterSearch(event){
        this.filters.search = event.target.value;
        this.props.dictionary.cards.applyFilters(this.filters);
    }

    /**
     * Select a specific deck
     * @param deck
     */
    onSelectDeck(deck){
        this.props.deckStore.selectDeck(deck);
        this.onToggleSlider();
    };

    /**
     * Export the deck when clicking on "Export" menu button
     */
    onClickExport(){
        this.props.deckStore.selectedDeck.export();
    }

    /**
     * Toggle visibility of the drawer containing the form
     * @param value
     */
    setDrawerVisible(value){
        this.setState({deckDrawerVisible: value});
    };

    render() {
        const {cards, paths, powers} = this.props.dictionary;
        const {myDecks, selectedDeck} = this.props.deckStore;
        const {leftCollapsed, rightCollapsed, siderCollapsedWidth, siderWidth, deckDrawerVisible} = this.state;
        const height = 'calc(100vh - 80px - 80px - 64px)';
        const styleSelect = {...constants.styleSelect};
        return (
            <Layout>
                {/* DRAWER SHOWING DESCRIPTION FORM */}
                <DeckDrawer visible={deckDrawerVisible} onClose={this.setDrawerVisible.bind(this, false)}/>

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
                            <Menu.Item key="1" onClick={this.onClickExport.bind(this)}><AntIcon type="copy" /><span>Export</span></Menu.Item>
                            <Menu.Item key="2">
                                <DeckImportButton deck={selectedDeck} reset={true} description="Paste your deck in the input below">
                                    <AntIcon type="import" /><span>Import</span>
                                </DeckImportButton>
                            </Menu.Item>
                            <Menu.Item key="3" onClick={this.onToggleSlider.bind(this)}><AntIcon type="unordered-list" /><span>My Decks</span><AntIcon type="down" style={{float: 'right', marginTop: 14}}/></Menu.Item>
                        </Menu>

                    { ! leftCollapsed ?
                        <Scrollbars style={{ height: 'calc(100vh - 64px - (48px * 4) - 48px)' }}>
                                <List
                                    itemLayout="horizontal"
                                    size="small"
                                    theme="dark"
                                    dataSource={myDecks}
                                    renderItem={deck =>
                                        <List.Item key={deck.id} onClick={() => this.onSelectDeck(deck)}>
                                            <span className={(!deck.id ? 'empty':'')+ ' ' + (deck===selectedDeck?'selected':'')}>
                                                &nbsp;&nbsp;&nbsp;
                                                {
                                                    deck.id ?
                                                    <span><Gem string={deck.colors}/>{deck.name}</span>
                                                    :
                                                    <span><AntIcon type="plus-square"/> New Deck</span>
                                                }
                                            </span>
                                        </List.Item>
                                    }/>
                        </Scrollbars>
                    :null}
                </Layout.Sider>

                {/*CARDS LIST + FOOTER */}
                <Layout className="with-background" style={{overflowY: 'hidden'}}>
                    <Layout.Header className="header" style={{height: 80}}>
                        {selectedDeck.dck_name}
                    </Layout.Header>

                    <Layout.Content style={{height}}>
                        <Layout.Content style={{height}}>
                            <CardsList
                                cards={cards.filtered}
                                deck={this.props.deckStore.selectedDeck}
                                shavedWidth={300 + 80}
                                shavedHeight={64+80+80}
                            />
                        </Layout.Content>
                    </Layout.Content>

                    <Layout.Footer className="footer" style={{height: 80}}>
                        {Object.keys(constants.colors).map(key => (
                            <FilterColor key={key} color={key} onChange={() => this.onChangeFilter('colors', key[0])}  value={this.filters.colors.indexOf(key[0])>=0 ? 1:0}/>
                        ))}

                        <Divider type="vertical"/>

                        <FilterIcon icon={<Icon name="male" size="2x"/>} color="#fff" onChange={() => this.onChangeFilter('types', 'Creature')} value={this.filters.types.indexOf('Creature')>=0 ? 1:0}/>
                        <FilterIcon icon={<Icon name="magic" size="2x"/>} color="#fff" onChange={() => this.onChangeFilter('types', 'Spell')} value={this.filters.types.indexOf('Spell')>=0 ? 1:0}/>
                        <FilterIcon icon={<Icon name="bookmark" size="2x"/>} color="#fff" onChange={() => this.onChangeFilter('types', 'LaneEnchantment')} value={this.filters.types.indexOf('LaneEnchantment')>=0 ? 1:0}/>
                        <FilterIcon icon={<Icon name="trophy" size="2x"/>} color="#fff" onChange={() => this.onChangeFilter('types', 'Artifact')} value={this.filters.types.indexOf('Artifact')>=0 ? 1:0}/>

                        <Divider type="vertical"/>

                        <Input placeholder="Search..." size="large" style={{width: 300, position: 'relative', top:-7}} onChange={(value) => this.onChangeFilterSearch(value)}/>
                    </Layout.Footer>
                </Layout>

                {/*RIGHT SIDER + DECK */}
                <Layout.Sider
                    className="with-background"
                    width={siderWidth}
                    collapsible={true}
                    collapsed={rightCollapsed}
                    collapsedWidth={0}
                    onCollapse={this.onToggleSlider.bind(this)}

                    trigger={null}
                    theme="light"
                    style={{background: 'rgba(0,0,0,0.01)'}}
                >
                    <div style={{padding: 20, textAlign: 'right'}}>
                        <Button type="primary" icon="form" size="large" onClick={this.setDrawerVisible.bind(this, true)} style={{marginRight: 10}}> Configure</Button>
                        <Button type="primary" icon="save" size="large" disabled={selectedDeck.saved} onClick={this.props.deckStore.saveSelectedDeck}>Save</Button>
                    </div>
                    <DeckHeader withoutPowerAndPath/>
                    <div style={{height: 100, padding: '0 10px'}}>
                        <div style={{marginBottom: 10}}>
                            <Select
                                placeholder="Select Path..."
                                options={paths}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                styles={styleSelect}
                                value ={selectedDeck.ide_path ? selectedDeck.path:null}
                                onChange={({id}) => selectedDeck.setFormValues({ide_path: id})}
                                components={{
                                    SingleValue: SingleValueWithImage
                                }}
                            />
                        </div>
                        <div style={{marginBottom: 10}}>
                            <Select
                                placeholder="Select Power..."
                                options={powers}
                                getOptionValue={option => option.id}
                                getOptionLabel={option => option.name}
                                styles={styleSelect}
                                value={selectedDeck.ide_power ? selectedDeck.power:null}
                                onChange={({id}) => selectedDeck.setFormValues({ide_power: id})}
                                components={{
                                    SingleValue: SingleValueWithImage
                                }}
                            />
                        </div>
                    </div>
                    <DeckContent height="calc(100vh - 64px - 80px - 48px - 50px*2 - 80px)"/>
                </Layout.Sider>
            </Layout>
        );
    }
}

export default withRouter(DeckBuilder);