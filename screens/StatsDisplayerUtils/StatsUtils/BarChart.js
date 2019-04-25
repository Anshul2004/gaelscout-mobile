import React from 'react'
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {View} from "react-native";
 
export default class CustomBarChart extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const contentInset = { top: 20, bottom: 20 };
        return (
            <View>
            <View style={{ height: this.props.height, flexDirection: 'row' }}>
                <YAxis
                    data={ this.props.data }
                    contentInset={ contentInset }
                    svg={{
                        fill: 'grey',
                        fontSize: 13,
                    }}
                    numberOfTicks={ 10 }
                    formatLabel={ value => `${value}  ` }
                />
                <BarChart
                    style={{ height: this.props.height, width: this.props.width }}
                    data={ this.props.data }
                    svg={{ fill: 'rgba(201, 201, 201, 0.8)' }}
                    contentInset={{ top: 30, bottom: 30 }}
                >
                    <Grid/>
                </BarChart>
            </View>
            <XAxis
                data={ [1, 1, 1, 1, 1] }
                formatLabel={ (value, index) => `VRC-${index}` }
                contentInset={{ left: 20, right: 20 }}
                svg={{ fontSize: 10, fill: 'grey' }}
                style={{width:this.props.width+(this.props.height/20), marginLeft:10, marginTop:10}}
            />
            </View>
        )
    }
}