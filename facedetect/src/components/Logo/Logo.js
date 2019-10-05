import React, {Component} from 'react';
import './Logo.css';
import pic from './face.png';
import Tilt from 'react-tilt';

class Logo extends Component{
	render(){
		return(
			<div>
				<Tilt className="Tilt" options={{ max : 75 }}>
 				<div className="Tilt-inner"> <img alt = "logo" title= 'Logo'src = {pic}/> </div>
				</Tilt>
			</div>
			)
	}
}
export default Logo;