import { types } from 'mobx-state-tree';

/**
 * Mobx State Tree Store
 * The store recieves 3 parameters
 *  1st one is the Store Name
 *  2nd is an object with the Props and Computed values
 *  3rd is and object with the Actions
 **/

const DeckLine = types.model('DeckLine',{
    id_card: types.number,
    count: types.number,
});

const DeckStore = types
    .model('DeckStore', {
        cardsList: types.array(DeckLine),
    })
    .views(self => ({
        get cards() {
            return self.cardsList;
        },
        get sum(){
            return _.sumBy(self.cardsList, 'count');
        }
    }))
    .actions(self => ({

        /**
         * Add a card to the deck.
         * Returns TRUE if the card was added
         * @param card
         * @returns {boolean}
         */
        addCard(card) {
            const line = _.find(self.cardsList, {id_card: card.id_card});
            if(line && line.count >= card.card_max_in_deck) return false; //cannot add, exit false
            else if( ! line) self.cardsList.push({id_card: card.id_card, count: 1}); //create line
            else line.count++; //add count
            return true;
        },

        /**
         * Remove a card from the deck.
         * Returns TRUE if the card was removed
         * @param card
         * @returns {boolean}
         */
        removeCard(card) {
            const line = _.find(self.cardsList, {id_card: card.id_card});
            if( ! line) return false; //no card, nothing to remove
            else if(line && line.count > 1) line.count--; //decrease
            else self.cardsList.splice(self.cardsList.indexOf(line), 1) //last card, remove
            return true;
        },

        /**
         * Count occurences of a specific card in the deck
         * @param card
         * @returns {number}
         */
        countCard(card) {
            const c = _.find(self.cardsList, {id_card: card.id_card})
            return c ? c.count:0;
        }
    }));

export default DeckStore;
