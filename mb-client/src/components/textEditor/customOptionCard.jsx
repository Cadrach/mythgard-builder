import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import PropTypes from 'prop-types';
import { EditorState, Modifier, Entity } from 'draft-js';
import Select from 'react-select';
import Gem from "../gem/gem";
import constants from "../../constants";
import {Popover} from "antd";
import CardPopover from "../card/cardPopover";
import {OptionCard} from "../decksList/decksListFilters";


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
    card: {
        display: 'inline-block',
        padding: '0 6px',
        borderRadius: 99,
        textTransform: 'capitalize',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    gem: {
    }
};

@inject('dictionary')
@observer
class CardEditorComponent extends React.Component{
    render(){
        const meta = Entity.get(this.props.entityKey).getData();

        const card = this.props.dictionary.cards.cardById(meta.id);

        const cardStyle = {...styles.card,
            border: '2px solid '+constants.gems[card.gems[0]],
            background: '#666',
            color: '#fff',
            paddingRight: 8,
            lineHeight: '12px',
            height: 22,
        }

        const rarityStyle = {
            background: constants.rarities[card.rarity],
            width: 10,
            height: 18,
            position: 'relative',
            left: 8,
            top: -2,
            display: 'inline-block',
            border: '1px solid rgba(255,255,255,.25)',
            borderTopRightRadius: 99,
            borderBottomRightRadius: 99,
        }

        return (
            <CardPopover card={card}>
                <span style={cardStyle}>
                    <Gem string={card.gems} styleGem={styles.gem}/>
                    {card.name}
                    <span style={{display: 'none'}}>{this.props.children}</span>
                    <span style={rarityStyle}>&nbsp;</span>
                </span>
            </CardPopover>
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
        const textWithEntity = Modifier.replaceText(currentContent, selection, ' ', null, entityKey);

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
            menu: base => ({...base, color: '#000'}),
            multiValue: base => ({...base, color: '#000', fontSize: 18}),
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
                components={{
                    Option: OptionCard
                }}
            />
        );
    }
}