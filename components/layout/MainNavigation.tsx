import Link from 'next/link';

import { useRouter } from 'next/router';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <a>
          <img
            src="/favicon.png"
            alt="React Meetups Logo"
            className={classes.logo}
          />
        </a>
      </Link>
      <ul>
        <li>
          <Link href="/">
            <a className={router.pathname === '/' ? classes.active : ''}>
              All Meetups
            </a>
          </Link>
        </li>
        <li>
          <Link href="/new-meetup">
            <a
              className={
                router.pathname === '/new-meetup' ? classes.active : ''
              }
            >
              Add New Meetup
            </a>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
