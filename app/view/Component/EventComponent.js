/**
 * Created by TIAN on 2018/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import TextWithButton from './TextWithButton'
const PropTypes = require('prop-types');

var eventKeys = ['吃奶', '睡觉', '活动'];
class EventComponent extends Component<{}> {
	constructor(props) {
		super(props);
		let data = new Date();
		let shour = 0;
		let sminute = 0;
		let ssecond = 0;
		if (props.startTime != -1)
		{
			data.setTime(props.startTime);
			shour = data.getHours();
			sminute = data.getMinutes();
			ssecond = data.getSeconds();
		}
		
		let ehour = 23;
		let eminute = 59;
		let esecond = 59;
		if (props.endTime != -1)
		{
			data.setTime(props.endTime);
			ehour = data.getHours();
			eminute = data.getMinutes();
			esecond = data.getSeconds();
		}
		this.state = {
			startHour: shour,
			startMinute: sminute,
			startSecond: ssecond,
			endHour: ehour,
			endMinute: eminute,
			endSecond: esecond,
			eventType: props.eventType,
			eventDesc: props.eventDesc,
			id: props.id,
			callback: props.callback,
		};
	}
	
	static propTypes = {
		id: PropTypes.number,
		startTime: PropTypes.number,
		endTime: PropTypes.number,
		eventType: PropTypes.number,
		eventDesc: PropTypes.string,
		callback: PropTypes.func,
	}
	
	static defaultProps = {
		id : 100,
		startTime : -1,
		endTime: -1,
		eventType : 0,
		eventDesc : "",
	}
	
	_getTimeString(start) {
		var ret = "";
		if (start) {
			ret = this.state.startHour.toString() + ":";
			ret += this.state.startMinute > 9 ? "" : "0";
			ret += this.state.startMinute.toString();
		}
		else {
			ret = this.state.endHour.toString() + ":";
			ret += this.state.endMinute > 9 ? "" : "0";
			ret += this.state.endMinute.toString();
		}
		
		return ret;
	}
	
	//修改存库
	_edit() {
		this.state.callback(this.state.id);
	}
	
	render() {
		return (
			<View style={styles.container}>
				<TextWithButton
					title={eventKeys[this.state.eventType]}
					onClick= {()=>this._edit()}
					bTitle="修改"/>
				<View style={{flexDirection: 'row'}}>
					<Text>
						开始时间:
					</Text>
					<Text>
						{this._getTimeString(true)}
					</Text>
				</View>
				<View style={{flexDirection: 'row'}}>
					<Text>
						结束时间:
					</Text>
					<Text>
						{this._getTimeString(false)}
					</Text>
				</View>
				<Text>
					描述:
				</Text>
				<Text numberOfLines={10}>
					{this.state.eventDesc}
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 200,
		margin: 10,
		backgroundColor: '#7d7d7d',
	},
});

module.exports = EventComponent;