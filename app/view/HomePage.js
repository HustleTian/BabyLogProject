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
    Alert,
	Dimensions
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Echarts from 'native-echarts';
import TextWithButton from './Component/TextWithButton'
import EventPage from './EventPage'
const {width} = Dimensions.get('window');

class HomePage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			birthday: 0,
			age: 0,
		}
		this._loadStorage();
	}

    async _loadStorage() {
        await storage.load({
            key: 'userInfo',
            autoSync: false,
            syncInBackground: false
        }).then(ret => {
			let date = new Date();
			let age = date.getTime() - ret.birthday;
			age = Math.floor(age / (24 * 3600 * 1000));
            this.setState({
                name: ret.username,
				birthday: ret.birthday,
				age: age,
            });
        }).catch(err => {
            console.warn('Load userInfo fail ', err);
        })
    }
	
	_onCompare() {
        Alert.alert('温馨提醒','功能暂未开放，敬请期待!')
	}

    _onDayPress(day) {
        this.setState({
            selected: day.dateString
        });
    }

	_goToEventPage() {
        const { navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'EventPage',
                component:EventPage,
                params: {
                    startTime: this.state.selected,
                }
            })
        }
	}

	_getChartOptions() {
		return {
            title: {
                text: ''
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
	}

    render() {
        return (
	        <ScrollView style={styles.scrollContainer}>
		        <TextWithButton
			        title={this.state.name + '的成长日志'}
			        onClick= {() => this._onCompare()}
			        bTitle="对比"/>
                <Calendar
                    onDayPress={(day) => this._onDayPress(day)}
                    style={styles.calendar}
                    hideExtraDays
                    markedDates={{[this.state.selected]: {selected: true}}}
                />
				<Text style={styles.ageLabel}>
					{'月龄:' + (this.state.age > 30 ? (Math.floor(this.state.age / 30)).toString() + '月' : this.state.age.toString() + '天')}
				</Text>
				<TextWithButton
					title="今日动态"
					onClick= {() => this._goToEventPage()}
					bTitle="编辑"/>
	        </ScrollView>
        );
    }

	// <Echarts option={this._getChartOptions()} height={300} width={width} />
	// <TextWithButton
	// 	title="test"
	// 	onClick= {this._onButtonClick1}
	// 	bTitle="test1"/>
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
	ageLabel: {
        fontSize: 25,
        color: '#000000',
	}
});

module.exports = HomePage;