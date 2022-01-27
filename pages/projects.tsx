import { motion } from 'framer-motion';
import { GetStaticPathsContext } from 'next';
import { useState } from 'react';
import {
  fadeInAnimation,
  routeAnimation,
  staggerAnimation,
} from '../animations';
import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
import dbConnect from '../db/dbConnect';
import { Category } from '../types';
const Projects = ({ allProjects }) => {
  const [projects, setProjects] = useState(allProjects);
  const [active, setActive] = useState('all');
  const [showDetail, setShowDetail] = useState<number | null>(null);
  const handlerFilterCategory = (category: Category | 'all') => {
    if (category === 'all') {
      setProjects(allProjects);
      setActive(category);
      return;
    }

    const newArray = allProjects.filter((project) => {
      return project.category.toLowerCase() === category;
    });
    setProjects(newArray);
    setActive(category);
  };
  return (
    <motion.div
      variants={routeAnimation}
      initial='initial'
      animate='animate'
      className='px-5 py-2 overflow-y-scroll'
      style={{ height: '65vh' }}
      exit='exit'
    >
      <ProjectsNavbar
        handlerFilterCategory={handlerFilterCategory}
        active={active}
      />
      <motion.div
        variants={staggerAnimation}
        initial='initial'
        animate='animate'
        className='relative grid grid-cols-12 gap-4 my-3'
      >
        {/* Projects data */}
        {projects.map((project) => {
          return (
            <motion.div
              variants={fadeInAnimation}
              key={project.id}
              className='col-span-12 p-2 bg-gray-200 rounded-lg sm:col-span-6 lg:col-span-4 dark:bg-dark-200'
            >
              <ProjectCard
                key={project.id}
                project={project}
                showDetail={showDetail}
                setShowDetail={setShowDetail}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
export default Projects;

export async function getStaticProps(context: GetStaticPathsContext) {
  const driver = await dbConnect();
  const session = driver.session();
  const allProjects = [];
  const queryForProjects =
    'MATCH (projects:PROJECT)-[using:USING]->(skill:SKILL) RETURN projects,skill,using';
  try {
    const readResult = await session.readTransaction((tx) =>
      tx.run(queryForProjects)
    );

    readResult.records.forEach((record) => {
      const project = record.get('projects');
      const skill = record.get('skill');
      const tags = record.get('using');
      allProjects.push({
        ...project.properties,
        id: project.identity.low,
        category: skill.properties.name,
        techTags: tags.properties.tags.split(','),
      });
    });
  } catch {}
  await session.close();
  return {
    props: {
      allProjects,
    },
    revalidate: 21600,
  };
}
