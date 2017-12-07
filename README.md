# RNCountDown
[![Build Status](https://travis-ci.org/yongqianvip/RNCountDown.svg?branch=master)](https://travis-ci.org/yongqianvip/RNCountDown)
[![npm version](https://badge.fury.io/js/react-native-smscode-count-down.svg)](https://badge.fury.io/js/react-native-smscode-count-down)

点击按钮发送请求获取验证码，获取成功后按钮上显示倒计时  

![](http://7xp7q7.com1.z0.glb.clouddn.com/image/jianshu/RN/countdown.gif)
## 使用
install：

	npm install react-native-smscode-count-down --save

usage：

	import CountDownButton from 'react-native-smscode-count-down'
	
	...
	
	<CountDownButton
		style={{width: 110,marginRight: 10}}
		textStyle={{color: 'blue'}}
		timerCount={60}
		timerTitle={'获取验证码'}
		enable={phoneNum.length > 10}
		onClick={(shouldStartCounting)=>{
			//随机模拟发送验证码成功或失败
			const requestSucc = Math.random() + 0.5 > 1; 
      		shouldStartCounting(requestSucc)
		}}
		timerEnd={()=>{
			this.setState({
				state: '倒计时结束'
			})
		}}/>
		

|props|type|default value|mark|
|:---:|:---:|:---:|:---:|
| onClick|func|-|点击后触发，同时将按钮置为不可用，配合`shouldStartCountting` 使用|
| timerCount|number|60|倒计时时长|
| shouldStartCountting|func|-|决定是否开始倒计时的回调函数，参数类型Bool|
|style|View style|-|-|
| textStyle |Text style|-|-|
| disableColor |string|gray|按钮不可用状态下的颜色|
| enable |bool|false|按钮是否可用（比如用户输入合法手机号时可用，否则不可用）|
| timerEnd |func|-|倒计时结束的回调函数|
| timerActiveTitle |array|['重新获取（', 's）']|倒计时的数字会插在数组第一项之后，如：['请在', '秒后重新获取']，显示为【请在60秒后重新获取】|


- `shouldStartCountting`：回调函数，接受一个`Bool`类型的参数
	* `shouldStartCountting(true)`，开始倒计，但按钮仍不可点击，直到倒计时结束
	* `shouldStartCountting(false)`， 按钮恢复可点击状态，但不会开始倒计时
