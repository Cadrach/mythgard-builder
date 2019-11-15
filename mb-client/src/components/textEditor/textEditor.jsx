import React from "react";
import {EditorState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { cardDecorator, CardToolbarButton } from "./customOptionCard";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


/**
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * *********************************************************************************************************************
 * THE TEXT EDITOR
 */
class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        //Create starting state
        const content = this.props.content;
        this.state = {
            editorState: content ? EditorState.createWithContent(convertFromRaw(JSON.parse(content))):EditorState.createEmpty(),
        };

        //Binds
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
    }

    /**
     * Update state when EditorState changes
     * @param editorState
     */
    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });

        if (this.props.onTextChange) {
            this.props.onTextChange(editorState);
        }
    };

    /**
     * Render the Editor
     * @returns {*}
     */
    render() {
        const {editorState} = this.state;
        return (
            <Editor
                toolbar={{options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']}}
                ref={ref => this.editor = ref}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarCustomButtons={[<CardToolbarButton editor={this.editor}/>]}
                customDecorators={[cardDecorator]}
                onEditorStateChange={this.onEditorStateChange}
                {...this.props}
            />
        )
    }
}

export default TextEditor;
