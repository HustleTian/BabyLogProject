/**
 * Created by TIAN on 2018/2/19.
 */

import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import User from '../dao/UserDao';
import NetUtils from './NetUtils';
import Urls from './urlCommands';

class UserController{
	/*
	 *  获取用户信息
	 * */
	static getUser(key){
		if (this.user == null) {
			this._loadStorage(key);
		}else {
			DeviceEventEmitter.emit(key,{user:this.user});
		}
	}
	
	static getUserUUid(){
		return this.user.uuid;
	}
	
	static async _loadStorage(key) {
		await storage.load({
			key: 'userInfo',
			autoSync: false,
			syncInBackground: false
		}).then(ret => {
			this.user = new User(ret);
			DeviceEventEmitter.emit(key,{user:this.user});
		}).catch(err => {
			DeviceEventEmitter.emit(key,{user:this.user});
		})
	}
	
	/*
	 *  用户登陆
	 * */
	static userLogin(username,password){
		NetUtils.post(Urls.urls.login,
			{username:username,password:password},
			(responseJSON)=>{
				if (responseJSON == null)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				if (responseJSON.code != 200)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				if (responseJSON.rows == null || responseJSON.rows.length <= 0)
				{
					Alert.alert('温馨提醒','用户名或密码错误！');
					return;
				}
				
				storage.save({
					key: 'userInfo',
					data: responseJSON.rows[0],
				});
				
				this.user = new User(responseJSON.rows[0]);
				DeviceEventEmitter.emit('userLogin');
			}
		);
	}
	
	/*
	 *  用户注册
	 * */
	static userRegister(param){
		// console.warn(param);
		NetUtils.post(Urls.urls.register,
			{username:param.username,password:param.password,birthday:param.birthday,nickname:param.nickname},
			(responseJSON)=>{
				// console.warn(responseJSON);
				if (responseJSON == null)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}
				
				if (responseJSON.code != 200)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}
				
				if (responseJSON.uuid == null)
				{
					Alert.alert('温馨提醒','注册失败！');
					return;
				}
				
				param.uuid = responseJSON.uuid;
				storage.save({
					key: 'userInfo',
					data: param,
				})
				
				this.user = new User(param);
				DeviceEventEmitter.emit('userRegister');
			}
		);
	}
	
}

module.exports = UserController;