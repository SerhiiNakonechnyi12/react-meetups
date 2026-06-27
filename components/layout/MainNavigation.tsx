import Link from 'next/link';

import { useRouter } from 'next/router';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <Link href="/" className={classes.logo}>
        <img
          src="/favicon.png"
          alt="React Meetups Logo"
          className={classes.logo}
        />
      </Link>
      <ul>
        <li>
          <Link
            href="/"
            className={router.pathname === '/' ? classes.active : ''}
          >
            All Meetups
          </Link>
        </li>
        <li>
          <Link
            href="/new-meetup"
            className={router.pathname === '/new-meetup' ? classes.active : ''}
          >
            Add New Meetup
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default MainNavigation;
