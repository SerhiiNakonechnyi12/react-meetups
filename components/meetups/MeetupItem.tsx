import { useRouter } from 'next/router';

import classes from './MeetupItem.module.css';
import Card from '../ui/Card';
import Link from 'next/link';

type MeetupItemProps = {
  id: string;
  title: string;
  address: string;
  image: string;
};

const MeetupItem = ({ id, image, title, address }: MeetupItemProps) => {
  const router = useRouter();

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <Link href={`/${id}`}>
            <a className={classes.linkButton}>Show Details</a>
          </Link>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
