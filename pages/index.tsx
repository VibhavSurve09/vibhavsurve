/* eslint-disable react/no-unescaped-entities */
import { motion } from 'framer-motion';
import {
  fadeInAnimation,
  routeAnimation,
  staggerAnimation,
} from '../animations';
import ServiceCard from '../components/ServiceCard';
import { useEffect, useState } from 'react';
import { GetStaticPropsContext } from 'next';
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
        Hey folks! I am Vibhav, an I.T garduate from St Xavier's College. I find
        Backend engineering, Cloud & Networking, Artifical Intelligence very
        interesting and I keep myself updated with the trendzz. In my free time
        you'll find me listening music, playing games or experimenting with new
        tech.
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
                key={data._id.$oid}
                className='bg-gray-200 rounded-lg dark:bg-dark-200 lg:col-span-1'
              >
                <ServiceCard key={data._id.$oid} service={data} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const SERVICE_URL = 'https://vibhav-api.onrender.com/whatido';
  const servicesData = [];
  const res = await fetch(SERVICE_URL);
  const data = await res.json();
  for (let i = 0; i < data.length; i++) {
    servicesData.push(data[i]);
  }
  return {
    props: {
      servicesData,
    },
    revalidate: 3600,
  };
}
