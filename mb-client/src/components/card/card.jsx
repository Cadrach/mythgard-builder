import React from "react";

// Stylesheet Imports
import "./stylesheets/card.css";

const Card = (props) => (
  <div id="container">
      <div id="card" style={{backgroundImage: 'url(images/cards/s/'+props.data.card_image+')'}}>
      </div>
  </div>
);

export default Card;
