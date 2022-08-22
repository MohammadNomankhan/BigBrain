import React from 'react'
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'
const Logo = () => {
	return (
		
			<Tilt style={{height: '100px', width: '100px'}}

		    className="parallax-effect-glare-scale br2 shadow-3 ml3 tc custom-gbg h1" 



		    perspective={500}

		    glareEnable={true}

		    glareMaxOpacity={0.45}

		    scale={1.02}

		  >

		    <div className="inner-element">

		      <div>
		      	<img src={brain} alt="brain logo" />
		      </div>



		    </div>

		  </Tilt>
		
	)
}

export default Logo;