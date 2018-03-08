/**
 * Created by TIAN on 2018/2/20.
 */

import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import NetUtils from './NetUtils';
import Urls from './urlCommands';
import UserController from './UserController';
import Event from '../dao/EventDao';

class EventController{
	/*
	 *  获取用户事件
	 * */
	static getEvent(){
		if (this.event == null || this.event == undefined) {
			this._loadStorage();
		}else {
			DeviceEventEmitter.emit('getEvent',{event:this.event});
		}
	}
	
	static async _loadStorage() {
		storage.load({
			key: 'userEvent',
			autoSync: true,
			syncInBackground: true,
			syncParams: {
				extraFetchOptions: {
					uuid: UserController.getUserUUid(),
				},
			},
		}).then(ret => {
			this.event = new Array();
			// console.warn(ret);
			for (let i = 0; i < ret.length; i++)
			{
				let event = new Event(ret[i]);
				this.event.push(event);
			}
			
			function sortArr(a, b) {
				return a.startTime > b.startTime;
			}
			this.event.sort(sortArr);
			DeviceEventEmitter.emit('getEvent',{event:this.event});
		}).catch(err => {
			DeviceEventEmitter.emit('getEvent',{event:this.event});
		})
	}
	
	/*
	 *  添加事件
	 * */
	static addEvent(param){
		let params = {
			uuid: UserController.getUserUUid(),
			eventType: param.eventType,
			eventDesc: param.eventDesc,
			startTime: param.startTime,
			endTime: param.endTime,
			id: param.id,
		};
		
		NetUtils.post(Urls.urls.addEvent, params,
			(responseJSON)=>{
				// console.warn(responseJSON);
				if (responseJSON == null)
				{
					Alert.alert('温馨提醒','失败！');
					return;
				}
				
				if (responseJSON.code != 200)
				{
					Alert.alert('温馨提醒','失败！');
					return;
				}
				
				let event = new Event(param);
				this.event.push(event);
				function sortArr(a, b) {
					return a.startTime > b.startTime;
				}
				this.event.sort(sortArr);
				
				storage.save({
					key: 'userEvent',
					data: this.event,
				});
				
				DeviceEventEmitter.emit('addEvent');
			}
		);
	}
	
	/*
	 *  修改事件
	 * */
	static editEvent(param){
		let params = {
			uuid: UserController.getUserUUid(),
			eventType: param.eventType,
			eventDesc: param.eventDesc,
			startTime: param.startTime,
			endTime: param.endTime,
			id: param.id,
		};
		
		NetUtils.post(Urls.urls.editEvent, params,
			(responseJSON)=>{
				// console.warn(responseJSON);
				if (responseJSON == null)
				{
					Alert.alert('温馨提醒','失败！');
					return;
				}
				
				if (responseJSON.code != 200)
				{
					Alert.alert('温馨提醒','失败！');
					return;
				}
				
				let event = new Event(param);
				for (let i = 0; i < this.event.length; i++){
					if (this.event[i].id == event.id) {
						this.event[i] = event;
					}
				}
				function sortArr(a, b) {
					return a.startTime > b.startTime;
				}
				this.event.sort(sortArr);
				
				storage.save({
					key: 'userEvent',
					data: this.event,
				})
				
				DeviceEventEmitter.emit('editEvent');
			}
		);
	}
	
}

module.exports = EventController;