/**
 * Created by TIAN on 2018/1/21.
 */

import React, { Component } from 'react';

// const root_Url = "http://52.78.76.208:3000/";
const root_Url = "http://10.10.20.204:3000/";
class NetUtils extends Component{
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(root_Url+url,{
            method: 'GET',
        })
            .then((response) => {
                callback(response)
            }).done();
    }
    /*
     *  post请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static post(url,params,callback){
        //fetch请求
        fetch(root_Url+url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }



}

module.exports = NetUtils;