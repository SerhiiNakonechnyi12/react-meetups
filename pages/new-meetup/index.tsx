// our-domain.com/new-meetup
import { Fragment } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

type MeetupData = {
  title: string;
  address: string;
  image: string;
  description: string;
};

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData: MeetupData) {
    const DEBUG_FAIL = false; // Set to true to simulate an error adding a meetup (e.g., DB failure)
    try {
      if (DEBUG_FAIL) {
        throw new Error('Simulated DB failure: adding meetup failed');
      }

      const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredMeetupData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('Server error! The cluster fell asleep. Try again later');
        throw new Error('Server error');
      }

      const data = await response.json();

      console.log(data);

      toast.success('Meetup added successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Failed to add meetup. Try again later.');
    }
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
