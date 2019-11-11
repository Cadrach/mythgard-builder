import {observable, action, computed, autorun} from 'mobx';
import axios from '../axios';
import _ from 'lodash';
import CardStore from "./cardStore";
import {notification} from "antd";
// import uuid from 'node-uuid';

class Dictionary {

    @observable cards = {};
    @observable user = {};
    @observable factions;
    @observable powers;
    @observable paths;
    @observable isLoading = false;
    @observable promise;

    constructor() {
         this.cards = CardStore;
         this.factions = [];
         this.powers = [];
         this.paths = [];
         this.powersById = {};
         this.pathsById = {};
         this.load();
    }

    @computed get isConnected(){
        return !!this.user;
    }

    @computed get userHasCards(){
        return this.user && this.user.cards && this.user.cards.length;
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
            this.factions.push(...dictionaries.factions);
            this.powers.push(...dictionaries.powers);
            this.paths.push(...dictionaries.paths);
            _.extend(this.powersById, _.keyBy(dictionaries.powers, 'id'));
            _.extend(this.pathsById, _.keyBy(dictionaries.paths, 'id'));
            this.user = dictionaries.user;
        }).finally(action(() => { this.isLoading = false; }))

        return this.promise;
    }

    /**
     * Save user cards
     * @param cards
     */
    saveUserCards(cards){
        axios.post('json/save-user-cards', cards).then(() => notification.success({message: "Your cards have been saved"}));
    }
}

export default new Dictionary();