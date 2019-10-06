import React from "react";

// Stylesheet Imports
import "./stylesheets/card.css";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {animate: false};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        this.setState({animate: true});
        setTimeout(() => this.setState({animate: false}), 500);
    }

    render(){
        const {animate} = this.state;

        const card = <div id="card" style={{backgroundImage: 'url(images/cards/s/'+this.props.data.card_image+')'}}></div>;
        const animatedCard = React.cloneElement(card, {className: 'animated  fadeOutRight'})

        return (
            <div id="container" onClick={this.handleClick}>
                {card}
                {animate ? animatedCard:null}
            </div>
        )
    }
}

export default Card;
