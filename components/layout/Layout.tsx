import { ReactNode } from 'react';

import MainNavigation from './MainNavigation';
import Footer from './Footer';
import classes from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className={classes.layout}>
      <MainNavigation />
      <main className={classes.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
