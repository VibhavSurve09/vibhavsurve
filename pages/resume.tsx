import Bar from '../components/Bar';
import { fadeInAnimation, routeAnimation } from '../animations';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const Resume = () => {
  const SKILLS_URL = 'http://localhost:8000/skills';
  const SOFTWARE_URL = 'http://localhost:8000/softwares';
  const [skills, setSkills] = useState([]);
  const [softwares, setSoftwares] = useState([]);

  useEffect(() => {
    fetch(SKILLS_URL)
      .then((res) => res.json())
      .then((data) => setSkills(data));
    fetch(SOFTWARE_URL)
      .then((res) => res.json())
      .then((data) => setSoftwares(data));
  }, []);
  return (
    <motion.div
      variants={routeAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
      className='px-6 py-2'
    >
      {/* Education and Exp */}
      <div className='grid gap-6 md:grid-cols-2'>
        <motion.div
          variants={fadeInAnimation}
          initial='initial'
          animate='animate'
        >
          <h5 className='my-3 text-2xl font-bold'>Education</h5>
          <div>
            <h5 className='my-2 text-xl font-bold'>
              Bachelor of Science in Information Technology
            </h5>
            <p className='font-semibold'>
              St Xaviers College Mumbai (2019-2022)
            </p>
            <p className='my-3'>
              I am currently pursuing my Bachelors degree in Information
              Technology, having a C.G.P.A of 9.1 from St Xaviers College.
            </p>
          </div>
        </motion.div>
        <div>
          <h5 className='my-3 text-2xl font-bold'>Experience</h5>
          <motion.div
            variants={fadeInAnimation}
            initial='initial'
            animate='animate'
          >
            <h5 className='my-2 text-xl font-bold'>Internship</h5>
            <p className='font-semibold'>
              Technical Content Creator (May 2021-October 2021)
            </p>
            <p className='my-3'>
              Create videos that were based on Machine Learning and Python at
              <a
                target='_blank'
                href='https://www.youtube.com/c/ProfessionalCipher'
                rel='noreferrer'
                className='hover:text-blue-300'
              >
                {''} Professional Cipher
              </a>{' '}
              YT channel.
            </p>
          </motion.div>
        </div>
      </div>
      {/* Languages and Tools */}
      <div className='grid gap-6 md:grid-cols-2'>
        <div>
          <h5 className='my-3 text-2xl font-bold'>Languages & Frameworks</h5>
          <div className='my-2'>
            {skills.map((lang) => {
              return <Bar key={lang._id.$oid} skill={lang} />;
            })}
          </div>
        </div>
        <div>
          <h5 className='my-3 text-2xl font-bold'>Softwares & Tools</h5>
          <div className='my-2'>
            {softwares.map((software) => {
              return <Bar key={software._id.$oid} skill={software} />;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Resume;
