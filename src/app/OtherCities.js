// import React from 'react';
// import { CITIES } from '../../constants/constants';
import styled from 'styled-components';

import ContainerBottom from '../components/ContainerBottom';
import HeaderBottom from './HeaderBottom';

const ContainerCities = styled.div`
	display: flex;
	align-items: center;
	font-size: 1.5rem;
	text-align: left;
	width: 100%;
	letter-spacing: 2px;
	font-weight: 400;
	font-size: 1rem;
`;

const CityName = styled.h3`
	font-weight: 400;
	width: 110px;
	letter-spacing: 1px;
	margin: 0px;
	cursor: pointer;
`;

const CityTemp = styled.div`
	font-size: 1.25rem;
	color: rgba(0, 0, 0, 0.5);
	margin-right: 10px;
	width: 67px;
`;

const OtherCities = ({ weather, setDefaultCity }) => {
	// console.log(weather);
	console.log('other city rendered！！');
	// const changeCity = (event) => {
	// 	console.log('clicked');
	// 	console.log(event.target.innerText);
	// 	event.preventDefault();
	// 	setDefaultCity(event.target.innerText);
	// };

	return (
		<ContainerBottom>
			<HeaderBottom>Other Cities</HeaderBottom>
			{weather.map((item) => {
				if (item)
					return (
						<ContainerCities key={item.id}>
							<CityName onClick={() => setDefaultCity(item.name)}>
								{item.name}
							</CityName>
							<CityTemp>{item.temp}</CityTemp>
							<img src={item.icon} alt="Clouds" />
						</ContainerCities>
					);
			})}
		</ContainerBottom>
	);
};

export default OtherCities;