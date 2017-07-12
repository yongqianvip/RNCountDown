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
			timerCount: this.props.timerCount || 5,
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
		const overTimeStamp = Math.round(Date.now()/1000) + codeTime/*过期时间戳（秒）*/
		this.interval = setInterval(() =>{
			/* 切换到后台不受影响*/
			const nowStamp = Math.round(Date.now()/1000)
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
				this.setState({
					timerCount: overTimeStamp - nowStamp,
					timerTitle: `重新获取(${overTimeStamp - nowStamp}s)`,
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
		},300)
		/*由于时间戳本是精确到毫秒的，而计算的时候进行了四舍五入取整
		所以这个timer的执行周期需要尽可能的短以规避因四舍五入导致的错误*/
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