# The Wild Oasis

A modern hotel management dashboard built with React and Vite, designed for managing cabins, bookings, guests, and hotel operations through an interactive admin interface.

## Features

- Authentication and protected routes
- Cabin and booking management
- Guest management workflows
- CRUD operations with Supabase backend integration
- Reusable dashboard UI components
- Form handling and validation using React Hook Form
- Server state management and caching with React Query
- Toast notifications and error handling
- Responsive dashboard layouts and reusable modal systems
- Dark/light themed UI support

## Tech Stack

### Frontend

- React
- Vite
- React Router DOM
- React Hook Form
- React Query (TanStack Query)
- React Hot Toast
- React Icons

### Backend & Database

- Supabase

### Tooling

- ESLint
- Prettier

## Project Structure

```bash
src/
 ├── components/
 ├── context/
 ├── features/
 ├── hooks/
 ├── pages/
 ├── services/
 ├── styles/
 └── utils/
```

## Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

```bash
git clone <repository-url>
cd the-wild-oasis
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### Run Development Server

```bash
npm run dev
```

The application will start on:

```bash
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Author

Muhammad Usman

## License

This project is for educational and portfolio purposes.
