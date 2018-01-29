/**
 * Created by TIAN on 2018/1/27.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

class EventChartsComponent extends Component<{}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
            
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7d7d7d',
    },
});

module.exports = EventChartsComponent;