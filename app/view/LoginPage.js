/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	Button,
} from 'react-native';
import HomePage from './HomePage';
import NetUtils from '../common/NetUtils';
import Urls from '../common/urlCommands';

class LoginPage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			password: "",
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
	
	_sendAction() {
		NetUtils.post(Urls.urls.login,
			{username:this.state.name,password:this.state.password},
			(responseJSON)=>{
				if (json == null)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				if (json.code != 200)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				if (json.rows == null || json.rows.length <= 0)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				storage.save({
					key: 'userInfo',
					data: json.rows[0],
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
				<Button title="登陆"
				        onPress={()=>this._sendAction()}/>
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
	login: {
		fontSize: 15,
		color: '#ffffff',
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

module.exports = LoginPage;