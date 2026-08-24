import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import classes from '../components/meetups/MeetupList.module.css';
import MeetupList from '../components/meetups/MeetupList';

type MeetupData = {
  id: string;
  title: string;
  address: string;
  image: string;
};

type HomePageProps = {
  meetups: MeetupData[];
  hasError: boolean;
};

function HomePage(props: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge highly active React meetups!"
        />
      </Head>
      {props.hasError && (
        <p className={classes.error}>
          Failed to fetch meetups. Try again later.
        </p>
      )}
      {!props.hasError && <MeetupList meetups={props.meetups} />}
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// export async function getStaticProps() {
export async function getServerSideProps() {
  const DEBUG_FAIL = false; // Set to true to simulate an error loading meetups (e.g., DB failure)

  try {
    if (DEBUG_FAIL) {
      throw new Error('Simulated DB error: showing all meetups failed');
    }

    // fetch data from an API
    const client = await MongoClient.connect(
      'mongodb+srv://Serhii_N:PgkrfKshvzBo0EEE@cluster0.dizgipf.mongodb.net/meetups?appName=Cluster0',
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().sort({ _id: -1 }).toArray();

    client.close();

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        })),
        hasError: false,
      },
      // revalidate: 1,
    };
  } catch (error) {
    return {
      props: {
        meetups: [],
        hasError: true,
      },
    };
  }
}

export default HomePage;
