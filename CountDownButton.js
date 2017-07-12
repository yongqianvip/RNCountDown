/*
* @author:  yinyongqian
* @createTime:  2017-04-06, 09:41:06 GMT+0800
* @description:  description
*/
"use strict";

import React,{PropTypes} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	ViewPropTypes
} from 'react-native';
export default class TimerButton extends React.Component {
	constructor(props) {
	  super(props)
		this.state = {
			timerCount: this.props.timerCount || 60,
			timerTitle: this.props.timerTitle || '获取验证码',
			counting: false,
			selfEnable: true,
		};
		this._shouldStartCountting = this._shouldStartCountting.bind(this)
		this._countDownAction = this._countDownAction.bind(this)
	}
	static propTypes = {
	  style: ViewPropTypes.style,
	  textStyle: Text.propTypes.style,
	  onClick: PropTypes.func,
	  disableColor: PropTypes.string,
	  timerTitle: PropTypes.string,
	  enable: PropTypes.oneOfType([PropTypes.bool,PropTypes.number]),
	  timerEnd: PropTypes.func
	};

	_countDownAction(){
		const codeTime = this.state.timerCount;
		const now = Date.now()
		const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
		this.interval = setInterval(() =>{
			/* 切换到后台不受影响*/
			const nowStamp = Date.now()
			if (nowStamp >= overTimeStamp) {
				/* 倒计时结束*/
				this.interval&&clearInterval(this.interval);
				this.setState({
					timerCount: codeTime,
					timerTitle: this.props.timerTitle || '获取验证码',
					counting: false,
					selfEnable: true
				})
				if (this.props.timerEnd) {
					this.props.timerEnd()
				};
			}else{
				const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10)
				this.setState({
					timerCount: leftTime,
					timerTitle: `重新获取(${leftTime}s)`,
				})
			}
			/* 切换到后台 timer 停止计时 */
			/*
			const timer = this.state.timerCount - 1
			if(timer===0){
				this.interval&&clearInterval(this.interval);
				this.setState({
					timerCount: codeTime,
					timerTitle: this.props.timerTitle || '获取验证码',
					counting: false,
					selfEnable: true
				})
			}else{
				this.setState({
					timerCount:timer,
					timerTitle: `重新获取(${timer}s)`,
				})
			}
			*/
		},1000)
	}
	_shouldStartCountting(shouldStart){
		if (this.state.counting) {return}
		if (shouldStart) {
			this._countDownAction()
			this.setState({counting: true,selfEnable:false})
		}else{
			this.setState({selfEnable:true})
		}
	}
	componentWillUnmount(){
		clearInterval(this.interval)
	}
	render(){
		const {onClick,style,textStyle,enable,disableColor} = this.props
		const {counting,timerTitle,selfEnable} = this.state
		return (
			<TouchableOpacity activeOpacity={counting ? 1 : 0.8} onPress={()=>{
				if (!counting && enable && selfEnable) {
					this.setState({selfEnable:false})
					this.props.onClick(this._shouldStartCountting)
				};
			}}>
				<View style={[{width:120, height:44,justifyContent:'center',alignItems:'center'},style]}>
					<Text style={[{fontSize: 16},textStyle,{color: ((!counting && enable && selfEnable) ? (textStyle ? textStyle.color : 'blue') : disableColor || 'gray')}]}>{timerTitle}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}