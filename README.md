# CYCLR

CYCLR is a frontend prototype for a circular economy platform. It shows how products could be tracked from creation to recycling through digital product passports, staking mechanics and reward-based returns.

The project focuses on the user experience rather than the final blockchain implementation. It includes a landing page, a product dashboard, QR code scanning, theme switching and animated sections that explain the product lifecycle.

## Overview

CYCLR is built around a simple idea: a product should not lose all value once it reaches the end of its use. By giving each product a digital identity, the platform can show where it comes from, who owns it, how much value is attached to it, and what happens when it is returned or recycled.

The current version is a frontend demo. Wallet data, products and rewards are mocked locally, which makes the project useful as a proof of concept before connecting real APIs, smart contracts or a database.

## Main features

- Landing page explaining the CYCLR concept
- Product lifecycle flow: production, staking, recycling
- Dashboard with product cards, wallet balance, staked value and rewards
- QR code scanner using camera on mobile and image upload on desktop
- Day and night theme system
- Smooth animations and scroll-based interactions
- Responsive interface
- Local state management for demo data
- Design direction prepared for future 3D assets

## Tech stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- html5-qrcode
- Three.js / React Three Fiber
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
│   │   ├── (platform)/
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

## Run locally

```bash
git clone https://github.com/AlexRzk/CYCLR.git
cd CYCLR/frontend
npm install
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the project for production.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Runs the Next.js lint command.

## Current status

CYCLR is not connected to a real blockchain yet. The wallet connection, product list, balances and rewards are currently simulated in the frontend.

The next step would be to connect the interface to real data: wallet provider, product database, QR records and smart contracts for staking or rewards.

## Possible improvements

- Add real wallet connection
- Replace mock products with database data
- Create product detail pages
- Save QR scan results
- Add authentication
- Connect staking and reward logic to smart contracts
- Build an admin interface for brands
- Improve SEO metadata
- Add deployment documentation

## Goal

CYCLR explores a more transparent way to manage product ownership and recycling. The goal is to make each product traceable, give users a clear view of its value, and reward actions that help close the loop between use, return and recycling.
