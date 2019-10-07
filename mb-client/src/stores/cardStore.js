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
        const {data} = await axios.get('json/cards');
        return data;
    }

    @action loadCards() {
        console.log('load')
        this.isLoading = true;
        return this.$req().then((cards) => {
            this.cardsRegistry = cards;
        }).finally(action(() => { this.isLoading = false; }))
    }
}

export default new CardStore();