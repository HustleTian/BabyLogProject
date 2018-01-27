/**
 * Created by TIAN on 2018/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class EventComponent extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
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