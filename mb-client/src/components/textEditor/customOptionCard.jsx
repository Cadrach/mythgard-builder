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

    onSelect(card){
        //Create new content state with our card
        const { editorState, onChange } = this.props;
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            "[[" + card.name_export + "]]",
            editorState.getCurrentInlineStyle(),
        );

        //Apply change to editorState
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));

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