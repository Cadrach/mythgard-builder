import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
// import uuid from 'node-uuid';

export class CardStore {

    @observable isLoading = false;
    @observable cardsRegistry = [];
    cardsById = [];

    constructor() {
         this.loadCards();
    }

    @computed get cards() {
        return this.cardsRegistry;
    };

    cardById(id) {
        return this.cardsById[id];
    }

    $req = async () => {
        const {data} = await axios.get('json/cards');
        return data;
    }

    @action loadCards() {
        console.log('load')
        this.isLoading = true;
        return this.$req().then((cards) => {
            this.cardsRegistry = cards;
            this.cardsById = _.keyBy(cards, 'id_card');
        }).finally(action(() => { this.isLoading = false; }))
    }
}

export default new CardStore();