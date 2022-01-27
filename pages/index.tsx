import { motion } from 'framer-motion';
import { GetStaticPropsContext } from 'next';
import {
  fadeInAnimation,
  routeAnimation,
  staggerAnimation,
} from '../animations';
import ServiceCard from '../components/ServiceCard';
import dbConnect from '../db/dbConnect';
export default function Home({ servicesData }) {
  return (
    <motion.div
      variants={routeAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex flex-col flex-grow px-6 pt-1'
    >
      <h5 className='my-3 font-medium'>
        Hola, I am Vibhav Surve, currently I am pursuing my B.Sc Degree (Final
        Year) in Information Technology.
      </h5>
      <div
        className='flex-grow p-4 mt-5 bg-gray-400 dark:bg-dark-100'
        style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
      >
        <h5 className='my-3 text-xl font-bold tracking-wide'>What I do</h5>
        <motion.div
          variants={staggerAnimation}
          initial='initial'
          animate='animate'
          className='grid gap-6 lg:grid-cols-2'
        >
          {servicesData.map((data) => {
            return (
              <motion.div
                variants={fadeInAnimation}
                key={data.id}
                className='bg-gray-200 rounded-lg dark:bg-dark-200 lg:col-span-1'
              >
                <ServiceCard key={data.id} service={data} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const driver = await dbConnect();
  const session = driver.session();
  const servicesData = [];
  const query = `MATCH (servicesProvided:SERVICE_PROVIDED) RETURN servicesProvided`;
  const rs = await session.readTransaction((tx) => tx.run(query));
  rs.records.forEach((record) => {
    const services = record.get('servicesProvided');
    servicesData.push({ ...services.properties, id: services.identity.low });
  });
  await session.close();
  return {
    props: {
      servicesData,
    },
    revalidate: 43200, // page will be build every 12 hours in production
  };
}
