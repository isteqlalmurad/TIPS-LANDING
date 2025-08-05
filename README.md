# TIPS AI Landing Page

A modern, responsive landing page for TIPS AI - a medical training simulation platform that enables students to practice with AI-powered virtual patients using interactive avatars.

## Features

- **Modern Design**: Clean, professional design with dark theme and purple accent colors
- **Responsive**: Fully responsive design that works on all devices
- **Animations**: Smooth animations using Framer Motion
- **Component Library**: Built with HeroUI (NextUI successor) components
- **TypeScript**: Full TypeScript support for type safety
- **Optimized**: Built with Next.js 15 for optimal performance

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom color scheme
- **Components**: HeroUI React components
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full TypeScript support
- **Font**: Inter font family

## Color Scheme

- **Primary Dark Background**: `#0C0934`
- **Hero Box Background**: `#363766`
- **Primary Text**: `#FFFFFF`
- **Secondary Text**: `#DADCF0`
- **Accent Purple**: `#A5A9FF`

## Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Landing Page Sections

1. **Hero Section**: Main headline with TIPS AI branding and three interaction mode cards
2. **Features Section**: Detailed features highlighting AI-powered patients and instant feedback
3. **Testimonials**: Reviews from medical educators at prestigious institutions
4. **Pricing**: Three-tier pricing plans (Student, Professional, Institution)
5. **FAQ**: Common questions about the medical training platform
6. **CTA Section**: Final call-to-action to start free trial
7. **Footer**: Contact information and links

## Customization

The landing page is designed to be easily customizable:

- **Colors**: Update the custom color variables in `tailwind.config.ts`
- **Content**: Modify text content directly in `src/app/page.tsx`
- **Animations**: Adjust Framer Motion animations in the component
- **Layout**: Responsive design adapts automatically

## Deployment

This project can be deployed on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Docker containers**

For Vercel deployment:
```bash
npm run build
# Then deploy the .next folder
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and CSS variables
│   ├── layout.tsx       # Root layout with HeroUI provider
│   └── page.tsx         # Main landing page component
├── tailwind.config.ts   # Tailwind configuration with custom theme
└── package.json         # Dependencies and scripts
```

## Medical Training Platform Features

This landing page showcases TIPS AI's key features:

- **Text Chat Mode**: Practice diagnostic conversations through text
- **Audio Mode**: Voice conversations with AI TTS responses
- **Video Avatars**: Real-time interactions with lifelike AI avatars
- **500+ AI Patients**: Diverse medical cases across all specialties
- **Instant Feedback**: AI analysis of communication and clinical skills
- **Session Continuity**: Follow up with patients across multiple sessions
