import React from "react";
// import { withRouter, NavLink } from 'react-router-dom'
import DevTools from "mobx-react-devtools";
import { Route, NavLink, useLocation  } from 'react-router-dom';

// import Header from "../components/header/header";
import { Layout, Menu, Breadcrumb, Icon, Affix } from 'antd';
const { Header, Content, Sider } = Layout;

// Import Common Stylesheets
import "./stylesheets/imports.css";
import DeckBuilder from "./containers/deckBuilder";
import MyCards from "./containers/myCards";
import DecksList from "./containers/decksList";

const App = () => (
    <Layout>
        <Affix>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%', paddingLeft: 0}}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[useLocation().pathname]}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="/">
                        <NavLink to="/">Home</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/decks-list">
                        <NavLink to="/decks-list">Decks</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/cards" style={{float: 'right'}}>
                        <NavLink to="/cards">My Cards</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/deck-builder" style={{float: 'right'}}>
                        <NavLink to="/deck-builder">My Decks</NavLink>
                    </Menu.Item>
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Header>
        </Affix>
        <Layout style={{marginTop: 64}}>
            <div>
                <Route exact path="/deck-builder" component={DeckBuilder} />
                <Route exact path="/cards" component={MyCards} />
                <Route exact path="/decks-list" component={DecksList} />
            </div>
        </Layout>
    </Layout>
)
export default App;

