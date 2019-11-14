import React from "react";
import { convertToRaw } from 'draft-js';
import {inject, observer} from "mobx-react";
import {Button, Drawer} from "antd";
import DeckForm from "./deckForm";
import TextEditor from "../textEditor/textEditor";

import './stylesheets/deckDrawer.scss';

@inject('dictionary', 'deckStore')
@observer
export default class DeckDrawer extends React.Component {

    onConfirm(){
        const values = this.formRef.props.form.getFieldsValue();
        const dck_description = this.editorState ? JSON.stringify(convertToRaw(this.editorState.getCurrentContent())) : null;
        this.props.deckStore.selectedDeck.setFormValues({...values, dck_description});

        this.props.onClose();
    }

    onEditorStateChange(editorState){
        this.editorState = editorState;
    }

    render(){
        const {selectedDeck} = this.props.deckStore;
        const {visible, onClose} = this.props;
        const content = selectedDeck.dck_description;

        //Title component
        const drawerTitle = <div>
            {selectedDeck.dck_name}
            <div style={{float: 'right', marginTop: -9}}>
                <Button type="primary" size="large" icon="check-circle" onClick={this.onConfirm.bind(this)}>Confirm</Button>
                &nbsp;
                <Button type="danger" size="large" icon="close-circle" onClick={onClose}>Cancel</Button>
            </div>
        </div>

        //Our Drawer
        return <Drawer
                className="deck-drawer"
                title={drawerTitle}
                placement="top"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                visible={visible}
                height="90%"
                onClose={onClose}
        >
            <DeckForm wrappedComponentRef={(ref) => this.formRef = ref}/>
            <TextEditor className="" onTextChange={this.onEditorStateChange.bind(this)} content={content}/>
        </Drawer>
    }

}