import React from "react";

// Stylesheet Imports
import "./card.scss";
import {inject} from "mobx-react";
import {Rate} from "antd";
import {Icon} from "react-fa/lib";


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {animatedCards: []};
        this.card = props.data;
        this.cardImage = <div className="card-image" style={{backgroundImage: 'url(images/cards/s/'+this.card.image+')'}}></div>;

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Add card to our deck
     * @param e
     */
    handleClick = (e) => {
        if(this.props.deck) {
            if (this.props.deck.addCard(this.card)) {
                this.addAnimatedCard('fadeOutRight');
            }
            else {
                this.addAnimatedCard('shake fast');
            }
        }
    }

    /**
     * Remove a card from our deck
     * @param e
     */
    handleRightClick = (e) => {
        if(this.props.deck){
            if(this.props.deck.removeCard(this.card)){
                this.addAnimatedCard('fadeInRight', true);
            }
            else{
                this.addAnimatedCard('shake fast');
            }
            e.preventDefault();
        }
    }

    /**
     * Create a copy of our card and animate it. Once animation done, remove it
     * @param animation
     * @param onBottom
     */
    addAnimatedCard = (animation, onBottom) => {
        const {animatedCards} = this.state;
        const newAnimatedCard = React.cloneElement(this.cardImage, {className: 'card-image animated ' + animation, key: _.uniqueId('acard_')});
        this.setState({animatedCards: onBottom ? [...animatedCards, newAnimatedCard]:[newAnimatedCard, ...animatedCards]});
        setTimeout(() => {
            const newAnimatedCards = [...this.state.animatedCards];
            newAnimatedCards.splice(newAnimatedCards.indexOf(newAnimatedCard), 1);
            this.setState({animatedCards: newAnimatedCards});
        }, 1000)
    }

    render(){
        const {animatedCards} = this.state;
        let rate;

        //Display number of cards (if deckStore provided)
        if(this.props.deck){
            rate = <div style={{textAlign:'center'}}>
                <Rate
                    disabled
                    value={this.props.deck.countCard(this.card)}
                    count={this.card.max_in_deck}
                    character={<Icon name="circle"/>}
                    style={{color: 'red'}}
                />
            </div>;
        }

        return (
            <div className="card-container-aspect-ratio" onClick={this.handleClick} onContextMenu={this.handleRightClick}>
                <div className={"card-container card-rarity-" + this.card.rarity}>
                    {this.cardImage}
                    {animatedCards.map(c => c)}
                    {rate ? rate : null}
                </div>
            </div>
        )
    }
}

export default Card;
