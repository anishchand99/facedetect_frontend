import React, {Component} from 'react';
import './register.css';

class Register extends Component{
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
		this.nameRef = React.createRef();
		this.emailRef = React.createRef();
		this.passRef = React.createRef();
	}

	onNameChange=(event) => {
		this.nameRef.current.placeholder = "";
		this.setState({name: event.target.value});
	}
	onEmailChange=(event)=>{
		this.emailRef.current.placeholder = "";
		this.setState({email: event.target.value});
	}
	onPasswordChange=(event)=>{
		this.passRef.current.placeholder = "";
		this.setState({password: event.target.value});
	}
	validateEmail= (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}
	onRegisterClick=()=>{
		if(this.state.name === "" || this.state.name === null){
			this.nameRef.current.placeholder = "Proper Name is Required";
			return;
		}
		if((this.validateEmail(this.state.email) === false)){
			this.emailRef.current.value = "";
			this.emailRef.current.placeholder = "Proper Email is Required";
			return;
		}
		if(this.state.password === "" || this.state.password.length < 6){
			this.passRef.current.value = "";
			this.passRef.current.placeholder = "Password must be 6 characters";
			return;
		}
		fetch('https://quiet-anchorage-89707.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password 
			})
		}).then(response =>response.json())
		.then(user => {
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}
	render(){
		return(
			<div className = 'register'>
				<h2>Register</h2>
				<div className = 'center'> Name </div>
				<input className = 'blank' type="text" onChange = {this.onNameChange} placholder='' ref = {this.nameRef} required/>
				<div className = 'center'> Email </div>
				<input className = 'blank' type="text" onChange = {this.onEmailChange} placholder='' ref = {this.emailRef} required/>
				<div className = 'center'> Password</div>
				<input className = 'blank' type="password" onChange = {this.onPasswordChange} placholder='' ref = {this.passRef} required/>
				<div className ='submit' onClick = {this.onRegisterClick}> Register </div>
			</div>
		);
	}
}
export default Register;	