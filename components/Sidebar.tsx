import Image from 'next/image';
import { AiFillGithub, AiFillLinkedin, AiFillInstagram } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { GiTie } from 'react-icons/gi';
import myImage from '../public/images/me.jpeg';
import Link from 'next/link';
const Sidebar = () => {
  return (
    <div>
      <Image src={myImage} />
      <h3>
        <span>Vibhav </span>
        Surve
      </h3>
      <p>Web Developer/Machine Learning</p>
      <p>
        <GiTie className='h-6 w-6' />
        Download Resume
      </p>
      {/* Social Media Icons */}
      <div className='flex flex-row'>
        <a target='_blank' href='https://github.com/VibhavSurve09'>
          <AiFillGithub className='w-8 h-8' />
        </a>
        <a target='_blank' href='https://www.linkedin.com/in/vibhavsurve/'>
          <AiFillLinkedin className='w-8 h-8' />
        </a>
        <a href="href='https://www.instagram.com/vibhavv.af/" target='_blank'>
          <AiFillInstagram className='w-8 h-8' />
        </a>
      </div>
      <div>
        <div>
          <GoLocation />
          <span>Panvel,India</span>
        </div>

        <p>survevibhav@gmail.com</p>
        <p>8692961508</p>
        <button>Email Me</button>
        <button>Change Theme</button>
      </div>
    </div>
  );
};
export default Sidebar;
