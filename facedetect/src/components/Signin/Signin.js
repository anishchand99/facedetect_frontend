import React, {Component} from 'react';
import './Signin.css';

class Signin extends Component{
	constructor(props){
		super(props);
		this.state = {
			signInEmail: '',
			signInPassword: ''
		}
	}	
	onEmailChange = (event) => {
		this.setState({signInEmail : event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({signInPassword : event.target.value});
	}

	onSubmitSignIn = () => {
		fetch('https://quiet-anchorage-89707.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail, 
				password: this.state.signInPassword
			})
		})
		.then(response => response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}

	render(){
		const {onRouteChange} = this.props;
		return(
			<div className = 'signin'>
				<h2>Sign In</h2>
				<div className = 'center'> Email </div>
				<input className = 'blank' type="text" onChange = {this.onEmailChange}/>
				<div className = 'center'> Password</div>
				<input className = 'blank' type="password" onChange = {this.onPasswordChange}/>
				<div>
				<button className = "submit" onClick = {this.onSubmitSignIn}> Sign in </button>	
				</div>
				<div className ='registerButton' onClick = {() => onRouteChange('register')}> Register </div>
			</div>
		);
	}
}
export default Signin;	