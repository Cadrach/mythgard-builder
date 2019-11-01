import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
import CardStore from "./cardStore";
// import uuid from 'node-uuid';

class Dictionary {

    @observable cards = {};
    @observable factions;
    @observable powers;
    @observable paths;
    @observable isLoading = false;
    @observable promise;

    constructor() {
         this.cards = CardStore;
         this.load();
    }

    $req = async () => {
        const {data} = await axios.get('json/dictionaries');
        return data;
    }

    powerById(id) {return this.powersById ? this.powersById[id]:null}
    pathById(id) {return this.pathsById ? this.pathsById[id]:null}

    @action load() {
        this.isLoading = true;
        this.promise = this.$req().then((dictionaries) => {
            this.cards.loadCards(dictionaries.cards);
            this.factions = dictionaries.factions;
            this.powers = dictionaries.powers;
            this.paths = dictionaries.paths;
            this.powersById = _.keyBy(dictionaries.powers, 'id');
            this.pathsById = _.keyBy(dictionaries.paths, 'id');
        }).finally(action(() => { this.isLoading = false; }))

        return this.promise;
    }
}

export default new Dictionary();