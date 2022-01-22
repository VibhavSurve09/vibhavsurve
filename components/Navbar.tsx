import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
const NavIteam: FunctionComponent<{
  activePage: string;
  setActivePage: Function;
  name: string;
  route: string;
}> = ({ activePage, setActivePage, name, route }) => {
  return (
    activePage !== name && (
      <Link href={route}>
        <a>
          <span
            className='hover:text-green'
            onClick={() => {
              setActivePage(name);
            }}
          >
            {name}
          </span>
        </a>
      </Link>
    )
  );
};
const Navbar = () => {
  const [activePage, setActivePage] = useState<string>('');
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    if (pathname === '/') setActivePage('About');
    if (pathname === '/resume') setActivePage('Resume');
    if (pathname === '/projects') setActivePage('Projects');
  }, [pathname]);
  return (
    <div className='flex justify-between px-5 py-3 my-3'>
      <span className='text-xl font-bold border-b-4 text-green border-green md:text-2xl'>
        {activePage}
      </span>
      <div className='flex space-x-5 text-lg'>
        <NavIteam
          activePage={activePage}
          setActivePage={setActivePage}
          name='About'
          route='/'
        />

        <NavIteam
          activePage={activePage}
          setActivePage={setActivePage}
          name='Resume'
          route='/resume'
        />
        <NavIteam
          activePage={activePage}
          setActivePage={setActivePage}
          name='Projects'
          route='/projects'
        />
      </div>
    </div>
  );
};
export default Navbar;
