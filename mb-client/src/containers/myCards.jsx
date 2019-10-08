import React from "react";
import { observer, inject } from "mobx-react";
import cardStore from "../stores/cardStore";
import CardsList from "../components/cardsList/cardsList"

@inject('cardStore')
@observer
export default class MyCards extends React.Component {

    render() {
        return (
            <CardsList cards={this.props.cardStore.cards} shavedHeight={64}/>
        );
    }
}
