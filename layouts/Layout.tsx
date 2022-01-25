import Head from 'next/head';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ThemeProvider } from 'next-themes';

const Layout = ({ children }) => {
  return (
    <ThemeProvider attribute='class'>
      <div className='grid grid-cols-12 gap-6 px-5 lg:px-48 my-14 sm:px-20 md:px-32'>
        <Head>
          <title>Vibhav Surve</title>
          <meta name='description' content="Vibhav's Portfolio Site" />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div className='col-span-12 p-4 text-base text-center bg-white dark:bg-dark-500 lg:col-span-3 rounded-2xl shadow-custom-light dark:shadow-custom-dark'>
          <Sidebar />
        </div>
        <div className='flex flex-col col-span-12 overflow-hidden bg-white lg:col-span-9 rounded-2xl dark:bg-dark-500 shadow-custom-light dark:shadow-custom-dark'>
          <Navbar />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
