import React from "react";
import {Card} from "antd";
import {Icon} from "react-fa/lib";

const Home = (props) => (
    <Card style={{margin: '40px 20%', fontSize: 24}}>
        Hail, Mythgardian!
        <br/>
        Welcome to Mythgard-Decks, a website / tool to create decks in the CCG Mythgard.
        <br/>
        <br/>
        The key features of this site are the following:
        <ul style={{lineHeight: '45px'}}>
            <li>Easily searchable <b>database of decks</b>, provided by players.</li>
            <li>Look for decks that <b>YOU</b> can build with <b>YOUR</b> cards.</li>
            <li>Easy to use <b>deck builder</b>.</li>
            <li><b>Star</b> your favorite decks.</li>
            <li>Allow deck owners to present their decks in a nice way, and show similarly built decks.</li>
            <li>Statistics on each deck (soon).</li>
            <li>User discussions about each deck (soon).</li>
            <li>The website is currently built for a desktop experience.</li>
        </ul>

        This site has been built on my spare time as a side project.
        <br/>I usually hang on the Mythgard Discord during the evening (EU time, <a target="_blank" href="https://discordapp.com/users/181507646820581377"><Icon name="link"/>&nbsp;Cadrach#2754</a>).
        <br/>If you have ideas, or find any bugs you can reach out to me.
        <br/>You can track development on the <a target="_blank" href="https://trello.com/b/s7owaV9I/mythgard-builder"><Icon name="link"/>&nbsp;Trello</a>.
        <br/>If you want to help, you can pester the Rhino team (as I do ^_^) to have an easier way to export your cards, and also an official JSON dump of the cards.
        <br/><br/>
        <b>Have fun building decks,<br/>Cadrach</b>
    </Card>
)
export default Home;