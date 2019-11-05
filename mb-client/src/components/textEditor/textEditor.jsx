import React from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import Gem from "../gem/gem";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CustomOptionCard from "./customOptionCard";
import CustomOptionStar from "./customOptionStar";
import CardComponent from "./cardComponent";

const regexCard = /<\s*card[^>]*>(.*?)<\s*\/\s*card>/g;
const regexGems = /<\s*color[^>]*>(.*?)<\s*\/\s*color?>/g;

class TextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
        this.blockRendererFn = this.blockRendererFn.bind(this);
    }

    onEditorStateChange(editorState) {
        // const raw = convertToRaw(editorState.getCurrentContent());
        // console.log(raw);
        this.setState({
            editorState,
        });
    };

    findWithRegex(regex, contentBlock, callback) {
        const text = contentBlock.getText();
        let matchArr, start;
        while ((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            callback(start, start + matchArr[0].length, text);
        }
    }

    blockRendererFn(contentBlock){
        const type = contentBlock.getType();
        console.log(type);
        if(type === 'card'){
            return {
                component: CardComponent,
                editable: false,
            }
        }
    }

    render() {
        const { editorState } = this.state;
        // const customDecorators = [{
        //     //Cards decorator
        //     strategy: (contentBlock, callback, contentState) => this.findWithRegex(regexCard, contentBlock, callback),
        //     component: (props) => {
        //         console.log(props.decoratedText, regexCard.exec(props.decoratedText))
        //         return <div style={{color: 'red'}}>{props.children}</div>
        //     }
        // },{
        //     //Gems decorator
        //     strategy: (contentBlock, callback, contentState) => this.findWithRegex(regexGems, contentBlock, callback),
        //     component: (props) => {
        //         console.log(regexGems.exec(props.decoratedText));
        //         const match = regexGems.exec(props.decoratedText);
        //         const gems = match ? match[1]:null;
        //         return gems ? <Gem string={gems}>:null;
        //     }
        // }];
        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                // customDecorators={customDecorators}
                blockRendererFn={this.blockRendererFn}
                toolbarCustomButtons={[<CustomOptionCard/>, <CustomOptionStar/>]}
                onEditorStateChange={this.onEditorStateChange.bind(this)}
            />
        )
    }
}

export default TextEditor;
