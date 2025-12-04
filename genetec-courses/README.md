# Genetec Training Courses Directory

A modern, interactive directory for browsing Genetec's training courses catalog. Built with Next.js 14+ and featuring advanced filtering, search, and responsive design.

## Features

- **43 Training Courses** - Comprehensive catalog of Genetec product training
- **7 Filter Categories** - Filter by product line, level, certification, language, delivery type, duration, and format
- **Real-time Search** - Instant search across course titles and descriptions
- **Pagination** - Clean navigation through filtered results
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Polished user experience with Framer Motion
- **CSV Data Source** - Easy content updates via CSV file

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Data Parsing**: [Papa Parse](https://www.papaparse.com/)
- **Deployment**: [Vercel](https://vercel.com/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd genetec-courses
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
genetec-courses/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # React components
│   ├── CourseCard.tsx     # Individual course card
│   ├── Filters.tsx        # Filter panel
│   ├── Pagination.tsx     # Pagination controls
│   └── Search.tsx         # Search bar
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript interfaces
│   └── utils.ts          # Helper functions
├── public/
│   ├── icons/            # Product line SVG logos
│   └── courses.csv       # Course data source
└── styles/
    └── globals.css       # Global styles with Tailwind
```

## Data Management

Course data is stored in `public/courses.csv`. To update courses:

1. Edit the CSV file with your changes
2. Ensure all required columns are present:
   - Product Line, Title, Certification, Level
   - Languages, Delivery Type, Format, Duration
   - Icon filename (matching files in `/public/icons/`)

3. The application will automatically parse and display the updated data

## Development

- **Build**: `npm run build`
- **Start**: `npm start` (production mode)
- **Lint**: `npm run lint`

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<repository-url>)

## License

This project is part of the Genetec training materials.
