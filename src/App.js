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

const initialState = {
      input: '',
      ImageUrl: '',
      box: {},
      route: 'signin',
      isSigned: false,
      user: {
        id: '',
        name: '',
        email: '',
        enteries: 0,
        joined: ''

      }
    }
class App extends Component {
  constructor(){
    super();
    this.state = initialState;

  }


 loaduser = (data) => {
    this.setState({user : {
        id: data.id,
        name: data.name,
        email: data.email,
        enteries: data.enteries,
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
      .then(response => {
        if(response){
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            mode : 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
           })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, 
                {enteries:count}
              )
            )
          })
        }
        this.displayBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route_provided) => {
    if (route_provided === 'signout'){
      this.setState(initialState);
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
              <Rank name = {this.state.user.name} enteries = {this.state.user.enteries}/>
              <ImageLinkForm onInput = {this.onInputChange} onSubmit = {this.onSubmitChange}/>
              <FaceRecognition box = {this.state.box} ImageUrl={this.state.ImageUrl} />
            </div> 
          : ( this.state.route === 'Register' 
                ? <Register loaduser={this.loaduser} onRouteChange = {this.onRouteChange} />
                : <Signin loaduser={this.loaduser} onRouteChange = {this.onRouteChange} />
              )
        }
      </div>
    );

  }
}

export default App;
