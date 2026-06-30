import { MongoClient, ObjectId } from 'mongodb';
import { Fragment } from 'react';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetails';
import classes from '../../components/meetups/MeetupDetails.module.css';

type MeetupData = {
  title: string;
  address: string;
  image: string;
  description: string;
};

type MeetupDetailsProps = {
  meetupData: MeetupData;
  hasError: boolean;
};

function MeetupDetails({ meetupData, hasError }: MeetupDetailsProps) {
  if (hasError) {
    return (
      <p className={classes.error}>
        Failed to load meetup details. Try again later.
      </p>
    );
  }

  if (!meetupData) {
    return <p className={classes.error}>Meetup not found.</p>;
  }

  const { title, address, image, description } = meetupData;
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MeetupDetail
        image={image}
        title={title}
        address={address}
        description={description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://Serhii_N:h0YW1OKknAR1sdjY@cluster0.dizgipf.mongodb.net/meetups?appName=Cluster0',
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

type GetStaticPropsContext = {
  params: {
    meetupId: string;
  };
};

export async function getStaticProps(context: GetStaticPropsContext) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  // For meetup not found, we return null data and no error (404 will be shown)
  if (!ObjectId.isValid(meetupId)) {
    return {
      props: {
        meetupData: null,
        hasError: false,
      },
    };
  }

  const DEBUG_FAIL = false; // Set to true to simulate an error loading meetup details
  try {
    if (DEBUG_FAIL) {
      throw new Error('Simulated DB failure: showing meetup details failed');
    }

    const client = await MongoClient.connect(
      'mongodb+srv://Serhii_N:h0YW1OKknAR1sdjY@cluster0.dizgipf.mongodb.net/meetups?appName=Cluster0',
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({
      _id: new ObjectId(meetupId),
    });

    console.log(selectedMeetup);

    client.close();

    if (!selectedMeetup) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        meetupData: {
          id: selectedMeetup._id.toString(),
          title: selectedMeetup.title,
          address: selectedMeetup.address,
          image: selectedMeetup.image,
          description: selectedMeetup.description,
        },
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        meetupData: null,
        hasError: true,
      },
      revalidate: 10,
    };
  }
}

export default MeetupDetails;
