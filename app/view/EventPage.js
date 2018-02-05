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
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class EventPage extends Component<{}> {
	constructor(props) {
		super(props);
		let date = new Date();
		date.setTime(props.startTime);
		let day = date.getFullYear().toString() + "-" + date.getMonth().toString() + "-" + date.getDate().toString();
		this.state = {
			data: new Array(),
			startTime: props.startTime,     //当天0点的时间戳
			lastEndTime: props.startTime,   //最新一个事件的结束时间
			today: "日期:" + day,           //当天日期
			uuid: props.uuid,
		};
		console.warn(props.startTime);
		this._loadData();
	}
	
	static propTypes = {
		startTime: PropTypes.number,
		uuid: PropTypes.string,
	}
	
	static defaultProps = {
		startTime : new Date().getTime(),
		uuid : '',
	}
	
	_loadData() {
		storage.load({
			key: 'userEvent',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
				extraFetchOptions: {
					uuid: this.state.uuid,
				},
			},
		}).then(ret => {
			let data = new Array();
			let lastEndTime = 0;
			for (let i = 0; i < ret.length; i++)
			{
				if (ret[i].startTime >= this.state.startTime && ret[i].endTime <= this.state.startTime + 86400000)
				{
					data.push(ret[i]);
					if (ret[i].endTime > lastEndTime)
					{
						lastEndTime = ret[i].endTime;
					}
				}
			}
			
			this.setState({
				lastEndTime: lastEndTime,
				data: data,
			});
		}).catch(err => {
			console.warn('Load userInfo fail ', err);
		});
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
		if (this.state.data.length == 0)
		{
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
				</View>
			);
		}
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