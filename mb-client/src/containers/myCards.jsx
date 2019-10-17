import React from "react";
import { observer, inject } from "mobx-react";
import CardsList from "../components/cardsList/cardsList"

@inject('dictionary')
@observer
export default class MyCards extends React.Component {

    render() {
        return (
            <CardsList cards={this.props.dictionary.cards.all} shavedHeight={64}/>
        );
    }
}
