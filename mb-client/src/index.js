import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'mobx-react';
// Service Worker for PWA
import serviceWorkerRegister from './registerServiceWorker';
// Import our Stores Here
import UserStore from './stores/user';
import LanguageStore from './stores/language';
import UIStore from './stores/ui';

//Stores
import {DeckStore, Deck} from "./stores/deckStore";

// Import Components
import App from './app';
import Dictionary from "./stores/dictionary";

// Execute the ServiceWorker
serviceWorkerRegister();

// Because they're classes, we have to instantiate them here :)
const userStore = UserStore.create({
  id: '1',
  name: 'Alex',
  lastName: 'Casillas',
  age: 27,
  xp: 0
});
const languageStore = LanguageStore.create({ language: 'en' });
const uiStore = UIStore.create({ borderRadius: 3, textColor: 'white' });
const dictionary = Dictionary;
const deckStore = DeckStore.create({}, {
    cardStore: dictionary.cards,
    powersById: dictionary.powersById,
    pathsById: dictionary.pathsById,
});

const store = {
    user: userStore,
    language: languageStore,
    ui: uiStore,
    dictionary: dictionary,
    deckStore: deckStore,
};

const router = (
  <Provider {...store}>
      <Router>
          <App/>
      </Router>
  </Provider>
);

render(router, document.getElementById('root'));
