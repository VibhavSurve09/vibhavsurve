import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
const Navbar = () => {
  const [activePage, setActivePage] = useState<string>('About');
  const router = useRouter();
  useEffect(() => {
    const { pathname } = router;
    console.log(pathname);
  }, []);
  return (
    <div>
      <span className='font-bold text-green'>{activePage}</span>
      <div className='flex space-x-3'>
        {activePage !== 'About' && (
          <Link href='/'>
            <a>
              <span
                onClick={() => {
                  setActivePage('About');
                }}
              >
                About
              </span>
            </a>
          </Link>
        )}
        {activePage !== 'Resume' && (
          <Link href='/resume'>
            <a>
              <span
                onClick={() => {
                  setActivePage('Resume');
                }}
              >
                Resume
              </span>
            </a>
          </Link>
        )}
        {activePage !== 'Projects' && (
          <Link href='/projects'>
            <a>
              <span
                onClick={() => {
                  setActivePage('Projects');
                }}
              >
                Projects
              </span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
