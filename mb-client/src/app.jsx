import React from "react";
// import { withRouter, NavLink } from 'react-router-dom'
import DevTools from "mobx-react-devtools";
import { Route, NavLink, useLocation  } from 'react-router-dom';

// import Header from "../components/header/header";
import { Layout, Menu, Breadcrumb, Icon, Affix } from 'antd';
const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

// Import Common Stylesheets
import "./stylesheets/imports.css";
import DeckBuilder from "./containers/deckBuilder";

const App = () => (
    <Layout>
        <Affix>
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[useLocation().pathname]}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="/"><NavLink to="/">Home</NavLink></Menu.Item>
                    <Menu.Item key="/deck-builder"><NavLink to="/deck-builder">My Decks</NavLink></Menu.Item>
                    <Menu.Item key="/cards"><NavLink to="/cards">My Cards</NavLink></Menu.Item>
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                </Menu>
            </Header>
        </Affix>
        <Layout style={{marginTop: 64}}>
            <div>
                <Route exact path="/deck-builder" component={DeckBuilder} />
            </div>
        </Layout>
    </Layout>
)
export default App;

