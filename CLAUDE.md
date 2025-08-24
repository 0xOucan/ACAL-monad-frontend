# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ACAL is a Progressive Web App (PWA) for Mexican peso to Monad blockchain transactions. It's a peer-to-peer trading platform with pixel art styling that includes maker/taker order flows, escrow functionality, and OXXO payment integration.

## Development Commands

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Package management
pnpm install      # Install dependencies
```

## Architecture

### Core Structure
- **Next.js 15** with App Router and standalone output for PWA support
- **TypeScript** with path aliases (`@/*` maps to root)
- **Tailwind CSS** with custom pixel art styling using Press Start 2P font
- **PWA Configuration** via manifest.json with Mexican localization

### Key Directories
- `app/` - Next.js app router pages (maker, taker, wallet flows)
- `components/` - Organized by feature (blockchain, maker, taker, pixel-art, ui)
- `hooks/` - React hooks including wallet management
- `lib/` - Core utilities and blockchain integration

### Blockchain Integration
- **Monad Testnet** configuration (Chain ID: 666/0x29A)
- Mock blockchain functions in `lib/blockchain.ts` for demo purposes
- Wallet context provider with transaction state management
- Escrow smart contract integration (currently mocked)

### Component Architecture
- **Feature-based organization**: Components grouped by domain (maker/, taker/, blockchain/)
- **Pixel art theme**: Custom components for Aztec patterns, canoe graphics, loading animations
- **UI library**: Radix UI primitives with custom styling
- **Mobile-first**: PWA optimized for mobile with haptic feedback

### State Management
- React Context for wallet state (`hooks/use-wallet.tsx`)
- Local state for transaction monitoring and order management
- No external state management library used

## Important Notes

- TypeScript and ESLint errors are ignored during builds (configured in next.config.mjs)
- Images are unoptimized for better pixel art rendering
- Uses standalone output mode for PWA deployment
- Spanish (Mexico) localization throughout the interface