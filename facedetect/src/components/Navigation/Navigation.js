import React, {Component} from 'react';
import './Navigation.css';

class Navigation extends Component{
	render(){
		const {onRouteChange, isSignedIn} = this.props;
		if(isSignedIn){
			return(
			<div className = 'navbar'>
				<div className = 'face'>
					Face-Dectector
				</div>	
				<div className = 'sign' onClick={() => onRouteChange('signout')}>
					Sign Out
				</div>
			</div>
			)
		} else {
			return(
			<div className = 'navbar'>
				<div className = 'face'>
					Face-Dectector
				</div>	
				<div className = 'sign' onClick={() => onRouteChange('signin')}>
					Sign In
				</div>
				<div className = 'sign' onClick={() => onRouteChange('register')}>
					Register
				</div>

			</div>
			)
		}	
	}
}
export default Navigation;