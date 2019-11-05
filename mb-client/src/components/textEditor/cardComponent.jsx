import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { EditorState, Modifier, AtomicBlockUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';
import Gem from "../gem/gem";


@inject('dictionary')
@observer
export default class CardComponent extends Component {
    render(){
        const {block, contentState} = this.props;
        const card = this.props.dictionary.cards.cardById(block.text);
        console.log(card);
        return card ? <span><Gem string={card.gems}/>{card.name}</span>:null;
    }
}