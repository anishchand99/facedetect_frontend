import React, {Component} from 'react';
import './Options.css';
class Options extends Component{
	render(){
		const {onInputChange, onSubmit} = this.props;
		return(
			<div className = 'options'>
				<h3>Click the button to detect a face in your picture!</h3>	
				<div className = 'box'>
						<input className = 'imageUrl' type='text' placeholder= "Enter the URL of the image" onChange = {onInputChange} />
						<button onClick = {onSubmit} title= 'Detect'> Detect </button>
				</div>	
			</div>
		)
	}
}
export default Options;