import { FunctionComponent } from 'react';
import { ISkills } from '../types';
import { BsCircleFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
const SkillBar: FunctionComponent<{ skill: ISkills }> = ({
  skill: { name, level },
}) => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: level,
      transition: {
        duration: 0.3,
        type: 'spring',
        damping: 10,
        stiffness: 100,
      },
    },
  };
  return (
    <div className='my-2 text-white bg-gray-300 rounded-full dark:bg-dark-300 dark:bg-black-500'>
      <motion.div
        className='flex items-center px-4 py-1 rounded-full bg-gradient-to-r from-green to-blue-500'
        style={{ width: level }}
        variants={variants}
        initial='initial'
        animate='animate'
      >
        <BsCircleFill className='mr-3' />
        {name}
      </motion.div>
    </div>
  );
};
export default SkillBar;
