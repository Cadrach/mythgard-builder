import React from "react";
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Gem from "../gem/gem";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomOptionCard from "./customOptionCard";

const regexCard = /<\s*card[^>]*>(.*?)<\s*\/\s*card>/g;
const regexGems = /<\s*color[^>]*>(.*?)<\s*\/\s*color?>/g;

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

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
                ref={ref => this.editor = ref}
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                toolbarCustomButtons={[<CustomOptionCard editor={this.editor}/>,]}
                onEditorStateChange={this.onEditorStateChange}
                {...this.props}
            />
        )
    }
}

export default TextEditor;
