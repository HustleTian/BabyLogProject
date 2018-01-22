/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity
} from 'react-native';

class RegisterPage extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			password: "",
		}
	}
	
	handleNameChange(e) {
		this.setState({
			name: e.nativeEvent.text
		})
	}
	
	handlePasswordChange(e) {
		this.setState({
			password: e.nativeEvent.text
		})
	}
	
	sendAction() {
	
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
					onChange={e => this.handleNameChange(e)}
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
					onChange={e => this.handlePasswordChange(e)}
				/>
				<View style={styles.line} />
				<TouchableOpacity onPress={() => {this.sendAction();}}>
					<View  style={styles.style_view_commit} >
						<Text style={styles.login}>
							登陆
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
	instructions: {
		fontSize: 20,
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	login: {
		fontSize: 15,
		textAlign: 'center',
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
	style_view_commit:{
		backgroundColor:'#63B8FF',
		height:35,
		width: 100,
		borderRadius:5,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

module.exports = RegisterPage;