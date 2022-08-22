import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({box, ImageUrl}) => {

	return (

		<div className='center ma'>
			<div className='absolute mt2'>
				<img id = 'inputimage' alt ='' src ={ImageUrl} width='500px' height='auto' />
				<div className='bounding-box' style = {{top: box.leftCol, right: box.topRow, bottom: box.rightCol, left: box.bottomRow }}></div>
			</div>
		</div>

	);

}

export default FaceRecognition;	