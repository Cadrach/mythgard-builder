import React from "react";

// Stylesheet Imports
import "./stylesheets/card.css";
import {inject, observer} from "mobx-react";
import deckStore from "../../stores/deckStore";

@inject('deckStore')
class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {animate: false};
        this.card = this.props.data;

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    /**
     * Add card to our deck
     * @param e
     */
    handleClick = (e) => {
        if(this.props.deckStore.addCard(this.card)){
            this.setState({animate: true});
            setTimeout(() => this.setState({animate: false}), 500);
        }
    }

    render(){
        const {animate} = this.state;

        const card = <div id="card" style={{backgroundImage: 'url(images/cards/s/'+this.card.card_image+')'}}></div>;
        const animatedCard = React.cloneElement(card, {className: 'animated  fadeOutRight'})

        return (
            <div id="container" onClick={this.handleClick}>
                {animate ? animatedCard:null}
                {card}
                {this.props.deckStore.countCard(this.card)}
            </div>
        )
    }
}

export default Card;
