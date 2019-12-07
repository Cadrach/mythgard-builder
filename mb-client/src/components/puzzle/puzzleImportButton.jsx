import React from "react";
import {Button, notification, Modal} from "antd";

import {inject, observer} from "mobx-react";
import {toJS} from "mobx";
import {Input} from "antd";
import {playerDefaults} from "./puzzleExample";

@inject('dictionary')
@observer
class PuzzleImportButton extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            modalVisible: false,
        }

        //Binds
        this.onPaste = this.onPaste.bind(this);
    }

    componentDidMount() {
        // this.props.dictionary.promise.then(() => this.onPaste())
    }

    /**
     * This will trigger when pasting to the textarea
     * It will read clipboard and update the deck
     * @param event
     */
    onPaste(event){
        const cardStore = this.props.dictionary.cards;
        const text = event.clipboardData.getData('text/plain');
        const regex = /^P([1-2]) (.*):(.*)/ig
        const unidentified = [];
        const dictionary = this.props.dictionary;

        const result = {
            p1: _.cloneDeep(playerDefaults),
            p2: _.cloneDeep(playerDefaults),
        };

        text.split("\n").forEach((string) => {
            const line = string.trim();
            regex.lastIndex = 0;// reset pointer or regex
            const match = regex.exec(line);

            if(match === null){
                return;
            }

            const playerNumber = match[1];
            const player = "p" + playerNumber;
            const key = match[2].trim().toLowerCase();
            const value = match[3].trim().toLowerCase();

            //console.log(player, key, value);

            if(key == 'name'){
                result[player][key] = match[3]; //keep case
            }
            else if(['gems', 'life', 'mana'].indexOf(key) >= 0){
                result[player][key] = value;
            }
            else if(key == 'burn'){
                result[player][key] = value == 'true';
            }
            else if(key == 'path'){
                const found = _.find(dictionary.paths, (v) => value == v.name.toLowerCase());
                if(found){result[player][key] = toJS(found);}
            }
            else if(key == 'power'){
                const found = _.find(dictionary.powers, (v) => value == v.name.toLowerCase());
                if(found){result[player][key] = toJS(found);}
            }
            else if(['hand', 'deck', 'boneyard', 'artifacts'].indexOf(key) >= 0){
                value.split(";").forEach((cName) => {
                    if( ! cName.trim()){return}
                    const card = cardStore.cardByName(cName.trim());
                    if(card){
                        result[player][key].push(card);
                    }
                    else{
                        unidentified.push(<span>Cannot identify Player {playerNumber} {key} card: <b>{cName}</b></span>);
                    }
                })
            }
            else if(key.search('lane') === 0){
                const matchKey = /lane ([1-7])/.exec(key);
                if(matchKey){
                    const laneNumber = matchKey[1];
                    value.split(";").forEach((cName) => {
                        if( ! cName.trim()){return}

                        const card = cardStore.cardByName(cName.trim());
                        if(card){
                            if(card.type == 'Creature') result[player].lane[laneNumber].creature = card;
                            else if(card.type == 'LaneEnchantment') result[player].lane[laneNumber].enchant = card;
                        }
                        else{
                            //Card not found: signal user
                            unidentified.push(<span>Cannot identify Player {playerNumber} {key} card: <b>{cName}</b></span>);
                        }
                    })
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
        // this.props.deck.setFormValues(values);

        this.props.onImport(result);

        //Finally, hide modal
        this.setState({modalVisible: false});
    }

    render(){
        const {children, description, buttonProps} = this.props;
        return (
            <div style={this.props.style}>
                <Modal title="Import Puzzle"
                       visible={this.state.modalVisible}
                       footer={null}
                       width={600}
                       onCancel={() => this.setState({modalVisible:false})}
                >
                    {description}
                    <Input.TextArea ref={ref=>ref?ref.focus():null} value='' onPaste={this.onPaste} placeholder="Paste your puzzle here" style={{minHeight: 100}}></Input.TextArea>
                </Modal>
                <span onClick={() => this.setState({modalVisible: true})}>
                    {children}
                </span>
            </div>
        )

    }

}

//Required props
PuzzleImportButton.propTypes = {
    // height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default PuzzleImportButton;