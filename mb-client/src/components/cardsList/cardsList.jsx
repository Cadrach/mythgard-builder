import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Card from "../card/card";


const columnCount = 4;
const spacer = 32;

const Cell = (props, { columnIndex, rowIndex, style }) => {

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
            {card ? <Card data={card} deckStore={props.deckStore}/> : null}
        </div>)
}

const CardsList = (props) => {
    const {width, height} = useWindowDimensions();

    const widthModified = width - (props.shavedWidth ? props.shavedWidth:0);
    const columnWidth = (widthModified - spacer*2) / columnCount - spacer;
    const cellHeight = columnWidth * 1.39 + 30;

    return (<Grid
        className="Grid"
        columnCount={columnCount}
        columnWidth={columnWidth + spacer}
        height={height - (props.shavedHeight?props.shavedHeight:0)}
        innerElementType={innerElementType}
        rowCount={props.cards.length / columnCount}
        rowHeight={cellHeight + spacer}
        width={widthModified}
        style={{overflowX: 'hidden'}}
    >
        {Cell.bind(this, props)}
    </Grid>)
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