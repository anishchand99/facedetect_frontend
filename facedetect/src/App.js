import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Options from './components/Options/Options';
import DisplayImage from './components/DisplayImage/DisplayImage';
import Hello from './components/Hello/Hello';
import Particles from 'react-particles-js';
const particleOptions = {
  particles: {
    number : {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }  
};
const initialState = {
  input : '',
  imgUrl: '',
  box: {},
  route:'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  } 
  loadUser=(user)=>{
    this.setState({
      user: {
        id: user.id,
        name : user.name,
        email: user.email
      }
    })
  }  
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  
  calculateBox = (data) => {
    var dataSet = [];
    for(var i = 0; i < data.outputs[0].data.regions.length; i++){
      const faceData = data.outputs[0].data.regions[i].region_info.bounding_box;
      const image = document.getElementById('displayImage');
      const height = Number(image.height);
      const width = Number(image.width);
      dataSet.push({
        left:(faceData.left_col * width),
        top: (faceData.top_row * height),
        right:width - (faceData.right_col * width),
        bottom:height - (faceData.bottom_row * height) 
      });
    }
    return dataSet;
  }
  
  displayBox = (box) => {
    this.setState({box : box});
  }
  
  onSubmit = () =>{
    this.setState({imgUrl: this.state.input})
    fetch('https://quiet-anchorage-89707.herokuapp.com/imageUrl', {
			method: 'post',
			headers: {'Content-Type' : 'application/json'},
			body: JSON.stringify({
        url: this.state.input
			})
    })
    .then(response => response.json())
    .then(data => this.displayBox(this.calculateBox(data)))
    .catch(err => console.log(err));  
  }
  
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState) 
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  
  render(){
    const {isSignedIn, box, imgUrl} = this.state;
    return (
      <div className="App">
      <Particles className = 'particles'
      params={particleOptions} />
      <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange} />
      {this.state.route === 'home'
      ? <div>
      <Logo />
      <Hello name = {this.state.user.name}/>
      <Options onInputChange = {this.onInputChange} onSubmit = {this.onSubmit} /> 
      <DisplayImage box = {box} imgUrl = {imgUrl}/>
      </div> : (
        this.state.route === 'register'
        ? <Register loadUser= {this.loadUser} onRouteChange = {this.onRouteChange}/> 
        : <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/> 
        )      
      }
      </div>
      )
    }
  }
  
  export default App;
  