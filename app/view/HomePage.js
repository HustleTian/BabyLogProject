/**
 * Created by summer on 18/1/22.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
	ScrollView,
	Dimensions
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Echarts from 'native-echarts';
import TextWithButton from './Component/TextWithButton'
const {width} = Dimensions.get('window');

class HomePage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {};
		this._onDayPress = this._onDayPress.bind(this);
		this._onButtonClick1 = this._onButtonClick1.bind(this);
	}
	
	_onButtonClick1() {
	
	}

	
    render() {
	    const option = {
		    title: {
			    text: 'ECharts demo'
		    },
		    tooltip: {},
		    legend: {
			    data:['销量']
		    },
		    xAxis: {
			    data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
		    },
		    yAxis: {},
		    series: [{
			    name: '销量',
			    type: 'bar',
			    data: [5, 20, 36, 10, 10, 20]
		    }]
	    };
        return (
	        <ScrollView style={styles.scrollContainer}>
		        <TextWithButton
			        title="test"
			        onClick= {this._onButtonClick1}
			        bTitle="test1"/>
                <Calendar
                    onDayPress={this._onDayPress}
                    style={styles.calendar}
                    hideExtraDays
                    markedDates={{[this.state.selected]: {selected: true}}}
                />
		        <Echarts option={option} height={300} width={width} />
	        </ScrollView>
        );
    }
	
	_onDayPress(day) {
		this.setState({
			selected: day.dateString
		});
	}
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: '#7d7d7d'
	},
	calendar: {
		borderTopWidth: 1,
		paddingTop: 5,
		borderBottomWidth: 1,
		borderColor: '#eee',
		height: 350
	},
});

module.exports = HomePage;