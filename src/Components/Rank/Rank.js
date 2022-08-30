import React from 'react'

const Rank = ({name, enteries}) => {
	return (
		<div className='tc'>
			<div className="white f3 center">
			{`${name} your current rank is...`}
			</div>
			<div className="white f1">
			{`${enteries}`}
			</div>

		</div>
	)
}

export default Rank;