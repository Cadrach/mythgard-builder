import React from "react";
import {inject, observer} from "mobx-react";
import {Button, Drawer} from "antd";
import DeckForm from "./deckForm";

@inject('dictionary', 'deckStore')
@observer
export default class DeckDrawer extends React.Component {

    onConfirm(){
        const values = this.formRef.props.form.getFieldsValue();
        this.props.deckStore.selectedDeck.setFormValues(values);
        console.log(values)
        this.props.onClose();
    }

    render(){
        const {selectedDeck} = this.props.deckStore;
        const {visible, onClose} = this.props;

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
        return <Drawer title={drawerTitle}
                placement="top"
                closable={false}
                maskClosable={false}
                destroyOnClose={true}
                visible={visible}
                height="90%"
                onClose={onClose}
        >
            <DeckForm wrappedComponentRef={(ref) => this.formRef = ref}/>
        </Drawer>
    }

}