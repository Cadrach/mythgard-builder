import {observable, action, computed, autorun} from 'mobx';
import _ from 'lodash';
// import uuid from 'node-uuid';

export class DeckStore {

    @observable cardsList = [];

    @computed get cards() {
        return this.cardsList;
    };

    /**
     * Add card to deck. Returns TRUE if the card was added
     * @param card
     * @returns {boolean}
     */
    @action addCard(card) {
        const c = _.find(this.cardsList, {id_card: card.id_card});
        if(c && c.count < card.card_max_in_deck){
            c.count++;
            return true;
        }
        else if(!c){
            this.cardsList.push({
                id_card: card.id_card,
                count: 1,
            });
            return true;
        }
        return false;
    }

    /**
     * Remove a card from the deck. Returns TRUE if the card was remove correctly
     * @param card
     * @returns {boolean}
     */
    @action removeCard(card) {
        const c = _.find(this.cardsList, {id_card: card.id_card});
        if(c && c.count > 1){
            c.count--;
            return true;
        }
        else if(c){
            this.cardsList.splice(this.cardsList.indexOf(c), 1);
            return true;
        }
        return false;
    }

    /**
     * Return the count of cards in a deck
     * @param card
     * @returns {number}
     */
    countCard(card) {
        const c = _.find(this.cardsList, {id_card: card.id_card})
        return c ? c.count:0;
    }
}

export default new DeckStore();