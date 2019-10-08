import React from "react";
import {List} from 'antd';

// Stylesheet Imports
import "./cardsList.scss";
import Card from "../card/card";

const CardsList = (props) => (
    <List
        grid={{
            gutter: 16,
            xs: 2,
            sm: 3,
            md: 4,
            lg: 4,
            xl: 4,
            xxl: 3,
        }}
        style={{margin: 16}}
        dataSource={props.cards}
        renderItem={item => (
            <List.Item>
                <Card data={item} deckStore={props.deckStore}/>
            </List.Item>
        )}
    />
);
export default CardsList;
