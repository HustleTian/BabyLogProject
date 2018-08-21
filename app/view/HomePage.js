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
	Dimensions,
	DeviceEventEmitter
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Echarts from 'native-echarts';
import TextWithButton from './Component/TextWithButton'
import EventPage from './EventPage'
import ComparePage from './ComparePage';
const {width} = Dimensions.get('window');
import UserController from '../common/UserController';
import EventController from '../common/EventController';

var EventType = {
	Type1: 0,
	Type2: 1,
	Type3: 2,
};
class HomePage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		date.setHours(0, 0, 0, 0);
		let selected = date.getFullYear().toString() + '-';
		selected += (date.getMonth() + 1).toString() + '-';
		selected += date.getDate().toString();
		this.state = {
			nickname: '',
			age: 0,
			selected: selected,
			selectedTimeStamp: date.getTime(),
			data: new Array(),
		}
	}
	
	componentWillMount() {
		this.getUserSubscription = DeviceEventEmitter.addListener('HomePageGetUser',(events) =>{
			// console.warn(events);
			let birthday = events.user.birthday;
			let date = new Date();
			let today = date.getTime();
			let gap = today - birthday;
			gap /= 1000;
			gap /= 3600;
			gap /= 24;
			gap = Math.floor(gap);
			this.setState({
				nickname: events.user.nickname,
				age: gap,
			});
		});
		this.getEventSubscription = DeviceEventEmitter.addListener('getEvent',(events) =>{
			// console.warn(events);
			this.setState({
				data: events.event,
			});
		});
		EventController.getEvent();
		UserController.getUser('HomePageGetUser');
	}
	
	componentWillUnmount() {
		this.getUserSubscription.remove();
		this.getEventSubscription.remove();
	}
	
	_onCompare() {
		const { navigator} = this.props;
		if (navigator) {
			navigator.push({
				name:'ComparePage',
				component:ComparePage,
			})
		}
	}

    _onDayPress(day) {
        this.setState({
            selected: day.dateString,
	        selectedTimeStamp: day.timestamp - 8 * 3600 * 1000,
        });
        // console.warn(day.dateString);
        // console.warn(day.timestamp - 8 * 3600 * 1000);
    }

	_goToEventPage() {
        const { navigator} = this.props;
        if (navigator) {
            navigator.push({
                name:'EventPage',
                component:EventPage,
                params: {
                    startTime: this.state.selectedTimeStamp,
                }
            })
        }
	}
	
	_getTodayTimeData() {
		let time1 = 0,time2 = 0,time3 = 0;
		for (let i = 0; i < this.state.data.length; i++)
		{
			if (this.state.data[i].startTime >= this.state.selectedTimeStamp && this.state.data[i].endTime <= this.state.selectedTimeStamp + 86400000)
			{
				let gapTime = this.state.data[i].endTime - this.state.data[i].startTime;
				switch (this.state.data[i].eventType) {
					case EventType.Type1:
						time1 += gapTime;
						break;
					case EventType.Type2:
						time2 += gapTime;
						break;
					case EventType.Type3:
						time3 += gapTime;
						break;
					default:
						break;
				}
			}
		}
		
		time1 /= 3600000;
		time2 /= 3600000;
		time3 /= 3600000;
		
		time1 = Number(time1.toFixed(1));
		time2 = Number(time2.toFixed(1));
		time3 = Number(time3.toFixed(1));
		
		return {time1:time1,time2:time2,time3:time3};
	}

	_getBarOptions() {
		let time1 = this._getTodayTimeData().time1;
		let time2 = this._getTodayTimeData().time2;
		let time3 = this._getTodayTimeData().time3;
		
		return {
			title: {
				text: '事件时间分类',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter: '{a} <br/> {c}小时'
			},
			legend: {
				y: 'bottom',
				data:['吃奶', '睡觉', '活动'],
			},
			toolbox: {
				show : true,
				feature : {
					dataView : {show: true, readOnly: true},
					magicType : {show: true, type: ['line', 'bar']},
					restore : {show: true},
				}
			},
			xAxis : [
				{
					type : 'category',
					data : [''],
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis : [
				{
					name : '小时',
					type : 'value',
					min : 0,
					max : 24,
					splitNumber : 6,
				}
			],
			series : [
				{
					name:'吃奶',
					type:'bar',
					data:[time1],
				},
				{
					name:'睡觉',
					type:'bar',
					data:[time2],
				},
				{
					name:'活动',
					type:'bar',
					data:[time3],
				}
			]
		};
	}
	
	_getPieOption() {
		let time1 = this._getTodayTimeData().time1;
		let time2 = this._getTodayTimeData().time2;
		let time3 = this._getTodayTimeData().time3;
		
		return {
			title : {
				text: '事件时间百分比',
				x:'center'
			},
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c}小时 ({d}%)"
			},
			legend: {
				orient : 'vertical',
				x : 'left',
				data:['吃奶', '睡觉', '活动']
			},
			toolbox: {
				show : true,
				feature : {
					dataView : {show: true, readOnly: true},
					magicType : {
						show: true,
							type: ['pie', 'funnel'],
							option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'left',
								max: 24
							}
						}
					},
					restore : {show: true}
				}
			},
			calculable : true,
			series : [
				{
					name:'百分比',
					type:'pie',
					radius : '55%',
					center: ['50%', '60%'],
					data:[
						{value:time1, name:'吃奶'},
						{value:time2, name:'睡觉'},
						{value:time3, name:'活动'},
					]
				}
			]
		};
	}
	
	_getPieOption2() {
		let eventKeys = ['吃奶', '睡觉', '活动'];
		let data = new Array();
		
		for (let i = 0; i < this.state.data.length; i++)
		{
			if (this.state.data[i].startTime >= this.state.selectedTimeStamp && this.state.data[i].endTime <= this.state.selectedTimeStamp + 86400000)
			{
				let gapTime = this.state.data[i].endTime - this.state.data[i].startTime;
				gapTime /= 3600000;
				gapTime = Number(gapTime.toFixed(1));
				data.push({value:gapTime, name:eventKeys[this.state.data[i].eventType]});
			}
		}
		
		return {
			tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			legend: {
				orient : 'vertical',
				x : 'left',
				data:['吃奶', '睡觉', '活动'],
			},
			toolbox: {
				show : true,
				feature : {
					dataView : {show: true, readOnly: true},
					magicType : {
						show: true,
						type: ['pie', 'funnel'],
						option: {
							funnel: {
								x: '25%',
								width: '50%',
								funnelAlign: 'center',
								max: 1548
							}
						}
					},
					restore : {show: true},
				}
			},
			calculable : true,
			series : [
				{
					name:'时间段',
					type:'pie',
					radius : ['40%', '60%'],
					data: data
				}
			]
		};
	}
	
	_onSelectName() {
		const { navigator} = this.props;
		if (navigator) {
			navigator.push({
				name:'NamePage',
				component:NamePage,
			})
		}
	}

    render() {
        return (
	        <ScrollView style={styles.scrollContainer}>
		        <TextWithButton
			        title={this.state.nickname + '的成长日志'}
			        onClick= {() => this._onCompare()}
			        bTitle="对比"/>
		        {/*<TextWithButton*/}
			        {/*title={'选名'}*/}
			        {/*onClick= {() => this._onSelectName()}*/}
			        {/*bTitle="进入"/>*/}
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
		        <Echarts option={this._getBarOptions()} width={width} />
		        <Echarts option={this._getPieOption()} width={width} />
		        <Echarts option={this._getPieOption2()} width={width} />
	        </ScrollView>
        );
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
	ageLabel: {
        fontSize: 25,
        color: '#000000',
	}
});

module.exports = HomePage;