import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { EditorState, Modifier, AtomicBlockUtils, ContentBlock, ContentState, genKey } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Select from 'react-select';


@inject('dictionary')
@observer
export default class CustomOptionCard extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        editorState: PropTypes.object,
    };

    constructor(props){
        super(props);

        this.state = {value: null}
    }

    onSelectDEPRECATED(card){
        //Unselect the card
        this.setState({value: null});

        //
        const { editorState, onChange } = this.props;

        //Add the card
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "card",
            "IMMUTABLE",
            { card }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
            "create-entity"
        );
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
    }

    addStar(){
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            '⭐',
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };

    onSelect(card){
        const { editorState, onChange } = this.props;
        const newBlock = new ContentBlock({
            key: genKey(),
            type: 'card',
            text: card.id + '',
        })

        const contentState = editorState.getCurrentContent()
        const newBlockMap = contentState.getBlockMap().set(newBlock.key, newBlock)

        onChange(EditorState.push(
            editorState,
            ContentState
                .createFromBlockArray(newBlockMap.toArray())
                .set('selectionBefore', contentState.getSelectionBefore())
                .set('selectionAfter', contentState.getSelectionAfter())
        ))
    };

    render() {
        const cards = this.props.dictionary.cards.all;

        const styleSelect = {
            control: base => ({...base, width: 300 })
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