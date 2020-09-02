import React from 'react';
import { FiGift, FiSearch, FiBell, FiChevronDown } from 'react-icons/fi'

import logoNetflix from '../../assets/Logo_Netflix.png';
import profileNetflix from '../../assets/profile_netflix.png';

import './styles.css';

export default function Header({ black }) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--left">
                <div className="header--logo">
                    <a href="/">
                        <img src={logoNetflix} alt="Netflix" />
                    </a>
                </div>

                <div className="header--menus">
                    <ul>
                        <li><a href="/">Inicio</a></li>
                        <li><a href="/">Séries</a></li>
                        <li><a href="/">Filmes</a></li>
                        <li><a href="/">Mais Recentes</a></li>
                        <li><a href="/">Minha Lista</a></li>
                    </ul>
                </div>
            </div>

            <div className="header--right">
                <div className="header--user--icons">
                    <FiSearch className='icon' size={20} color='#fff' />
                    <FiGift className='icon' size={20} color='#fff' />
                    <FiBell className='icon' size={20} color='#fff' />
                </div>

                <div className="header--user">
                    <a href="/">
                        <img src={profileNetflix} alt="My profile" />
                    </a>
                </div>
                <FiChevronDown size={20} color='#fff' style={{ marginLeft: 15}} />
            </div>
        </header>
    )
}