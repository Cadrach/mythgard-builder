import React from "react";

// Stylesheet Imports
import "./stylesheets/card.css";
import {inject, observer} from "mobx-react";
import deckStore from "../../stores/deckStore";

@inject('deckStore')
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {animatedCards: []};
        this.card = this.props.data;
        this.cardElement = <div id="card" style={{backgroundImage: 'url(images/cards/s/'+this.card.card_image+')'}}></div>;

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Add card to our deck
     * @param e
     */
    handleClick = (e) => {
        if(this.props.deckStore.addCard(this.card)){
            this.addAnimatedCard('fadeOutRight');
        }
    }

    /**
     * Remove a card from our deck
     * @param e
     */
    handleRightClick = (e) => {
        if(this.props.deckStore.removeCard(this.card)){
            this.addAnimatedCard('fadeInRight', true);
        }
        e.preventDefault();
    }

    /**
     * Create a copy of our card and animate it. Once animation done, remove it
     * @param animation
     * @param onBottom
     */
    addAnimatedCard = (animation, onBottom) => {
        const {animatedCards} = this.state;
        const newAnimatedCard = React.cloneElement(this.cardElement, {className: 'animated ' + animation, key: _.uniqueId('acard_')});
        this.setState({animatedCards: onBottom ? [...animatedCards, newAnimatedCard]:[newAnimatedCard, ...animatedCards]});
        setTimeout(() => {
            const newAnimatedCards = [...this.state.animatedCards];
            newAnimatedCards.splice(newAnimatedCards.indexOf(newAnimatedCard), 1);
            this.setState({animatedCards: newAnimatedCards});
        }, 1000)
    }

    render(){
        const {animatedCards} = this.state;

        return (
            <div id="container" onClick={this.handleClick} onContextMenu={this.handleRightClick}>
                {animatedCards.map(c => c)}
                {this.cardElement}
                {this.props.deckStore.countCard(this.card)}
            </div>
        )
    }
}

export default Card;
