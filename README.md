# Tennis Equipment Marketplace

A full-featured marketplace for buying and selling second-hand tennis equipment. Built with Next.js 15 using server-side rendering.

## Features

### For Buyers

- **Browse Equipment**: Filter by category, condition, and price range
- **Search Functionality**: Find specific equipment quickly
- **Detailed Listings**: View comprehensive information about each item
- **Direct Contact**: Connect with sellers via email or phone

### For Sellers

- **Free Listings**: Post your equipment at no cost
- **Easy Form**: Simple form to create listings
- **Contact Management**: Buyers contact you directly via your provided details

## Project Structure

```
app/
├── page.tsx              # Home page with hero and recent listings
├── layout.tsx            # Root layout with navigation and footer
├── browse/
│   └── page.tsx          # Browse page with filters (server-side)
├── sell/
│   ├── page.tsx          # Sell page with form
│   └── actions.ts        # Server actions for form submission
└── equipment/
    └── [id]/
        ├── page.tsx      # Equipment detail page (server-side)
        └── not-found.tsx # 404 page for missing equipment

components/
├── Navigation.tsx        # Header navigation
├── FilterForm.tsx        # Client-side filter form
├── SellForm.tsx          # Client-side sell form
├── ContactSellerButton.tsx # Client-side contact buttons
└── ui/                   # Pre-built UI components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── select.tsx

lib/
├── data.ts               # In-memory data store and functions
└── utils.ts              # Utility functions

types/
└── index.ts              # TypeScript type definitions
```

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Server Components**: All pages are server-side rendered by default
- **Server Actions**: Form submissions handled server-side
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library

## Key Implementation Details

### Server-Side Rendering

All main pages (`page.tsx`) are server components:

- Home page fetches recent listings server-side
- Browse page handles filtering on the server
- Equipment detail page fetches item data server-side

### Client Components

Only interactive components use `"use client"`:

- `FilterForm`: Handles filter state and URL updates
- `SellForm`: Manages form state and validation
- `ContactSellerButton`: Handles email/phone interactions

### Data Management

Currently uses an in-memory store (`lib/data.ts`). In production, replace with:

- Database (PostgreSQL, MongoDB, etc.)
- ORM (Prisma, Drizzle, etc.)
- File uploads for images

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build-dev    # Development build
npm run build-prod   # Production build
```

### Start Production Server

```bash
npm run start-dev    # Start with dev environment
npm run start-prod   # Start with prod environment
```

## Usage Guide

### Browsing Equipment

1. Visit the home page or click "Browse" in navigation
2. Use filters to narrow down results:
   - Category (Rackets, Shoes, Bags, etc.)
   - Condition (Like New, Good, Fair, Well Used)
   - Price range
   - Search by keywords
3. Click "View Details" to see full information
4. Contact the seller via email or phone

### Selling Equipment

1. Click "Sell Your Gear" or "Sell Equipment" in navigation
2. Fill out the form with:
   - Equipment details (title, description, category, condition)
   - Pricing information
   - Your contact information
3. Submit the listing
4. You'll be redirected to your new listing page

## Features to Add for Production

### Database Integration

Replace the in-memory store with a real database

### Image Upload

Add image upload functionality:

- Use cloud storage (AWS S3, Cloudinary, etc.)
- Add multiple image support
- Image preview and optimization

### User Authentication

- User accounts and profiles
- Manage your own listings
- Save favorite items
- Message system between buyers/sellers

### Enhanced Features

- Location-based search with maps
- Ratings and reviews
- Offer system
- Email notifications
- Admin dashboard

## REMEMBER TO ADD ENV FILES WHEN WORKING ON REAL PROJECTS
