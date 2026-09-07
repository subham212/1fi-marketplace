# 1Fi Marketplace

A focused, mobile-first commerce experience designed for the 1Fi ecosystem. The application brings product discovery, product evaluation, and flexible payment selection into a single polished shopping flow while preserving 1Fi's visual identity.

## Overview

1Fi Marketplace is a responsive Next.js application built around a compact mobile commerce experience. It is intentionally optimized for mobile interaction and retains the same centered mobile application shell when viewed on larger screens.

The interface supports the complete browsing-to-purchase journey:

- Marketplace discovery with category navigation and search
- Product cards with pricing, ratings, discounts, and monthly EMI information
- Product detail views with gallery navigation
- Variant and color selection
- No-cost EMI and full-payment selection
- Dynamic installment and payable-amount calculations
- Wishlist interactions
- Product reviews and review submission
- Related-product browsing
- Floating purchase action with checkout confirmation state

## Live Preview

[Open the live 1Fi mobile experience](https://1fi-marketplace-2.vercel.app/)

The experience is optimized for phones. Laptop and desktop visitors are shown an instruction to open the link on a phone.

## Product Experience

### Marketplace

- 1Fi-branded promotional hero section
- Top Brands and Nearby Stores sections
- Marketplace category filters
- Search across available products
- Responsive two-column product feed
- EMI-first pricing hierarchy for quick comparison

### Product Details

- Swipeable product image gallery with pagination controls
- Product fulfillment and rating information
- Variant-specific pricing and discount calculations
- Color selection with visual states
- Payment plan selector for EMI and pay-in-full modes
- Installment breakdown with payment dates
- Cashback messaging and payment summary
- Highlights and expandable product information
- Customer review summary and submission flow
- Related product carousel
- Fixed, mobile-friendly purchase CTA

## Design and Engineering Principles

- Preserve 1Fi's established purple and lavender visual language
- Use Anek Latin consistently across the interface
- Prioritize clear hierarchy, strong contrast, and accessible controls
- Keep interaction states visible and predictable
- Use responsive behavior rather than separate desktop and mobile experiences
- Keep product calculations derived from the currently selected product variant and payment plan
- Avoid exposing secrets or environment-specific configuration in the client bundle

## Technology Stack

- **Framework:** Next.js App Router
- **UI:** React
- **Language:** TypeScript
- **Styling:** CSS with Tailwind CSS tooling configured
- **Typography:** Anek Latin through `next/font`
- **Quality checks:** ESLint and Next.js production build

## Getting Started

### Requirements

- Node.js with npm
- Git

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/subham212/1fi-marketplace.git
cd 1fi-marketplace
npm install
```

### Run locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint checks |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build locally |

## Project Structure

```text
1fi-marketplace/
├── app/
│   ├── globals.css    # Design tokens, responsive styles, and component styling
│   ├── layout.tsx     # Root layout, metadata, and font configuration
│   └── page.tsx       # Marketplace and product detail experience
├── public/            # Public static assets
├── package.json       # Scripts and dependencies
└── README.md          # Project documentation
```

## Validation

Run both checks before opening a pull request or deploying:

```bash
npm run lint
npm run build
```

## Deployment

The application can be deployed to any platform that supports Next.js. For a standard Vercel deployment:

1. Import the GitHub repository into Vercel.
2. Keep the default Next.js build settings.
3. Deploy the project.

No credentials or private environment variables are required for the current front-end implementation.

## Repository

[github.com/subham212/1fi-marketplace](https://github.com/subham212/1fi-marketplace)
