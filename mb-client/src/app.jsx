import React from "react";
import DevTools from "mobx-react-devtools";
import { Route, NavLink, withRouter  } from 'react-router-dom';
import {inject, observer} from "mobx-react";

// import Header from "../components/header/header";
import { Layout, Menu, Affix } from 'antd';
const { Header, Content, Sider } = Layout;

// Import Common Stylesheets
import "./stylesheets/imports.css";
import DeckBuilder from "./containers/deckBuilder";
import MyCards from "./containers/myCards";
import DecksList from "./containers/decksList";
import DeckDetail from "./containers/deckDetail";
import {Icon} from "react-fa/lib";
import Authenticate from "./containers/authenticate";
import Home from "./containers/home";

@inject('dictionary')
@observer
class App extends React.Component {

    render(){
        const rootPathName = '/' + this.props.location.pathname.split('/')[1];
        const {isConnected} = this.props.dictionary;

        return (<Layout className="ant-layout-transparent">
            <Affix>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', paddingLeft: 0, paddingRight: 0}}>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[rootPathName]}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="/">
                            <NavLink to="/">Home</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/decks">
                            <NavLink to="/decks">Decks</NavLink>
                        </Menu.Item>
                        {isConnected ?
                            <Menu.Item key="/cards">
                                <NavLink to="/cards">My Cards</NavLink>
                            </Menu.Item>
                            :null}
                        {isConnected ?
                            <Menu.Item key="/deck-builder">
                                <NavLink to="/deck-builder">My Decks</NavLink>
                            </Menu.Item>
                            :null}
                        { ! isConnected ?
                            <Menu.Item key="/auth" style={{float: 'right'}}>
                                <NavLink to="/auth"><Icon name="sign-in"/> Login/Register</NavLink>
                            </Menu.Item>
                            :null}
                        {isConnected ?
                            <Menu.SubMenu title={<div><Icon name="caret-down"/> {this.props.dictionary.user.name}</div>} style={{float: 'right'}}>
                                {/*<Menu.Item key="logout"><Icon name="sign-out"/> Logout</Menu.Item>*/}
                                <Menu.Item key="logout"><a href={process.env.REACT_APP_SERVER_ROOT + 'logout'}><Icon name="sign-out"/> Logout</a></Menu.Item>
                            </Menu.SubMenu>
                            :null}
                    </Menu>
                </Header>
            </Affix>
            <Layout className="ant-layout-transparent" style={{marginTop: 64}}>
                <div>
                    <Route exact path="/deck-builder/:id?" component={DeckBuilder}/>
                    <Route exact path="/cards" component={MyCards}/>
                    <Route exact path="/decks" component={DecksList}/>
                    <Route exact path="/decks/:id" component={DeckDetail}/>
                    <Route exact path="/auth" component={Authenticate}/>
                    <Route exact path="/" component={Home}/>
                </div>
            </Layout>
        </Layout>)
    }
}
export default withRouter(App);

