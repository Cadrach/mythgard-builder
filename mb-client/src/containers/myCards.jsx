import React from "react";
import {Button, Layout, Icon as AntIcon, Typography} from "antd";
const {Text} = Typography;
import { observer, inject } from "mobx-react";
import CardsList from "../components/cardsList/cardsList"
import {Deck} from "../stores/deckStore";
import {toJS, observable} from "mobx";
import DeckImportButton from "../components/deck/deckImportButton";

@inject('dictionary', 'deckStore')
@observer
export default class MyCards extends React.Component {

    @observable deck = null;

    constructor(props){
        super(props);
        //Create a deck once we are connected
        const {dictionary} = this.props;
        dictionary.promise.then(() => {
            if(dictionary.isConnected){
                const userCards = dictionary.user.cards ? toJS(dictionary.user.cards):[];
                this.deck = Deck.create({id: 0, dck_cards: userCards}, {
                    cardStore: dictionary.cards
                });
            }
        })
    }

    /**
     * On click "save" we will save for the current user the cards configured
     */
    onClickSave(){
        this.props.dictionary.saveUserCards(toJS(this.deck.cards));
    }

    render() {
        const cards = this.props.dictionary.cards.all;
        const deck = this.deck;
        const deckName = deck ? deck.name:null; //fetch something on deck to observe it

        const explanation = <span style={{fontSize: 18}}>
            <b>To quickly import your cards you can use the following trick:</b>
            <ul style={{listStyleType: 'disc', paddingLeft: 30}}>
                <li style={{marginTop: 10}}>Open <b>Mythgard</b> and login on your account</li>
                <li style={{marginTop: 10}}><b>Create a new deck</b> and name it <Text code>All my Mythics & Rares</Text></li>
                <li style={{marginTop: 10}}>Add to this deck all your rares and all your mythics (Use <Text code>Shift + Right-Click</Text> to add them quickly)</li>
                <li style={{marginTop: 10}}><b>Export it</b>, save and close</li>
                <li style={{marginTop: 10}}>Come back here and <b>paste!</b></li>
                <li style={{marginTop: 10}}>Repeat with 2 other decks for your <Text code>Uncommons</Text> and <Text code>Commons</Text> (there is a limit of <Text type="danger">200 cards per deck</Text> in Mythgard so you might have to create more than 1 per rarity)</li>
            </ul>
            <b>It is a small hassle but once it is done you will be able to have the actual cost of a deck based on your cards when you browse all decks. <br/><br/>You can also ask for an export feature to Rhino developers :-)</b>
            <br/><br/>
        </span>

        return (
            <Layout className="ant-layout-transparent">
                {deck ?
                    <Layout.Header className="header" style={{height: 88}}>
                        <span style={{float: 'right'}}>
                            <DeckImportButton deck={deck} buttonProps={{}} description={explanation} style={{display: 'inline'}}>
                                <Button size="large" type="primary"><AntIcon type="import"/> Import all your cards!</Button>
                            </DeckImportButton>
                            &nbsp;
                            <Button type="primary" size="large" onClick={this.onClickSave.bind(this)}><AntIcon type="save"/>&nbsp;Save</Button>
                        </span>
                    </Layout.Header>
                :null}
                <CardsList cards={cards} deck={deck} shavedHeight={64+88}/>
            </Layout>
        );
    }
}
