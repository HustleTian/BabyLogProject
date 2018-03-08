/**
 * Created by summer on 18/1/25.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	Button,
	ScrollView,
	Alert,
	Dimensions,
	DeviceEventEmitter,
	DatePickerAndroid
} from 'react-native';
import Echarts from 'native-echarts';
import TextWithButton from './Component/TextWithButton'
const {width} = Dimensions.get('window');
import EventController from '../common/EventController';

var EventType = {
	Type1: 0,
	Type2: 1,
	Type3: 2,
};
var eventKeys = ['事件1', '事件2', '事件3'];
class ComparePage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		date.setHours(0, 0, 0, 0);
		this.state = {
			startTime: date.getTime(),
			endTime: date.getTime(),
			compareDate: new Date(),
		}
	}
	
	componentWillMount() {
		this.getEventSubscription = DeviceEventEmitter.addListener('getEvent',(events) =>{
			// console.warn(events);
			this.eventData = events.event;
		});
		EventController.getEvent();
	}
	
	componentWillUnmount() {
		this.getEventSubscription.remove();
	}
	
	async _openTimePicker(start){
		try{
			var newState = {};
			var options = {};
			var stateKey = start ? "start" : "end";
			
			let date = new Date();
			if (start)
			{
				date.setTime(this.state.startTime);
			}
			else
			{
				date.setTime(this.state.endTime);
			}
			options.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			
			const {action, year, month, day} = await DatePickerAndroid.open(options);
			if(action === DatePickerAndroid.dismissedAction){
				date.setFullYear(year, month, day);
				let time = this.state.startTime;
				if (start == false) {
					this.state.endTime;
				}
				newState[stateKey + 'Time'] = time;
			}else{
				date.setFullYear(year, month, day);
				let time = date.getTime();
				if (start == false) {
					time += 86400000;
				}
				newState[stateKey + 'Time'] = time;
			}
			this.setState(newState);
		}catch({code,message}){
			console.warn("Error in example '${stateKey}': ",message)
		}
	}
	
	//时间转成字符串
	_getTimeString(start) {
		var ret = "";
		let date = new Date();
		if (start) {
			date.setTime(this.state.startTime);
			ret = date.getFullYear().toString() + "-";
			ret += (date.getMonth() + 1).toString() + "-";
			ret += date.getDate().toString();
		}
		else {
			date.setTime(this.state.endTime);
			ret = date.getFullYear().toString() + "-";
			ret += (date.getMonth() + 1).toString() + "-";
			ret += date.getDate().toString();
		}
		
		return ret;
	}
	
	_getDateString(time) {
		let ret = '';
		let date = new Date();
		date.setTime(time);
		ret = date.getFullYear().toString() + "/";
		ret += (date.getMonth() + 1).toString() + "/";
		ret += date.getDate().toString();
		
		return ret;
	}
	
	_getOptions() {
		let gapTime = this.state.endTime - this.state.startTime;
		let dayTime = 86400000;
		let gapDay = gapTime / dayTime;
		let dateData = new Array();
		for (let i = 0; i <= gapDay; i++) {
			dateData.push(this._getDateString(this.state.startTime + i * dayTime));
		}
		// console.warn(dateData);
		return {
			title: {
				text: (gapDay + 1).toString() + '天对比图'
			},
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data:['事件1', '事件2','事件3'],
				y: 'bottom'
			},
			toolbox: {
				show : true,
				feature : {
					dataView : {show: true, readOnly: false},
					magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
					restore : {show: true},
				}
			},
			calculable : true,
			yAxis : [
				{
					type : 'value',
					min : 0,
					max : 24,
					splitNumber : 24,
				}
			],
			xAxis : [
				{
					type : 'category',
					data : dateData
				}
			],
			series : this.state.compareDate
		};
	}
	
	//界面回退
	_goBack() {
		const { navigator, callBack} = this.props;
		if (callBack)
		{
			callBack();
		}
		if (navigator) {
			navigator.pop()
		}
	}
	
	_compare() {
		if (this.state.startTime >= this.state.endTime)
		{
			Alert.alert('温馨提醒','结束时间小于开始时间!');
			return;
		}
		
		if (this.state.endTime - this.state.startTime > 10 * 24 * 3600 * 1000)
		{
			Alert.alert('温馨提醒','不能对比超过10天的数据!');
			return;
		}
		
		let data = new Array();
		let gapTime = this.state.endTime - this.state.startTime;
		let dayTime = 86400000;
		let gapDay = gapTime / dayTime;
		for (let i = 0; i <= gapDay; i++) {
			let tempData = new Array();
			let startTime = this.state.startTime + i * dayTime;
			let endTime = startTime + dayTime;
			for (let j = 0; j < this.eventData.length; j++)
			{
				if (this.eventData[j].startTime >= startTime && this.eventData[j].endTime <= endTime)
				{
					tempData.push(this.eventData[j]);
				}
			}
			
			data.push(tempData);
		}
		
		let timeVec = new Array();
		for (let i = 0; i <= gapDay; i++) {
			timeVec.push(this.state.startTime + i * dayTime);
		}
		
		let showData = new Array();
		let index = 0;
		while (index <= gapDay) {
			if (timeVec[index] == -1) {
				index++;
				continue;
			}
			
			let itemData = {};
			let valueData = new Array();
			itemData.data = valueData;
			itemData.type = 'bar';
			itemData.stack = '小时';
			itemData.itemStyle = { normal: {label : {show: true, position: 'insideRight'}}};
			let eventType = -1;
			let dataStartTime = timeVec[index];
			for (let n = 0; n < data[index].length; n++) {
				if (data[index][n].startTime == dataStartTime) {
					eventType = data[index][n].eventType;
					timeVec[index] = data[index][n].endTime;
					itemData.name = eventKeys[eventType];
					valueData[index] = Number(((data[index][n].endTime - data[index][n].startTime) / 3600000).toFixed(1));
					break;
				}
			}
			if (eventType == -1) {
				timeVec[index] = -1;
				index++;
				if (index > gapDay) {
					index = 0;
				}
				continue;
			}
			
			for (let n = 0; n <= gapDay; n++) {
				if (n == index) {
					continue;
				}
				for (let m = 0; m < data[n].length; m++) {
					if (data[n][m].eventType == eventType && dataStartTime == data[n][m].startTime - (n - index) * dayTime) {
						valueData[n] = Number(((data[n][m].endTime - data[n][m].startTime) / 3600000).toFixed(1));
						timeVec[n] = data[n][m].endTime;
						break;
					}
				}
			}
			
			showData.push(itemData);
			index++;
			if (index > gapDay) {
				index = 0;
			}
		}

		this.setState({
			compareDate: showData
		})
	}
	
	render() {
		if (this.state.compareDate.length > 0) {
			return (
				<ScrollView style={styles.scrollContainer}>
					<TextWithButton
						title={'对比'}
						onClick= {() => this._goBack()}
						bTitle="后退"/>
					<Text style={styles.text}>
						请选择开始时间:
					</Text>
					<Button title={this._getTimeString(true)}
					        onPress={start=>this._openTimePicker(true)}/>
					<Text style={styles.text}>
						请选择结束时间:
					</Text>
					<Button title={this._getTimeString(false)}
					        onPress={start=>this._openTimePicker(false)}/>
					<Text style={styles.text}>
						最多可选择10天
					</Text>
					<Button title="对比" onPress={()=>this._compare()}/>
					<Echarts option={this._getOptions()} width={width} />
				</ScrollView>
			);
		}else {
			return (
				<ScrollView style={styles.scrollContainer}>
					<TextWithButton
						title={'对比'}
						onClick= {() => this._goBack()}
						bTitle="后退"/>
					<Text style={styles.text}>
						请选择开始时间:
					</Text>
					<Button title={this._getTimeString(true)}
					        onPress={start=>this._openTimePicker(true)}/>
					<Text style={styles.text}>
						请选择结束时间:
					</Text>
					<Button title={this._getTimeString(false)}
					        onPress={start=>this._openTimePicker(false)}/>
					<Text style={styles.text}>
						最多可选择10天
					</Text>
					<Button title="对比" onPress={()=>this._compare()}/>
				</ScrollView>
			);
		}
	}
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
		backgroundColor: '#7d7d7d'
	},
	text: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10
	},
});

module.exports = ComparePage;