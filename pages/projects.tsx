import { GetStaticPathsContext } from 'next';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectsNavbar from '../components/ProjectsNavbar';
import dbConnect from '../db/dbConnect';
import { Category } from '../types';

const Projects = ({ allProjects }) => {
  const [projects, setProjects] = useState(allProjects);
  const [active, setActive] = useState('all');

  const handlerFilterCategory = (category: Category | 'all') => {
    if (category === 'all') {
      setProjects(allProjects);
      setActive(category);
      return;
    }

    const newArray = allProjects.filter((project) => {
      return project.category.includes(category.charAt(0).toUpperCase());
    });
    console.log(newArray);
    setProjects(newArray);
    setActive(category);
  };
  return (
    <div className='px-5 py-2 overflow-y-scroll' style={{ height: '65vh' }}>
      <ProjectsNavbar
        handlerFilterCategory={handlerFilterCategory}
        active={active}
      />
      <div className='relative grid grid-cols-12 gap-4 my-3'>
        {/* Projects data */}
        {projects.map((project) => {
          return <ProjectCard key={project.id} project={project} />;
        })}
      </div>
    </div>
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
    }, // will be passed to the page component as props
  };
}
