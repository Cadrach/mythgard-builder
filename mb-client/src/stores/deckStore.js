import {flow, resolveIdentifier, getEnv, types} from 'mobx-state-tree';
import axios from '../axios';
import _ from 'lodash';
import {Icon, message} from "antd";
import copy from 'copy-to-clipboard';
import {toJS} from "mobx";
import constants from "../constants";

/**
 * Mobx State Tree Store
 * The store recieves 3 parameters
 *  1st one is the Store Name
 *  2nd is an object with the Props and Computed values
 *  3rd is and object with the Actions
 **/

const chartMaker = (stats, serie, x, y, defaultSerie) => {
    let foundSerie = _.find(stats, {name: serie});

    //If not found, we must create the serie
    if( ! foundSerie){
        foundSerie = {
            name: serie,
            data:[...defaultSerie],
            color: constants.gems[serie],
        }
        stats.push(foundSerie);
    }

    //Add the value
    let foundValue = _.find(foundSerie.data, {x});
    if( ! foundValue){
        foundValue = {x,y};
        foundSerie.data.push(foundValue);
    }
    else{
        foundValue.y+=y;
    }
}

const DeckLine = types.model('DeckLine',{
    id: types.number,
    count: types.number,
}).views(self => ({
    get card() {return getEnv(self).cardStore.cardById(self.id)},
}));

export const Deck = types
    .model('Deck', {
        id: types.identifierNumber,
        ide_path: types.maybeNull(types.integer),
        ide_power: types.maybeNull(types.integer),
        dck_cards: types.optional(types.array(DeckLine), []),
        dck_name: types.maybeNull(types.string),
        dck_public: types.optional(types.boolean, false),
        dck_description: types.maybeNull(types.string),
        saved: types.optional(types.boolean, true),
        is_favorite: types.optional(types.integer, 0),
        loading: types.optional(types.boolean, false),
    })
    .views(self => ({
        get cards() {return self.dck_cards;},
        get name() {return self.dck_name;},
        get sum(){
            return _.sumBy(self.dck_cards, 'count');
        },
        get colors(){
            return _.chain(self.cards).map('card').map('gems').join('').split('').uniq().join('').value();
        },
        get power(){
            return self.ide_power ? getEnv(self).powersById[self.ide_power] : {};
        },
        get path(){
            return self.ide_path ? getEnv(self).pathsById[self.ide_path] : {};
        },
        get stats(){
            const stats = {
                costs: [],
                types: [],
            };
            const cs = getEnv(self).cardStore;
            const types = ['Creature', 'Spell', 'LaneEnchantment', 'Artifact'];

            //Create the stats
            self.cards.forEach(({id, count}) => {
                const card = cs.cardById(id);
                const y = 0;
                if(card.cost){
                    //Ignore 0 cost cards for the costs chart
                    chartMaker(stats.costs, card.gems[0], Math.min(card.cost, 6), count, [{x: 1, y},{x: 2, y},{x: 3, y},{x: 4, y},{x: 5, y},{x: 6, y, name:'6+'},]);
                }
                //Types chart
                chartMaker(stats.types, card.gems[0], types.indexOf(card.type), count,
                    [
                        {name: '<i class="fa fa-male fa-2x"/>', x:0, y},
                        {name: '<i class="fa fa-magic fa-2x"/>', x:1, y},
                        {name: '<i class="fa fa-bookmark fa-2x"/>', x:2, y},
                        {name: '<i class="fa fa-trophy fa-2x"/>', x:3, y}
                    ]
                );

            })

            return stats;
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
            self.saved = false;
            const line = _.find(self.dck_cards, {id: card.id});
            if(line && line.count >= card.max_in_deck) return false; //cannot add, exit false
            else if( ! line) self.dck_cards.push({id: card.id, count: 1}); //create line
            else line.count++; //add count
            self.sort();
            return true;
        },

        /**
         * Remove a card from the deck.
         * Returns TRUE if the card was removed
         * @param card
         * @returns {boolean}
         */
        removeCard(card) {
            self.saved = false;
            const line = _.find(self.dck_cards, {id: card.id});
            if( ! line) return false; //no card, nothing to remove
            else if(line && line.count > 1) line.count--; //decrease
            else self.dck_cards.splice(self.dck_cards.indexOf(line), 1) //last card, remove
            self.sort();
            return true;
        },

        /**
         * Exports deck to clipboard
         */
        export(){
            //Export basic information
            const lines = [
                'name: ' + self.dck_name,
                'path: ' + (getEnv(self).pathsById[self.ide_path] ? getEnv(self).pathsById[self.ide_path].name : ''),
                'power: ' + (getEnv(self).powersById[self.ide_power] ? getEnv(self).powersById[self.ide_power].name : ''),
            ];

            //Export Cards
            self.cards.forEach(line => lines.push(line.count + ' ' + line.card.name_export))

            //Send to clipboard
            copy(lines.join("\r\n"), {
                message: 'Press #{key} to copy',
                format: 'text/plain',
            })

            //Notify user
            message.info("Deck exported to clipboard");

            //Track export of this deck
            axios.get('json/update-deck-download/' + self.id);
        },

        /**
         * Reset deck fields
         */
        reset(){
            //Could be changed to restore a snapshot that is created after initialization (see "afterCreate" and "getSnapShot")
            self.dck_cards = [];
            self.dck_name = "New Deck";
            self.dck_description = null;
            self.dck_public = false;
        },

        /**
         * Set values from the form
         * @param values
         */
        setFormValues(values){
            _.forEach(values, (value, key) => self[key] = value);
            if(values.dck_description !== undefined){
                self.dck_description = values.dck_description;
            }
            self.saved = false;
        },

        toggleFavorite(){
            if( ! self.loading){
                self.loading = true;
                axios.post('json/toggle-favorite', {id: self.id}).then(({data}) => self.applyToggleFavorite(data))
            }
        },

        applyToggleFavorite({is_favorite, dck_stars}){
            self.loading = false;
            self.is_favorite = is_favorite;
            self.dck_stars = dck_stars;
        },

        sort(){
            const colors = self.colors.split('');
            const cs = getEnv(self).cardStore;
            self.dck_cards = _.sortBy(self.dck_cards, ({id, count}) => {
                const card = cs.cardById(id);
                return colors.indexOf(card.gems[0]) + ' ' + card.cost;
            })
        },

        /**
         * Count occurences of a specific card in the deck
         * @param card
         * @returns {number}
         */
        countCard(card) {
            const c = _.find(self.dck_cards, {id: card.id})
            return c ? c.count:0;
        },
    }));

export const DeckStore = types
    .model('DeckStore', {
        loadedDecks: types.optional(types.array(Deck), [{id: 0, dck_name: 'New Deck', saved: false}]),
        myDecks: types.optional(types.array(types.safeReference(Deck)), [0]),
        selectedDeck: types.optional(types.safeReference(Deck), 0), //default selected deck is an empty deck
        loaded: types.optional(types.boolean, false),
        saving: types.optional(types.boolean, false),
    })
    .views(self => ({
    }))
    .actions(self => ({
        fetchMyDecks: flow(function* fetchMyDecks(){
            if(self.loaded === false){
                self.loaded = true;
                const fetchedDecks = yield axios.get('json/my-decks').then(({data}) => (data));
                self.mergeDecks(fetchedDecks);
                const fetchedIds = _.map(fetchedDecks, 'id');
                self.myDecks = [0, ...fetchedIds];
            }
        }),

        fetchDeckDetails: flow(function* fetchDeckDetails(deckId){
            //Fetch the deck details
            const fetchedDeck = yield axios.get('json/deck/' + deckId).then(({data}) => (data));
            self.mergeDecks([fetchedDeck]);
        }),

        mergeDecks: (fetchedDecks) => {
            fetchedDecks.forEach((fetchedDeck) => {
                const found = _.find(self.loadedDecks, {id: fetchedDeck.id});

                //Extend existing deck
                if(found){
                    _.extend(found, fetchedDeck);
                }
                //Or add it to our list
                else{
                    self.loadedDecks = [...self.loadedDecks, fetchedDeck];
                }
            })
        },

        /**
         * Select a deck and make it the current deck
         * @param deck
         */
        selectDeck(deck) {
            if(deck){
                deck.sort();
            }
            self.selectedDeck = deck;
        },

        /**
         * Retrieve & select a deck using its id
         * @param id
         */
        selectDeckById(id){
            const deck = _.find(self.loadedDecks, {id: parseInt(id)})
            if(deck){
                self.selectDeck(deck);
            }
        },

        /**
         * Save the current deck
         */
        saveSelectedDeck(){
            if( ! self.saving){
                self.saving = true;
                const originalDeck = self.selectedDeck;
                axios.post('json/deck/save', self.selectedDeck).then(({data}) => self.afterSave(originalDeck, data));
            }
        },

        /**
         * What happens after saving
         * @param deckData
         */
        afterSave(originalDeck, deckData){
            self.saving = false;
            originalDeck.saved = true;
            if(originalDeck.id === 0){
                //Reset the "new" deck
                originalDeck.reset();

                //The deck is new, add it and select it
                const deck = Deck.create(deckData);
                self.loadedDecks.push(deck);
                self.myDecks.push(deck.id);
                self.selectDeck(deck);
            }
            else{
                //We could merge what was received from the server, but let's not do it until we need to
            }
            message.success('Deck "'+ deckData.dck_name +'" saved', 5);
        }
    }))
;
