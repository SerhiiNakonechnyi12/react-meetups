# React Meetups

A small full-stack application for browsing and adding React meetups. The project demonstrates the use of **Next.js Pages Router**, server-side data fetching from MongoDB, dynamic routes, and React forms.

## Live Demo

The application is deployed on Vercel:

[Open React Meetups](https://react-meetups-three-topaz.vercel.app/)

## Features

- Browse a list of all meetups.
- Open a dedicated page with detailed information about a selected meetup.
- Add a new meetup using a form with a title, image, address, and description.
- Client-side validation for required fields, image URLs, and description length.
- Prevent duplicate form submissions while a request is in progress.
- Toast notifications for successful submissions and errors.
- Error handling for unavailable database connections and missing meetups.
- Responsive navigation with an active section indicator.

## Technologies

- **Next.js 16** — Pages Router, API Routes, `getStaticProps`, `getStaticPaths`, and ISR.
- **React 18** and **TypeScript** with strict type checking enabled.
- **MongoDB** and the official `mongodb` driver for storing meetup data.
- **CSS Modules** and global styles for isolated component styling.
- **react-hot-toast** for user notifications.

## Architecture & Technical Decisions

- The home page fetches the meetup list on the server using `getStaticProps`; ISR revalidates the data at least once per second.
- The meetup details page uses the dynamic `/{meetupId}` route. Known meetup IDs are generated at build time, while `fallback: 'blocking'` allows pages for newly added meetups to be generated on the first request. The details page is revalidated every 10 seconds.
- The `POST /api/new-meetup` API route saves submitted meetup data to the `meetups` MongoDB collection.
- Validation rules are separated from the UI and stored in `lib/validation/meetupValidation.ts`, allowing them to be maintained independently of the form component.
- Shared elements such as `Layout`, navigation, footer, and `Card` are separated from meetup-specific components.
- Each page defines its own `title` and `meta description` using `next/head`.

## Implemented Independently

- List, creation, and meetup details pages, including dynamic routing.
- Reading and adding meetup data using MongoDB.
- A server-side API endpoint for creating meetups.
- Form validation, error handling, and submission state management.
- Toast notifications, loading error handling, and missing meetup handling.
- Component structure, responsive styling, and active navigation state.

## Project Structure

```text
components/
  layout/                 # Layout, navigation, and footer
  meetups/                # Meetup list, card, details, and form
  ui/                     # Reusable UI components
lib/
  validation/             # Form validation rules
pages/
  api/new-meetup.js       # POST API endpoint for creating meetups
  [meetupId]/index.tsx    # Dynamic meetup details page
  new-meetup/index.tsx    # New meetup page
  index.tsx               # Meetup list page
  _app.tsx                # Shared Layout and Toast container
  _document.tsx           # HTML document and favicon
public/                   # Static assets
styles/                   # Global CSS styles
```

## Installation & Setup

### Requirements

- Node.js 20.9 or later
- npm
- Access to MongoDB and the `meetups` collection

```bash
git clone <https://github.com/SerhiiNakonechnyi12/react-meetups.git>
cd react-meetups
npm install
npm run dev
```

Once the development server is running, the application will be available at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Create a `.env.local` file in the project root and add the following environment variable:

```
MONGODB_URI=your-mongodb-connection-string
```

## npm scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the local Next.js development server. |
| `npm run build` | Creates an optimized production build. |
| `npm run start` | Starts the production server after `npm run build`. |

## Screenshots

Screenshots are available in `public/screenshots/`:

```md
![Meetup list](https://github.com/SerhiiNakonechnyi12/react-meetups/blob/main/public/screenshots/meetups-list.png?raw=true)
![New meetup form](https://github.com/SerhiiNakonechnyi12/react-meetups/blob/main/public/screenshots/new-meetup-form.png?raw=true)
![Meetup details](https://github.com/SerhiiNakonechnyi12/react-meetups/blob/main/public/screenshots/meetup-details.png?raw=true)
```

## Deployment Notes

Since static generation fetches data from MongoDB, the database must be accessible during `npm run build`.
