import { GetStaticPathsContext } from 'next';
import dbConnect from '../db/dbConnect';
import Bar from '../components/Bar';
import { fadeInAnimation, routeAnimation } from '../animations';
import { motion } from 'framer-motion';
const Resume = ({ skills, softwares }) => {
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
              return <Bar key={lang.id} skill={lang} />;
            })}
          </div>
        </div>
        <div>
          <h5 className='my-3 text-2xl font-bold'>Softwares & Tools</h5>
          <div className='my-2'>
            {softwares.map((software) => {
              return <Bar key={software.id} skill={software} />;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default Resume;

export async function getStaticProps(context: GetStaticPathsContext) {
  const driver = await dbConnect();
  const session = driver.session();
  const skills = [];
  const softwares = [];
  const queryForSkills = `MATCH (s:SKILLS)-[k:KNOWS]->(sk:SKILL) RETURN sk,k `;
  const queryForSoftwares = `MATCH (softwares:SOFTWARES)-[k:KNOWS]->(software:SOFTWARE) RETURN software,k`;
  try {
    const readResult = await session.readTransaction((tx) =>
      tx.run(queryForSkills)
    );
    readResult.records.forEach((record) => {
      const skill = record.get('sk');
      const skillLevel = record.get('k');
      skills.push({
        ...skill.properties,
        id: skill.identity.low,
        level: skillLevel.properties.level,
      });
    });
    const readResult2 = await session.readTransaction((tx) =>
      tx.run(queryForSoftwares)
    );
    readResult2.records.forEach((record) => {
      const software = record.get('software');
      const softwareLevel = record.get('k');
      softwares.push({
        ...software.properties,
        id: software.identity.low,
        level: softwareLevel.properties.level,
      });
    });
  } catch {}
  await session.close();
  return {
    props: {
      skills,
      softwares,
    },
    revalidate: 43200, // page will be build every 12 hours in production
  };
}
