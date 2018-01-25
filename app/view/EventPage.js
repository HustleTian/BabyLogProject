/**
 * Created by summer on 18/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import EventComponent from './Component/EventComponent'

class EventPage extends Component<{}> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{fontSize:30, marginLeft: 10}}>
                    日期:
                </Text>
                <EventComponent/>
                <EventComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'column',
    },
});

module.exports = EventPage;