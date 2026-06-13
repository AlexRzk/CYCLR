# CYCLR

This is a full-stack circular economy project that allows products to be tracked from creation to recycling through digital product passports, NFTs, smart contracts and reward-based returns.

The project includes a frontend interface for product tracking, QR scanning and lifecycle visualization, as well as a backend that handles the contract and NFT logic. The main remaining step is to connect the frontend and backend together so the interface can use the completed backend features directly.

## Overview

CYCLR is built around a simple idea: a product should not lose all value once it reaches the end of its use. By giving each product a digital identity, the platform can show where it comes from, who owns it, how much value is attached to it, and what happens when it is returned or recycled.

The application is designed to support a complete circular flow: products are created, associated with digital ownership, followed through their lifecycle, then returned or recycled in exchange for rewards.

## Main features

- Landing page explaining the CYCLR concept
- Product lifecycle flow: production, staking, recycling
- Dashboard with product cards, wallet balance, staked value and rewards
- QR code scanner using camera on mobile and image upload on desktop
- Backend logic for contract and NFT creation
- Smart contract based product tracking and reward logic
- Day and night theme system
- Smooth animations and scroll-based interactions
- Responsive interface
- Local frontend state while the frontend/backend connection is being finalized
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
- Smart contracts and NFT logic on the backend side

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

CYCLR is mostly complete from a project architecture point of view. The backend already handles the contract and NFT side of the application, while the frontend provides the user-facing experience.

The frontend and backend are not connected yet. For now, the interface still uses local demo data in some places, but the backend logic is intended to replace those mocked flows once the integration is completed.

## Possible improvements

- Connect the frontend to the backend
- Replace local demo data with backend data
- Connect the wallet flow to the contract logic
- Create product detail pages
- Save and process QR scan results through the backend
- Add authentication if needed
- Improve SEO metadata
- Add deployment documentation

## Goal

CYCLR explores a more transparent way to manage product ownership and recycling. The goal is to make each product traceable, give users a clear view of its value, and reward actions that help close the loop between use, return and recycling.
