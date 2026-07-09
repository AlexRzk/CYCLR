# CYCLR

> **XRPL hackathon project** — a circular economy platform that gives products a digital identity and tracks their lifecycle from creation to return and recycling.

## Hackathon context

CYCLR was developed as a hackathon project around the **XRPL ecosystem**. The project explores how digital product passports, blockchain-backed ownership and reward mechanisms can make products more traceable and encourage circular consumption.

The central idea is simple: a product should not become invisible once it leaves the manufacturer. CYCLR gives each product a digital identity so its lifecycle, ownership and return or recycling status can be tracked over time.

## What CYCLR does

CYCLR is designed around a complete circular flow:

1. A product is created and associated with a digital identity.
2. Its ownership and lifecycle information can be tracked.
3. The user can access product information through the platform and QR scanning flow.
4. The product can be returned, staked or recycled depending on the use case.
5. Reward logic incentivizes users to close the loop instead of discarding the product.

## Main features

- Product lifecycle tracking.
- Digital product passport concept.
- Dashboard with product cards, wallet balance, staked value and rewards.
- QR code scanning with mobile camera support and desktop image upload.
- NFT and blockchain logic on the backend side.
- Reward-oriented return and recycling flows.
- Responsive interface with day and night themes.
- Smooth animations and scroll-based interactions.
- Architecture prepared for richer 3D product visualization.

## XRPL integration

The project was designed for an XRPL hackathon context and uses blockchain concepts to represent product identity, ownership and lifecycle events.

The backend contains the NFT and blockchain logic, while the frontend provides the user-facing experience for product discovery, lifecycle visualization, QR scanning and rewards.

The main remaining technical step is the full integration between the frontend and backend so the interface can directly consume the completed backend features instead of relying on local demo data in some flows.

## Tech stack

### Frontend

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

### Blockchain layer

- XRPL-oriented hackathon architecture
- NFT and digital ownership logic
- Product lifecycle tracking
- Reward mechanisms for return and recycling

## Project structure

```text
frontend/
├── docs/
│   └── 3D-ASSETS-GUIDE.md
├── public/
└── src/
    ├── app/
    │   ├── (experience)/
    │   ├── (platform)/
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── provider.tsx
    ├── components/
    │   ├── navigation/
    │   ├── scanner/
    │   ├── sections/
    │   ├── theme/
    │   └── ui/
    ├── lib/
    │   ├── constants.ts
    │   └── store.ts
    └── types/
        └── index.ts
```

## Run locally

```bash
git clone https://github.com/AlexRzk/CYCLR.git
cd CYCLR/frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Current status

The project architecture and core user experience are largely in place.

- The frontend provides the product tracking, dashboard and QR scanning experience.
- The backend contains the NFT and blockchain logic.
- Some frontend flows still use local demo data.
- Frontend/backend integration remains the main unfinished step.

## Next steps

- Connect the frontend to the backend.
- Replace local demo data with live backend data.
- Connect wallet interactions to the blockchain layer.
- Persist and process QR scan results.
- Add dedicated product detail pages.
- Expand lifecycle analytics and reward logic.

## Goal

CYCLR explores a more transparent and incentive-driven way to manage product ownership and recycling. The long-term goal is to make products traceable throughout their lifecycle and reward actions that help move from a linear consumption model toward a circular one.
