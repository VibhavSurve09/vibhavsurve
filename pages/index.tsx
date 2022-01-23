import { GetStaticPropsContext } from 'next';
import ServiceCard from '../components/ServiceCard';
import dbConnect from '../db/dbConnect';
export default function Home({ servicesData }) {
  return (
    <div className='flex flex-col flex-grow px-6 pt-1'>
      <h5 className='my-3 font-medium'>
        Hola, I am Vibhav Surve, currently I am pursuing my B.Sc Degree (Final
        Year) in Information Technology.
      </h5>
      <div
        className='flex-grow p-4 mt-5 bg-gray-400'
        style={{ marginLeft: '-1.5rem', marginRight: '-1.5rem' }}
      >
        <h5 className='my-3 text-xl font-bold tracking-wide'>What I Offer</h5>
        <div className='grid gap-6 lg:grid-cols-2'>
          {servicesData.map((data) => {
            return (
              <div
                key={data.id}
                className='bg-gray-200 rounded-lg lg:col-span-1'
              >
                <ServiceCard key={data.id} service={data} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
    revalidate: 3600, // page will be build every hour in production
  };
}
