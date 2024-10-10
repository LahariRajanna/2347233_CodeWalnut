"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../Images/pokeball1.svg'
import profile from '../../Images/jigglypuff.svg'
import { useTheme } from '@/app/Context/ThemeContext';

const RotatingImage = () => {
    const [isRotating, setIsRotating] = useState(false);
    const { isDarkMode, setIsDarkMode } = useTheme();

    const handleClick = () => {
        setIsRotating(true);
        setTimeout(() => {
            setIsRotating(false);
        }, 1000); // Duration of the rotation
    };

    return (
        <div className="container m-auto border-b border-gray-500">
            <div className="p-2 my-5 flex items-center justify-between container m-auto">
                <Link href="/">
                    <div
                        onClick={handleClick}
                        className={`transition-transform duration-1000 ease-in-out ${isRotating ? 'rotate-360' : ''}`}
                        style={{ display: 'inline-block' }}
                    >
                        <Image src={logo} alt="" width={70} />
                    </div>
                </Link>
                <div className='flex gap-10 items-center'>
                    <button
                        onClick={() => setIsDarkMode((prev) => !prev)}
                        className={`toggle-button ${isDarkMode ? 'dark' : 'light'}`}
                    >
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <Link href='/teams'>My Teams</Link>
                    <Link href='/pokemon'>Pokemons</Link>
                    <span >Lahari R</span><Image src={profile} alt='-' width={60} />
                </div>
            </div>
        </div>
    );
};

export default RotatingImage;
