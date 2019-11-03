import React from "react";
import DeckLine from "./deckLine";
import { Scrollbars } from 'react-custom-scrollbars';
import css from 'dom-css';
import { SpringSystem, MathUtil } from 'rebound';

import './stylesheets/deckContent.scss';
import {inject, observer} from "mobx-react";
import PropTypes from "prop-types";

@inject('deckStore')
@observer
class DeckContent extends React.Component {

    constructor(props){
        super(props);
        this.references = {};
        this.handleSpringUpdate = this.handleSpringUpdate.bind(this);
    }

    componentDidMount() {
        //Mount the spring that is used to animate the scrollbar changes
        this.springSystem = new SpringSystem();
        this.spring = this.springSystem.createSpring();
        this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate });
    }

    componentWillUnmount() {
        //Remove the spring listeners
        this.springSystem.deregisterSpring(this.spring);
        this.springSystem.removeAllListeners();
        this.springSystem = undefined;
        this.spring.destroy();
        this.spring = undefined;
    }

    /**
     * Scroll the list to the top
     */
    scrollToTop() {
        const { scrollbars } = this.references;
        const scrollTop = scrollbars.getScrollTop();
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(0);
    }

    /**
     * Scroll the list to the bottom
     */
    scrollToBottom(){
        const { scrollbars } = this.references;
        const scrollTop = scrollbars.getScrollTop();
        const scrollHeight = this.references.scrollbars.getScrollHeight();
        this.spring.setCurrentValue(scrollTop).setAtRest();
        this.spring.setEndValue(scrollHeight);
    }

    /**
     * This is called to update the animation of the "spring" when moving the scrollbar by clicking
     * @param spring
     */
    handleSpringUpdate(spring) {
        const { scrollbars } = this.references;
        const val = spring.getCurrentValue();
        scrollbars.scrollTop(val);
    }

    /**
     * This manages the hide/show of the "more" indicator of the list, at the top and the bottom
     * It is called when the scrollbar changes state
     * @param values
     */
    handleScrollBarsUpdate(values) {
        const { shadowTop, shadowBottom } = this.references;
        const { scrollTop, scrollHeight, clientHeight } = values;
        const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20);
        const bottomScrollTop = scrollHeight - clientHeight;
        const shadowBottomOpacity = 1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20));
        css(shadowTop, { opacity: shadowTopOpacity });
        css(shadowBottom, { opacity: shadowBottomOpacity });
    }

    render(){
        const deck = this.props.deckStore.selectedDeck;

        const shadowTopStyle = {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 20,
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
        };
        const shadowBottomStyle = {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
        };

        return (
            <div style={{position: 'relative'}}>
                <Scrollbars
                    style={{height: this.props.height}}
                    onUpdate={this.handleScrollBarsUpdate.bind(this)}
                    ref={ref => this.references.scrollbars = ref}
                >
                    <div className="deck-content">
                        {deck.cards.map(card => <DeckLine key={card.id} item={card} count={card.count}/>)}
                    </div>
                </Scrollbars>
                <div ref={ref => this.references.shadowTop = ref} style={shadowTopStyle} onClick={this.scrollToTop.bind(this)}/>
                <div ref={ref => this.references.shadowBottom = ref} style={shadowBottomStyle} onClick={this.scrollToBottom.bind(this)}/>
            </div>
        )

    }

}

//Required props
DeckContent.propTypes = {
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
}

export default DeckContent;