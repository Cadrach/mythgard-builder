import React from "react";
import {Button, Layout, Icon as AntIcon, Modal} from "antd";

import './stylesheets/deckContent.scss';
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";
import TextArea from "antd/es/input/TextArea";

class DeckImportButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    render(){
        const deck = this.props.deck;

        console.log(deck)

        return (<div>
                <Modal title="Import cards"
                       visible={this.state.modalVisible}
                >
                    <TextArea></TextArea>
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