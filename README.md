# RNCountDown

点击按钮发送请求获取验证码，获取成功后按钮上显示倒计时  

![](http://7xp7q7.com1.z0.glb.clouddn.com/image/jianshu/RN/countdown.gif)
## 使用
安装：

	npm install react-native-smscode-count-down

示例：

	import CountDownButton from 'react-native-smscode-count-down'
	
	...
	
	<CountDownButton
		style={{width: 110,marginRight: 10}}
		textStyle={{color: 'blue'}}
		timerCount={60}
		timerTitle={'获取验证码'}
		enable={phoneNum.length > 10}
		onClick={(shouldStartCounting)=>{
			this._requestAPI(shouldStartCounting)
		}}
		timerEnd={()=>{
			this.setState({
				state: '倒计时结束'
			})
		}}/>
		
唯一需要解释的是`shouldStartCountting`  

- 它是一个回调函数，接受一个`Bool`类型的参数
- `onClick`触发后按钮`selfEnable`会立即被置为`false`
- 通过`onClick`中的一系列逻辑处理之后需要调用这个回调函数  

	* `shouldStartCountting(true)`，开始倒计时，倒计时结束时自动恢复初始状态
	* `shouldStartCountting(false)`， 按钮的`selfEnable`会立即被置为`true`
