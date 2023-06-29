import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from '../../assets/Logo.png'
import box from '../../assets/box-archive-solid.svg'
import tags from '../../assets/tags-solid.svg'
import pet from '../../assets/crow-solid.svg'
import logout from '../../assets/logout.svg'

import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);
	const avatar = "https://img.wattpad.com/286ea0e7dc93d535f9e04dae613223d3d4ddfac9/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f65454337674630684d594f5276773d3d2d3637353137303937352e313537356430373466313763313438623338393034323838373636362e6a7067?s=fit&w=720&h=720"

	return (
		<ul className='navBar'>
			<li>
				<NavLink exact to="/home"><img src={avatar} alt="avatar" className='avatar-nav' /></NavLink>
			</li>
			<li>
				<NavLink exact to="/journals"><img src={box} alt="boxes" className='profile-button' /></NavLink>
			</li>
			<li>
				<img src={tags} alt="tags" className='profile-button' />
			</li>
			<li>
				<img src={pet} alt="pet" className='profile-button' />
			</li>
			<li>
				<img src={logout} alt="logout" className='profile-button' />
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ul>
	);
}

export default Navigation;
