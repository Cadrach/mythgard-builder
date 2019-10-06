import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
// Service Worker for PWA
import serviceWorkerRegister from './registerServiceWorker';
// Import our Stores Here
import UserStore from './stores/user';
import LanguageStore from './stores/language';
import UIStore from './stores/ui';

// Import Components
import App from './containers/app';
import CardStore from "./stores/cardStore";
import Cards from "./containers/cards";

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
const cardStore = CardStore;

const store = {
  user: userStore,
  language: languageStore,
  ui: uiStore,
  cardStore: cardStore,
};

const router = (
  <Provider {...store}>
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/cards" component={Cards} />
      </div>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
