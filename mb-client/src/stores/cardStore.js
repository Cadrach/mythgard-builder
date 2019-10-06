import {observable, action, computed, autorun} from 'mobx';
// import uuid from 'node-uuid';

export class CardStore {

    @observable isLoading = false;
    @observable cardsRegistry = [];

    constructor() {
         this.loadCards();
    }

    @computed get cards() {
        return this.cardsRegistry;
    };


    $req = async () => {
        const response = await fetch('api/cards');
        const cards = await response.json();
        return cards;
    }

    @action loadCards() {
        console.log('load')
        this.isLoading = true;
        return this.$req().then((cards) => {
            this.cardsRegistry = cards;
            // console.log(cards)
            // cards.forEach((c) => this.cardsRegistry.set(c.id_card, c));
        }).finally(action(() => { this.isLoading = false; }))
    }
}

export default new CardStore();