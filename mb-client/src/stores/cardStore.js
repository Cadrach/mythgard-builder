import {observable, action, computed, autorun, toJS} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
// import uuid from 'node-uuid';

function normalize(str){
    return str.normalize("NFD").replace(/[\u0300-\u036f\-,':™]/g, "").replace(/ /g, '_').toLowerCase();
}

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
            total: 0,
            types: {},
            rarities: {},
        };
        if(cards){
            cards.forEach(card => {
                const info = this.cardById(card.id);
                stats.total+= card.count;
                stats.types[info.type] = (stats.types[info.type] ? stats.types[info.type]:0) + card.count;
                stats.rarities[info.rarity] = (stats.rarities[info.rarity] ? stats.rarities[info.rarity]:0) + card.count;
            }, this)
        }
        return stats;
    };

    cardById(id) {
        return this.cardsById[id];
    }

    cardByName(name){
        const normalizedName = normalize(name);
        return _.find(this.cardsRegistry, {name_clean: normalizedName});
    }

    @action loadCards(cards) {
        this.cardsRegistry = cards;
        this.cardsRegistryFiltered = cards;
        this.cardsById = _.keyBy(cards, 'id');
    }

    @action applyFilters(filters){
        const {colors, types, search} = filters;
        const regex = new RegExp(search, 'img');
        this.cardsRegistryFiltered = this.cardsRegistry.filter(card => {
            // console.log(_.intersection(card.card_gems.split(''), colors))
            if(! _.intersection(card.gems.split(''), colors).length){
                return false;
            }
            if(types.indexOf(card.type)<0){
                return false;
            }
            if(search){
                if( ! regex.test(card.name) && ! regex.test(card.text)){
                    return false;
                }
            }
            return true;
        })
        //console.log('OUT', filteredOut)
        console.log('KEPT', toJS(this.cardsRegistryFiltered))
    }
}

export default new CardStore();