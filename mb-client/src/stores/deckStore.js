import {flow, resolveIdentifier, getEnv, types} from 'mobx-state-tree';
import axios from '../axios';
import _ from 'lodash';

/**
 * Mobx State Tree Store
 * The store recieves 3 parameters
 *  1st one is the Store Name
 *  2nd is an object with the Props and Computed values
 *  3rd is and object with the Actions
 **/

const DeckLine = types.model('DeckLine',{
    id: types.number,
    count: types.number,
}).views(self => ({
    get card() {return getEnv(self).cardStore.cardById(self.id)},
}));

export const Deck = types
    .model('Deck', {
        id: types.identifierNumber,
        dck_cards: types.optional(types.array(DeckLine), []),
        dck_name: types.maybeNull(types.string),
    })
    .views(self => ({
        get cards() {return self.dck_cards;},
        get name() {return self.dck_name;},
        get sum(){
            return _.sumBy(self.dck_cards, 'count');
        },
        get colors(){
            return _.chain(self.cards).map('card').map('gems').join('').split('').uniq().join('').value();
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
            const line = _.find(self.dck_cards, {id: card.id});
            if(line && line.count >= card.max_in_deck) return false; //cannot add, exit false
            else if( ! line) self.dck_cards.push({id: card.id, count: 1}); //create line
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
            const line = _.find(self.dck_cards, {id: card.id});
            if( ! line) return false; //no card, nothing to remove
            else if(line && line.count > 1) line.count--; //decrease
            else self.dck_cards.splice(self.dck_cards.indexOf(line), 1) //last card, remove
            return true;
        },

        /**
         * Count occurences of a specific card in the deck
         * @param card
         * @returns {number}
         */
        countCard(card) {
            const c = _.find(self.dck_cards, {id: card.id})
            return c ? c.count:0;
        }
    }));

export const DeckStore = types
    .model('DeckStore', {
        myDecks: types.optional(types.array(Deck), [{id: 0}]),
        selectedDeck: types.optional(types.safeReference(Deck), 0), //default selected deck is an empty deck
        loaded: types.optional(types.boolean, false),
    })
    .views(self => ({
    }))
    .actions(self => ({
        fetchMyDecks: flow(function* fetchMyDecks(){
            if(self.loaded === false){
                self.loaded = true;
                const myDecks = yield axios.get('json/my-decks').then(({data}) => (data));
                self.myDecks = [...self.myDecks, ...myDecks];
            }
        }),
        selectDeck(deck) {
            self.selectedDeck = deck;
        },
    }))
;
