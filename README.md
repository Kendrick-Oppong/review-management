# Review Management System

A modern, full-stack review management dashboard built with Next.js that provides comprehensive analytics and insights for property reviews from multiple channels.

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js 15.5.3** - React framework with App Router for server-side rendering and routing
- **React 19** - Modern React with concurrent features and improved performance
- **TypeScript** - Type-safe development with enhanced developer experience

### Styling & UI

- **Tailwind CSS v4** - Utility-first CSS framework for rapid UI development
- **Radix UI** - Headless UI components for accessibility and customization
- **Lucide React** - Beautiful, customizable icons
- **next-themes** - Dark/light mode support

### Data Management & State

- **TanStack Query (@tanstack/react-query)** - Powerful data synchronization and caching
- **TanStack Query DevTools** - Development tools for debugging queries

### Data Visualization

- **Recharts** - Composable charting library for React
- Custom chart components with interactive tooltips

### HTTP Client

- **Axios** - Promise-based HTTP client for API requests

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization

## 🎯 Key Design & Logic Decisions

### Architecture

- **Component-Based Architecture**: Modular, reusable components following atomic design principles
- **App Router Structure**: Next.js App Router for performance and SEO
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### Data Flow

- **Centralized Data Fetching**: TanStack Query handles all API calls with caching and synchronization
- **Data Normalization**: Raw Hostaway API data is normalized to internal `NormalizedReview` format
- **Channel Mapping**: Numeric channel IDs are mapped to human-readable names
- **Fallback Strategy**: Static JSON data serves as fallback when API is unavailable

### UI/UX Decisions

- **shadcn/ui Integration**: Consistent design system with Radix UI primitives
- **Dark Mode Support**: Theme provider with system preference detection
- **Loading & Error States**: Clear UX feedback during data fetches
- **Toast Notifications**: Triggered on approval/removal actions
- **Confirmation Dialogs**: `ConfirmApprovalDialog` ensures safe user actions
- **Charts & Metrics**: Pending vs Public review metrics, average ratings, and response rates

### Performance Optimizations

- **Static Generation**: API routes marked as `force-static` for better performance
- **Query Caching**: TanStack Query provides intelligent caching and background updates
- **Code Splitting**: Next.js automatic code splitting for optimal bundle sizes
- **Turbopack**: Development server with faster refresh times

## 🔌 API Behaviors

### Reviews API

- **Endpoint**: `GET /api/reviews/hostaway`
- **Purpose**: Fetches property reviews from Hostaway API
- **Fallback**: Uses static JSON data when API is unavailable or fails

### Data Normalization Process

1. **Raw Data Ingestion**: Accepts Hostaway API response or static JSON
2. **Channel Mapping**: Converts numeric channel IDs to readable names:
   - `2018` → "Airbnb"
   - `2002` → "Homeaway"
   - `2005` → "Booking.com"
3. **Data Transformation**: Maps to internal `NormalizedReview` interface
4. **Error Handling**: Graceful degradation with proper HTTP status codes

### Response Format

```typescript
{
  success: boolean;
  result: NormalizedReview[];
  error?: string;
}
```

### Error Scenarios

- **Missing Environment Variables**: Returns 500 with configuration error message
- **API Failures**: Falls back to static data with console error logging
- **Network Issues**: Graceful error handling with user-friendly messages

## 🚀 Local Setup Instructions

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Environment Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd review-management
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Hostaway API Configuration
   HOSTAWAY_BASE_URL=https://api.hostaway.com/v1
   HOSTAWAY_ACCESS_TOKEN=your_hostaway_access_token

   # Application Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   > **Note**: If you don't have Hostaway credentials, the application will automatically fall back to static sample data.

4. **Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at `http://localhost:3000`

### Available Scripts

- **`npm run dev`** - Start development server with Turbopack
- **`npm run build`** - Build production bundle
- **`npm run start`** - Start production server
- **`npm run lint`** - Run ESLint for code quality checks

### Project Structure

```
review-management/
├── app/                   # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── layout.tsx         # Root layout
|   └── page.tsx           # Product Detail Page
├── components/            # React components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # Reusable UI components
├── interface/            # TypeScript interfaces
├── lib/                  # Utility functions and configurations
│   ├── config/           # API and app configurations
│   ├── hooks/            # Custom React hooks
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

### Development Workflow

1. **Component Development**: Use the existing UI components in `components/ui/`
2. **Data Fetching**: Use the `useGetAllReviews` hook for reviews data
3. **Styling**: Follow Tailwind CSS utility classes and design tokens
4. **Type Safety**: Leverage TypeScript interfaces for all data structures

### Testing the Application

1. **Dashboard Access**: Navigate to `/dashboard` to view the main interface
2. **Data Visualization**: Check the property performance charts
3. **Filtering**: Test the review filtering and search functionality
4. **Responsive Design**: Test on different screen sizes
5. **Theme Toggle**: Switch between light and dark modes
6. **Product Detail**: Navigate to `/` to view the product detail interface

### Troubleshooting

- **Build Errors**: Run `npm run lint` to check for code issues
- **API Issues**: Check environment variables and network connectivity
- **Styling Problems**: Verify Tailwind CSS configuration
- **Type Errors**: Ensure all components use proper TypeScript interfaces

## 📊 Features Overview

- **Review Analytics**: Comprehensive dashboard with metrics and charts
- **Property Performance**: Visual representation of review data by property
- **Channel Insights**: Breakdown of reviews by booking channel
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Theme switching with system preference detection
- **Real-time Data**: Live data fetching with caching and synchronization

---
