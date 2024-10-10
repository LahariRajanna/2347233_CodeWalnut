import React from 'react';
import { useTheme } from '@/app/Context/ThemeContext';

const AboutMe = () => {
    const { theme } = useTheme(); // Get the current theme

    return (
        <div className='container mx-auto'>
            <div className={`p-6 my-6 rounded shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
                <h1 className="text-3xl font-bold mb-4">About Me</h1>
                <p className="mb-4">
                    Hello, I am <strong>Lahari R</strong>, currently pursuing an MCA at Christ University. I am excited about the opportunity to contribute to your organization. Below are some key features of my assessment project:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Completed a senior-level assessment.</li>
                    <li>Implemented listing pages on the Pokémon tab in the navbar.</li>
                    <li>Developed a mock user login system.</li>
                    <li>Enabled users to create teams with a maximum of 6 Pokémon and view detailed stats for each member.</li>
                    <li>Utilized client-side routing with React Router.</li>
                    <li>Implemented state management using Redux.</li>
                    <li>For bonus points, implemented theme control from dark to light mode.</li>
                </ul>
                <p>
                    Feel free to reach out to me.
                </p>
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Contact Information:</h2>
                    <p>Email: <a href="mailto:laharirajanna@gmail.com" className="text-blue-500">laharirajanna@gmail.com</a></p>
                    <p>GitHub: <a href="https://github.com/LahariRajanna" className="text-blue-500" target="_blank" rel="noopener noreferrer">https://github.com/LahariRajanna</a></p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
