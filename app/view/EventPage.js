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
	ListView,
	DeviceEventEmitter
} from 'react-native';
import EventComponent from './Component/EventComponent'
import TextWithButton from './Component/TextWithButton'
import EditPage from './EditPage';
import UserController from '../common/UserController';
import EventController from '../common/EventController';
const PropTypes = require('prop-types');

class EventPage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		date.setTime(props.startTime);
		let day = date.getFullYear().toString() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate().toString();
		
		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2)=> {
				if (r1 !== r2) {
					console.log("不相等=");
					console.log(r1);
				} else {
					console.log("相等=");
					console.log(r1);
					console.log(r2);
				}
				return r1 !== r2;
			}
		});
		
		this.data = new Array();
		this.state = {
			dataSource: ds.cloneWithRows(this.data),
			startTime: props.startTime,     //当天0点的时间戳
			lastEndTime: props.startTime,   //最新一个事件的结束时间
			today: "日期:" + day,           //当天日期
			uuid: UserController.getUserUUid(),
		};
		// console.warn(props.startTime);
	}
	
	static propTypes = {
		startTime: PropTypes.number,
		uuid: PropTypes.string,
	}
	
	static defaultProps = {
		startTime : new Date().getTime(),
		uuid : '',
	}
	
	componentWillMount() {
		this.getEventSubscription = DeviceEventEmitter.addListener('getEvent',(events) =>{
			// console.warn(events);
			let data = new Array();
			let lastEndTime = 0;
			for (let i = 0; i < events.event.length; i++)
			{
				if (events.event[i].startTime >= this.state.startTime && events.event[i].endTime <= this.state.startTime + 86400000)
				{
					data.push(events.event[i]);
					if (events.event[i].endTime > lastEndTime)
					{
						lastEndTime = events.event[i].endTime;
					}
				}
			}
			
			this.data = data;
			this.setState({
				lastEndTime: lastEndTime == 0 ? this.state.lastEndTime : lastEndTime,
				dataSource: this.state.dataSource.cloneWithRows(this.data),
			});
		});
		this._loadData();
	}
	
	componentWillUnmount() {
		this.getEventSubscription.remove();
	}
	
	_loadData() {
		EventController.getEvent();
	}

    _addEvent() {
	    this.setState({
		    dataSource: this.state.dataSource.cloneWithRows(new Array())
	    });
	    
	    const { navigator} = this.props;
	    if (navigator) {
		    navigator.push({
			    name:'EditPage',
			    component:EditPage,
			    params: {
	                startTime: this.state.lastEndTime,
				    callBack: ()=>{
	                	this._loadData();
				    }
                }
		    })
	    }
    }
    
    _editEvent(id) {
		// console.warn(id);
	    const { navigator} = this.props;
	    if (navigator) {
	    	let comData = null;
	    	for (var i = 0; i < this.data.length; i++)
		    {
		        if (this.data[i].id == id)
		        {
		            comData = this.data[i];
		        }
		    }
		    if (comData == null)
		    {
		    	return;
		    }
		    this.setState({
			   dataSource: this.state.dataSource.cloneWithRows(new Array())
		    });
		    navigator.push({
			    name:'EditPage',
			    component:EditPage,
			    params: {
			        id: comData.id,
				    startTime: comData.startTime,
                    endTime: comData.endTime,
                    eventType: comData.eventType,
                    eventDesc: comData.eventDesc,
				    callBack: ()=>{
					    this._loadData();
				    }
			    }
		    })
	    }
    }
	
	//界面回退
	_goBack() {
		const { navigator} = this.props;
		if (navigator) {
			navigator.pop()
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
                    onClick= {()=>this._goBack()}
                    bTitle="返回"/>
	            <TextWithButton
		            title=''
		            onClick= {()=>this._addEvent()}
		            bTitle="添加"/>
	            <ListView
		            dataSource={this.state.dataSource}
		            renderRow={(rowData, sectionID, rowID, highlightRow)=>this._renderRow(rowData, sectionID, rowID, highlightRow)}
		            enableEmptySections={true}
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