import React from "react";
import {Button, Layout, Icon as AntIcon, Modal} from "antd";

import './stylesheets/deckContent.scss';
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";

@inject('dictionary')
@observer
class DeckImportButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }

        //Binds
        this.onPaste = this.onPaste.bind(this);
    }

    onPaste(event){
        const cardStore = this.props.dictionary.cards;
        const text = event.clipboardData.getData('text/plain');
        const regex = /([0-9]) (.*)/g
        const values = {
            dck_cards: [],
        };
        text.split("\n").forEach((string) => {
            const line = string.trim();
            if(line.search('name: ') === 0){
                values.dck_name = line.substring(line.search('name: '));
            }
            else if(line.search('power: ') === 0){
                console.log(line);
            }
            else if(line.search('path: ') === 0){
                console.log(line);
            }
            else{
                regex.lastIndex = 0;
                const match = regex.exec(line);
                if(match && match[1] && match[2]){

                    console.log(match[2], cardStore.cardByName(match[2]))
                }
            }
        })
    }

    render(){
        const deck = this.props.deck;

        return (<div>
                <Modal title="Import cards"
                       visible={this.state.modalVisible}
                >
                    <TextArea onPaste={this.onPaste}></TextArea>
                </Modal>
                <Button onClick={() => this.setState({modalVisible: true})}><AntIcon type="import"/> Import</Button>
            </div>
        )

    }

}

//Required props
DeckImportButton.propTypes = {
    // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default DeckImportButton;