import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
// import uuid from 'node-uuid';

export class CardStore {

    @observable isLoading = false;
    @observable cardsRegistry = [];
    @observable cardsRegistryFiltered = [];
    cardsById = [];

    constructor() {
         this.loadCards();
    }

    @computed get cards() {
        return this.cardsRegistry;
    };

    @computed get filteredCards() {
        return this.cardsRegistryFiltered;
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
            this.cardsRegistryFiltered = cards;
            this.cardsById = _.keyBy(cards, 'id_card');
        }).finally(action(() => { this.isLoading = false; }))
    }

    @action applyFilters(filters){
        const {colors} = filters;
        this.cardsRegistryFiltered = this.cardsRegistry.filter(card => {
            // console.log(_.intersection(card.card_gems.split(''), colors))
            if(! _.intersection(card.card_gems.split(''), colors).length){
                return false;
            }
            return true;
        })

        console.log('FILTERED', colors, this.cardsRegistryFiltered.length)
    }
}

export default new CardStore();