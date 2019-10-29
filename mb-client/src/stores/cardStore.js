import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
// import uuid from 'node-uuid';

class CardStore {

    @observable cardsRegistry = [];
    @observable cardsRegistryFiltered = [];
    cardsById = {};

    @computed get all() {
        return this.cardsRegistry;
    };

    @computed get filtered() {
        return this.cardsRegistryFiltered;
    };

    /**
     * Compute statistics of a cards definition from a deck
     * @param cards
     */
    computeStats(cards) {
        const stats = {
            types: {},
            rarities: {},
        };
        cards.forEach(card => {
            const info = this.cardById(card.id);
            stats.types[info.type] = (stats.types[info.type] ? stats.types[info.type]:0) + card.count;
            stats.rarities[info.rarity] = (stats.rarities[info.rarity] ? stats.rarities[info.rarity]:0) + card.count;
        }, this)
        return stats;
    };

    cardById(id) {
        return this.cardsById[id];
    }

    @action loadCards(cards) {
        this.cardsRegistry = cards;
        this.cardsRegistryFiltered = cards;
        this.cardsById = _.keyBy(cards, 'id');
    }

    @action applyFilters(filters){
        const {colors, types} = filters;
        this.cardsRegistryFiltered = this.cardsRegistry.filter(card => {
            // console.log(_.intersection(card.card_gems.split(''), colors))
            if(! _.intersection(card.gems.split(''), colors).length){
                return false;
            }
            if(types.indexOf(card.type)<0){
                return false;
            }
            return true;
        })
    }
}

export default new CardStore();