/**
 * Created by TIAN on 2018/1/25.
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from 'react-native';

class TextWithButton extends Component<{}> {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.title}>
					<Text style={styles.titleLabel}>
						{this.props.title}
					</Text>
				</View>
				<TouchableOpacity onPress = {this.props.onClick}>
					<View  style={styles.button} >
						<Text style={styles.buttonLabel}>
							{this.props.bTitle}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 30,
		backgroundColor: '#7d7d7d',
		flexDirection: 'row'
	},
	title: {
		flex: 1,
        justifyContent: 'center',
    },
	titleLabel: {
        fontSize: 25,
        color: '#000000',
	},
	button: {
		backgroundColor:'#63B8FF',
		height:30,
		width: 100,
		borderRadius:5,
		justifyContent: 'center',
	},
	buttonLabel: {
		fontSize: 20,
		textAlign: 'center',
		color: '#ffffff',
	},
});

module.exports = TextWithButton;