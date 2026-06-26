import { useRef, useState } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

import {
  validateMeetup,
  FormErrors,
  MeetupInput,
} from '../../lib/validation/meetupValidation';

type NewMeetupFormProps = {
  onAddMeetup: (meetupData: MeetupInput) => Promise<void>;
};

function NewMeetupForm({ onAddMeetup }: NewMeetupFormProps) {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const [errors, setErrors] = useState<FormErrors>({});
  const isSubmittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return; // Prevent multiple submissions
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const enteredTitle = titleInputRef.current?.value ?? '';
      const enteredImage = imageInputRef.current?.value ?? '';
      const enteredAddress = addressInputRef.current?.value ?? '';
      const enteredDescription = descriptionInputRef.current?.value ?? '';

      const meetupData: MeetupInput = {
        title: enteredTitle,
        image: enteredImage,
        address: enteredAddress,
        description: enteredDescription,
      };

      const validationErrors = validateMeetup(meetupData);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({}); // Clear previous errors if any

      await onAddMeetup(meetupData);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" id="title" ref={titleInputRef} />
          {errors.title && (
            <p className={classes.errorsValidation}>{errors.title}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" id="image" ref={imageInputRef} />
          {errors.image && (
            <p className={classes.errorsValidation}>{errors.image}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" ref={addressInputRef} />
          {errors.address && (
            <p className={classes.errorsValidation}>{errors.address}</p>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={5} ref={descriptionInputRef} />
          {errors.description && (
            <p className={classes.errorsValidation}>{errors.description}</p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Adding Meetup...' : 'Add Meetup'}
          </button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
