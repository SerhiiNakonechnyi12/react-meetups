import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

type MeetupData = {
  id: string;
  title: string;
  address: string;
  image: string;
};

type MeetupListProps = {
  meetups: MeetupData[];
};

function MeetupList({ meetups }: MeetupListProps) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
