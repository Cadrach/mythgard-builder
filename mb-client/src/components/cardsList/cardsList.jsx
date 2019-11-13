import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Card from "../card/card";

import './cardsList.scss';

const spacer = 32;

const Cell = (props, { columnIndex, rowIndex, style }) => {

    const {columnCount} = props;
    const index = rowIndex * columnCount + columnIndex;
    const card = props.cards.length >= index && props.cards[index] ? props.cards[index] : null;

    return (
        <div
            className={"GridItem"}
            style={{
                ...style,
                left: style.left + spacer,
                top: style.top + spacer,
                width: style.width - spacer,
                height: style.height - spacer
            }}
        >
            {card ? <Card data={card} deck={props.deck}/>:null}
        </div>)
}

const CardsList = (props) => {
    const {width, height} = useWindowDimensions();

    const columnCount = width>1600 ? 6 : (width>1200 ? 5 : (width>900 ? 4: (width>700 ? 3:1)));
    const widthModified = width - (props.shavedWidth ? props.shavedWidth:0);
    const columnWidth = (widthModified - spacer*2) / columnCount - spacer;
    const cellHeight = columnWidth * 1.39 + (props.deck ? 30 : 0);

    const cellProps = {...props, columnCount};

    return (<div className="cardList" style={{width: widthModified + 'px'}}>
        <Grid
        columnCount={columnCount}
        columnWidth={columnWidth + spacer}
        height={height - (props.shavedHeight?props.shavedHeight:0)}
        innerElementType={innerElementType}
        rowCount={props.cards.length / columnCount + 1}
        rowHeight={cellHeight + spacer}
        width={widthModified}
        style={{overflowX: 'hidden'}}
    >
        {Cell.bind(this, cellProps)}
        </Grid>
    </div>)
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
        ref={ref}
        style={{
            ...style,
            paddingLeft: spacer,
            paddingTop: spacer
        }}
        {...rest}
    />
));

export default CardsList;