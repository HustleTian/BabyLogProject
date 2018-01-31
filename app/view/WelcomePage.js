/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button
} from 'react-native';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

class WelcomePage extends Component<{}> {
	/**
	 * 跳转登陆
	 */
	_goToLogin() {
		this.props.navigator.push({
			component: LoginPage,
			name: 'LoginPage',
		})
	}
	
	/**
	 * 跳转注册
	 */
	_goToRegister() {
		this.props.navigator.push({
			component: RegisterPage,
			name: 'RegisterPage',
		})
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					欢迎来到喂养日志
				</Text>
				<View style={styles.line} />
				<Button title="登陆"
				        onPress={()=>this._goToLogin()}/>
				<View style={styles.line} />
				<Button title="注册"
				        onPress={()=>this._goToRegister()}/>
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
	line: {
		height: 10,
		backgroundColor: '#000000'
	},
});

module.exports = WelcomePage;