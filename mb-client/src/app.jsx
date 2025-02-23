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
import MyPuzzle from "./containers/myPuzzle";
import {Icon} from "react-fa/lib";
import Authenticate from "./containers/authenticate";
import Home from "./containers/home";
import PuzzlesList from "./containers/puzzlesList";

@inject('dictionary')
@observer
class App extends React.Component {

    render(){
        const rootPathName = '/' + this.props.location.pathname.split('/')[1];
        const {isConnected, isLoading} = this.props.dictionary;
        const styleIcon = {
            width: 32,
            marginRight: 5,
        }

        return (<Layout className="ant-layout-transparent">
            <Affix style={{zIndex: 200}}>
                <Header style={{position: 'fixed', width: '100%', paddingLeft: 0, paddingRight: 0}}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        selectedKeys={[rootPathName]}
                        style={{lineHeight: '64px', borderBottom: '1px solid rgba(255,255,255,.5)'}}
                    >
                        <Menu.Item key="/">
                            <NavLink to="/">
                                <img src="/images/logo-text.png" style={{...styleIcon, width:300}}/>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="/decks">
                            <NavLink to="/decks">
                                <img src="/images/icons/decks-2.png" style={styleIcon}/>
                                Decks
                            </NavLink>
                        </Menu.Item>
                        {isConnected && !isLoading ?
                            <Menu.Item key="/cards">
                                <NavLink to="/cards">
                                    <img src="/images/icons/my-cards-2.png" style={styleIcon}/>
                                    My Cards
                                </NavLink>
                            </Menu.Item>
                            :null}
                        {isConnected && !isLoading ?
                            <Menu.Item key="/deck-builder">
                                <NavLink to="/deck-builder">
                                    <img src="/images/icons/my-decks-2.png" style={styleIcon}/>
                                    My Decks
                                </NavLink>
                            </Menu.Item>
                            :null}
                        { !isLoading ?
                            <Menu.Item key="/puzzles">
                                <NavLink to="/puzzles">
                                    <Icon name="puzzle-piece" size="2x" style={{...styleIcon, position: 'relative', top:5}}/>
                                    Puzzles
                                </NavLink>
                            </Menu.Item>
                            :null}
                        { !isLoading ?
                            <Menu.Item key="/puzzle">
                                <NavLink to="/puzzle">
                                    <Icon name="puzzle-piece" size="2x" style={{...styleIcon, position: 'relative', top:5}}/>
                                    Puzzle Maker (Beta)
                                </NavLink>
                            </Menu.Item>
                            :null}
                        { ! isConnected && !isLoading ?
                            <Menu.Item key="/auth" style={{float: 'right'}}>
                                <NavLink to="/auth"><Icon name="sign-in"/> Login/Register</NavLink>
                            </Menu.Item>
                            :null}
                        { isConnected && !isLoading ?
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
                    <Route exact path="/puzzle/:id?" component={MyPuzzle}/>
                    <Route exact path="/puzzles" component={PuzzlesList}/>
                    <Route exact path="/" component={Home}/>
                </div>
            </Layout>
        </Layout>)
    }
}
export default withRouter(App);

