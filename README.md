# SigPaaS

## Project Tags

- `Full Stack`
- `Protocol`

## Overview

SigPaaS is a decentralized application project that combines a user-facing web app with smart-contract code.

## Features

- User-facing frontend or app interface
- Backend service, API, websocket, bot, or server workflow
- Smart contracts, deployment scripts, or protocol code

## Tech Stack

- Next.js
- React
- Hardhat
- Node.js
- TypeScript
- JavaScript
- Solidity
- CSS

## Project Structure

- `backend` - backend, API, bot, or server code
- `frontend` - frontend application code

## Getting Started

### Prerequisites

- Git
- Node.js 18+
- Wallet/RPC access for deployed contract workflows

### Setup and Run

```bash
git clone https://github.com/ENZOMOTIVE/sigPaaS.git
cd sigPaaS
```

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
npm run dev
```

## Commands

- `backend/package.json`: `test`
- `frontend/package.json`: `dev`, `build`, `start`, `lint`
- `npx hardhat compile`: compile smart contracts.
- `npx hardhat test`: run smart-contract tests when test files are present.

## Configuration

- Store private keys, RPC URLs, wallet mnemonics, and API keys in a local `.env` file only.
- Document required service ports, database URLs, and API credentials before deployment.

## Testing and Quality

- From `backend`, run `npm test`.
- From `frontend`, run `npm run lint`.
- From `frontend`, run `npm run build`.
- Run `npx hardhat test` for contract-level checks when tests are present.

## Documentation Notes

- Keep this README aligned with the actual source layout and commands.
- Add screenshots, API examples, contract addresses, or deployment links when they become stable.
- Update the project tags when the scope changes.

## Contributing

1. Create a focused branch for the change.
2. Update code and documentation together.
3. Run the relevant checks before opening a pull request.

## License

No license file is currently committed. Add one before distributing this project publicly.
