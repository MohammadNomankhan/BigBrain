import React from 'react'

class Register extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			nameReg: '',
			emailReg: '',
			passwordReg: ''
		}
	}

	onNameChanged = (event) => {
		this.setState({nameReg: event.target.value})
	}

	onEmailChanged = (event) =>{
		this.setState({emailReg: event.target.value})
	}

	onPasswordChanged = (event) => {
		this.setState({passwordReg: event.target.value})
	}

	onSubmitted = async (e) => {	
		e.preventDefault();
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      mode : 'cors',
      referrerPolicy: 'no-referrer', 
      headers: {
      	'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      	name: this.state.nameReg,
        email: this.state.emailReg,
        password: this.state.passwordReg
      })
    })

   
    const user = await response.json(); 
      if(user.id){
    	this.props.loaduser(user);
    	this.props.onRouteChange('home');
    }
  }

	render(){
		return (
		<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 mw6 center ">
			<main className="pa4 black-80">
			  <form className="measure">
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			      <legend className="f1 fw6 ph0 mh0">Register</legend>
			      
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="text" name="name"  id="name" 
			        	required
			        	onChange = {this.onNameChanged}
		        	/>
			      </div>

			      <div className="mt3">
			        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
			        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="email" name="email-address"  id="email-address" 
			        	onChange = {this.onEmailChanged}
		        	/>
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
			        <input 
			        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        	type="password" name="password"  id="password" 
			        	onChange = {this.onPasswordChanged}
		        	/>
			      </div>
			    </fieldset>
			    <div className="">
			      <input 
			      		className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 	
			      		type="submit" value="Register"
			      		onClick = {this.onSubmitted}
			      		 />
		
			    </div>
			    <div className="lh-copy mt3">
			    </div>
			  </form>
			</main>
		</article>


		)
	}
}

export default Register;