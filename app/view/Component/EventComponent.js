/**
 * Created by TIAN on 2018/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import DateTimePicker from 'react-native-datetime';

class EventComponent extends Component<{}> {
	constructor(props) {
		super(props);
		this._getOptions = this._getOptions.bind(this);
		this._onSelect = this._onSelect.bind(this);
		this.state = {date: new Date()};
	}
	
    render() {
        return (
            <View style={styles.container}>
                <ModalDropdown
                    options={this._getOptions()}
                    defaultValue="活动1"
                    defaultIndex={0}
                    onSelect={this._onSelect()}
                />
                <Text style={{textAlign: 'center'}}>
		            test test test
                </Text>
                <Text style={{textAlign: 'center'}}>
		            {this.state.date.toString()}
                </Text>
                <View style={{height:40}} />
                <Button onPress={this.showDatePicker}>
                    <Text showDatePicker/>
                </Button>
                <View style={{height:40}} />
                <Button onPress={this.showTimePicker}>
                    <Text showDatePicker/>
                </Button>
                <View style={{height:40}} />
                <Button onPress={this.showDateTimePicker}>
                    <Text showDateTimePicker/>
                </Button>
                <DateTimePicker ref={(picker)=>{this.picker=picker}}/>
            </View>
        );
    }
    
    _getOptions() {
        return ['option 1', 'option 2', 'option 3'];
    }
    
    _onSelect() {
    
    }
	
	getInitialState() {
		return {
			date: new Date(),
		}
	}
	
	showDatePicker() {
		var date = this.state.date;
		this.picker.showDatePicker(date, (d)=>{
			this.setState({date:d});
		});
	}
	
	showTimePicker() {
		var date = this.state.date;
		this.picker.showTimePicker(date, (d)=>{
			this.setState({date:d});
		});
	}
	
	showDateTimePicker() {
		var date = this.state.date;
		this.picker.showDateTimePicker(date, (d)=>{
			this.setState({date:d});
		});
	}
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: '#7d7d7d',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

module.exports = EventComponent;