import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInput , onSubmit}) => {
	return(
		<div>
			<p className='f4 center'>
					{`This Magic Brain will detect faces in your pictures. Give it a try`}
			</p>
			<div className='center'>
				<div className='form pa4 br3 shadow-5 center align-it'>
					<input className='f4 pa2 w-70 center' type='text' onChange = {onInput}/>
					<button className='w-30 grow f4 ph3 pv2 dib white bg-light-purple' onClick = {onSubmit}>
						Detect
					</button>
				</div>	
			</div>
		</div>
	)
}

export default ImageLinkForm;