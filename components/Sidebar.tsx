import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { GiTie } from 'react-icons/gi';
import myImage from '../public/images/me.jpeg';
import { useEffect, useRef } from 'react';
import { init } from 'ityped';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const { theme, setTheme } = useTheme();

  const textRef = useRef();
  useEffect(() => {
    init(textRef.current, {
      showCursor: false,
      strings: [
        'Web Developer',
        'Python Developer',
        'Machine Learning Eng.',
        'Content Creator',
      ],
    });
  }, []);
  const changeTheme = (e) => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return (
    <div>
      <Image
        src={myImage}
        className='w-32 h-32 mx-auto rounded-full'
        alt="Vibhav's Display Picture"
      />
      <h3 className='my-4 text-3xl font-medium tracking-wider font-kaushan'>
        <span className='text-green'>Vibhav </span>
        Surve
      </h3>
      <p
        ref={textRef}
        className='px-2 py-1 my-3 bg-gray-200 rounded-full dark:bg-dark-200 dark:bg-black-500'
      ></p>
      <a
        className='flex items-center justify-center px-3 py-1 my-3 bg-gray-200 rounded-full dark:bg-dark-200 dark:bg-black-500'
        download='name'
      >
        <GiTie className='w-6 h-6' />
        Download Resume
      </a>
      {/* Social Media Icons */}
      <div className='flex justify-around w-9/12 mx-auto my-5 text-green md:w-full'>
        <a
          target='_blank'
          href='https://github.com/VibhavSurve09'
          rel='noreferrer'
        >
          <AiFillGithub className='w-8 h-8 cursor-pointer' />
        </a>
        <a
          target='_blank'
          href='https://www.linkedin.com/in/vibhavsurve/'
          rel='noreferrer'
        >
          <AiFillLinkedin className='w-8 h-8 cursor-pointer' />
        </a>
        <a
          href='https://www.instagram.com/vibhavv.af/'
          target='_blank'
          rel='noreferrer'
        >
          <AiFillInstagram className='w-8 h-8 cursor-pointer' />
        </a>
      </div>
      <div
        className='py-4 my-5 bg-gray-200 dark:bg-dark-200 dark:bg-black-500'
        style={{ marginLeft: '-1rem', marginRight: '-1rem' }}
      >
        <div className='flex items-center justify-center space-x-2'>
          <GoLocation />
          <span>Panvel,India</span>
        </div>

        <p className='my-2'>survevibhav@gmail.com</p>
        <p className='my-2'>8692961508</p>
        <button
          className='w-8/12 px-5 py-2 my-3 text-white rounded-full bg-gradient-to-r from-green to-blue-400 focus:outline-none'
          onClick={() => {
            window.open('mailto:survevibhav09@gmail.com');
          }}
        >
          Email Me
        </button>
        <button
          className='w-8/12 px-5 py-2 my-3 text-white rounded-full bg-gradient-to-r from-green to-blue-400'
          onClick={changeTheme}
        >
          Change Theme
        </button>
        {theme === 'light' ? (
          <i className='flex flex-col text-sm'>
            Everything looks better in dark-mode 😎
          </i>
        ) : null}
      </div>
    </div>
  );
};
export default Sidebar;
