import Head from 'next/head';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Layout = ({ children }) => {
  return (
    <div className='grid grid-cols-12 gap-6 px-5 lg:px-48 my-14 sm:px-20 md:px-32'>
      <Head>
        <title>Vibhav Surve</title>
        <meta name='description' content="Vibhav's Portfolio Site" />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='col-span-12 p-4 text-base text-center bg-white lg:col-span-3 rounded-2xl'>
        <Sidebar />
      </div>
      <div className='flex flex-col col-span-12 overflow-hidden bg-white lg:col-span-9 rounded-2xl'>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
