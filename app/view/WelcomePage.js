/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
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
				<TouchableOpacity onPress={() => {this._goToLogin();}}>
					<View  style={styles.commit} >
						<Text style={styles.login}>
							登陆
						</Text>
					</View>
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity onPress={() => {this._goToRegister();}}>
					<View  style={styles.commit} >
						<Text style={styles.login}>
							注册
						</Text>
					</View>
				</TouchableOpacity>
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
		fontSize: 30,
		textAlign: 'center',
		margin: 10,
	},
	line: {
		height: 10,
		backgroundColor: '#000000'
	},
	commit:{
		backgroundColor:'#63B8FF',
		height:35,
		width: 100,
		borderRadius:5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

module.exports = WelcomePage;