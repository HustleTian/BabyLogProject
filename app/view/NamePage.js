/**
 * Created by TIAN on 2018/3/9.
 */

import React, { Component } from 'react';
import {
	Text,
	Button,
	View
} from 'react-native';

class NamePage extends Component<{}> {
	_showNameSelectView(type) {
		const { navigator} = this.props;
		if (navigator) {
			navigator.push({
				name:'NamePage',
				component:NamePage,
				params: {
					type: type,
				}
			})
		}
	}
	
	render() {
		return (
			<View style={styles.container}>
				<Button title={'11+6'}
				        onPress={type=>this._showNameSelectView(1)}/>
				<Button title={'11+22'}
				        onPress={type=>this._showNameSelectView(2)}/>
				<Button title={'21+12'}
				        onPress={type=>this._showNameSelectView(3)}/>
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
});

module.exports = NamePage;