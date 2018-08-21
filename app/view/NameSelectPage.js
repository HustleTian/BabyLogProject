/**
 * Created by TIAN on 2018/3/9.
 */

import React, { Component } from 'react';
import {
	Text,
	Button,
	View
} from 'react-native';

var eleven = ['彩','曹','常','晨','崇','得','钓','珮','阡','馗','旌','寂','绅','讼','责','笛','国','坚','健','皎','竟','乾','强','圈','笙','倏','崧','梯','梧','悟','晤','偕','英','苑','梓','匾','晦','浚','曼','苗','粕','浦','涕','涂','望','涎','烽','晗','焓','聊','羚','翎','聆','略','晟','悌','侦','振','培','婉','唯','伟','尉','峥','浩','翌'];
var six = ['兆','竹','臣','存','任','早','共','企','旭','仰','朱','百','仿','妃','好','合','米','名','印','弛','亘','光','全','安','伊','宇','羽','行','向','至','充','岌','似','伍','亦','屹'];
var ttwo = ['鉴','权','苏','沣','霁','穰','藻','颤','读','懿','巅','璎','潆'];
var tone = ['镰','顾','颢','艺','辩','霹','跃'];
var twelve = ['朝','词','钧','竣','钠','然','善','顺','斯','童','惜','琇','喻','曾','註','策','皓','景','凯','棋','茜','乔','雅','最','博','淳','富','涵','淏','贺','徨','惠','淋','贸','尛','评','普','淇','淞','涴','喜','渊','云','登','迪','晶','量','婷','惋','媛','证','翔','壹','贻','现'];
class NameSelectPage extends Component<{}> {
	constructor(props) {
		super(props);
		let type = props.type;
		let sData = new Array();
		let tData = new Array();
		if (type == 1) {
			for (let i = 0; i < 11; i++) {
				sData.push(eleven[i]);
			}
			for (let i = 0; i < 6; i++) {
				tData.push(six[i]);
			}
		}else if (type == 2) {
			for (let i = 0; i < 11; i++) {
				sData.push(eleven[i]);
			}
			for (let i = 0; i < 22; i++) {
				tData.push(ttwo[i]);
			}
		}else if (type == 3) {
			for (let i = 0; i < 21; i++) {
				sData.push(tone[i]);
			}
			for (let i = 0; i < 12; i++) {
				tData.push(twelve[i]);
			}
		}
		this.state = {
			type: type,
			sName: '*',
			tName: '*',
			sData: sData,
			tData: tData,
		}
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
		backgroundColor: '#ffffff',
	},
});

module.exports = NameSelectPage;