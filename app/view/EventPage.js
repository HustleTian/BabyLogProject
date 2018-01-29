/**
 * Created by summer on 18/1/25.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
	ListView
} from 'react-native';
import EventComponent from './Component/EventComponent'
import TextWithButton from './Component/TextWithButton'
import EditPage from './EditPage';
const PropTypes = require('prop-types');
var data = require("../common/data.json");
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class EventPage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		date.setTime(props.startTime);
		let day = date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getDate().toString();
		this.state = {
			data: data,
			startTime: props.startTime,     //当天0点的时间戳
			lastEndTime: props.startTime,   //最新一个事件的结束时间
			today: "日期:" + day,//当天日期
		};
		this._processData();
	}
	
	static propTypes = {
		startTime: PropTypes.number,
	}
	
	static defaultProps = {
		startTime : new Date().getTime(),
	}
	
	_processData() {
		// var sortById = function(){
		// 	return function(o, p){
		// 		let a, b;
		// 		if (typeof o === "object" && typeof p === "object" && o && p) {
		// 			a = o.startTime;
		// 			b = p.startTime;
		// 			if (a === b) {
		// 				return 0;
		// 			}
		// 			if (typeof a === typeof b) {
		// 				return a < b ? -1 : 1;
		// 			}
		// 			return typeof a < typeof b ? -1 : 1;
		// 		}
		// 		else {
		// 			throw ("error");
		// 		}
		// 	}
		// }
		// this.state.data.sort(sortById);
		// if (this.state.data.length > 0) {
		// 	this.setState({
		// 		lastEndTime: this.state.data[this.state.data.length - 1].endTime
		// 	});
		// }
	}

    _addEvent() {
	    const { navigator} = this.props;
	    if (navigator) {
		    navigator.push({
			    name:'EditPage',
			    component:EditPage,
			    params: {
	                startTime: this.state.lastEndTime,
                }
		    })
	    }
    }
    
    _editEvent(id) {
	    const { navigator} = this.props;
	    if (navigator) {
	    	let comData = null;
	    	for (var i = 0; i < this.state.data.length; i++)
		    {
		        if (this.state.data[i].id == id)
		        {
		            comData = this.state.data[i];
		        }
		    }
		    if (comData == null)
		    {
		    	return;
		    }
		    navigator.push({
			    name:'EditPage',
			    component:EditPage,
			    params: {
			        id: comData.id,
				    startTime: comData.startTime,
                    endTime: comData.endTime,
                    eventType: comData.eventType,
                    eventDesc: comData.eventDesc,
			    }
		    })
	    }
    }
	
	_renderRow(rowData, sectionID, rowID, highlightRow) {
		return(
			<EventComponent
				id={rowData.id}
			    startTime={rowData.startTime}
			    endTime={rowData.endTime}
			    eventType={rowData.eventType}
			    eventDesc={rowData.eventDesc}
			    callback={(id)=>this._editEvent(id)}
			/>
		);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextWithButton
                    title={this.state.today}
                    onClick= {()=>this._addEvent()}
                    bTitle="添加"/>
	            <ListView
		            dataSource={ds.cloneWithRows(this.state.data)}
		            renderRow={(rowData, sectionID, rowID, highlightRow)=>this._renderRow(rowData, sectionID, rowID, highlightRow)}
	            />
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