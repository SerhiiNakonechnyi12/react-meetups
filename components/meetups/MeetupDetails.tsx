import classes from './MeetupDetails.module.css';

type MeetupData = {
  image: string;
  title: string;
  address: string;
  description: string;
};

function MeetupDetail({ image, title, address, description }: MeetupData) {
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
}

export default MeetupDetail;
