// lib/validation/meetupValidation.ts
export type MeetupInput = {
  title: string;
  image: string;
  address: string;
  description: string;
};

export type FormErrors = Partial<Record<keyof MeetupInput, string>>;

export function validateMeetup(data: MeetupInput): FormErrors {
  const errors: FormErrors = {};

  // TITLE
  if (!data.title.trim()) {
    errors.title = 'Title must not be empty.';
  } else if (data.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
  }

  // IMAGE
  if (!data.image.trim()) {
    errors.image = 'Image URL must not be empty.';
  } else {
    try {
      new URL(data.image);
    } catch {
      errors.image = 'Invalid URL format.';
    }
  }

  // ADDRESS
  if (!data.address.trim()) {
    errors.address = 'Address must not be empty.';
  }

  // DESCRIPTION
  if (!data.description.trim()) {
    errors.description = 'Description must not be empty.';
  } else if (data.description.length > 500) {
    errors.description = 'Too long.';
  }

  return errors;
}