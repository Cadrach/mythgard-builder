import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
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
        //const response = await fetch(process.env.REACT_APP_SERVER_ROOT + 'api/cards', {mode: 'no-cors'});
        const {data} = await axios.get('api/cards');
        return data;
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