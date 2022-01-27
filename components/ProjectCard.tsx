import { FunctionComponent, useState } from 'react';
import { AiFillGithub, AiFillProject } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import { IProjects } from '../types';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInAnimation, staggerAnimation } from '../animations';

const ProjectCard: FunctionComponent<{
  project: IProjects;
  showDetail: null | number;
  setShowDetail: (id: number | null) => void;
}> = ({
  project: {
    name,
    id,
    image_path,
    deployed_url,
    category,
    description,
    github_url,
    techTags,
  },
  showDetail,
  setShowDetail,
}) => {
  return (
    <div>
      <Image
        src={image_path}
        alt={name}
        className='cursor-pointer'
        onClick={() => setShowDetail(id)}
        layout='responsive'
        height={150}
        width='300'
      />
      <p className='my-2 text-center'>{name}</p>

      {showDetail === id && (
        <motion.div
          variants={staggerAnimation}
          initial='initial'
          animate='animate'
          className='absolute top-0 left-0 z-10 grid w-full h-auto p-2 text-black bg-gray-100 rounded-lg md:p-10 md:grid-cols-2 gap-x-12 dark:text-white dark:bg-dark-100'
        >
          <motion.div variants={fadeInAnimation}>
            <motion.div className='border-4 border-gray-100'>
              <Image
                src={image_path}
                alt={name}
                layout='responsive'
                height='150'
                width='300'
              />
            </motion.div>
            <motion.div
              variants={fadeInAnimation}
              className='flex justify-center my-4 space-x-3'
            >
              <a
                href={github_url}
                target='_blank'
                className='flex items-center px-4 py-2 space-x-3 text-lg bg-gray-200 dark:bg-dark-200'
                rel='noreferrer'
              >
                <AiFillGithub /> <span>Github</span>
              </a>
              {deployed_url != '' ? (
                <a
                  target='_blank'
                  href={deployed_url}
                  className='flex items-center px-4 py-2 space-x-3 text-lg bg-gray-200 dark:bg-dark-200'
                  rel='noreferrer'
                >
                  <AiFillProject /> <span>Project</span>
                </a>
              ) : null}
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInAnimation}>
            <h2 className='mb-3 text-xl font-medium md:text-2xl'>{name}</h2>
            <h3 className='mb-3 font-medium'>{description}</h3>

            <motion.div
              variants={fadeInAnimation}
              className='flex flex-wrap mt-5 space-x-2 text-sm tracking-wider'
            >
              {techTags.map((tech) => (
                <span
                  key={tech}
                  className='px-2 py-1 my-1 bg-gray-200 dark:bg-dark-200 rounde-sm'
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <button
            onClick={() => setShowDetail(null)}
            className='absolute p-1 bg-gray-200 rounded-full top-3 right-3 focus:outline-none dark:bg-dark-200'
          >
            <MdClose size={30} />
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectCard;
