import React from "react";
import ChartCost from "./chartCost";
import {Col, Row} from "antd";
import ChartType from "./chartType";

class ChartContainer extends React.Component {

    render(){
        const {deck} = this.props;

        return   <Row gutter={20}>
            <Col span={12}>
                <ChartCost deck={deck}/>
            </Col>
            <Col span={12}>
                <ChartType deck={deck}/>
            </Col>
        </Row>
    }
}

export default ChartContainer;