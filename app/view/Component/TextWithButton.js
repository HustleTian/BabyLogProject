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
				<Text style={styles.label}>
					{this.props.title}
				</Text>
				<TouchableOpacity onPress = {this.props.onClick}>
					<View  style={styles.commit} >
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
	label: {
		flex: 1,
		textAlign: 'left',
	},
	button: {
		flex: 1,
		backgroundColor:'#63B8FF',
		height:20,
		width: 100,
		borderRadius:5,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	buttonLabel: {
		fontSize: 15,
		textAlign: 'center',
		color: '#ffffff',
	},
});

module.exports = TextWithButton;