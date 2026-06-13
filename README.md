# CYCLR

CYCLR is a frontend prototype for a circular economy platform built around product lifecycle tracking, digital product passports, staking mechanics and recycling rewards.

The idea is simple: every product can carry value throughout its lifecycle. Instead of becoming waste at the end of use, a product can be tracked, returned, recycled and rewarded through a transparent digital system.

The current version focuses on the user experience: an animated landing page, a product dashboard, QR code scanning, theme switching and a polished visual identity inspired by solarpunk, soft 3D interfaces and sustainability-focused product design.

## What CYCLR does

CYCLR presents a product lifecycle flow based on three main stages:

1. **Track production**  
   Products are registered with a unique digital identity. The platform is designed to represent manufacturing data, materials, sustainability metrics and ownership history.

2. **Stake and earn**  
   Registered products are associated with staked value. The prototype shows how users could manage products, view wallet data and track potential rewards.

3. **Recycle and collect**  
   At the end of a product's lifecycle, the user can return it through a recycling flow and receive rewards for closing the loop.

The project is currently a frontend prototype. Blockchain, wallet and product data are represented through mocked state and demo data, which makes the app useful for presenting the concept, testing the interface and preparing future integrations.

## Main features

- Animated landing page presenting the CYCLR concept
- Product lifecycle storytelling
- QR code scanner for product identification
- User dashboard with mock wallet data
- Product cards with lifecycle status, staked value and recycling rewards
- Day and night theme system
- Smooth UI animations with Framer Motion
- Responsive design
- Tailwind-based design system
- State management with Zustand
- Prepared visual direction for future 3D assets with React Three Fiber

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- html5-qrcode
- Three.js
- React Three Fiber
- React Three Drei
- GSAP
- Lenis

## Project structure

```txt
frontend/
├── docs/
│   └── 3D-ASSETS-GUIDE.md
├── public/
├── src/
│   ├── app/
│   │   ├── (experience)/
│   │   │   └── page.tsx
│   │   ├── (platform)/
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── provider.tsx
│   ├── components/
│   │   ├── navigation/
│   │   ├── scanner/
│   │   ├── sections/
│   │   ├── theme/
│   │   └── ui/
│   ├── lib/
│   │   ├── constants.ts
│   │   └── store.ts
│   └── types/
│       └── index.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## Getting started

Clone the repository:

```bash
git clone https://github.com/AlexRzk/CYCLR.git
cd CYCLR/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

Build the project:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

## Available scripts

```bash
npm run dev
```

Starts the Next.js development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server after building the app.

```bash
npm run lint
```

Runs the Next.js lint command.

## Current status

CYCLR is currently a visual and functional frontend prototype.

The app already includes the main user-facing screens and interactions, but the blockchain layer is not connected yet. Wallet connection, balances, products and rewards are currently simulated through local state and mock data.

This makes the project a strong base for:

- pitching the product concept
- testing the user experience
- presenting the circular economy flow
- preparing future smart contract or API integrations
- building a complete product lifecycle dashboard

## Possible next steps

- Connect a real wallet provider
- Replace mock products with real API data
- Add product detail pages
- Store QR scan results in a database
- Implement real digital product passports
- Add smart contract integration for staking and rewards
- Create a brand or admin interface for registering products
- Add authentication
- Improve SEO metadata
- Add production deployment configuration
- Replace placeholder statistics with real platform metrics

## Vision

CYCLR explores how product ownership could become more transparent, valuable and sustainable.

Instead of treating recycling as the end of a product's life, CYCLR turns it into a measurable and rewarding action. Products can be tracked from creation to return, users can see the value connected to what they own, and brands can build stronger circular economy systems around their goods.

The project is a first step toward a platform where every product has a history, every return has value, and every sustainable action can be rewarded.
