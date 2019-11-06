import React from "react";
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './stylesheets/textEditorReadonly.scss';
import TextEditor from "./textEditor";

export default class TextEditorReadonly extends React.Component {
    /**
     * Render the Editor
     * @returns {*}
     */
    render() {
        const editorState = this.props.content ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.content))):EditorState.createEmpty();
        return (
            <div className="texteditor-readonly">
                <TextEditor readOnly={true} toolbarHidden={true} editorState={editorState}/>
            </div>
        )
    }
}