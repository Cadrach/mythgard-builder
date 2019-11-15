import React from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import chartDefaults from "./chartDefaults";
import _ from 'lodash';


export default class ChartType extends React.Component {

    render(){
        const {deck} = this.props;
        const defaultOptions = _.cloneDeep(chartDefaults.bars);

        const options = {...defaultOptions,
            series: deck.stats.types
        };

        return   <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    }
}