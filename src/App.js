import React ,{ Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import 'tachyons'
import Logo from './Components/Logo/Logo'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Particle from './Components/Particle/Particle'
import Clarifai from 'clarifai'


const app = new Clarifai.App({
 apiKey: '97657ca333b3483aa09f72021562e8d9'
});


class App extends Component {
  constructor(){
    super();


    this.state ={
      input: '',
      ImageUrl: '',
      box: {},
      route: 'signin',
      isSigned: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        enteries: 0,
        joined: ''

      }
    }
  }

 componentDidMount(){

  fetch('http://localhost:3000/')
    .then(resp => resp.json())
    .then(console.log)

 }

 loaduser = (data) => {
  this.setState({user : {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      enteries: 0,
      joined: data.joined
  }})
 }

 calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }



  displayBox = (box) => {
    console.log('box',box);
    this.setState({box: box})
  }


  onInputChange = (event) => {

    this.setState({input: event.target.value});

  }


  onSubmitChange = (event) => {
    this.setState({ImageUrl: this.state.input});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(
      function(response){
        (this.displayBox(this.calculateFaceLocation(response)));
      },
      function(err){

      }

    );
  }

  onRouteChange = (route_provided) => {
    if (route_provided === 'signout'){
      this.setState({isSigned: false});
    } else if (route_provided === 'home') {
      this.setState({isSigned: true});
    }
    this.setState({route: route_provided})


  }


  render(){

    return (
      <div className="App">
        <Particle className='particleOp'/>
        <Navigation isSigned = {this.state.isSigned} onRouteChange = {this.onRouteChange} />
        {
          this.state.route === 'home' 
          ? <div> 
              <Logo />
              <Rank />
              <ImageLinkForm onInput = {this.onInputChange} onSubmit = {this.onSubmitChange}/>
              <FaceRecognition box = {this.state.box} ImageUrl={this.state.ImageUrl} />
            </div> 
          : ( this.state.route === 'Register' 
                ? <Register loaduser={this.loaduser} onRouteChange = {this.onRouteChange} />
                : <Signin onRouteChange = {this.onRouteChange} />
              )
           
          
        }
      </div>
    );

  }
}

export default App;
