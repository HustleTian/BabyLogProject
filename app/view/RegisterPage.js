/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Button,
    Alert,
    DatePickerAndroid,
} from 'react-native';
import HomePage from './HomePage';
import NetUtils from '../common/NetUtils'
import Urls from '../common/urlCommands'

class RegisterPage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		this.state = {
			name: "",
			password: "",
			year: date.getFullYear(),
			month: date.getMonth(),
			day: date.getDate(),
		}
	}
	
	_handleNameChange(e) {
		this.setState({
			name: e.nativeEvent.text
		})
	}
	
	_handlePasswordChange(e) {
		this.setState({
			password: e.nativeEvent.text
		})
	}
	
	//进行创建时间时间选择器
	async _openDatePicker(){
		try{
			var options = {
				date: new Date()
			};
			const {action, year, month, day} = await DatePickerAndroid.open(options);
			if(action != DatePickerAndroid.dismissedAction){
				this.setState({
					year: year,
					month: month,
					day: day,
				});
			}
		}catch({code,message}){
			console.warn('Cannot open date picker', message);
		}
	}
	
	//时间转成字符串
	_getDateString() {
		var ret = this.state.year.toString() + "/";
		ret = ret + (this.state.month + 1).toString() + "/";
		ret = ret + this.state.day.toString();
		return ret;
	}
	
	_sendAction() {
		let date = new Date(this.state.year,this.state.month,this.state.day);
		let birthday = date.getTime();
		NetUtils.post(Urls.urls.register,
			{username:this.state.name,password:this.state.password,birthday:birthday},
			(responseJSON)=>{
				// console.warn(responseJSON);
				if (responseJSON == null)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}

				if (responseJSON.code != 200)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}

				if (responseJSON.uuid == null)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}

				storage.save({
					key: 'userInfo',
					data: {
						username: this.state.name,
						password: this.state.password,
						uuid: responseJSON.uuid,
						birthday: this.state.birthday,
					},
				})

				const { navigator} = this.props;
				if (navigator) {
					navigator.push({
						name:'HomePage',
						component:HomePage,
					})
				}
			}
		);
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					欢迎来到喂养日志
				</Text>
				<View style={styles.line} />
				<Text style={styles.instructions}>
					用户名
				</Text>
				<TextInput
					style={styles.input}
					numberOfLines={1}
					autoFocus={false}
					underlineColorAndroid={'transparent'}
					textAlign='center'
					value={this.state.name}
					onChange={e => this._handleNameChange(e)}
				/>
				<Text style={styles.instructions}>
					密码
				</Text>
				<TextInput
					style={styles.input}
					numberOfLines={1}
					autoFocus={false}
					underlineColorAndroid={'transparent'}
					textAlign='center'
					value={this.state.password}
					onChange={e => this._handlePasswordChange(e)}
				/>
				<View style={styles.line} />
				<Button title={this._getDateString()}
				        onPress={() => this._openDatePicker()}/>
				<View style={styles.line} />
				<Button title="注册"
						onPress={() => this._sendAction()}/>
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
	welcome: {
		fontSize: 20,
	},
	instructions: {
		fontSize: 15,
		color: '#333333',
		marginBottom: 5,
	},
	line: {
		height: 10,
		backgroundColor: '#000000'
	},
	input:{
		backgroundColor:'#8692b0',
		height:35,
		width: 200,
	},
});

module.exports = RegisterPage;