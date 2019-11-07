import React from "react";
import {Button, notification, Modal} from "antd";

import './stylesheets/deckContent.scss';
import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
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

    /**
     * This will trigger when pasting to the textarea
     * It will read clipboard and update the deck
     * @param event
     */
    onPaste(event){
        const cardStore = this.props.dictionary.cards;
        const text = event.clipboardData.getData('text/plain');
        const regex = /^([0-9]) (.*)/g
        const values = {
            dck_cards: [...toJS(this.props.deck.dck_cards)],
        };
        const unidentified = [];
        const dictionary = this.props.dictionary;
        const lineIgnored = (line) => unidentified.push(<span>Line ignored: <b>{line}</b></span>);

        text.split("\n").forEach((string) => {
            const line = string.trim();
            if( ! line){
                //Ignore empty lines
                return;
            }
            else if(line.search('name: ') === 0){
                //Update the name of the deck
                values.dck_name = line.substring('name: '.length);
            }
            else if(line.search('power: ') === 0){
                const power = line.substring('power: '.length);
                const found = _.find(dictionary.powers, {name: power});
                if(found){
                    values.ide_power = found.id;
                }
                else{
                    lineIgnored(line);
                }
            }
            else if(line.search('path: ') === 0){
                const path = line.substring('path: '.length);
                const found = _.find(dictionary.paths, {name: path});
                if(found){
                    values.ide_path = found.id;
                }
                else{
                    lineIgnored(line);
                }
            }
            else{
                //Add a card to the deck
                regex.lastIndex = 0;// reset pointer or regex
                const match = regex.exec(line);

                if(match && match[1] && match[2]){
                    //If we have a match
                    const card = cardStore.cardByName(match[2]);
                    if(card){
                        //If we find the card, then either add it or update existing
                        const count = parseInt(match[1]);
                        const found = _.find(values.dck_cards, {id: card.id});

                        if(found){
                            //Update existing card in deck
                            found.count = count;
                        }
                        else{
                            //Add this card to the deck
                            values.dck_cards.push({id: card.id, count});
                        }
                    }
                    else{
                        //Card not found: signal user
                        unidentified.push(<span>Cannot identify card: <b>{match[2]}</b></span>);
                    }
                }
                else{
                    lineIgnored(line);
                }
            }
        })

        //Show error messages, if any
        if(unidentified.length){
            notification.warning({
                message: <ul>
                    {unidentified.map((u,k) => <li key={k}>{u}</li>)}
                </ul>,
                duration: 0,
            })
        }

        //Apply the values to our deck
        this.props.deck.setFormValues(values);

        //Finally, hide modal
        this.setState({modalVisible: false});
    }

    render(){
        const {children, description, buttonProps} = this.props;
        return (
            <span>
                <Modal title="Import cards"
                       visible={this.state.modalVisible}
                       footer={null}
                       width={600}
                       onCancel={() => this.setState({modalVisible:false})}
                >
                    {description}
                    <TextArea ref={ref=>ref?ref.focus():null} onPaste={this.onPaste} placeholder="Paste your deck here" style={{minHeight: 100}}></TextArea>
                </Modal>
                <Button onClick={() => this.setState({modalVisible: true})} {...buttonProps}>
                    {children}
                </Button>
            </span>
        )

    }

}

//Required props
DeckImportButton.propTypes = {
    // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default DeckImportButton;