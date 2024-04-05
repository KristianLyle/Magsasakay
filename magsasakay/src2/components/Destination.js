import React, { useState, useEffect } from 'react';
import '../css/Destination.css';

const Destination = () => {
	return (
		<div className='destination-container'>
			<div className='destination-title'>
				<h3>Destination</h3>
			</div>
			<div className='destination-contents'>
				<div className='destination-input'>
					<label htmlFor='start'>Start: </label>
					<input
						type='text'
						id='start'
						placeholder='SM City'
					/>
					<label htmlFor='end'>Destination: </label>
					<input
						type='text'
						id='end'
						placeholder='Mohon Terminal'
					/>
					<button className='search'>Go</button>
				</div>
			</div>
		</div>
	);
};

export default Destination;
