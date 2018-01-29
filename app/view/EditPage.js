/**
 * Created by TIAN on 2018/1/27.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	Alert,
	TextInput,
	TimePickerAndroid,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
const PropTypes = require('prop-types');
import TextWithButton from './Component/TextWithButton'

var eventKeys = ['事件1', '事件2', '事件3'];
class EditPage extends Component<{}> {
	constructor(props) {
		super(props);
		let data = new Date();
		data.setTime(props.startTime);
		let shour = data.getHours();
		let sminute = data.getMinutes();
		let ssecond = data.getSeconds();
		
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
			eventType: props.eventType,             //事件类型
			eventDesc: props.eventDesc,             //事件描述
			id: props.id,                           //事件id  id==-1时为新建事件
			title: props.id == -1 ? "新建" : "修改",
		};
	}
	
	static propTypes = {
		id: PropTypes.number,
		startTime: PropTypes.number,
		endTime: PropTypes.number,
		eventType: PropTypes.number,
		eventDesc: PropTypes.string,
	}
	
	static defaultProps = {
		id : -1,
		startTime : new Date().getTime(),
		endTime: -1,
		eventType : 0,
		eventDesc : "",
	}
	
	//进行创建时间时间选择器
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
	
	//选择事件
	_onEventSelect(index,value) {
		this.setState({eventType:index});
		console.log("DropDown select index is " + index.toString() + " value is " + value);
	}
	
	//时间转成字符串
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
	
	//描述变化handler
	_handleDescChange(e) {
		this.setState({
			eventDesc: e.nativeEvent.text
		});
	}
	
	//存库
	_save() {
	
	}
	
	//界面回退
	_goBack() {
		const { navigator} = this.props;
		if (navigator) {
			navigator.pop()
		}
	}
	
	render() {
		return (
			<View style={styles.container}>
				<TextWithButton
					title={this.state.title}
					onClick={()=>this._goBack()}
					bTitle="后退"/>
				<View style={{flex: 1}}>
					<Text style={styles.text}>
						请选择事件:
					</Text>
					<ModalDropdown
						options={eventKeys}
						defaultValue={eventKeys[this.state.eventType]}
						defaultIndex={this.state.eventType}
						onSelect={(index,value)=>this._onEventSelect(index,value)}
						style={styles.dropDown}
						textStyle={styles.dropDownText}
						dropdownStyle={styles.down}
						dropdownTextStyle={styles.downText}
					/>
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
						描述:
					</Text>
					<TextInput
						style={styles.input}
						placeholder="非必填"
						numberOfLines={10}
						multiline={true}
						autoFocus={false}
						underlineColorAndroid={'transparent'}
						value={this.state.eventDesc}
						onChange={e=>this._handleDescChange(e)}
					/>
					<Button title="保存" onPress={()=>this._save()}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ffffff',
	},
	text: {
		fontSize: 20,
		marginTop: 10,
		marginBottom: 10
	},
	dropDownText: {
		fontSize: 15,
		textAlign: 'center',
	},
	downText: {
		fontSize: 10,
		textAlign: 'center',
	},
	dropDown: {
		backgroundColor:'#7d7d7d',
		height:40,
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
	},
	down: {
		width: 80,
	},
	input:{
		backgroundColor:'#8692b0',
		height: 100,
		width: 300,
		textAlignVertical: 'top',
		textAlign: 'left',
		marginBottom: 10,
	},
});

module.exports = EditPage;