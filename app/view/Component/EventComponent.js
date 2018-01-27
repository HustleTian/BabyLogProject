/**
 * Created by TIAN on 2018/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
	Alert,
	TimePickerAndroid,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const PropTypes = require('prop-types');

var eventKeys = ['事件1', '事件2', '事件3'];
class EventComponent extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			startHour: props.startHour,
			startMinute: props.startMinute,
			endHour: props.endHour,
			endMinute: props.endMinute,
			eventType: props.eventType,
			eventDesc: props.eventDesc,
        };
	}
	
	static propTypes = {
		startHour: PropTypes.number,
		startMinute: PropTypes.number,
		endHour: PropTypes.number,
		endMinute: PropTypes.number,
		eventType: PropTypes.number,
		eventDesc: PropTypes.string,
	}
	
	static defaultProps = {
		startHour: 0,
		startMinute: 0,
		endHour: 12,
		endMinute: 59,
		eventType: 0,
		eventDesc: "",
	}
	
	render() {
        return (
        <View style={styles.container}>
	        <ModalDropdown
		        options={eventKeys}
		        defaultValue={eventKeys[this.state.eventType]}
		        defaultIndex={this.state.eventType}
		        onSelect={(index,value)=>this._onEventSelect(index,value)}
	            style={styles.button}
	            textStyle={styles.text}
		        dropdownStyle={styles.down}
		        dropdownTextStyle={styles.downText}
	        />
	        <Button title={this._getTimeString(true)}
	                onPress={start=>this._openTimePicker(true)}/>
	        <Button title={this._getTimeString(false)}
	                onPress={start=>this._openTimePicker(false)}/>
        </View>
	        );
    }
	
	//进行创建时间日期选择器,创建一个'openDataPicker'（名字自定义）
	async _openTimePicker(start){
		try{
			var newState = {};
			var options = {};
			var stateKey = start ? "start" : "end";
			options.is24Hour = true;
			if (start)
			{
				options.hour = this.state.startHour;
				options.minute = this.state.startMinute;
			}
			else
			{
				options.hour = this.state.endHour;
				options.minute = this.state.endMinute;
			}
			const {action, hour, minute} = await TimePickerAndroid.open(options);
			if(action === TimePickerAndroid.dismissedAction){
				newState[stateKey + "Hour"] = options.hour;
				newState[stateKey + 'Minute'] = options.minute;
			}else{
				let tempHour = hour;
				let tempMinute = minute;
				if (start)
				{
					if (hour > this.state.endHour)
					{
						tempHour = options.hour;
						Alert.alert('温馨提醒','开始时间大于结束时间!')
					}
					if (hour == this.state.endHour && minute > this.state.endMinute)
					{
						tempMinute = options.minute;
						Alert.alert('温馨提醒','开始时间大于结束时间!')
					}
				}
				else
				{
					if (hour < this.state.startHour)
					{
						tempHour = options.hour;
						Alert.alert('温馨提醒','结束时间小于开始时间!')
					}
					if (hour == this.state.startHour && minute < this.state.startMinute)
					{
						tempMinute = options.minute;
						Alert.alert('温馨提醒','结束时间小于开始时间!')
					}
				}
				newState[stateKey + "Hour"] = tempHour;
				newState[stateKey + 'Minute'] = tempMinute;
			}
			this.setState(newState);
		}catch({code,message}){
			console.warn("Error in example '${stateKey}': ",message)
		}
	}
	
	_onEventSelect(index,value) {
		this.setState({eventType:index});
		console.log("DropDown select index is " + index.toString() + " value is " + value);
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
}

const styles = StyleSheet.create({
	container: {
		height: 150,
		margin: 10,
		backgroundColor: '#7d7d7d',
	},
	text: {
		fontSize: 15,
		textAlign: 'center',
	},
	downText: {
		fontSize: 10,
		textAlign: 'center',
	},
	button: {
		backgroundColor:'#63B8FF',
		height:30,
		width: 50,
		justifyContent: 'center',
	},
	down: {
		width: 50,
	}
});

module.exports = EventComponent;