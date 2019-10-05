import React, {Component} from 'react';
import './DisplayImage.css';

class DisplayImage extends Component{
	render(){
		const {imgUrl, box} = this.props;
		const faceArray = Object.keys(box).map(i => box[i]);
		return(
			<div>
				<div className = 'display'>
					{faceArray.map((item,index) => {return(<div key= {index} className = 'faceBox' style = {{left: faceArray[index].left, top: faceArray[index].top, right: faceArray[index].right, bottom: faceArray[index].bottom}}/>)})}	
					<img id='displayImage' alt='' src = {imgUrl} />
			</div>
			</div>
			)
	}
}

export default DisplayImage;