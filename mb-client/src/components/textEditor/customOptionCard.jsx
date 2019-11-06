import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { EditorState, Modifier, Entity } from 'draft-js';
import Select from 'react-select';
import { List, Map, Repeat } from 'immutable';
import Gem from "../gem/gem";


/**
 * **********************************************************************
 * **********************************************************************
 * **********************************************************************
 * ****************************** DECORATOR *****************************
 * **********************************************************************
 * **********************************************************************
 * **********************************************************************
 */
const styles = {
    placeholder: {
        display: 'inline-block',
        background: 'lightBlue',
        padding: '0 10px',
        borderRadius: 99
    },
};

@inject('dictionary')
@observer
class CardEditorComponent extends React.Component{
    render(){
        const meta = Entity.get(this.props.entityKey).getData();
        const card = this.props.dictionary.cards.cardById(meta.id);

        return (
            <span style={styles.placeholder}>
                <Gem string={card.gems}/>{card.name}
                <span style={{display: 'none'}}>{this.props.children}</span>
            </span>
        );
    }
}

export const cardDecorator = {
    strategy: findCardEditorComponents,
    component: CardEditorComponent,
};

function findCardEditorComponents(contentBlock, callback) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return (
            entityKey !== null &&
            Entity.get(entityKey).getType() === 'CARD'
        );
    }, callback);
}

/**
 * **********************************************************************
 * **********************************************************************
 * **********************************************************************
 * *************************** TOOLBAR BUTTON ***************************
 * **********************************************************************
 * **********************************************************************
 * **********************************************************************
 */
@inject('dictionary')
@observer
export class CardToolbarButton extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.state = {value: null}
    }

    onSelect(card){
        const { editorState, onChange } = this.props;
        const selection = editorState.getSelection();
        const currentContent = editorState.getCurrentContent();

        const entityKey = Entity.create('CARD', 'IMMUTABLE', {
            id: card.id,
            name_export: card.name_export,
        });
        const textWithEntity = Modifier.insertText(currentContent, selection, ' ', null, entityKey);

        onChange(EditorState.push(editorState, textWithEntity, 'insert-characters'))

        //Focus on editor after
        if(this.props.editor){
            setTimeout(this.props.editor.editor.focus, 200);
        }
    };

    render() {
        const cards = this.props.dictionary.cards.all;

        const styleSelect = {
            control: base => ({...base, width: 300, fontSize: 12}),
            container: base => ({...base, zIndex: 10, height: 36, position: 'relative', top: -4}),
        }

        return (
            <Select
                placeholder="Add a Card"
                options={cards}
                value={this.state.value}
                onChange={this.onSelect.bind(this)}
                getOptionValue={option => option.id}
                getOptionLabel={option => option.name}
                styles={styleSelect}
            />
        );
    }
}