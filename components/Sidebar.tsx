import Image from 'next/image';
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { GiTie } from 'react-icons/gi';
import myImage from '../public/images/me.jpeg';
import Link from 'next/link';
const Sidebar = () => {
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
      <p className='px-2 py-1 my-3 bg-gray-200 rounded-full'>
        Web Developer/Machine Learning
      </p>
      <a
        className='flex items-center justify-center px-3 py-1 my-3 bg-gray-200 rounded-full'
        download='name'
      >
        <GiTie className='w-6 h-6' />
        Download Resume
      </a>
      {/* Social Media Icons */}
      <div className='flex justify-around w-9/12 mx-auto my-5 text-green md:w-full'>
        <a target='_blank' href='https://github.com/VibhavSurve09'>
          <AiFillGithub className='w-8 h-8 cursor-pointer' />
        </a>
        <a target='_blank' href='https://www.linkedin.com/in/vibhavsurve/'>
          <AiFillLinkedin className='w-8 h-8 cursor-pointer' />
        </a>
        <a href="href='https://www.instagram.com/vibhavv.af/" target='_blank'>
          <AiFillInstagram className='w-8 h-8 cursor-pointer' />
        </a>
      </div>
      <div
        className='py-4 my-5 bg-gray-200'
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
        <button className='w-8/12 px-5 py-2 my-3 text-white rounded-full bg-gradient-to-r from-green to-blue-400'>
          Change Theme
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
